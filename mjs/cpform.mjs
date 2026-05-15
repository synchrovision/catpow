/* exported cpform Catpow */
/* global cp wp console Promise */

import { store, getContext, getElement, withSyncEvent } from "@wordpress/interactivity";
import "./lightbox.mjs";
import { el } from "./el.mjs";

const { actions: lightboxActions } = store("@catpow/lightbox");

// ユーティリティ関数/* exported cpform Catpow */
/* global cp wp console Promise*/

const cpform = (form) => {
	if (form.classList.contains("cpform")) {
		form.addEventListener("submit", (e) => e.preventDefault());
	}
	const onClickHandler = (e) => {
		var el;
		if ((el = e.target.closest('[data-role^="cpform-submit-"]'))) {
			var target;
			switch (el.dataset.role) {
				case "cpform-submit-form":
					target = form;
					break;
				case "cpform-submit-section": {
					const portal = el.closest('[data-role="cpform-portal"]');
					target = portal ? sectionByPortal.get(portal) : el.closest("[data-role='cpform-section']");
					break;
				}
				case "cpform-submit-action":
					target = el;
					break;
			}

			if (!el.dataset.ignoreMessage) {
				const taskMessage = target.querySelector(".message.task");
				if (taskMessage) {
					taskMessage.scrollIntoView({ behavior: "smooth" });
					return;
				}
			}
			form.querySelectorAll(".cpform-message .message").forEach((el) => el.remove());
			const param = el.dataset.param ? JSON.parse(el.dataset.param) : false;
			submit(target, el.dataset.action, el.dataset.callback, param);
		} else if ((el = e.target.closest('[data-role="cpform-action-submit-group"] [data-param-value]'))) {
			const group = el.closest('[data-role="cpform-action-submit-group"]');
			const param = { [group.dataset.paramKey]: el.dataset.paramValue };
			submit(el, group.dataset.action, group.dataset.callback, param);
		}
	};
	form.addEventListener("click", onClickHandler);
	form.addEventListener("change", (e) => {
		const changed_input_name = e.target.name;
		form.querySelectorAll("[data-watch]").forEach((el) => {
			el.dataset.watch.split(",").forEach((target_name) => {
				if (changed_input_name.indexOf(target_name) === 0) {
					const param = el.dataset.param ? JSON.parse(el.dataset.param) : false;
					const callback = el.dataset.callback || "replace_item";
					submit(el, el.id, callback, param);
				}
			});
		});
		if (e.target.type === "checkbox") {
			const group = e.target.closest("[data-input-range]");
			if (group && group.querySelectorAll("input:checked:enabled").length > group.dataset.range) {
				e.target.checked = false;
			}
			reflectCheckedState(e.target);
		}
		if (e.target.type === "radio") {
			form.querySelectorAll('input[name="' + e.target.name + '"]').forEach(reflectCheckedState);
		}
	});
	const observer = new MutationObserver((mutationList) => {
		mutationList.forEach((mutation) => {
			if (mutation.type === "childList" && mutation.addedNodes) {
				mutation.addedNodes.forEach((addedNode) => {
					if (addedNode.nodeType === Node.ELEMENT_NODE) {
						addedNode.querySelectorAll("script").forEach(evalScript);
					}
				});
			}
		});
	});
	observer.observe(form, { childList: true, subtree: true });

	const reflectCheckedState = (el) => {
		const label = el.closest("label");
		if (!label) {
			return;
		}
		label.classList.toggle("active", el.checked);
		document.querySelectorAll('label[for="' + el.id + '"]').classList.toggle("active", el.checked);
	};
	form.querySelectorAll("input:checked").forEach(reflectCheckedState);

	const refine = function () {
		form.querySelectorAll("[data-refine-cond]").forEach((el) => {
			if (!el.dataset.refineCond) {
				return true;
			}
			try {
				const cond = JSON.parse(el.dataset.refineCond);
				const flag = Object.keys(cond).every((name) =>
					cond[name].some((val) => form.querySelectorAll('input[name^="' + name + '"][value="' + val + '"]:checked').length || form.querySelector('select[name^="' + name + '"]').value === val),
				);
				el.classList.toggle("disabled", flag);
				el.querySelectorAll("input,textarea,select").forEach((el) => {
					if (flag) {
						el.removeAttribute("disabled");
					} else {
						el.setAttribute("disabled", "disabled");
					}
				});
			} catch (e) {
				console.error("Failed to parse RefineCond : " + el.dataset.refineCond);
			}
		});
		form.querySelectorAll("[data-refine-cond].disabled [data-refine-cond]").forEach((el) => {
			el.classList.remove("disabled");
			el.querySelectorAll("input,textarea,select").forEach((el) => {
				el.setAttribute("disabled", "disabled");
			});
		});
	};
	form.addEventListener("change", refine, true);
	form.addEventListener("update", () => {
		refine();
		form.querySelectorAll("input:checked").forEach(reflectCheckedState);
	});
	refine();

	const portalsBySection = new WeakMap();
	const sectionByPortal = new WeakMap();
	const portalsByContent = new WeakMap();
	const contentByPortal = new WeakMap();

	const getFd = (target) => {
		if (form === target) {
			return new FormData(form);
		} else {
			const sec = getTheSection(target);
			const fd = new FormData();
			fd.append("action", "cpform");
			appendInputsToFd(fd, form.querySelectorAll('[name="_cpform_nonce"],[name="_wp_http_referer"],[name="cpform_id"]'));
			if (sec) {
				fd.append("cpform_section_id", sec.dataset.sectionId);
			}
			appendInputsToFd(fd, target.querySelectorAll("input,select,textarea"));
			if (portalsBySection.has(sec)) {
				portalsBySection.get(sec).forEach((portal) => {
					appendInputsToFd(fd, portal.querySelectorAll("input,select,textarea"));
				});
			}
			if (target.dataset.watch) {
				target.dataset.watch.split(",").forEach((name) => {
					appendInputsToFd(fd, form.querySelectorAll(':input[name^="' + name + '"]'));
				});
			}
			return fd;
		}
	};
	const getLightboxContainer = (target) => {
		const content = getTheContent(target);
		const section = getTheSection(target);
		const id = form.id + `--lightbox-container`;
		const container = lightboxActions.get(id);
		if (container) {
			return container;
		}
		const newContainer = lightboxActions.add(el("fieldset", { id, form: form.id, class: "cpform-lightbox-content", "data-role": "cpform-portal", onClick: onClickHandler }));
		const observer = new MutationObserver((entries) => {
			[...newContainer.elements].forEach((el) => el.setAttribute("form", form.id));
		});
		observer.observe(newContainer, { subtree: true, childList: true });
		portalsBySection.getOrInsert(section, new Set()).add(newContainer);
		sectionByPortal.set(newContainer, section);
		portalsByContent.getOrInsert(content, new Set()).add(newContainer);
		contentByPortal.set(newContainer, content);
		return newContainer;
	};
	const getTheSection = (target, id) => {
		const sec = target.closest('[data-role="cpform-section"]' + (id ? `[data-section-id="${id}"]` : ""));
		if (sec) {
			return sec;
		}
		const portal = target.closest('[data-role="cpform-portal"]');
		return portal ? getTheSection(sectionByPortal.get(portal), id) : null;
	};
	const getTheContent = (target) => {
		const content = target.closest('[data-role="cpform-content"]');
		if (content) {
			return content;
		}
		const portal = target.closest('[data-role="cpform-portal"]');
		return portal ? contentByPortal.get(portal) : null;
	};
	const getThePart = (target, type) => {
		const part = target.querySelector(`[data-role="cpform-${type}"]`);
		if (part) {
			return part;
		}
		const portal = target.closest('[data-role="cpform-portal"]');
		return portal ? getThePart(portal, type) : null;
	};
	const appendInputsToFd = (fd, inputs) => {
		inputs.forEach((input) => {
			if (input.disabled) {
				return;
			}
			if (input.type === "file") {
				if (input.files[0]) {
					if (input.multiple) {
						Array.prototype.forEach.call(input.files, (file) => fd.append(input.name, file));
					} else {
						fd.append(input.name, input.files[0]);
					}
				}
			} else if (input.type === "checkbox" || input.type === "radio") {
				if (input.checked) {
					fd.append(input.name, input.value);
				}
			} else {
				fd.append(input.name, input.value);
			}
		});
		return fd;
	};
	const submit = (target, action, callback, param) => {
		return new Promise((resolve, reject) => {
			try {
				const fd = getFd(target);
				fd.append("action", "cpform");
				if (action) {
					fd.append("cpform_action", action);
				}
				if (param) {
					Object.keys(param).forEach((key) => fd.append(key, param[key]));
				}
				document.body.classList.add("is-busy");

				wp.apiFetch({
					path: "/cp/v1/form/post",
					method: "POST",
					body: fd,
				})
					.then(function (res) {
						document.body.classList.remove("is-busy");
						var cbs;
						cbs = {};
						if (res.callback) {
							if (!Array.isArray(res.callback)) {
								res.callback = res.callback.split(",");
							}
							res.callback.forEach((cb) => {
								if (cb in callbacks) {
									cbs[cb] = callbacks[cb];
								} else {
									cbs[cb] = window[cb];
								}
							});
						} else {
							if (!callback) {
								callback = "replace";
							}
							if (typeof callback === "function") {
								cbs.callback = callback;
							} else {
								if (!Array.isArray(callback)) {
									callback = callback.split(",");
								}
								callback.forEach((cb, cbn) => {
									if (typeof cb === "function") {
										cbs[cbn] = cb;
									} else {
										if (cb in callbacks) {
											cbs[cb] = callbacks[cb];
										} else {
											cbs[cb] = window[cb];
										}
									}
								});
							}
						}
						form.dispatchEvent(new CustomEvent("before_cpform_callback", res));
						if (res.nonce) {
							const nonceInput = form.querySelector('[name="_cpform_nonce"]');
							window.console.log("reset nonce : from " + nonceInput.value + " to " + res.nonce);
							nonceInput.value = res.nonce;
						}
						Object.keys(cbs).forEach((cbn) => {
							if (cbn) {
								form.dispatchEvent(new CustomEvent("before_" + cbn));
							}
							cbs[cbn](target, res);
							if (cbn) {
								form.dispatchEvent(new CustomEvent("after_" + cbn));
							}
						});
						form.dispatchEvent(new CustomEvent("after_cpform_callback", res));
						form.dispatchEvent(new CustomEvent("update"));
						resolve();
					})
					.catch(function (res) {
						window.console.log(res);
						document.body.classList.remove("is-busy");
						reject();
					});
			} catch (e) {
				window.console.log(e);
				reject();
			}
		});
	};
	const cling = (el, target) => {
		if (!("timer" in cling)) {
			cling.targets = [];
			cling.tick = () => {
				cling.targets.forEach((data, index) => {
					const { el, target } = data;
					if (target.offsetParent) {
						if (!el.offsetParent) {
							el.style.visibility = "visible";
						}
						var bnd1 = el.getBoundingClientRect();
						var bnd2 = target.getBoundingClientRect();
						if (bnd1.width !== bnd2.width || bnd1.height !== bnd2.height || bnd1.left !== bnd2.left || bnd1.top !== bnd2.top) {
							var pos = getComputedStyle(el);
							el.style.width = bnd2.width;
							el.style.height = bnd2.height;
							el.style.left = parseFloat(pos.left) + bnd2.left - bnd1.left + "px";
							el.style.top = parseFloat(pos.top) + bnd2.top - bnd1.top + "px";
						}
					} else {
						if (target.matches("body *")) {
							el.style.visibility = "hidden";
						} else {
							el.remove();
						}
					}
					if (!el.matches("body *")) {
						delete cling.targets[index];
					}
				});
			};
			cling.timer = setInterval(cling.tick, 30);
		}
		el.style.position = "absolute";
		cling.targets.push({ el, target });
	};
	const delayRemove = (el, delay) => {
		if (delay === undefined) {
			delay = 1000;
		}
		return new Promise((resolve) => {
			el.classList.add("transition", "from", "del");
			setTimeout(() => {
				el.classList.remove("from");
				el.classList.add("to");
			}, 1);
			setTimeout(() => {
				el.remove();
				resolve();
			}, delay);
		});
	};
	const delayReplace = (from, to, delay) => {
		if (delay === undefined) {
			delay = 1000;
		}
		return new Promise((resolve) => {
			from.classList.add("transition", "from", "org");
			to.classList.add("transition", "from", "new");
			from.after(to);
			setTimeout(() => {
				from.classList.remove("from");
				from.classList.add("to");
				to.classList.remove("from");
				to.classList.add("to");
			}, 1);
			setTimeout(() => {
				from.remove();
				resolve();
			}, delay);
		});
	};

	const requireStyles = (styles) => {
		styles
			.filter(function (href) {
				for (let i = 0; i < document.styleSheets.length; i++) {
					if (document.styleSheets[i].href === href) {
						return false;
					}
				}
				return true;
			})
			.map((href) => {
				const el = document.createElement("link");
				el.setAttribute("rel", "stylesheet");
				el.setAttribute("href", href);
				document.head.appendChild(el);
			});
	};
	const requireScripts = async (scripts) => {
		var scriptsFlag = {};
		for (let i = 0; i < document.scripts.length; i++) {
			scriptsFlag[document.scripts[i].src.split("?")[0]] = true;
		}
		for (const script of scripts) {
			if (!scriptsFlag[script]) {
				await loadScript(script);
			}
		}
	};
	const loadScript = (src) => {
		return new Promise((resolve) => {
			const el = document.createElement("script");
			el.setAttribute("type", "text/javascript");
			el.setAttribute("src", src);
			document.body.appendChild(el);
			el.onload = el.onreadystatechange = function (_, isAbort) {
				if (isAbort || !el.readyState || /loaded|complete/.test(el.readyState)) {
					el.onload = el.onreadystatechange = null;
					if (!isAbort) {
						resolve();
					}
				}
			};
		});
	};
	const htmlStringToNode = (html) => {
		const dummy = document.createElement("div");
		dummy.innerHTML = html;
		return dummy.children[0];
	};
	const evalScript = (el) => {
		const script = document.createElement("script");
		script.type = "text/javascript";
		script.appendChild(document.createTextNode(el.textContent));
		document.head.prepend(script);
		script.remove();
	};
	const activateElement = (el) => {
		el.classList.add("active");
		el.classList.remove("inactive");
		el.dispatchEvent(new CustomEvent("activate"));
	};
	const inactivateElement = (el) => {
		el.classList.add("inactive");
		el.classList.remove("active");
		el.dispatchEvent(new CustomEvent("inactivate"));
	};
	const callbacks = {
		message: function (target, data) {
			const sec = target === form && target.dataset.role === "cpform-section" ? target : target.closest('form,[data-role="cpform-section"]');
			const id = sec === form ? form.id : sec.dataset.sectionId;
			var msgBox = form.querySelector('[data-role="cpform-message"][data-form-id="' + id + '"]');
			if (!msgBox) {
				window.console.error("Messge Box for the form is not exists");
				window.console.error(data);
				return;
			}
			msgBox.classList.remove("has-task");
			msgBox.replaceChildren();

			data.message.forEach(function (msg) {
				if (!msg.class) {
					msg.class = "";
				}
				const msgEl = el("div", { className: "message " + msg.class }, [el("div", { className: "text" }, [msg.message])]);
				msgBox.append(msgEl);
				if (msg.selector) {
					var tgt;
					if (form.matches(msg.selector)) {
						tgt = form;
						msgEl.classList.add("has-no-target");
						msgBox.append(msgEl);
					} else {
						tgt = form.querySelector(msg.selector);
						if (!tgt) {
							window.console.error('Invalid input "' + msg.selector + '" was not found in this form');
							window.console.error(msg.message);
							return;
						}
						msgEl.classList.add("has-target");
						cling(msgEl, tgt);
						tgt.addEventListener("change", () => {
							delayRemove(msgEl);
						});
					}
				}
				if (msgBox.querySelector(".task")) {
					msgBox.classList.add("has-task");
				}
			});
			cling.tick();
			const topMessage = Array.from(form.querySelectorAll(".message")).reduce((p, c) => {
				p.getBoundingClientRect().top < c.getBoundingClientRect().top ? p : c;
			});
			topMessage.scrollIntoView({ behavior: "smooth", block: "center" });
			form.dispatchEvent(new CustomEvent("update"));
			return true;
		},
		replace: function (target, data) {
			var tgt, sel;
			if (data.target) {
				if (target.matches("form")) {
					tgt = form.querySelector('[data-role="cpform-' + data.target + '"]' + (data.target === "section" && data.section_id ? '[data-section-id="' + data.section_id + '"]' : ""));
				} else {
					switch (data.target) {
						case "content":
							tgt = getTheContent(target);
							break;
						case "section":
							tgt = getTheSection(target, data.section_id);
							break;
						default:
							tgt = getThePart(target, data.target);
							break;
					}
				}
			} else {
				tgt = target.matches("form") ? target.querySelector('[data-role="cpform-content"]') : getTheSection(target) || getTheContent(target);
			}
			const newItem = htmlStringToNode(data.html);

			if (data.deps) {
				requireStyles(data.deps.styles);
				requireScripts(data.deps.scripts).then(() => {
					if (data.delay) {
						delayReplace(tgt, newItem);
					} else {
						tgt.innerHTML = data.html;
					}
				});
			} else {
				if (data.delay) {
					delayReplace(tgt, newItem);
				} else {
					tgt.innerHTML = data.html;
				}
			}
			tgt.dispatchEvent(new CustomEvent("replace"));
			tgt.scrollIntoView({ behavior: "smooth" });
		},
		insert: function (target, data) {
			const tgt = data.selector ? form.querySelector(data.selector) : target;
			if (!tgt) {
				window.console.error(data.selector + '" was not found in this form');
			}
			if (data.position === undefined) {
				data.position = "before";
			}
			const newItem = htmlStringToNode(data.html);
			tgt[data.position](newItem);
			form.dispatchEvent(new CustomEvent("update"));
			if (data.scroll) {
				newItem.scrollIntoView({ behavior: "smooth" });
			}
		},
		remove: function (target, data) {
			const tgt = data.section_id ? form.querySelector('[data-role="cpform-section"][data-section-id="' + data.section_id + '"]') : target.closest('form,[data-role="cpform-section"]');
			if (data.delay) {
				delayRemove(tgt);
			} else {
				tgt.remove();
			}
			return true;
		},
		replace_items: function (target, data) {
			data.items.forEach(function (item) {
				var tgt = form.querySelector(item.selector);
				if (!tgt) {
					window.console.error(item.selector + '" was not found in this form');
				}
				const newItem = htmlStringToNode(data.html);
				tgt.replaceWith(newItem);
			});
			form.dispatchEvent(new CustomEvent("update"));
			return true;
		},
		insert_items: function (target, data) {
			data.items.forEach(function (item) {
				const tgt = item.selector ? target.querySelector(item.selector) : target;
				if (!tgt) {
					window.console.error(item.selector + '" was not found in this form');
				}
				if (item.position === undefined) {
					item.position = "before";
				}
				tgt[data.position](htmlStringToNode(item.html));
			});
			form.dispatchEvent(new CustomEvent("update"));
			return true;
		},

		delay_replace: function (target, data) {
			data.delay = true;
			return callbacks.replace(target, data);
		},
		delay_replace_items: function ($form, data) {
			return new Promise((resolve) => {
				var cnt = 0;
				data.items.forEach(function (item) {
					const tgt = form.querySelector(item.selector).closest(".cp-meta-item");
					if (!tgt) {
						window.console.log('Item to replace "' + item.selector + '" was not found in this form');
					}
					cnt++;
					callbacks.delay_replace(tgt, htmlStringToNode(item.html)).then(() => {
						cnt--;
						if (cnt < 1) {
							resolve();
						}
					});
				});
			});
		},
		delay_remove: function (target, data) {
			data.delay = true;
			return callbacks.remove(target, data);
		},

		lightbox: function (target, data) {
			return new Promise((resolve) => {
				const container = getLightboxContainer(target);
				if (data.deps) {
					callbacks.require_styles(data.deps.styles);
					callbacks.require_scripts(data.deps.scripts).then(() => {
						container.innerHTML = data.html;
						lightboxActions.open(container.id);
					});
				} else {
					container.innerHTML = data.html;
					lightboxActions.open(container.id);
				}
			});
		},
		lightbox_close: function (target) {
			console.log("close lightbox");
			lightboxActions.close();
		},

		feed: function (target, data) {
			data.message.forEach(function (msg) {
				form
					.querySelector(msg.selector)
					.classList.add("has-message", msg.class)
					.after(el("span", { className: "message " + msg.class }, msg.message));
			});
			form.dispatchEvent(new CustomEvent("update"));
			return true;
		},
		redirect: function ($form, data) {
			location.href = data.url;
			return true;
		},
		reload: function () {
			location.reload();
			return true;
		},
		download: function (target, data) {
			var blob = new Blob([data.html], { type: data.type || "text/plain" });
			var url = window.URL || window.webkitURL;
			var blobURL = url.createObjectURL(blob);

			var a = document.createElement("a");
			a.download = data.name || "undefined.txt";
			a.href = blobURL;
			a.click();
			a.remove();
			return true;
		},

		submit_again: function (target, data) {
			var prm = data.submit || { delay: 1000, action: "action" };
			if (prm.delay === undefined) {
				return submit(target, prm.action, prm.callback, prm.param);
			} else {
				return new Promise((resolve) => {
					setTimeout(function () {
						submit(target, prm.action, prm.callback, prm.param).then(resolve);
					}, prm.delay);
				});
			}
		},

		ticker: function (target, data) {
			return new Promise((resolve, reject) => {
				var fd, prm;
				fd = getFd(target);
				fd.append("cp_thread[path]", data.thread.path);
				fd.append("cp_thread[id]", data.tread.id);
				target.on("change", function () {
					fd = getFd(target);
					fd.append("cp_thread[path]", data.thread.path);
					fd.append("cp_thread[id]", data.tread.id);
				});
				if (data.timer === undefined) {
					prm = { interval: 500 };
				} else {
					prm = data.timer;
				}
				if (prm.interval === undefined) {
					prm.interval = 500;
				}
				var tick = function () {
					fetch(cp.plugins_url + "/catpow/callee/cpform_tick.php", {
						method: "POST",
						body: fd,
					})
						.then((res) => res.json())
						.then((res) => {
							if (res.callback) {
								try {
									var rtn;
									if (res.callback in callbacks) {
										rtn = callbacks[res.callback](target, res);
									} else {
										rtn = window[res.callback](target, res);
									}
									if (typeof rtn === "object") {
										rtn.done(function () {
											setTimeout(tick, prm.interval);
										});
									} else if (rtn === true) {
										setTimeout(tick, prm.interval);
									}
								} catch (e) {
									window.console.error(e);
									reject();
								}
							} else {
								setTimeout(tick, prm.interval);
							}
						})
						.catch(function (e, ts, et) {
							window.console.error("status:" + e.status);
							window.console.error(ts);
							window.console.error(et);
							if (parseInt(e.status) === 200) {
								fetch(cp.plugins_url + "/catpow/callee/cpform_tick.php", {
									method: "post",
									body: fd,
								}).then((res) => {
									window.console.error(res);
								});
							}
						});
				};
				setTimeout(tick, prm.interval);
			});
		},

		return_true: function () {
			return true;
		},
		return_false: function () {
			return false;
		},
		wait: function (target, data) {
			return new Promise((resolve) => {
				setTimeout(resolve, data.wait || 2000);
			});
		},
	};
};

(async () => {
	if (document.readyState === "loading") {
		await new Promise((resolve) => {
			document.addEventListener("DOMContentLoaded", resolve);
		});
	}
	document.querySelectorAll('form [name="cpform_id"]').forEach((el) => {
		const form = el.closest("form");
		if (form) {
			cpform(form);
		}
	});
})();
