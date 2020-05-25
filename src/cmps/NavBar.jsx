import React, { Component } from 'react'
import SearchBar from './SearchBar'
import UserPreview from './UserPreview'
import { Notifications } from './Notifications'
import { login } from '../store/actions/userActions'
import history from '../history.js'
import eventerWhite from '../assets/design/eventer-logo-white.png'
import eventerGrey from '../assets/design/eventer-logo-grey.png'
import eventerIcn from '../assets/design/eventer-logo-grey.png'
import modalConnector from '../assets/helpers/modal-connector.png'

import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ViewListIcon from '@material-ui/icons/ViewList';


import { connect } from 'react-redux'

class NavBar extends Component {

    state = {
        isNotificationsOpen: false,
        isUserMenuOpen: false,
        navBgClass: 'inactive'
    }


    componentDidMount() {
        window.addEventListener('scroll', this.listenToScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll)
    }

    listenToScroll = () => {
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop

        if (winScroll > 0) {
            this.setState({ navBgClass: 'active' })
        } else {
            this.setState({ navBgClass: 'inactive' })

        }
    }


    goToPage = (page) => {
        let route;
        if (page === 'back') {
            history.goBack();
            return;
        }
        if (page === 'home') route = `/`;
        if (page === 'edit') route = `/event/edit/`;
        if (page === 'user') route = `/user/${this.props.loggedInUser._id}`;
        // if (page === 'login') route = '/login/'
        if (page === 'login') {
            this.props.login();
            this.forceCloseModals();
        }
        history.push(route);
        this.forceCloseModals();
    }

    forceCloseModals = () => {
        document.removeEventListener('mousedown', this.closeUserMenu)
        window.removeEventListener('keydown', this.closeUserMenu)
        this.setState({ isUserMenuOpen: false });
        this.setState({ isNotificationsOpen: false })
    }

    toggleUserMenu = () => {

        const userMenuState = this.state.isUserMenuOpen;

        if (!userMenuState) {
            this.setState({ isUserMenuOpen: !userMenuState });
            document.addEventListener('mousedown', this.closeUserMenu);
            window.addEventListener('keydown', this.closeUserMenu);
        } else {
            this.setState({ isUserMenuOpen: !userMenuState });
            document.removeEventListener('mousedown', this.closeUserMenu);
            window.removeEventListener('keydown', this.closeUserMenu);
        }

    }

    closeUserMenu = (e) => {

        if (this.userMenu.contains(e.target) || this.userMenuOpen.contains(e.target)) {
            return;
        }

        document.removeEventListener('mousedown', this.closeUserMenu)
        window.removeEventListener('keydown', this.closeUserMenu)
        this.setState({ isUserMenuOpen: false });
    }

    toggleNotifications = () => {
        const notificationsState = this.state.isNotificationsOpen;

        if (!notificationsState) {
            this.setState({ isNotificationsOpen: !notificationsState });
            document.addEventListener('mousedown', this.closeNotifications);
            window.addEventListener('keydown', this.closeNotifications);
        } else {
            this.setState({ isNotificationsOpen: !notificationsState });
            document.removeEventListener('mousedown', this.closeNotifications);
            window.removeEventListener('keydown', this.closeNotifications);
        }

    }

    closeNotifications = (e) => {
        if (this.notifications.contains(e.target) || this.notificationsOpen.contains(e.target)) {
            return;
        }

        document.removeEventListener('mousedown', this.closeNotifications)
        window.removeEventListener('keydown', this.closeNotifications)
        this.setState({ isNotificationsOpen: false });
    }


    render() {

        const { isNotificationsOpen, isUserMenuOpen, navBgClass } = this.state;
        const { loggedInUser } = this.props;

        return (
            <React.Fragment>
                    {isNotificationsOpen && <div ref={notifications => this.notifications = notifications}>
                        < Notifications />
                    </div>}
                    {isUserMenuOpen && <div ref={userMenu => this.userMenu = userMenu} className="user-menu-modal flex column">
                        <button onClick={() => { this.goToPage('user') }}>My Profile</button>
                        <button onClick={() => { this.goToPage('login') }}>Login</button>
                        <button>Logout</button>
                        <img className="connector" src={modalConnector} alt="" />
                    </div>}
                    <nav className="nav-bar-container main-container flex space-between align-items-center">
                        <div className="flex space-between align-items-center">
                        <div className="flex align-items-center">
                            {/* <button onClick={() => { this.goToPage('back') }}>&#x3c;</button> */}
                            <img onClick={() => { this.goToPage('home') }} className="main-logo" src={eventerGrey} alt="" />
                            {/* <SearchBar setTxtFilter={this.setTxtFilter} /> */}
                        </div>
                        <section className="nav-bar-btns flex align-center">
                            {loggedInUser && <UserPreview className minimalUser={loggedInUser} />}
                            <AddCircleIcon onClick={() => { this.goToPage('edit') }} />
                            {loggedInUser && <NotificationsIcon ref={notificationsOpen => this.notificationsOpen = notificationsOpen} onClick={this.toggleNotifications} />}
                            <AccountCircleIcon ref={userMenuOpen => this.userMenuOpen = userMenuOpen} onClick={this.toggleUserMenu} />
                        </section>
                        </div>
                    </nav >
                    <div className={`nav-bg ${navBgClass}`}></div>
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