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
        this.setSortBy();
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

    initHomePage = async () => {
        let filterBy = {
            txt: '',
            category: '',
            date: '',
            radius: '',
            locationType: '',
            userLocation: '',
            price: '',
            sortBy: 'startAt',
            limit: 20
        }
        await this.props.setFilter(filterBy)
        this.props.loadEvents(filterBy)
    }

    chooseCategory = async(chosenCategory) => {
        let filter = { ...this.props.filterBy }

        filter = { ...filter, sortBy: 'startAt' }
        filter = { ...filter, limit: null }
        filter = { ...filter, category: chosenCategory }

        console.log('HomePage: filter - ', filter);
        

        await this.props.setFilter(filter);
        this.props.history.push('/event');
    };

    setSortBy = (sortBy = 'startAt') => {
        let filter = { ...this.props.filterBy }

        filter = { ...filter, sortBy }

        console.log('filter', filter);


        this.props.setFilter(filter);
    }

    getFilter = () => {
        return { ...this.props.filterBy }
    }
    

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
                {this.props.events && <UpcomingEvents events={this.props.events} getFilter={this.getFilter}/>}
                    <CategoryGallery chooseCategory={this.chooseCategory} />
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