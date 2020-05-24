import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

import eventService from '../services/eventService'
import EventPreview from "./EventPreview";

import { connect } from 'react-redux'
import { loadEvents, setFilter } from '../store/actions/eventActions'

class UpcomingEvents extends React.Component {
    state = {
        currentIndex: 0,
        itemsInSlide: 1,
        responsive: {
            0: { items: 1 },
            640: { items: 3 },
            1100: { items: 5 }
        },
        galleryItems: this.galleryItems()
    }

    componentDidMount() {
        this.setGallery()
    }

    setGallery = () => {

        eventService.query()
            .then(events => {
                const galleryItems = events.map(event => <EventPreview key={event._id} event={event} />)
                this.setState({ galleryItems })
            })
    }

    galleryItems() {
        return Array(15)
            .fill()
            .map((item, i) => <h2 className="item">{i + 1}</h2>)
    }

    slidePrevPage = () => {
        const currentIndex = this.state.currentIndex - this.state.itemsInSlide
        this.setState({ currentIndex })
    }

    slideNextPage = () => {
        const {
            itemsInSlide,
            galleryItems: { length },
        } = this.state
        let currentIndex = this.state.currentIndex + itemsInSlide
        if (currentIndex > length) currentIndex = length

        this.setState({ currentIndex })
    }

    handleOnSlideChange = (event) => {
        const { itemsInSlide, item } = event
        this.setState({ itemsInSlide, currentIndex: item })
    }

    render() {
        const { currentIndex, galleryItems, responsive } = this.state

        return (
            <React.Fragment>
                <div className="upcoming-title-wrapper flex align-items-center margin0auto">
                    <h2>Upcoming Events</h2>
                </div>
                <div className="upcoming-events-container flex justify-center align-items-center margin0auto">
                    <button className="upcoming-scroll-btn prev" onClick={this.slidePrevPage}>&#xab;</button>
                    <AliceCarousel
                        items={galleryItems}
                        slideToIndex={currentIndex}
                        responsive={responsive}
                        onInitialized={this.handleOnSlideChange}
                        onSlideChanged={this.handleOnSlideChange}
                        onResized={this.handleOnSlideChange}
                    />
                    <button className="upcoming-scroll-btn next" onClick={this.slideNextPage}>&#xbb;</button>
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingEvents);

