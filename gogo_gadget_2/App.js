import * as React from 'react';
import {useState, useEffect} from 'react'
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Marker, Polyline } from 'react-native-maps';
import { Canvas, BackdropFilter, Fill, Image, ColorMatrix, useImage } from "@shopify/react-native-skia";
import Geolocation from '@react-native-community/geolocation';
import CustomMarker from './components/CustomMarkerComponent'
const movieURL = "https://gogo-gadget-api.herokuapp.com/gpsinfo";
export default function App() {

  // managing state with 'useState'
  const [isLoading, setLoading] = useState(true);
  const [speed,setSpeed] = useState([]);
  const [longtitude, setLongtitude] = useState([]);
  const [latitude, Setlatitude] = useState([]);
  const [array,setArray] = useState([]);
  // similar to 'componentDidMount', gets called once
  useEffect(() => {
    setInterval(() => {
    fetch(movieURL)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        
        var locationlength = json.length;
        // var location = [
        //   {latitude: json[locationlength-1].latitude,longtitude: json[locationlength-1].longtitude},
        //   {latitude: json[locationlength-2].latitude,longtitude: json[locationlength-2].longtitude},
        //   {latitude: json[locationlength-3].latitude,longtitude: json[locationlength-3].longtitude},
        //   {latitude: json[locationlength-4].latitude,longtitude: json[locationlength-4].longtitude},
        //   {latitude: json[locationlength-5].latitude,longtitude: json[locationlength-5].longtitude},
        //   {latitude: json[locationlength-6].latitude,longtitude: json[locationlength-6].longtitude},
        //   {latitude: json[locationlength-7].latitude,longtitude: json[locationlength-7].longtitude},
        //   {latitude: json[locationlength-8].latitude,longtitude: json[locationlength-8].longtitude},
        //   {latitude: json[locationlength-9].latitude,longtitude: json[locationlength-9].longtitude},
        //   {latitude: json[locationlength-10].latitude,longtitude: json[locationlength-10].longtitude},
        // ];
        // setArray(location);
        setSpeed(json[locationlength-1].speed);
        setLongtitude(json[locationlength-1].longtitude);
        Setlatitude(json[locationlength-1].latitude);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false)); // change loading state
    }, 1000);
  }, []);

  const [currentSpeed,setCurrentSpeed] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [locationStatus,setLocationStatus] = useState('');
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);
  
  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');
 
        //getting the Longitude from the location json
        const currentLongitude = 
          JSON.stringify(position.coords.longitude);
 
        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);
        
          const currentSpeed = 
          JSON.stringify(position.coords.speed);
 
        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
        
        setCurrentSpeed(currentSpeed);

      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

  var coordinatesarray = [];
  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change
        
        setLocationStatus('You are Here');
        console.log(position);
 
        //getting the Longitude from the location json        
        const currentLongitude =
          JSON.stringify(position.coords.longitude);
 
        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);

        const currentSpeed = 
          JSON.stringify(position.coords.speed);
        if(currentSpeed == -1){
          setCurrentSpeed("0")
        }
        else{
          setCurrentSpeed(Math.round(currentSpeed * 1.60934));
        }
        setCurrentLongitude(currentLongitude);
 
        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
        var coordinatesarray = [];
      var obj = {latitude: currentLatitude, longtitude: currentLongitude}
    coordinatesarray.push(obj);
        
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
    

  };
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
      region={{
        latitude: currentLatitude,
        longitude: currentLongitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
      }}
      
      >
        <Marker coordinate={{
        latitude: currentLatitude,
        longitude: currentLongitude
      }}
  
      >
        <View style={styles.usermarker}>
        <Text style={fonts.markerTitle}>You</Text>
        </View>
      </Marker>
      <Marker 
      coordinate={{
        latitude: latitude,
        longitude: longtitude
      }}
        >
        <View style={styles.usermarker}>
        <Text style={fonts.markerTitle}>Your mom </Text>
        </View>
      </Marker>
      {/* <Polyline
		coordinates={{array}}
		strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
		strokeColors={[
			'#7F0000',
			'#00000000', // no color, creates a "long" gradient between the previous and next coordinate
			'#B24112',
			'#E5845C',
			'#238C23',
			'#7F0000'
		]}
		strokeWidth={6}
	/> */}
        </MapView>
      
      <View style={styles.topbarwrapper}>
        <View style={styles.body}>
          <View style={styles.addressinfo}>
            <Text style={fonts.header}>Last Accessed Location</Text>
            <Text style={fonts.address}>49 The Lakes Blvd, South Morang Vic 3752</Text> 
          </View>
          <View style={styles.time}></View>
        </View>
      </View> 
      <View style={styles.navbar} blurRadius={1}>
        <View style={styles.icons}>
          <View style={styles.images} ></View>
          <Text style={fonts.deviceTitle}>You</Text>
          <Text style={fonts.speedfont}>{currentSpeed} Km/H</Text>
        </View>
        <View style={styles.icons}>
          <View style={styles.images} ></View>
          <Text style={fonts.deviceTitle}>Device 1</Text>
        </View>
        {/* </BlurView> */}
      </View>
    </View>
  );
}
const fonts = StyleSheet.create({
  deviceTitle: {
    fontSize: 12,
    color: 'white',
  },
  address: {
    fontSize: 10,
  },
  header: {
    fontSize: 20,
    color: 'white',
  },
  markerTitle: {
    fontSize: 10,
    color: 'white'
  },
  speedfont: {
    fontSize: 13,
    color: 'rgb(45,45,45)',
  }
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },  
  topbarwrapper: {
    flex: 1,
    width: Dimensions.get('window').width / 2.2 * 2,
    position: 'absolute',
    marginTop: 50,
    marginBottom: 20,
    top: 0,
  },
  body: {
    flex: 1,
    backgroundColor: 'rgba(122, 122, 122, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    padding: 10,
  },
  navbar: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    position: 'absolute',
    marginTop: 20,
    padding: 20,
    bottom: 0,
    backgroundColor: 'rgba(20, 20, 20, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  icons: { 
    padding: 10,
    margin: 13, 
    borderRadius: 10,
    backgroundColor: 'rgba(230, 230, 230, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  images: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  usermarker: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#586AE2'
  }
});