import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Layout from '../../../Containers/Layout';
import Login from '../../../Pages/Login';
import Signup from '../../../Pages/Signup';
import { Segment, Loader, Dimmer } from 'semantic-ui-react';

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest} render={props => (
        isAuthenticated ? (
          React.createElement(component, props)
        ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    )}
    />
  );
};

class View extends React.Component {
  
  render() {
    return (
      <>
        { this.props.isAuthenticated === null ?
            <Dimmer.Dimmable as={Segment} dimmed={this.props.isAuthenticated === null}>
              <Dimmer active={this.props.isAuthenticated === null} inverted page>
                <Loader>Loading</Loader>
              </Dimmer>
          </Dimmer.Dimmable>
        :
          <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <PrivateRoute isAuthenticated={ this.props.isAuthenticated } path="/" component={ Layout } />
            </Switch>
          </BrowserRouter>
        }
      </>
    );
  }
}
  

export default View;