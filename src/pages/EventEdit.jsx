import React from 'react';
import { saveEvent} from '../store/actions/eventActions.js';
import {login} from '../store/actions/userActions.js'
import { connect } from "react-redux";
import eventService from '../services/eventService.js';
import googleService from '../services/googleService.js';
import cloudinaryService from '../services/clouldinaryService';
import EventDetails from '../pages/EventDetails';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

// import {
//     MuiPickersUtilsProvider,
//     KeyboardTimePicker,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';
// import 'date-fns';
// import DateFnsUtils from '@date-io/date-fns';



class EventEdit extends React.Component {

    constructor(props) {
        super(props);
        this.priceInput = React.createRef();
        this.capacityInput = React.createRef();
    }


    state = {
        category: 'Stand-up Comedy',
        title: '',
        description: '',
        imgUrl: '',
        startDate: '',
        startTime: '20:00',
        startAt: '',
        address: 'Tel Aviv',
        price: '',
        capacity: '',
        tags: [],
        _id: '',
        enablePrice: false,
        enableMaxCapacity: false,
        enablePreviewMode: false
    }

    componentDidMount() {
        this.props.login()
        var todayDate = new Date(); //Getting current date (default date) in the right format
        const todayDateString = todayDate.getFullYear() + '-' +
            ('0' + (todayDate.getMonth() + 1)).slice(-2) + '-' +
            ('0' + todayDate.getDate()).slice(-2)
        this.setState({
            startDate: todayDateString,
        })
        this.loadEvent();
    }

    loadEvent() {
        const { id } = this.props.match.params;
        if (!id) return; // As it is s a new event, nothing to load... 
        eventService.get(id)
            .then(event => {  // Price check-box status
                let enablePrice = false
                if (event.price) {
                    enablePrice = true
                }

                let enableMaxCapacity = false  // Max-capacity check-box status
                if (event.capacity) {
                    enableMaxCapacity = true
                }
                this.setState({
                    ...event,
                    address: event.location.address,
                    enablePrice,
                    enableMaxCapacity
                });
            })
    }

    handleChange = (ev) => {
        let { name, value } = ev.target;
        value = ev.target.type === 'number' ? parseInt(value) : value;
        this.setState(prevState => (
            { ...prevState.filter, [name]: value }
        ))
    }


    handleSubmit = async (ev) => {

        ev.preventDefault();
        let event = this.state

        const startAtString = `${event.startDate} ${event.startTime}`
        const startAt = Math.round(new Date(startAtString).getTime() / 1000)
        event.startAt = startAt

        //handle tags
        let tagsArr
        if (event.tags && (typeof event.tags === 'string')) {
            tagsArr = event.tags.split(',')
            event.tags = tagsArr
        }
        else {
            tagsArr = []
        }

        event.imgUrl = this.state.imgUrl ? this.state.imgUrl : `../assets/imgs/${event.category.replace(/\s+/g, '')}.jpg`

        if (!event._id) { //additions to new event
            event.createdAt = Math.round(Date.now() / 1000)
            event.members = []
            event.posts = []
        }
        else {
            event.updatedAt = Math.round(Date.now() / 1000)
        }

        if (!this.state.createdBy) event.createdBy = this.props.minimalLoggedInUser

        event.isActive = true

        //handle getting lat/lng
        const latlng = await googleService.getLatLng(event.address)
        try {
            event.location = {}
            event.location.lat = latlng.lat ? latlng.lat : ''
            event.location.lng = latlng.lng ? latlng.lng : ''
            event.location.address = event.address
        }
        catch (err) {
            console.log('Error in google geocode request: ', err)
        }

        delete event.address
        delete event.enablePrice
        delete event.enableMaxCapacity
        delete event.enablePreviewMode

        this.props.saveEvent(event)
            .then((event) => {
                this.props.history.push(`/event/${event._id}`)
            })
    }

    OnUploadImg = (ev) => {
        cloudinaryService.uploadImg(ev.target.files[0])
            .then(res => {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        imgUrl: res.data.url
                    }
                })
            })
    }

    togglePrice = () => {
        if (this.state.enablePrice) this.priceInput.current.value = ''
        this.setState((prevState) => {
            return {
                enablePrice: !prevState.enablePrice,
                price: ''
            }
        })
    }


    toggleMaxCapacity = () => {
        if (this.state.enableMaxCapacity) this.capacityInput.current.value = ''
        this.setState((prevState) => {
            return {
                enableMaxCapacity: !prevState.enableMaxCapacity,
                capacity: ''
            }
        })
    }


    // togglePreviewMode = async () => {
    onToggleSwitch = async () => {
        if (!this.state.createdBy) this.setState({ createdBy: this.props.minimalLoggedInUser })
        const latlng = await googleService.getLatLng(this.state.address)
        try {
            const location = {}
            location.lat = latlng.lat ? latlng.lat : ''
            location.lng = latlng.lng ? latlng.lng : ''
            location.address = this.state.address
            this.setState((prevState) => {
                return {
                    ...prevState,
                    enablePreviewMode: !prevState.enablePreviewMode,
                    location
                }
            })
        }
        catch (err) {
            console.log('Error in google geocode request: ', err)
        }


    }

    render() {
        const { category, title, description, startDate, startTime, address, price, capacity, tags, _id, imgUrl } = this.state
        return (
            <section className="form-container">
                <FormGroup >
                    <FormControlLabel className="preview-switch"
                        control={<Switch onChange={this.onToggleSwitch} checked={this.state.enablePreviewMode} color="primary" />}
                        label="Preview Event"
                    />
                </FormGroup>
                {!this.state.enablePreviewMode && <form className="event-edit flex column align-center" onSubmit={this.handleSubmit}>
                    <FormControl>
                        <InputLabel>Cateogry</InputLabel>
                        <Select name="category" value={category} onChange={this.handleChange} label="Cateogry">
                            <MenuItem value="Stand-up Comedy">Stand-up Comedy</MenuItem>
                            <MenuItem value="Sports">Sports</MenuItem>
                            <MenuItem value="Live Music">Live Music</MenuItem>
                            <MenuItem value="Parties">Parties</MenuItem>
                            <MenuItem value="Lectures">Lectures</MenuItem>
                            <MenuItem value="Workshops">Workshops</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField label="Title" type="text" name="title" value={title} onChange={this.handleChange} />
                    <TextField className="textarea-input" label="Description" multiline rows={4} name="description" variant="outlined" onChange={this.handleChange} value={description} />
                    <FormGroup>
                        <FormControlLabel className="price-switch"
                            control={<Switch onChange={this.togglePrice} checked={this.state.enablePrice} color="primary" />}
                            label="Price"
                        />
                        {this.state.enablePrice &&
                            <TextField label="Price" type="number" name="price" value={price} onChange={this.handleChange} ref={this.priceInput} />}
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch onChange={this.toggleMaxCapacity} checked={this.state.enableMaxCapacity} color="primary" />}
                            label="Capacity"
                        />
                        {this.state.enableMaxCapacity &&
                            <TextField label="Capacity" type="number" name="capacity" value={capacity} onChange={this.handleChange} ref={this.capacityInput} />}
                    </FormGroup>

                    <label className="time-label">When?
                            <input className="date-input" type="date" name="startDate" onChange={this.handleChange} value={startDate} />
                        <input type="time" name="startTime" onChange={this.handleChange} value={startTime} />
                    </label>
                    {/* <label>Start Time */}

                    {/* </label> */}
                    {/* <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Time picker"
                            value={startTime}
                            onChange={this.handleChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </MuiPickersUtilsProvider> */}
                    <TextField label="Where?" type="text" name="address" value={address} onChange={this.handleChange} required />
                    <TextField label="Tags" placeholder="Comma seperated" type="text" name="tags" value={tags} onChange={this.handleChange} />
                    {/* <label>Upload Image
                            <input className="file-input" onChange={(ev) => this.OnUploadImg(ev)} type="file" />
                    </label> */}
                    <input type="file" onChange={(ev) => this.OnUploadImg(ev)} id="file" />
                    <label htmlFor="file" className="upload-btn">Upload Image</label>
                    <input
                        type="hidden"
                        name="_id"
                        value={_id}
                    />
                    <Button onClick={this.handleSubmit} className="save-button" variant="contained" color="primary"> Save Event </Button>
                    <div className="img-container">
                        {imgUrl.includes('http') && <img src={imgUrl} alt=""></img>}
                        {category && !imgUrl.includes('http') && <img src={require(`../assets/imgs/${category.replace(/\s+/g, '')}.jpg`)} alt=""></img>}
                    </div>
                </form >}
                {this.state.category && this.state.enablePreviewMode && <EventDetails previewEvent={this.state} />}
            </section>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        minimalLoggedInUser: state.userStore.minimalLoggedInUser
    };
};

const mapDispatchToProps = {
    saveEvent,login
}
export default connect(mapStateToProps, mapDispatchToProps)(EventEdit);