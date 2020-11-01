import React from 'react'
import axios from 'axios'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

class ImageUpload extends React.Component {

  state = {
    image: null
  }

  handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const response = await axios.post(uploadUrl, data)
    try {
      this.setState({
        image: response.data.secure_url
      }, () => {
        this.props.onChange(this.state.image)
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { image } = this.state
    return (
      <>
        {image ?
          <div style={{ width: '300px' }}>
            <img src={image} alt="selected" style={{ width: '50%', height: 'auto' }}/>
          </div>
          :
          <>
            <label id='img-upload-label' className="label">{this.props.labelText || '(10mb max - please wait for the image to display)'}</label>
            <input
              className="input"
              type="file"
              onChange={this.handleUpload}
            />
          </>
        }
      </>
    )
  }
}

export default ImageUpload