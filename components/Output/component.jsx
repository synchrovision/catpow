Catpow.Output = (props) => {
	const { conf, value } = props;
	const { createElemnt: el } = wp.element;
	if (!value) return "";
	switch (conf.output_type) {
		case "group":
			return (
				<ul className="cp-output-group">
					{Object.keys(value).map((key) => {
						const row = value[key];
						return (
							<li className="item" key={key}>
								{Object.keys(conf.meta).map((name) => (
									<dl key={name}>
										<dt>{conf.meta[name].label}</dt>
										<dd>
											<Catpow.Output conf={conf.meta[name]} value={row[name]} />
										</dd>
									</dl>
								))}
							</li>
						);
					})}
				</ul>
			);
		case "select":
		case "radio":
		case "checkbox": {
			const labels = (Array.isArray(value) ? value : [value]).filter((val) => !!val).map((val) => (conf.dict ? conf.dict[val] : val));
			if (!labels.length) {
				return false;
			}
			return (
				<ul className="cp-output-labels">
					{labels.map((label, index) => (
						<li className="item" key={index}>
							{label}
						</li>
					))}
				</ul>
			);
		}
		case "image":
			return (
				<ul className="cp-output-images">
					<li className="item">
						{props.images.map((image, index) => (
							<img className="image" src={image.url} key={index} />
						))}
					</li>
				</ul>
			);
		default:
			return value.join(",");
	}
};
