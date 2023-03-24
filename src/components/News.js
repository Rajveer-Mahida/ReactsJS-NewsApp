import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from '../media/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import PropTypes from 'prop-types'


export default class News extends Component {

  static defaultprop = {
    pageSize: 4,
    country: "in",
    category: "general",
  }


  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  }



  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }


  }


  async updateNews() {
   
    this.props.setProgress(10);
  
    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=5469e571a9c44c6c8037ce15909fff46&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    console.log(parsedData);
    this.props.setProgress(50);
    this.setState({ articles: parsedData.articles, totalResults: this.state.totalResults, loading: false });
    this.props.setProgress(100);

  }

  async componentDidMount() {
    this.updateNews();
  }



  fetchMoreData = async () => {
    // this.setState({ page: this.state.page + 1});
    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=5469e571a9c44c6c8037ce15909fff46&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: this.state.totalResults});
  };

  render() {
    return (

      <>
        <h1 className="text-center">NewsFire - Top Headlines Of The Day</h1>
        {/* {this.state.loading && <Spinner />} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.totalResults !== this.state.totalResults}
          loader={<h4>{<Spinner />}</h4>}
        >
          <div className="container">

            <div className="row d-flex justify-content-start" >
              {this.state.articles.map((element) => {
                return <div className="col-md-3 my-3" key={element.url}  >
                  <NewsItem title={element.title ? element.title.slice(0, 75) : " "} description={element.description ? element.description.slice(0, 100) : ""} imageurl={element.urlToImage ? element.urlToImage : "https://resize.indiatvnews.com/en/resize/newbucket/730_-/2020/11/breaking-1603159815-1606179737.jpg"} newsurl={element.url ? element.url : " "} author={element.author ? element.author.slice(0, 20) : "Unknown"} date={element.publishedAt} source={element.source.name} />
                </div>
              })}


            </div>
          </div>
        </InfiniteScroll>

      </>
    )
  }
}
