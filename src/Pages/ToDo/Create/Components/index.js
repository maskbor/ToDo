import React from 'react'
import { Button, Form, Menu, Dropdown, Message, Select, Icon, Container, Header } from 'semantic-ui-react'

function Create(props) { 
    
    return (
            <Container>

            <Menu secondary>
                <Header as='h2'>Добавление</Header>
            </Menu>
            { props.error && props.error.list &&
                <Message
                    error
                    header='Произошла ошибка:'
                    list={props.error.list}
                />
            }
<Form>
<Form.Group inline widths='equal'>
                <Form.Input
                    fluid
                    label='Заголовок:'
                    placeholder='Введити заголовок...'
                    name='title'
                    value={props.todo.title}
                    onChange={(e, {name, value}) => props.setTodo({ ...props.todo, [name]: value })}
                />
                <Form.Input
                    fluid
                    label='Описание:'
                    placeholder='Введите описание...'
                    name='description'
                    value={props.todo.description}
                    onChange={(e, {name, value}) => props.setTodo({ ...props.todo, [name]: value })}
                />
                
                <Button loading={props.isLoading} disabled={props.isLoading} basic color='green' type='submit' onClick={()=>{props.handleSubmit()}}><Icon name='save'/>Добавить</Button>
            </Form.Group>
            </Form>
        </Container>     
    )
}

export default Create