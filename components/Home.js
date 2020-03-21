import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { height, width } from 'react-native-dimension';
export class Home extends Component {
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
                            <Text>Lat: </Text>
                        </View>
                        <View style={styles.locationBoxCoordRight}>
                            <Text>Long: </Text>
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
