import React from "react"
import { Jumbo } from '../cmps/home/Jumbo.jsx'
import { Suggested } from '../cmps/home/Suggested.jsx'
import { Articles } from '../cmps/home/Articles.jsx'

export function HomeApp(props){
    return (
      <section className="home-app">
        <Jumbo />
        <div className="main-container-home">
          <Suggested />
          <Articles />
        </div>
      </section>
    )
  }

