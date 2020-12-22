import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {deleteOrphanage} from '../../../redux/actions/orphanagesActions'

import sorryMarker from '../../../assets/images/sorry-marker.svg'
import './styles.css'

interface paramsProps {
    id: string
}

function DeleteOrphanage() {    
    const dispatch = useDispatch();
    const {push} = useHistory();
    const {id} = useParams<paramsProps>();
    
    function handleGoToDashboard() {
        dispatch(deleteOrphanage(id, push))
    }

    return (
        <main id="page-landing-delete" >
            <div className="delete-page-wrapper">
                <div className="delete-orphanage-info">
                    <h2>Excluir!</h2>
                    <p>Você tem certeza que deseja excluir o Orfanato gleba e?</p>

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