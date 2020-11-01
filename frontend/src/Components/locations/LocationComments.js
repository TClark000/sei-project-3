import React from 'react'
import { Button, Comment, Form, Header, Rating } from 'semantic-ui-react'

import LocationSingleComment from './LocationSingleComment'
import { createComment, getUserProfile } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'


class LocationComments extends React.Component {

  state = {
    profileData: null,
    comments: [],
    formText: '',
    ratingValue: 0,
    currentUserProfile: {},
    errors: null
  }

  authenticated() {
    return isAuthenticated()
  }

  async componentDidMount() {

    if (isAuthenticated()) {
      try {
        const resGetUser = await getUserProfile()
        this.setState({
          currentUserProfile: resGetUser.data
        })
      } catch (err) {
        console.log(err)
      }
    }
    const { comments } = this.props

    this.setState({
      comments: comments
    })
  }


  handleTextChange = (e) => {
    const formText = e.target.value

    this.setState({
      formText
    })
  }


  handleRate = (e, { rating }) => {
    this.setState({ ratingValue: rating })
  }


  handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      text: this.state.formText,
      rating: this.state.ratingValue
    }
    try {
      const resCreateComment = await createComment(this.props.locationId, formData)
      const returnedComments = resCreateComment.data.comments
      const newCommentsUpdated = [...returnedComments]

      if (isAuthenticated()) {
        const resGetUser = await getUserProfile()

        if (typeof (returnedComments[returnedComments.length - 1].local) === 'string') {
          newCommentsUpdated[newCommentsUpdated.length - 1].local = {
            username: resGetUser.data.username,
            userimage: resGetUser.data.userimage
          }
        }
      }

      this.setState({
        comments: newCommentsUpdated,
        formText: '',
        ratingValue: 1
      })
    } catch (err) {
      this.setState({
        errors: err.response.data.errors
      })
      console.log(err)
    }
  }

  render() {

    const {
      comments, formText,
      ratingValue, currentUserProfile
    } = this.state

    return (

      <Comment.Group>
        <Header as='h3' dividing>
          What people say
        </Header>

        {!comments.length &&
          <p>Be the first to comment on this location</p>
        }
        {comments.map((comment, index) => {
          return <LocationSingleComment
            key={index}
            {...comment}
            locationId={this.props.locationId}
            currentUserProfile={currentUserProfile}
          />
        })
        }

        {this.authenticated() &&
        <Form onSubmit={this.handleSubmit} reply>
          <Form.TextArea
            onChange={this.handleTextChange}
            value={formText}
            placeholder={'Tell others what you think'} />

          <div>
            <span style={{ marginRight: '5px', fontSize: '20px' }}>
              Rate it!
            </span>
            <Rating icon='heart'
              rating={ratingValue}
              maxRating={5}
              onRate={this.handleRate}
            />
          </div>
          <br />
          <Button content='Add a comment'
            labelPosition='left'
            icon='edit'
            primary />
          {this.state.errors &&
            <p style={{ color: 'red' }}>Please give both a rating and comment<br />
              Only available if logged-in.</p>
          }
        </Form> 
        }

      </Comment.Group>

    )

  }


}

export default LocationComments