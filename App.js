import React, { Component } from 'react'
import { Text, View , StyleSheet} from 'react-native'
import firebase from 'firebase';
import {  createAppContainer } from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';
import TaskList from './components/TaskList.js';
import AddTask from './components/AddTask.js';
import Home from './components/Home.js';
import EditTask from './components/EditTask.js';
import CentreOfRoom from './components/CentreOfRoom.js';
import AddArea from './components/AddArea.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
//import MapCheck from './components/MapCheck.js';
export class App extends Component {
    componentWillMount(){
        var firebaseConfig = {
            apiKey: "AIzaSyDMO13hWHR2UWeM7vZVAYxH0RRaZHN8Vpg",
            authDomain: "rappel-265905.firebaseapp.com",
            databaseURL: "https://rappel-265905.firebaseio.com",
            projectId: "rappel-265905",
            storageBucket: "rappel-265905.appspot.com",
            messagingSenderId: "311426119745",
            appId: "1:311426119745:web:a9b7cfe4e31a8b3d696ec0",
            measurementId: "G-6JD4E37BW7"
          };
          if (!firebase.apps.length) {
            		firebase.initializeApp(firebaseConfig)
                }  
    }
    static navigationOptions = { header: null };
    render() {
        return (
            <View style={styles.container}>
                <AppContainer/>
            </View>
        )
    }
}
const RootStack = createStackNavigator(
    {
      TaskList:TaskList,
      AddTask:AddTask,
      Home:Home,
      EditTask:EditTask,
      //MapCheck:MapCheck,
      CentreOfRoom:CentreOfRoom,
      AddArea:AddArea,
      Login:Login,
      Signup:Signup,
    },
    {
      initialRouteName: "Home"
    }
  );
  const AppContainer = createAppContainer(RootStack);
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
   
  });
export default App
