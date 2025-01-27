import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

type MapScreenProps = {
  route: {
    params: {
      searchType: string;
    };
  };
};

const MapScreen: React.FC<MapScreenProps> = ({ route }) => {
  const { searchType } = route.params;
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  const handleSearch = () => {
    // Handle search based on `query` and `searchType`
    console.log(`Searching for ${query} in ${searchType}`);
  };

  return (
    <View style={styles.container}>
      <Text>Search for {searchType}:</Text>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder={`Enter ${searchType}`}
      />
      <Button title="Search" onPress={handleSearch} />
      
      {location ? (
        <MapView
          style={styles.map}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} />
        </MapView>
      ) : (
        <Text>Loading location...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10,
  },
  map: {
    width: '100%',
    height: 400,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default MapScreen;
