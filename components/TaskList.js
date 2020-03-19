import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { TextInput, Button, DataTable, Card, Paragraph } from 'react-native-paper';
import { height, width } from 'react-native-dimension';
import firebase from 'firebase';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TaskList: [],
      visible: false,
      GivenBy:'',
      TaskHeading:'',
      TaskDescription: '',
      Location: '',
    }
  }
  componentWillMount() {
    firebase.database().ref('Task').on('value', (TaskList) => {
      taskArray = [];
      TaskList.forEach(element => {
        firebase.database().ref(`Task/${element.key}`).update({ id: element.key });
        taskArray.push(element.val());
      })
      this.setState({ TaskList: taskArray });
      console.log(this.state.TaskList);
    })
  }
  deleteTask = (id) => {
    firebase.database().ref(`Task/${id}`).remove();
  }
  editTask = (id) => {
    firebase.database().ref(`Task/${id}`).update({
                TaskHeading: this.state.TaskHeading,
                TaskDescription: this.state.TaskDescription,
                GivenBy: this.state.GivenBy,
                Location: this.state.Location,
    });

  }
  static navigationOptions = { header: null };
  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        {(this.state.TaskList != []) ? (
          this.state.TaskList.map((arg) => {
            return (
              <View>
              <Card style={styles.Card}>
                <Card.Title title={arg.TaskHeading} />
                <Card.Content>
                  <Paragraph>Task Description : {arg.TaskDescription}</Paragraph>
                  <Paragraph>Task Given By : {arg.GivenBy}</Paragraph>
                  <Paragraph>Location : {arg.Location}</Paragraph>
                </Card.Content>
                <View style={{ flexDirection: 'row', alignItems: 'space-between' }}>
                  <View style={{ flex: 1, alignItems: 'center' }}><Button style={styles.Delete} onPress={() => this.deleteTask(arg.id)}>
                    <Text style={{ color: '#fff' }}> Delete</Text>
                  </Button>
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}><Button style={styles.Edit} onPress={() => this.setState({ visible: true })}>
                    <Text style={{ color: '#fff' }}> Edit</Text>
                  </Button>
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}><Button style={styles.Done} onPress={() => this.deleteTask(arg.id)}>
                    <Text style={{ color: '#fff' }}> Done</Text>
                  </Button>
                  </View>
                </View>
              </Card>
              <Dialog
                  visible={this.state.visible}
                  onTouchOutside={() => {
                    this.setState({ visible: false });
                  }}
                  style={{height:height(40), width:width(80), padding:20}}
                >
                  <DialogContent>
                  <View style={{width:width(80), borderColor:'#000', borderWidth:1 , padding :10, alignItems:'center', }}>
                  <TextInput
                    
                    label={'Old entry: '+ arg.TaskHeading}
                    style={styles.input}
                    onChangeText={TaskHeading => this.setState({ TaskHeading })}
                />
                <TextInput
                    
                    label={'Old entry: '+arg.TaskDescription}
                    style={styles.input}
                    onChangeText={TaskDescription => this.setState({ TaskDescription })}
                />
                <TextInput
                    
                    label={'Old entry: '+arg.GivenBy}
                    style={styles.input}
                    onChangeText={GivenBy => this.setState({ GivenBy })}
                />
                <TextInput

                    label={'Old entry: '+arg.Location}
                    style={styles.input}
                    onChangeText={Location => this.setState({ Location })}
                />
                <Button style={styles.Edit} onPress={() => {
                this.editTask(arg.id)}}>
                    <Text style={{ color: '#fff' }}> Save</Text>
                  </Button>
                  </View>
                  </DialogContent>
                </Dialog>
                </View>
            )
          })
        ) : ("")}
    </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Done: {
    backgroundColor: '#000',

  },
  Delete: {
    backgroundColor: 'red',

  },
  Edit: {
    backgroundColor: '#000',
  },
  Card: {
    margin: 10,
    padding: 10
  },
  CardEdit: {
    backgroundColor: '#eee',
  },
  input: {
    width:width(70),
  }
});
export default TaskList
