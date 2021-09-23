import { StyleSheet } from "react-native"
import { globalColours } from "./global"

export const loginRegStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: globalColours.mainCol,
      },
      imgBox: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        flex: 1,
      },
      image:{
        width: '75%',
        height: '75%',
      },
      skipBtn:{
        position: 'absolute',
        top: 40,
        right: 10,
      },
      skipText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fbbc05',
        padding: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 10,
      },
      content: {
        justifyContent: 'center',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        backgroundColor: '#f2f2f2',
      },
      h2: {
        fontSize: 24,
        fontWeight: 'bold',
        color: globalColours.darkBlue,
        paddingVertical: 10,
        textAlign: 'center',
      },
      contentCard: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        paddingVertical: 20,
        paddingHorizontal: 20,
      },
      bottomBox:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
      },
      bottomText:{
        fontSize: 16,
      },
      bottomLink:{
        fontSize: 18,
        fontWeight: 'bold',
      }    
})