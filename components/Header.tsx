import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>GoMap</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200EE',
  },
  title: {
    fontSize: 24,
    color: '#fff',
  },
});

export default Header;
