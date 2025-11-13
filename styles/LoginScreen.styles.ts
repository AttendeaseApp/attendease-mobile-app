import { StyleSheet } from 'react-native'

/* 
Styles for the Login Screen
*/
export const styles = StyleSheet.create({
    header: {
        marginBottom: 24,
        gap: 3,
    },
    background: {
        flex: 1,
        padding: 25,
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '100%',
        justifyContent: 'center',
        paddingInline: 20,
        paddingBlock: 42,
        maxWidth: 400,
        borderRadius: 11,
        marginVertical: 48,
        gap: 12,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
})

export default styles
