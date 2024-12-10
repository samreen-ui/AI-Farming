import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.replace('Auth'); // Navigate to the Auth workflow
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={{
            uri: 'https://i.postimg.cc/MH8dpDwg/Screenshot-2024-12-04-235801.png',
          }}
          style={styles.image}
        />
        <Text style={styles.subtitle}>Welcome to GrowSmart</Text>
        <TouchableOpacity style={[styles.button,{marginBottom: 12}]} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        
          <Text style={{color: 'grey', marginTop: 15, textAlign: 'center', fontSize: 14, fontWeight: 'bold'}}>
    © 2024 GrowSmart
    {'\n'}
    {/* <Text style={{color: 'black', marginTop: 4, fontSize: 12, fontStyle: 'italic'}}>
        Developed by Prranith. All rights reserved.
    </Text> */}
</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 350,
    height: 300,
    marginBottom: 100,
    borderRadius: 15,
    padding:3,
    
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#555',
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
