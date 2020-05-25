import React, { Component } from 'react'
import SearchBar from './SearchBar'
import UserPreview from './UserPreview'
import { Notifications } from './Notifications'
import { login } from '../store/actions/userActions'
import history from '../history.js'
import {Link} from 'react-router-dom'

import { connect } from 'react-redux'

class NavBar extends Component {

    componentDidMount() {
        
    }

    state = {
        isNotificationsOpen: false
    }

    toggNotifications = () => {
        const notificationsState = this.state.isNotificationsOpen

        if (!notificationsState) {
            document.addEventListener('mousedown', this.checkNotClick, false)
            window.addEventListener('keydown', this.checkNotKey);
        } else {
            document.removeEventListener('mousedown', this.checkNotClick, false)
            window.removeEventListener('keydown', this.checkNotKey)
        }

        this.setState({ isNotificationsOpen: !notificationsState })
    }

    checkNotKey = (e) => {
        if (e.code === 'Escape') {
            this.toggNotifications()
        }
    }

    checkNotClick = (e) => {
        if (this.node.contains(e.target) || this.node1.contains(e.target)) {
            return
        }
        this.toggNotifications(false);
    }

    goToPage = (page) => {
        let route;
        if (page === 'back') {
            history.goBack();
            return;
        }
        if (page === 'edit') route = `/event/edit/`;
        if (page === 'user') route = `/user/${this.props.loggedInUser._id}`;
        // if (page === 'login') route = '/login/'
        if (page === 'login') {
            this.props.login();
        }
        history.push(route);
    }


    render() {

        const { isNotificationsOpen } = this.state;
        const { loggedInUser } = this.props;

        return (
            <React.Fragment>
                <div ref={node => this.node = node}>
                    {isNotificationsOpen && <Notifications />}
                </div>
                <nav className="nav-bar-container flex space-between align-items-center">
                    <div className="flex align-items-center">
                        <button onClick={() => { this.goToPage('back') }}>&#x3c;</button>
                        <Link to="/"><h1 className="logo">logo</h1></Link>
                        <SearchBar setTxtFilter={this.setTxtFilter} />
                    </div>
                    {loggedInUser && <UserPreview minimalUser={loggedInUser} />}
                    <section className="nav-bar-btns">
                        {loggedInUser && <button onClick={() => { this.goToPage('edit') }}>Create Event</button>}
                        {loggedInUser && <button ref={node1 => this.node1 = node1} onClick={this.toggNotifications}>notifications</button>}
                        {loggedInUser && <button onClick={() => { this.goToPage('user') }}>User Profile</button>}
                        <button onClick={() => { this.goToPage('login') }}>Login</button>
                    </section>
                </nav >
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.eventsStore.events,
        loggedInUser: state.userStore.loggedInUser
    };
};

const mapDispatchToProps = {
    login,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);