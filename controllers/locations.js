
const Location = require('../models/location')
const { notFound, forbidden } = require('../lib/errorMessage')

async function locationIndex(req, res, next) {
  try {
    const locations = await Location.find().populate('local')
    if (locations.length === 0) throw new Error(notFound)
    res.status(200).json(locations)
  } catch (err) {
    next(err)
  }
}

async function locationCreate(req, res, next) {
  try {
    const newLocationData = { ...req.body, local: req.currentUser._id }
    const newLocation = await Location.create(newLocationData)

    res.status(201).json(newLocation)
  } catch (err) {
    next(err)
  }
}

async function locationShow (req, res, next) {

  try {
    const location = await Location.findById(req.params.id)
      .populate('local')
      .populate('comments.local')
    if (!location) throw new Error(notFound)
    res.status(200).json(location)
  } catch (err) {
    next(err)
  }
}

async function locationDelete(req, res, next) {
  const idlocation = req.params.id
  try {
    const locationToDelete = await Location.findByIdAndDelete(idlocation)
    if (!locationToDelete) throw new Error(notFound)
    
    await locationToDelete.remove()
    res.status(202).json({ message: 'Deleted Successfully' })
  } catch (err) {
    next(err)
  }
}

async function locationUpdate (req, res, next) {
  const idlocation = req.params.id
  try {
    const locationToUpdate = await Location.findById(idlocation)
    if (!locationToUpdate) throw new Error(notFound)
    Object.assign(locationToUpdate, req.body)
    await locationToUpdate.save()
    res.status(202).json(locationToUpdate)
  } catch (err){
    next(err)
  }
}

async function locationCommentCreate(req, res, next) {
  try {
    const location = await Location.findById(req.params.id)
      .populate('local')
      .populate('comments.local')
    if (!location) throw new Error(notFound)
    const comment = { ...req.body, local: req.currentUser._id }
    location.comments.push(comment)
    await location.save()
    res.status(201).json(location)
  } catch (err) {
    next(err)
  }
}

async function locationCommentDelete(req, res, next) {
  try {
    const location = await Location.findById(req.params.id)
    if (!location) throw new Error(notFound)
    const commentToDelete = location.comments.id(req.params.commentId)
    if (!commentToDelete) throw new Error(notFound)
    if (!commentToDelete.local.equals(req.currentUser._id)) throw new Error(forbidden)
    await commentToDelete.remove()
    await location.save()
    res.sendStatus(202).json({ message: 'Deleted Successfully' })
  } catch (err) {
    next(err)
  }
}

async function locationCoordCreate(req, res,next) {
  try {
    const location = await Location.findById(req.params.id)
    if (!location) throw new Error(notFound)
    const coord = { ...req.body, local: req.currentUser._Id }
    if (location.coords.length > 0) (location.coords.pop())
    location.coords.push(coord)
    await location.save()
    res.status(201).json(location)
  } catch (err){
    next(err)
  }
} 

module.exports = {
  index: locationIndex,
  create: locationCreate,
  show: locationShow,
  delete: locationDelete,
  update: locationUpdate,
  commentCreate: locationCommentCreate,
  commentDelete: locationCommentDelete,
  coordCreate: locationCoordCreate
}