import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer    , useMapEvent} from 'react-leaflet'
import { useHistory } from 'react-router-dom'

import { FiPlus } from 'react-icons/fi'
import Aside from '../../components/Aside'
import mapIcon from '../../utils/mapIcon'

import './styles.css'
import { useDispatch } from 'react-redux'
import { createOrphanage } from '../../redux/actions/orphanagesActions'

function CreateOrphanage() {

    const {push} = useHistory();
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [instructions, setInstructions] = useState('')
    const [openingHours, setOpeningHours] = useState('')
    const [openOnWeekends, setOpenOnWeekends] = useState(true)
    
    const [latitude, setLatitude] = useState<number>()
    const [longitude, setLongitude] = useState<number>()

    const [images, setImages] = useState<File[]>([])
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    useEffect( () => {
        navigator.geolocation.getCurrentPosition( pos => {
            setLatitude(pos.coords.latitude)
            setLongitude(pos.coords.longitude)
        })
    }, [])
    
    async function handleCreateNewOrphanage(e: FormEvent) {
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
        
        dispatch(createOrphanage(data, push))
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

    if(!latitude || !longitude) {
        return <p>loading...</p>
    }

    return(
        <div id="page-create-orphanage">
            <Aside />

            <main>

                <form onSubmit={handleCreateNewOrphanage} className="orphanage-details">
                    <h2>Dados</h2>

                    <hr />

                    <div className="map-container">
                        <MapContainer
                            center={[latitude, longitude]}
                            zoom={16}   
                            style={{width: '100%', height: 200}}
                        >
                            <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                            <MinimapBounds />
                            {latitude && longitude && (
                                <Marker position={[latitude, longitude]} icon={mapIcon}/>
                            )}
                        </MapContainer>

                        <p>
                            Clique no mapa para adicionar a localização
                        </p>
                        
                    </div>

                        <fieldset>
                        <div className="input">
                            <label htmlFor="name">Nome</label>
                            <input 
                            type="text" 
                            name="name" 
                            value={name} 
                            onChange={ e => setName(e.target.value)} 
                            />
                        </div>

                        <div className="textarea">
                            <label htmlFor="Sobre">Sobre <span>máximo de 300 caracteres</span></label>
                            <textarea 
                                rows={5} 
                                name="about" 
                                value={about}
                                onChange={ e => setAbout(e.target.value)}
                                />
                        </div>

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

                        <div className="textarea">
                            <label htmlFor="instructions">Instruções</label>
                            <textarea 
                                rows={5} 
                                name="instructions" 
                                value={instructions}
                                onChange={ e => setInstructions(e.target.value)}
                                />
                        </div>
                        
                        <div className="input">
                            <label htmlFor="opening-hours">Horário das visitas</label>
                            <input 
                            type="text" 
                            name="opening-hours" 
                            value={openingHours} 
                            onChange={ e => setOpeningHours(e.target.value)} 
                            />
                        </div>
                        
                        <div className="open-on-weekends">
                            <p>Atende fim de semana?</p>
                            <div className="switch" onClick={() => toggleOpenOnWeekends()} >
                                <input type="checkbox" checked={openOnWeekends} readOnly/>
                                <span className="slider round"></span>
                            </div>
                        </div>
                        
                        <button type="submit" className="button" >
                            Confirmar
                        </button>
                    </fieldset>

                </form>
            </main>
        </div>
    )
}

export default CreateOrphanage