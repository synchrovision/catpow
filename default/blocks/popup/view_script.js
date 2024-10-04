(() => {
  // modules/util/ready.jsx
  var ready = (cb) => document.readyState !== "loading" ? cb() : document.addEventListener("DOMContentLoaded", cb);

  // modules/util/observeSelector.jsx
  var observeSelector = (selector, callback) => {
    const observer = new MutationObserver((mutationList) => {
      mutationList.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof Element) {
              node.querySelectorAll(selector).forEach(callback);
            }
          });
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    document.querySelectorAll(selector).forEach(callback);
  };

  // ../default/blocks/popup/view_script.jsx
  ready(() => {
    const blocks = Array.from(document.querySelectorAll(".wp-block-catpow-popup"));
    const openBlock = (block) => {
      return new Promise((resolve) => {
        if (block.classList.contains("is-open")) {
          return resolve();
        }
        block.classList.remove("is-hidden");
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            block.classList.add("is-open");
            block.classList.remove("is-close");
          });
        });
        const cb = () => {
          block.removeEventListener("transitionend", cb);
          resolve();
        };
        block.addEventListener("transitionend", cb);
      });
    };
    const closeBlock = (block) => {
      return new Promise((resolve) => {
        if (block.classList.contains("is-hidden")) {
          return resolve();
        }
        block.classList.add("is-close");
        block.classList.remove("is-open");
        const cb = () => {
          block.removeEventListener("transitionend", cb);
          if (block.classList.contains("is-close")) {
            block.classList.add("is-hidden");
          }
          resolve();
        };
        block.addEventListener("transitionend", cb);
      });
    };
    const closeBlocks = (blocks2) => {
      return Promise.all(blocks2.map((block) => closeBlock(block)));
    };
    blocks.forEach(function(block) {
      observeSelector('a[href="#' + block.id + '"]', (el) => {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          closeBlocks(blocks).then(() => openBlock(block));
        });
      });
      block.querySelectorAll(":scope>.bg, :scope>.body>.close").forEach(function(el) {
        el.addEventListener("click", () => closeBlock(block));
      });
      document.body.append(block);
    });
  });
})();
