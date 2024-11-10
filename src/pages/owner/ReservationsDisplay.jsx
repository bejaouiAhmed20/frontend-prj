import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationsDisplay = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const ownerId = localStorage.getItem("ownerId")

  useEffect(() => {
    // Envoi de la requête pour récupérer les réservations du propriétaire
    axios.get(`http://localhost:5000/reservations/${ownerId}`)
      .then(response => {
        console.log(response.data);  // Vérifie que les données sont bien reçues
        setReservations(response.data);  // Mettre à jour l'état avec les réservations
        setLoading(false);  // Changer l'état de chargement
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des réservations:', error);
        setLoading(false);
      });
  }, [ownerId]);

  const handleAccept = (reservationId) => {
    axios.post(`http://localhost:5000/reservations/${reservationId}/accept`)
      .then(response => {
        // Mettre à jour l'état pour refléter que la réservation a été acceptée
        setReservations(reservations.map(reservation => 
          reservation.id === reservationId ? { ...reservation, status: 'accepted' } : reservation
        ));
      })
      .catch(error => {
        console.error('Erreur lors de l\'acceptation de la réservation:', error);
      });
  };

  const handleRefuse = (reservationId) => {
    axios.post(`http://localhost:3000/api/reservations/${reservationId}/refuse`)
      .then(response => {
        // Mettre à jour l'état pour refléter que la réservation a été refusée
        setReservations(reservations.filter(reservation => reservation.id !== reservationId));
      })
      .catch(error => {
        console.error('Erreur lors du refus de la réservation:', error);
      });
  };

  if (loading) {
    return <p>Chargement des réservations...</p>;
  }

  return (
    <div>
      <h2>Réservations pour le restaurant</h2>
      {reservations.length === 0 ? (
        <p>Aucune réservation trouvée.</p>
      ) : (
        <ul>
          
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              <p>Client : {reservation.clientName}</p>
              <p>Date : {reservation.date}</p>
              <p>Heure : {reservation.time}</p>
              <p>Nombre de personnes : {reservation.guests}</p>
              <p>Status : {reservation.status}</p>
              {reservation.status === 'pending' && (
                <div>
                  <button onClick={() => handleAccept(reservation.id)}>Accepter</button>
                  <button onClick={() => handleRefuse(reservation.id)}>Refuser</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReservationsDisplay;
