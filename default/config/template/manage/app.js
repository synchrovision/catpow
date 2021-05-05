var app = function app(props) {
	var useCallback = wp.element.useCallback;


	var App = useCallback(function (props) {
		var _wp$element = wp.element,
		    useContext = _wp$element.useContext,
		    useCallback = _wp$element.useCallback,
		    Fragment = _wp$element.Fragment;
		var _Catpow$Finder = Catpow.Finder,
		    Nav = _Catpow$Finder.Nav,
		    Spacer = _Catpow$Finder.Spacer,
		    Main = _Catpow$Finder.Main,
		    SelectLayout = _Catpow$Finder.SelectLayout,
		    SelectColumns = _Catpow$Finder.SelectColumns,
		    BulkControl = _Catpow$Finder.BulkControl,
		    FilterControl = _Catpow$Finder.FilterControl,
		    Download = _Catpow$Finder.Download,
		    PerPage = _Catpow$Finder.PerPage,
		    Status = _Catpow$Finder.Status,
		    Contents = _Catpow$Finder.Contents,
		    Pagenate = _Catpow$Finder.Pagenate;

		var _useContext = useContext(Catpow.FinderContext),
		    state = _useContext.state,
		    dispatch = _useContext.dispatch;

		return wp.element.createElement(
			Catpow.Transition,
			null,
			state.focused ? wp.element.createElement(
				Fragment,
				{ depth: 2 },
				wp.element.createElement("div", { className: "icon dashicons dashicons-arrow-left-alt", onClick: function onClick() {
						return dispatch({ type: 'blurItem' });
					} }),
				wp.element.createElement(
					"div",
					null,
					state.focused.simei,
					"\u543E\u8F29\u306F\u732B\u3067\u3042\u308B\u3002\u540D\u524D\u306F\u307E\u3060\u306A\u3044\u3002\u3069\u3053\u3067\u751F\u308C\u305F\u304B\u9813\u3068\u898B\u5F53\u304C\u3064\u304B\u306C\u3002\u4F55\u3067\u3082\u8584\u6697\u3044\u3058\u3081\u3058\u3081\u3057\u305F\u6240\u3067\u30CB\u30E3\u30FC\u30CB\u30E3\u30FC\u6CE3\u3044\u3066\u3044\u305F\u4E8B\u3060\u3051\u306F\u8A18\u61B6\u3057\u3066\u3044\u308B\u3002\u543E\u8F29\u306F\u3053\u3053\u3067\u59CB\u3081\u3066\u4EBA\u9593\u3068\u3044\u3046\u3082\u306E\u3092\u898B\u305F\u3002\u3057\u304B\u3082\u3042\u3068\u3067\u805E\u304F\u3068\u305D\u308C\u306F\u66F8\u751F\u3068\u3044\u3046\u4EBA\u9593\u4E2D\u3067\u4E00\u756A\u7370\u60AA\u306A\u7A2E\u65CF\u3067\u3042\u3063\u305F\u305D\u3046\u3060\u3002\u3053\u306E\u66F8\u751F\u3068\u3044\u3046\u306E\u306F\u6642\u3005\u6211\u3005\u3092\u6355\u3048\u3066\u716E\u3066\u98DF\u3046\u3068\u3044\u3046\u8A71\u3067\u3042\u308B\u3002\u3057\u304B\u3057\u305D\u306E\u5F53\u6642\u306F\u4F55\u3068\u3044\u3046\u8003\u3082\u306A\u304B\u3063\u305F\u304B\u3089\u5225\u6BB5\u6050\u3057\u3044\u3068\u3082\u601D\u308F\u306A\u304B\u3063\u305F\u3002\u305F\u3060\u5F7C\u306E\u638C\u306B\u8F09\u305B\u3089\u308C\u3066\u30B9\u30FC\u3068\u6301\u3061\u4E0A\u3052\u3089\u308C\u305F\u6642\u4F55\u3060\u304B\u30D5\u30EF\u30D5\u30EF\u3057\u305F\u611F\u3058\u304C\u3042\u3063\u305F\u3070\u304B\u308A\u3067\u3042\u308B\u3002\u638C\u306E\u4E0A\u3067\u5C11\u3057\u843D\u3061\u4ED8\u3044\u3066\u66F8\u751F\u306E\u9854\u3092\u898B\u305F\u306E\u304C\u3044\u308F\u3086\u308B\u4EBA\u9593\u3068\u3044\u3046\u3082\u306E\u306E\u898B\u59CB\u3067\u3042\u308D\u3046\u3002\u3053\u306E\u6642\u5999\u306A\u3082\u306E\u3060\u3068\u601D\u3063\u305F\u611F\u3058\u304C\u4ECA\u3067\u3082\u6B8B\u3063\u3066\u3044\u308B\u3002\u7B2C\u4E00\u6BDB\u3092\u4EE5\u3066\u88C5\u98FE\u3055\u308C\u3079\u304D\u306F\u305A\u306E\u9854\u304C\u3064\u308B\u3064\u308B\u3057\u3066\u307E\u308B\u3067\u85AC\u7F36\u3060\u3002\u305D\u306E\u5F8C\u732B\u306B\u3082\u5927\u5206\u9022\u3063\u305F\u304C\u3053\u3093\u306A\u7247\u8F2A\u306B\u306F\u4E00\u5EA6\u3082\u51FA\u4F1A\u308F\u3057\u305F\u4E8B\u304C\u306A\u3044\u3002\u306E\u307F\u306A\u3089\u305A\u9854\u306E\u771F\u4E2D\u304C\u4F59\u308A\u306B\u7A81\u8D77\u3057\u3066\u3044\u308B\u3002\u305D\u3046\u3057\u3066\u305D\u306E\u7A74\u306E\u4E2D\u304B\u3089\u6642\u3005\u3077\u3046\u3077\u3046\u3068\u70DF\u3092\u5439\u304F\u3002\u3069\u3046\u3082\u54BD\u305B\u307D\u304F\u3066\u5B9F\u306B\u5F31\u3063\u305F\u3002\u3053\u308C\u304C\u4EBA\u9593\u306E\u98F2\u3080\u70DF\u8349\u3068\u3044\u3046\u3082\u306E\u3067\u3042\u308B\u4E8B\u306F\u6F38\u304F\u3053\u306E\u9803\u77E5\u3063\u305F\u3002"
				)
			) : wp.element.createElement(
				Fragment,
				{ depth: 1 },
				wp.element.createElement(
					Nav,
					null,
					wp.element.createElement(BulkControl, null),
					wp.element.createElement(SelectLayout, null),
					wp.element.createElement(SelectColumns, null),
					wp.element.createElement(FilterControl, null),
					wp.element.createElement(Download, null),
					wp.element.createElement(Spacer, null),
					wp.element.createElement(PerPage, null),
					wp.element.createElement(Status, null)
				),
				wp.element.createElement(
					Main,
					null,
					wp.element.createElement(Contents, null)
				),
				wp.element.createElement(Pagenate, null)
			)
		);
	}, []);

	return wp.element.createElement(
		Catpow.Finder,
		props,
		wp.element.createElement(App, null)
	);
};
