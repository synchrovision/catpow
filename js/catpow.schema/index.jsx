import {main} from  './main.jsx';
import * as consts from './consts.jsx';
import * as methods from './methods.jsx';

window.Catpow.schema=main;
Object.assign(window.Catpow.schema,consts,methods);