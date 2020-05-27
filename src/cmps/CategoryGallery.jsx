import React, { Component } from 'react'

import sports from '../assets/imgs/main-gallery-sports.jpg'
import liveMusic from '../assets/imgs/main-gallery-live-music.jpg'
import parties from '../assets/imgs/main-gallery-paries.jpg'
import standUp from '../assets/imgs/main-gallery-stand-up.jpg'
import workshops from '../assets/imgs/main-gallery-workshops.jpg'
import lectures from '../assets/imgs/main-gallery-lectures.jpg'

import { setFilter } from '../store/actions/eventActions'
import { connect } from 'react-redux'

class CategoryGallery extends Component {

    render() {
        return (
            <section className="category-gallery-container main-container">
                <div className="categoriy-grid-container">
                    <div className="gallery-item sports">
                        <div className="title-link">
                            <h2>Sports</h2>
                            <button onClick={() => {this.props.chooseCategory('Sports')}}>Show more</button>
                        </div>
                        <div className="overlay"></div>
                        <img src={sports} alt="" />
                    </div>
                    <div className="gallery-item live-music">
                        <div className="title-link">
                            <h2>Live Music</h2>
                            <button onClick={() => {this.props.chooseCategory('Live Music')}}>Show more</button>
                        </div>
                        <div className="overlay"></div>
                        <img src={liveMusic} alt="" />
                    </div>
                    <div className="gallery-item parties">
                        <div className="title-link">
                            <h2>Parties</h2>
                            <button onClick={() => {this.props.chooseCategory('Parties')}}>Show more</button>
                        </div>
                        <div className="overlay"></div>
                        <img src={parties} alt="" />
                    </div>
                    <div className="gallery-item stand-up">
                        <div className="title-link">
                            <h2>Stand-Up Comedy</h2>
                            <button onClick={() => {this.props.chooseCategory('Stand-up Comedy')}}>Show more</button>
                        </div>
                        <div className="overlay"></div>
                        <img src={standUp} alt="" />
                    </div>
                    <div className="gallery-item workshops">
                        <div className="title-link">
                            <h2>Workshops</h2>
                            <button onClick={() => {this.props.chooseCategory('Workshops')}}>Show more</button>
                        </div>
                        <div className="overlay"></div>
                        <img src={workshops} alt="" />
                    </div>
                    <div className="gallery-item lectures">
                        <div className="title-link">
                            <h2>Lectures</h2>
                            <button onClick={() => {this.props.chooseCategory('Lectures')}}>Show more</button>
                        </div>
                        <div className="overlay"></div>
                        <img src={lectures} alt="" />
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filterBy: state.eventsStore.filterBy
    };
};

const mapDispatchToProps = {
    setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryGallery);