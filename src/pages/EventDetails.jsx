import React from 'react';
import { loadEvent, subscribeEvent, unsubscribeEvent, setFilter, updateEvent, updateEventLocal } from '../store/actions/eventActions.js'
import { connect } from "react-redux";
import Moment from 'moment';
import EventTags from '../cmps/EventTags'
import { NavLink } from "react-router-dom";
import EventMembers from '../cmps/EventMembers';
import MapContainer from '../cmps/MapContainer';
import UserPreview from '../cmps/UserPreview'
import EventPosts from '../cmps/EventPosts'
import EventImagesGallery from '../cmps/EventImagesGallery'
import Button from '@material-ui/core/Button';

import socketService from '../services/socketService';



class EventDetails extends React.Component {

  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.descriptionInput = React.createRef();
  }

  state = {
    loggedUser: '',
    title: '',
    description: '',
    isActive: true,
    images: []
  }


  componentDidMount() {
    if (this.props.match) {  // "preview" mode doesn't use URL and params...
      const { id } = this.props.match.params;
      this.props.loadEvent(id)
        .then((event) => {
          if (event) {
            socketService.emit('viewEventDetails', event._id);
            socketService.on('memberJoin', this.socketAddMemebr);
            socketService.on('memberLeave', this.socketLeaveMember);
          }
        })
    }
  }

  componentDidUpdate(prevProps) { // To properly allow moving between event details thru the notifications
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const { id } = this.props.match.params;
      this.props.loadEvent(id)
        .then((event) => {
          if (event) {
            // console.log('details componentDidUpdate')
            socketService.emit('viewEventDetails', this.props.event._id);
            socketService.on('memberJoin', this.socketAddMemebr);
            socketService.on('memberLeave', this.socketLeaveMember);
          }
        })
    }
  }

  componentWillUnmount() {
    socketService.off('memberJoin', this.socketAddPost);
    socketService.off('memberLeave', this.socketRemovePost);
  }

  socketAddMemebr = event => {
    this.props.updateEventLocal(event)
  };

  socketLeaveMember = (event) => {
    this.props.updateEventLocal(event)
  };


  onUnsubscribeEvent = async (userId) => {
    const event = await this.props.unsubscribeEvent(this.props.event, userId)
    this.setState({ event })
    //Show live update of event members
    socketService.emit('memberLeave', event)
    //Send notification for all event members that someone had left
    const minimalEvent = {
      _id: this.props.event._id,
      title: this.props.event.title,
      imgUrl: this.props.event.imgUrl
    }
    const minimalUser = this.props.minimalLoggedInUser
    event.members.forEach(member => {
      const payload = {
        userId: member._id,
        minimalEvent,
        minimalUser,
        type: 'user_left_event'
      }
      socketService.emit('user left event', payload)
    })
    //Send notification also to the event creator
    const payload = {
      userId: this.props.event.createdBy._id,
      minimalEvent,
      minimalUser,
      type: 'user_left_event'
    }
    socketService.emit('user left event', payload)
  }

  onSubscribeEvent = async () => {
    const event = await this.props.subscribeEvent(this.props.event, this.props.minimalLoggedInUser)
    this.setState({ event })
    //Show live update of event members
    socketService.emit('memberJoin', event)
    //Send notification for all event members that someone new has joined
    const minimalEvent = {
      _id: this.props.event._id,
      title: this.props.event.title,
      imgUrl: this.props.event.imgUrl
    }
    const minimalUser = this.props.minimalLoggedInUser
    event.members.forEach(member => {
      const payload = {
        userId: member._id,
        minimalEvent,
        minimalUser,
        type: 'user_join_event'
      }
      socketService.emit('user left event', payload)
    })
    //Send notification also to the event creator
    const payload = {
      userId: this.props.event.createdBy._id,
      minimalEvent,
      minimalUser,
      type: 'user_join_event'
    }
    socketService.emit('user joined event', payload)
  }

  onSetCategory = (category) => {
    let filter = this.props.filterBy;
    filter.category = category;
    this.props.setFilter(filter)
      .then(res => this.props.history.push(`/event/`));
  };

  handleChange = (ev, field) => {
    this.setState({ [field]: ev.target.innerText })
  }

  onUpdateContent = (field, refInput) => {
    this.props.updateEvent(this.props.event, this.state[field], field)
    refInput.current.contentEditable = false
    //Update all members of the event
    const minimalEvent = {
      _id: this.props.event._id,
      title: this.props.event.title,
      imgUrl: this.props.event.imgUrl
    }
    const minimalUser = this.props.event.createdBy

    this.props.event.members.forEach(member => {
      const payload = {
        userId: member._id,
        minimalEvent,
        minimalUser,
        type: 'update_event_details'
      }
      socketService.emit('event got updated', payload)
    })
  }

  onPublishEvent = () => {
    this.props.updateEvent(this.props.event, true, 'isActive')
  }

  toggleEdit = (refInput) => {
    refInput.current.contentEditable = true
    refInput.current.focus()
  }


  render() {


    if (this.props.previewEvent) { // handle timestamp for preview mode
      const startAtString = `${this.props.previewEvent.startDate} ${this.props.previewEvent.startTime}`
      const startAt = Math.round(new Date(startAtString).getTime() / 1000)
      this.props.previewEvent.startAt = startAt
    }

    const { event } = this.props;
    // if (!event && !this.props.previewEvent) return <div>Loading...</div>

    const activeProps = this.props.previewEvent ? this.props.previewEvent : event
    const { _id, isActive, createdAt, updatedAt, title, category, imgUrl, description, startAt, location, tags, images } = activeProps

    const dateStr = Moment(startAt * 1000).toString()
    const createdDateStr = createdAt ? Moment(createdAt * 1000).toString() : Moment(undefined).toString()
    const updatedAtStr = updatedAt ? Moment(updatedAt * 1000).toString() : Moment(undefined).toString()
    if (!activeProps ) return <div>Loading...</div>
    return <div className="main-container">
      <div className="event-details flex">

        <section className="event-info flex column">

          {event && <div className="navigator flex align-center">
            <NavLink to="/">Eventer</NavLink>
            <span> > </span>
            <button className="btn-link" onClick={() => { this.onSetCategory(category) }}>{category}</button>
          </div>}
          {event && !isActive && <div className="flex align-center justify-center">
            <img className="icon-inactive" src={require('../assets/imgs/exclamation-mark.png')} title="Click to edit event title" alt=""></img>
            <h3 className="inactive-notification">Event isn't published yet</h3>
            <Button variant="contained" color="primary" onClick={() => this.onPublishEvent()}>Publish</Button>
          </div>
          }
          <div className="flex justify-center align-center">
            <h2 contentEditable={false}
              suppressContentEditableWarning
              ref={this.titleInput}
              onFocus={() => this.setState({ title })}
              onInput={(ev => this.handleChange(ev, 'title'))}
              onBlur={() => this.onUpdateContent('title', this.titleInput)}
            >{title}
            </h2>
            {!this.props.previewEvent && this.props.minimalLoggedInUser._id === event.createdBy._id && <img onClick={() => this.toggleEdit(this.titleInput)} className="icon-edit" src={require('../assets/imgs/pencil.png')} title="Click to edit event title" alt=""></img>}
          </div>
          <UserPreview ranking={true} minimalUser={activeProps.createdBy} />
          <div className="flex column align-start">
            <small>Created at
  <span> {createdDateStr.split(' ')[1]} </span>
              <span>{createdDateStr.split(' ')[2]} , </span>
              <span>{createdDateStr.split(' ')[4].substring(0, 5)}</span>
            </small>
            <small>Last update at
  <span> {updatedAtStr.split(' ')[1]} </span>
              <span>{updatedAtStr.split(' ')[2]} , </span>
              <span>{updatedAtStr.split(' ')[4].substring(0, 5)}</span>
            </small>
          </div>
          {images && <EventImagesGallery images={images}></EventImagesGallery>}
          {images.length === 0 && category && !imgUrl.includes('http') && <img src={require(`../assets/imgs/${category.replace(/\s+/g, '')}.jpg`)} alt=""></img>}
          <p className="event-time-place">
            <span className="event-month">{dateStr.split(' ')[1]} </span>
            <span className="event-day">{dateStr.split(' ')[2]} </span>
            <span className="event-time">{dateStr.split(' ')[4].substring(0, 5)}, </span>
            <span className="event-address">{location.address}</span>
          </p>
          <div className="flex justify-center align-center">
            <p contentEditable={false}
              suppressContentEditableWarning
              ref={this.descriptionInput}
              onFocus={() => this.setState({ description })}
              onInput={(ev => this.handleChange(ev, 'description'))}
              onBlur={() => this.onUpdateContent('description', this.descriptionInput)}
            >{description}
            </p>
            {!this.props.previewEvent && this.props.minimalLoggedInUser._id === event.createdBy._id && <img onClick={() => this.toggleEdit(this.descriptionInput)} className="icon-edit" src={require('../assets/imgs/pencil.png')} title="Click to edit event description" alt=""></img>}
          </div>
          {tags && <EventTags tags={tags} />}
          {event && !this.props.previewEvent && this.props.minimalLoggedInUser._id === event.createdBy._id && <NavLink className="user-preview-name-link" exact to={`/event/edit/${_id}`}>Advanced Edit </NavLink>}
        </section>
        <section>
          {event && <EventMembers event={event} onSubscribeEvent={this.onSubscribeEvent} onUnsubscribeEvent={this.onUnsubscribeEvent} loggedInUserId={this.props.minimalLoggedInUser._id} />}
          {this.props.previewEvent && <EventMembers previewMode={true} event={this.props.previewEvent} loggedInUserId={this.props.minimalLoggedInUser._id} />}
        </section>
        {event && !this.props.previewEvent && <EventPosts eventCreatorId={this.props.event.createdBy._id} isLoggedUserAdmin={this.props.minimalLoggedInUser.isAdmin} />}
        <MapContainer loc={location} name={location.address} />


      </div>

    </div>

  }
}

const mapStateToProps = (state) => {
  return {
    event: state.eventsStore.currEvent,
    minimalLoggedInUser: state.userStore.minimalLoggedInUser,
    filterBy: state.eventsStore.filterBy

  };
};


const mapDispatchToProps = {
  loadEvent, unsubscribeEvent, subscribeEvent, setFilter, updateEvent, updateEventLocal
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);