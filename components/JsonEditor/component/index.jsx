/**
* JSONデータを編集するためのコンポーネント
* childrenにschemaに応じた入力コンポーネントのクラス・関数を返す関数を渡すことで
* 独自のschemaのフォーマットに対応した拡張が可能です
* いくつかのCatpow独自の拡張を備えています
*/

import {JsonEditor,DataContext} from './JsonEditor.jsx';

window.Catpow.JsonEditor=JsonEditor;
JsonEditor.DataContext=DataContext;