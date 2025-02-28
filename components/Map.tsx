import dynamic from "next/dynamic";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
}
const Map = ({ center }: MapProps) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "200px" }}
      zoom={7}
      center={center}
      options={options}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

export default dynamic(() => Promise.resolve(Map), { ssr: false });
