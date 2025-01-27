import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location'; 

// Define the types for the props
interface DirectionsScreenProps {
  destinationLat: number;
  destinationLon: number;
  route:any;
}

const DirectionsScreen: React.FC<DirectionsScreenProps> = ({ route }) => {
  const [loadingStatus, setLoadingStatus] = useState<string>('Fetching your location...');
  const { destinationLat, destinationLon} = route.params;
  const [loading, setLoading] = useState<boolean>(true);
  const [directions, setDirections] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const GOOGLE_MAPS_API_KEY = 'AIzaSyB__-blMRfAVFYX2j4ZD_2H7sd9rMOn-MM'; 

  const fetchRoutes = async (originLat: number, originLon: number, destLat: number, destLon: number) => {
    try {
      setLoadingStatus('Finding directions...');
      const response = await axios.post(
        'https://routes.googleapis.com/directions/v2:computeRoutes',
        {
          origin: {
            location: {
              latLng: {
                latitude: originLat,
                longitude: originLon,
              },
            },
          },
          destination: {
            location: {
              latLng: {
                latitude: destLat,
                longitude: destLon,
              },
            },
          },
          travelMode: 'DRIVE', 
          routingPreference: 'TRAFFIC_AWARE', 
          computeAlternativeRoutes: false,
          routeModifiers: {
            avoidTolls: false,
            avoidHighways: false,
            avoidFerries: false,
          },
          languageCode: 'en-US',
          units: 'IMPERIAL',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
            'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
          },
        }
      );
      console.log('Routes API Response:', response.data); 
      if (response.data.routes.length > 0) {
        setDirections(response.data.routes[0].polyline.encodedPolyline);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching routes:', error);
      setLoadingStatus('Error fetching routes.');
      setLoading(false);
    }
  };

  // Function to get current location of the user
  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied for location access');
      setLoadingStatus('Location permission denied');
      setLoading(false);
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location.coords);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      setLoadingStatus('Finding directions...');
      console.log('currentLocation:',currentLocation.latitude);
      console.log('currentLocation', currentLocation.longitude);
      console.log('destinationLon:',destinationLon);
      console.log('destinationLat', destinationLat);
      fetchRoutes(currentLocation.latitude, currentLocation.longitude, destinationLat, destinationLon);
    }
  }, [currentLocation, destinationLat, destinationLon]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>{loadingStatus}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation ? currentLocation.latitude : 0,
          longitude: currentLocation ? currentLocation.longitude : 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {currentLocation && (
          <Marker coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }} title="Your Location" />
        )}
        {directions && (
          <Polyline
            coordinates={decodePolyline(directions)}
            strokeColor="blue"
            strokeWidth={5}
          />
        )}
        {destinationLat && destinationLon && (
          <Marker coordinate={{ latitude: destinationLat, longitude: destinationLon }} title="Destination" />
        )}
      </MapView>
    </View>
  );
};

// Decode polyline string (Google Maps API response returns encoded polyline)
const decodePolyline = (encoded: string) => {
  let points: { latitude: number; longitude: number }[] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let byte, shift = 0, result = 0;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    let dlat = (result & 1) ? ~(result >> 1) : (result >> 1);
    lat += dlat;

    shift = 0;
    result = 0;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    let dlng = (result & 1) ? ~(result >> 1) : (result >> 1);
    lng += dlng;

    points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
  }
  return points;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  map: {
    width: '100%',
    height: '80%',
  },
});

export default DirectionsScreen;
