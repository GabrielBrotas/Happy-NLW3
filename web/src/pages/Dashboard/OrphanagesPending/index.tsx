import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { useHistory } from 'react-router-dom'

import AsideAdmin from '../../../components/AsideAdmin'
import mapIcon from '../../../utils/mapIcon'

function OrphanagesPending() { 

    const {push} = useHistory();

    function handleGoToAcceptOrDeclineOrphanagePage() {
        push('/dashboard/orphanage/pending/1')
    }

    return (
        <div id="dashboard-container">
            <AsideAdmin />

            <main>
                <div className="dashboard-main-container">
                    <header>
                        <h1>Cadastrados Pendentes</h1>

                        <span>2 orfanatos</span>
                    </header>

                    <hr />

                    <div className="orphanages-wrapper">
                        <div className="orphanage-container">
                            <MapContainer
                                center={[-12.7177843, -38.3248504]}
                                zoom={16}
                                style={{width: '100%', height: 200}}
                                dragging={false}
                                touchZoom={false}
                                zoomControl={false}
                                scrollWheelZoom={false}
                                doubleClickZoom={false}
                            >
                                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                                <Marker interactive={false} icon={mapIcon} position={[-12.7177843, -38.3248504]} />
                            </MapContainer>

                            <div className="orphanage-footer">
                                <h2>Orfanato da Gleba E</h2>

                                <button onClick={handleGoToAcceptOrDeclineOrphanagePage}>
                                    <FiArrowRight size={16} color="#15C3D6" />
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default OrphanagesPending