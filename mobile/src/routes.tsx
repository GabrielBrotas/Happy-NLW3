import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack'

const {Navigator, Screen} = createStackNavigator()

import OrphanageMap from './pages/OrphanageMap'
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition'
import OrphanageData from './pages/CreateOrphanage/OrphanageData'
import Orphanage from './pages/Orphanage'

function StackNavigator() {
    
    return(
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false}}>
                <Screen name="OrphanagesMap" component={OrphanageMap} />
                <Screen name="SelectMapPosition" component={SelectMapPosition} />
                <Screen name="OrphanageData" component={OrphanageData} />
                <Screen name="OrphanageDetails" component={Orphanage} />
            </Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator