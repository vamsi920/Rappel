import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { height, width } from 'react-native-dimension';
import MapView, { Marker,Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude:0,
            longitude:0
        };
   }
   componentDidMount(){
    if(this.state.latitude > 22.32260000 && this.state.latitude<= 22.32270000){
        alert('vamsi you have success ahead now you can go to sleep');
    }
    var options = {
      enableHighAccuracy: true,
      distanceFilter: 1,
    };
        Geolocation.watchPosition((info => {
            console.log(info.coords.latitude + " " + info.coords.longitude);
            this.setState({latitude:info.coords.latitude, longitude:info.coords.longitude})}), 
            ((error)=>{
              console.log(error);
            }), options);
    }
    static navigationOptions = { header: null };
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../images/logo.png')}/>
                <View style={styles.locationBox}>
                    <View style={styles.locationBoxTitle}>
                        <Text style={styles.locationBoxTextTitle}>Your Current Coordinates</Text>
                    </View>
                    <View style={styles.locationBoxCoord}>
                        <View style={styles.locationBoxCoordLeft}>
                            <Text>Lat: {this.state.latitude}</Text>
                        </View>
                        <View style={styles.locationBoxCoordRight}>
                            <Text>Long: {this.state.longitude}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.buttons}>
                <View style={styles.buttonBox}>
                <TouchableOpacity style={styles.button} onPress={() =>{
                    this.props.navigation.navigate('AddTask')
                }}>
                    <Text style={styles.text}>Add New Task</Text>
                </TouchableOpacity></View>
                <View style={styles.buttonBox}>
                <TouchableOpacity style={styles.button} onPress={() =>{
                    this.props.navigation.navigate('TaskList')
                }}>
                    <Text style={styles.text}>Check Tasks</Text>
                </TouchableOpacity></View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fff',
      justifyContent:'space-around'
    },
    logo:{
        width:width(80), 
        height:height(40),
    },
    locationBox: {
        width:width(80), 
        height:height(20),
        borderWidth:1, 
        borderColor:'#eee',
    },
    buttons:{
        width:width(80),
        height:height(10), 
        
        justifyContent:'space-around',
        flexDirection:'row', 
        alignItems:'center'
    },
    button: {
        backgroundColor: '#574F75',
        height:'80%',
        width:'80%',
        borderRadius:5,
        alignItems: 'center',
        justifyContent: 'center',
        elevation:2,
    },
    buttonBox: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },
    text:{
        color:'#fff',
        fontSize:13,
    },
    locationBoxTitle: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    locationBoxCoord: {
         flex: 1,
        flexDirection: 'row',

    },
    locationBoxCoordLeft:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    },
    locationBoxCoordRight:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    locationBoxTextTitle:{
        fontSize:17
    }
  });
export default Home
