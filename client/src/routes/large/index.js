import {requireAuthentication} from '../../utils';
import LargePage from './LargePage';
import LargeIndex from './LargeIndex';
import LargeListContainer from './LargeListContainer';
import LargeFormContainer from './LargeFormContainer';

module.exports = {
  path: 'large',
  component: requireAuthentication(LargePage),
  indexRoute: { components: {content: LargeIndex} },
  childRoutes: [
    { path: 'form', components: {content: LargeFormContainer} },
    { path: 'search', components: {content: LargeListContainer} }
  ],
};
