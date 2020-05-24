import HttpService from './HttpService'
import utilService from './utilService'

const baseUrl = '/user'

export default {
    login,
    get,
    addReview,
    save
}

function login(credentials) {
        // console.log('login in frontend')
        const user =  HttpService.post('/auth/login')
        return _handleLogin(user)
        //For json-server
        // return HttpService.get(`${baseUrl}`)
        // .then(users => {
        //     return users[1]
        // });
};

function get(id) {
    return HttpService.get(`${baseUrl}/${id}`)
        .then(user => { 
            return user
         })
}
// function remove(id) {
//     return HttpService.delete(`/${id}`)
// }

function save(user) {
    if (!user._id) return HttpService.post(`${baseUrl}`, user)
    return HttpService.put(`${baseUrl}/${user._id}`, user)
}


function addReview(review, user) {
    review.id = utilService.makeId();
    user.reviews.unshift(review);
    user.rank.count += 1;

    let totalRating = 0;
    user.reviews.forEach(review => { totalRating += review.rate });
    const ratingAv = totalRating / user.reviews.length;

    user.rank.average = ratingAv

    return HttpService.put(`${baseUrl}/${user._id}`, user)
        .then(savedUser => { return savedUser })
}


function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}