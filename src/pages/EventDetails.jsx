import React from 'react';
import { loadEvent, subscribeEvent, unsubscribeEvent, setFilter} from '../store/actions/eventActions.js'
import {login} from '../store/actions/userActions.js'
import { connect } from "react-redux";
import Moment from 'moment';
import EventTags from '../cmps/EventTags'
import { NavLink } from "react-router-dom";
import EventMembers from '../cmps/EventMembers';
import MapContainer from '../cmps/MapContainer';
import UserPreview from '../cmps/UserPreview'
import EventPosts from '../cmps/EventPosts'


class EventDetails extends React.Component {

  state = {
    loggedUser: '',
    event: ''
  }


  componentDidMount() {
    this.props.login()
    if (this.props.match) {  // "preview" mode doesn't use URL and params...
      const { id } = this.props.match.params;
      this.props.loadEvent(id);
    }


  }

  onUnsubscribeEvent = (userId) => {
    this.props.unsubscribeEvent(this.props.event, userId)
      .then((event) => {
        this.setState({ event })
      })
  }


  onSubscribeEvent = () => {
    this.props.subscribeEvent(this.props.event, this.props.minimalLoggedInUser)
      .then((event) => {
        this.setState({ event })
      })

  }

  onSetCategory = (category) => {
    let gFilter = this.props.filterBy;
    gFilter.category = category;
    this.props.setFilter(gFilter)
      .then(res => this.props.history.push(`/event/`));
  };

  render() {
    if (this.props.previewEvent) { // handle timestamp for preview mode
      const startAtString = `${this.props.previewEvent.startDate} ${this.props.previewEvent.startTime}`
      const startAt = Math.round(new Date(startAtString).getTime() / 1000)
      this.props.previewEvent.startAt = startAt
    }

    const { event } = this.props;
    if (!event && !this.props.previewEvent) return 'Loading...';

    const activeProps = this.props.previewEvent ? this.props.previewEvent : event

    const { _id, createdAt, updatedAt, title, category, imgUrl, description, startAt, location, tags } = activeProps

    const dateStr = Moment(startAt * 1000).toString()

    const createdDateStr = createdAt ? Moment(createdAt * 1000).toString() : Moment(undefined).toString()

    const updatedAtStr = updatedAt ? Moment(updatedAt * 1000).toString() : Moment(undefined).toString()
    return <div className="event-details flex">
      <section className="event-info flex column">
        <div className="navigator flex align-center">
          <NavLink to="/">Eventer</NavLink>
          <span> > </span>
          <button className="btn-link" onClick={() => { this.onSetCategory(category) }}>{category}</button>
        </div>
        <h2>{title}</h2>
        <UserPreview ranking={true} minimalUser={activeProps.createdBy} />
        <div className="flex column align-start">
          <small>Created at
        <span> {createdDateStr.split(' ')[1]} </span>
            <span>{createdDateStr.split(' ')[2]} , </span>
            {/* <span>{createdDateStr.split(' ')[3]} </span> */}
            <span>{createdDateStr.split(' ')[4].substring(0, 5)}</span>
          </small>
          <small>Last update at
        <span> {updatedAtStr.split(' ')[1]} </span>
            <span>{updatedAtStr.split(' ')[2]} , </span>
            {/* <span>{updatedAtStr.split(' ')[3]} </span> */}
            <span>{updatedAtStr.split(' ')[4].substring(0, 5)}</span>
          </small>
        </div>

        {imgUrl.includes('http') && <img src={imgUrl} alt=""></img>}
        {category && !imgUrl.includes('http') && <img src={require(`../assets/imgs/${category.replace(/\s+/g, '')}.jpg`)} alt=""></img>}
        <p className="event-time-place">
          <span className="event-month">{dateStr.split(' ')[1]} </span>
          <span className="event-day">{dateStr.split(' ')[2]} </span>
          <span className="event-time">{dateStr.split(' ')[4].substring(0, 5)}, </span>
          <span className="event-address">{location.address}</span>
        </p>
        <p>{description}</p>
        {tags && <EventTags tags={tags} />}
        {event && !this.props.previewEvent && <NavLink exact to={`/event/edit/${_id}`}>Edit </NavLink>}
      </section>
      <section>
        {event && !this.props.previewEvent && <EventMembers event={event} onSubscribeEvent={this.onSubscribeEvent} onUnsubscribeEvent={this.onUnsubscribeEvent} loggedInUserId={this.props.minimalLoggedInUser._id} />}
      </section>
      {event && !this.props.previewEvent && <EventPosts posts={this.props.event.posts} />}
      <MapContainer loc={location} name={location.address} />


    </div>;
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
  loadEvent, unsubscribeEvent, subscribeEvent, setFilter,login
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);