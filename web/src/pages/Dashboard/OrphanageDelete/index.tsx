import { useHistory } from 'react-router-dom';
import sorryMarker from '../../../assets/images/sorry-marker.svg'
import './styles.css'

function DeleteOrphanage() {    
    const history = useHistory();

    function handleGoToDashboard() {
        history.push('/dashboard/orphanages-registered')
    }
    return (
        <main id="page-landing-delete" >
            <div className="delete-page-wrapper">
                <div className="delete-orphanage-info">
                    <h2>Excluir!</h2>
                    <p>Você tem certeza que deseja excluir o Orfanato gleba e?</p>

                    <button onClick={handleGoToDashboard}>
                        Voltar para o mapa
                    </button>
                </div>

                <img src={sorryMarker} alt="delete icon" />

            </div>            
        </main>
    )
}

export default DeleteOrphanage