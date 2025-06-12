import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Alert } from 'react-native';
import styles from './AlarmSetupScreen.styles';


type AlarmTime = Date | null;

export default function AlarmSetupScreen () {
  const [alarmTime, setAlarmTime] = useState<AlarmTime>(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [barcodeValue, setBarcodeValue] = useState<string | null>(null);

  const onTimeChange = (_event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) setAlarmTime(selectedTime);
  };

  const handleBarcodeScan = () => {
    console.log('Barcode scanner triggered');
  };

  const handleSaveAlarm = () => {
    if (!alarmTime || !barcodeValue) {
      Alert.alert('Oops!', 'Please select a time and scan a barcode first.');
      return;
    }
    console.log('Alarm saved at:', alarmTime.toISOString());
    console.log('Barcode:', barcodeValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Alarm</Text>

      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.button}>
        <Text style={styles.buttonText}>Pick Alarm Time</Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={alarmTime || new Date()}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={onTimeChange}
        />
      )}

      <TouchableOpacity onPress={handleBarcodeScan} style={styles.button}>
        <Text style={styles.buttonText}>
          {barcodeValue ? `Barcode: ${barcodeValue}` : 'Scan Barcode'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSaveAlarm} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Alarm</Text>
      </TouchableOpacity>
    </View>
  );
};

