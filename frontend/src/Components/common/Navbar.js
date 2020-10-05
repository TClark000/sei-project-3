import React from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

import { isAuthenticated, logout } from '../../lib/auth'
import { getUserProfile } from '../../lib/api'

class Navbar extends React.Component {

  state = {
    activeItem: '',
    isLocal: false
  }


  async componentDidMount() {
    if (!isAuthenticated()) return
    try {
      const res = await getUserProfile()
      this.setState({
        isLocal: res.data.isLocal
      })
    } catch (err) {
      console.log(err)
    }
  }

  async componentDidUpdate(){
    if (!isAuthenticated() || this.state.isLocal ) return
    try {
      const res = await getUserProfile()
      console.log('UPDATING!', res.data.isLocal)
      this.setState({
        isLocal: res.data.isLocal
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  handleLogoutClick = (e, { name }) => {
    logout()
    this.setState({ 
      activeItem: name,
      isLocal: false 
    })
  }


  render() {
    const { activeItem, isLocal } = this.state

    return (

      <Menu>
        <Menu.Item
          name='home'
          onClick={this.handleItemClick}
          as={Link}
          to='/home'
        >
          <div
            id={activeItem === 'home' ? 'active-nav-btn' : '' }
            className='ui vertical animated button'
            tabIndex="0">
            <div className="hidden content">Home</div>
            <div className="visible content">
              <i className="home icon"></i>
            </div>
          </div>
        </Menu.Item>

        <div className='ui container'></div>

        {!isAuthenticated() &&
          <Menu.Item
            as={Link}
            to='/register'
            name='register'
            onClick={this.handleItemClick}
          >
            <div 
              id={activeItem === 'register' ? 'active-nav-div' : '' }
              className='ui animated button'
              tabIndex='0'>
              <div className='visible content'>
                <Button
                  id={activeItem === 'register' ? 'active-nav-btn' : '' }
                  className='tiny ui button'
                  name='register'
                  onClick={this.handleItemClick}
                >
                  Register
                </Button>
              </div>
              <div className='hidden content'>
                <i className='right arrow icon'></i>
              </div>
            </div>
          </Menu.Item>
        }

        {isLocal && 
        <Menu.Item
          name='profile'
          onClick={this.handleItemClick}
          as={Link}
          to='/profile'
        >
          <div
            id={activeItem === 'profile' ? 'active-nav-btn' : '' }
            className='ui animated button'
            tabIndex='0'
          >
            <div className='visible content'>
              <Button 
                id={activeItem === 'profile' ? 'active-nav-btn' : '' }
                className='tiny ui button'
              >
                Your Profile
              </Button>
            </div>
            <div className='hidden content'>
              <i className='right arrow icon'></i>
            </div>
          </div>
        </Menu.Item>
        }

        {!isLocal && 
        <Menu.Item
          name='local-register'
          onClick={this.handleItemClick}
          as={Link}
          to='/local-register'
        >
          <div
            id={activeItem === 'local-register' ? 'active-nav-div' : '' }
            className='ui animated button'
            tabIndex='0'
          >
            <div className='visible content'>
              <Button 
                id={activeItem === 'local-register' ? 'active-nav-btn' : '' }
                className='tiny ui button'
              >
                Contribute
              </Button>
            </div>
            <div className='hidden content'>
              <i className='right arrow icon'></i>
            </div>
          </div>
        </Menu.Item>
        }

        {isAuthenticated() &&
          <Menu.Item
            name='home'
            onClick={this.handleLogoutClick}
            as={Link}
            to='/home'
          >
            <div 
              className='ui animated button'
              tabIndex='0'
            >
              <div className='visible content'>
                <Button className='tiny ui button'>Logout</Button>
              </div>
              <div className='hidden content'>
                <i className='right arrow icon'></i>
              </div>
            </div>
          </Menu.Item>
        }


        {!isAuthenticated() &&
          <Menu.Item
            name='login'
            onClick={this.handleItemClick}
            as={Link}
            to='/login'
          >
            <div
              id={activeItem === 'login' ? 'active-nav-div' : '' }
              className='ui animated button' tabIndex='0'>
              <div className='visible content'>
                <Button
                  id={activeItem === 'login' ? 'active-nav-btn' : '' }
                  className='tiny ui button'>Login</Button>
              </div>
              <div className='hidden content'>
                <i className='right arrow icon'></i>
              </div>
            </div>
          </Menu.Item>
        }


      </Menu >
    )

  }

}



export default withRouter(Navbar)