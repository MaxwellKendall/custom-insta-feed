import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';

import { getUserInfo } from './api';

import 'pure-react-carousel/dist/react-carousel.es.css';
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pix: [],
      comments: [],
      nextUrl: null
    }

    this.parseResults = this.parseResults.bind(this)
    this.renderSlides = this.renderSlides.bind(this)
  }

  componentDidMount(){
    // axios.get(getUserInfo)
    axios.get('mock.json')
      .then(resp => {
        this.parseResults(resp.data) // 20 pictures
      })
      .catch(err => this.parseResults(err));
  }

  parseResults(results) {
    const { data, pagination } = results;
    // const nextUrl = results.pagination.next_url;

    // console.log('data', pictures[1])
    // console.log(nextUrl);
    data.map((pic) => {
      console.log('width', pic.images.low_resolution.width)
      console.log('height', pic.images.low_resolution.height)
    });
    this.setState({ pix: data, nextUrl: pagination.next_url })
  }

  renderSlides() {
    if (this.state.pix.length > 0){
      return this.state.pix.map((pic, index) => {
        return (
          <Slide
            index={index}
            innerTag="div"
            innerClassName="slide-parent"
            tag="li">
            <div className="slide">
              <img src={pic.images.low_resolution.url} alt=""/>
            </div>
          </Slide>
        );
      });
    }
  }

  render() {
    return (
      <div className="container">
        <CarouselProvider
          naturalSlideWidth={293}
          naturalSlideHeight={293}
          visibleSlides={4}
          // isPlaying
          totalSlides={this.state.pix.length}>
          <ButtonNext>
            <p>Next</p>
          </ButtonNext>
          <Slider>
            {this.renderSlides()}
          </Slider>
          <ButtonBack>
            <p>Back</p>
          </ButtonBack>
        </CarouselProvider>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("maxs-insta-feed")
);