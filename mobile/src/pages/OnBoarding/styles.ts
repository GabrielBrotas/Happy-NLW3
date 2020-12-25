import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start', 
        marginTop: 20, 
        alignItems: 'flex-start', 
        padding: 30
    },
    title: {
        color: "#0089A5", 
        fontWeight: '800', 
        fontSize: 40, 
        lineHeight: 40, 
        textAlign: 'left', 
        width: 200
    },
    subtitle: {
        color: "#5C8599", 
        fontWeight: '600', 
        fontSize: 20, 
        textAlign: 'left', 
        width: 300
    },
    nextButton: {
        backgroundColor: '#D1EDF2',
        borderRadius: 20,
        width: 54,
        height: 54,
        marginRight: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dots: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: 30,
        right: 90
    },
    activeDot: {
        height: 7,
        width: 25,
        backgroundColor: "#ffd152",
        borderRadius: 4,  
    },
    disabledDot: {
        height: 7,
        width: 15,
        backgroundColor: "#becfd8",
        borderRadius: 4,
    },
    dotLeft: {
        marginRight: 50 
    },
    dotRight: {
        marginRight: 50
    }
})

export default styles