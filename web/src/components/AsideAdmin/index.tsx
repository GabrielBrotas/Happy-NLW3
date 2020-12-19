import { useEffect, useState } from 'react'
import {FiPower, FiMapPin, FiAlertCircle} from 'react-icons/fi'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import mapMarkerImg from '../../assets/images/map-marker.svg'

import './styles.css'

function Aside() {
    const {goBack} = useHistory()
    const {path} = useRouteMatch();

    const [registeredOrphanagesPage, setRegisteredOrphanagesPage] = useState(false)
    const [pendingOrphanagesPage, setPendingOrphanagesPage] = useState(false)

    useEffect( () => {
        if(path.split('/')[2] === "orphanages-registered") {
            setRegisteredOrphanagesPage(true)
            setPendingOrphanagesPage(false)
        }
        
        if(path.split('/')[2] === "orphanages-pending") {
            setPendingOrphanagesPage(true)
            setRegisteredOrphanagesPage(false)
        }
    }, [path])

    return(
    <aside className="aside-container">
        <img src={mapMarkerImg} alt="Happy" />

        <div className="aside-admin-main-content">
            <Link to="/dashboard/orphanages-registered" className={ registeredOrphanagesPage ? "active-icon" : ""}>
                <FiMapPin size={24} color={ registeredOrphanagesPage? "#0089A5" : "#fff"} />
            </Link>

            <Link to="/dashboard/orphanages-pending" className={ pendingOrphanagesPage ? "active-icon" : ""}>
                <FiAlertCircle size={24} color={  pendingOrphanagesPage ? "#0089A5" : "#fff"} />
            </Link>
        </div>

        <footer>
            <button type="button" onClick={goBack}>
                <FiPower size={24} color="#fff" />
            </button>
        </footer>
    </aside>
    )
}

export default Aside