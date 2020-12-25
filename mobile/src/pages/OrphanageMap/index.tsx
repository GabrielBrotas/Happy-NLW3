import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { getCurrentPositionAsync, requestPermissionsAsync } from 'expo-location';

import api from '../../services/api';

import {Feather} from '@expo/vector-icons'
import mapMarker from '../../assets/images/map-marker.png';
import styles from './styles';


export interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
      id: string;
      url: string;
  }>
}

function OrphanageMap() {

  const {navigate} = useNavigation();

  const [orphanages, setOrphanages] = useState([])
  const [latitude, setLatitude] = useState<number>()
  const [longitude, setLongitude] = useState<number>()

  useEffect( () => {

    async function loadInitialPosition() {
      const {granted} = await requestPermissionsAsync();

      if(granted) {
        const {coords} = await getCurrentPositionAsync()
        const {latitude, longitude} = coords
        setLatitude(latitude)
        setLongitude(longitude)
      }
    }
    loadInitialPosition()
  }, [])

  // useFocusEffect vai ser disparado sempre que o usuario vim para essa tela,
  useFocusEffect(() => {
    api.get('/orphanages/true').then( (res) => {
      setOrphanages(res.data)
    })
  })

  function handleNavigateToOrphanageDetails(id: number) {
    navigate('OrphanageDetails', {id})
  }

  function handleNavigateToCreateOrphanage() {
    navigate('SelectMapPosition')
  }

  if(!latitude || !longitude) {
    return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size="large" color="#000" />
    </View>  
  )} 

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
      >
      {orphanages.map( (orphanage: Orphanage) => (
        <Marker 
        key={orphanage.id}
        calloutAnchor={{
          x: 3,
          y: 0.8
        }}
        coordinate={{
          latitude: orphanage.latitude,
          longitude: orphanage.longitude,
        }}  

        >
        <Image source={mapMarker} style={{width: 40, height: 50}} />
        {/* tooltip = true = não utilizar a estilização padrao do Callout, nós vamos fazer a estilização */}
        <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
          <View style={styles.calloutContainer}>
            <Text style={styles.calloutText}>{orphanage.name}</Text>
          </View>
        </Callout>
        </Marker>
      ))}
        
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} Orfanatos Encontrados</Text>

        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#fff" />
        </RectButton>
      </View>
    </View>
  );
}

export default OrphanageMap