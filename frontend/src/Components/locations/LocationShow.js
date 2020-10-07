import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Button, Grid, Segment, Header, Container, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { getSingleLocation } from '../../lib/api'
import CarouselSlide from './CarouselSlide'
import LocationComments from './LocationComments'
import LocalPublic from '../locals/LocalPublic'

class LocationShow extends React.Component {

  state = {
    locationData: null
  }

  async componentDidMount() {
    const locationId = this.props.match.params.id

    const res = await getSingleLocation(locationId)

    this.setState({
      locationData: res.data
    })
  }


  render() {

    if (!this.state.locationData) return <h1>Trying to find that for you now</h1>

    const { placePhotos, placeName, placeDescription, amenities, local, comments } = this.state.locationData
    const features = this.state.locationData.feature
    const locationId = this.props.match.params.id

    return (
      <>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header style={{ fontSize: '2em' }}>
                  <p>{placeName}</p>
                  <p>{placeDescription}</p>
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Has:<br></br>
                  {
                    features.map((element, index) => {
                      return <span key={index}>{element}</span>
                    })
                  }
                </p>

                <p style={{ fontSize: '1.33em' }}>Amenities:
                  <br></br>
                  {
                    amenities.map((amenity, index) => {
                      return <span key={index}>{amenity}<br></br></span>
                    })
                  }
                </p>

              </Grid.Column>
              <Grid.Column floated='right' width={8}>
                <Carousel showThumbs={false}>
                  {placePhotos.map((photo, index) => {
                    return <CarouselSlide key={index} photo={photo} />
                  })}
                </Carousel>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>

              <Button
                fluid
                animated='fade'
                as={Link}
                to='/features'
              >
                <Button.Content visible>Discover More Locations</Button.Content>
                <Button.Content hidden>Back to Features</Button.Content>
              </Button>
            </Grid.Row>
          </Grid>

          <Segment vertical>
            <Divider
              as='h4'
              className='header'
              horizontal
              style={{ margin: '1em 0em', textTransform: 'uppercase' }}
            >
              <a href='#'>Contributed By</a>
            </Divider>
            <Container text>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <LocalPublic {...local} />
              </Grid.Column>
            </Container>

            <Divider
              as='h4'
              className='header'
              horizontal
              style={{ margin: '1em 0em', textTransform: 'uppercase' }}
            >
              <a href='#'>Reviews</a>
            </Divider>


            <Container text>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <LocationComments locationId={locationId} comments={comments} />
              </Grid.Column>
            </Container>
          </Segment>
        </Segment>


        {/* <div className='location-show-container'>
          <div className='carousel-container'>
            <Carousel showThumbs={false}>
              {placePhotos.map((photo, index) => {
                return <CarouselSlide key={index} photo={photo} />
              })}
            </Carousel>
          </div>

          <div className='location-show-info'>

            <h1>{placeName}</h1>
            <h2>{placeDescription}</h2>

            <p>Has:
              {
                features.map((element, index) => {
                  return <span key={index}>{element}</span>
                })
              }
            </p>

            <p>Amenities:
              {
                amenities.map((amenity, index) => {
                  return <span key={index}>{amenity}</span>
                })
              }
            </p>
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
        </div>


        <LocationComments locationId={locationId} comments={comments} />

        <LocalPublic {...local} /> */}
      </>
    )
  }

}

export default LocationShow