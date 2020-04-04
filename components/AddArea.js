import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { height, width } from 'react-native-dimension';
import firebase from 'firebase';
import Geolocation from '@react-native-community/geolocation';
export class AddArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AreaName: '',
            CentreLat: '',
            CentreLong: '',
            RadiusOfArea: 0,
            EndLat:'',
            EndLong:'',
            preciseCentreLat:'',
            preciseCentreLong:'',
            EdgeCoords:null,
        }
    }
    componentDidMount(){
        var options = {
            enableHighAccuracy: true,
            distanceFilter: 1,
        };
        Geolocation.watchPosition((info => {
            //console.log(info.coords.latitude + " " + info.coords.longitude);
            this.setState({ CentreLat: info.coords.latitude.toFixed(5),preciseCentreLat: info.coords.latitude, preciseCentreLong:info.coords.longitude, CentreLong: info.coords.longitude.toFixed(5) });
            console.log("centre:"+ info.coords.latitude + " " +info.coords.longitude)
        }),
            ((error) => {
                console.log(error);
            }) , options);
    }
     measure=(lat1, lon1, lat2, lon2)=>{  // generally used geo measurement function
        var R = 6371; // km (change this constant to get miles)
        var dLat = (lat2-lat1) * Math.PI / 180;
        //console.log("dlat "+ dLat);
        var dLon = (lon2-lon1) * Math.PI / 180;
        //console.log("dlon "+ dLon);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
            //console.log(a);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        console.log("d: "+d*1000);
        //return d * 1000; // meters
        //console.log(d);
        this.setState({RadiusOfArea : d*1000});
        console.log(this.state.RadiusOfArea)

    }
       

    onSubmit=async (RadiusOfArea, CentreLat, CentreLong)=>{
        var deltaRadius = RadiusOfArea / 100000;
        var edgeCoords = {};
        edgeCoords['latMin'] = CentreLat - deltaRadius -0.000005;
        edgeCoords['latMax'] = CentreLat + deltaRadius + 0.000005;
        edgeCoords['longMin'] = CentreLong - deltaRadius -0.000005;
        edgeCoords['longMax'] = CentreLong + deltaRadius + 0.000005;
        this.state.EdgeCoords=edgeCoords;
       await firebase.database().ref(`Area/`).push(
            {
             AreaName: this.state.AreaName,
             RadiusOfArea: this.state.RadiusOfArea,
             CentreLat:this.state.preciseCentreLat,
             CentreLong:this.state.preciseCentreLong,
             EdgeCoords: this.state.EdgeCoords,
             id:'',
         }
        ).then(()=>{
            console.log('added');
        }).catch((error)=>{
            console.log(error)
        }) 
        firebase.database().ref('Area').once('value', (AreaList) => {
            AreaList.forEach(element => {
              firebase.database().ref(`Area/${element.key}`).update({ id: element.key })
            })
          });
                     
           
    }

    static navigationOptions = { header: null };
    render() {
        return (
            <View style={styles.container}>
            <View style={{height:height(10)}}/>
            <View style={{justifyContent:'space-around' , alignItems: 'center'}}>
                <Text style={styles.heading}> Rappel </Text>
                <TextInput
                    label='Area Name'
                    value={this.state.AreaName}
                    style={styles.input}
                    onChangeText={AreaName => this.setState({ AreaName })}
                />
                <View>
                    <View style={styles.locationBox}>
                        <View style={styles.locationBoxTitle}>
                            <Text style={styles.locationBoxTextTitle}>Room centre Coordinates recorded as:</Text>
                        </View>
                        <View style={styles.locationBoxCoord}>
                            <View style={styles.locationBoxCoordLeft}>
                                <Text>Lat: {this.state.CentreLat}</Text>
                            </View>
                            <View style={styles.locationBoxCoordRight}>
                                <Text>Long: {this.state.CentreLong}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <TextInput
                    label=' Radius of Area from Centre in m:'
                    value={this.state.RadiusOfArea}
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={ RadiusOfArea => this.setState({RadiusOfArea})}
                />
                    <View>
                        <Button mode="contained" style={styles.addTask} onPress={() => this.onSubmit(this.state.RadiusOfArea, this.state.preciseCentreLat, this.state.preciseCentreLong)}>
                    Add Area
                 </Button></View>
                 </View>
                 <View style={{height:height(20)}}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    heading: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,


    },
    input: {
        width: width(80),
        marginTop: 30,
        backgroundColor: '#fff',
    },
    addTask: {
        width: width(60),
        backgroundColor: '#574F75',
        marginTop:20
    },
    text: {
        color: '#fff',
        fontSize: 13,
    },
    tastList: {
        width: width(60),
        backgroundColor: '#eee',
        marginTop: 20,
        justifyContent: 'flex-end',
        color: '#000'
    },
    locationBox: {
        width: width(80),
        height: height(15),
        marginTop:30,
        borderColor: '#000',
        elevation:1,
        justifyContent: 'space-around'
    },
    locationBoxTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    locationBoxCoord: {
        flex: 1,
        flexDirection: 'row',

    },
    locationBoxCoordLeft: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    locationBoxCoordRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        width: width(80),
        height: height(10),

        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#574F75',
        height: '60%',
        width: '80%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        marginBottom:20
    },
    buttonBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default AddArea
