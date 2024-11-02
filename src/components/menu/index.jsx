
import './index.css'
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';


export default function Menu() {
    const [menuCss, setMenuCss] = useState('menu')
    const [menuStatus, setMenuStatus] = useState(false)
    const [usuarioNome, setUsuarioNome] = useState('')
    const [homeNome, setHomeNome] = useState('')
    const [dasboardName, setDasboardName] = useState('')
    const [cadastroNome, setCadastroNome] = useState('')


    function modal() {
        setMenuStatus(!menuStatus)
        if (menuStatus) {
            setUsuarioNome('Julia Silva')
            setHomeNome('Home')
            setDasboardName('Dashboard')
            setCadastroNome('Cadastro')
            setMenuCss('menu menuOpen')
        } else {
            setUsuarioNome('')
            setHomeNome('')
            setDasboardName('')
            setCadastroNome('')
            setMenuCss('menu')
        }
    }

    return (
        <div className="container-main">
            <div className={menuCss}>
                <div className='iconGrid'>
                    <div>
                        <img src="/icon_menu.svg" alt="Icon_menu" onClick={() => modal()} ></img>
                    </div>
                </div>

                <div className='iconGrid'>
                    <a href='/usuario'>
                        <Avatar
                            alt="usuario"
                            src="/usuario.svg"
                        />
                    </a>
                    <h3>{usuarioNome}</h3>
                </div>

                <div className='iconGrid'>
                    <a href='/home'>
                        <img src='/home.svg' alt="home"></img>
                    </a>
                    <h3>{homeNome}</h3>
                </div>

                <div className='iconGrid'>
                    <a href='/dashboard'>
                        <img src='/dashboard.svg' alt="Dashboard"></img>
                    </a>
                    <h3>{dasboardName}</h3>
                </div>

                <div className='iconGrid'>
                    <a href='/cadastro'>
                        <img src='/cadastro.svg' alt="Cadastro"></img>
                    </a>
                    <h3>{cadastroNome}</h3>
                </div>
            </div>
            <div className="content"></div>
        </div>
    )
}