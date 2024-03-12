import { StyleSheet, Text, TextInput, View, Alert, FlatList, Button, ActivityIndicator, ScrollView} from 'react-native';
import { useState, useEffect } from 'react';
import Icon from "react-native-vector-icons/FontAwesome"
import axios from "axios" 
import * as Location from 'expo-location';
import {CheckBox} from '@rneui/themed';
import Formx from '../components/form';
import BASE_URL from '../config/urls';



const data = {
  name: "",
  email: "",
  password: "",
  latitude: null,
  longitude: null,
  specialization: "",
  workingHours: "",
  phone: "",
  address: ""
}


function Register ({navigation}) {
    const [isSelected, setSelected] = useState(false); 
    const [validationErrors, setValidationErrors] = useState({})
    const [isLoading, setLoading] = useState(false)

  
    useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        data.latitude = location.coords.latitude
        data.longitude = location.coords.longitude
      })();
    }, []);

    let userType = isSelected? "doctor": "normal"


    const fetchData = () => {
      setLoading(true)
      data.userType = userType


      axios({
        method: 'post',
        url: `${BASE_URL}/register`, 
        data: data

      }).then((res) => {
          setValidationErrors({})
          setLoading(false)
          navigation.navigate("logIn")
        }
      )
      .catch (
        (err) => {
          setValidationErrors(err.response.data)
          setLoading(false)
        })
      }
    
    let profileForm = <View style = {styles.inputContainer}>

              <Formx data = {data} attr = {"specialization"} placeholder = "التخصص" validationError = {validationErrors["specialization"]}/>
              
              <Formx data = {data} attr = {"workingHours"} placeholder = "ساعات العمل" validationError = {validationErrors["workingHours"]}/>

              <Formx data = {data} attr = {"address"} placeholder = "العنوان" validationError = {validationErrors["address"]}/>

              <Formx data = {data} attr = {"phone"} placeholder = "الهاتف" validationError = {validationErrors["phone"]}/>

               </View>

  
    return (
      <ScrollView>
      <View style = {styles.container}>
        {isLoading? <ActivityIndicator size = {75} color = "blue"/> : null}

        <Icon raised name = "user" type = "font awesome" color = "#f50" size = {50}/>
        <Text style = {{fontSize: 20}}>تسجيل حساب جديد</Text>
        
        <View style = {styles.inputContainer}>

        <Formx data = {data} attr = {"name"} placeholder = "الإسم" validationError = {validationErrors["name"]}/>

        <Formx data = {data} attr = {"email"} placeholder = "البريد الإلكتروني" validationError = {validationErrors["email"]}/>

        <Formx data = {data} attr = {"password"} placeholder = "كلمة المرور" validationError = {validationErrors["password"]}/>

        </View>

        <View style = {styles.checkbox}>
          <CheckBox checked = {isSelected} onPress = {() => setSelected(!isSelected)}></CheckBox>
          <Text style = {{fontSize: 18}}>أنا طبيب</Text>
        </View>

        {isSelected? profileForm : null}


        <View style = {styles.submitButton} >
          <Button  onPress= {fetchData} title = "تسجيل"></Button>
        </View>
  
    
      </View>
      </ScrollView>
    );
  
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

    }
    

 });



export default Register;