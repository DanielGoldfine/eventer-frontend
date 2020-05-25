import React, { Component } from 'react';

import { connect } from 'react-redux'
import { removeEvent, loadEvents, setFilter } from '../store/actions/eventActions'

import EventList from '../cmps/EventList'
import FilterBar from '../cmps/FilterBar'


class EventIndex extends Component {
    // state = {
    //     filterBy: {
    //         date: '',
    //         radius: '',
    //         price: '',
    //         category: '',
    //         userLocation: '',
    //         txt: ''
    //     }
    //     // events: null
    // }

    componentDidMount() {
        // this.loadGlobalFilter();
        // this.props.setFilter(this.state.filterBy)
        
        // this.props.loadEvents(filterBy)
        this.props.loadEvents(this.props.filterBy)
        // .then(events => {
        //     console.log(events)
        // })
    }

    componentDidUpdate(prevProps) { // To apply changing the filter
        // if (!this.props.loggedInUser) return this.props.history.push('/login')
        // if (this.props.filter !== prevProps.filter)
        //     this.props.loadEvents(this.props.filter)        //this.props.loadEvents(this.props.filter, true)
                // .then(() => { this.props.toggleLoad(false) })
    }

    // loadGlobalFilter = () => {
    //     const gFilter = this.props.filterBy
        // console.log('gFilter', gFilter);
        // this.props.loadEvents(gFilter)
        // this.setState.filterBy = gFilter
        // this.setState({ filterBy: gFilter })
    // }

    onSubscribe = (userId, eventId) => {
        // console.log(userId, eventId);
    }

    onDelete = (eventId) => {
        // console.log(eventId);
        this.props.removeEvent(eventId)
    }


    // handleChange = (filterBy) => {
    //     // const field = target.name
    //     // const value = (target.type === 'number') ? parseInt(target.value) : target.value
    //     this.setState(prevState => ({ ...prevState, filterBy }), () => {
    //         // this.props.setFilter(this.state.filterBy)
    //         this.props.loadEvents(this.props.filterBy)
    //     })
    // }

    changeFilter = (filterBy) => {
        this.props.setFilter(filterBy)
        .then(res => this.props.loadEvents(filterBy))
    }


    render() {
        // console.log('events', this.props.events)
        return (
            <div className="main container flex column align-center justify-center">

                <FilterBar changeFilter={this.changeFilter} gFilter={this.props.filterBy}  handleChange={this.handleChange} />

                
                
                <section className="event-list-cmp">
                    {this.props.events && <EventList onDelete={this.onDelete} events={this.props.events} onSubscribe={this.onSubscribe} />}
                </section>

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