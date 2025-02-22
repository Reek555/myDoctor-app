import { StyleSheet, Text, TextInput, View, CheckBox, Button, Alert, FlatList, Modal, ScrollView} from 'react-native';
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem  } from '@rneui/themed';
import Frame from '../components/frame';
import { useState } from 'react';
import MapView, {Marker} from 'react-native-maps'
import BASE_URL from '../config/urls';
import React from 'react';





function DoctorsList () {
    const [dList , setDlist] = useState([])
    const [isVisible, setVisible] = useState(false)
    const [modalContent, setContent] = useState()
    const [location, setLocation] = useState({})

    function pressHandler(user) {

      let content = <Frame data = {user}/>

      setVisible(true)
      setContent(content)
      setLocation({lat: user.latitude, long: user.longitude})
      //setLocation({lat: user.latitud, long: user.long})
    }

    async function changeHandler(val) {
      const token = await AsyncStorage.getItem("token")

      axios.get (`${BASE_URL}/search?q=${val}`,{
        headers: {
          "Authorization": token
        }
      })
      .then(
        res => setDlist(res.data)
      )
    }

    return (
      <ScrollView>
        <TextInput placeholder = "ابحث عن طبيب" style = {styles.search} onChangeText={changeHandler}></TextInput>
          {
            dList.map( (i, key)=> <ListItem key = {key} onPress={() => pressHandler (i)} style = {styles.listItem}><Text>{i.name}</Text></ListItem>)
          }
        <Modal
          animationType="slide"
          transparent={false}
          visible={isVisible}
          onRequestClose={null}
          >
            <View>
              {modalContent}

{              <MapView
                style= {styles.map}
                initialRegion={{
                  latitude: location.lat|| 37.78825,
                  longitude: location.long || -122.4324, 
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                >
                    <Marker
                      coordinate = {{
                      latitude : location.lat|| 37.78825,
                      longitude: location.long || -122.4324
                      }}
                      title = "this is a marker"/>

              </MapView>
               }
              <View style = {styles.button}>
                <Button  onPress = {() => setVisible(false)} title = "go back"></Button>
              </View>
              </View>

        </Modal>

      </ScrollView>
    )
      }



const styles = StyleSheet.create({
  search: {
    borderWidth: 2,
    height: 30,
    width: "85%", 
    marginTop: 10,
    marginLeft: "7.5%",
    marginBottom: 10, 
    paddingLeft: "3%", 
    writingDirection: "rtl"
  }, 
  listItem: {
    width: "85%", 
    marginLeft: "7.5%", 
    borderBottomWidth: 1, 
    borderBlockColor: "black"

  }, 
  map: {
    width: "85%", 
    height: "30%",
    marginLeft: "7.5%"
  }, 
  button: {
    width: "85%",
    marginLeft: "7.5%", 
    height: 33, 
    marginTop: 10,
    marginBottom: 20

  }
})


export default DoctorsList; 