import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import { getUserData } from './redux/actions/usersActions'
import jwtDecode from 'jwt-decode'
import api from './services/api'
import Routes from './routes'

import './assets/global.css'
import 'leaflet/dist/leaflet.css'

interface decodedTokenProps {
  id: number;
  exp: number;
}

function App() {

  const dispatch = useDispatch();

  const [token, setToken] = useState('');

  useEffect( () => {
    setToken(localStorage.IdToken)

    if(token) {
      const decodedToken: decodedTokenProps = jwtDecode(token)

      if(decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('IdToken')
      } else {
        api.defaults.headers.common['Authorization'] = token
        dispatch(getUserData(decodedToken.id))
      }
    }
    
  }, [token, dispatch])

  return (
    <Routes />
  );
}

export default App;
