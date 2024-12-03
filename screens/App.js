// import React, { useState, useEffect } from 'react';
// import { Alert } from 'react-native';
// import AuthScreen from '../components/AuthScreen';
// import AuthenticatedScreen from '../components/AuthenticatedScreen';
// import DetailScreen from '../components/DetailScreen';
// import RainfallPredictionScreen from '../components/RainfallPredictionScreen';
// import CropPredictionScreen from '../components/CropPredictionScreen';
// import { auth } from '../firebaseConfig';
// import firestore from '@react-native-firebase/firestore';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { enableScreens } from 'react-native-screens';
// import CropYieldPredictionScreen from '../components/CropYieldPredictionScreen';
// import CropClassificationScreen from '../components/CropClassification'; // Updated the path here

// enableScreens();
// const Stack = createStackNavigator();

// export default function App() {
//   const [userName, setUserName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [user, setUser] = useState(null);
//   const [isLogin, setIsLogin] = useState(true);
//   const [verificationId, setVerificationId] = useState('');
//   const [signUpMethod, setSignUpMethod] = useState('email');
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   useEffect(() => {
//     const unsubscribe = auth().onAuthStateChanged(user => {
//       setUser(user);
//     });

//     return () => unsubscribe();
//   }, []);

//   const addUser = async () => {
//     try {
//       const userDocRef = firestore().collection('users').doc(auth().currentUser.uid);
//       await userDocRef.set({
//         username: userName,
//         email: email,
//         Mobile_Number: phoneNumber,
//         createdAt: firestore.FieldValue.serverTimestamp(),
//       });
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   const sendVerificationCode = async (phoneNumber) => {
//     try {
//       const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//       return confirmation.verificationId;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const handleAuthentication = async () => {
//     try {
//       if (isLogin) {
//         if (signUpMethod === 'email') {
//           await handleLoginWithEmail();
//         } else {
//           const verificationId = await sendVerificationCode(phoneNumber);
//           setVerificationId(verificationId);
//           setIsModalVisible(true);
//         }
//       } else {
//         if (signUpMethod === 'email') {
//           await handleSignupWithEmail();
//         } else {
//           const verificationId = await sendVerificationCode(phoneNumber);
//           setVerificationId(verificationId);
//           setIsModalVisible(true);
//         }
//       }
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   const handleLoginWithEmail = async () => {
//     try {
//       await auth().signInWithEmailAndPassword(email, password);
//       const userDocRef = firestore().collection('users').doc(auth().currentUser.uid);
//       const userDoc = await userDocRef.get();

//       if (userDoc.exists) {
//         const storedUsername = userDoc.data().username;
//         if (storedUsername !== userName) {
//           Alert.alert('Error', 'Username does not match. Please check your username.');
//           await auth().signOut();
//         }
//       } else {
//         Alert.alert('Error', 'No user data found. Please contact support.');
//         await auth().signOut();
//       }
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   const handleSignupWithEmail = async () => {
//     try {
//       const userCredential = await auth().createUserWithEmailAndPassword(email, password);
//       const user = userCredential.user;
//       await user.sendEmailVerification();
//       Alert.alert('Please check your Email and verify to signup!');
//       await addUser();
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   const handleForgotPassword = async () => {
//     if (!email) {
//       Alert.alert('Please enter your email to reset your password');
//       return;
//     }
//     try {
//       await auth().sendPasswordResetEmail(email);
//       Alert.alert('Password Reset', 'Check your email for a link to reset your password');
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await auth().signOut();
//       setUser(null);
//     } catch (error) {
//       Alert.alert('Logout Error', error.message);
//     }
//   };

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {user ? (
//           <>
//             <Stack.Screen name="Authenticated" options={{ headerShown: false }}>
//               {(props) => <AuthenticatedScreen {...props} user={user} handleLogout={handleLogout} />}
//             </Stack.Screen>
//             <Stack.Screen name="Details" component={DetailScreen} options={{ headerShown: false }} />
//             <Stack.Screen
//               name="RainfallPrediction"
//               component={RainfallPredictionScreen}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="CropPrediction"
//               component={CropPredictionScreen}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="CropYieldPrediction"
//               component={CropYieldPredictionScreen}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="CropClassification"
//               component={CropClassificationScreen}  // Added Crop Classification screen here
//               options={{ headerShown: false }}
//             />
//           </>
//         ) : (
//           <Stack.Screen name="Auth" options={{ headerShown: false }}>
//             {(props) => (
//               <AuthScreen
//                 {...props}
//                 email={email}
//                 setEmail={setEmail}
//                 password={password}
//                 setPassword={setPassword}
//                 phoneNumber={phoneNumber}
//                 setPhoneNumber={setPhoneNumber}
//                 isLogin={isLogin}
//                 setIsLogin={setIsLogin}
//                 handleAuthentication={handleAuthentication}
//                 signUpMethod={signUpMethod}
//                 setSignUpMethod={setSignUpMethod}
//                 handleGetOTP={sendVerificationCode}
//                 userName={userName}
//                 setUserName={setUserName}
//                 handleForgotPassword={handleForgotPassword}
//               />
//             )}
//           </Stack.Screen>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AuthScreen from '../components/AuthScreen';
import AuthenticatedScreen from '../components/AuthenticatedScreen';
import DetailScreen from '../components/DetailScreen';
import RainfallPredictionScreen from '../components/RainfallPredictionScreen';
import CropPredictionScreen from '../components/CropPredictionScreen';
import LandClassificationScreen from '../components/LandClassificationScreen'; // Import LandClassificationScreen
import { auth } from '../firebaseConfig';
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import CropClassificationScreen from '../components/CropClassification';
import CropYieldPredictionScreen from '../components/CropYieldPredictionScreen';

enableScreens();
const Stack = createStackNavigator();

export default function App() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [verificationId, setVerificationId] = useState('');
  const [signUpMethod, setSignUpMethod] = useState('email');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const addUser = async () => {
    try {
      const userDocRef = firestore().collection('users').doc(auth().currentUser.uid);
      await userDocRef.set({
        username: userName,
        email: email,
        Mobile_Number: phoneNumber,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const sendVerificationCode = async (phoneNumber) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      return confirmation.verificationId;
    } catch (error) {
      throw error;
    }
  };

  const handleAuthentication = async () => {
    try {
      if (isLogin) {
        if (signUpMethod === 'email') {
          await handleLoginWithEmail();
        } else {
          const verificationId = await sendVerificationCode(phoneNumber);
          setVerificationId(verificationId);
          setIsModalVisible(true);
        }
      } else {
        if (signUpMethod === 'email') {
          await handleSignupWithEmail();
        } else {
          const verificationId = await sendVerificationCode(phoneNumber);
          setVerificationId(verificationId);
          setIsModalVisible(true);
        }
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleLoginWithEmail = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      const userDocRef = firestore().collection('users').doc(auth().currentUser.uid);
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        const storedUsername = userDoc.data().username;
        if (storedUsername !== userName) {
          Alert.alert('Error', 'Username does not match. Please check your username.');
          await auth().signOut();
        }
      } else {
        Alert.alert('Error', 'No user data found. Please contact support.');
        await auth().signOut();
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSignupWithEmail = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      await user.sendEmailVerification();
      Alert.alert('Please check your Email and verify to signup!');
      await addUser();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Please enter your email to reset your password');
      return;
    }
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Password Reset', 'Check your email for a link to reset your password');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      setUser(null);
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Authenticated" options={{ headerShown: false }}>
              {(props) => <AuthenticatedScreen {...props} user={user} handleLogout={handleLogout} />}
            </Stack.Screen>
            <Stack.Screen name="Details" component={DetailScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name="RainfallPrediction"
              component={RainfallPredictionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CropPrediction"
              component={CropPredictionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CropYieldPrediction"
              component={CropYieldPredictionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LandClassification"
              component={LandClassificationScreen} // Added Land Classification screen
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CropClassification"
              component={CropClassificationScreen} // Added Land Classification screen
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" options={{ headerShown: false }}>
            {(props) => (
              <AuthScreen
                {...props}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                handleAuthentication={handleAuthentication}
                signUpMethod={signUpMethod}
                setSignUpMethod={setSignUpMethod}
                handleGetOTP={sendVerificationCode}
                userName={userName}
                setUserName={setUserName}
                handleForgotPassword={handleForgotPassword}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
