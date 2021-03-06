import React from 'react'


export function UserDesc(props) {

    const { user, isLoggedInUser, loggedInUser, addFollower, doUnfollow, checkFollowing, removeFollower } = props;
    const isFollow = checkFollowing();

    return (
        <main className="user-desc flex column justify-center align-items-center space-between">
            <section className="user-info flex column justify-center align-items-center">
                <div className="avatar user-img">
                    <img src={user.imgUrl} alt="" />
                </div>
                <h3 className="full-name">{user.fullName}</h3>
                <h4 className="user-name" >{user.userName}</h4>
            </section>
            <section className="user-stats flex column justify-center align-items-center">
                <div className="flex align-items-center">
                    <h4>Events Created</h4>
                    <h4>{props.eventsCreated.length}</h4>
                </div>
                <div className="flex align-items-center">
                    <h4>Followers</h4>
                    <h4>{user.followers.length}</h4>
                </div>
                <div className="flex align-items-center">
                    <h4>Reviews</h4>
                    <h4>{user.rank.count}</h4>
                </div>
                <div className="flex align-items-center">
                    <h4>Rating</h4>
                    {user.rank.average !== 0 && <h4>{user.rank.average.toFixed(1)}</h4>}
                    {!user.rank.average && <h6>None</h6>}
                </div>

                {!isLoggedInUser && !isFollow &&
                    <button onClick={() => addFollower(loggedInUser)}
                        className="follow-btn">Follow</button>}
                {!isLoggedInUser && isFollow &&
                    <button onClick={() => removeFollower(loggedInUser)}
                        className="follow-btn unfollow">Unfollow</button>}


            </section>

        </main>
    )
}
