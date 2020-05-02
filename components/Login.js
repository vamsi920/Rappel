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
  AsyncStorage,
  Alert
} from "react-native";
import Iconf from "react-native-vector-icons/Fontisto";
import { width, height, totalSize } from "react-native-dimension";
import firebase from 'firebase';
export default class Login extends Component{
  static navigationOptions = { header: null };
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      inputUsername:'',
      inputPassword:'',
      nameOfUser:'',
      loading: false,
       Email: null,
        Pass: null ,
        

    }
  }
  handleLogin=()=>{
    firebase.auth().signInWithEmailAndPassword(this.state.inputUsername, this.state.inputPassword)
  .then((res)=>{console.log(res); this.props.navigation.navigate("Home")})
  .catch(error=>{console.log(error);
    if (error.code === 'auth/invalid-email') {
    console.log('That email address is invalid!');
    alert("email doesnot exist please signup");
    this.props.navigation.navigate("Signup");
    
  }

})
  
  }
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
        <View style={{ height:height(40), justifyContent: "space-between", marginTop:height(20) }}>
          <View style={styles.box}>
            <View style={styles.input}>
              <TextInput style={styles.txt} placeholder="Email" onChangeText={inputUsername => this.setState({inputUsername})}/>
            </View>
            <View style={styles.input}>
              <TextInput
                style={styles.txt}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={inputPassword => this.setState({inputPassword})}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 80,
                marginTop: 25,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View style={{ marginLeft: "10%" }}>
                <Text
                  style={{  color: "#574F75", fontSize: 20 ,}}
                >
                  {" "}
                  Sign In{" "}
                </Text>
              </View>
              <View
                style={{ alignItems: "flex-end", flex: 1, marginRight: "10%" }}
              >
                <TouchableOpacity
                  style={styles.circle}
                  onPress={()=>{
                      this.handleLogin()
                  }}
                >
                  <Iconf name="arrow-right-l" color="#fff" size={22} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              height: height(30),
              marginBottom: 15,
              alignItems: "space-between", 
              justifyContent: "center",

            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                elevation: 2,
                justifyContent: "center",
                marginLeft: "6%"
              }}
              onPress={() => {
               this.props.navigation.navigate("Signup")
              }}
            >
              <Text
                style={{
                 
                  color: "#574F75",
                  fontSize: 20,
                  textDecorationLine: "underline"
                }}
              >
                {" "}
                Sign Up{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height(100),
    backgroundColor:'#f1f1f1'
  },
  input: {
    alignItems: "center",
    margin: 5
  },
  txt: {
    height: 70,
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
    backgroundColor: "#574F75",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2
  },
  box:{
    elevation:1,
    backgroundColor:'#fff',
    borderRadius:10,
    width:'80%',
    marginLeft:'10%'
  }
});