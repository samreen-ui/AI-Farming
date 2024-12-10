// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import { auth } from '../firebaseConfig'; // Assuming firebaseConfig contains your firebase setup
// import { useNavigation } from '@react-navigation/native';

// const AuthenticatedScreen = ({ handleLogout }) => {
//   const [storedUsername, setStoredUsername] = useState(''); // Local state to hold the fetched username
//   const navigation = useNavigation(); // Hook for navigation

//   useEffect(() => {
//     // Fetch the username from Firestore on component mount
//     const fetchUsername = async () => {
//       try {
//         const userDocRef = firestore().collection('users').doc(auth().currentUser.uid);
//         const userDoc = await userDocRef.get();
//         if (userDoc.exists) {
//           setStoredUsername(userDoc.data().username); // Set the fetched username in state
//         } else {
//           console.log('No user data found');
//         }
//       } catch (error) {
//         console.error('Error fetching username:', error);
//       }
//     };

//     fetchUsername(); // Call the function to fetch the username
//   }, []);

//   return (
//     <ImageBackground 
//       source={require('./AUthent.jpg')} // Background image
//       style={styles.imageBackground}
//     >
//       <View style={styles.authContainer}>
//         <Text style={[styles.title, { color: 'lavender', marginTop: 10, fontSize: 25, fontWeight: 'bold' }]}>
//           Hello {storedUsername},{'\n\n'}Welcome to GrowSmart{'\n\n'}
//         </Text>

//         {/* Button to navigate to Crop Classification */}
//         <TouchableOpacity 
//           style={[styles.button, { backgroundColor: '#4682b4' }]} 
//           onPress={() => navigation.navigate('CropClassification')} // Navigate to CropClassificationScreen
//         >
//           <Text style={styles.buttonText}>Crop Classification</Text>
//         </TouchableOpacity>

//         {/* Button to navigate to Rainfall Prediction */}
//         <TouchableOpacity 
//           style={[styles.button, { backgroundColor: '#4682b4' }]} 
//           onPress={() => navigation.navigate('RainfallPrediction')} // Navigate to RainfallPredictionScreen
//         >
//           <Text style={styles.buttonText}>Crop Analysis</Text>
//         </TouchableOpacity>
        
//         {/* Button to navigate to the App Details */}
//         <TouchableOpacity 
//           style={styles.button} 
//           onPress={() => navigation.navigate('Details')} // Navigate to Details screen
//         >
//           <Text style={styles.buttonText}>Details</Text>
//         </TouchableOpacity>
        
//         {/* Logout Button */}
//         <TouchableOpacity 
//           style={[styles.button, { backgroundColor: 'black', height: 40, width: 200, padding: 8 }]} 
//           onPress={handleLogout}
//         >
//           <Text style={[styles.buttonText, { color: 'white', fontSize: 15 }]}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   imageBackground: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     height: '100%',
//   },
//   authContainer: {
//     width: '95%',
//     borderRadius: 30,
//     padding: 8,
//     backgroundColor: 'rgba(211, 211, 211,0.3)',
//     alignItems: 'center',
//     marginTop: 10,
//     height: '50%',
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 25,
//     textAlign: 'center',
//     color: 'white',
//   },
//   button: {
//     backgroundColor: '#3b9b50',
//     padding: 10,
//     borderRadius: 30,
//     marginTop: 10,
//     width: 200,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default AuthenticatedScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { auth } from '../firebaseConfig'; // Assuming firebaseConfig contains your firebase setup
import { useNavigation } from '@react-navigation/native';

const AuthenticatedScreen = ({ handleLogout }) => {
  const [storedUsername, setStoredUsername] = useState(''); // Local state to hold the fetched username
  const navigation = useNavigation(); // Hook for navigation

  useEffect(() => {
    // Fetch the username from Firestore on component mount
    const fetchUsername = async () => {
      try {
        const userDocRef = firestore().collection('users').doc(auth().currentUser.uid);
        const userDoc = await userDocRef.get();
        if (userDoc.exists) {
          setStoredUsername(userDoc.data().username); // Set the fetched username in state
        } else {
          console.log('No user data found');
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername(); // Call the function to fetch the username
  }, []);

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDgxfHxiYWNrZ3JvdW5kfGVufDB8fDB8fHww'}}
      // source={require('./AUthent.jpg')} // Background image
      style={styles.imageBackground}
    >
      <View style={styles.authContainer}>
        <Text style={[styles.title, { color: 'lavender', marginTop: 10, fontSize: 25, fontWeight: 'bold' }]}>
          Hello {storedUsername},{'\n\n'}Welcome to GrowSmart{'\n\n'}
        </Text>

        {/* Button to navigate to Crop Classification */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#4682b4' }]} 
          onPress={() => navigation.navigate('CropClassification')} // Navigate to CropClassificationScreen
        >
          <Text style={styles.buttonText}>        Arial View{'\n'}Crop Classification</Text>
        </TouchableOpacity>

        {/* Button to navigate to Rainfall Prediction */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#4682b4' }]} 
          onPress={() => navigation.navigate('RainfallPrediction')} // Navigate to RainfallPredictionScreen
        >
          <Text style={styles.buttonText}>Crop Analysis</Text>
        </TouchableOpacity>

        {/* Button to navigate to Land Classification */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#4682b4' }]} 
          onPress={() => navigation.navigate('LandClassification')} // Navigate to LandClassificationScreen
        >
          <Text style={styles.buttonText}>Realtime land classification{'\n'}              (using GEE)</Text>
        </TouchableOpacity>
        
        {/* Button to navigate to the App Details */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Details')} // Navigate to Details screen
        >
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
        
        {/* Logout Button */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: 'black', height: 40, width: 200, padding: 8 }]} 
          onPress={handleLogout}
        >
          <Text style={[styles.buttonText, { color: 'white', fontSize: 15 }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  authContainer: {
    width: '95%',
    borderRadius: 30,
    padding: 8,
    backgroundColor: 'rgba(128, 128, 128, 0.3)',
    alignItems: 'center',
    marginTop: 10,
    height: '60%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: 'b',
  },
  button: {
    backgroundColor: '#3b9b50',
    padding: 10,
    borderRadius: 30,
    marginTop: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AuthenticatedScreen;
