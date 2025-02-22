import { TextInput, Text, StyleSheet, View} from 'react-native';



function Formx ({data , attr,  placeholder, validationError}) {
    return (
        <View>
        <TextInput 
            onChangeText={(val) => {data[attr] = val}}
            style={styles.input}
            placeholder= {placeholder}/>
        <Text style = {{color: "red"}}>{validationError || null}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        height: 33, 
        marginTop: 10, 
        borderWidth: 1, 
        writingDirection: "rtl",
        paddingRight: 2
      }
})


export default Formx

