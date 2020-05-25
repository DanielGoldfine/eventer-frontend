import React, { Component } from 'react'

import { connect } from 'react-redux'
import { loadEvents, setFilter } from '../store/actions/eventActions'
import { setHomePage } from '../store/actions/appActions'

import heroImg from '../assets/imgs/mainhero.jpg'
import SearchBar from '../cmps/SearchBar'
import { CategoryLinks } from '../cmps/CategoryLinks'
import UpcomingEvents from '../cmps/UpcomingEvents'

import eventerIcn from '../assets/design/eventer-logo-grey.png'


class HomePage extends Component {

    state = {
        filterBy: {},
    }

    componentDidMount() {
        this.props.setHomePage(true);
        this.initHomePage();
    }

    componentWillUnmount() {
        this.props.setHomePage(false);
    };

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
                    <div className="header flex column align-center">
                        <h1>Enter a World of Events</h1>
                        <SearchBar />
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
    setFilter,
    setHomePage
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);