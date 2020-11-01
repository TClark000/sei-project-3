import React from 'react'
import { Segment, Grid, Divider, Header, Dimmer, Loader } from 'semantic-ui-react'

import { getLocations } from '../../lib/api'
import LocationCard from './LocationCard'
import LocationsMap from './LocationsMap'

class LocationsIndex extends React.Component {

  state = {
    locationsData: null
  }

  constructor(props) {
    super(props)
    this.state = {
      scrollPosition: '0'
    }
  }

  changeScrollPosition = (newScrollPosition) => {
    this.setState({ scrollPosition: newScrollPosition })
  }

  async componentDidMount() {
    const res = await getLocations()
    const featureSelected = this.props.match.params.feature

    const isFeaturePresent = (feature) => feature.toLowerCase() === featureSelected
    const filteredLocations = res.data.filter((location) => {
      return location.feature.some(isFeaturePresent)
    })

    this.setState({
      featureSelected: featureSelected,
      locationsData: filteredLocations
    })
  }

  render() {

    if (!this.state.locationsData) {
      return (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      )
    }

    const { feature } = this.props
    const { locationsData, featureSelected } = this.state

    return (

      <>

        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <Header style={{ fontSize: '25px' }}>{featureSelected.toUpperCase()} IN MONTREAL</Header>
        </Divider>

        <Segment style={{ padding: '3em 3em' }} vertical>
          <Grid divided='vertically'>
            <Grid.Row columns={2} divided>
              <Grid.Column>
                <div>
                  <LocationsMap
                    featureSelected={featureSelected}
                    locationsData={locationsData}
                  />
                </div>
              </Grid.Column>
              <Grid.Column>
                <Segment style={{ overflow: 'auto', maxHeight: 700, marginLeft: '100px' }}>
                  <div className='locations-index-container'>
                    <section className='locations-index-cards'>
                      {
                        locationsData.map((location => {
                          return <LocationCard key={location._id} feature={feature} {...location} />
                        }))
                      }
                    </section>
                  </div>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

      </>

    )
  }
}
export default LocationsIndex