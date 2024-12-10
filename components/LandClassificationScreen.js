import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const LandClassificationScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [landPrediction, setLandPrediction] = useState(null);
  const [error, setError] = useState(null);

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
        setLandPrediction(null); // Reset previous prediction
        setError(null); // Reset error
      } else if (response.didCancel) {
        Alert.alert('Cancelled', 'Image selection cancelled.');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      }
    });
  };

  const uploadImage = async () => {
    if (!imageUri) {
      setError('Please select an image first.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'land_image.jpg',
      });

      const response = await axios.post('https://5513-2409-40f0-101a-5b98-dc-3367-e28e-f9aa.ngrok-free.app/predict_land', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setLandPrediction(response.data);
    } catch (err) {
      setError('Failed to predict land type. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjgwMC1teW50LTIyLmpwZw.jpg' }}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Land Classification</Text>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        <TouchableOpacity style={styles.button} onPress={selectImage}>
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={uploadImage}>
          <Text style={styles.buttonText}>Upload and Predict</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="large" color="#fff" />}
        {landPrediction && (
          <View>
            <Text style={styles.resultText}>Class: {landPrediction.class}</Text>
            <Text style={styles.resultText}>
              Confidence: {(landPrediction.confidence * 100).toFixed(2)}%
            </Text>
          </View>
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.7, // Set the background image opacity to make UI elements stand out
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'black',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
    color: 'red',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
});

export default LandClassificationScreen;
