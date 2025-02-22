import { StyleSheet, Text, TextInput, View, CheckBox, Alert, FlatList, Button, ActivityIndicator} from 'react-native';
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import Icon from "react-native-vector-icons/FontAwesome"
import Formx from "../components/form"
import BASE_URL from '../config/urls';


/*         <TextInput
          onChangeText={(val) => password = val}
          style={styles.input}
          placeholder= "كلمة المرور"/> */



const data = {
  email: "", 
  password: ""
}

function LogIn ({navigation}) {

    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const pressHandler = () => {
          //navigation.navigate("afterLogIn")
          setLoading(true)
          //let data =  {email: email, password: password}
          axios({
            method: 'post',
            url: `${BASE_URL}/login`,  //http://192.168.1.7:3000/login
            data: data
          })
          .then(async (res) => {
            await AsyncStorage.setItem("token", res.data.token);
            setError(null)
            setLoading(false)
            navigation.push("Home")
          })
          .catch(
            err => {
            console.log(err)
            setError(err.response.data)
            setLoading(false)
            })
          }
  
    return (
      <View style = {styles.container}>
      {isLoading? <ActivityIndicator size = {75} color = "blue"/> : null}
      <Icon raised name = "sign-in" type = "font awesome" color = "#f50" size = {50}/>
      <Text style = {{fontSize: 20}}> تسجيل الدخول</Text>

      <View style = {styles.inputContainer}>

        <Formx data = {data} attr = "email" placeholder= "البريد الإلكتروني" validationError={error}/>
        <Formx data = {data} attr = "password" placeholder= "كلمة المرور" validationError={error}/>


      </View>

      <View style = {styles.submitButton} >
          <Button  onPress= {pressHandler} title = "دخول"></Button>
      </View> 

      </View>
  
    )
  }




  const styles = StyleSheet.create({
    container: {
      marginTop: 20, 
      flex: 1, 
      alignItems: 'center'
    }, 
    inputContainer: {
      width: "80%"
    }, 
    checkbox: {
        flexDirection: "row", 
        justifyContent: "center",
        alignItems: "center", 
        marginTop: 10
                },

    input: {
      height: 33, 
      marginTop: 10, 
      borderWidth: 1, 
      writingDirection: "rtl",
      paddingRight: 2
    }, 
    submitButton: {
      width: "80%", 
      height: 33, 
      marginTop: 10,
      marginBottom: 20

    }, 
    error: {
      color: "red",
      fontSize: 20, 
      marginTop: 10
    }

 });



  
export default LogIn; 
