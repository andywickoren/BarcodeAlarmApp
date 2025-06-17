import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import uuid from 'react-native-uuid';
import styles from './AlarmSetupScreen.styles';
import { useAlarmContext } from '../../../context/AlarmContext';
import { useNavigation } from '@react-navigation/native';

export default function AlarmSetupScreen() {
  const { addAlarm, barcodes } = useAlarmContext();
  const navigation = useNavigation();

  const [alarmTime, setAlarmTime] = useState<Date>(new Date());
  const [selectedBarcode, setSelectedBarcode] = useState<null | {
    code: string;
    name: string;
  }>(null);
  const [showBarcodeDropdown, setShowBarcodeDropdown] = useState(false);

  const onTimeChange = (_event: any, selectedTime?: Date) => {
    if (selectedTime) setAlarmTime(selectedTime);
  };

const handleSaveAlarm = () => {
  if (!selectedBarcode) {
    Alert.alert('Error', 'Please select or scan a barcode');
    return;
  }

  const newAlarm = {
    id: uuid.v4().toString(),
    time: alarmTime,
    barcode: selectedBarcode,
    enabled: true,
  };

  addAlarm(newAlarm);

  navigation.navigate('Home' as never); 


  setTimeout(() => {
    Alert.alert('Success', 'Alarm saved!');
  }, 100);
};

  const handleScanNewBarcode = () => {
    navigation.navigate('BarcodeScanner' as never);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>New Alarm</Text>

        <Text style={styles.label}>Time</Text>
        <DateTimePicker
          value={alarmTime}
          mode="time"
          is24Hour={false}
          display="spinner"
          onChange={onTimeChange}
          style={styles.timePicker}
        />

        <Text style={styles.label}>Barcode</Text>

        <TouchableOpacity style={styles.button} onPress={handleScanNewBarcode}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowBarcodeDropdown((prev) => !prev)}
        >
          <Text style={styles.buttonText}>
            {selectedBarcode?.name || 'Select'}
          </Text>
        </TouchableOpacity>

        {showBarcodeDropdown && (
          <View style={styles.dropdownContainer}>
            <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
              {barcodes.map((b, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    selectedBarcode?.code === b.code && styles.selectedButton,
                  ]}
                  onPress={() => {
                    setSelectedBarcode(b);
                    setShowBarcodeDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{b.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAlarm}>
          <Text style={styles.saveButtonText}>Save Alarm</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
