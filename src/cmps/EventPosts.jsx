import React, { Component } from 'react'
import { connect } from "react-redux";
import { addPost, removePost } from '../store/actions/eventActions.js'
import UserPreview from './UserPreview'
import Moment from 'moment';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';

class EventPosts extends Component {
    state = {
        post: ''
    }

    componentDidMount() {
        this.setState({ posts: this.props.posts })
    }

    handleInput = ({ target }) => {
        const value = (target.type === 'number') ? +target.value : target.value
        this.setState({ post: value })
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        // const post = { text: this.state.post, author: { fullName: this.props.loggedInUser.fullName } }
        this.props.addPost(this.props.event, this.props.minimalLoggedInUser, this.state.post)
        // SocketService.emit('chat newMsg', msg);
        this.setState({ post: '' });
    }

    onRemovePost = (postId) => {
        this.props.removePost(this.props.event, postId)
        this.setState({ post: '' });
    }

    render() {
        return <section className="event-posts">
            <form onSubmit={this.handleSubmit}>
                <div className="post-input flex justify-center align-center">
                    <TextField variant="outlined" label="What's on your mind?" type="text" placeholder="Your line goes here" name="post" value={this.state.post} onChange={this.handleInput} />
                    <SendIcon className="send-post-icon" style={{ fontSize: 35 }} onClick={this.handleSubmit} color="primary" />
                </div>
            </form>
            <div className="posts-container">
                <ul className="posts">
                    {this.props.event.posts.map((post, idx) => (
                        <div className="post flex space-between align-center relative" key={idx}>
                            <div>
                                {post.author && <UserPreview key={idx} minimalUser={post.author} starred={false} />}
                                <p className="post-text">{post.text}</p>
                                {/* <p className="post-time">{Moment.unix(post.createdAt / 1000).format("DD/MM,HH:mm")} </p>   */}
                                <p className="post-time">{Moment(post.createdAt).fromNow()} </p> 
                            </div>
                            {(this.props.isLoggedUserAdmin || this.props.eventCreatorId === post.author._id)  && <DeleteIcon style={{ fontSize: 25 }} color="action" className="delete-post-icon" onClick={() => this.onRemovePost(post._id)} />}
                        </div>
                    ))}
                </ul>
            </div>
        </section>
    }
}

const mapStateToProps = (state) => {
    return {
        minimalLoggedInUser: state.userStore.minimalLoggedInUser,
        event: state.eventsStore.currEvent
    };
};

const mapDispatchToProps = {
    addPost, removePost
}
export default connect(mapStateToProps, mapDispatchToProps)(EventPosts);