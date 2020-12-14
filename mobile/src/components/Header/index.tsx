import React from 'react'
import { View, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import styles from './styles'

interface HeaderProps {
    title: string;
}

function Header({title}: HeaderProps) {

    return (
        <View style={styles.container}>
            <AntDesign size={24} color="#15B6D6" name="arrowleft" />
            <Text style={styles.title}>{title}</Text>
            <AntDesign size={24} color="#8FA7B2" name="close" />
        </View>
    )
}

export default Header 

