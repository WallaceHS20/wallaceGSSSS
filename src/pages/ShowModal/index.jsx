import React, { useEffect, useState } from 'react';
import Menu from "../../components/SideBarMenu";
import api from '../../api/api';
import './termosShow.css'

export default function ShowTermo() {
    const [termsData, setTermsData] = useState(null);

    useEffect(() => {
        loadTerms();
    }, []);

    const loadTerms = async () => {
        try {
            const response = await api.get('/terms/ultimoTermo');
            setTermsData(response.data);
        } catch (e) {
            console.error('Erro ao carregar os termos:', e);
            toast.error('Erro ao carregar os termos. Tente novamente mais tarde.');
        }
    };

    return (
        <>
            <Menu />
            <div className="content-page">
                <div className="termoShow">
                    {termsData ? (
                        <>
                            <h1>{termsData.nome_termo}</h1>
                            <p>{termsData.descricao}</p>
                        </>
                    ) : (
                        <p>Carregando os termos...</p>
                    )}
                </div>
            </div>
        </>
    );
}
