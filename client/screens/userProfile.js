import { StyleSheet, Text, TextInput, View, CheckBox, Button, Alert, FlatList, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Dialog, ListItem  } from '@rneui/themed';
import Frame from '../components/frame';
import Box from '../components/box';
import { SocialIcon } from '@rneui/base';
import BASE_URL from '../config/urls';


function UserProfile ({navigation}) {
    const [data, setdata] = useState({})
    const [isVisible, setVisible] = useState(false)
    const [isVisible1, setVisible1] = useState(false)


    useEffect (() => { (async () => {
      const token = await AsyncStorage.getItem("token")
      await axios.get(`${BASE_URL}/me`, {
        headers: {
          "Authorization": token
        }
      }).then (
        res => {
          setdata(res.data[0])
        }
      )
    })()}, []) 


    async function logOutHandler () {
      await AsyncStorage.removeItem("token")
      setVisible(false)
      navigation.push("Home")
    }

    async function deleteHandler () {
      const token = await AsyncStorage.getItem("token")
      await axios.get(`${BASE_URL}/delete`, {
        headers: {
          "Authorization": token
        }})
      await AsyncStorage.removeItem("token")
      setVisible1(false)
      navigation.push("Home")
    }



    return (
        <ScrollView>
        <View style = {styles.container}>
            <Frame data = {data} arg = {setVisible1}></Frame>

            <View style = {styles.button}>
              <Button title = "تسجيل الخروج" onPress={ () => setVisible(true)} ></Button>
            </View>

            <Box 
            title = "تسجيل الخروج" 
            text = "هل أنت متأكد؟" 
            action = {logOutHandler} 
            visibleVar={isVisible} 
            setVisibleFunc={setVisible}/>

            <Box 
              title = "حذف الحساب"
              text = "هل أنت متأكد؟" 
              action = {deleteHandler} 
              visibleVar={isVisible1} 
              setVisibleFunc={setVisible1}
            />
        </View>
        </ScrollView>
    )
  }



let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    width: "85%", 
    marginLeft: "7.5%", 
    marginBottom: 20
  },

})  

export default UserProfile; 