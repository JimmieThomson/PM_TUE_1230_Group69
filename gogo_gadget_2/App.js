import * as React from 'react';
import {useState, useEffect} from 'react'
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Marker } from 'react-native-maps';
import { Canvas, BackdropFilter, Fill, Image, ColorMatrix, useImage } from "@shopify/react-native-skia";
import Geolocation from '@react-native-community/geolocation';
export default function App() {
  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState('...');
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState('...');
  const [
    currentSpeed,
    setCurrentSpeed
  ] = useState('...');
  const [
    locationStatus,
    setLocationStatus
  ] = useState('');
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
        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
 
        //Setting Latitude state
        setCurrentLatitude(currentLatitude);

        setCurrentSpeed(currentSpeed);
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
  console.log(currentLatitude);
  console.log(currentLongitude)
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
      // region={{
      //   latitude: currentLatitude,
      //   longitude: currentLongitude,
      //   latitudeDelta: 0.015,
      //   longitudeDelta: 0.0121
      // }}
      
      >
        <Marker coordinate={{
        latitude: currentLatitude,
        longitude: currentLongitude
      }}
      pinColor = "black"
      >
        <Text style={fonts.header}> Hello</Text>
      </Marker>
      <Marker coordinate={{
        latitude: -37.6291324,
        longitude: 145.070799
      }}
      pinColor = "blue"
        >
      </Marker>
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
        </View>
        <View style={styles.icons}>
          <View style={styles.images} ></View>
          <Text style={fonts.deviceTitle}>Device 1</Text>
        </View>
        <View style={styles.icons}>
          <View style={styles.images} ></View>
          <Text style={fonts.deviceTitle}>You</Text>
        </View>
        
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
  }
});