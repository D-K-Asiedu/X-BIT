import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
    ImageBackground
} from 'react-native'

const ArticleCard = ({title, link, image}) => {

    // Styles
    const styles = StyleSheet.create({
        card: {
            borderRadius: 20,
            margin: 5,
        
            backgroundColor: '#f2f2f2',
            elevation: 1
          },        
    })

    return (
        <TouchableOpacity>
            <ImageBackground
                // style={styles.card}
                source={{ uri: image }}
                imageStyle={{ borderRadius: 20 }}
            >
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default ArticleCard