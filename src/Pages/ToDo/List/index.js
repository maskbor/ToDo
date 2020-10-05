import { compose, lifecycle, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { getToDoList, deleteToDo, getToDo, editToDo, editToDoDone } from '../../../Store/Actions/ToDo';

import View from './Components';


export default compose(
  connect(
    state => ({
      isAuthenticated: state.auth.isAuthenticated,
      current_page: state.todo.current_page,
      current: state.todo.current,
      list: state.todo.list,
      total: state.todo.total,
      isLoading: state.todo.isLoading,
      isLoadingItem: state.todo.isLoadingItem,
      error: state.todo.error
    }), { getToDoList, deleteToDo, getToDo, editToDo, editToDoDone },
  ),
  
  withState("editedTodo", "setEditedTodo", {
    id: null,
    title: '',
    description: '',
    done: null
  }),

  withState("openConfirmDeleteDialog", "setOpenConfirmDeleteDialog", false),
  withState("deletedId", "setDeletedId", -1),
  withHandlers({
    handleChangeFilter: props => () => {
        props.getToDoList(props.filter);
    },
    handleEdit: props => () => {
      props.editToDo(props.editedTodo).then((ret) => {
        ret && props.setEditedTodo({
          id: null,
          title: '',
          description: '',
          done: null
        })
      })
      
    },
    handleCancelEdit: props => () => {
      props.setEditedTodo({
        id: null,
        title: '',
        description: '',
        done: null
      })
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.getToDoList();
    }
  })
)(View);