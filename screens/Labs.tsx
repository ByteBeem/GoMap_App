import React,{useEffect , useState} from 'react';
import CategoryScreen from '../components/CategoryScreen';
import labs from '../utils/lectureHalls.json'; 
import { Flow } from 'react-native-animated-spinkit';
import { View, StyleSheet } from 'react-native';

const Labs: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
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
      title="Labs"
      data={labs}
    />
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
});

export default Labs;
