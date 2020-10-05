import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import { loadSavedSession } from '../../Store/Actions/Auth';

import View from './Components';

export default compose(
  connect(
    state => ({
      isAuthenticated: state.auth.isAuthenticated,
    }), { loadSavedSession }
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadSavedSession();
    }
  })

)(View);