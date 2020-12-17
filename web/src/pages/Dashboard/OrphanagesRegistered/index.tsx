import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

import AsideAdmin from '../../../components/AsideAdmin'
import mapIcon from '../../../utils/mapIcon'
import './styles.css'

function OrphanagesRegistered() {

    return (
        <div id="dashboard-container">
            <AsideAdmin />

            <main>
                <div className="dashboard-main-container">
                    <header>
                        <h1>Orfanatos Cadastrados</h1>

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

                                <div className="orphanage-options">
                                    <button>
                                        <FiEdit size={16} color="#15C3D6" />
                                    </button>
                                    <button>
                                        <FiTrash2 size={16} color="#15C3D6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default OrphanagesRegistered