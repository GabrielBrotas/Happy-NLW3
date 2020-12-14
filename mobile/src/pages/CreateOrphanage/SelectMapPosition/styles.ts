import {Dimensions, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    nextButton: {
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,

        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 40
    },
    nextButtonText: {
        fontSize: 16,
        color: "#fff"
    }
})

export default styles