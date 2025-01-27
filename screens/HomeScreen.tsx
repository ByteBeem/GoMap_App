import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type HomeScreenProps = {
  navigation: any;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#add8e6', '#007BFF']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/go-map.webp')} style={styles.logo} />
        <Text style={styles.appName}>GoMap</Text>
      </View>

      {/* Content */}
      <View style={styles.contentBox}>
        <Image source={require('../assets/uni-logo.webp')} style={styles.uniLogo} />
        <Text style={styles.title}>University Of Limpopo</Text>

        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.navigate('LectureHalls', { searchType: 'LectureHalls' })}
        >
          <Text style={styles.buttonText}>Lecture Halls</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('Buildings', { searchType: 'Buildings' })}
        >
          <Text style={styles.buttonText}>Buildings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.navigate('Labs', { searchType: 'Labs' })}
        >
          <Text style={styles.buttonText}>Labs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('Student', { searchType: 'student' })}
        >
          <Text style={styles.buttonText}>Locate Student</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerTextWrapper}>
          <Ionicons name="lock-closed-outline" size={16} color="#fff" />
          <Text style={styles.footerText}>Mxolisi © 2025</Text>
        </View>
        <Text style={styles.footerDisclaimer}>Built with ❤️ for the University of Limpopo.</Text>
      </View>

      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  appName: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  contentBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginTop: 120,
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  uniLogo: {
    width: 70,
    height: 70,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#444',
    textAlign: 'center',
  },
  button: {
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    maxWidth: 280,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
  },
  secondaryButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  footerTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 5,
  },
  footerDisclaimer: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default HomeScreen;
