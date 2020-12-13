import Leaflet from 'leaflet'
import { FaWhatsapp } from 'react-icons/fa'
import {MapContainer, TileLayer, Marker} from 'react-leaflet'
import { FiArrowLeft, FiClock, FiInfo } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import mapMarkerImg from '../../assets/images/map-marker.svg'

import './styles.css'

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [35, 35],
    iconAnchor: [15, 30],
    popupAnchor: [155, 15]
})

function OrphanagesMap() {
    const {goBack} = useHistory()

    return (
    <div id="page-orphanage">
        <aside>
            <img src={mapMarkerImg} alt="Happy" />

            <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#fff" />
                </button>
            </footer>
        </aside>

        <main>
            <div className="orphanage-details">
                <img src="https://www.decorfacil.com/wp-content/uploads/2017/03/20171011fachada-casa-simples-pequena-99.jpg" alt="lar" />

                <div className="images">
                    <button className="active" type="button">
                        <img src="https://www.tubefilter.com/wp-content/uploads/2019/11/dobrik-people.jpg" alt="lar" />
                    </button>
                    <button className="active" type="button">
                        <img src="https://www.decorfacil.com/wp-content/uploads/2017/03/20171011fachada-casa-simples-pequena-99.jpg" alt="lar" />
                    </button>
                    <button className="active" type="button">
                        <img src="https://www.decorfacil.com/wp-content/uploads/2017/03/20171011fachada-casa-simples-pequena-99.jpg" alt="lar" />
                    </button>
                    <button className="active" type="button">
                        <img src="https://www.decorfacil.com/wp-content/uploads/2017/03/20171011fachada-casa-simples-pequena-99.jpg" alt="lar" />
                    </button>
                    <button className="active" type="button">
                        <img src="https://www.decorfacil.com/wp-content/uploads/2017/03/20171011fachada-casa-simples-pequena-99.jpg" alt="lar" />
                    </button>
                    <button className="active" type="button">
                        <img src="https://www.decorfacil.com/wp-content/uploads/2017/03/20171011fachada-casa-simples-pequena-99.jpg" alt="lar" />
                    </button>
                </div>

                <div className="orphanage-details-content"> 
                    <h1>Lar das girls</h1>
                    <p>Sejas sdoaskd pasodka sopdkaspod kasop d</p>

                    <div className="map-container">
                        <MapContainer
                            center={[-12.7227001, -38.3271215]}
                            zoom={16}
                            style={{width: '100%', height: 200}}
                            dragging={false}
                            touchZoom={false}
                            zoomControl={false}
                            scrollWheelZoom={false}
                            doubleClickZoom={false}
                        >
                            <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                            <Marker interactive={false} icon={mapIcon} position={[-12.7227001, -38.3271215]} />
                        </MapContainer>

                        <footer>
                            <Link to="">
                                Ver rotas no Google Maps
                            </Link>
                        </footer>
                    </div>

                    <hr />

                    <h2>Instruções para visita</h2>
                    <p>asdaskd opasdko  aasdas</p>

                    <div className="open-details">
                        <div className="hour">
                            <FiClock size={32} color="#29B6D1"/>
                            Segunda a sexta <br />
                            08h as 18h
                        </div>
                        <div className="open-on-weekends">
                            <FiInfo size={32} color="#39cc83" />
                            Atendemos <br />
                            fim de semana 
                        </div>
                    </div>

                    <button type="button" className="contact-button">
                        <FaWhatsapp size={20} color="#fff" />
                        Entrar em contato
                    </button>
                </div>
            </div>
        </main>

    </div>
    )
}

export default OrphanagesMap