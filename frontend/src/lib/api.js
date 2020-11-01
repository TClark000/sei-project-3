import axios from 'axios'

const baseUrl = '/api'

function withHeaders(){
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
}


export function getLocations(){
  return axios.get('/api/locations')
}

export function createNewLocation(formData){
  return axios.post('/api/locations', formData, withHeaders())
}

export function deleteLocation(locationId){
  return axios.delete(`${baseUrl}/locations/${locationId}`, withHeaders())
}

export function getSingleLocation(locationId){
  return axios.get(`${baseUrl}/locations/${locationId}`)
}

export function createComment(locationId, formText){
  return axios.post(`/api/locations/${locationId}/comments`, formText, withHeaders())
}

export function deleteComment(locationId, commentId){
  return axios.delete(`/api/locations/${locationId}/comments/${commentId}`, withHeaders())
}

export function createCoord(locationId, formText){
  return axios.post(`/api/locations/${locationId}/coords`, formText, withHeaders())
}

export function getUserProfile(){
  return axios.get('/api/profile', withHeaders())
}

export const registerUser = (formData) => {
  return axios.post('/api/register/', formData )
}

export const loginUser = (formData) => {
  return axios.post('/api/login/', formData )
}

export const updateUser = (formData) => {
  return axios.put('/api/profileupdate', formData, withHeaders())
}



