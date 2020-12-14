import React from 'react';
import {StatusBar} from 'react-native'
import {Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold, useFonts} from '@expo-google-fonts/nunito'

import Routes from './src/routes'

export default function App() {

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
    <Routes />
    <StatusBar barStyle="dark-content" />
    </>
  );
}