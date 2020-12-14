import React from 'react';
import { Text, View, Image } from "react-native";

import {useNavigation} from '@react-navigation/native'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'

import mapMarker from '../../../assets/images/map-marker.png'
import styles from './styles'
import { RectButton } from 'react-native-gesture-handler';

function SelectMapPosition() {

    const {navigate} = useNavigation();

    function handleNextStep() {
        navigate('OrphanageData')
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapStyle}
                initialRegion={{
                  latitude: -12.7191597,
                  longitude: -38.3334865,
                  latitudeDelta: 0.008,
                  longitudeDelta: 0.008
                }}
              >
                <Marker 
                  coordinate={{
                    latitude: -12.7191597,
                    longitude: -38.3334865,
                  }}  
              
                >
                  <Image source={mapMarker} style={{width: 60, height: 70}} />
                  </Marker>
            </MapView>

            <RectButton style={styles.nextButton} onPress={handleNextStep}>
                <Text style={styles.nextButtonText}>Próximo</Text>
            </RectButton>


        </View>
    )
}

export default SelectMapPosition;