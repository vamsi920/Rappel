import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { TextInput, Button, Drawer, List } from 'react-native-paper';
import { height, width } from 'react-native-dimension';
import firebase from 'firebase';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TaskHeading: '',
            TaskDescription: '',
            GivenBy: '',
            Location: '',
            active: 'first',
            AreaList: null,
            LocationId: '',
            currentUser: '',
            UsersList: null,
            GivenTo:'',
            expanded1:false,
            expanded2:false
        }
    }
    componentDidMount() {
        
        firebase.database().ref('Users').on('value', (users) => { console.log(users) })
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
            this.setState({ currentUser: user.email, GivenTo:user.email });}
        })
        firebase.database().ref('Area').on('value', (AreaList) => {
            var AreaListArray = [];
            AreaList.forEach(element => {
                AreaListArray.push(element.val());
            })

            this.setState({ AreaList: AreaListArray });
            console.log(this.state.AreaList);
        });
        firebase.database().ref('UsersList').on('value', (users) => {
            var userArray = [];
            users.forEach(element => {
                userArray.push(element.val());
            })
            this.setState({ UsersList: userArray }, ()=>console.log(this.state.UsersList));
        })
    }
    onSubmit = async () => {
        console.log(this.state.currentUser)
        await firebase.database().ref(`Task/`).push(
            {
                TaskHeading: this.state.TaskHeading,
                TaskDescription: this.state.TaskDescription,
                
                GivenTo:this.state.GivenTo,
                Location: this.state.Location,
                LocationId: this.state.LocationId,
                id: '',
                CurrentUser: this.state.currentUser,
            }
        ).then(() => {
            console.log('added');
        }).catch((error) => {
            console.log(error)
        })
        firebase.database().ref('Task').once('value', (AreaList) => {
            AreaList.forEach(element => {
                firebase.database().ref(`Task/${element.key}`).update({ id: element.key })
            })
        })
    }
    static navigationOptions = { header: null };
    render() {
        return (
            <ScrollView style={{flex:1}}>
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
                {/* <TextInput
                    label='Given By'
                    value={this.state.GivenBy}
                    style={styles.input}
                    onChangeText={GivenBy => this.setState({ GivenBy })}
                /> */}
                <List.Section style={{ width: width(80) }} title="Assign Task To">
                    <List.Accordion title="Select User or leave it blank to assign to yourself" expanded={this.state.expanded1} onPress={() =>this.setState({expanded1:true})}>
                    
                        {(this.state.UsersList != null) ? (this.state.UsersList.map((arg) => {
                            return (<List.Item title={arg.name}  onPress={() => { this.setState({ GivenTo:arg.email, expanded1:false})  }} />)
                        })) : (<View></View>)}
                    </List.Accordion>
                </List.Section>
                <List.Section style={{ width: width(80), }} title="choose Location">
                    <List.Accordion title="Location" expanded={this.state.expanded2}  onPress={() =>this.setState({expanded2:true})}>
                        {(this.state.AreaList != null) ? (this.state.AreaList.map((arg) => {
                            return (<List.Item title={arg.AreaName}  onPress={() => { this.setState({ Location: arg.AreaName, LocationId: arg.id , expanded2:false}) }} />)
                        })) : (<View></View>)}
                    </List.Accordion>
                </List.Section>
                <Button mode="contained" style={styles.addTask} onPress={() => this.onSubmit()}>
                    Add Task
                 </Button>
            </View>
            </ScrollView>
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
        fontSize: 20,
        marginTop: 20,


    },
    input: {
        width: width(80),
        margin: 10,
    },
    addTask: {
        width: width(60),
        backgroundColor: '#574F75',
        marginTop: 50,
    },
    tastList: {
        width: width(60),
        backgroundColor: '#eee',
        marginTop: 20,
        justifyContent: 'flex-end',
        color: '#000'
    }
});
export default AddTask
