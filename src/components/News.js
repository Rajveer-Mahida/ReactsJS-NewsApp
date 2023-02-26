import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {

    constructor(){
        super();
        this.state = {
           articles : [ ],
           loading : false,
           page : 1
        }
        

    }

    

    async componentDidMount(){
      let url = "https://newsapi.org/v2/everything?language=en&q=adani&from=2023-01-26&sortBy=publishedAt&apiKey=5469e571a9c44c6c8037ce15909fff46&pageSize=28";
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({articles: parsedData.articles , totalResults: this.state.totalResults});
    }


    handleNext = async() =>{
      if(this.state.page +1 > this.state.totalResults/28){

      }else{

        let url = `https://newsapi.org/v2/everything?language=en&q=adani&from=2023-01-26&sortBy=publishedAt&apiKey=5469e571a9c44c6c8037ce15909fff46&page=${this.state.page+1}&pageSize=28`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
          page : this.state.page + 1,
          articles: parsedData.articles 
          
        })
      }
      console.log("Next")

    }

    handlePrevious= async() =>{
      let url = `https://newsapi.org/v2/everything?language=en&q=adani&from=2023-01-26&sortBy=publishedAt&apiKey=5469e571a9c44c6c8037ce15909fff46&page=${this.state.page - 1}&pageSize=28`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page : this.state.page - 1,
        articles: parsedData.articles 

      })
      console.log("Previos")
       
      }

    

    render() {
        return (
             


          
          <div className="container my-4">
                <div className="row">
                
                <h2> NewsFire - Top Headlines Of The Day</h2>
                   {this.state.articles.map((element)=>{
                      return  <div className="col-md-3 my-2"  key={element.url} >
                       <NewsItem title={element.title?element.title.slice(0,50):" "} description={element.description} imageurl={element.urlToImage?element.urlToImage:"https://static.seekingalpha.com/cdn/s3/uploads/getty_images/1157789866/image_1157789866.jpg?io=getty-c-w1536"} newsurl={element.url?element.url:" "} />
                   </div>
                    })}
                    
                    <div className="container d-flex justify-content-between my-3">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevious}>&larr; Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
                </div>  
                  
                </div>
            </div>
        )
    }
}
