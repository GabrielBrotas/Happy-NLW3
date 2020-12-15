import React, {useEffect, useState} from 'react'
import { View, Text, Image } from "react-native"
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import {useRoute} from '@react-navigation/native'
import api from '../../services/api'

import {Feather, FontAwesome} from '@expo/vector-icons'
import mapMarker from '../../assets/images/map-marker.png'
import styles from './styles'
import { Orphanage } from '../OrphanageMap'

interface OrphanageDetailsRouteParams {
    id: number
}

function OrphanageDetails() {

    const route = useRoute();
    const params = route.params as OrphanageDetailsRouteParams;

    const [orphanage, setOrphanage] = useState<Orphanage>()

    useEffect( () => {
        api.get(`/orphanages/${params.id}`).then( res => {
            setOrphanage(res.data)
        })
    }, [params])

    if(!orphanage) {
        return <Text>Loading...</Text>
    }
    return(

        <ScrollView style={styles.container}>
            
            <View style={styles.imagesContainer}>
                {/* pagingEnabled vai fazer a imagem ocupar a tela toda e criar uma paginação ao inves de um scroll */}
                <ScrollView horizontal pagingEnabled>
                    {orphanage.images.map( image => (
                        <Image key={image.id} style={styles.image} source={{uri: image.url}} />
                    ))}
                </ScrollView>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{orphanage.name}</Text>
                <Text style={styles.description}>{orphanage.about}</Text>

                <View style={styles.mapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: orphanage.latitude,
                            longitude: orphanage.longitude,
                            latitudeDelta: 0.008,
                            longitudeDelta: 0.008
                        }}
                        zoomEnabled={false}
                        pitchEnabled={false}
                        scrollEnabled={false}
                        rotateEnabled={false}
                        style={styles.mapStyle}
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

                    <View style={styles.routesContainer}>
                        <Text style={styles.routesText}>Ver rotas no google maps</Text>
                    </View>
                </View>

                <View style={styles.separator} />

                <Text style={styles.title}>Instruções para visita</Text>
                <Text style={styles.description}>{orphanage.instructions}</Text>

                <View style={styles.scheduleContainer}>
                        <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
                            <Feather name="clock" size={40} color="#2ab5d1" />
                            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>
                                {orphanage.opening_hours}
                            </Text>
                        </View>

                        { orphanage.open_on_weekends ? (
                            <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
                                <Feather name="info" size={40} color="#39cc83" />
                                <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Atendemos finais de semana</Text>
                            </View>
                        ) : (
                            <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
                            <Feather name="info" size={40} color="#ff669d" />
                            <Text style={[styles.scheduleText, styles.scheduleTextRed]}>Não atendemos finais de semana</Text>
                        </View>
                        )}
                </View>

                <RectButton style={styles.contactButton} onPress={ () => {}} >
                    <FontAwesome name="whatsapp" size={24} color="#fff" />
                    <Text style={styles.contactButtonText}>Entrar em contato</Text>
                </RectButton>
               
            </View>
        </ScrollView>
    )
}

export default OrphanageDetails