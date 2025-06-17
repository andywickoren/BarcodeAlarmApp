// // App.tsx
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { AlarmProvider } from './context/AlarmContext';

// // Screens
// import OnboardingScreen from './src/components/OnboardingScreen/OnboardingScreen';
// import HomeScreen from './src/components/HomeScreen/HomeScreen';
// import AlarmSetupScreen from './src/components/AlarmSetupScreen/AlarmSetupScreen';
// import SuccessScreen from './src/components/SuccessScreen/SuccessScreen';
// import ActiveAlarmScreen from './src/components/ActiveAlarmScreen/ActiveAlarmScreen';
// import BarcodeScanner from './src/components/BarcodeScanner/BarcodeScanner';

// export type RootStackParamList = {
//   Onboarding: undefined;
//   Home: undefined;
//   AlarmSetup: undefined;
//   Success: undefined;
//   ActiveAlarm: undefined;
//   BarcodeScanner: undefined;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// function AppEd(): React.JSX.Element {
//   return (
//     <NavigationContainer>
//       <AlarmProvider>
//       <Stack.Navigator initialRouteName="Home">

//       {/* <Stack.Navigator initialRouteName="Onboarding"> */}
//         <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Your Alarms' }} />
//         <Stack.Screen name="AlarmSetup" component={AlarmSetupScreen} options={{ title: 'Set Alarm' }} />
//         <Stack.Screen name="Success" component={SuccessScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="ActiveAlarm" component={ActiveAlarmScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} options={{ title: 'Scan Barcode' }} />
//       </Stack.Navigator>
//       </AlarmProvider>
//     </NavigationContainer>
//   );
// }

// export default AppEd;
