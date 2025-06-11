'use client'

import { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

// Fix for marker icons in Next.js
const icon = L.icon({
    iconUrl: "/leaflet/marker-icon.png",
    iconRetinaUrl: "/leaflet/marker-icon-2x.png",
    shadowUrl: "/leaflet/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface MapProps {
    center?: number[],
    zoom?: number;
    scrollWheelZoom?: boolean;
    className?: string;
}

// Component to handle map center updates
function ChangeView({ center }: { center: L.LatLngExpression }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center);
    }, [center, map]);
    return null;
}

function Map({ 
    center, 
    zoom = 4, 
    scrollWheelZoom = false,
    className = 'h-[35vh] rounded-lg'
}: MapProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <MapContainer 
            center={center as L.LatLngExpression || [51, -0.09]}
            zoom={zoom}
            scrollWheelZoom={scrollWheelZoom}
            className={className}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {center && (
                <>
                    <Marker 
                        position={center as L.LatLngExpression}
                        icon={icon}
                    />
                    <ChangeView center={center as L.LatLngExpression} />
                </>
            )}
            <ZoomControl position="bottomright" />
        </MapContainer>
    )
}

export default Map