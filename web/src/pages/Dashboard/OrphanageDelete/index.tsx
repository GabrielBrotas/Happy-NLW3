import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {deleteOrphanage, getOrphanage} from '../../../redux/actions/orphanagesActions'
import { stateProps } from '../../../redux/store';

import sorryMarker from '../../../assets/images/sorry-marker.svg'
import './styles.css'

interface paramsProps {
    id: string
}

function DeleteOrphanage() {    
    const dispatch = useDispatch();
    const {push} = useHistory();
    const {id} = useParams<paramsProps>();
    
    const {orphanage} = useSelector((state: stateProps) => state.orphanages)

    useEffect(() => {
        dispatch(getOrphanage(id))
    })

    function handleGoToDashboard() {
        dispatch(deleteOrphanage(id, push))
    }

    if(!orphanage.id) {
        return <p>loading...</p>
    }

    return (
        <main id="page-landing-delete" >
            <div className="delete-page-wrapper">
                <div className="delete-orphanage-info">
                    <h2>Excluir!</h2>
                    <p>Você tem certeza que deseja excluir {orphanage.name}?</p>

                    <button onClick={handleGoToDashboard}>
                        Deletar
                    </button>
                </div>

                <img src={sorryMarker} alt="delete icon" />

            </div>            
        </main>
    )
}

export default DeleteOrphanage