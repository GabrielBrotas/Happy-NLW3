import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {loginUser} from '../../redux/actions/userActions'
import { stateProps } from '../../redux/store';

import {FiArrowLeft} from 'react-icons/fi'
import mapMarker from '../../assets/images/map-marker.svg';
import './styles.css'

function Login() {

    const {push} = useHistory();
    const dispatch = useDispatch()

    const {error} = useSelector((state: stateProps) => state.user)
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLogIn() {
        const userData = {email, password}
        dispatch(loginUser(userData, push))
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

                    {error !== '' && <span className="error">* {error}</span>}

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