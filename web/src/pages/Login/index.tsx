import {FiArrowLeft} from 'react-icons/fi'

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

                        <a href="">Esqueci minha senha</a>

                    </div>

                    <button className="confirm-button">
                        Entrar
                    </button>

                    <button className="goBack-button">
                        <FiArrowLeft size={24} color="#15C3D6" />
                    </button>
                </fieldset>
            </main>
        </div>
    )
}

export default Login