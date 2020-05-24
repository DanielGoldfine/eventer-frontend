import React, { Component } from 'react'
import history from '../history.js'

import { connect } from 'react-redux'
import { setFilter, loadEvents } from '../store/actions/eventActions'

class SearchBar extends Component {

    state = {
        searchTxt: ''
    }

    handleChange = ({ target }) => {
        const value = target.value;
        this.setState({ searchTxt: value })
    }


    submitSearch = (ev) => {
        ev.preventDefault();
        const { searchTxt } = this.state;
        let gFilter = this.props.filterBy;

        gFilter.txt = searchTxt;

        if (this.props.isHomePage) {
            gFilter.sortDate = false;
            gFilter.limit = null;
        }

        this.props.setFilter(gFilter)
            .then(res => {
                    this.props.loadEvents(gFilter)
                    history.push('/event')
            })

        // this.setState({ searchTxt: '' })
    }



    render() {

        const { searchTxt } = this.state;

        return (
            <section className="seach-bar-container">
                <form onSubmit={this.submitSearch}>
                    <input className="txt" onChange={this.handleChange} type="text" name="txt" placeholder="What is on your mind?" value={searchTxt} />
                    <input className="submit" type="submit" value="Search" />
                </form>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filterBy: state.eventsStore.filterBy,

    };
};

const mapDispatchToProps = {
    setFilter,
    loadEvents
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
