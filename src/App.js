// json-server --watch db.json --id=_id --port 3030

import React from 'react';
import './styles/global.scss';
import HomePage from './pages/HomePage'
import NavBar from './cmps/NavBar'
import EventIndex from './pages/EventIndex'
import EventEdit from './pages/EventEdit'
import UserDetails from './pages/UserDetails'
import EventDetails from './pages/EventDetails'

import './styles/global.scss';
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

class App extends React.Component {
    render() {
        return (
            <section className="events-app">
                <NavBar />
                <Switch>
                    <Route component={HomePage} exact path="/" />
                    <Route component={EventEdit} exact path="/event/edit/:id?" />
                    <Route component={EventIndex} exact path="/event" />
                    <Route component={UserDetails} exact path="/user/:id" />
                    <Route component={EventDetails} exact path="/event/:id?" />
                </Switch>
            </section>
        )
    }
}


const mapStateToProps = state => {
    return {
        events: state.eventsStore.events
    };
};
const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(App);



