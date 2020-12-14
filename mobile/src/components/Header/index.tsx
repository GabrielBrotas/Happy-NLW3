import React from 'react'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import styles from './styles'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

interface HeaderProps {
    title: string;
    showCancel?: boolean;
}

function Header({title, showCancel = true}: HeaderProps) {

    const {goBack, navigate} = useNavigation();

    function handleGoBackToAppHomePage() {
        navigate("OrphanagesMap")
    }

    return (
        <View style={styles.container}>
            <BorderlessButton onPress={goBack}>
                <Feather size={24} color="#15B6D6" name="arrow-left" />
            </BorderlessButton>
            
            <Text style={styles.title}>{title}</Text>

            {showCancel ? (
            <BorderlessButton onPress={handleGoBackToAppHomePage}>
                <Feather size={24} color="#ff669d" name="x" />
            </BorderlessButton>
            ) : (
                <View />
            )}
        </View>
    )
}

export default Header 

