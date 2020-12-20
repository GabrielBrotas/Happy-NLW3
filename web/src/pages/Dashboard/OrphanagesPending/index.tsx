import React, { useEffect } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getOrphanages } from '../../../redux/actions/orphanagesActions'
import { stateProps } from '../../../redux/store'

import AsideAdmin from '../../../components/AsideAdmin'
import mapIcon from '../../../utils/mapIcon'

function OrphanagesPending() { 

    const {push} = useHistory();
    const dispatch = useDispatch();

    const {orphanages} = useSelector( (state: stateProps) => state.orphanages )
    
    useEffect( () => {
        dispatch(getOrphanages(false))
    }, [dispatch])
    
    function handleGoToAcceptOrDeclineOrphanagePage(id: number) {
        push(`/dashboard/orphanages-pending/pending/${id}`)
    }

    return (
        <div id="dashboard-container">
            <AsideAdmin />

            <main>
                <div className="dashboard-main-container">
                    <header>
                        <h1>Cadastrados Pendentes</h1>

                        <span>{orphanages.length} Orfanatos</span>
                    </header>

                    <hr />

                    <div className="orphanages-wrapper">
                        {orphanages.map(orphanage => (
                            <div key={orphanage.id} className="orphanage-container">
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

                            <div className="orphanage-footer">
                                <h2>Orfanato da Gleba E</h2>

                                <button onClick={() => handleGoToAcceptOrDeclineOrphanagePage(orphanage.id)}>
                                    <FiArrowRight size={16} color="#15C3D6" />
                                </button>
                                
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default OrphanagesPending