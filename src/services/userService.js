import HttpService from './HttpService'
import utilService from './utilService'

const baseUrl = '/user'

export default {
    login,
    logout,
    get,
    addReview,
    save,
    signup,
    doFollow,
    doUnfollow,
    checkFollowing
}

async function doFollow(user, followingUser) {
    const minimalLoggedInUser = {
        _id: followingUser._id,
        fullName: followingUser.fullName,
        imgUrl: followingUser.imgUrl,
        rank: followingUser.rank
    }
    var updatedUser = {}
    if (!user.followers.find(follower => follower._id === minimalLoggedInUser._id)) {
        updatedUser = { ...user, followers: [...user.followers, minimalLoggedInUser] }
    }
    save(updatedUser)
}

async function doUnfollow(user, unfollowingUser) {
    var updatedUser = {}
    var updatedFollowers = user.followers.filter(follower => follower._id !== unfollowingUser._id)
    updatedUser = { ...user, followers: updatedFollowers }
    save(updatedUser)
}

async function checkFollowing(user, loggedInUser) {
    const isFollowing = user.followers.filter(follower => follower._id === loggedInUser._id)
    
    console.log(isFollowing);
}

async function login(credentials) {
    console.log('login in frontend', credentials)
    const user = await HttpService.post('/auth/login', credentials)
    return _handleLogin(user)
    //For json-server
    // return HttpService.get(`${baseUrl}`)
    // .then(users => {
    //     return users[1]
    // });
};

async function logout() {
    // console.log('logout in frontend')
    const user = await HttpService.post('/auth/logout')
    return _handleLogout(user)
};

async function signup(userCred) {
    // console.log('signup in frontend', userCred)

    // console.log('userCred', userCred);

    const user = await HttpService.post('/auth/signup', userCred)
    return _handleLogin(user)
}

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

function _handleLogout(user) {
    sessionStorage.clear()
    // return user;
    return;
}