import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack'

const {Navigator, Screen} = createStackNavigator()

import OrphanageMap from './pages/OrphanageMap'
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition'
import OrphanageData from './pages/CreateOrphanage/OrphanageData'
import Orphanage from './pages/Orphanage'
import Header from './components/Header'

function StackNavigator() {
    
    return(
        <NavigationContainer>
            <Navigator 
                screenOptions={{
                    cardStyle: { backgroundColor: "#f2f3f5"} }}
            >
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
                        header: () => <Header title="Adicione um orfanato" />
                    }}
                />
                
                <Screen 
                    name="OrphanageData"
                    component={OrphanageData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Selecione a localização" />
                    }}
                />

                <Screen
                  name="OrphanageDetails"
                  component={Orphanage}
                  options={{
                    headerShown: true,
                    header: () => <Header title="Selecione a localização" />
                  }}
                />

            </Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator