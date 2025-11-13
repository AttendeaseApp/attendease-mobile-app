import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    overlay: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    instructionText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        marginBottom: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        alignItems: 'center',
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 10,
    },
    permissionText: {
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
})

export default styles
