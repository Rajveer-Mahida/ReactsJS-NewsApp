import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from '../media/Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {

  static defaultprop = {
    pageSize : 4,
    country  : "in",
    category : "general",
  }

  
  static propTypes = {
    pageSize : PropTypes.number,
    country  : PropTypes.string,
    category : PropTypes.string,
  }



  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }


  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=5469e571a9c44c6c8037ce15909fff46&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({ articles: parsedData.articles, totalResults: this.state.totalResults });
  }


  handleNext = async () => {

    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=5469e571a9c44c6c8037ce15909fff46&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false
    })

    console.log("Next")

  }

  handlePrevious = async () => {
    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=5469e571a9c44c6c8037ce15909fff46&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
    console.log("Previos")

  }



  render() {
    return (

      <div className="container my-3">
        <h1 className="text-center">NewsFire - Top Headlines Of The Day</h1>
        {this.state.loading && <Spinner />}
        <div className="row d-flex justify-content-start" >
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-3 my-3" key={element.url}  >
              <NewsItem title={element.title ? element.title.slice(0, 75) : " "} description={element.description} imageurl={element.urlToImage ? element.urlToImage : "https://static.seekingalpha.com/cdn/s3/uploads/getty_images/1157789866/image_1157789866.jpg?io=getty-c-w1536"} newsurl={element.url ? element.url : " "} />
            </div>
          })}


        </div>
        <div className="container d-flex justify-content-between my-3">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevious}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > this.state.totalResults / this.props.pageSize} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
