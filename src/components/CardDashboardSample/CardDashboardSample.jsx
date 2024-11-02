import React from 'react';

import './carddashboard.css'

export default function CardDashboardSample({children, dataCard}){

    //<ShoppingCartIcon className="icon-card-sample" fontSize="large"/>
    return(
        <div className="cardSample" style={{ background: dataCard.color}}>
            <h4 className='title-sample-card'>{dataCard.titulo}</h4>
            <div className='values-card-sample'>
                <div style={{ color: dataCard.color }}>
                {children}
                </div>
                <span className='values-card-sample'>{dataCard.valor}</span>
            </div>
        </div>
    )
}