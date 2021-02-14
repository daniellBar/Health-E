import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';
import routes from './routes.js'
import {Header} from './cmps/Header.jsx'
import {Footer} from './cmps/Footer.jsx';
import {ScrollToTop} from './cmps/ScrollToTop';
import {withRouter} from 'react-router';

class _App extends Component {
  render() {
    const isHomepage = this.props.location.pathname === "/";
    return (
      <div className="App">
        <Header isHomepage={isHomepage}/>
          <Switch>
            { routes.map(route => <Route key={ route.path } component={ route.component } path={ route.path } />) }
          </Switch>
        <Footer />
        <ScrollToTop />
      </div>
    )
  }
}

export default withRouter(_App);
