import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { loadActivities } from '../../store/actions/activityActions.js';
import { chartService } from '../../services/chartService.js';
import { activityService } from '../../services/activityService.js';

class _BarChart extends Component {

    state = {
        activities: null
    }

    componentDidMount() {
        this.props.loadActivities()
    }

    onGetCreatedEvents = (activities, currUser) => {
        let act = activityService.getCreatedEvents(activities, currUser)
        return act;
    }

    onGetTitles = (eventsCreatedByUser) => {
        return chartService.getTitles(eventsCreatedByUser)
    }

    onGetMembers = (eventsCreatedByUser) => {
        return chartService.getMembers(eventsCreatedByUser)
    }

    onFindMaxCapacity = (eventsCreatedByUser) => {
        return chartService.findMaxCapacity(eventsCreatedByUser)
    }

    render() {
        const { user } = this.props;
        const { activities } = this.props;
        if (!user) return <div>loading</div>
        let eventsCreatedByUser = this.onGetCreatedEvents(activities, user);
        let titles = this.onGetTitles(eventsCreatedByUser)
        let memebersNum = this.onGetMembers(eventsCreatedByUser)
        const maxCapacity = this.onFindMaxCapacity(eventsCreatedByUser);
        const data = {
            labels: titles,
            datasets: [
                {
                    label: 'Participants Per Event',
                    backgroundColor: '#62cb66',
                    borderColor: 'rgb(153,209,123)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgb(166, 166, 164)',
                    hoverBorderColor: 'rgb(177, 174, 145)',
                    data: memebersNum
                }
            ]
        };

        return (
            <div>
                <h3 className="tac">Number of Participants Per Event</h3>
                <Bar
                    data={data}
                    width={300}
                    height={300}
                    options={{
                        scales: {
                            xAxes: [{
                                stacked: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Events',
                                    fontSize: 16,
                                    fontColor: '#62cb66'
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    min: 0,
                                    max: maxCapacity
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Participants in number',
                                    fontSize: 16,
                                    fontColor: '#62cb66'
                                },
                                stacked: true
                            }],
                        },
                        tooltips: {
                            "enabled": false
                          },
                    }}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activities: state.activityReducer.activities
    }
}
const mapDispatchToProps = {
    loadActivities
}

export const BarChart = connect(mapStateToProps, mapDispatchToProps)(_BarChart)



