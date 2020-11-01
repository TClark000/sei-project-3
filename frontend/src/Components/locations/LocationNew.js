import React from 'react'
import { Link } from 'react-router-dom'
import {
  Form, Input, TextArea, Button,
  Segment, Header, Grid, Label, Message
} from 'semantic-ui-react'
import Select from 'react-select'

import { createNewLocation, createCoord } from '../../lib/api'

import ImageUpload from '../common/ImageUpload'
import LocalLocationCard from '../locals/LocalLocationCard'
import { geoCoord } from '../../lib/geocoord'

class LocationNew extends React.Component {

  state = {
    createdLocations: this.props.userProfile.createdLocations,
    formData: {
      placeName: '',
      placeDescription: '',
      feature: [],
      placePhotos: ['']
    },
    coordForm: {
      coordInput: ''
    },
    coordData: {
      latitude: 0,
      longitude: 0
    },
    formUsernameError: false
  }

  options = [
    { value: 'gowild', label: 'gowild' },
    { value: 'nightlife', label: 'nightlife' },
    { value: 'summer', label: 'summer' }
  ]

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

  handleCoordInputChange = (e) => {
    const coordForm = { ...this.state.coordForm, [e.target.name]: e.target.value }
    this.setState({
      coordForm
    })
  }

  handleMultiSelectChange = (selected) => {
    const selectedItems = selected ? selected.map(item => item.value) : []
    const formData = { ...this.state.formData, feature: selectedItems }
    this.setState({
      formData
    })
  }

  handleImageChange = url => {
    const formData = { ...this.state.formData, placePhotos: url }
    this.setState({ formData })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (this.state.formData.feature.length === 0 ||
        this.state.coordForm.coordInput === '' ||
        this.state.formData.placeName === '') throw new Error()

      const res = await createNewLocation(this.state.formData)
      if (this.state.coordForm.coordInput !== ''){

        const result = await geoCoord(this.state.coordForm.coordInput)
        await createCoord(res.data._id, result)

      }
      const newLocation = res.data
      const newLocations = [...this.state.createdLocations, newLocation]
      this.setState({
        createdLocations: newLocations,
        formData: {
          placeName: '',
          placeDescription: '',
          feature: [],
          placePhotos: ['']
        },
        coordForm: {
          coordInput: ''
        },
        coordData: { 
          latitude: 0,
          longitude: 0
        },
        formUsernameError: false
      })

    } catch (err) {
      console.log(err)
      this.setState({ formUsernameError: true })
    }
  }

  segmentStyle = {
    marginTop: '30px'
  }

  locationsPlaceholderStyle = {
    color: '#888'
  }

  render() {

    const { placeName, placeDescription } = this.state.formData
    const { coordInput } = this.state.coordForm
    const { createdLocations } = this.state

    if (!createdLocations) return <h1>Just getting that for you</h1>

    return (
      <>
        <Segment style={this.segmentStyle}>
          <Header as='h2'>Your contributed locations</Header>
          {createdLocations.length === 0 &&
            <Header style={this.locationsPlaceholderStyle} as='h3'>
              You haven't added any locations yet.
              Contribute some below!
            </Header>
          }
          <Grid>
            {
              createdLocations.map((location) => {
                return <LocalLocationCard
                  key={location._id}
                  {...location}
                />
              })
            }
          </Grid>
        </Segment>

        <Segment className='contribute-location-segment'>
          <div className='contribute-location-outer'>
            <Header as='h2'>Contribute a new location</Header>
            <Header as='h5' className='location-encourage'>Contribute a location and let others discover your Montreal</Header>

            <div className='location-form-outer'>
              <Form onSubmit={this.handleSubmit} error={this.state.formUsernameError}>
                {this.state.formUsernameError ? (
                  <Message error header='Fail' content='Please input, place name, activity and location' />
                ) : null}
                <Label>Placename</Label>
                <Form.Field
                  control={Input}
                  placeholder='Placename'
                  onChange={this.handleChange}
                  name='placeName'
                  value={placeName}
                />

                <Label>Say a bit about this place</Label>
                <Form.Field
                  control={TextArea}
                  placeholder='Get the conversation started!'
                  onChange={this.handleChange}
                  name='placeDescription'
                  value={placeDescription}
                />

                <Label>Pick a category!</Label>
                <Select
                  options={this.options}
                  isMulti
                  onChange={this.handleMultiSelectChange}
                  value={
                    this.state.formData.feature.map((item) => ({ value: item, label: item }))
                  }
                />
                <br />

                <Label>Upload an image</Label>
                <Form.Field
                  control={ImageUpload}
                  onChange={this.handleImageChange}
                />
                <Label>Enter the location name or postcode</Label>
                <Form.Field
                  control={Input}
                  placeholder='Montreal'
                  onChange={this.handleCoordInputChange}
                  name='coordInput'
                  value={coordInput}
                />
                <Form.Field control={Button}>Submit</Form.Field>
              </Form>
            </div>
          </div>
          <div className='to-update-profile'>
            <Button
              fluid
              animated='fade'
              as={Link}
              to='/features'
            >
              <Button.Content visible>Discover More Locations</Button.Content>
              <Button.Content hidden>Back to Features</Button.Content>
            </Button>
          </div>
        </Segment>
      </>
    )

  }

}

export default LocationNew