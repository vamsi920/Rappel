import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  StatusBar,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import Iconf from "react-native-vector-icons/Fontisto";
import { width, height, totalSize } from "react-native-dimension";
import firebase from 'firebase';
export default class Signup extends Component{
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      email:'',
      phoneNumber:'',
    }
  }
//   setUsername=(value)=>{
//     AsyncStorage.setItem('username',value);
//     this.setState({'username': value})
//   }
//   setPassword=(value)=>{
//     AsyncStorage.setItem('password',value);
//     this.setState({'password': value})
//   }
//   setEmail=(value)=>{
//     AsyncStorage.setItem('email',value);
//     this.setState({'email': value})
//   }
//   setPhoneNumber=(value)=>{
//     AsyncStorage.setItem('phoneNumber',value);
//     this.setState({'phoneNumber': value})
//   }
//   componentDidMount=()=>{
//     AsyncStorage.getItem('username').then((value)=>this.setState({'username':value}));
//     AsyncStorage.getItem('email').then((value)=>this.setState({'email':value}));
//     AsyncStorage.getItem('phoneNumber').then((value)=>this.setState({'phoneNumber':value}));
//     AsyncStorage.getItem('password').then((value)=>this.setState({'password':value}));
    
//   }
handleSignup=  ()=>{
   firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
  .then( (res)=>{
    firebase.database().ref(`UsersList/`).push({
      email:this.state.email, 
      name:this.state.username,
    }).catch(err=>console.log(err))
    this.props.navigation.navigate("Login");alert("user created, please login again");console.log(res); 
  
})
  .catch(error=>console.log(error))
}
  static navigationOptions = { header: null };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />

        <View
          style={{ height:height(40),width:width(100) , alignItems: "center", position:'absolute', backgroundColor:'#574F75',}}
        >
          <Text
            style={{ fontFamily: "Barriecito-Regular", fontSize: 50, color: "#fff" , marginTop:height(5)}}
          >
            {" "}
            Rappel{" "}
          </Text>
        </View>
        <View style={{ height:height(60), justifyContent: "space-between", marginTop:height(20) }}>
          <View style={styles.box}>
            <View style={styles.input}>
              <TextInput style={styles.txt} placeholder="Name" onChangeText={username=>this.setState({username})}>{this.state.username}</TextInput>
            </View>
            <View style={styles.input}>
              <TextInput style={styles.txt} placeholder="Email" onChangeText={email=>this.setState({email})}>{this.state.email}</TextInput>
            </View>
            <View style={styles.input}>
              <TextInput
                style={styles.txt}
                placeholder="should be more than 6 characters"
                secureTextEntry={true} onChangeText={password=>this.setState({password})}>{this.state.password}</TextInput>
              
            </View>
            <View style={styles.input}>
              <TextInput style={styles.txt} placeholder="Phone Number" onChangeText={phoneNumber=>this.setState({phoneNumber})}>{this.state.phoneNumber}</TextInput>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: "35%",
                marginTop: 5,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View style={{ marginLeft: "10%" }}>
                <Text
                  style={{  color: "#574F75", fontSize: 20 }}
                >
                  {" "}
                  Sign Up{" "}
                </Text>
              </View>
              <View
                style={{ alignItems: "flex-end", flex: 1, marginRight: "10%" }}
              >
                <TouchableOpacity
                  style={styles.circle}
                  onPress={() => {this.handleSignup()}}
                >
                  <Iconf name="arrow-right-l" color="#fff" size={22} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </View>
          <View style={{ height:height(13),alignItems:'center',
    justifyContent:'flex-end',
    }}>
            <View style={styles.text}>
            <Text> have an account</Text>
          </View>
          <TouchableOpacity onPress={()=>{
              this.props.navigation.navigate("Login")
          }}><Text style={{textDecorationLine:'underline'}}>Login</Text></TouchableOpacity>
        </View>
          
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height(100),
    backgroundColor:'#f2f2f2'
  },
  input: {
    alignItems: "center",

  },
  txt: {
    height: 60,
    width: "75%",
    // backgroundColor:'#f7f7f7',
    borderBottomColor: "#c9c7c7",
    borderBottomWidth: 2,
    fontSize: 15
  },
  circle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    // backgroundColor:'#202121',
    backgroundColor: "#574F75",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2
  },
  box:{
    elevation:1,
    borderRadius:10,
    width:'80%',
    marginLeft:'10%',
    paddingTop:10,
    backgroundColor:'#fff'
  }
});