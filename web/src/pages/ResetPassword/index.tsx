import React from 'react';
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'

import mapMarker from '../../assets/images/map-marker.svg';
import './styles.css'

function ResetPassowrd() {

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

                    <button className="confirm-button">
                        <Link to="/login">
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

export default ResetPassowrd