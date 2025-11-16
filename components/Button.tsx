import React from 'react'
import { ThemedText } from './ThemedText'
import {
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
    StyleProp,
} from 'react-native'

type ButtonProps = {
    title: string
    onPress: () => void
    loading?: boolean
    disabled?: boolean
    style?: StyleProp<ViewStyle>
}

export const Button = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    style,
}: ButtonProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                style,
                (disabled || loading) && styles.disabled,
            ]}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator
                    color={styles.buttonTextContent.color as string}
                />
            ) : (
                <ThemedText type="default" colorVariant="black">
                    {title}
                </ThemedText>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#ffffffff',
        borderColor: '#000',
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 6,
        alignItems: 'center',
        width: '100%',
        minWidth: 120,
        maxWidth: 400,
    },
    disabled: {
        backgroundColor: '#999',
        borderColor: 'transparent',
    },
    buttonTextContent: {
        fontWeight: '600',
        color: '#000',
    },
})
