import {  useEffect } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { stateProps } from '../../../redux/store'
import { getOrphanage, orphanagePendingResponse } from '../../../redux/actions/orphanagesActions'

import { FiXCircle, FiCheck } from 'react-icons/fi'
import AsideAdmin from '../../../components/AsideAdmin'
import mapIcon from '../../../utils/mapIcon'

import './styles.css'

interface ParamsProps {
    id: string;
}

function OrphanageConfirm() {
    const dispatch = useDispatch();
    const {push} = useHistory();
    const {id} = useParams<ParamsProps>();
    
    const {orphanage} = useSelector((state: stateProps) => state.orphanages)

    useEffect( () => { 
        dispatch(getOrphanage(id))
    }, [id, dispatch])

    function handleAdminResponseToOrphanagePending(adminResponse: boolean) {
        dispatch(orphanagePendingResponse(id, adminResponse, push))
    }

    if(!orphanage.id || (!orphanage.latitude || !orphanage.longitude)) {
        return <p>Loading...</p>
    }

    return(
        <div id="page-create-orphanage">
            <AsideAdmin />

            <main>

                <div className="orphanage-details">
                    <h2>Dados</h2>

                    <hr />

                    <div className="map-container">
                        <MapContainer
                            center={[orphanage.latitude, orphanage.longitude]}
                            zoom={16}   
                            dragging={false}
                            touchZoom={false}
                            zoomControl={false}
                            scrollWheelZoom={false}
                            doubleClickZoom={false}
                            style={{width: '100%', height: 200}}
                        >
                            <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                      
                            <Marker position={[orphanage.latitude, orphanage.longitude]} icon={mapIcon}/>
                      
                        </MapContainer>
                        
                    </div>

                    <fieldset>

                    <div className="input">
                        <label htmlFor="name">Nome</label>
                        <input type="text" name="name" value={orphanage.name} readOnly/>
                    </div>

                    <div className="textarea">
                        <label htmlFor="Sobre">Sobre <span>máximo de 300 caracteres</span></label>
                        <textarea rows={5} name="about" value={orphanage.about} readOnly/>
                    </div>

                        <div className="images-section">
                            <label>Fotos</label>
                            
                            <div className="images-container">
 
                                {orphanage.images.map( image => (
                                    <img key={image.id} src={image.url} alt="orphanage" />
                                ) )}

                            </div>
                        </div>
                        
                        <h2>Visitação</h2>
                        <hr />

                        <div className="textarea">
                            <label htmlFor="instructions">Instruções</label>
                            <textarea 
                                rows={5} 
                                name="instructions" 
                                value={orphanage.instructions}
                                readOnly
                            />
                        </div>
                        
                        <div className="input">
                            <label htmlFor="opening-hours">Horário das visitas</label>
                            <input 
                            type="text" 
                            name="opening-hours" 
                            value={orphanage.opening_hours} 
                            readOnly 
                            />
                        </div>
                        
                        <div className="open-on-weekends">
                            <p>Atende fim de semana?</p>
                            <div className="switch" >
                                <input type="checkbox" checked={orphanage.open_on_weekends} readOnly/>
                                <span className="slider round" />
                            </div>
                        </div>
                        
                        <div className="orphanage-pending-buttons">
                            <button className="button-decline-orphanage" onClick={ () => handleAdminResponseToOrphanagePending(false)}>
                                <FiXCircle size={20} color="#fff" style={{marginRight: "10px"}} />
                                Recusar
                            </button>
                            <button className="button-accept-orphanage" onClick={ () => handleAdminResponseToOrphanagePending(true)}>
                                <FiCheck size={20} color="#fff" style={{marginRight: "10px"}} />
                                Aceitar
                            </button>
                        </div>

                    </fieldset>

                </div>
            </main>
        </div>
    )
}

export default OrphanageConfirm