import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const SignupForm = (props) => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        Регистрация
      </Header>
      { !!props.error.list &&
        <Message negative header='При регистрации возникли следущие ошибки:' list={props.error.list}/>
      }
      <Form size='large'>
        <Segment raised>
          <label>Имя</label>
          <Form.Input 
            fluid 
            iconPosition='left' 
            placeholder='Введите ваше имя' 
            onChange={(evt) => props.setUser({...props.user, name: evt.target.value})}
          />
          <label>Email</label>
          <Form.Input 
            fluid 
            iconPosition='left' 
            placeholder='Введите ваш email' 
            onChange={(evt) => props.setUser({...props.user, email: evt.target.value})}
          />
          <label>Пароль</label>
          <Form.Input
            fluid
            placeholder='Введите пароль'
            type='password'
            onChange={(evt) => props.setUser({...props.user, password: evt.target.value})}
          />
          <label>Подтвердите пароль</label>
          <Form.Input
            fluid
            placeholder='Введите пароль ещё раз'
            type='password'
            onChange={(evt) => props.setUser({...props.user, c_password: evt.target.value})}
          />

          <Button 
            color='teal' 
            fluid 
            size='large'
            onClick={() => props.handleSubmit()}
          >
            Регистрация
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
)

export default SignupForm