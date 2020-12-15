import React, { useState } from 'react';
import { Text, View, Image } from "react-native";

import {useNavigation} from '@react-navigation/native'
import MapView, {Marker, PROVIDER_GOOGLE, MapEvent} from 'react-native-maps'

import mapMarker from '../../../assets/images/map-marker.png'
import styles from './styles'
import { RectButton } from 'react-native-gesture-handler';

function SelectMapPosition() {

    const {navigate} = useNavigation();
    const [position, setPosition] = useState({latitude: 0, longitude: 0})
    
    function handleNextStep() {
        navigate('OrphanageData', {position})
    }

    function handleSelectMapPosition(event: MapEvent) {
        setPosition(event.nativeEvent.coordinate)
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
                onPress={handleSelectMapPosition}
              >
                {position.latitude !== 0 && (
                    <Marker 
                    coordinate={{
                    latitude: position.latitude,
                    longitude: position.longitude,
                    }}    
                    >
                    <Image source={mapMarker} style={{width: 60, height: 70}} />
                    </Marker>
                )}
                
            </MapView>
            
            {position.latitude !== 0 && (
                <RectButton style={styles.nextButton} onPress={handleNextStep}>
                    <Text style={styles.nextButtonText}>Próximo</Text>
                </RectButton>
            )}            

        </View>
    )
}

export default SelectMapPosition;