const router = require('express').Router()

const locations = require('../controllers/locations')
const auth = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')

router.route('/locations')
  .get(locations.index)
  .post(secureRoute,locations.create)

router.route('/locations/:id')
  .get(locations.show)
  .put(secureRoute, locations.update)
  .delete(secureRoute, locations.delete)

router.route('/locations/:id/comments')
  .post(secureRoute, locations.commentCreate)

router.route('/locations/:id/comments/:commentId')
  .delete(secureRoute, locations.commentDelete)

router.route('/locations/:id/coords')
  .post(secureRoute, locations.coordCreate)

router.route('/register')
  .post(auth.register)


router.route('/login')
  .post(auth.login)

router.route('/profileupdate')
  .put(secureRoute, auth.update)

router.route('/profile')
  .get(secureRoute, auth.profile)

module.exports = router