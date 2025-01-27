import React from 'react';
import { Marker } from 'react-native-maps';

type LocationMarkerProps = {
  latitude: number;
  longitude: number;
};

const LocationMarker: React.FC<LocationMarkerProps> = ({ latitude, longitude }) => (
  <Marker coordinate={{ latitude, longitude }} />
);

export default LocationMarker;
