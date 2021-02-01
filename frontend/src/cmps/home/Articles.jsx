import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

export class Articles extends Component {
  render() {
    return (
      <section>
        <div className="articles-row" >

          <NavLink to="/activity?tags=sports" className="article_a" >
            <div>
              <h2>Sports</h2>
            </div>
          </NavLink>

          <NavLink to="/activity?tags=well-being" className="article_b" >
            <div>
              <h2>Well Being</h2>
            </div>
          </NavLink>

        </div>

        <div className="articles-row">

          <NavLink to="/activity?tags=nutrition" className="article_c">
            <div >
              <h2>Nutrition</h2>
            </div>
          </NavLink>

          <NavLink to="/activity?tags=outdoors" className="article_d">
            <div>
              <h2>Outdoors</h2>
            </div>
          </NavLink>

        </div>
      </section>
    )
  }
}

