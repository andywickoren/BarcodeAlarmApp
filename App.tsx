// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import OnboardingScreen from './assets/components/OnboardingScreen/OnboardingScreen';
import HomeScreen from './assets/components/HomeScreen/HomeScreen';
import AlarmSetupScreen from './assets/components/AlarmSetupScreen/AlarmSetupScreen';
import SuccessScreen from './assets/components/SuccessScreen/SuccessScreen';
import ActiveAlarmScreen from './assets/components/ActiveAlarmScreen/ActiveAlarmScreen';
import BarcodeScanner from './assets/components/BarcodeScanner/BarcodeScanner';

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  AlarmSetup: undefined;
  Success: undefined;
  ActiveAlarm: undefined;
  BarcodeScanner: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

      {/* <Stack.Navigator initialRouteName="Onboarding"> */}
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Your Alarms' }} />
        <Stack.Screen name="AlarmSetup" component={AlarmSetupScreen} options={{ title: 'Set Alarm' }} />
        <Stack.Screen name="Success" component={SuccessScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ActiveAlarm" component={ActiveAlarmScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} options={{ title: 'Scan Barcode' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
