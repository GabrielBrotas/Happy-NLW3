import logoImg from '../../assets/images/logo.svg'
import {FiArrowRight} from 'react-icons/fi'
import {Link} from 'react-router-dom'

import './styles.css'

function Landing() {

    

    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <header>
                    <img src={logoImg} alt="happy" />
                    <div className="location">
                        <strong>Bahia</strong>
                        <span>Camaçari</span>
                    </div>
                </header>

                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças</p>
                </main>

                <Link to="/login" className="button-restricted-access">
                    Acesso Restrito
                </Link>
                
                <Link to="/app" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
                </Link>
            </div>
        </div>
    )
}

export default Landing
