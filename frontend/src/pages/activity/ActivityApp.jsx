import React, { Component } from "react";
import { connect } from "react-redux";
import { loadActivities, removeActivity } from "../../store/actions/activityActions";
import { setFilter } from "../../store/actions/filterActions.js";
import { ActivityFilter } from "../../cmps/activity/ActivityFilter";
import { ActivityList } from "../../cmps/activity/ActivityList";
import { utilService } from '../../services/utilService.js'

class _ActivityApp extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.loadActivities(this.props.filterBy);
    }

    componentDidUpdate(prevProps) {
        const prevTagFilter = prevProps.filterBy.tags
        const currTagFilter = this.props.filterBy.tags
        let isPrevCurrTagsEqual = this.checkFilterByTagChange(prevTagFilter, currTagFilter)
        if (prevProps.filterBy.title !== this.props.filterBy.title || isPrevCurrTagsEqual) {
            this.props.loadActivities(this.props.filterBy)
        }
    }

    componentWillUnmount() {
        this.props.setFilter({})
    }

    checkFilterByTagChange = (prevTagFilter, currTagFilter) => {
        let isChanged = true
        if (typeof prevTagFilter === 'string' && typeof currTagFilter === 'string') {
            prevTagFilter === currTagFilter ? isChanged = false : isChanged = true
        }
        else if (Array.isArray(prevTagFilter) && Array.isArray(currTagFilter)) {
            isChanged = !utilService.checkArraysValuesAreEqual(prevTagFilter, currTagFilter)
        }
        else if (!prevTagFilter || !currTagFilter) {
            prevTagFilter === currTagFilter ? isChanged = false : isChanged = true
        }
        return isChanged
    }

    onRemove = (_id) => {
        this.props.removeActivity(_id);
    }

    calcAvgRate = (arr) => {
        let Sum = 0;
        arr.map((rateValue) => (Sum += rateValue));
        return Sum / arr.length
    }

    render() {
        const activities = this.props.activities
        if (!activities) return <div className="loader"><img src={'https://res.cloudinary.com/dcnijwmki/image/upload/v1611662818/general/loader_b7k81c.gif'} alt='loading' /></div>
        return (
            <div>
                <ActivityFilter />
                <div className="main-container-activities marg-top-50">
                    <ActivityList bottomBorder={true} activities={activities} onRemove={this.onRemove} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activities: state.activityReducer.activities,
        filterBy: state.filterReducer.filterBy
    }
}

const mapDispatchToProps = {
    loadActivities,
    setFilter,
    removeActivity
}

export const ActivityApp = connect(mapStateToProps, mapDispatchToProps)(_ActivityApp);
