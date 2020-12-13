import { Link } from 'react-router-dom'
import Leaflet from 'leaflet'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { FiPlus, FiArrowRight } from 'react-icons/fi'
import mapMarkerImg from '../../assets/images/map-marker.svg'

import './styles.css'

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [35, 35],
    iconAnchor: [15, 30],
    popupAnchor: [155, 15]
})

function OrphanagesMap() {
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

                <Marker 
                    position={[-12.7227001, -38.3271215]}
                    icon={mapIcon}
                >
                    <Popup 
                        closeButton={false}
                        minWidth={240}
                        maxWidth={240}
                        className="map-popup"
                    >
                    Leaf let popup
                    <Link to="/orphanages/1">
                        <FiArrowRight size={20} color="#fff" />
                    </Link>
                    </Popup>

                </Marker>

            </MapContainer>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}

export default OrphanagesMap