import axios from 'axios'
const baseUrl = 'http://localhost:3007/api/blogs'

let initialToken;

const generateToken = (usertoken) => {
  initialToken = `Bearer ${usertoken}`
}

const getAll = async() => {
  const config = {
    headers : {
      Authorization: initialToken
    }
  }
  const response = await axios.get(baseUrl,config)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers : {
      Authorization: initialToken
    }
  }
  // console.log(config)

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const adjust = async (updatedObject, id) => {
  const config = {
    headers : {
      Authorization: initialToken
    }
  }
// const base = `${baseUrl}/${id}`
// console.log(base)

 const response  = await axios.put(`${baseUrl}/${id}`, updatedObject, config)
 return response.data
}

const detached = async (id) => {
  const config = {
    headers: {
      Authorization: initialToken
    }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}
 export default { getAll, create, generateToken, adjust, detached }
