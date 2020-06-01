import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Grid } from '@material-ui/core';

class MapContainer extends Component {
    
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    containerStyle = {
        // position: 'fixed',
        // width:'100px',
        // height: '100px',
        // top:'510px',
        // right:'80px',
        // border:'1px solid lightgrey',
        borderRadius:'5px',
        // boxShadow: "0 1px 3px #00000038"
    }
      
    style = {
        // width: '100%',
        // height: '100%',
        borderRadius:'15px'
    }

    mapControlProps = {

        //Controls on map
        zoomControl:true,
        mapTypeControl:false,
        scaleControl:false,
        streetViewControl:false,
        panControl:false,
        rotateControl:false,
        fullscreenControl:false,
        //Map behaviour 
        draggable:true
    
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (mapProps, map, clickEvent) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };


    render() {
        return (
            <Map className="google-map"
                style={this.style}
                containerStyle={this.containerStyle}
                initialCenter={this.props.loc}
                center={this.props.loc}
                zoom={18}
                zoomControl={this.mapControlProps.zoomControl}
                mapTypeControl={this.mapControlProps.mapTypeControl}
                scaleControl={this.mapControlProps.scaleControl}
                streetViewControl={this.mapControlProps.streetViewControl}
                rotateControl={this.mapControlProps.rotateControl}
                fullscreenControl={this.mapControlProps.fullscreenControl}
                panControl={this.mapControlProps.panControl}
                draggable={this.mapControlProps.draggable}

                google={this.props.google}
                onClick={this.onMapClicked}>
                <Marker
                    onClick={this.onMarkerClick}
                    name={this.props.name}
                    position={this.props.loc}
                    title={this.props.name}
                />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyBPV258Flb5H4EElbHaNUYtZQCWnH3Y7J0')
})(MapContainer)