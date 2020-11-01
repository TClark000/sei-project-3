
const mongoose = require('mongoose')
const { dbURI  } = require('../config/environment')

const User = require('../models/user')
const Location = require('../models/location')
const locationData = require('./data/locations')
const commentData = require('./data/comments')

const faker = require('faker/locale/fr')

mongoose.connect(
  dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, 
  async (err) => {
    
    if (err) return console.log(err)

    try {
      
      await mongoose.connection.db.dropDatabase()

      console.log('🚨 Database dropped 🚨')

      const users = [] 
      for (let index = 0; index < 100; index++) { 
        const username = faker.internet.userName() 
        const firstName = faker.name.firstName() 
        const lastName = faker.name.lastName()
        const email = `${firstName}.${lastName}@email.com`
        const userimage = `${faker.image.imageUrl()}?random=${Date.now()}`
        const password = faker.internet.password()
        const bio = faker.lorem.paragraph()
       
        const userTelephone = faker.phone.phoneNumber() 

        users.push({
          username,
          email,
          userimage,
          password,
          passwordConfirmation: password,
          bio,
        
          userTelephone 
        })
      }
      
      
      const createdUsers = await User.create(users) 
      console.log(createdUsers)
      console.log(`❇️ ${createdUsers.length} users created ❇️`)
      
      const locationWithUsers = locationData.map(location => { 
        location.local = createdUsers[(Math.floor(Math.random() * (createdUsers.length - 1)))]._id
        return location
      })
      const locations = await Location.create(locationWithUsers)
      console.log(`❇️ ${locations.length} locations created ❇️ `)

      const commentWithUsers = commentData.map(comment => {
        comment.local = createdUsers[(Math.floor(Math.random() * (createdUsers.length - 1)))]._id
        return comment
      })
      for (let index = 0; index < commentWithUsers.length; index++){
        const random = Math.floor(Math.random() * (locations.length - 1))
        const location = await Location.findOne().skip(random)
        const locationById = await Location.findById(location._id)
        await locationById.comments.push(commentWithUsers[index])
        await locationById.save()
      }
      console.log(`❇️ ${commentWithUsers.length} comments created ❇️`)

      await mongoose.connection.close()
      console.log('👋 Goodbye')

    } catch (err) {
      console.log(err)
      await mongoose.connection.close()
      console.log('😬sorry')
    }
  }
)
