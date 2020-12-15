import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: "#5c8599",
        fontSize: 24,
        marginBottom: 25,
        marginTop: 25
    },
    separator: {
        height: 0.8,
        width: '100%',
        backgroundColor: "#d3e2e6",
        marginBottom: 20    
    },
    label: {
        color: "#5c8599",
        lineHeight: 24,
        marginBottom: 8
    },
    input: {
        height: 56,
        backgroundColor: "#fff",

        borderWidth: 1.4,
        borderColor: "#d3e2e6",
        borderRadius: 20,

        paddingVertical: 18,
        paddingHorizontal: 24,

        marginBottom: 16
    },
    pictureButton: {
        backgroundColor: "#fff",
        height: 50,
        
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#96d2f0",
        borderStyle: 'dotted',

        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadedImagesContainer: {
        flexDirection: 'row',
    },
    uploadedImages: {
        width: 64,
        height: 64,
        borderRadius: 28,
        marginBottom: 32,
        marginRight: 8
    },
    openOnWeekendsContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    nextButton: {
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
    },
    nextButtonText: {
        fontSize: 16,
        color: "#fff"
    },
})

export default styles