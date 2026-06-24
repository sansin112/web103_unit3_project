// client/src/pages/Locations.jsx
import React, { useState, useEffect } from "react";
import LocationsAPI from "../services/LocationsAPI";

const Locations = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const data = await LocationsAPI.getAllLocations();
                setLocations(data || []);
            } catch (error) {
                console.error("Error loading tournament hubs:", error);
            }
        };
        fetchLocations();
    }, []);

    return (
        <section>
            <header style={{ textAlign: "center", marginBottom: "4rem" }}>
                <h1 style={{ fontSize: "3rem", fontWeight: "800", marginBottom: "0.5rem" }}>
                    CARD SHOW <span style={{ color: "#f59e0b" }}>CENTERS</span>
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "1.1rem" }}>
                    Explore elite trading arenas, professional grading hubs, and local tournament lounges!
                </p>
            </header>

            {/* Handing layout controls directly to our fresh CSS definitions */}
            <div className="venues-grid">
                {locations.map((loc) => (
                    <article key={loc.id} className="venue-card">
                        <img 
                            src={loc.image} 
                            alt={loc.name} 
                            style={{ width: "100%", height: "200px", objectFit: "cover" }} 
                        />
                        <div className="venue-card-body">
                            <div>
                                <h3 style={{ fontSize: "1.4rem", margin: "0 0 0.75rem 0", color: "#ffffff" }}>{loc.name}</h3>
                                <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: "1.5" }}>{loc.description}</p>
                            </div>
                            <div style={{ marginTop: "1.5rem" }}>
                                <a href={`/location/${loc.id}`} role="button" style={{ width: "100%", margin: "0" }}>
                                    VIEW EVENTS
                                </a>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Locations;