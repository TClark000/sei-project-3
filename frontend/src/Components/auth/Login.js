import React from 'react'
import { Button, Form, Grid, Header, Divider, Message } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import { loginUser, getUserProfile } from '../../lib/api'
import { setToken, isLocal } from '../../lib/auth'

class Login extends React.Component {

  state = {
    formData: {
      email: '',
      password: ''
    },
    formUsernameError: false
  }

  handleChange = (e) => {
    const formData = {
      ...this.state.formData,
      [e.target.name]: e.target.value
    }
    this.setState({ 
      formData, 
      formUsernameError: false })
  }


  handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await loginUser(this.state.formData)
      setToken(res.data.token)

      const userProfile = await getUserProfile()
      isLocal(userProfile.data.isLocal)


      this.setState({
        redirect: '/features'
      })

    } catch (err) {
      this.setState({ formUsernameError: true })
    }
  }


  render() {

    const { email, password } = this.state.formData

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <>

        <div id='shadow-wrapper' >
          <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }} id='auth-column'>
              <Header as='h2' color='black' textAlign='center'>
                Log-in to your account
              </Header>
              <div className='ui container small'>
                <Form onSubmit={this.handleSubmit} error={this.state.formUsernameError}>
                  {this.state.formUsernameError ? (
                    <Message error header='Fail' content='Please enter your email and password' />
                  ) : null}
                  <Form.Field>
                    <label className='form-label'>Email</label>
                    <input placeholder='email'
                      onChange={this.handleChange}
                      value={email}
                      name='email'
                    />
                  </Form.Field>
                  <Form.Field>
                    <label className='form-label'>Password</label>
                    <input placeholder='password'
                      onChange={this.handleChange}
                      value={password}
                      name='password'
                    />
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>
              </div>
            </Grid.Column>
          </Grid>
        </div>
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <p>Login</p>
        </Divider>
      </>
    )
  }

}

export default Login