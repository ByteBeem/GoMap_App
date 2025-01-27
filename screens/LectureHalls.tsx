import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import CategoryScreen from '../components/CategoryScreen';

import { FetchLectureHalls } from '../utils/network';
import { Flow } from 'react-native-animated-spinkit';

const LectureHalls: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [halls , setHalls] = useState('');

  const fetchHalls = async () => {

    setLoading(true);
    const token = 'your_token_here'; 
    try {
      const data = await FetchLectureHalls(token);
      setLoading(false);
      setHalls(data);
     
    } catch (error) {
      console.error('Error in fetchHalls:', error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchHalls();
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
      title="Lecture Halls"
      data={halls}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4', 
    padding: 16,
  },
});

export default LectureHalls;
