// client/src/pages/Events.jsx
import React, { useState, useEffect } from 'react';
import EventsAPI from '../services/EventsAPI';

const CountdownTimer = ({ targetDateStr }) => {
    const [timeLeftStr, setTimeLeftStr] = useState('');
    const [isPast, setIsPast] = useState(false);

    useEffect(() => {
        const calculateTime = () => {
            const difference = new Date(targetDateStr) - new Date();
            
            if (difference < 0) {
                const absoluteDiff = Math.abs(difference);
                const daysAgo = Math.floor(absoluteDiff / (1000 * 60 * 60 * 24));
                setTimeLeftStr(`Ended ${daysAgo} days ago`);
                setIsPast(true);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeftStr(`⏳ ${days}d ${hours}h ${minutes}m ${seconds}s`);
            setIsPast(false);
        };

        calculateTime();
        const intervalId = setInterval(calculateTime, 1000);
        return () => clearInterval(intervalId);
    }, [targetDateStr]);

    return (
        <kbd style={{ 
            fontSize: '0.95rem', 
            padding: '0.5rem 1rem', 
            backgroundColor: isPast ? '#374151' : '#1e3a8a', 
            color: isPast ? '#9ca3af' : '#60a5fa',
            borderColor: 'transparent'
        }}>
            {timeLeftStr}
        </kbd>
    );
};

const Events = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                const data = await EventsAPI.getAllEvents();
                setEvents(data || []);
            } catch (error) {
                console.error("Error collecting global circuit schedules:", error);
            }
        };
        fetchAllEvents();
    }, []);

    return (
        <main className="container">
            <header style={{ textAlign: 'center', margin: '3rem 0' }}>
                <span style={{ fontSize: '0.9rem', color: '#f59e0b', fontWeight: 'bold', textTransform: 'uppercase' }}>Play! Pokémon Live Tracking</span>
                <h1 style={{ marginTop: '0.5rem' }}>🏆 Master Tournament Schedule (2026)</h1>
                <p>Live countdown metrics for regional circuits and the World Championships.</p>
            </header>

            <div className="events-list">
                {events.map(event => (
                    <article key={event.id} style={{ marginBottom: '2rem', padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                            <div style={{ flex: '1', minWidth: '250px' }}>
                                <h3 style={{ margin: '0 0 0.5rem 0', color: '#f3f4f6' }}>{event.title}</h3>
                                <p style={{ margin: '0', color: '#9ca3af' }}>{event.description}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <CountdownTimer targetDateStr={event.date} />
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
};

export default Events;