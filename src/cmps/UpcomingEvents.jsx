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
    }

    setGallery = () => {
        let galleryItems = [];
        eventService.query()
            .then(events => {
                events.forEach(event => galleryItems.push(event))
                this.setState({ galleryItems }, () => {
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
        
                        <EventPreview event={this.state.galleryItems[0]} />
                        <EventPreview event={this.state.galleryItems[1]} />
                        <EventPreview event={this.state.galleryItems[2]} />
                        <EventPreview event={this.state.galleryItems[3]} />
                        {/* <EventPreview event={this.state.galleryItems[4]} />
                        <EventPreview event={this.state.galleryItems[5]} />
                        <EventPreview event={this.state.galleryItems[6]} />
                        <EventPreview event={this.state.galleryItems[7]} />
                        <EventPreview event={this.state.galleryItems[8]} />
                        <EventPreview event={this.state.galleryItems[9]} />
                        <EventPreview event={this.state.galleryItems[10]} />
                        <EventPreview event={this.state.galleryItems[11]} />
                        <EventPreview event={this.state.galleryItems[12]} />
                        <EventPreview event={this.state.galleryItems[13]} />
                        <EventPreview event={this.state.galleryItems[14]} /> */}

                </InfiniteCarousel>}
            </main>
        )
    }
}
