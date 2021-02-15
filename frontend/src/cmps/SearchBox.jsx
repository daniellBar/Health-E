import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { utilService } from '../services/utilService.js'
import { setFilter } from '../store/actions/filterActions.js'

class _SearchBox extends Component {
    state = {
        title: ''
    }

    componentDidMount() {
        this.getTitleParamAndUpdateState()
    }

    componentDidUpdate(prevProps){
        if (this.props.location.search !== prevProps.location.search) {
            if(this.props.location.search===''){
                this.setState({title:''})
            }
        }
    }

    getTitleParamAndUpdateState = () => {
        const searchParams = new URLSearchParams(this.props.location.search)
        const filterBy = utilService.buildFilterBy(searchParams)
        this.setState(filterBy, () => {
            this.props.setFilter(filterBy)
        })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState({ [field]: value }, () => {
            if (this.props.location.pathname === "/") return
            this.setSearchParamsAndFilter()
        })
    }

    onClickSearchButton = () => {
        this.setSearchParamsAndFilter()
    }

    setSearchParamsAndFilter = () => {
        const searchParams = new URLSearchParams(this.props.location.search)
        searchParams.set('title', this.state.title)
        this.props.history.push(`/activity?${searchParams.toString()}`)
        const filterBy = utilService.buildFilterBy(searchParams, this.props.filterBy)
        this.props.setFilter(filterBy)
    }

    render() {
        const cssClass = this.props.cssClass
        return (
            <div className={cssClass}>
                <input
                    className="search-input"
                    autoComplete="off"
                    name="title"
                    type="text"
                    value={this.state.title || ""}
                    onChange={this.handleChange}
                    placeholder={`Find activity that you like (food${'&'}nutrition, lectures, sports groups atc.)`}
                    onKeyDown={e => (e.key === 'Enter') && this.onClickSearchButton()}
                />
                <div className="search-btn" onClick={this.onClickSearchButton}>
                    <i className="fas fa-search"></i>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        filterBy: state.filterReducer.filterBy
    }
}

const mapDispatchToProps = {
    setFilter
}

export const SearchBox = connect(mapStateToProps, mapDispatchToProps)(withRouter(_SearchBox))