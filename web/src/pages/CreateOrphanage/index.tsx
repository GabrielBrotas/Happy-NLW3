import { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

import Aside from '../../components/Aside'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'

import './styles.css'

function CreateOrphanage() {

    const [openOnWeekends, setOpenOnWeekends] = useState(true)

    function toggleOpenOnWeekends() {
        setOpenOnWeekends(!openOnWeekends)
    }

    return(
        <div id="page-create-orphanage">
            <Aside />

            <main>
                <div className="orphanage-details">
                    <h2>Dados</h2>

                    <hr />

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

                        </MapContainer>

                        <p>
                            Clique no mapa para adicionar a localização
                        </p>
                        
                    </div>

                    <fieldset>
                        <Input label="Nome" name="name" />
                        
                        <Textarea label="Sobre" name="about" sublabel="máximo de 300 caracteres" maxLength={300} />

                        <Input label="Numero de whatsapp" name="whatsapp" />

                        <div className="upload-images">
                            <label>Fotos</label>
                            <button>
                                +
                            </button>
                        </div>

                        <h2>Visitação</h2>
                        <hr />

                        <Textarea label="Visitação" name="instructions"/>

                        <Input label="Horário das visitas" name="opening-hours"/>
                        
                        <div className="open-on-weekends">
                            <p>Atende fim de semana?</p>
                            <div className="switch" onClick={() => toggleOpenOnWeekends()} >
                                <input type="checkbox" checked={openOnWeekends} readOnly/>
                                <span className="slider round"></span>
                            </div>
                        </div>
                        
                        <Button>
                            Confirmar
                        </Button>
                    </fieldset>

                </div>
            </main>
        </div>
    )
}

export default CreateOrphanage