import React, { useState } from 'react';
import { View, Text, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import { RectButton, ScrollView, Switch, TouchableOpacity } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'
import {useNavigation, useRoute} from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'

import styles from './styles'
import api from '../../../services/api';

interface OrphanageDataRouteParams {
    position: {
        latitude: number,
        longitude: number
    }
}

function OrphanageData() {

    const {navigate} = useNavigation();

    const routes = useRoute();
    const params = routes.params as OrphanageDataRouteParams;

    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [instructions, setInstructions] = useState('')
    const [openingHours, setOpeningHours] = useState('')
    const [openOnWeekends, setOpenOnWeekends] = useState(true)

    const [images, setImages] = useState<string[]>([]);

    async function handleCreateOrphanage() {
        const {latitude, longitude} = params.position

        const data = new FormData();

        data.append('name', name);
        data.append('about', about);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('instructions', instructions);
        data.append('opening_hours', openingHours);
        data.append('open_on_weekends', String(openOnWeekends));
        
        images.forEach( (image, index) => {
            data.append('images', {
                type: 'image/jpg',
                uri: image,
                name: `image_${index}.jpg`
            } as any)
        })

        await api.post('/orphanages', data)
    
        navigate('OrphanagesMap')
    }

    async function handleSelectImages() {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();

        if( status !== "granted") {
            alert('Precisamos de acesso as suas fotos')
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        })
        
        if(result.cancelled) {
            return
        }

        const {uri: image} = result;

        setImages([...images, image])
    }

    return (
        <KeyboardAvoidingView 
            behavior="padding"
            style={{flex: 1}}
        >

        <ScrollView style={styles.container} contentContainerStyle={{padding: 24}}>
            <Text style={styles.title}>Dados</Text>

            <View style={styles.separator} />

            <Text style={styles.label}>Nome</Text>
            <TextInput 
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            
            <Text style={styles.label}>Sobre</Text>
            <TextInput 
                style={[styles.input, {height: 100}]} 
                multiline 
                value={about}
                onChangeText={setAbout}
            />

            <Text style={styles.label}>Numero do Whatsapp</Text>
            <TextInput style={styles.input} />
    
            <Text style={styles.label}>Fotos</Text>
            <View style={styles.uploadedImagesContainer}>
                {images.map( image => {
                    return (
                        <Image
                            key={image}
                            source={{uri: image}}
                            style={styles.uploadedImages}
                        />
                    )
                })}
            </View>


            <TouchableOpacity style={styles.pictureButton} onPress={handleSelectImages}>
                <Feather name="plus" size={20} color="#96d2f0" />
            </TouchableOpacity>

            <Text style={styles.title}>Visitação</Text>
            
            <View style={styles.separator} />

            <Text style={styles.label}>Instruções</Text>
            <TextInput 
                style={[styles.input, {height: 100}]}
                multiline
                value={instructions}
                onChangeText={setInstructions}    
            />
    
            <Text style={styles.label}>Horário das Visitas</Text>
            <TextInput 
                style={styles.input}
                value={openingHours}
                onChangeText={setOpeningHours}
            />

            <View style={styles.openOnWeekendsContent}>
                <Text style={styles.label}>Atende final de semana?</Text>
                <Switch 
                    thumbColor="#fff"
                    trackColor={{false: "#ccc", true: "#39cc83 "}}
                    value={openOnWeekends}
                    onValueChange={setOpenOnWeekends}
                />
            </View>

            <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
                <Text style={styles.nextButtonText}>Próximo</Text>
            </RectButton>

        </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default OrphanageData;