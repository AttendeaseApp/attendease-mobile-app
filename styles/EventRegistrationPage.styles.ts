import { StyleSheet } from 'react-native'

/*
Styles for the Event Registration Page
*/
export default StyleSheet.create({
    infoSection: {
        marginBottom: 16,
    },
    eventRegistrationInfoSection: {
        marginBlock: 20,
    },
    label: {
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    fixedButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
    },
    locationLoadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    locationLoadingText: { marginLeft: 8, color: '#666' },
    buttonWrapper: { marginTop: 24 },
    pingStatusContainer: {
        flexDirection: 'column',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    pingStatusText: {
        flex: 1,
        fontWeight: '600',
    },
    lastPingText: {
        marginTop: 4,
        position: 'absolute',
        bottom: -16,
        right: 12,
    },
})
