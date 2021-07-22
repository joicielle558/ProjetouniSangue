import React, {useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';


import'./styles.css';


export default function New({ history }) {
    const [thumbnail, setThumbnail] = useState(null);
    const [hospital, setHospital] = useState('');
    const [sangue, setSangue] = useState('');
    const [endereco, setEndereco] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    },[thumbnail])

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail',thumbnail);
        data.append('hospital', hospital);
        data.append('endereco',endereco);
        data.append('sangue',sangue);

        
        await api.post('/spots', data, {
            headers: { user_id }
        })

        history.push('/dashboard');

        

    }

    return (
        <form onSubmit={handleSubmit}>
            <label
            id="thumbnail"
            style={{ backgroundImage: `url(${preview})`}}
            className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Select img" />

            </label>
        <label htmlFor="hospital"> Hospital*</label>
            <input
                id="hospital"
                placeholder="Unidade"
                value={hospital}
                onChange={event => setHospital(event.target.value)}

                

            />


        <label htmlFor="sangue"> Tipo Sanguíneo </label>
            <input
                id="sangue"
                placeholder="Tipo de sangue para o recolhimento"
                value={sangue}
                onChange={event => setSangue(event.target.value)}
                

            />
        
        <label htmlFor="endereco"> Endereço*</label>
            <input
                id="endereco"
                
                value={endereco}
                onChange={event => setEndereco(event.target.value)}
                

            />


        <button type="submit" className="btn">Pedir Coleta</button>
            
        </form>
    )
}