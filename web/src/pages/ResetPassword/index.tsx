import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'

import mapMarker from '../../assets/images/map-marker.svg';
import './styles.css'

function ResetPassowrd() {

    const history = useHistory();

    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleGoToLoginPage() {
        history.push('/login')
    }
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
                    <h2>Redefinição de senha</h2>

                    <p className="login-content-description">Escolha uma nova senha para você acessar o dashboard do Happy</p>

                    <label>Nova senha</label>
                    <input type="password" />

                    <label>Repetir senha</label>
                    <input type="password" />

                    <button 
                    className={(password === "" || confirmPassword === "") ? "disabled-button" : "confirm-button"} 
                    onClick={handleGoToLoginPage} 
                    disabled={password === "" || confirmPassword === ""}
                    >
                        Entrar
                    </button>

                    <Link to="/login" className="goBack-button">
                        <FiArrowLeft size={24} color="#15C3D6" />
                    </Link>
                </fieldset>
            </main>
        </div>
    )
}

export default ResetPassowrd