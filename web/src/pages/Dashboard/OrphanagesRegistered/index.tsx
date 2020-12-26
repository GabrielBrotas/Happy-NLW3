import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { stateProps } from '../../../redux/store'
import { getOrphanages } from '../../../redux/actions/orphanagesActions'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { CLEAR_ORPHANAGE } from '../../../redux/types'

import AsideAdmin from '../../../components/AsideAdmin'
import mapIcon from '../../../utils/mapIcon'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

import './styles.css'

function OrphanagesRegistered() {
    const {push} = useHistory();
    const dispatch = useDispatch();

    const {orphanages} = useSelector( (state: stateProps) => state.orphanages )
    
    useEffect( () => {
        dispatch(getOrphanages(true))
        dispatch({type: CLEAR_ORPHANAGE})
    }, [dispatch])

    function handleEditOrphanage(id: number) {
        push(`/dashboard/orphanages-registered/edit/${id}`)
    }

    function handleDeleteOrphanage(id: number) {
        push(`/dashboard/orphanages-registered/delete/${id}`)
    }

    return (
        <div id="dashboard-container">
            <AsideAdmin />

            <main>
                <div className="dashboard-main-container">
                    <header>
                        <h1>Orfanatos Cadastrados</h1>

                        <span>{orphanages.length} Orfanatos</span>
                    </header>

                    <hr />

                    <div className="orphanages-wrapper">
                        {orphanages.map( orphanage => (
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
                                <h2>{orphanage.name}</h2>

                                <div className="orphanage-options">
                                    <button onClick={() => handleEditOrphanage(orphanage.id)}>
                                        <FiEdit size={16} color="#15C3D6" />
                                    </button>
                                    <button onClick={() => handleDeleteOrphanage(orphanage.id)}>
                                        <FiTrash2 size={16} color="#15C3D6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default OrphanagesRegistered