import * as React from 'react';
import { View } from 'react-native';
import { SvgUri } from 'react-native-svg';

const Avatar = ({ name, style }) => {
    return (
        <View style={{
            ...style
        }}>
            <SvgUri
                width="100%"
                height="100%"
                uri={`https://avatars.dicebear.com/api/identicon/${name}.svg`}
            />
        </View>
    )
}

export default Avatar
