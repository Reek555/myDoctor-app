import { Dialog, ListItem  } from '@rneui/themed';
import { StyleSheet, Text, View} from 'react-native';



function Box ({title, text, action, visibleVar, setVisibleFunc}) {

    return (
    <Dialog  isVisible = {visibleVar} onBackdropPress={() => setVisibleFunc(false)}>
        <Dialog.Title title= {title}/>
        <Text>{text}</Text>
        <View style ={styles.style}>
          <Dialog.Button title="تأكيد" onPress={action}/>
          <Dialog.Button title="إلغاء" onPress={() => setVisibleFunc(false)}/>
        </View>
    </Dialog>
    )
}


const styles = StyleSheet.create({
    style: {
        flexDirection: "row", 
        gap: 154, 
        marginTop: 15
    }
})

export default Box; 