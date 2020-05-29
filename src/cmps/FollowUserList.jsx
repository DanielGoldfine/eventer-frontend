import React from 'react'
import UserPreview from './UserPreview'

export class FollowUserList extends React.Component {

    state = {
        listState: 'Following'
    }

    render() {

        const { listState } = this.state;

        return (
            <section className="follow-list-container user-details-list">

                <div className="list-header flex align-center space-between">
                    <h4>Followers</h4>
                    {/* <select name="list-filter" id="">
                        <option value="active">Following</option>
                        <option value="inactive">Followers</option>
                    </select> */}
                </div>
                <div className="list">
                    <div className="followers-grid">
                        {this.props.followers.map(follower => <UserPreview minimalUser={follower} />)}
                    </div>
                </div>
            </section>
        )
    }
}