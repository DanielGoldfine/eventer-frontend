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
import eventerIcn from '../assets/design/eventer-icn.png'
import modalConnector from '../assets/helpers/modal-connector.png'
import { login, addNotification, loadUser, saveUser } from '../store/actions/userActions'

import eventBusService from "../services/eventBusService.js";

import socketService from '../services/socketService';

import { setFilter } from '../store/actions/eventActions'


class NavBar extends Component {

    state = {
        isNotificationsOpen: false,
        isUserMenuOpen: false,
        isNarrowModalOpen: false,
        navState: 'bright',
        isHomePage: true,
        isSearchBar: false,
        isNarrowNotificationsOpen: false
    }


    componentDidMount() {
        socketService.setup();
        this.unsubscribeFromEventBus = eventBusService.on('user-login', (userId) => {
            socketService.emit('userLogin', userId);
            socketService.on('event got updated', this.addNotification);
            socketService.on('new event created', this.addNotification);
            socketService.on('user joined event', this.addNotification);
            socketService.on('user left event', this.addNotification);
            socketService.on('user rank', this.addNotification);
            this.props.loadUser(userId)
        })

        if (this.props.isHomePage) {
            this.setState({ navState: 'bright' })
            this.setState({ isHomePage: this.props.isHomePage })
            this.setState({ isSearchBar: false })
        } else {
            this.setState({ navState: 'dark' })
            this.setState({ isHomePage: this.props.isHomePage })
        };
        this.setState({ loggedInUser: this.props.loggedInUser })
        if (this.props.loggedInUser) {
           this.props.loadUser(this.props.loggedInUser._id)
            socketService.emit('userLogin', this.props.loggedInUser._id);
            socketService.on('event got updated', this.addNotification);
            socketService.on('new event created', this.addNotification);
            socketService.on('user joined event', this.addNotification);
            socketService.on('user left event', this.addNotification);
            socketService.on('user rank', this.addNotification);
        }
    }

    componentWillUpdate = (nextProps, nextState) => {
        if (nextState.isHomePage !== nextProps.isHomePage) {
            if (this.props.isHomePage) {
                window.addEventListener('scroll', this.listenToScrollNav)
                this.setState({ navState: 'bright' })
                this.setState({ isHomePage: this.props.isHomePage })
                this.setState({ isSearchBar: false })
            } else {
                window.removeEventListener('scroll', this.listenToScrollNav)
                this.setState({ navState: 'dark' })
                this.setState({ isHomePage: this.props.isHomePage })
            };
        };
    };

    componentWillUnmount() {
        this.unsubscribeFromEventBus();
        window.removeEventListener('scroll', this.listenToScrollNav)
        socketService.off('event got updated', this.addNotification);
        socketService.off('new event created', this.addNotification);
        socketService.off('user joined event', this.addNotification);
        socketService.off('user left event', this.addNotification);
        socketService.off('user rank', this.addNotification);
    }


    addNotification = async (notification) => {
        console.log('addNotification',notification)
        const user = await this.props.addNotification(notification)
        this.props.loadUser(user._id)
    }

    listenToScrollNav = () => {
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
        if (page === 'index') {
            let filter = { ...this.props.filterBy }
            filter = { ...filter, txt: '' ,sortBy: 'startAt', limit: '', category: '', futureOnly: true , userId:''}
            this.props.setFilter(filter)
            // .then(() => {
                route = `/event`;
            // })
            
        }
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
        document.removeEventListener('mousedown', this.closeNotifications);
        window.removeEventListener('keydown', this.closeNotifications);
        this.setState({ isUserMenuOpen: false });
        this.setState({ isNotificationsOpen: false })
        this.setState({ isNarrowModalOpen: false })
        this.setState({ isNarrowNotificationsOpen: false })
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

            if (this.props.loggedInUser.notification.unseenCount > 0) {
                let loggedInUser = { ...this.props.loggedInUser }
                loggedInUser.notification.unseenCount = 0;

                this.props.saveUser(loggedInUser)
            }
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

    notificationClicked = (clickCommand, userId, eventId, msgId) => {

        let loggedInUser = this.props.loggedInUser;
        loggedInUser.notification.msgs.map(msg => {
            if (msg._id === msgId) {
                msg.isRead = true;
            };
        });
        this.props.saveUser(loggedInUser);

        if (clickCommand === 'user preview') {
            this.forceCloseModals();
            return;
        }
        let route;
        if (clickCommand === 'event') route = `/event/${eventId}`
        if (clickCommand === 'user') route = `/user/${userId}`
        this.forceCloseModals();
        history.push(route);
    }

    openNarrowModal = () => {
        const { isNarrowModalOpen } = this.state;
        this.setState({ isNarrowModalOpen: !isNarrowModalOpen })
    }

    openNarrowNotifications = () => {
        const { isNarrowNotificationsOpen } = this.state;
        this.setState({ isNarrowNotificationsOpen: !isNarrowNotificationsOpen })
        if (this.props.loggedInUser.notification.unseenCount > 0) {
            let loggedInUser = { ...this.props.loggedInUser }
            loggedInUser.notification.unseenCount = 0;
            this.props.saveUser(loggedInUser)
        }
    }

    render() {

        const { isNotificationsOpen, isUserMenuOpen, isNarrowModalOpen, isNarrowNotificationsOpen, navState, isSearchBar } = this.state;
        const { loggedInUser } = this.props;
        return (
            <main className={navState}>

          <nav className="nav-bar-container main-container flex space-between align-items-center">

                <section className={`narrow-modal-container ${isNarrowModalOpen ? 'narrow-active' : ''}`}>

                    <button className="create-event" onClick={() => { this.goToPage('index') }}>Events</button> 
                    <button className="create-event" onClick={() => { this.goToPage('edit') }}>Create Event</button>

                    <div onClick={this.openNarrowNotifications} className={`narow-notifications-container narrow-section flex align-center
                    ${isNarrowNotificationsOpen ? 'highlight' : ""}`}>
                         {loggedInUser && loggedInUser.notification.unseenCount > 0 && <h3 className="not-count">{loggedInUser.notification.unseenCount}</h3>}
                        <NotificationsIcon />
                        <p>Notifications</p>
                    </div>

                    {isNarrowNotificationsOpen && <div className="notifications" ref={notifications => this.notifications = notifications}>
                        {loggedInUser.notification && < Notifications notification={loggedInUser.notification}
                            notificationClicked={this.notificationClicked} />}
                    </div>}

                    <div onClick={() => { this.goToPage('user') }} className="narrow-section flex align-center">
                        <PersonIcon />
                        <p>My Profile</p>
                    </div>

                   {loggedInUser && <div className="narrow-section flex align-center">
                        {loggedInUser.userName === 'Guest' && <p className="login" onClick={() => { this.goToPage('login') }}>Login</p>}
                        {loggedInUser.userName !== 'Guest' && <p className="login" onClick={() => { this.goToPage('logout') }}>Logout</p>}
                    </div>}

                </section>

                    <div className="flex space-between align-items-center">

                        <div className="search-logo flex align-items-center">
                            <img onClick={() => { this.goToPage('home') }} className="main-logo" src={eventerLogo} alt="" />
                            <img onClick={() => { this.goToPage('home') }} className="main-icn" src={eventerIcn} alt="" />
                            {(!this.props.isHomePage || isSearchBar) && <SearchBar className="search-for-wide" setTxtFilter={this.setTxtFilter} />}
                        </div>

                        <section className="nav-bar-btns flex align-center">


                            {loggedInUser && <UserPreview className minimalUser={loggedInUser} />}


                            <button className="create-event" onClick={() => { this.goToPage('edit') }}>Add New Event</button>
                            <button className="create-event events-index" onClick={() => { this.goToPage('index') }}>To All Events</button>


                            {loggedInUser && loggedInUser.notification.unseenCount > 0 && <h3 className="not-count">{loggedInUser.notification.unseenCount}</h3>}


                            {loggedInUser && <NotificationsIcon className={`notifications-icn ${isNotificationsOpen ? 'highlight' : ""}`}
                                ref={notificationsOpen => this.notificationsOpen = notificationsOpen} onClick={this.toggleNotifications} />}


                            <PersonIcon className={`user-icn ${isUserMenuOpen ? 'highlight' : ''}`}
                                ref={userMenuOpen => this.userMenuOpen = userMenuOpen} onClick={this.toggleUserMenu} />


                            <ViewListIcon onClick={this.openNarrowModal} className={`list-icn ${isNarrowModalOpen ? 'highlight' : ""}`} />


                            {isNotificationsOpen && <div className="notifications" ref={notifications => this.notifications = notifications}>
                                {loggedInUser.notification && < Notifications notification={loggedInUser.notification}
                                    notificationClicked={this.notificationClicked} />}
                                <img className="connector" src={modalConnector} alt="" />
                            </div>}


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
    login, addNotification, loadUser, saveUser , setFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));