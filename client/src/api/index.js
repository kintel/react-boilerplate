import {ping} from './ping';
import * as smallitems from './smallitems';
import * as largeitems from './largeitems';

export default {
  ping,
  smallitems: { ...smallitems },
  largeitems: { ...largeitems },
};
