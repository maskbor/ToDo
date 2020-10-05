import { compose, withState, withHandlers, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import View from "./Components";
import { signup } from "../../Store/Actions/Auth";

export default compose(
  connect(
    state => ({
      isLoading: state.auth.isLoading,
      isAuthenticated: state.auth.isAuthenticated,
      error: state.auth.error
    }),
    { signup }
  ),
  withRouter,
  withState("user", "setUser", {
    name: '',
    email: '',
    password: '',
    c_password: '',
  }),
  withHandlers({
    handleSubmit: props => () => {
      props.signup(props.user);
    }
  }),
  lifecycle({
    /*componentWillReceiveProps(nextProps) {
      if (!this.props.error && nextProps.error) {
        this.props.setPassword("");
      }
    }*/
  })
)(View);
