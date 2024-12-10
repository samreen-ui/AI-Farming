import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  ScrollView,
  ActivityIndicator,  // Import ActivityIndicator
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const CropYieldPredictionScreen = () => {
  const route = useRoute();
  const { predictedRainfall, year, state } = route.params;

  const [cropName, setCropName] = useState('');
  const [fertilizer, setFertilizer] = useState('');
  const [pesticides, setPesticides] = useState('');
  const [predictedYield, setPredictedYield] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [inputYear, setInputYear] = useState(year); // New state for year input
  const [inputState, setInputState] = useState(state); // New state for state input
  const [inputRainfall, setInputRainfall] = useState(predictedRainfall); // New state for rainfall input

  const handleYieldPrediction = async () => {
    if (!inputYear || !inputState || !cropName || !fertilizer || !pesticides) {
      Alert.alert('Input Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        'https://5513-2409-40f0-101a-5b98-dc-3367-e28e-f9aa.ngrok-free.app/predict_yield',
        {
          year: inputYear,
          state: inputState,
          crop_name: cropName,
          rainfall: inputRainfall,
          fertilizer,
          pesticides,
        }
      );

      if (response.data && response.data.predicted_yield) {
        setPredictedYield(response.data.predicted_yield);
        await savePredictionToUserDocument(cropName, fertilizer, pesticides, response.data.predicted_yield); // Save to Firestore
      } else {
        throw new Error('Invalid response from the API');
      }
    } catch (error) {
      console.error('Error during yield prediction:', error.message);
      Alert.alert('Error', 'Failed to predict crop yield. Please try again later.');
    } finally {
      setLoading(false); // End loading
    }
  };

  const savePredictionToUserDocument = async (cropName, fertilizer, pesticides, predictedYield) => {
    try {
      const user = auth().currentUser;
      if (!user) {
        Alert.alert('Error', 'User not authenticated.');
        return;
      }

      const userDocRef = firestore().collection('users').doc(user.uid);
      await userDocRef.update({
        predictions: firestore.FieldValue.arrayUnion({
          cropName,
          fertilizer,
          pesticides,
          predictedYield,
        }),
      });
      console.log('Prediction saved successfully!');
    } catch (error) {
      console.error('Error saving prediction to Firestore:', error.message);
      Alert.alert('Error', 'Failed to save prediction.');
    }
  };

  return (
    <ImageBackground 
    // source={require('./crop.jpg')} 
    source={{uri:'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjgwMC1teW50LTIyLmpwZw.jpg'}}
    style={styles.imageBackground}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.heading}>Crop Yield Prediction</Text>

          <TextInput
            style={styles.input}
            placeholder="🌾 Enter Crop Name"
            value={cropName}
            onChangeText={setCropName}
          />
          <TextInput
            style={styles.input}
            placeholder="🌿 Enter Fertilizer (in kg)"
            value={fertilizer}
            onChangeText={setFertilizer}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="🐞 Enter Pesticides (in liters)"
            value={pesticides}
            onChangeText={setPesticides}
            keyboardType="numeric"
          />
          
          <TextInput
            style={styles.input}
            placeholder="📅 Enter Year"
            value={inputYear}
            onChangeText={setInputYear}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="📍 Enter State"
            value={inputState}
            onChangeText={setInputState}
          />
          <TextInput
            style={styles.input}
            placeholder="💧 Predicted Rainfall"
            value={inputRainfall.toString()} // Ensure value is a string
            onChangeText={setInputRainfall}
            keyboardType="numeric"
            editable={false} // Make this field non-editable if you want to prevent changes
          />

          <TouchableOpacity onPress={handleYieldPrediction} disabled={loading}>
            <LinearGradient colors={['#006400', '#50C878']} style={styles.button}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" /> // Show loading spinner
              ) : (
                <Text style={styles.buttonText}>Predict Yield</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {predictedYield && (
            <View style={styles.resultCard}>
              <Text style={styles.resultText}>Predicted Yield: {predictedYield} tons</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 350,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'b',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  button: {
    height: 50,
    borderRadius: 25,
    width: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultCard: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#006400',
  },
});

export default CropYieldPredictionScreen;
