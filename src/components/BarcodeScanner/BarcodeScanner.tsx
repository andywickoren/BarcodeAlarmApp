import React, { useState } from 'react';
import styles from './BarcodeScanner.styles';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useAlarmContext } from '../../../context/AlarmContext';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

export default function BarcodeScanner() {
  const [scanned, setScanned] = useState(false);
  const [barcodeName, setBarcodeName] = useState('');
  const { addBarcode } = useAlarmContext();
  const navigation = useNavigation();

  const simulateScan = () => {
    setScanned(true);
  };

  const handleSave = () => {
    if (!barcodeName.trim()) {
      Alert.alert('Please enter a name');
      return;
    }

    const newBarcode = {
      name: barcodeName.trim(),
      code: uuid.v4().toString(), 
    };

    addBarcode(newBarcode);
    Alert.alert('Barcode saved!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {!scanned ? (
        <>
          <Text style={styles.title}>Scan Barcode</Text>
          <View style={styles.cameraPlaceholder}>
            <Text style={styles.cameraText}>[Camera View Placeholder]</Text>
          </View>
          <TouchableOpacity onPress={simulateScan} style={styles.button}>
            <Text style={styles.buttonText}>Simulate Scan</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Name Your Barcode</Text>
          <TextInput
            placeholder="Enter a name for the scanned barcode"
            style={styles.input}
            value={barcodeName}
            onChangeText={setBarcodeName}
          />
          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
