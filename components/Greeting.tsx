import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  withTiming,
  useAnimatedStyle,
  Easing,
  withDelay,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'react-native';

type GreetingProps = {
  name: string;
  navigation: any;
};

const Greeting: React.FC<GreetingProps> = ({ name, navigation }) => {
  // Animated styles
  const fadeInAnim = useAnimatedStyle(() => ({
    opacity: withTiming(1, { duration: 1500, easing: Easing.ease }),
    transform: [
      { translateY: withTiming(0, { duration: 1500, easing: Easing.ease }) },
      { scale: withTiming(1, { duration: 1500, easing: Easing.ease }) }, 
    ],
  }));

  const fadeInNameAnim = useAnimatedStyle(() => ({
    opacity: withDelay(500, withTiming(1, { duration: 1500, easing: Easing.ease })),
    transform: [
      { translateY: withDelay(500, withTiming(0, { duration: 1500, easing: Easing.ease })) },
      { scale: withTiming(1, { duration: 1500, easing: Easing.ease }) },
    ],
  }));

  const fadeInAnnouncementAnim = useAnimatedStyle(() => ({
    opacity: withDelay(1000, withTiming(1, { duration: 1500, easing: Easing.ease })),
    transform: [
      { translateY: withDelay(1000, withTiming(0, { duration: 1500, easing: Easing.ease })) },
      { scale: withTiming(1, { duration: 1500, easing: Easing.ease }) },
    ],
  }));

  const buttonScaleAnim = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(1.1, { duration: 300 }) }], 
  }));

  return (
    <LinearGradient colors={['#add8e6', '#007BFF']} style={styles.container}>
      {/* Animated "Hi" text */}
      <Animated.Text style={[styles.greetingText, fadeInAnim]}>Hi</Animated.Text>

      {/* Animated name text */}
      <Animated.Text style={[styles.nameText, fadeInNameAnim]}>
        Welcome <Text style={styles.nameHighlight}>{name}</Text>!
      </Animated.Text>

      {/* Animated announcement box */}
      <Animated.View style={[styles.announcementBox, fadeInAnnouncementAnim]}>
        <Text style={styles.announcementText}>
          Enjoy exploring this app, powered by a seamless experience and supported by ads. Tap
          the arrow below to continue.
        </Text>
      </Animated.View>

      {/* Navigate to Home button */}
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Animated.View style={buttonScaleAnim}>
          <Ionicons name="arrow-forward-circle" size={60} color="#fff" />
        </Animated.View>
      </TouchableOpacity>

     {/* Footer */}
    <View style={styles.footer}>
      <Text style={styles.footerText}>✨ Powered by Creativity ✨</Text>
      <Text style={styles.footerText}>Developed by Mxolisi</Text>
    </View>


      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  nameText: {
    fontSize: 24,
    color: '#f8f9fa',
    marginTop: 10,
  },
  nameHighlight: {
    fontWeight: 'bold',
    color: '#FFD700',
  },
  announcementBox: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
    width: '90%',
  },
  announcementText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },
  arrowButton: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default Greeting;
