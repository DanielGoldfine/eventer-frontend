import React from 'react';
import { saveEvent } from '../store/actions/eventActions.js';
import { login } from '../store/actions/userActions.js'
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
// import Paper from '@material-ui/core/Paper';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


class EventEdit extends React.Component {

    constructor(props) {
        super(props);
        this.priceInput = React.createRef();
        this.capacityInput = React.createRef();
    }


    state = {
        validationMsg: '',
        category: 'Choose Category',
        title: '',
        description: '',
        imgUrl: '',
        startDate: '',
        startTime: '20:00',
        startAt: '',
        address: 'Tel Aviv',
        price: '',
        isActive: true,
        capacity: '',
        tags: [],
        _id: '',
        enablePrice: false,
        enableMaxCapacity: false,
        enablePreviewMode: false,
        images: []

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

    loadEvent = () => {
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
        const validForm = this.formValidation()
        if (!validForm) return

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

        delete event.validationMsg
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

    formValidation = () => {
        if (this.state.category === 'Choose Category') {
            this.setState({ validationMsg: 'You need to choose a category!' }, () => {
                setTimeout(() => this.setState({ validationMsg: '' }), 2000)
            })
            return false
        }
        if (this.state.address === '') {
            this.setState({ validationMsg: 'You need to choose an address!' }, () => {
                setTimeout(() => this.setState({ validationMsg: '' }), 2000)
            })
            return false
        }
        return true
    }

    onToggleSwitch = async () => {

        const validForm = this.formValidation()
        if (!validForm) return

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

    onToggleActive = async () => {
        this.setState((prevState) => {
            return {
                isActive: !prevState.isActive,
            }
        })
    }

    showWidget = (widget) => {
        widget.open()
    }

    checkUploadResult = (resultEvent) => {
        if (resultEvent.event === 'success') {
            const img = {
                src: resultEvent.info.url,
                thumbnail: resultEvent.info.url,
                thumbnailWidth: resultEvent.info.width,
                thumbnailHeight: resultEvent.info.height,
                caption: "Your image"
            }
            this.setState((prevState) => {
                return {
                    imgUrl: img.src,
                    images: [...prevState.images, img]
                }
            })
        }
    }

    render() {
        // console.log(this.state.images)
        let widget = window.cloudinary.createUploadWidget({
            cloudName: 'dsqh7qhpg',
            uploadPreset: 'lh8fyiqe'
        }, (error, result) => { this.checkUploadResult(result) })

        const { category, title, description, startDate, startTime, address, price, capacity, tags, _id, imgUrl, images } = this.state
        return (

            <section className="form-container">
                <Tabs>
                    <TabList>
                        <Tab>Title 1</Tab>
                        <Tab>Title 2</Tab>
                    </TabList>

                    <TabPanel>
                        <h2>Any content 1</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
                    </TabPanel>
                </Tabs>
                {/* <Paper square>
                    <Tabs
                        value={'or'}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={()=>{console.log('hello')}}                    >
                        <Tab label="Active" />
                        <Tab label="Active" />
                    </Tabs>
                </Paper> */}
                <FormGroup >
                    <FormControlLabel className="preview-switch"
                        control={<Switch onChange={this.onToggleSwitch} checked={this.state.enablePreviewMode} color="primary" />}
                        label="Preview Event"
                    />
                </FormGroup>
                {!this.state.enablePreviewMode && <form className="event-edit flex column align-center" onSubmit={this.handleSubmit}>
                    <FormGroup >
                        <FormControlLabel className="preview-switch"
                            control={<Switch onChange={this.onToggleActive} checked={this.state.isActive} color="primary" />}
                            label="Event active and visiable"
                        />
                    </FormGroup>
                    <FormControl required>
                        <InputLabel>Cateogry</InputLabel>
                        <Select name="category" value={category} onChange={this.handleChange} label="Category">
                            <MenuItem value="Choose Category">Choose Category</MenuItem>
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
                            label="Is there enternece fee?"
                        />
                        {this.state.enablePrice &&
                            <TextField label="How much?" type="number" name="price" value={price} onChange={this.handleChange} ref={this.priceInput} />}
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch onChange={this.toggleMaxCapacity} checked={this.state.enableMaxCapacity} color="primary" />}
                            label="Limit amount of participants?"
                        />
                        {this.state.enableMaxCapacity &&
                            <TextField label="How many?" type="number" name="capacity" value={capacity} onChange={this.handleChange} ref={this.capacityInput} />}
                    </FormGroup>

                    <label className="time-label">When?
                            <input className="date-input" type="date" name="startDate" onChange={this.handleChange} value={startDate} />
                        <input type="time" name="startTime" onChange={this.handleChange} value={startTime} />
                    </label>
                    <TextField label="Where?" type="text" name="address" value={address} onChange={this.handleChange} required />
                    <TextField label="Tags" placeholder="Comma seperated" type="text" name="tags" value={tags} onChange={this.handleChange} />
                    {/* <label>Upload Image
                            <input className="file-input" onChange={(ev) => this.OnUploadImg(ev)} type="file" />
                    </label> */}
                    {/* <input type="file" onChange={(ev) => this.OnUploadImg(ev)} id="file" multiple />
                    <label htmlFor="file" className="upload-btn">Upload Image</label> */}
                    <Button className="save-button" variant="contained" color="primary" onClick={() => this.showWidget(widget)}>Upload images</Button>
                    <input
                        type="hidden"
                        name="_id"
                        value={_id}
                    />
                    <Button onClick={this.handleSubmit} className="save-button" variant="contained" color="primary"> Save Event </Button>
                    <h2>{this.state.validationMsg}</h2>
                    {images.length === 0 && category !== 'Choose Category' && <div className="img-container">
                        {imgUrl.includes('http') && <img src={imgUrl} alt=""></img>}
                        {category && !imgUrl.includes('http') && <img src={require(`../assets/imgs/${category.replace(/\s+/g, '')}.jpg`)} alt=""></img>}
                    </div>}
                    {images && <div className="img-upload-container flex">
                        {images.map((img, index) => { return <img className="img-preview" key={index} src={img.src} alt=""></img> })}
                    </div>}
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
    saveEvent, login
}
export default connect(mapStateToProps, mapDispatchToProps)(EventEdit);