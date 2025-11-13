import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native'

export type ThemedTextInputProps = TextInputProps & {
    variant?: 'default' | 'outlined' | 'filled'
    fontFamilyOverride?: string
    fontWeightOverride?:
        | 'normal'
        | 'bold'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900'
    borderColorOverride?: string
    backgroundColorOverride?: string
    isPassword?: boolean
    style?: StyleProp<ViewStyle>
}

export function ThemedTextInput({
    variant = 'default',
    fontFamilyOverride,
    fontWeightOverride,
    borderColorOverride,
    backgroundColorOverride,
    style,
    placeholder,
    isPassword = false,
    ...rest
}: ThemedTextInputProps) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View style={[styles.container, style]}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#888888"
                secureTextEntry={isPassword && !showPassword}
                style={[
                    styles.base,
                    variant === 'outlined' && styles.outlined,
                    variant === 'filled' && styles.filled,
                    {
                        color: '#000',
                        fontFamily: fontFamilyOverride ?? 'AfacadFlux',
                        fontWeight: fontWeightOverride ?? '400',
                        borderColor: borderColorOverride ?? '#ccc',
                        backgroundColor:
                            variant === 'filled'
                                ? (backgroundColorOverride ?? '#f4f4f4')
                                : 'transparent',
                        paddingRight: isPassword ? 40 : 10,
                    },
                ]}
                {...rest}
            />
            {isPassword && (
                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="#888888"
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
    },
    base: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    outlined: {
        borderWidth: 1,
    },
    filled: {
        borderWidth: 0,
        backgroundColor: '#f4f4f4',
    },
    toggleButton: {
        position: 'absolute',
        right: 10,
        top: 0,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
