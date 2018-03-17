import React from "react";
import { View, Text, ToastAndroid } from "react-native";
import firebase from 'firebase';
import { MapView, Location, Permissions } from 'expo';
import MapViewDirections from 'react-native-maps-directions';

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA =  0.0421;
const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, distanceInterval : 10 };
const GOOGLE_API_KEY = 'AIzaSyB13MpI1LMJD38RjFfdkoOyI25Rr2OyNV0';

const firebaseConfig = {
    apiKey: "AIzaSyA_bBHAD4cSHBZJtdcI87pl8KFhipcsq9Y",
    authDomain: "geolocate-1515760482364.firebaseapp.com",
    databaseURL: "https://geolocate-1515760482364.firebaseio.com",
    projectId: "geolocate-1515760482364",
    storageBucket: "geolocate-1515760482364.appspot.com",
    messagingSenderId: "120744641497"
};



class mapViewScreen extends React.Component{


    state = {
        initialPosition : {
            latitude : 37,
            longitude: -122,
            latitudeDelta : LATITUDE_DELTA ,
            longitudeDelta: LONGITUDE_DELTA ,
        },
        trackMarkerPosition :{
            latitude : 37,
            longitude : -122,
        },

        speed : 0,

    };



    async getLoc(){

        const location = await Location.getCurrentPositionAsync({});
        console.log(location);

        const  initialPosition = {

            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,

        };

        const trackMarkerPosition = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };

        this.setState({initialPosition, trackMarkerPosition });

    };

    locationChanged = (location) => {
        const region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        };

        const trackMarkerPosition = {

            latitude: location.coords.latitude,
            longitude: location.coords.longitude,

        };

        console.log(location);
        // this.setState({location});
        console.log(" watch "+region.latitude+" "+region.longitude+"  "+location.coords.speed);
        this.setState({initialPosition : region, speed: location.coords.speed, trackMarkerPosition});

        ToastAndroid.show(" watch "+region.latitude+" "+region.longitude+"  "+location.coords.speed,ToastAndroid.SHORT);


    };

    async watchPos(){

        Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
    };


    componentWillMount(){

        firebase.initializeApp(firebaseConfig);
        Location.setApiKey(GOOGLE_API_KEY);
        this.getLoc();
        this.watchPos();

    }

    componentWillUnmount(){
        // this.watchId.remove();
    };


    render(){

        return(
            <View style={{flex:1}}>
                <MapView

                    style={{ flex: 1 }}
                    // showsUserLocation
                    zoomEnabled
                    region={this.state.initialPosition}
                >

                    <MapView.Marker
                        coordinate={this.state.trackMarkerPosition}
                        title={"Abhishek"}
                        description={"You can't escape from me HaHaHa.... I am a tracer "}
                    />



                </MapView>
                {/*<Text>--------------------------</Text>*/}
                {/*<Text>{this.state.location.timeStamp}</Text>*/}
                <Text>--------------------------</Text>
                <Text>Map Speed</Text>
                <Text>{this.state.speed * 3.6} km/hr</Text>
                <Text>--------------------------</Text>

            </View>
        );

    };

}



export default mapViewScreen;