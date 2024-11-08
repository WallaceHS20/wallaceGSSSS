import React, { useEffect, useState } from 'react';
import Menu from "../../components/SideBarMenu";
import TermoModal from '../../components/TermoModal/TermoModal';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLatestTerm } from '../../redux/termo/termoSlice';

export default function Home() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const [termsData, setTermsData] = useState(null);
    const [isTermModalOpen, setTermModalOpen] = useState(false);

    useEffect(() => {
        const loadTerms = async () => {
            const termsAction = await dispatch(fetchLatestTerm());

            if (fetchLatestTerm.fulfilled.match(termsAction)) {
                setTermsData(termsAction.payload);
                setTermModalOpen(true);
            } else {
                console.error('Erro ao buscar termos:', termsAction.payload);
            }
        };

        if (user && user.termo_atual && !user.termo_atual.termo_aceite) {
            loadTerms();
        }

    }, [dispatch, user]);

    return (
        <div>
            <Menu />
            {termsData && (
                <TermoModal
                    open={isTermModalOpen}
                    handleClose={() => setTermModalOpen(false)}
                    termsData={termsData}
                    user={user}
                />
            )}
        </div>
    );
}
