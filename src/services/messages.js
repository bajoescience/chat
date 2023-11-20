import axios from 'axios'
const baseUrl = 'https://cha-viuu.onrender.com/messages' 
const baseUrl1 = 'http://localhost:3001/messages'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const create = async credentials => {
    const res = await axios.post(baseUrl, credentials)
    return res.data
}
const update = async (id, resource) => {
    const res = await axios.put(baseUrl + '/' + id, resource)
    return res.data
}

const remove = async id => {
    const res = await axios.delete(baseUrl + '/' + id)
    return res.data
}

export default {
    getAll,
    create,
    update,
    remove
}