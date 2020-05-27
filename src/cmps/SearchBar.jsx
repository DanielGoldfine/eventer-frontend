import React, { Component } from 'react'
import history from '../history.js'

import { connect } from 'react-redux'
import { setFilter, loadEvents } from '../store/actions/eventActions'

import SearchIcon from '@material-ui/icons/Search';

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
        };

        this.props.setFilter(gFilter)
            .then(res => {
                this.props.loadEvents(gFilter)
                history.push('/event')
            });
    };



    render() {

        const { searchTxt } = this.state;

        return (
            <section className="seach-bar-container flex align-items-center space-between">
                <input className="search-input" onChange={this.handleChange} type="text" name="txt" placeholder="What are you up to?" value={searchTxt} />
                <SearchIcon onClick={this.submitSearch} className="search-icn" />
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filterBy: state.eventsStore.filterBy,
        isHomePage: state.appStore.isHomePage
    };
};

const mapDispatchToProps = {
    setFilter,
    loadEvents
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
