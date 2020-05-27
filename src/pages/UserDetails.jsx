import React, { Component } from 'react'
import { connect } from 'react-redux'

import { UserDesc } from '../cmps/UserDesc'
import { ReviewForm } from '../cmps/ReviewForm'
import { ReviewList } from '../cmps/ReviewList'
import { MinimalEventList } from '../cmps/MinimalEventList'
import { FollowUserList } from '../cmps/FollowUserList'

import { addReview, loadUser } from '../store/actions/userActions'




class UserDetails extends Component {

    state = {
        isLoggedInUser: false,
        user: null,
    }

    componentDidMount() {
        this.setUser();
    }

    componentDidUpdate() {
        const { user } = this.state;
        if (user) {
            const { id } = this.props.match.params;
            if (id !== this.state.user._id) {
                this.setUser();
            };
        };
    };

    setUser = () => {
        const { id } = this.props.match.params;
        const { loggedInUser } = this.props;
        if (loggedInUser) {
            if (id === loggedInUser._id) {
                this.setState({ isLoggedInUser: true });
                this.setState({ user: loggedInUser });
                return
            }
        }

        this.props.loadUser(id)
            .then(user => {
                this.setState({ isLoggedInUser: false });
                this.setState({ user })
            });

    }

    submitReview = (newReview) => {
        this.props.addReview(newReview, this.state.user)
            .then(user => {
                this.setState({ user })
            })
    }

    minimalEventList = () => {

    }
    followUserList = () => {

    }

    render() {

        const { isLoggedInUser, user, } = this.state;
        return (
            <React.Fragment>
                <img className="bg-img" src={require('../assets/imgs/page-header.png')} />
                
                {user && <section className="user-details-container flex column justify-center align-items-center">


                    <div className="left-side">

                        <UserDesc isLoggedInUser={isLoggedInUser} user={user} >
                {/* ==================Children to avoid props drilling================== */}
                            <button className="cta-btn-full follow-btn">Follow</button>
                        </UserDesc>

                        {!isLoggedInUser && this.props.minimalLoggedInUser &&
                            <ReviewForm
                                submitReview={this.submitReview}
                                minimalUser={this.props.minimalLoggedInUser} />}

                        <ReviewList reviews={user.reviews} />

                    </div>

                    <div className="right-side fixed">
                        <MinimalEventList minimalEventList={this.minimalEventList} />
                        <MinimalEventList minimalEventList={this.minimalEventList} />
                        <FollowUserList followUserList={this.followUserList} />
                    </div>
                </section>}


            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        loggedInUser: state.userStore.loggedInUser,
        minimalLoggedInUser: state.userStore.minimalLoggedInUser
    };
};

const mapDispatchToProps = {
    addReview,
    loadUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);













// import React, { Component } from 'react'

// import { UserDesc } from '../cmps/UserDesc'
// import { ReviewForm } from '../cmps/ReviewForm'
// import { ReviewList } from '../cmps/ReviewList'
// import { MinimalEventList } from '../cmps/MinimalEventList'
// import { addReview, loadUser } from '../store/actions/userActions'


// import { connect } from 'react-redux'

// import { loadEvents } from '../store/actions/eventActions'


// class UserDetails extends Component {

//     state = {
//         isLoggedInUser: false,
//         user: null,
//     }

//     componentDidMount() {
//         this.setUser();

//         this.props.loadEvents({txt: ''});
//         let x = this.props.events;

//         console.log(x);

//         console.log(this.props.events);


//     }

//     componentDidUpdate() {
//         const { user } = this.state;
//         if (user) {
//             const { id } = this.props.match.params;
//             if (id !== this.state.user._id) {
//                 this.setUser();
//             };
//         };
//     };

//     setUser = () => {
//         const { id } = this.props.match.params;
//         const { loggedInUser } = this.props;
//         if (loggedInUser) {
//             if (id === loggedInUser._id) {
//                 this.setState({ isLoggedInUser: true });
//                 this.setState({ user: loggedInUser });
//                 return
//             }
//         }

//         this.props.loadUser(id)
//             .then(user => {
//                 this.setState({ isLoggedInUser: false });
//                 this.setState({ user })
//             });

//     }

//     submitReview = (newReview) => {
//         this.props.addReview(newReview, this.state.user)
//             .then(user => {
//                 this.setState({ user })
//             })
//     }


//     render() {
//         const { isLoggedInUser, user, } = this.state;
//         return (
//             <React.Fragment>

//                 {user && <section className="user-details-container ">

//                     <section className="left-side" >

//                         <UserDesc isLoggedInUser={isLoggedInUser} user={user} >
//                         {/********************** Children Props to avoid "props drilling"******************** */}
//                             <button className="cta-btn-full follow-btn">Follow</button>
//                         </UserDesc>

//                         {this.props.minimalLoggedInUser && <ReviewForm submitReview={this.submitReview} minimalUser={this.props.minimalLoggedInUser} />}
//                         {/* {!isLoggedInUser && this.props.minimalLoggedInUser && <ReviewForm submitReview={this.submitReview} minimalUser={this.props.minimalLoggedInUser} />} */}

//                         <ReviewList reviews={user.reviews} />

//                     </section>


//                     <section className="right-side fixed" >

//                         <div className="minimal-event-list">
//                         MinimalEventList
//                             {/* <MinimalEventList minimalEvents={this.minimalEvents} /> */}
//                         </div>

//                         <div className="follow-user-list">
//                             Follow-User-List
//                         </div>

//                     </section>

//                 </section>}

//             </React.Fragment>
//         )
//     }
// }


// const mapStateToProps = (state) => {
//     return {
//         events: state.eventsStore.events,
//         loggedInUser: state.userStore.loggedInUser,
//         minimalLoggedInUser: state.userStore.minimalLoggedInUser
//     };
// };

// const mapDispatchToProps = {
//     addReview,
//     loadEvents,
//     loadUser
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);