import {requireAuthentication} from '../../utils';
import SmallPage from './SmallPage';
import SmallIndex from './SmallIndex';
import SmallListContainer from './SmallListContainer';
import SmallFormContainer from './SmallFormContainer';

const route = {
  path: 'small',
  component: requireAuthentication(SmallPage),
  indexRoute: { components: {content: SmallIndex} },
  childRoutes: [
    { path: 'form', components: {content: SmallFormContainer} },
    { path: 'search', components: {content: SmallListContainer} }
  ],
};

Object.assign(exports, route);
export default route;
