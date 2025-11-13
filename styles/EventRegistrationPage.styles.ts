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
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    fixedButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    value: { fontSize: 16 },
    locationLoadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    locationLoadingText: { marginLeft: 8, color: '#666' },
    buttonWrapper: { marginTop: 24 },

    pingStatusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        borderLeftWidth: 5,
        borderLeftColor: '#4CAF50',
    },
    pingStatusText: {
        marginLeft: 10,
        flex: 1,
        color: '#388E3C',
        fontSize: 14,
        fontWeight: '600',
    },
    lastPingText: {
        fontSize: 12,
        marginTop: 4,
        color: '#66BB6A',
        position: 'absolute',
        bottom: -16,
        right: 12,
    },
})
