import axios from 'axios'

const baseUrl = 'https://cha-viuu.onrender.com/notif'
const baseUrl1 = 'http://localhost:3001/notif'

/**
 * notif is in the form
 * count : amount of new messages in notification
 * date : the date of the last message
 * message: a small string from the last message
 */

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