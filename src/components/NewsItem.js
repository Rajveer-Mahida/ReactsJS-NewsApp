import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let {title,description,imageurl,newsurl} = this.props ;
        
        return (
            <div>
                <div className="card">
                    <img src={imageurl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5>
                            <p className="card-text">{description}...</p>
                            <a rel="noreferrer"  href={newsurl} target="_blank" className="btn btn-sn btn-dark">Read Full Story</a>
                        </div>
                </div>
              
            </div>
        )
    }
}
