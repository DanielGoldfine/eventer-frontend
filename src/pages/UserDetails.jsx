import React, { Component } from 'react'

import { UserDesc } from '../cmps/UserDesc'
import { ReviewForm } from '../cmps/ReviewForm'
import { ReviewList } from '../cmps/ReviewList'
import { addReview, loadUser } from '../store/actions/userActions'


import { connect } from 'react-redux'



class UserDetails extends Component {

    state = {
        isLoggedInUser: false,
        user: null,
    }

    componentDidMount() {
        this.setUser();
    }

    componentDidUpdate() {
        const {user} = this.state;
        if (user) {
            const { id } = this.props.match.params;
            if (id !== this.state.user._id) {
                this.setUser();
            };
        };
    };

    setUser = () => {
        const { id } = this.props.match.params;
        const { loggedInUser } = this.props;
        if (loggedInUser) {
            if (id === loggedInUser._id) {
                this.setState({ isLoggedInUser: true });
                this.setState({ user: loggedInUser });
                return
            }
        }
        
        this.props.loadUser(id)
            .then(user => {
                this.setState({ isLoggedInUser: false });
                this.setState({ user })
            });

    }

    submitReview = (newReview) => {
        this.props.addReview(newReview, this.state.user)
            .then(user => {
                this.setState({ user })
            })
    }

    render() {

        const { isLoggedInUser, user, } = this.state;
        return (
            <React.Fragment>
                {user && <section className="user-details-container flex column justify-center align-items-center">
                    <UserDesc isLoggedInUser={isLoggedInUser} user={user} />
                    <button className="cta-btn-full follow-btn">Follow</button>
                    {!isLoggedInUser && this.props.minimalLoggedInUser && <ReviewForm submitReview={this.submitReview} minimalUser={this.props.minimalLoggedInUser} />}
                    <ReviewList reviews={user.reviews} />
                </section>}
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        loggedInUser: state.userStore.loggedInUser,
        minimalLoggedInUser: state.userStore.minimalLoggedInUser
    };
};

const mapDispatchToProps = {
    addReview,
    loadUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);