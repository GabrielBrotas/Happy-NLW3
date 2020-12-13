import {FiArrowLeft} from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import mapMarkerImg from '../../assets/images/map-marker.svg'

import './styles.css'

function Aside() {
    const {goBack} = useHistory()

    return(
        <aside className="aside-container">
        <img src={mapMarkerImg} alt="Happy" />

        <footer>
            <button type="button" onClick={goBack}>
                <FiArrowLeft size={24} color="#fff" />
            </button>
        </footer>
    </aside>
    )
}

export default Aside