// import React, { Component } from 'react'
// import { StyleSheet, View, Text, Dimensions, Alert, Button, Image } from 'react-native';
// import MapView, { Marker,Circle } from 'react-native-maps';
// import { width, height, totalSize } from 'react-native-dimension';
// import Geolocation from '@react-native-community/geolocation';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// export class MapCheck extends Component {
//    constructor(props) {
//         super(props);
//         this.state = {
//             latitude:0,
//             longitude:0
//         };
//    }
//    componentDidMount(){
//     var options = {
//       enableHighAccuracy: true,
//       distanceFilter: 1,
//     };
//         Geolocation.watchPosition((info => {
//             console.log(info.coords.latitude + " " + info.coords.longitude);
//             this.setState({latitude:info.coords.latitude, longitude:info.coords.longitude})}), 
//             ((error)=>{
//               console.log(error);
//             }), options);
//     }
    
//     render() {
        
//         return (
//             <View style={styles.container}>
//                 <MapView
// 				style={styles.map}
// 				region={{
// 					latitude: this.state.latitude,
// 					longitude: this.state.longitude,
// 					latitudeDelta: 0.09,
// 					longitudeDelta: 0.0421,
// 				}}
// 			>
//             <Circle  center={this.state} radius={100} /> 
//             <Marker coordinate={this.state}/>
//             </MapView>
//             {/* <GooglePlacesAutocomplete
//       placeholder='Search'
//       minLength={2} // minimum length of text to search
//       autoFocus={false}
//       returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
//       keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
//       listViewDisplayed='auto'    // true/false/undefined
//       fetchDetails={true}
//       renderDescription={row => row.description} // custom description render
//       onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
//         console.log(data, details);
//       }}
 
//       getDefaultValue={() => ''}
 
//       query={{
//         // available options: https://developers.google.com/places/web-service/autocomplete
//         key: 'AIzaSyDMO13hWHR2UWeM7vZVAYxH0RRaZHN8Vpg',
//         language: 'en', // language of the results
//         types: '(cities)' // default: 'geocode'
//       }}
 
//       styles={{
//         textInputContainer: {
//           width: '100%'
//         },
//         description: {
//           fontWeight: 'bold'
//         },
//         predefinedPlacesDescription: {
//           color: '#1faadb'
//         }
//       }}
 
//       currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
//       currentLocationLabel="Current location"
//       nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
//       GoogleReverseGeocodingQuery={{
//         // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
//       }}
//       GooglePlacesSearchQuery={{
//         // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
//         rankby: 'distance',
//         type: 'cafe'
//       }}
      
//       GooglePlacesDetailsQuery={{
//         // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
//         fields: 'formatted_address',
//       }}
 
//       filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
//     //   predefinedPlaces={[homePlace, workPlace]}
 
//       debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
//       //renderLeftButton={()  => <Image source={require('../images/logo.png')} />}
//       //renderRightButton={() => <Text>Custom text after the input</Text>}
//     /> */}
//             </View>
//         )
//     }
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     map: {
//         width:width(100),
//         height:height(100)
// 	}
// })
// export default MapCheck
