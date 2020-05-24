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
import {firebaseConfig} from "./config.js"
//import MapCheck from './components/MapCheck.js';
export class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      loggedIn:false,
    }
  }
    componentWillMount(){
        
          if (!firebase.apps.length) {
            		firebase.initializeApp(firebaseConfig)
                }  
                firebase.auth().onAuthStateChanged((user) => {
                  
                  if(user){
                    this.setState({ loggedIn: true})
                  } else {
                    this.setState({loggedIn: false})
                  }
              });
              
    }

    static navigationOptions = { header: null };
    render() {
        return (
            <View style={styles.container}>
                {(this.state.loggedIn==false)?(<LoginContainer/>):( <AppContainer/>)}
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
      // Login:Login,
      // Signup:Signup,
    },
    {
      initialRouteName: "Home"
    }
  );
  const LoginStack=createStackNavigator(
    {
      Login:Login,
      Signup:Signup,
    },
    {
      initialRouteName:"Login"
    }
  );
  const AppContainer = createAppContainer(RootStack);
  const LoginContainer = createAppContainer(LoginStack);
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
   
  });
export default App
