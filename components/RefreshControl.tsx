import React from 'react'
import { RefreshControl } from 'react-native'

interface CustomRefreshControlProps {
    refreshing: boolean
    onRefresh: () => void
    colors?: string[]
    tintColor?: string
}

const CustomRefreshControl: React.FC<CustomRefreshControlProps> = ({
    refreshing,
    onRefresh,
    colors = ['#27548A'],
    tintColor = '#27548A',
}) => {
    return (
        <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={colors}
            tintColor={tintColor}
        />
    )
}

export default CustomRefreshControl
