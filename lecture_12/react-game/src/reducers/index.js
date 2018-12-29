import { combineReducers } from 'redux';

import companyReducer from './company';
import developersReducer from './developers';
import managersReducer from './managers';
import projectsReducer from './projects';

const rootReducer = combineReducers({
   company: companyReducer,
   projects: projectsReducer,
   managers: managersReducer,
   developers: developersReducer
});

export default rootReducer;