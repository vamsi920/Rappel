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
            longitude:0,
            whichRoom:''
        };
   }
   componentDidMount(){
    const rooms =[
    {   name:'Vamsi',
        latMin:22.32250,
        latMax:22.32270,
        longMin:87.30720,
        longMax:87.30730,    
    },
    {   name:'Akella',
        latMin:22.32272,
        latMax:22.32279,
        longMin:87.30743,
        longMax:87.30750,    
    },
    {   name:'Pritam',
        latMin:22.32242,
        latMax:22.32270,
        longMin:87.30734,
        longMax:87.30750,    
    },
    {   name:'Aravind',
        latMin:22.32225,
        latMax:22.32240,
        longMin:87.30720,
        longMax:87.30740,    
    },
    ]
    var options = {
      enableHighAccuracy: true,
      distanceFilter: 1,
    };
    roomChecker=(latitude, longitude)=>{
        for(let i=0; i<rooms.length; i++){
            if(latitude>rooms[i]["latMin"] && longitude>rooms[i]["longMin"]){
                if(latitude<rooms[i]["latMax"] && longitude< rooms[i]["longMax"]){
                    this.setState({whichRoom:rooms[i]["name"]});
                    console.log('you are in ' + this.state.whichRoom+"'s room");
                }
            }
        }
    }
        Geolocation.watchPosition((info => {
            //console.log(info.coords.latitude + " " + info.coords.longitude);
            this.setState({latitude:info.coords.latitude.toFixed(5), longitude:info.coords.longitude.toFixed(5)});
            //write you logic here
            roomChecker(this.state.latitude, this.state.longitude);
        }), 
            ((error)=>{
              console.log(error);
            }), options);
            
            
    }
    
    static navigationOptions = { header: null };
    render() {
        return (
            <View style={styles.container}>
            <Text>room owners name: {this.state.whichRoom}</Text>
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
