import React from 'react'


export function UserDesc(props) {
    
    const { user } = props;
    // console.log('user desc', user)

    return (
        <main className="user-desc flex column justify-center align-items-center">
            <section className="user-info flex column justify-center align-items-center">
                <div className="avatar user-img">
                    <img src={user.imgUrl} alt="" />
                </div>
                <h3>{user.fullName}</h3>
                <h4>{user.userName}</h4>
            </section>
            <section className="user-stats flex column justify-center align-items-center">
                <div className="flex align-items-center">
                    <h4>Events Created</h4>
                    <h4>47</h4>
                </div>
                <div className="flex align-items-center">
                    <h4>Events Subscribed</h4>
                    <h4>53</h4>
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
                    {user.rank.average && <h4>{user.rank.average.toFixed(1)}</h4>}
                    {!user.rank.average && <h4>None</h4>}
                </div>
            </section>
        </main>
    )
}
