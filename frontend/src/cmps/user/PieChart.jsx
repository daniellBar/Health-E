import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import 'chart.piecelabel.js'
import { loadActivities } from '../../store/actions/activityActions.js';
import { chartService } from '../../services/chartService.js';
import { activityService } from '../../services/activityService.js';


class _PieChart extends Component {

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

    onGetIncomeFromEvent = (eventsCreatedByUser) => {
        return chartService.getIncomeFromEvent(eventsCreatedByUser)
    }

    onGetIncome = (incomeFromEvent) => {
        return chartService.getSum(incomeFromEvent)
    }

    onGetRandomColor = () => {
        return chartService.getRandomColor()
    }

    render() {
        const { user } = this.props;
        const { activities } = this.props;
        if (!user) return <div>loading</div>
        let eventsCreatedByUser = this.onGetCreatedEvents(activities, user);
        let titles = this.onGetTitles(eventsCreatedByUser)
        let incomeFromEvent = this.onGetIncomeFromEvent(eventsCreatedByUser)
        let income = this.onGetIncome(incomeFromEvent)
        if (income !== user.income) user.income = income;

        let bgc = [];
        let bgcHover = [];
        incomeFromEvent.map(() => {
            bgc.push(this.onGetRandomColor())
            bgcHover.push(this.onGetRandomColor())
            return null;
        })

        const data = {
            datasets: [{
                data: incomeFromEvent,
                backgroundColor: [...bgc],
                hoverBackgroundColor: [...bgcHover],
            }],
            labels: titles

        };
        return (
            <div className="flex column align-center">
                <h3 className="tac">Events Income (%)</h3>
                <Pie
                    data={data}
                    width={390}
                    height={390}
                    options={{
                        responsive: false,
                        maintainAspectRatio: false,
                        pieceLabel: {
                            render: 'precentage',
                            fontSize: 18,
                            fontStyle: 'bold',
                            fontColor: '#000',
                        },
                        legend: {
                            position: 'bottom',
                            margin:0,
                            fullWidth: true,
                            align: 'center',
                            labels: {
                                fontColor: "#024000",
                                defaultFontSize: 18
                                
                            },
                            layout: {
                                padding:{
                                    right: 0
                                }
                            }
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

export const PieChart = connect(mapStateToProps, mapDispatchToProps)(_PieChart)







