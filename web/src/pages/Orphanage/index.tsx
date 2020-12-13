import { FaWhatsapp } from 'react-icons/fa'
import {MapContainer, TileLayer, Marker} from 'react-leaflet'
import { FiClock, FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";

import mapIcon from '../../utils/mapIcon'

import './styles.css'
import Aside from '../../components/Aside';
import Button from '../../components/Button';


function OrphanagesMap() {
    return (
    <div id="page-orphanage">
       
       <Aside />

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

                    <Button>
                        <FaWhatsapp size={20} color="#fff" />
                        Entrar em contato
                    </Button>
                      
                </div>
            </div>
        </main>

    </div>
    )
}

export default OrphanagesMap