import axios from 'axios'

const BASE_URL = 'http://localhost:8000/'

const API = axios.create({baseURL: BASE_URL})

export const testGetAll = () => {
    console.log('888 1  api called')
    return API.get('/')
}
