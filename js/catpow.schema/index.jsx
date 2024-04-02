import {main} from  './main.jsx';
import * as consts from './consts.jsx';
import * as methods from './methods.jsx';

window.Catpow.schema=main;
Object.Assign(window.Catpow.schema,consts,methods);