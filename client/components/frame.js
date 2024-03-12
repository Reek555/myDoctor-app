import { ScrollView, StyleSheet, Text, View} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome"
import { ListItem  } from '@rneui/themed';


function Frame ({data, arg}) {

    function info () {

        let items = Object.entries(data)
        items = items.filter(i => {return !["name", "latitude", "longitude"].includes(i[0])})
        return (
          items.map((item, key) => <ListItem key = {key}><Text style = {{fontWeight: "bold"}}>{`${item[0]}: ${item[1]}`}</Text></ListItem>)
        )
  
      }
  
      function firstLetters (name) {
        try{
          name = name.split(" ")
          name = name.map ( i => i[0])
          name = name.join(' ')
          return name
        }
        catch {
          null
        }
  
      }


    return (
        <>
        <View style = {styles.header}>
            <View style = {{marginLeft: "3%"}}>
                {arg? <Icon name = "trash" type = "font awesome" color = "#f50" size = {30} style = {{marginTop: -2}} onPress = {() => arg(true)}></Icon> : null}
            </View>
            <View style = {styles.pair}>
                <Text style = {styles.text}> {data.name} </Text>
                <View style = {styles.nameIcon}>
                <Text style = {styles.text1}> {firstLetters(data.name)} </Text>
                </View>
            </View>
        </View>
            <View style = {styles.list}>
            {info()}
            </View>
        </>
    )
}


let styles = StyleSheet.create({

    header: {
      backgroundColor: "white", 
      flexDirection: "row", 
      alignItems: "center", 
      height: 68
        },
    pair: {flex: 1, 
      flexDirection: "row", 
      justifyContent: "flex-end", 
      alignItems: "center", 
      marginRight: "3%"
    }, 
    nameIcon: {
      width: 50, 
      height: 50,
      borderWidth: 2, 
      borderRadius: 100, 
      backgroundColor: "black"    //transform: "scale(3)"
    }, 
    text: {
      fontSize: 25, 
      marginRight: 17
    },
    text1: {
      color: "white", 
      fontSize: 25,
    }, 
    list: {
    margin: "7.5%",
    width: "85%"
  }
})

export default Frame; 