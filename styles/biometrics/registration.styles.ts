import { StyleSheet } from 'react-native'

const PRIMARY_COLOR = '#E1CE7A'
const WHITE = '#FFFFFF'
const BLACK = '#000000'
const OVERLAY_BG = 'rgba(0, 0, 0, 0.6)'

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: BLACK },
    camera: { flex: 1 },
    overlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 40,
    },
    instructionBox: {
        backgroundColor: OVERLAY_BG,
        padding: 18,
        borderRadius: 12,
        marginHorizontal: 20,
        marginBottom: 30,
        alignItems: 'center',
    },
    instructionText: {
        color: WHITE,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '700',
    },
    progressCounter: {
        color: PRIMARY_COLOR,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 6,
        fontWeight: '600',
    },
    faceFrame: {
        width: 300,
        height: 350,
        borderWidth: 3,
        borderColor: PRIMARY_COLOR,
        borderRadius: 175,
        backgroundColor: 'transparent',
        borderStyle: 'dashed',
        marginTop: 50,
    },
    progressIndicators: {
        position: 'absolute',
        top: 450,
        flexDirection: 'row',
        gap: 8,
    },
    progressDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,0.4)',
    },
    progressDotActive: {
        backgroundColor: PRIMARY_COLOR,
    },

    controls: {
        backgroundColor: BLACK,
        paddingBottom: 40,
        paddingHorizontal: 24,
        paddingTop: 16,
        gap: 12,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: WHITE,
    },
    permissionText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: BLACK,
        fontWeight: '600',
    },
    helpText: {
        color: '#A0AEC0',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
    },
})
