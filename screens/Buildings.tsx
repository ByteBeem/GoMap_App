import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CategoryScreen from '../components/CategoryScreen';
import { Flow } from 'react-native-animated-spinkit';
import { FetchBuildings } from '../utils/network';
import * as Location from 'expo-location';

const Buildings: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [buildings, setBuildings] = useState('');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);


  const fetchLocation = async () => {

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.error('Location permission denied!');
      return;
    }

    // Get the current position
    const locationData = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: locationData.coords.latitude,
      longitude: locationData.coords.longitude,
    });
  };

  // Fetch building data
  const fetch = async () => {
   
    setLoading(true);
    const token = 'your_token_here';
    try {
      const data = await FetchBuildings(token , location);
      setLoading(false);
      setBuildings(data.buildings);
    } catch (error) {
      console.error('Error in fetchHalls:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();  // Fetch building data
    fetchLocation();  // Fetch location
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Flow size={64} color="#4CAF50" />
      </View>
    );
  }

  return (
    <CategoryScreen
      navigation={navigation}
      title="Buildings"
      data={buildings}
    >
      {/* Display user's current location */}
      {location && (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
          </Text>
        </View>
      )}
    </CategoryScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  shimmerItem: {
    width: '80%',
    height: 100,
    borderRadius: 12,
  },
  locationContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 20,
  },
  locationText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Buildings;
