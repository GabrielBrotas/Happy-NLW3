import React from 'react'
import {Image, TouchableOpacity, View} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Onboarding from 'react-native-onboarding-swiper'

import {Feather} from '@expo/vector-icons'
import imageOne from '../../assets/images/on-boarding-1.png'
import imageTwo from '../../assets/images/on-boarding-2.png'
import styles from './styles'

interface DotProps {
    isLight: boolean;
    selected: boolean;
}

const NextButton = ({...props}) => {
    return (
        <TouchableOpacity style={styles.nextButton} {...props}>
            <Feather name="arrow-right" size={30} color="#15b6d6" />
        </TouchableOpacity>
    )
}

const DoneButton = ({...props}) => {
    return (
        <TouchableOpacity style={styles.nextButton} {...props}>
            <Feather name='check' size={30} color="#15b6d6" />
        </TouchableOpacity>
    )
}

const DotPagination = (props: DotProps) => {
    
    const {selected, isLight} = props

    return (
        <View style={styles.dots}>
            {selected && <View style={[styles.activeDot, selected && styles.dotLeft]}/> }
            {isLight && !selected && <View style={[styles.disabledDot, !selected && styles.dotRight]} /> }
        </View>
    )
}

function OnboardingScreens() {
    const {navigate} = useNavigation();

    return (
        <Onboarding
        bottomBarColor="#fff"
        bottomBarHeight={80}
        containerStyles={styles.container}
        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
        NextButtonComponent={NextButton}
        DoneButtonComponent={DoneButton}
        onDone={() => navigate('OrphanagesMap')}
        DotComponent={(props) => <DotPagination {...props} />}
        showSkip={false}
        pages={[
            {
            backgroundColor: '#fff',
            image: <Image source={imageOne}  style={{width: 250, height: 250}} />,
            title: 'Leve felicidade para o mundo',
            subtitle: 'Visite o orfanatos e mude o dia de muitas crianças',
            },
            {
            backgroundColor: '#fff',
            image: <Image source={imageTwo} style={{width: 220, height: 330}} />,
            title: 'Escolha um orfanato no mapa e faça uma visita',
            subtitle: '',
            }
        ]}
        />
    )
}

export default OnboardingScreens