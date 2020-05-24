import React, { Component } from 'react'
import { connect } from "react-redux";
import { addPost, removePost } from '../store/actions/eventActions.js'
import UserPreview from './UserPreview'
import Moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



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
                <div className="flex justify-center align-center">
                    {/* <input autoComplete="off" placeholder="Got anything to say?" name="post" value={this.state.post} onChange={this.handleInput} /> */}
                    <TextField label="Post Text" type="text"  placeholder="Got anything to say?" name="post" value={this.state.post} onChange={this.handleInput} />

                    <Button onClick={this.handleSubmit} variant="contained" color="primary">Send</Button>
                </div>
            </form>
            <div className="posts-container">
                <ul className="posts">
                    {this.props.event.posts.map((post, idx) => (
                        <div className="post flex space-between align-center" key={idx}>
                            <div>
                                {post.author && <UserPreview key={idx} minimalUser={post.author} starred={false} />}
                                <p className="post-time">{Moment.unix(post.createdAt / 1000).format("DD/MM,HH:mm")} {post.text}</p>
                            </div>
                            <button onClick={() => this.onRemovePost(post._id)}>X</button>
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