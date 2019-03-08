/** extract polyfill imports here
 *  to reduce the size of the bundle of the initial page
 *  , do not load it when it is unnecessary but load it on demand.
 */
import 'babel-polyfill';
import 'isomorphic-fetch';
