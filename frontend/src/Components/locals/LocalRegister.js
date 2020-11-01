import React from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, TextArea, Button, Grid, Header, Image, Divider, Message } from 'semantic-ui-react'

import { registerUser, updateUser, getUserProfile } from '../../lib/api'
import { isAuthenticated, isLocal } from '../../lib/auth'

import ImageUpload from '../common/ImageUpload'

class LocalRegister extends React.Component {
  state = {
    formData: {
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
      bio: '',
      userimagecurrent: '',
      userimage: '',
      isLocal: false
    },
    formUsernameError: false,
    redirect: null
  }

  authenticated() {
    return isAuthenticated()
  }

  async componentDidMount() {
    try {
      if (this.authenticated()) {
        const res = await getUserProfile()
        const formData = {
          ...this.state.formData,
          username: res.data.username,
          bio: res.data.bio,
          userimagecurrent: res.data.userimage,
          isLocal: res.data.isLocal
        }
        this.setState({ formData })
      }
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = (e) => {
    const formData = {
      ...this.state.formData,
      [e.target.name]: e.target.value
    }
    this.setState({
      formData,
      formUsernameError: false
    })
  }

  handleImageChange = url => {
    const formData = { ...this.state.formData, userimage: url }
    this.setState({ formData })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const authenticated = this.authenticated()

    let image = ''
    if (this.state.formData.userimagecurrent && !this.state.formData.userimage) {
      image = this.state.formData.userimagecurrent
    } else {
      image = this.state.formData.userimage
    }

    if (!authenticated) {
      try {
        const dataToSend = ({
          email: this.state.formData.email,
          username: this.state.formData.username,
          password: this.state.formData.password,
          passwordConfirmation: this.state.formData.passwordConfirmation,
          bio: this.state.formData.bio,
          userimage: image,
          isLocal: true
        })
        const res = await registerUser(dataToSend)
        console.log(res)
        isLocal(true)
        this.setState({
          redirect: '/login'
        })
        return
      } catch (err) {
        this.setState({ formUsernameError: true })
      }
    }

    if (authenticated) {

      try {
        const dataToSend = ({ bio: this.state.formData.bio, userimage: image, isLocal: true })
        if (!dataToSend.bio) throw new Error()
        
        const res = await updateUser(dataToSend)
        isLocal(res.data.isLocal)

        this.setState({
          redirect: '/profile'
        })
      } catch (err) {
        this.setState({ formUsernameError: true })
      }
    }
  }

  render() {
    const { username, email, password, passwordConfirmation, bio, userimagecurrent, userimage, isLocal } = this.state.formData

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <>

        <Grid textAlign='center' style={{ height: 'auto', marginTop: '70px' }} >
          <Grid.Column style={{ maxWidth: 450 }} id='auth-column'>
            <Header as='h2' color='black' textAlign='center'>
              {(!isLocal) ? 'Register to contribute' : 'Update your profile'}
            </Header>
            <Form onSubmit={this.handleSubmit} error={this.state.formUsernameError}>
              {this.state.formUsernameError ? (
                <Message error header='Fail' content={this.authenticated() ? 'Please enter a bio' : 'Please enter your email and password'} />
              ) : null}
              {!this.authenticated() &&
                <>
                  <Form.Field>
                    <label className='form-label'>Username</label>
                  </Form.Field>
                  <Form.Field
                    control={Input}
                    placeholder='User name'
                    onChange={this.handleChange}
                    name='username'
                    value={username}
                  />

                  <Form.Field>
                    <label className='form-label'>Email</label>
                  </Form.Field>
                  <Form.Field
                    control={Input}
                    placeholder='Email'
                    onChange={this.handleChange}
                    name='email'
                    value={email}
                  />

                  <Form.Field>
                    <label className='form-label'>Password</label>
                  </Form.Field>
                  <Form.Field
                    control={Input}
                    placeholder='Password'
                    onChange={this.handleChange}
                    name='password'
                    value={password}
                  />

                  <Form.Field>
                    <label className='form-label'>Password Confirmation</label>
                  </Form.Field>
                  <Form.Field
                    control={Input}
                    placeholder='Password confirmation'
                    onChange={this.handleChange}
                    name='passwordConfirmation'
                    value={passwordConfirmation}
                  />
                </>
              }
              <Form.Group inline>

              </Form.Group>

              {this.authenticated() && !isLocal &&
                <h3>
                  Thanks for contributing, <span style={{ color: '#71B600' }}>{username}</span>!<br />
                  Just a bit more about you, and we can get your profile set up
                </h3>
              }

              {this.authenticated() && isLocal &&
                <h3>
                  Keep it fresh <span style={{ color: '#71B600' }}>{username}</span><br /> Update your public profile here!
                </h3>
              }


              <Form.Field>
                <label className='form-label'>Tell the community about you</label>
              </Form.Field>
              <Form.Field
                control={TextArea}
                placeholder=" Let Montreal know what you're about..."
                onChange={this.handleChange}
                name='bio'
                value={bio}
              />

              <Form.Field>
                <label className='form-label'>Profile Image</label>
              </Form.Field>
              <Form.Field
                control={ImageUpload}
                onChange={this.handleImageChange}
              />
              {(userimagecurrent && !userimage) ? <Image src={userimagecurrent} /> : ''}
              <Form.Field control={Button}>Submit</Form.Field>
            </Form>
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
export default LocalRegister
