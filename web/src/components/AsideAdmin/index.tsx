import { useEffect, useState } from 'react'
import {FiPower, FiMapPin, FiAlertCircle} from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import {logoutUser} from '../../redux/actions/usersActions'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import mapMarkerImg from '../../assets/images/map-marker.svg'

import './styles.css'

function Aside() {
    const {push} = useHistory();
    const {path} = useRouteMatch();
    const dispatch = useDispatch();

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

    function handleGoToAppPage() {
        push('/app')
    }

    function handleLogoutUser() {
        dispatch(logoutUser())
    }

    return(
    <aside className="aside-container">
        <img src={mapMarkerImg} alt="Happy" onClick={handleGoToAppPage} style={{cursor: 'pointer'}}/>

        <div className="aside-admin-main-content">
            <Link to="/dashboard/orphanages-registered" className={ registeredOrphanagesPage ? "active-icon" : ""}>
                <FiMapPin size={24} color={ registeredOrphanagesPage? "#0089A5" : "#fff"} />
            </Link>

            <Link to="/dashboard/orphanages-pending" className={ pendingOrphanagesPage ? "active-icon" : ""}>
                <FiAlertCircle size={24} color={  pendingOrphanagesPage ? "#0089A5" : "#fff"} />
            </Link>
        </div>

        <footer>
            <button type="button" onClick={handleLogoutUser}>
                <FiPower size={24} color="#fff" />
            </button>
        </footer>
    </aside>
    )
}

export default Aside