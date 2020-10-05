import React from 'react'
import { Grid, Message } from 'semantic-ui-react'

function Error404(props) {
  return (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
        <Message negative>
          <Message.Header>404</Message.Header>
          <p>Page not found</p>
        </Message>
    </Grid.Column>
  </Grid>
)
  }

export default Error404