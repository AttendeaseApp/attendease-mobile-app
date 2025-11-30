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
    const isDisabledState = disabled || loading
    const textColor = isDisabledState ? '#999999' : '#000000'

    return (
        <TouchableOpacity
            style={[styles.button, style, isDisabledState && styles.disabled]}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={isDisabledState}
        >
            {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <ThemedText
                    type="defaultSemiBold"
                    colorVariant={isDisabledState ? 'gray' : 'black'}
                >
                    {title}
                </ThemedText>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
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
        backgroundColor: '#F5F5F5',
        borderColor: '#CCCCCC',
    },
})
