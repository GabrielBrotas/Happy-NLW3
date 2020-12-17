import {FiArrowLeft} from 'react-icons/fi'
import { Link } from 'react-router-dom';

import mapMarker from '../../assets/images/map-marker.svg';
import './styles.css'

function Login() {

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
                    <h2>Fazer Login</h2>

                    <label>E-mail</label>
                    <input type="text" />

                    <label>Senha</label>
                    <input type="password" />

                    <div className="login-options">
                        <div className="input-check-box">
                            <input type="checkbox" />
                            <p>Lembrar-me</p>
                        </div>
                        <Link to="/forget-password">Esqueci minha senha</Link>
                    </div>

                    <button className="confirm-button">
                        <Link to="/">
                            Entrar
                        </Link>
                    </button>

                    <Link to="/" className="goBack-button">
                        <FiArrowLeft size={24} color="#15C3D6" />
                    </Link>
                </fieldset>
            </main>
        </div>
    )
}

export default Login