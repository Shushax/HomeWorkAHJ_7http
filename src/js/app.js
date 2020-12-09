/* eslint import/no-cycle:0 */ // --> OFF
/* eslint  import/prefer-default-export:0 */ // --> OFF

import start from './start';
import next from './next';

start();
export const intervalID = setInterval(next, 1000);
