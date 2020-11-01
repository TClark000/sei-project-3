const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const User = require('../models/user')
const { forbidden, jsonWebTokenError } = require('./errorMessage')

async function secureRoute(req, res, next) {
  try {
    if (!req.headers.authorization) throw new Error(forbidden)

    const token = req.headers.authorization.replace('Bearer ', '')

    const payLoad = jwt.verify(token, secret)
    const user = await User.findById(payLoad.sub)
    
    if (!user) throw new Error(jsonWebTokenError)

    req.currentUser = user
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = secureRoute
