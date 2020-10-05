import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';

//import { toggleSidebar } from '../../Store/reducers/Layout';
import { logout } from '../../Store/Actions/Auth';
import {getToDoList} from '../../Store/Actions/ToDo';

import LayoutView from './Components';


export default compose(
  connect(
    state => ({
      //isSidebarOpened: state.layout.isSidebarOpened,
      isAuthenticated: state.auth.isAuthenticated
    }), { logout, getToDoList },
  ),
  withState("sidebarOpen", "setSidebarOpen", false),
  withState("filter", "setFilter", {
    findText: '',
    done: false
  }),
)(LayoutView);