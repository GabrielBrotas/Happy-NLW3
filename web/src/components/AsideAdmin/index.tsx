import {FiPower, FiMapPin, FiAlertCircle} from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import mapMarkerImg from '../../assets/images/map-marker.svg'

import './styles.css'

function Aside() {
    const {goBack} = useHistory()

    return(
    <aside className="aside-container">
        <img src={mapMarkerImg} alt="Happy" />

        <main className="aside-admin-main-content">
            <button>
                <FiMapPin size={24} color="#fff" />
            </button>

            <button>
                <FiAlertCircle size={24} color="#fff" />
            </button>
        </main>

        <footer>
            <button type="button" onClick={goBack}>
                <FiPower size={24} color="#fff" />
            </button>
        </footer>
    </aside>
    )
}

export default Aside