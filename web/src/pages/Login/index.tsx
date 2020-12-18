import { useState } from 'react';
import {FiArrowLeft} from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';

import mapMarker from '../../assets/images/map-marker.svg';
import './styles.css'

function Login() {

    const history = useHistory();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLogIn() {
        history.push('/dashboard/orphanages-registered')
    }

    console.log(email)
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
                    <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <label>Senha</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={e => setPassword( e.target.value)}    
                    />

                    <div className="login-options">
                        <div className="input-check-box">
                            <input type="checkbox" />
                            <p>Lembrar-me</p>
                        </div>
                        <Link to="/forget-password">Esqueci minha senha</Link>
                    </div>

                    <button 
                    className={(email === "" || password === "") ? "disabled-button" : "confirm-button"} 
                    onClick={handleLogIn} 
                    disabled={email === "" || password === ""}
                    >
                        Entrar
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