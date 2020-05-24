import axios from 'axios';

const baseUrl = 'http://localhost:3030/event';

export default {
    query,
    save,
    remove,
    get
}


function query(filterBy) {
    if (!filterBy)
        return axios.get(`${baseUrl}`)
            .then(res => res.data)
    else {
        return axios.get(`${baseUrl}?`) //placeholder for filters
            .then(res => res.data)
    }
}

function get(id) {
    return axios.get(`${baseUrl}/${id}`)
        .then(res => res.data)
}

function remove(id) {
    return axios.delete(`${baseUrl}/${id}`)
}

function save(event) {

    var prm;
    if (event._id) {
        prm = axios.put(`${baseUrl}/${event._id}`, event)
    } else {
        prm = axios.post(`${baseUrl}`, event)
    }
    return prm.then(res => {
        return res.data
    })
}