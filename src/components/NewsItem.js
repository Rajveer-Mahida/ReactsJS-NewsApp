import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let {title,description,imageurl,newsurl,author,date} = this.props ;
        
        return (
            <div>
                <div className="card border-secondary" >
                    <img src={imageurl} className="card-img-top" alt="..." style={{"height" : "200px"}} />
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-muted">{new Date(date).toGMTString()} </small> <span className="badge rounded-pill text-bg-success">From {author}</span></p>
                            
                            <a rel="noopener noreferrer"  href={newsurl} target="_blank" className="btn btn-sn btn-dark">Read Full Story</a>
                        </div>
                </div>
              
            </div>
        )
    }
}