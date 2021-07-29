import React from 'react';
import { StyleSheet, Image, View, ScrollView , Text} from 'react-native';

const images = [
    '../home-icons/article-bg.png',
    '../home-icons/article-bg.png',
    '../home-icons/article-bg.png',
    '../home-icons/article-bg.png', 
]

const ArticleCarousel = () => {
    state = {
        active: 0
    }
    
    change = ({nativeEvent}) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if(slide !== this.state.active){
            this.setState({active: slide});
        }
    }
    return (
        <View style={styles.footerFourView}>
            <ScrollView showsHorizontalScrollIndicator={false} pagingEnabled onScroll={this.change} horizontal style={styles.srollViewStyles}>  
                {
                    images.map((image, index) => (
                        <Image
                            key={index}
                            source={require(image)}
                            style={styles.footerFourView}/>
                    ))
                }
            </ScrollView>
            <View style={styles.dotView}>{
                images.map((i, k) => (
                    <Text key={k} style={k==this.state.active ? style.activedot : styles.dot}>⬤</Text>
                ))
            }
            </View>    
        </View>
    )
}

export default ArticleCarousel;

const styles = StyleSheet.create({
    footerFourView:{
        flexDirection: 'row',
        marginBottom: 15,
        width: 120, 
        height: 120
    },
    imageStyles:{
        width: 100, 
        height: 100, 
        resizeMode: 'contain'
    },
    dotView:{
        flexDirection: "row", 
        alignSelf: 'center', 
        bottom: 0
    },
    dot:{
        color: '#9BBEAE'
    },
    activedot:{
        color: '#1BA665'
    },
});
