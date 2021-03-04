import React from 'react'
import { Button, Form, Message, Segment, Dimmer, Loader, Confirm, List, Checkbox } from 'semantic-ui-react'
import CreateFormToDo from '../../Create'
import moment from 'moment'

const LoginForm = (props) => {
    return (
    <>
    <Dimmer.Dimmable as={Segment} dimmed={props.isLoading}>
          <Dimmer active={props.isLoading} inverted>
            <Loader></Loader>
          </Dimmer>
          <CreateFormToDo />

          <List divided relaxed verticalAlign='middle'>        
          { props.list.map(item => 
<>
          { item.id === props.editedTodo.id ?
            <List.Item>
            <Form>
            { props.error && props.error.list &&
                <Message
                    error
                    header='Произошла ошибка:'
                    list={props.error.list}
                />
            }
<Form.Group inline widths='equal'>
              <Checkbox
              name='done'
                  onChange={(e, {name, value}) => props.setEditedTodo({ ...props.editedTodo, [name]: +!value })}
                  checked={!!props.editedTodo.done}
                />
                <Form.Input
                    fluid
                    label='Заголовок:'
                    placeholder='Введити заголовок...'
                    name='title'
                    value={props.editedTodo.title}
                    onChange={(e, {name, value}) => props.setEditedTodo({ ...props.editedTodo, [name]: value })}
                />
                <Form.Input
                    fluid
                    label='Описание:'
                    placeholder='Введите описание...'
                    name='description'
                    value={props.editedTodo.description}
                    onChange={(e, {name, value}) => props.setEditedTodo({ ...props.editedTodo, [name]: value })}
                />
                <Button.Group>
            <Button icon='edit' basic color='blue' loading={props.isLoadingItem} disabled={props.isLoadingItem} 
              onClick={()=>{
                  props.handleEdit();
                }
              } 
            />
            <Button icon='cancel' basic loading={props.isLoadingItem} disabled={props.isLoadingItem} 
              onClick={()=>{
                  props.handleCancelEdit();
                }
              } 
            />
          </Button.Group>
            </Form.Group>
            </Form>
          </List.Item>
          :
          <List.Item>
          <List.Content floated='right'>
          <Button.Group>
            <Button icon='edit' basic color='blue' 
              onClick={()=>{                  
                  props.setEditedTodo(item);
                }
              } 
            />
            <Button icon='delete' basic color='red' 
              onClick={()=>{
                  props.setDeletedId(item.id);
                  props.setOpenConfirmDeleteDialog(true);
                }
              } 
            />
          </Button.Group>
          </List.Content>
          <List.Content floated='left'>
            <Checkbox
              onChange={() => {props.editToDoDone(item)}}
              checked={!!item.done}
            />
          </List.Content>
          
          <List.Content>
            <List.Header>{item.title} Дата создания: {moment(item.created_at).format("LLL")} ({moment(item.created_at).fromNow()})</List.Header>
            <List.Description >{item.description}</List.Description>
          </List.Content>
        </List.Item>
        }
          </>)}
  </List>

<Confirm
          open={props.openConfirmDeleteDialog}
          content="Вы уверены?"
          cancelButton='Отмена'
          confirmButton="Удалить"
          onCancel={() => props.setOpenConfirmDeleteDialog(false)}
          onConfirm={() => {props.deleteToDo(props.deletedId);props.setOpenConfirmDeleteDialog(false);}}
        />

</Dimmer.Dimmable>
  </>
)}

export default LoginForm