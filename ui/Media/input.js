Catpow.UI.Media = function (_wp$element$Component) {
	babelHelpers.inherits(_class, _wp$element$Component);

	function _class(props) {
		babelHelpers.classCallCheck(this, _class);

		var _this = babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

		_this.state = { value: props.value };
		if (undefined === Catpow.uploader) {
			Catpow.uploader = wp.media({
				title: 'Select Image',
				button: { text: 'Select' },
				multiple: false
			});
		}
		return _this;
	}

	babelHelpers.createClass(_class, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var value = this.state.value;
			var type = value.type,
			    mime = value.mime,
			    size = value.size,
			    src = value.src,
			    srcset = value.srcset,
			    alt = value.alt;

			var el = wp.element.createElement;

			var selectMedia = function selectMedia() {
				Catpow.uploader.off('select').on('select', function () {
					var image = Catpow.uploader.state().get('selection').first().toJSON();
					var value = {
						mime: image.mime,
						alt: image.alt
					};
					if (size && image.sizes && image.sizes[size]) {
						value.src = image.sizes[size].url;
					} else {
						value.src = image.url;
					}
					if (image.sizes) {
						value.srcset = image.sizes.medium_large.url + ' 480w,' + image.url;
					}
					_this2.setState({ value: value });
				}).open();
			};

			return wp.element.createElement(
				'div',
				{ className: 'Media' },
				el(type, { src: src, className: 'preview', onClick: selectMedia }),
				wp.element.createElement(Catpow.UI.HiddenValues, {
					name: this.props.name,
					value: value
				})
			);
		}
	}]);
	return _class;
}(wp.element.Component);
