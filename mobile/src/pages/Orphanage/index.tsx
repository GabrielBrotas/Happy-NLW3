import React from 'react'
import { View, Text, Image } from "react-native"
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

import {Feather, FontAwesome} from '@expo/vector-icons'
import mapMarker from '../../assets/images/map-marker.png'
import styles from './styles'

function Orphanage() {

    return(
        <ScrollView style={styles.container}>
            
            <View style={styles.imagesContainer}>
                {/* pagingEnabled vai fazer a imagem ocupar a tela toda e criar uma paginação ao inves de um scroll */}
                <ScrollView horizontal pagingEnabled>
                    <Image style={styles.image} source={{url: "https://aventurasnahistoria.uol.com.br/media/_versions/design_sem_nome_73_widelg.jpg"}} />
                    <Image style={styles.image} source={{url: "https://aventurasnahistoria.uol.com.br/media/_versions/design_sem_nome_73_widelg.jpg"}} />
                    <Image style={styles.image} source={{url: "https://aventurasnahistoria.uol.com.br/media/_versions/design_sem_nome_73_widelg.jpg"}} />
                </ScrollView>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.title}>Orf. Gleba</Text>
                <Text style={styles.description}>Alguma descrição do orfanato</Text>

                <View style={styles.mapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: -12.7191597,
                            longitude: -38.3334865,
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
                <Text style={styles.description}>Venha como dsa dopaskd </Text>

                <View style={styles.scheduleContainer}>
                        <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
                            <Feather name="clock" size={40} color="#2ab5d1" />
                            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>Segunda a sexta das 7 as 8</Text>
                        </View>

                        <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
                            <Feather name="info" size={40} color="#39cc83" />
                            <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Atendemos finais de semana</Text>
                        </View>
                </View>

                <RectButton style={styles.contactButton} onPress={ () => {}} >
                    <FontAwesome name="whatsapp" size={24} color="#fff" />
                    <Text style={styles.contactButtonText}>Entrar em contato</Text>
                </RectButton>
               
            </View>
        </ScrollView>
    )
}

export default Orphanage