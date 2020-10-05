import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const LoginForm = (props) => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        Авторизация
      </Header>
      { !!props.error.message &&
        <Message negative>
          <Message.Header>{props.error.message}</Message.Header>
        </Message>
      }
      <Form size='large'>
        <Segment raised>
          <Form.Input 
            fluid 
            icon='user' 
            iconPosition='left' 
            placeholder='Email' 
            onChange={(evt) => props.setLogin(evt.target.value)}
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Пароль'
            type='password'
            onChange={(evt) => props.setPassword(evt.target.value)}
          />

          <Button 
            color='teal' 
            fluid 
            size='large'
            onClick={() => props.handleLoginButtonClick()}
          >
            Войти
          </Button>
          <NavLink to="/signup">Регистрация</NavLink>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
)

export default LoginForm