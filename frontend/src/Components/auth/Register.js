import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Form, Grid, Header, Divider, Message } from 'semantic-ui-react'

import { registerUser } from '../../lib/api'
import ImageUpload from '../common/ImageUpload'

class Register extends React.Component {


  state = {
    formData: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      userimage: ''
    },
    formUsernameError: false,
    redirect: null
  }

  handleChange = (e) => {
    const formData = {
      ...this.state.formData,
      [e.target.name]: e.target.value
    }
    this.setState({ formData, formUsernameError: false })
  }

  handleImageChange = url => {
    const formData = { ...this.state.formData, userimage: url }
    this.setState({ formData })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const dataToSend = ({ ...this.state.formData })
    try {
      const response = await registerUser(dataToSend)
      if (response.status === 201) {
        this.setState({
          redirect: '/login'
        })
      }
    } catch (err) {
      this.setState({ formUsernameError: true })
    }
  }

  render() {
    const { username, email, password, passwordConfirmation } = this.state.formData

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <>
        <Grid textAlign='center' style={{ height: 'auto', marginTop: '70px', marginBottom: '70px' }} >
          <Grid.Column style={{ maxWidth: 450 }} id='auth-column'>
            <Header as='h2' color='black' textAlign='center'>
            Register your account
            </Header>
            <div className='ui container size mini'>
              <Form onSubmit={this.handleSubmit} error={this.state.formUsernameError}>
                {this.state.formUsernameError ? (
                  <Message error header='Fail' content='All fields required except for image' />
                ) : null}
                <Form.Field>
                  <label className='form-label'>Username</label>
                  <input placeholder='username'
                    onChange={this.handleChange}
                    value={username}
                    name='username'
                  />
                </Form.Field>
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
                <Form.Field>
                  <label className='form-label'>Password Confirmation</label>
                  <input placeholder='password confirmation'
                    onChange={this.handleChange}
                    value={passwordConfirmation}
                    name='passwordConfirmation'
                  />
                </Form.Field>

                <Form.Field>
                  <label className='form-label'>Profile Image</label>
                </Form.Field>
                <Form.Field
                  control={ImageUpload}
                  onChange={this.handleImageChange}
                >
                </Form.Field>
                
                <Form.Field control={Button}>Submit</Form.Field>

              </Form>
            </div>
          </Grid.Column>
        </Grid>
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <p>Register</p>
        </Divider>
      </>
    )
  }


}


export default Register