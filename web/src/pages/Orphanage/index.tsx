import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import {MapContainer, TileLayer, Marker} from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux';
import { getOrphanage } from '../../redux/actions/orphanagesActions';
import { stateProps } from '../../redux/store';

import { FiClock, FiInfo } from "react-icons/fi";
import { FaWhatsapp } from 'react-icons/fa'
import Aside from '../../components/Aside';
import mapIcon from '../../utils/mapIcon'

import './styles.css'

interface OrphanageParams {
    id: string;
}

function OrphanagesMap() {
    const params = useParams<OrphanageParams>();
    const dispatch = useDispatch();

    const {orphanage} = useSelector((state: stateProps) => state.orphanages)
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    useEffect( () => {
        dispatch(getOrphanage(params.id))
    }, [params.id, dispatch])
    
    if(!orphanage.id || (!orphanage.latitude && !orphanage.longitude)) {
        return <p>Loading...</p>
    }

    return (
    <div id="page-orphanage">
       
       <Aside />

        <main>
            <div className="orphanage-details">
                <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

                <div className="images">
                    {orphanage.images.map( (image, index) => (
                        <button 
                            key={image.id} 
                            className={activeImageIndex === index ? "active" : ""} 
                            type="button"
                            onClick={() => {setActiveImageIndex(index)}}
                        >
                            <img src={image.url} alt={image.url} />
                        </button>
                    ))}

                </div>

                <div className="orphanage-details-content"> 
                    <h1>{orphanage.name}</h1>
                    <p>{orphanage.about}</p>

                    <div className="map-container">
                        <MapContainer
                            center={[orphanage.latitude, orphanage.longitude]}
                            zoom={16}
                            style={{width: '100%', height: 200}}
                            dragging={false}
                            touchZoom={false}
                            zoomControl={false}
                            scrollWheelZoom={false}
                            doubleClickZoom={false}
                        >
                            <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                            <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
                        </MapContainer>

                        <a href={`https://www.google.com/maps/place/${orphanage.latitude},${orphanage.longitude}`} target="_blank" rel="noopener noreferrer">
                            Ver rotas no Google Maps
                        </a>
                    </div>

                    <hr />

                    <h2>Instruções para visita</h2>
                    <p>{orphanage.instructions}</p>

                    <div className="open-details">
                        <div className="hour">
                            <FiClock size={32} color="#29B6D1"/>
                            {orphanage.opening_hours}
                        </div>
                       
                        {orphanage.open_on_weekends ? (
                            <div className="open-on-weekends">
                                <FiInfo size={32} color="#39CC83" />
                                Atendemos <br />
                                fim de semana 
                            </div>
                        ) : (
                            <div className="open-on-weekends dont-open">
                                <FiInfo size={32} color="#FF669D" />
                                Não Atendemos <br />
                                fim de semana 
                            </div>
                        )}
                    </div>

                    <button className="button">
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