import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faAngleLeft, faAngleRight, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import { getUserInfo } from './api';

import 'pure-react-carousel/dist/react-carousel.es.css';
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pix: [],
      comments: [],
      nextUrl: null,
      width: null
    }

    this.parseResults = this.parseResults.bind(this);
    this.renderSlides = this.renderSlides.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount(){
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    // axios.get(getUserInfo)
    axios.get('mock.json')
      .then(resp => {
        this.parseResults(resp.data) // 20 pictures
      })
      .catch(err => this.parseResults(err));
  }

  parseResults(results) {
    const { data, pagination } = results;
    data.map(pic => console.log(pic.images))
    this.setState({ pix: data, nextUrl: pagination.next_url })
  }

  getPictureSrcSet(pic) {
    const { standard_resolution, low_resolution, thumbnail } = pic;
    const standard = `${standard_resolution.url} ${standard_resolution.width}w`;
    const low = `${low_resolution.url} ${low_resolution.width}w`;
    const thumbnail_res = `${thumbnail.url} ${thumbnail.width}w`;
    return `${thumbnail_res}, ${low}`;
  }

  renderSlides() {
    if (this.state.pix.length > 0){
      return this.state.pix.map((pic, index) => {
        return (
          <Slide
            index={index}
            innerTag="div"
            innerClassName="slide__container"
            tag="li">
            <div className="slide__main">
              <img
                className="slide__img"
                sizes="(max-width: 320px) 126px,
                       (max-width: 440px) 138px,
                       (max-width: 550px) 185px,
                       275px"
                srcset={this.getPictureSrcSet(pic.images)}
                alt=""/>
            </div>
          </Slide>
        );
      });
    }
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const numberOfSlides = this.state.width > 740 ? 4 : 3;
    return (
      <React.Fragment>
        {/* <div className="carousel__header"></div> */}
        <div className="carousel__container" ref={(ref) => this.window = ref}>
          <CarouselProvider
            className="carousel__main"
            naturalSlideWidth={293}
            naturalSlideHeight={293}
            visibleSlides={numberOfSlides}
            isPlaying
            touchEnabled
            totalSlides={this.state.pix.length}>
            <ButtonBack className="carousel__back carousel__button">
              <FontAwesomeIcon icon={faAngleLeft} />
            </ButtonBack>
            <Slider className="carousel__slider">
              {this.renderSlides()}
            </Slider>
            <ButtonNext className="carousel__next carousel__button">
              <FontAwesomeIcon icon={faAngleRight} />
            </ButtonNext>
          </CarouselProvider>
      </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("maxs-insta-feed")
);