import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer    , useMapEvent} from 'react-leaflet'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../../services/api'

import { FiPlus, FiXCircle, FiCheck } from 'react-icons/fi'
import AsideAdmin from '../../../components/AsideAdmin'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Textarea from '../../../components/Textarea'
import mapIcon from '../../../utils/mapIcon'

import './styles.css'

interface ParamsProps {
    action: string;
    id: string;
}

function OrphanageEditOrConfirm() {

    const history = useHistory();
    const params = useParams<ParamsProps>();
    
    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [instructions, setInstructions] = useState('')
    const [openingHours, setOpeningHours] = useState('')
    const [openOnWeekends, setOpenOnWeekends] = useState(true)
    
    const [latitude, setLatitude] = useState<number>()
    const [longitude, setLongitude] = useState<number>()

    const [images, setImages] = useState<File[]>([])
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    async function handleEditOrAcceptOrphanage(e: FormEvent) {
        e.preventDefault()
        const data = new FormData();

        data.append('name', name);
        data.append('about', about);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('instructions', instructions);
        data.append('opening_hours', openingHours);
        data.append('open_on_weekends', String(openOnWeekends));
        
        images.forEach( image => {
            data.append('images', image)
        })

        await api.post('/orphanages', data)

        alert("Cadastro realizado com sucesso")
        history.push('/')
    }

    function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
        if(!event.target.files) {
            return;
        }
        const selectedImages = Array.from(event.target.files)
        setImages(selectedImages)
        
        const selectedFilesImagesPreview = selectedImages.map( image => {
            return URL.createObjectURL(image)
        })

        setPreviewImages(selectedFilesImagesPreview)
    }

    function toggleOpenOnWeekends() {
        setOpenOnWeekends(!openOnWeekends)
    }

    function MinimapBounds() {
        const onClick = useCallback(
          (e) => {   
            setLatitude(e.latlng.lat)
            setLongitude(e.latlng.lng)
            },
          [],
        )
        useMapEvent('click', onClick)

        return null
    }

    useEffect( () => {
        if(params.action !== "edit" && params.action !== "pending") {
            history.push('/dashboard/orphanages-registered')
        } 
    }, [])

    return(
        <div id="page-create-orphanage">
            <AsideAdmin />

            <main>

                <form onSubmit={handleEditOrAcceptOrphanage} className="orphanage-details">
                    <h2>Dados</h2>

                    <hr />

                    <div className="map-container">
                        <MapContainer
                            center={[-12.7227001, -38.3271215]}
                            zoom={16}   
                            style={{width: '100%', height: 200}}
                        >
                            <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                            <MinimapBounds />
                      
                            <Marker position={[-12.7227001, -38.3271215]} icon={mapIcon}/>
                      
                        </MapContainer>

                        <p>
                            Clique no mapa para alterar a localização
                        </p>
                        
                    </div>

                    <fieldset>
                        <Input 
                            label="Nome" 
                            name="name"
                            value={name}
                            setValue={setName}
                        />
                        
                        <Textarea 
                            label="Sobre" 
                            name="about" 
                            sublabel="máximo de 300 caracteres" 
                            value={about}
                            setValue={setAbout}
                        />

                        <div className="images-section">
                            <label>Fotos</label>
                            
                            <div className="images-container">
 
                                {previewImages.map( image => (
                                    <img key={image} src={image} alt={name} />
                                ) )}
 
                                <label htmlFor="image[]" className="upload-image">
                                    <FiPlus size={24} color="#15b6d6"/>
                                </label>
 
                            </div>
                            <input 
                                type="file" 
                                multiple 
                                id="image[]"
                                onChange={handleSelectImages}
                            />
                        </div>
                        
                        <h2>Visitação</h2>
                        <hr />

                        <Textarea 
                            label="Visitação"   
                            name="instructions"
                            value={instructions}
                            setValue={setInstructions}
                        />

                        <Input 
                            label="Horário das visitas" 
                            name="opening-hours"
                            value={openingHours}
                            setValue={setOpeningHours}
                        />
                        
                        <div className="open-on-weekends">
                            <p>Atende fim de semana?</p>
                            <div className="switch" onClick={() => toggleOpenOnWeekends()} >
                                <input type="checkbox" checked={openOnWeekends} readOnly/>
                                <span className="slider round" />
                            </div>
                        </div>
                        
                        {params.action === "edit" ? (
                            <Button type="submit" >
                                Confirmar
                            </Button>
                        ) : (
                            <div className="orphanage-pending-buttons">
                                <button className="button-decline-orphanage" type="submit">
                                    <FiXCircle size={20} color="#fff" style={{marginRight: "10px"}} />
                                    Recusar
                                </button>
                                <button className="button-accept-orphanage" type="submit">
                                    <FiCheck size={20} color="#fff" style={{marginRight: "10px"}} />
                                    Aceitar
                                </button>
                            </div>
                        )}
                        
                    </fieldset>

                </form>
            </main>
        </div>
    )
}

export default OrphanageEditOrConfirm