import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { RectButton, ScrollView, Switch, TouchableOpacity } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'

import styles from './styles'

function OrphanageData() {

    return (
        <ScrollView style={styles.container} contentContainerStyle={{padding: 24}}>
            <Text style={styles.title}>Dados</Text>

            <View style={styles.separator} />

            <Text style={styles.label}>Nome</Text>
            <TextInput style={styles.input} />
            
            <Text style={styles.label}>Sobre</Text>
            <TextInput style={[styles.input, {height: 100}]} multiline />

            <Text style={styles.label}>Numero do Whatsapp</Text>
            <TextInput style={styles.input} />
    
            <Text style={styles.label}>Fotos</Text>
            <TouchableOpacity style={styles.pictureButton}>
                <Feather name="plus" size={20} color="#96d2f0" />
            </TouchableOpacity>

            <Text style={styles.title}>Visitação</Text>
            
            <View style={styles.separator} />

            <Text style={styles.label}>Instruções</Text>
            <TextInput style={[styles.input, {height: 100}]} multiline/>
    
            <Text style={styles.label}>Horário das Visitas</Text>
            <TextInput style={styles.input} />

            <View style={styles.openOnWeekendsContent}>
                <Text style={styles.label}>Atende final de semana?</Text>
                <Switch 
                    thumbColor="#fff"
                    trackColor={{false: "#ccc", true: "#39cc83 "}}
                />
            </View>

            <RectButton style={styles.nextButton} >
                <Text style={styles.nextButtonText}>Próximo</Text>
            </RectButton>

        </ScrollView>
    )
}

export default OrphanageData;