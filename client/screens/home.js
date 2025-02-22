import { StyleSheet, Text, TextInput, View, CheckBox, Button, Alert, FlatList, ImageBackground} from 'react-native';
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import BASE_URL from '../config/urls';




function Home ({navigation}) {

    const [isIn, setIn] = useState(false)

    useEffect( ()=> { 

      async function getToken( ){
        const token = await AsyncStorage.getItem("token")
        axios.get(`${BASE_URL}/me`,
        {
          headers: {
            "Authorization": token
          }
        }
        ).then (
          res => setIn (true)
        ).catch (
          err => null
        )
  
      }
      getToken()

    }, []) 


/*     async function getToken( ){
      const token = await AsyncStorage.getItem("token")
      axios.get(`${BASE_URL}/me`,
      {
        headers: {
          "Authorization": token
        }
      }
      ).then (
        res => setIn (true)
      )

    }
    getToken()
     */
    return (
      
      <ImageBackground style = {styles.image} source={require("../assets/male-doctor.webp")}>
          <View style = {{flex: 1, justifyContent: "center", alignItems: "center", gap: 27}}>
          <Text style = {styles.text}>أهلاً بك في تطبيق طبيبي</Text>
          { isIn?
          <View style  ={styles.button}>          
            <Button title = "الحساب" onPress = {() => navigation.push("userProfile")} style = {{width: 50, height: 100, backgroundColor: "blue"}}></Button>
            <Button title = "قائمة الأطباء" onPress = {() => navigation.navigate("DoctorsList")} style = {{width: 50, height: 100, backgroundColor: "blue"}}></Button>

          </View>
          :
          <View style  ={styles.button}>
          <Button title = "إنشاء حساب" onPress = {() => navigation.navigate("Register")} style = {{width: 50, height: 100, backgroundColor: "blue"}}></Button>
          <Button title = "تسجيل الدخول" onPress = {() => navigation.navigate("logIn")} style = {{width: 50, height: 100, backgroundColor: "blue"}}></Button>
          </View>}
          </View>
          
      </ImageBackground>
  
    )
  }

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width:"100%", 
    height: "100%"
  }, 
  button: {
    gap: 5
    }, 
  text: {
      color: "blue", 
      fontSize: 33, 
      fontWeight: "bold"
    }
}) 


  export default Home; 