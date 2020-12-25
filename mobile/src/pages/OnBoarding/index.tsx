import React from 'react'
import {Image, View} from 'react-native'
import {Feather} from '@expo/vector-icons'
import Onboarding from 'react-native-onboarding-swiper'

import styles from './styles'

interface DotProps {
    isLight: boolean;
    selected: boolean;
}

const NextButton = () => {
    return (
        <View style={styles.nextButton}>
            <Feather name="arrow-right" size={30} color="#15b6d6" />
        </View>
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
    return (
        <Onboarding
        bottomBarColor="#fff"
        bottomBarHeight={80}
        containerStyles={styles.container}
        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
        NextButtonComponent={() => <NextButton />}
        DotComponent={(props) => <DotPagination {...props} />}
        showSkip={false}
        pages={[
            {
            backgroundColor: '#fff',
            image: <Image source={require('../../assets/images/on-boarding-1.png')} />,
            title: 'Leve felicidade para o mundo',
            subtitle: 'Visite o orfanatos e mude o dia de muitas crianças',
            },
            {
            backgroundColor: '#fff',
            image: <Image source={require('../../assets/images/on-boarding-2.png')} />,
            title: 'Onboarding 2',
            subtitle: 'Done with React Native Onboarding Swiper',
            }
        ]}
        />
    )
}

export default OnboardingScreens