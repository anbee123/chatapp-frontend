import axios from 'axios'

const BASE_URL = 'http://localhost:8000/'

const API = axios.create({baseURL: BASE_URL})

export const testGetAll = () => {
    console.log('api called')
    return API.get('/api/chat/')
}

export const getMessages = (room, user) => {
    return API.get(`/api/chat/${room}/${user}`)
}
