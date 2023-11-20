import axios from "axios"
const baseUrl1 = 'http://localhost:3001/users'
const baseUrl = 'https://cha-viuu.onrender.com/users'


const getContactsOnLogin = async username => {
    const res = await axios.get(`${baseUrl}/getcontacts/${username}`)
    return res.data
}

const getMessages = async id => {
    const res = await axios.get(`${baseUrl}/getmessages/${id}`)
    return res.data
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
    update,
    create,
    remove,
    getContactsOnLogin,
    getMessages,
    create
}