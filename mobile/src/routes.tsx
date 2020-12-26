import React, { useContext, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {UserContext} from './userContext'

const {Navigator, Screen} = createStackNavigator()

import OrphanageMap from './pages/OrphanageMap'
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition'
import OrphanageData from './pages/CreateOrphanage/OrphanageData'
import Orphanage from './pages/Orphanage'
import Onboarding from './pages/OnBoarding'
import Header from './components/Header'

function StackNavigator() {

    const {isUserFirstTime, setUserFirstTime } = useContext(UserContext) 

    useEffect( () => {
        AsyncStorage.getItem("alreadyLaunched")
        .then( (value) => {
            if(value === null) {
                setUserFirstTime(true)
            } else {
                setUserFirstTime(false)
            }
        })    
    }, [isUserFirstTime])

    if(isUserFirstTime === null) {
        return null
    }

    return(
        <NavigationContainer>
            <Navigator 
                screenOptions={{
                    cardStyle: { backgroundColor: "#f2f3f5"} }}
            >
                {isUserFirstTime ? (
                    <Screen
                    name="onboarding"
                    component={Onboarding}
                    options={{
                        header: () => null
                    }}
                  />
                ) : (
                <>
                    <Screen 
                    name="OrphanagesMap"
                    component={OrphanageMap}
                    options={{ 
                        header: () => null
                    }}
                    />
                    
                    <Screen 
                        name="SelectMapPosition" 
                        component={SelectMapPosition} 
                        options={{
                            headerShown: true,
                            header: () => <Header title="Selecione no mapa" />
                        }}
                    />
                    
                    <Screen 
                        name="OrphanageData"
                        component={OrphanageData}
                        options={{
                            headerShown: true,
                            header: () => <Header title="Informe os dados" />
                        }}
                    />

                    <Screen
                    name="OrphanageDetails"
                    component={Orphanage}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Orfanato" />
                    }}
                    />
                </>
                )}

            </Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator