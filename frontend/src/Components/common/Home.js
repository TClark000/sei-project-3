import React from 'react'
import { Grid, Header, Segment, Card, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function Home() {

  return (
    <>
      <Segment style={{ padding: '8em 0em' }} vertical id='home-page'>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={9}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Discover your Montréal
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                A city that is in love with festivals, the arts, good food, living well and enjoying life to the hilt
              </p>
              <Header as='h3' style={{ fontSize: '2em' }}>
                We aim to bring people together to share meaningful experiences
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Share your
              </p>
              <Link to={'/features'}>
                <Button type='submit'>Find what{'\''}s on</Button>
              </Link>
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: '0em' }} vertical>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Link to='/register'><Header as='h3' style={{ fontSize: '2em' }}>
                Sign up to Comment & Like
              </Header>
              </Link>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Link to={'/local-register'}><Header as='h3' style={{ fontSize: '2em' }}>
                Register as a local to share your favorite spots
              </Header></Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      {/* <Segment> */}
      <Grid>
        <Grid.Column
          className='home-column-box'
          floated='left'
          width={7}
        >
          <div id='street-img' className='home-images'></div>
        </Grid.Column>
        <Grid.Column
          className='home-column-box'
          floated='right'
          width={7}
        >
          <div id='culture-img' className='home-images'></div>
    
        </Grid.Column>
      </Grid>
      {/* </Segment> */}

      <Segment style={{ padding: '0em' }} className='join-community-container' vertical>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Join Your Community
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment>
        <Grid >
          <Grid.Row columns={3}>
            <Grid.Column>
              <Card>
                <div id='parks-card-img' className='home-card-imgs'></div>
                <Card.Content>
                  <Card.Header>St Joseph Oratory</Card.Header>
                  <Card.Description>
                    What started out as a small chapel has since become one of the world’s most visited sacred spaces and one of Montréal’s most iconic landmarks.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <div id='wild-card-img' className='home-card-imgs'></div>

                <Card.Content>
                  <Card.Header>Mont Saint-Hilaire</Card.Header>
                  <Card.Description>
                    Just outside of Montréal, Mont Saint-Hilaire nature reserve is another great local spot for those who like their hikes to be more scenic than strenuous, with relatively easy, straightforward trails open all year round.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <div id='hiking-card-img' className='home-card-imgs'></div>
                <Card.Content>
                  <Card.Header>Mont Royal Park</Card.Header>
                  <Card.Description>
                    The centerpiece and the namesake of Montréal, this small mountain offers sightseeing in every direction as you explore every angle.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment>
        <Segment style={{ padding: '0em' }} vertical>
          <Grid celled='internally' columns='equal' stackable>
            <Grid.Row textAlign='center'>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>

                  {'"Our favorite app to discover Montréal"'}
                
                </Header>
                <p style={{ fontSize: '1.33em' }}>Explore throughout the seasons......</p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>

                  {'"Great way to join local events"'}
                
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  Meet your locals......
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment>
    </>

  )
}

export default Home