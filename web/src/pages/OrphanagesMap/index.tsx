import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import api from '../../services/api'

import { FiPlus, FiArrowRight } from 'react-icons/fi'
import mapMarkerImg from '../../assets/images/map-marker.svg'
import mapIcon from '../..//utils/mapIcon'

import './styles.css'

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

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    useEffect( () => {
        getOrphanages();
    }, [])

    function getOrphanages() {
        api.get('/orphanages')
            .then( res => {
                setOrphanages(res.data)        
            })
    }

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="marker" />

                    <h2>Escolha um orfanato no mapa</h2>

                    <p> Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Bahia</strong>
                    <span>Camaçari</span>
                </footer>

            </aside>

            <MapContainer 
                center={[-12.7227001, -38.3271215]} 
                zoom={15} 
                scrollWheelZoom={false}
                style={{width: '100%', height: '100%'}}
            >
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

            {orphanages.map( (orphanage) => (
                <Marker 
                    key={orphanage.id}
                    position={[orphanage.latitude, orphanage.longitude]}
                    icon={mapIcon}
                >
                    <Popup 
                      closeButton={false}
                      minWidth={240}
                      maxWidth={240}
                      className="map-popup"
                    >
                    {orphanage.name}
                    <Link to={`/orphanages/${orphanage.id}`}>
                      <FiArrowRight size={20} color="#fff" />
                    </Link>
                    </Popup>

              </Marker>      
            ))}

            </MapContainer>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}

export default OrphanagesMap