import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextField, Select, MenuItem } from '@material-ui/core';
import { activityService } from '../../services/activityService.js'
import { uploadImg } from '../../services/imgUploadService.js'
import { saveActivity } from '../../store/actions/activityActions.js'
import { utilService } from '../../services/utilService.js'

class _ActivityEdit extends Component {

    state = {
        activity: {},
        isEdit: true,
        isUploading: false,
        currUser: null,
        days: [{ 1: 'Sunday' }, { 2: 'Monday' }, { 3: 'Tuesday' }, { 4: 'Wednesday' }, { 5: 'Thursday' }, { 6: 'Friday' }, { 7: 'Saturday' }],
        hours: [{ 6: '6' }, { 6: '8' }, { 8: '8' }, { 9: '9' }, { 10: '10' }, { 11: '11' }, { 12: '12' }, { 13: '13' }, { 14: '14' }, { 15: '15' }, { 16: '16' }, { 17: '17' }, { 18: '18' }, { 19: '19' }, { 20: '20' }, { 21: '21' }, { 22: '22' }],
        locatoin: { lat: null, lng: null, address: '' }
    }

    componentDidMount() {
        this.loadActivity()
        const currUser = this.props.user;
        this.setState({ currUser })

    }

    loadActivity() {
        const activityId = this.props.match.params.activityId;
        if (activityId) {
            activityService.getById(activityId)
                .then(activity => {
                    this.setState({ activity })
                })
        } else {
            const activity = activityService.getEmpty();
            this.setState({ activity });
        }
    }

    onSaveActivity = async (ev) => {
        ev.preventDefault();
        let activity = this.state.activity
        utilService.getLocation(activity.location)
            .then(res => {
                activity = {
                    ...activity,
                    location: res
                }
                // })
                const { createdBy } = activity
                if (!createdBy) {
                    const { _id } = this.state.currUser
                    const { fullName } = this.state.currUser
                    const { imgUrl } = this.state.currUser
                    activity = {
                        ...activity,
                        createdBy: {
                            _id,
                            fullName,
                            imgUrl
                        }
                    }
                }
                this._saveActivity(activity)
            })
    }

    _saveActivity = async (activity) => {
        await this.props.saveActivity(activity);
        this.props.history.push('/user');
    }

    handleInput = ({ target }) => {
        const field = target.name
        let value = target.value
        if (target.type === 'number') value = +target.value
        this.setState(
            { activity: { ...this.state.activity, [field]: value } }
        )
    }

    uploadFile = async (ev) => {
        const currImgUrls = this.state.activity.imgUrls
        this.setState({ isUploading: true })
        const recivedImgUrls = await uploadImg(ev)
        this.setState({ isUploading: false })
        const imgUrls = [...currImgUrls, ...recivedImgUrls]
        this.setState({ activity: { ...this.state.activity, imgUrls: imgUrls } })
    }

    removeImg = (ev, idx) => {
        ev.preventDefault();
        ev.stopPropagation();
        let { imgUrls } = this.state.activity;
        imgUrls.splice(idx, 1);
        this.setState({ activity: { ...this.state.activity, imgUrls: imgUrls } })
    }


    render() {
        const { activity } = this.state;
        const { days } = this.state;
        const { hours } = this.state;
        if (!Object.keys(activity).length) return <div className="loader"><img src={'https://res.cloudinary.com/dcnijwmki/image/upload/v1611662818/general/loader_b7k81c.gif'} alt='loading'/></div>
        return (
            <section className="main-container">
                <h2>Edit Activity</h2>
                <form className="form-edit" onSubmit={this.onSaveActivity} >
                    <section className="edit-block flex">
                        <section className="edit-details">
                            <div className="edit-title flex column">
                                <label htmlFor="title">Title</label>
                                <TextField label="Required" margin="normal" type="text" value={activity.title} variant="outlined" size="small"
                                    multiline
                                    name="title"
                                    onChange={this.handleInput}
                                />
                            </div>

                            <div className="edit-subtitle flex column">
                                <label htmlFor="subtitle">Short Description</label>
                                <TextField margin="normal" type="text" value={activity.subtitle} variant="outlined" size="small"
                                    multiline
                                    name="subtitle"
                                    onChange={this.handleInput}
                                />
                            </div>

                            <div className="day-time-block flex">
                                <div className="edit-day flex">
                                    <label htmlFor="dayInWeek">Day:</label>
                                    <Select className="day-select" value={activity.dayInWeek} onChange={this.handleInput} name="dayInWeek" label="Required">
                                        {days.map((day, idx) => <MenuItem key={idx} value={parseInt(Object.keys(day))}>{Object.values(day)}</MenuItem>)}
                                    </Select>
                                </div>
                                <div className="edit-hour flex">
                                    <label htmlFor="hour">Hour:</label>
                                    <Select className="hour-select" value={activity.hour} onChange={this.handleInput} name="hour" label="Required">
                                        {hours.map((hour, idx) => <MenuItem key={idx} value={parseInt(Object.keys(hour))}>{Object.values(hour)}</MenuItem>)}
                                    </Select>
                                </div>
                            </div>

                            <section className="price-capacity-block flex">
                                <div className="edit-price flex column">
                                    <label htmlFor="price">Price</label>
                                    <TextField className="price-input" type="number" value={activity.price} variant="outlined" size="small"
                                        name="price"
                                        onChange={this.handleInput}
                                    />
                                </div>
                                <div className="edit-capacity flex column">
                                    <label htmlFor="price">Max Capacity</label>
                                    <TextField className="capacity-input" type="number" value={activity.maxCapacity} variant="outlined" size="small"
                                        name="maxCapacity"
                                        onChange={this.handleInput}
                                    />
                                </div>
                            </section>

                            <div className="edit-description flex column">
                                <label htmlFor="description" >Detailed Description</label>
                                <TextField
                                    name="description"
                                    value={activity.description}
                                    size="small"
                                    variant="outlined"
                                    multiline
                                    margin="normal"
                                    onChange={this.handleInput}
                                />
                            </div>
                        </section>
                        <section>
                            <TextField
                                name="location"
                                value={activity.location.address}
                                size="small"
                                variant="outlined"
                                multiline
                                margin="normal"
                                onChange={this.handleInput}
                            />
                        </section>

                        <section className="edit-imgs">
                            <label htmlFor="images" >Images</label>
                            <div className="img-gallery-edit flex wrap">
                                {
                                    activity.imgUrls.map((img, idx) => {
                                        return (
                                            <div className="img-container" key={idx}>
                                                <img className={`img-edit img-${idx}`} key={`img-${idx}`} src={img} alt="" />
                                                <button className='img-edit-del-btn' key={`btn-${idx}`} onClick={(ev) => this.removeImg(ev, idx)}>x</button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <input type="file" multiple onChange={this.uploadFile} />
                        </section>
                    </section>

                    <button className="save-btn" disabled={this.state.isUploading} >Save</button>

                </form>
            </section>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        activities: state.activityReducer.activities,
        user: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {
    saveActivity
}

export const ActivityEdit = connect(mapStateToProps, mapDispatchToProps)(_ActivityEdit)