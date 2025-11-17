import { StyleSheet } from 'react-native'

/*
Styles for the Event Registration Page
*/
export default StyleSheet.create({
    infoSection: {
        marginBottom: 16,
    },
    eventRegistrationInfoSection: {
        marginTop: 100,
        gap: 8,
    },
    fixedButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
    },
    locationLoadingContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        gap: 8,
        margin: 8,
    },
    buttonWrapper: { marginTop: 24 },
    pingStatusContainer: {
        flexDirection: 'column',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#D2CCA1',
    },
    pingStatusText: {
        flex: 1,
        fontWeight: '600',
        color: '#D2CCA1',
    },
    lastPingText: {
        marginTop: 4,
        position: 'absolute',
        bottom: -16,
        right: 12,
        color: '#D2CCA1',
    },
})
