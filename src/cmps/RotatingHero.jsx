import hero1 from '../assets/imgs/hero1.png'
import hero2 from '../assets/imgs/hero2.png'
import hero3 from '../assets/imgs/hero3.png'

import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

export default class extends React.Component {

    state = {
        currSlide: 0
    }

    componentDidMount() {
        this.timeInterval = setInterval(() => {
            this.changeSlide();
        }, 10000);
    };
    componentWillUnmount() {
        clearInterval(this.timeInterval);
    };

    changeSlide = () => {
        const { currSlide } = this.state;
        let nextSlide = (currSlide === 2) ? 0 : currSlide + 1;
        this.setState({currSlide : nextSlide})
    }

    render() {
        return (
            <CarouselProvider
                naturalSlideWidth={100}
                isIntrinsicHeight={true}
                isIntrinsicWidth={true}
                totalSlides={3}
                currentSlide={this.state.currSlide}
            >
                <Slider>
                    <Slide index={0}><img src={hero1} alt="" /></Slide>
                    <Slide index={1}><img src={hero2} alt="" /></Slide>
                    <Slide index={2}><img src={hero3} alt="" /></Slide>
                </Slider>
            </CarouselProvider>
        );
    }
}

