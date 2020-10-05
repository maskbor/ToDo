import { compose, lifecycle, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { addToDo } from '../../../Store/Actions/ToDo';

import View from './Components';

export default compose(
  connect(
    state => ({
      isAuthenticated: state.auth.isAuthenticated,
      isLoading: state.todo.isLoadingItem,
      error: state.todo.error
    }), { addToDo },
  ),
  withState("todo", "setTodo", {
    title: '',
    description: '',
  }),
  withHandlers({
    handleSubmit: props => () => {
      props.addToDo(props.todo);
      props.setTodo({
        title: '',
        description: '',
      })
    },
  }),
)(View);