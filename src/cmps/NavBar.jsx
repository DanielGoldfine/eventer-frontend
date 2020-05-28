import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ViewListIcon from '@material-ui/icons/ViewList';

import SearchBar from './SearchBar'
import UserPreview from './UserPreview'
import { Notifications } from './Notifications'
import history from '../history.js'
import eventerLogo from '../assets/design/eventer-logo-new.png'
import eventerIcn from '../assets/design/eventer.icn.png'
import modalConnector from '../assets/helpers/modal-connector.png'
import { login } from '../store/actions/userActions'





class NavBar extends Component {

    state = {
        isNotificationsOpen: false,
        isUserMenuOpen: false,
        navState: 'bright',
        isHomePage: true,
        isSearchBar: false
    }


    componentDidMount() {
        // console.log('NavBar this.props', this.props);
        
        if (this.props.isHomePage) {
            this.setState({ navState: 'bright' })
            this.setState({ isHomePage: this.props.isHomePage })
        } else {
            this.setState({ navState: 'dark' })
            this.setState({ isHomePage: this.props.isHomePage })
        };
    }

    componentWillUpdate = (nextProps, nextState) => {
        if (nextState.isHomePage !== nextProps.isHomePage) {
            if (this.props.isHomePage) {
                window.addEventListener('scroll', this.listenToScrollNav)
                this.setState({ navState: 'bright' })
                this.setState({ isHomePage: this.props.isHomePage })
            } else {
                window.removeEventListener('scroll', this.listenToScrollNav)
                this.setState({ navState: 'dark' })
                this.setState({ isHomePage: this.props.isHomePage })
            };
        };
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScrollNav)
    }

    listenToScrollNav = () => {
        console.log('scroll')
        if (!this.props.isHomePage) return;
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;
        if (winScroll > 0) {
            this.setState({ navState: 'dark' });
        } else {
            this.setState({ navState: 'bright' });

        };
        if (winScroll > 240) {
            this.setState({ isSearchBar: true })
        } else {
            this.setState({ isSearchBar: false })
        }
    };


    goToPage = (page) => {
        let route;
        if (page === 'back') {
            history.goBack();
            return;
        }
        if (page === 'home') route = `/`;
        if (page === 'edit') route = `/event/edit/`;
        if (page === 'user') route = `/user/${this.props.loggedInUser._id}`;
        if (page === 'login') {
            route = `/login`;
            this.forceCloseModals();
        };
        if (page === 'logout') {
            this.props.login({ userName: 'Guest', password: 1 })
            route = `/login`;
            this.forceCloseModals();
        }
        history.push(route);
        this.forceCloseModals();
    };

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

        const { isNotificationsOpen, isUserMenuOpen, navState, isSearchBar } = this.state;
        const { loggedInUser } = this.props;

        return (
            <main className={navState}>
                {isNotificationsOpen && <div ref={notifications => this.notifications = notifications}>
                    < Notifications />
                </div>}
                <nav className="nav-bar-container main-container flex space-between align-items-center">
                    <div className="flex space-between align-items-center">
                        <div className="search-logo flex align-items-center">
                            <img onClick={() => { this.goToPage('home') }} className="main-logo" src={eventerLogo} alt="" />
                            <img onClick={() => { this.goToPage('home') }} className="main-icn" src={eventerIcn} alt="" />
                            {(!this.props.isHomePage || isSearchBar) && <SearchBar className="search-for-wide" setTxtFilter={this.setTxtFilter} />}
                        </div>
                        <section className="nav-bar-btns flex align-center">
                            {loggedInUser && <UserPreview className minimalUser={loggedInUser} />}
                            <button className="create-event  " onClick={() => { this.goToPage('edit') }}>Create Event</button>
                            {loggedInUser && <NotificationsIcon className="notifications-icn" ref={notificationsOpen => this.notificationsOpen = notificationsOpen} onClick={this.toggleNotifications} />}
                            <PersonIcon className="user-icn" ref={userMenuOpen => this.userMenuOpen = userMenuOpen} onClick={this.toggleUserMenu} />
                            <ViewListIcon className='list-icn' />
                            {isUserMenuOpen && <div ref={userMenu => this.userMenu = userMenu} className="user-menu-modal flex column">
                                <button onClick={() => { this.goToPage('user') }}>My Profile</button>
                                {loggedInUser.userName === 'Guest' && <button onClick={() => { this.goToPage('login') }}>Login</button>}
                                {loggedInUser.userName !== 'Guest' && <button onClick={() => { this.goToPage('logout') }}>Logout</button>}
                                <img className="connector" src={modalConnector} alt="" />
                            </div>}
                        </section>
                    </div>
                </nav >
                <div className="nav-bg"></div>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.eventsStore.events,
        loggedInUser: state.userStore.loggedInUser,
        isHomePage: state.appStore.isHomePage
    };
};

const mapDispatchToProps = {
    login
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));