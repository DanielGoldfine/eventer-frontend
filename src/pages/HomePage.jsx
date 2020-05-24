import React, { Component } from 'react'

import { connect } from 'react-redux'
import { loadEvents, setFilter } from '../store/actions/eventActions'

import heroImg from '../assets/imgs/mainhero.jpg'
import SearchBar from '../cmps/SearchBar'
import { CategoryLinks } from '../cmps/CategoryLinks'
import UpcomingEvents from '../cmps/UpcomingEvents'

class HomePage extends Component {

    state = {
        filterBy: {},
    }

    componentDidMount() {
        this.initHomePage();
    }

    initHomePage = () => {
        let gFilter = this.props.filterBy;
        gFilter.sortDate = true;
        gFilter.limit = 20;
        this.props.setFilter(gFilter)
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
        return (
            <div>
                <header className="main-header-container flex justify-center align-items-center">
                    <div className="header flex column align-items-end">
                        <h1>Enter a World of Events</h1>
                        <SearchBar isHomePage={true} setTxtFilter={this.setTxtFilter} />
                    </div>
                    <img src={heroImg} alt="" />
                </header>
                <CategoryLinks chooseCategory={this.chooseCategory} />
                {this.props.events && <UpcomingEvents events={this.props.events} />}
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
    setFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);