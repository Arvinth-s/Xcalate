import React, { Component, useState } from 'react';
import { Menu, Button } from 'semantic-ui-react';

import ReactMapGL, { Marker} from 'react-map-gl';
import { Link } from '../routes';

function Map() {
    const [viewport, setViewport] = useState({
      width: '100%',
      height: 300,
      latitude: 21.50 ,
      longitude: 77.75,
      zoom: 2.8,
    });

    let markers = [ {id:1 ,lat:13.0853, long:80.2369, name: 'NTDV India', acc: '0x121sjn12' }, {id:2, lat:19.3, long:68.05, name:'CNN News 18',acc: '0xwerfwf422f' }, {id:3 ,lat:26.59, long:49.58, name: 'News Emirates',acc: '0x1wefwefwr' }];
  
    return (
        <div>
            
        <ReactMapGL
            {...viewport}
            mapboxApiAccessToken="pk.eyJ1IjoiYWJoaXNoZWstMTc3IiwiYSI6ImNrazBvY2YyNDBqZjcydnJycXo5aTZ4ZWgifQ.0Yx9xYCiA4vDr9zWu-vdCA"
            mapStyle="mapbox://styles/abhishek-177/ckkwn2zm757mb17qkkpvje9on"
            onViewportChange={nextViewport => setViewport(nextViewport)}
        >{markers.map(marker => (
            <Marker
                key = {marker.id}
                latitude = {marker.lat}
                longitude = {marker.long}
            >
            <Button animated='vertical' inverted color='red'>
            <Button.Content visible>{marker.name}</Button.Content>
            <Button.Content hidden>
            ID:{marker.acc}
            </Button.Content>
            </Button>
            </Marker>
        ))}
        </ReactMapGL>
        </div>
    );
  }

  export default Map;