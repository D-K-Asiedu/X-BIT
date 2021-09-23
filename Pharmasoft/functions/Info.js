import PopupMessage from "./PopupMessage"
import { Alert } from "react-native";

export default info = (title, desc) => {
    PopupMessage(
        title,
        desc,
        'warning',
        2000,
        {top:30},
        {},
        {backgroundColor: '#696969'}
    )
        // Alert.alert(
        //   title,
        //   desc,
        //   [{text: 'OK', onPress: () => {}}],
        //   {cancelable: false},
        // );
}

