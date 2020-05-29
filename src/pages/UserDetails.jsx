import React, { Component } from 'react'
import { connect } from 'react-redux'

import { UserDesc } from '../cmps/UserDesc'
import { ReviewForm } from '../cmps/ReviewForm'
import { ReviewList } from '../cmps/ReviewList'
import { MinimalEventList } from '../cmps/MinimalEventList'
import { FollowUserList } from '../cmps/FollowUserList'

import { loadEvents } from '../store/actions/eventActions'
import { addReview, loadUser, loadUserLocal } from '../store/actions/userActions'
import userService from '../services/userService'
import socketService from '../services/socketService'


class UserDetails extends Component {

    state = {
        isLoggedInUser: false,
        currUserId: ''
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        const { loggedInUser } = this.props;
        this.props.loadUserLocal(id)
        this.setState({ currUserId: id })
        const filterBy = {userId : id}
        this.props.loadEvents(filterBy)

        if (id === loggedInUser._id) { // logged-in user opens his own details pages
            this.setState({ isLoggedInUser: true });
        } else {   // logged-in user opens other user page
            this.setState({ isLoggedInUser: false });
        }
    }

    componentDidUpdate() {
        const { user } = this.state;
        if (user) {
            const { id } = this.props.match.params;
            if (id !== this.state.user._id) {
                this.setUser();
            };
        };
    };

    submitReview = async (newReview) => {
        const user = await this.props.addReview(newReview, this.props.currUser)
        // this.setState({ user })
        //Send notification to the user that got the review
        const minimalUser = this.props.minimalLoggedInUser
        const payload = {
            userId: user._id,
            minimalEvent: {},
            minimalUser,
            type: 'user_review'
        }
        socketService.emit('user rank', payload)
    }

    doFollow = (loggedInUser) => {
        const { user } = this.state;
        userService.doFollow(user, loggedInUser);
    }

    doUnfollow = (loggedInUser) => {
        const { user } = this.state;
        userService.doUnfollow(user, loggedInUser);
    }

    isFollowing = (loggedInUser) => {
        const { user } = this.state;
        userService.checkFollowing(user, loggedInUser)
    }

    render() {

        const { loggedInUser, events } = this.props;
        const { isLoggedInUser } = this.state;
        const user = this.props.currUser

        return (
            <React.Fragment>
                <main className="user-grid-container">
                    {user && <section className="user-details-container">

                        <UserDesc eventsCreated={this.props.events} isLoggedInUser={isLoggedInUser} user={user} doFollow={this.doFollow} doUnfollow={this.doUnfollow} loggedInUser={loggedInUser} />

                        {!isLoggedInUser && this.props.minimalLoggedInUser &&
                            <ReviewForm
                                submitReview={this.submitReview}
                                minimalUser={this.props.minimalLoggedInUser} />}

                        <ReviewList reviews={user.reviews} />

                        <div className="user-lists">
                            <MinimalEventList events={events} />
                            <FollowUserList followers={user.followers} />
                        </div>

                    </section>}
                </main>

                <img className="bg-img" src={require('../assets/imgs/page-header.png')} />

            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    const { loggedInUser, minimalLoggedInUser, currUser } = state.userStore;

    return {
        events: state.eventsStore.events,
        loggedInUser: loggedInUser,
        minimalLoggedInUser: minimalLoggedInUser,
        currUser
    };
};

const mapDispatchToProps = {
    addReview,
    loadUser,
    loadEvents,
    loadUserLocal
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);