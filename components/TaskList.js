import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TextInput, Button, DataTable, Card, Paragraph } from 'react-native-paper';
import { height, width } from 'react-native-dimension';
import firebase from 'firebase';
class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TaskList: [],
    }
  }
  componentDidMount() {
    firebase.database().ref('Task').on('value', (TaskList) => {
      console.log(TaskList.val());
      taskArray = [];
      TaskList.forEach(element => {
        taskArray.push(element.val());
      })
      this.setState({ TaskList: taskArray });
      console.log(this.state.TaskList);
    })
  }
  static navigationOptions = { header: null };
  render() {
    return (
      <View style={styles.container}>
        {(this.state.TaskList != []) ? (
          this.state.TaskList.map((arg) => {
            return (
              <Card style={styles.Card}>
                <Card.Title title={arg.TaskHeading} />
                <Card.Content>
                  <Paragraph>Task Description : {arg.TaskDescription}</Paragraph>
                  <Paragraph>Task Given By : {arg.GivenBy}</Paragraph>
                  <Paragraph>Location : {arg.Location}</Paragraph>
                </Card.Content>
              </Card>
            )
          })
        ) : ("")}

      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Card: {
    margin: 10,
  },
 
});
export default TaskList
