import { compose, withState, withHandlers, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import LoginView from "./Components";
import { loginUser } from "../../Store/Actions/Auth";

export default compose(
  connect(
    state => ({
      isLoading: state.auth.isLoading,
      isAuthenticated: state.auth.isAuthenticated,
      error: state.auth.error
    }),
    { loginUser }
  ),
  withRouter,
  withState("login", "setLogin", ""),
  withState("password", "setPassword", ""),
  withHandlers({
    handleLoginButtonClick: props => () => {
      props.loginUser(props.login, props.password);
    }
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (!this.props.error && nextProps.error) {
        this.props.setPassword("");
      }
    }
  })
)(LoginView);
