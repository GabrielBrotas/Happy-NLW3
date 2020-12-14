import {Dimensions, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imagesContainer: {
        height: 240
    },
    image: {
        width: Dimensions.get('window').width,
    },
    detailsContainer: {
        padding: 24
    },
    title: {
        color: "#4d6f88",
        fontSize: 38,
    },
    description: {
        color: "#5c8599",
        lineHeight: 24,
        marginTop: 16
    },
    mapContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1.2,
        borderColor: '#b3dae2',
        marginTop: 48,
        backgroundColor: '#e6f7fb'
    },
    mapStyle: {
        width: '100%', 
        height: 150
    },
    routesContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    routesText: {
        color: "#0089a5"
    },
    separator: {
        height: 0.8,
        width: '100%',
        backgroundColor: "#d3e2e6",
        marginVertical: 40
    },
    scheduleContainer: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    scheduleItem: {
        width: '48%', 
        padding: 20
    },
    scheduleItemBlue: {
        backgroundColor: '#e6f7fb',
        borderWidth: 1,
        borderColor: '#83dae2',
        borderRadius: 20
    },
    scheduleItemGreen: {
        backgroundColor: '#edfff6',
        borderWidth: 1, 
        borderRadius: 20,
        borderColor: '#a1e9c5'
    },
    scheduleText: {
        fontSize: 16,
        lineHeight: 24,
        marginTop: 20
    },
    scheduleTextBlue: {
        color: "#5c8599"
    },
    scheduleTextGreen: {
        color: "#37c77f"
    },
    contactButton: {
        backgroundColor: "#3cdc8c",
        borderRadius: 28,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 40
    },
    contactButtonText: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 16
    }
})

export default styles