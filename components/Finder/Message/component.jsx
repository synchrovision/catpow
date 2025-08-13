/**
 * メッセージを表示
 */

Catpow.Finder.Message = (props) => {
	const { callback } = props;
	const { useState, useCallback, useMemo, useEffect, useContext } = wp.element;
	const { __ } = wp.i18n;
	const { state, dispatch } = useContext(Catpow.FinderContext);
	const { message, showMessage } = state;

	return (
		<Catpow.Popup open={showMessage} onClose={() => dispatch({ type: "hideMessage" })} closeButton={true}>
			<div className="cp-finder-message">
				<div className="cp-finder-message__body">{message}</div>
			</div>
		</Catpow.Popup>
	);
};
