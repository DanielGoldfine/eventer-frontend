import React, { Component } from 'react'

import { connect } from 'react-redux'
import { loadEvents, setFilter } from '../store/actions/eventActions'
import { setHomePage } from '../store/actions/appActions'

import heroOverlay from '../assets/design/hero-overlay.png'
import SearchBar from '../cmps/SearchBar'
import { CategoryLinks } from '../cmps/CategoryLinks'
import UpcomingEvents from '../cmps/UpcomingEvents'
import CategoryGallery from '../cmps/CategoryGallery'
import RotatingHero from '../cmps/RotatingHero'


class HomePage extends Component {

    state = {
        filterBy: {},
        isSearchBar: true
    }

    componentDidMount() {
        window.addEventListener('scroll', this.listenToScrollHome)
        this.props.setHomePage(true);
        this.initHomePage();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScrollHome)
        this.props.setHomePage(false);
    };

    listenToScrollHome = () => {
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;
        if (winScroll > 240) {
            this.setState({ isSearchBar: false })
        } else {
            this.setState({ isSearchBar: true })
        }
    };

    initHomePage = () => {
        let filterBy = {
            txt: '',
            category: '',
            date: '',
            radius: '',
            locationType: '',
            userLocation: '',
            price: '',
            sortDate: true,
            sortNearby: false,
            limit: 20
        }
        this.props.setFilter(filterBy)
        this.props.loadEvents()
    }

    chooseCategory = (chosenCategory) => {
        let gFilter = this.props.filterBy;

        gFilter.sortDate = false;
        gFilter.limit = null;
        gFilter.category = chosenCategory;

        this.props.setFilter(gFilter)
            .then(res => this.props.history.push(`/event/`));
    };

    render() {
        const { isSearchBar } = this.state;
        return (
                <div onSwiping={this.eventHandler} className="home-page-container">
                    <header className="main-header-container flex justify-center align-items-center">
                        <div className="header flex column align-center">
                            <h1>Enter a World of Events</h1>
                            {isSearchBar && <SearchBar />}
                        </div>
                        <img className="hero-overlay" src={heroOverlay} alt="" />
                        <RotatingHero />
                    </header>
                    <CategoryLinks homePage chooseCategory={this.chooseCategory} />
                    <h2>Upcoming Events</h2>
                    {this.props.events && <UpcomingEvents events={this.props.events} />}
                    < CategoryGallery chooseCategory={this.chooseCategory} />
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.eventsStore.events,
        filterBy: state.eventsStore.filterBy
    };
};

const mapDispatchToProps = {
    loadEvents,
    setFilter,
    setHomePage
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);