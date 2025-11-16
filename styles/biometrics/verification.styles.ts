import { StyleSheet } from 'react-native'

const PRIMARY_COLOR = '#E1CE7A'
const WHITE = '#FFFFFF'
const BLACK = '#000000'
const OVERLAY_BG = 'rgba(0, 0, 0, 0.6)'

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: BLACK },
    camera: {
        flex: 1,
        width: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 50,
    },
    faceFrame: {
        width: 300,
        height: 350,
        borderWidth: 3,
        borderColor: WHITE,
        borderRadius: 175,
        backgroundColor: 'transparent',
        borderStyle: 'dashed',
        position: 'absolute',
        top: '50%',
        marginTop: -175,
    },
    instructionBox: {
        backgroundColor: OVERLAY_BG,
        padding: 18,
        borderRadius: 12,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    instructionText: {
        textAlign: 'center',
        fontWeight: '600',
    },
    controls: {
        width: '90%',
        alignItems: 'center',
    },
    buttonStylePrimary: {
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 18,
        paddingHorizontal: 30,
        borderRadius: 12,
        width: '100%',
        shadowColor: PRIMARY_COLOR,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: WHITE,
    },
    loadingIndicator: {
        marginBottom: 10,
    },
    loadingText: {
        marginTop: 10,
        fontWeight: '600',
    },
    permissionText: {
        marginBottom: 20,
        textAlign: 'center',
    },
})
