import React, { useState } from 'react';
import {StatusBar} from 'react-native'
import {UserContext} from './src/userContext'
import {Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold, useFonts} from '@expo-google-fonts/nunito'

import Routes from './src/routes'

export default function App() {

  const [isUserFirstTime, setUserFirstTime] = useState<boolean | null>(null)

  const [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_600SemiBold,
    Nunito_700Bold,
  })

  if(!fontsLoaded) {
    return null;
  }

  return (
    <>
    <UserContext.Provider value={{isUserFirstTime, setUserFirstTime}}>
      <Routes />
      <StatusBar barStyle="dark-content" />
    </UserContext.Provider>
    </>
  );
}