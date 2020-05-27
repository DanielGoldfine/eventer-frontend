import React from 'react'


export function UserDesc(props) {
    
    const { user } = props;

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
                    {user.rank.average !== 0 && <h4>{user.rank.average.toFixed(1)}</h4>}
                    {!user.rank.average && <h4>Not yet</h4>}
                </div>
                {props.children}
    {/* Child:      <button className="cta-btn-full follow-btn">Follow</button>             */}
            </section>
        </main>
    )
}
