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
        let filter = { ...this.props.filterBy }

        filter = { ...filter, txt: searchTxt }
        filter = { ...filter, category: '' }
        
        console.log('filter', filter);
        
        
        if (this.props.isHomePage) {
            // filter.sortDate = false;
            // filter.limit = null;
            filter = { ...filter, sortBy: 'startAt'}
            filter = { ...filter, limit: ''}
            filter = { ...filter, category: ''}
        };

        this.props.setFilter(filter)
            .then(res => {
                this.props.loadEvents(filter)
                history.push('/event')
            });
    };


    render() {

        const { searchTxt } = this.state;

        return (
            <form onSubmit={this.submitSearch} className="seach-bar-container flex align-items-center space-between">
                <input className="search-input" onChange={this.handleChange} type="text" name="txt" placeholder="What are you up to?" value={searchTxt} />
                <SearchIcon onClick={this.submitSearch} className="search-icn" />
                <button hidden></button>
            </form>
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
