import { CP } from "./CP.jsx";

CP.ServerSideRenderPart = (props) => {
	const { className, ...otherProps } = props;
	return <div className={className}>{"[ssr_parts" + Object.keys(otherProps).reduce((p, c) => (p += ` ${c}=${otherProps[c]}`), "") + "]"}</div>;
};
CP.ServerSideRenderPart.Preview = (props) => {
	const { className, name, ...otherProps } = props;
	const { RawHTML, useState, useMemo, useRef, useEffect } = wp.element;
	const [response, setResponse] = useState(false);
	const [hold, setHold] = useState(false);
	const [stylesheets, setStylesheets] = useState([]);

	useEffect(() => {
		if (hold) {
			return;
		}
		const path = "/cp/v1/blocks/parts/" + name;
		const data = otherProps;
		console.log(data);
		const post_id = wp.data.select("core/editor").getCurrentPostId();
		if (post_id) {
			data.post_id = post_id;
		}
		wp.apiFetch({ path, data, method: "POST" })
			.then((res) => {
				if (!res) {
					return;
				}
				setStylesheets(res.deps.styles);
				setResponse(res.rendered);
			})
			.catch((res) => {
				console.error(res);
			})
			.finally(() => {
				setTimeout(() => setHold(false), 500);
			});
		setHold(true);
	}, [name, JSON.stringify(otherProps)]);

	return (
		<>
			<RawHTML className={className}>{response}</RawHTML>
			{stylesheets.map((stylesheet) => (
				<link rel="stylesheet" href={stylesheet} key={stylesheet} />
			))}
		</>
	);
};
