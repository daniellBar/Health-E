import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { utilService } from '../../services/utilService.js'
import { setFilter } from '../../store/actions/filterActions.js'

export class _ActivityFilter extends Component {

    state = {
        activeTagsFilter: []
    }

    componentDidMount() {
        this.getTagParamsAndUpdateState()
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            this.getTagParamsAndUpdateState()
        }
    }

    getTagParamsAndUpdateState = () => {
        const searchParams = new URLSearchParams(this.props.location.search)
        const tagParams = searchParams.getAll('tags')
        this.setState({ activeTagsFilter: tagParams })
    }

    onClickTag = (tag) => {
        const searchParams = new URLSearchParams(this.props.location.search)
        const tagParams = searchParams.getAll('tags')
        const index = tagParams.findIndex((value) => value === tag)
        if (index !== -1) {
            tagParams.splice(index, 1)
            searchParams.delete('tags')
            tagParams.forEach(tag => {
                searchParams.append('tags', tag)
            })
        }
        else {
            searchParams.append('tags', tag)
        }

        this.props.history.push(`/activity?${searchParams.toString()}`)
        const filterBy = utilService.buildFilterBy(searchParams, this.props.filterBy)
        this.setState({ activeTagsFilter: searchParams.getAll('tags') }, () => {
            this.props.setFilter(filterBy)
        })
    }

    onClearFilter = () => {
        this.props.setFilter({})
        this.props.history.push(`/activity`)
    }

    render() {
        const { activeTagsFilter } = this.state
        return (
            < div className="filter-bar" >
                <button className={`tag-btn ${activeTagsFilter.includes('well-being') ? 'active' : ''}`} onClick={() => this.onClickTag('well-being')}>Well Being</button>
                <button className={`tag-btn ${activeTagsFilter.includes('sports') ? 'active' : ''}`} onClick={() => this.onClickTag('sports')}>Sports</button>
                <button className={`tag-btn ${activeTagsFilter.includes('nutrition') ? 'active' : ''}`} onClick={(e) => this.onClickTag('nutrition')}>Nutrition</button>
                <button className={`tag-btn ${activeTagsFilter.includes('yoga') ? 'active' : ''}`} onClick={() => this.onClickTag('yoga')}>Yoga</button>
                <button className={`tag-btn ${activeTagsFilter.includes('outdoors') ? 'active' : ''}`} onClick={(e) => this.onClickTag('outdoors')}>Outdoors</button>
                <button className={`tag-btn ${activeTagsFilter.includes('cardio') ? 'active' : ''}`} onClick={(e) => this.onClickTag('cardio')}>Cardio</button>
                <button className={`tag-btn ${activeTagsFilter.includes('water') ? 'active' : ''}`} onClick={() => this.onClickTag('water')}>Water</button>
                <button className={`tag-btn ${activeTagsFilter.includes('advanced') ? 'active' : ''}`} onClick={() => this.onClickTag('advanced')}>Advanced</button>
                <button className={`tag-btn ${activeTagsFilter.includes('beginners') ? 'active' : ''}`} onClick={(e) => this.onClickTag('beginners')}>Beginners</button>
                <button className={`tag-btn ${activeTagsFilter.includes('mindfulness') ? 'active' : ''}`} onClick={(e) => this.onClickTag('mindfulness')}>Mindfulness</button>
                <button className={`tag-btn ${activeTagsFilter.includes('tel-Aviv') ? 'active' : ''}`} onClick={(e) => this.onClickTag('tel-Aviv')}>Tel Aviv</button>
                <button className="clear-btn" onClick={() => this.onClearFilter()}>Clear</button>
            </div >
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

export const ActivityFilter = connect(mapStateToProps, mapDispatchToProps)(withRouter(_ActivityFilter))