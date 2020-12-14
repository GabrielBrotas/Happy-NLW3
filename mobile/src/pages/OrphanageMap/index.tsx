import React from 'react';
import { View, Text, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import {Feather} from '@expo/vector-icons'

import mapMarker from '../../assets/images/map-marker.png';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

function OrphanageMap() {

    const {navigate} = useNavigation();
    
    function handleNavigateToOrphanageDetails() {
        navigate('OrphanageDetails')
    }

    function handleNavigateToCreateOrphanage() {
      navigate('SelectMapPosition')
    }

    return (
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: -12.7191597,
              longitude: -38.3334865,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008
            }}
          >
            <Marker 
              calloutAnchor={{
                x: 2.4,
                y: 0.8
              }}
              coordinate={{
                latitude: -12.7191597,
                longitude: -38.3334865,
              }}  
          
            >
              <Image source={mapMarker} style={{width: 60, height: 70}} />
              {/* tooltip = true = não utilizar a estilização padrao do Callout, nós vamos fazer a estilização */}
              <Callout tooltip onPress={handleNavigateToOrphanageDetails}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>Lar das Girls</Text>
                </View>
              </Callout>
            </Marker>
          </MapView>
    
          <View style={styles.footer}>
            <Text style={styles.footerText}>2 Orfanatos Encontrados</Text>
    
            <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
              <Feather name="plus" size={20} color="#fff" />
            </RectButton>
          </View>
        </View>
      );
}

export default OrphanageMap