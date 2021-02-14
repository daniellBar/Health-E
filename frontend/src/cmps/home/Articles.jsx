import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

class _Articles extends Component {

  redirectClick = (tag) => {
    this.props.history.push(`/activity?tags=${tag}`)
  }

  render() {
    const articles = ['sports', 'well-being', 'nutrition', 'outdoors']
    return (
      <section className="article-container">
        {articles.map(article => (
          <div className="article-flip-card" key={article}>
            <div className="article-flip-card-inner" onClick={() => { this.redirectClick(article) }}>
              <div className="article-flip-card-front"
                style={{ backgroundImage: `url(${require(`../../assets/img/${article}.jpg`)})` }}>
                <h2 className="title">{article}</h2>
              </div>
              <div className="article-flip-card-back">
                <p>See More</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    )
  }
}

export const Articles = withRouter(_Articles)

