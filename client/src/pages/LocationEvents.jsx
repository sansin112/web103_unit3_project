// client/src/pages/LocationEvents.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LocationsAPI from '../services/LocationsAPI';
import EventsAPI from '../services/EventsAPI';

const LocationEvents = () => {
    const { id } = useParams();
    const [location, setLocation] = useState(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const locData = await LocationsAPI.getLocationById(id);
                const eventsData = await EventsAPI.getEventsByLocationId(id);
                setLocation(locData);
                setEvents(eventsData || []);
            } catch (error) {
                console.error("Error fetching tournament venue details:", error);
            }
        };
        fetchLocationData();
    }, [id]);

    if (!location) return <div className="container"><p aria-busy="true">Loading Championship Venue info...</p></div>;

    const now = new Date();
    const upcomingEvents = events.filter(e => new Date(e.date) >= now);
    const pastEvents = events.filter(e => new Date(e.date) < now);

    return (
        <main className="container">
            <article style={{ padding: '0', overflow: 'hidden', marginBottom: '3rem', border: '1px solid #374151' }}>
                <img src={location.image} alt={location.name} style={{ width: '100%', height: '320px', objectFit: 'cover' }} />
                <div style={{ padding: '2rem' }}>
                    <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#38bdf8', fontWeight: 'bold' }}>Official Championship Venue</span>
                    <h1 style={{ marginTop: '0.5rem' }}>{location.name}</h1>
                    <p style={{ margin: '0', fontSize: '1.1rem' }}>{location.description}</p>
                </div>
            </article>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ color: '#4ade80' }}>📅 Upcoming Scheduled Matches</h2>
                {upcomingEvents.length === 0 ? (
                    <blockquote style={{ borderLeftColor: '#4b5563' }}>No future championship streams or brackets scheduled at this venue.</blockquote>
                ) : (
                    <div className="grid">
                        {upcomingEvents.map(event => (
                            <article key={event.id} style={{ borderTop: '4px solid #4ade80' }}>
                                <h3>{event.title}</h3>
                                <p><strong>Starts:</strong> {new Date(event.date).toLocaleString([], { dateStyle: 'long', timeStyle: 'short' })}</p>
                                <p>{event.description}</p>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            <section style={{ opacity: 0.75 }}>
                <h2 style={{ color: '#9ca3af' }}>📜 Historical Arena Standings</h2>
                {pastEvents.length === 0 ? (
                    <blockquote>No historic competitive seasons recorded here yet.</blockquote>
                ) : (
                    <div className="grid">
                        {pastEvents.map(event => (
                            <article key={event.id} style={{ borderTop: '4px solid #9ca3af' }}>
                                <h3>{event.title}</h3>
                                <p><strong>Concluded:</strong> {new Date(event.date).toLocaleDateString([], { dateStyle: 'long' })}</p>
                                <p>{event.description}</p>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default LocationEvents;