import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


type CategoryScreenProps = {
  navigation: any;
  title: string;
  data: { id: number; name: string; distance: string; description: string; imageUrl: string }[];
};

const CategoryScreen: React.FC<CategoryScreenProps> = ({ navigation, title, data }) => {
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.hallName}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.label}>Distance:</Text>
        <Text style={styles.distance}>{item.distance}</Text>
      </View>
      <TouchableOpacity 
  style={styles.detailsButton} 
  onPress={() => {
    // Navigate to DirectionsScreen and pass the destination coordinates
    navigation.navigate('DirectionsScreen', {
      destinationLat: -25.0981378,
      destinationLon: 30.4197458,
    });
  }}
  
>
  <Text style={styles.detailsButtonText}>Get Directions</Text>
</TouchableOpacity>

    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* FlatList */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 16,
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 50,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    minHeight: 180, 
  },
  cardImage: {  
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 12,
  },
  hallName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  distance: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  detailsButton: {
    marginTop: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CategoryScreen;
