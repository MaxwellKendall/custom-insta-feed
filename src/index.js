import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { getUserInfo } from './api';
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pix: [],
      comments: [],
      nextUrl: null
    }
  }

  componentDidMount(){
    axios.get(getUserInfo)
      .then(resp => {
        console.log(resp)
        this.parseResults(resp.data) // 20 pictures
      })
      .catch(err => this.parseResults(err));
  }

  parseResults(results) {
    const pictures = results.data;
    const nextUrl = results.pagination.next_url;

    console.log(pictures[1])
    console.log(nextUrl);
  }

  render() {
    return (
      <React.Fragment>
        WUTUP CLAIRE
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("maxs-insta-feed"));