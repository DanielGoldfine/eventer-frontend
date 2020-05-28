import React, { Component } from 'react'
import ReactDOM from 'react-dom';

import eventService from '../services/eventService'
import EventPreview from "./EventPreview";

import InfiniteCarousel from 'react-leaf-carousel';

export default class UpcomingEvents extends Component {

    state = {
        galleryItems: []
    }

    componentDidMount() {
        this.setGallery()
        console.log('getFilter', this.props.getFilter);
        
    }

    setGallery = () => {
        let galleryItems = [];

        console.log('UpcomingEvents props' , this.props);
        
        const filter = this.props.getFilter()
        eventService.query(filter)
            .then(events => {
                events.forEach(event => { if (event.startAt >= Math.round(Date.now() / 1000)) galleryItems.push(event)})
                this.setState({ galleryItems }, () => {
                    // CallBack Option
                    console.log('galleryItems', this.state.galleryItems);
                    
                })
            })
    }

    render() {


        return (
            <main className="upcoming-container">
                {this.state.galleryItems.length > 0 && <InfiniteCarousel
                    breakpoints={[
                        {
                            breakpoint: 800,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            },
                        },
                        {
                            breakpoint: 1600,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                            },
                        },
                    ]}
                    swipe={true}
                    dots={true}
                    showSides={false}
                    // sidesOpacity={1}
                    sideSize={.1}
                    slidesToScroll={4}
                    slidesToShow={4}
                    scrollOnDevice={true}
                    responsive={true}
                    slidesSpacing={10}
                >
                    {this.state.galleryItems.map(event => <EventPreview key={event._id} event={event} />)}


                </InfiniteCarousel>}
            </main>
        )
    }
}
