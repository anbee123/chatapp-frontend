import axios from 'axios'

export const BASE_URL = 'https://chat-appp.herokuapp.com/api/chat/'

const API = axios.create({baseURL: BASE_URL})

export const testGetAll = () => {
    console.log('api called')
    return API.get('/')
}

export const getMessages = (room, user) => {
    return API.get(`/${room}/${user}`)
}
