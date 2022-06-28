import axios from 'axios'
const baseUrl = 'http://localhost:3007/api/login'

const login = async loginDetails =>{
    const response = await axios.post(baseUrl, loginDetails)
    return response.data
}

export default {login}