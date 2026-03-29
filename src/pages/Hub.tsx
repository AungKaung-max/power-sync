import { getHubLocation } from '@/backend/fetchHubLocation';
import { calculateDistance } from '@/utils/distance';
import { febLocationFieldMap, mapFields } from '@/utils/mapper';
import { motion } from 'framer-motion';
import L from 'leaflet';
import { ArrowLeft, ChevronRight, MapPin, Wifi, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

type HubProps = {
  userLocation: { lat: number; lng: number } | null;
};

type Hub = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  power: number;
  price: number;
  status: string;
  available_slots: number;
  total_slots: number;
  distance: number;
  wifi: boolean
};

const RecenterMap = ({ center }: { center: { lat: number; lng: number } }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo([center.lat, center.lng], 13);
  }, [center, map]);
  return null;
};

const Hub = ({ userLocation }: HubProps) => {
  console.log("userLocation", userLocation)
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // Update center if userLocation is available
  useEffect(() => {
    if (userLocation) setCenter(userLocation);
    console.log("center", center)
  }, [userLocation]);

  useEffect(() => {
    const getHubLocations = async () => {
      try {
        let payload = { op: "READ" };
        setLoading(true);
        const results = await getHubLocation(payload);
        console.log("results", results)
        const locations = results.map((r: any) => {
          const hub = mapFields(r, febLocationFieldMap);
          console.log("hub", hub);
          const distance = center
            ? calculateDistance(center.lat, center.lng, hub.latitude, hub.longitude)
            : 0;
          return {
            ...hub,
            distance
          }

        })
        console.log("locations", locations)
        locations.sort((a: Hub, b: Hub) => a.distance - b.distance);
        setHubs(locations)
      } catch (error) {
        console.log("error", error)
      } finally {
        setLoading(false);
      }
    }
    getHubLocations()
  }, [userLocation])

  // Optional: Custom marker icon like your previous code
  const createCustomIcon = (color: string) =>
    L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color:${color}; width:20px; height:20px; border-radius:50%; border:3px solid white; box-shadow:0 2px 4px rgba(0,0,0,0.3)"></div>`,
      iconSize: [26, 26],
      iconAnchor: [13, 13],
    });

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-5 flex items-center gap-3 bg-white border-b border-slate-100">
        <button onClick={() => navigate('/')} className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
          <ArrowLeft size={14} />
        </button>
        <h1 className="text-base font-bold">Nearby Hubs</h1>
      </div>

      {/* Map */}
      <div className="relative h-[200px]">
        {center ? (
          <MapContainer center={center} zoom={13} className="w-full h-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
            />

            {/* Recenter helper */}
            <RecenterMap center={center} />

            {/* User location */}
            <CircleMarker
              center={center}
              radius={8}
              pathOptions={{ color: '#4285F4', fillColor: '#4285F4', fillOpacity: 1 }}
            />

            {/* Hub markers */}
            {hubs.map(hub => (
              <Marker
                key={hub.id}
                position={{ lat: hub.latitude, lng: hub.longitude }}
                icon={createCustomIcon('#059669')}
              >
                <Popup>
                  <strong>{hub.name}</strong><br />
                  <strong>{hub.address}</strong><br />
                  Power: {hub.power} | Distance: {hub.distance.toFixed(1)} km
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Waiting for location…
          </div>
        )}
      </div>

      {/* Bottom Sheet / Hub List */}
      <div className="bg-white rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-5 max-h-[45%] overflow-y-auto hide-scrollbar relative z-10">
        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4" />
        <div className="space-y-2">
          {loading
            ? Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="w-full glass-card p-3 rounded-3xl flex items-center gap-3 text-left animate-pulse bg-slate-100"
                >
                  <div className="w-9 h-9 bg-slate-200 rounded-xl flex-shrink-0" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-3 bg-slate-200 rounded w-1/2" />
                    <div className="h-2 bg-slate-200 rounded w-1/4 mt-1" />
                  </div>
                </div>
              ))
            : hubs.map((hub, i) => (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={hub.id}
                onClick={() => { navigate(`/hubs/${hub.id}`, { state: { hub } }); }}
                className="w-full glass-card p-3 rounded-3xl flex items-center gap-3 text-left transition-all active:scale-[0.98]"
              >
                <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Zap className="text-primary" size={18} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{hub.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-text-muted text-[10px] flex items-center gap-1 font-medium">
                      <MapPin size={10} />
                      <span className="text-primary text-[10px] font-bold">{hub.distance.toFixed(1)}km</span>
                    </span>
                    <span className="w-0.5 h-0.5 bg-slate-300 rounded-full" />
                    <span className="text-primary text-[10px] font-bold">{hub.power}W</span>
                    {hub.wifi && (
                      <span className="ml-1 text-blue-500">
                        <Wifi size={12} />
                      </span>
                    )}
                  </div>
                  <span className="text-green-500 text-[10px] font-bold">
                    {hub.price} Ks/hr
                  </span>
                </div>
                <ChevronRight size={14} className="text-slate-300" />
              </motion.button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Hub;