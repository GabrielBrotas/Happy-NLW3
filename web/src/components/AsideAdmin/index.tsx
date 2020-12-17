import {FiPower, FiMapPin, FiAlertCircle} from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import mapMarkerImg from '../../assets/images/map-marker.svg'

import './styles.css'

function Aside() {
    const {goBack} = useHistory()

    return(
    <aside className="aside-container">
        <img src={mapMarkerImg} alt="Happy" />

        <main className="aside-admin-main-content">
            <Link to="/dashboard/orphanages-registered" className="active-icon">
                <FiMapPin size={24} color="#0089A5" />
            </Link>

            <Link to="/dashboard/orphanages-pending">
                <FiAlertCircle size={24} color="#fff" />
            </Link>
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