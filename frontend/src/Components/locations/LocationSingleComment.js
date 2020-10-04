import React from 'react'
import { Comment } from 'semantic-ui-react'

const LocationSingleComment = (props) => {


  const { text, rating, createdAt } = props

  return (
    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'><span>{props.local.username}</span></Comment.Author>
        <Comment.Metadata>
          <div>{createdAt}</div>
        </Comment.Metadata>
        <Comment.Text>{text}</Comment.Text>
        <Comment.Text>Rating: {rating}</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}

export default LocationSingleComment