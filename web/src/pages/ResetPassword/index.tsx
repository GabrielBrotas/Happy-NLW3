import React, { useState } from 'react';
import {Link, useHistory, useParams, useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {resetPassword} from '../../redux/actions/usersActions'
import { stateProps } from '../../redux/store';

import {FiArrowLeft} from 'react-icons/fi'
import mapMarker from '../../assets/images/map-marker.svg';
import './styles.css'

interface paramsProps {
    id: string;
}

function ResetPassowrd() {

    const dispatch = useDispatch();
    const {push} = useHistory();
    const {id} = useParams<paramsProps>();
    const url = useLocation();

    const {error} = useSelector((state: stateProps) => state.user)

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleResestPassword() {
        const token = url.search.split('=')[1]
        const data = {id, password, confirmPassword, token}        

        dispatch(resetPassword(data, push))
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
                    <input 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                    />

                    <label>Repetir senha</label>
                    <input 
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />

                    {error !== '' && <span className="error">* {error}</span>}

                    <button 
                    className={(password === "" || confirmPassword === "") ? "disabled-button" : "confirm-button"} 
                    onClick={handleResestPassword} 
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