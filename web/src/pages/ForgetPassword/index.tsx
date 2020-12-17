import {FiArrowLeft} from 'react-icons/fi'
import { Link } from 'react-router-dom';

import mapMarker from '../../assets/images/map-marker.svg';

function ForgetPassword() {

    return (
        <div id="page-content">
            <aside className="aside-app-content">
                <div className="logo">
                    <img src={mapMarker} alt="logo" />
                    <h1>happy</h1>
                </div>
                
                <footer className="location">
                    <strong>Bahia</strong>
                    <span>Camaçari</span>
                </footer>
            </aside>

            <main className="login-content">
                <fieldset>
                    <h2>Esqueci a senha</h2>

                    <p className="login-content-description">Sua redefinição de senha será enviada para o e-mail cadastrado</p>

                    <label>E-mail</label>
                    <input type="text" />

                    <button className="confirm-button">
                        <Link to="/reset-password">
                        Entrar
                        </Link>
                        
                    </button>

                    <Link to="/login" className="goBack-button">
                        <FiArrowLeft size={24} color="#15C3D6" />
                    </Link>
                </fieldset>
            </main>
        </div>
    )
}

export default ForgetPassword