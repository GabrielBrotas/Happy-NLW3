import React from 'react'

import Orphanage from '../../components/Orphanage'
import AsideAdmin from '../../components/AsideAdmin'

import './styles.css'

function Dashboard() {

    return (
        <div id="dashboard-container">
            <AsideAdmin />

            <main>
                <div className="dashboard-main-container">
                    <header>
                        <h1>Orfanatos Cadastrados</h1>

                        <span>2 orfanatos</span>
                    </header>

                    <hr />

                    <div className="orphanages-registered">
                        <Orphanage />
                        <Orphanage />
                        <Orphanage />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard