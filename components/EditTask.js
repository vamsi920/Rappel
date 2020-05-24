import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TextInput, Button,Drawer, List } from 'react-native-paper';
import { height, width } from 'react-native-dimension';
import firebase from 'firebase';
export class EditTask extends Component {
    constructor(props) {
        super(props);
        this.state={
            TaskHeading:'',
            TaskDescription: '',
            GivenBy: '',
            Location: '',
            AreaList:null,
            LocationId:'',
            expanded:false
        }
    }
    componentWillMount() {
        console.log(this.props.navigation.state.params.id);
    }
    componentDidMount(){
        firebase.database().ref('Area').on('value', (AreaList) => {
           var AreaListArray=[];
            AreaList.forEach(element=>{
                AreaListArray.push(element.val());
            })
            
            this.setState({AreaList:AreaListArray});
            console.log(this.state.AreaList);
          })
    }
    onSubmit=async (id)=>{
       await firebase.database().ref(`Task/${id}`).update({
                TaskHeading: this.state.TaskHeading,
                TaskDescription: this.state.TaskDescription,
                
                Location: this.state.Location,
    });
    this.props.navigation.goBack();
    }
    static navigationOptions = { header: null };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}> Edit task  </Text>
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
                <List.Section style={{width:width(80), }} title="choose Location">
        <List.Accordion title="Location" expanded={this.state.expanded} onPress={() =>this.setState({expanded:true})}>
          {(this.state.AreaList!=null)?(this.state.AreaList.map((arg)=>{
            return(<List.Item title={arg.AreaName} onPress={()=>{this.setState({Location:arg.AreaName, LocationId:arg.id, expanded:false})}} />)
          })):(<View></View>)}
        </List.Accordion>
      </List.Section>
                <Button mode="contained" style={styles.addTask} onPress={() => this.onSubmit(this.props.navigation.state.params.id)}>
                    Edit Task
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
        backgroundColor:'#574F75',
        marginTop:50,
    },
    tastList: {
        width:width(60),
        backgroundColor:'#eee',
        marginTop:20,
        justifyContent:'flex-end',
        color:'#000'
    }
});
export default EditTask
