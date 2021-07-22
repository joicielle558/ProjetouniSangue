import React, { useEffect, useState, useMemo } from 'react';
import {Link} from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';

import './styles.css';

export default function Dashboard() {
const [spots, setSpots] = useState([]);
const [requests, setRequests] = useState([])


//a utilização do useMemo faz a memorização de uma variável até que algo mude
//nesse caso a variável que eu estou memorizando é o socket
//o array de dependência cria a regra para ser necessario refazer a conexão do usuário caso o 
// user_id for mudado
const user_id = localStorage.getItem('user');
const socket = useMemo(() => socketio('http://localhost:3333', {
    query: { user_id },
    }), [user_id]);


    /** */
    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([ ... requests, data]);
        })
    }, [requests, socket]);


    /** */
    useEffect(() => {
        async function loadSpots(){
            const user_id = localStorage.getItem('user')
            const response = await api.get('/dashboard', {
                headers: { user_id }
            })

            setSpots(response.data);
        }

        loadSpots();
    }, []);

    async function handleAccept(id) {
        await api.post(`/bookings/${id}/approvals`);

        setRequests(requests.filter(request => request._id !== id));
    }

    async function handleReject(id) {
        await api.post(`/bookings/${id}/rejections`);

        setRequests(requests.filter(request => request._id !== id));
    }

    return (
        <>
        <ul className="notifications">
            {requests.map(request => (
                <li key={request._id}>
                    <p>
                    <strong> {request.user.email} </strong> está solicitando um agendamento em <strong>{request.spot.hospital}</strong> para a data: <strong> {request.date} </strong>
                    </p>
                    <button className="accept" onClick={() => handleAccept(request._id)}> ACEITAR </button>
                    <button className="reject" onClick={() => handleReject(request._id)}> REJEITAR </button>
                </li>
            ))}

        </ul>

        <ul className="spot-list">
            {spots.map(spot =>(
            <li key={spot._id}> 
                <header style={{backgroundImage:`url(${spot.thumbnail_url})`}} />
                <strong>{spot.hospital}</strong>
                <span>{spot.endereco}</span>
                <p>
                {spot.sangue}
                </p>
            </li>

            ))}
        </ul>

        <Link to="/new">
            <button className="btn"> Cadastrar novo pedido </button>
        </ Link>

        </>
    )
}
