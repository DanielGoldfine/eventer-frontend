import React, { Component } from 'react';

import { connect } from 'react-redux'
import { removeEvent, loadEvents, setFilter } from '../store/actions/eventActions'

import EventList from '../cmps/EventList'
import FilterBar from '../cmps/FilterBar'


class EventIndex extends Component {

    state = {
        prevScrollpos: 0,
        filterBarClass: 'active'
    }

    componentDidMount() {
        window.addEventListener('scroll', this.listenToScrollFilter);
        this.props.loadEvents(this.props.filterBy);
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScrollFilter);
    };

    listenToScrollFilter = () => {
        const currScrollPos = document.body.scrollTop || document.documentElement.scrollTop
        if (currScrollPos > this.state.prevScrollpos) {
            this.setState({filterBarClass : 'inactive'})
        } else {
            this.setState({filterBarClass : 'active'})
        }
        this.setState({prevScrollpos : currScrollPos})
    }

    setScrollPos = (currentScrollPos) => {
        this.setState({ prevScrollpos: currentScrollPos })
    }

    onDelete = (eventId) => {
        this.props.removeEvent(eventId)
    }

    changeFilter = (filterBy) => {
        this.props.setFilter(filterBy)
            .then(res => this.props.loadEvents(filterBy))
    }


    render() {

        const {filterBarClass} = this.state;

        return (
            <div className="event-index main-container">
                <FilterBar filterBarClass={filterBarClass} changeFilter={this.changeFilter} gFilter={this.props.filterBy} handleChange={this.handleChange} />
                {this.props.events && <EventList onDelete={this.onDelete} events={this.props.events} onSubscribe={this.onSubscribe} />}
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
    removeEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(EventIndex);