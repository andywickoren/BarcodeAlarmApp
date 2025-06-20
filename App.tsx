// // App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AlarmProvider } from './context/AlarmContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Screens
import OnboardingScreen from './src/components/OnboardingScreen/OnboardingScreen';
import HomeScreen from './src/components/HomeScreen/HomeScreen';
import AlarmSetupScreen from './src/components/AlarmSetupScreen/AlarmSetupScreen';
import SuccessScreen from './src/components/SuccessScreen/SuccessScreen';
import ActiveAlarmScreen from './src/components/ActiveAlarmScreen/ActiveAlarmScreen';
import BarcodeScanner from './src/components/BarcodeScanner/BarcodeScanner';
import EditAlarmScreen from './src/components/EditAlarmScreen/EditAlarmScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  AlarmSetup: undefined;
  Success: undefined;
  ActiveAlarm: undefined;
  BarcodeScanner: {
    onBarcodeScanned?: (barcode: { name: string; code: string }) => void;
  };
  'EditAlarm': { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <AlarmProvider>
      <Stack.Navigator initialRouteName="Home">

      {/* <Stack.Navigator initialRouteName="Onboarding"> */}
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Your Alarms' }} />
        <Stack.Screen name="AlarmSetup" component={AlarmSetupScreen} options={{ title: 'Set Alarm' }} />
        <Stack.Screen name="Success" component={SuccessScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ActiveAlarm" component={ActiveAlarmScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} options={{ title: 'Scan Barcode' }} />
         <Stack.Screen name="EditAlarm" component={EditAlarmScreen} options={{ title: 'Edit Alarm' }} />
      </Stack.Navigator>
      </AlarmProvider>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
