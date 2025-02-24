// components/Map.js
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}
const Map = ({ center, zoom }: MapProps) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    [],
  );

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <GoogleMap mapContainerStyle={{ width: "100%", height: "200px" }} zoom={zoom} center={center} options={options}>
      <Marker position={center} />
    </GoogleMap>
  );
};

export default dynamic(() => Promise.resolve(Map), { ssr: false });
