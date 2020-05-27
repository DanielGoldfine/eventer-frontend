import hero1 from '../assets/imgs/hero1.png'
import hero2 from '../assets/imgs/hero2.png'
import hero3 from '../assets/imgs/hero3.png'
import hero4 from '../assets/imgs/hero4.png'
import hero5 from '../assets/imgs/hero5.png'
import hero6 from '../assets/imgs/hero6.png'

import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

export default class extends React.Component {


    render() {
        return (
            <main>
                <CarouselProvider
                    naturalSlideWidth={100}
                    isIntrinsicHeight={true}
                    isIntrinsicWidth={true}
                    interval={7000}
                    infinite={true}
                    isPlaying={true}
                    totalSlides={6}
                    currentSlide={0}
                >
                    <Slider>
                        <Slide index={0}><img src={hero1} alt="" /></Slide>
                        <Slide index={1}><img src={hero2} alt="" /></Slide>
                        <Slide index={2}><img src={hero3} alt="" /></Slide>
                        <Slide index={3}><img src={hero4} alt="" /></Slide>
                        <Slide index={4}><img src={hero5} alt="" /></Slide>
                        <Slide index={5}><img src={hero6} alt="" /></Slide>
                    </Slider>
                </CarouselProvider>
            </main>
        );
    }
}

