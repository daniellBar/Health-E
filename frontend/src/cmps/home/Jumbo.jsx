import React from "react";
import { SearchBox } from '../SearchBox.jsx'

export function Jumbo() {
  return (
    <section>
      <div className="jumbo">
        <div className="v-space"></div>
        <div className="slogan">
          <div>Health is a behaviour.</div>
          <div>Find out how.</div>
        </div>
        <SearchBox cssClass={'jumbo-search'}/>
      </div>
    </section>
  )
}
