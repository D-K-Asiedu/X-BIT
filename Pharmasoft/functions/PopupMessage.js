import { showMessage } from "react-native-flash-message";


export default popupMessage = (title, description, type, duration, position, titleStyle, style) => {
    showMessage({
        message: title,
        description: description || '',
        type: type,
        floating: true,
        icon: 'auto',
        duration: duration,
        position: {
            top: 30,
            ...position
        },
        titleStyle: {
            fontSize: 16,
            ...titleStyle
        },
        style: {
            ...style
        }
    });
}