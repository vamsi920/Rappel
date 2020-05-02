import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export class CentreOfRoom extends Component {
    static navigationOptions = { header: null };
    render() {
        return (
            <View style={styles.container}>
            <View style={{width:'100%', padding:50}}>
            <Text style={{fontSize:15, color:'#c1c1c1'}}> Due to restrictions and bad response of google place api we have to add our own loaction with this module</Text>
                <Text style={{fontSize:20}}> Make sure you are at the Centre of the Area which you wanna add </Text></View>
                <View style={{marginTop:100, width:'50%'}}>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            this.props.navigation.navigate('AddArea')
                        }}>
                            <Text style={styles.text}>Proceed <MaterialIcons name="navigate-next"/> </Text>
                        </TouchableOpacity></View>
                </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#574F75',
        height: 40,
        width: '100%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    text: {
        color: '#fff',
        fontSize: 13,
    },
});
export default CentreOfRoom
