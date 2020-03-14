import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { height, width } from 'react-native-dimension';
import firebase from 'firebase';
class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TaskHeading: '',
            TaskDescription: '',
            GivenBy: '',
            Location: ''
        }
    }
    onSubmit=()=>{
        
         firebase.database().ref(`Task/`).push(
               {
                TaskHeading: this.state.TaskHeading,
                TaskDescription: this.state.TaskDescription,
                GivenBy: this.state.GivenBy,
                Location: this.state.Location,
            }
           ).then(()=>{
               console.log('added')
           }).catch((error)=>{
               console.log(error)
           })  
    }
    static navigationOptions = { header: null };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}> Rappel </Text>
                <TextInput
                    label='Task Heading'
                    value={this.state.TaskHeading}
                    style={styles.input}
                    onChangeText={TaskHeading => this.setState({ TaskHeading })}
                />
                <TextInput
                    label='Task Description'
                    value={this.state.TaskDescription}
                    style={styles.input}
                    onChangeText={TaskDescription => this.setState({ TaskDescription })}
                />
                <TextInput
                    label='Given By'
                    value={this.state.GivenBy}
                    style={styles.input}
                    onChangeText={GivenBy => this.setState({ GivenBy })}
                />
                <TextInput
                    label='Location'
                    value={this.state.Location}
                    style={styles.input}
                    onChangeText={Location => this.setState({ Location })}
                />
                <Button mode="contained" style={styles.addTask} onPress={() => this.onSubmit()}>
                    Add Task
                 </Button>
                 <Button mode="contained" style={styles.tastList} onPress={() => this.props.navigation.navigate('TaskList')}>
                   <Text style={{color:'#000'}}> Check all tasks</Text>
                 </Button>
                 

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },
    heading: {
        color: '#000',
        fontWeight: 'bold',
        fontSize:20,
        marginTop:20,
    

    },
    input: {
        width: width(80),
        margin:10,
    },
    addTask:{
        width:width(60),
    },
    tastList: {
        width:width(60),
        backgroundColor:'#eee',
        marginTop:20,
        justifyContent:'flex-end',
        color:'#000'
    }
});
export default AddTask
