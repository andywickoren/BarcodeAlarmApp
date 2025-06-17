import React, { useEffect, useState } from 'react';
import styles from './EditAlarmScreen.styles';

import {
  View,
  Text,
  Switch,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useAlarmContext } from '../../../context/AlarmContext';
import DateTimePicker from '@react-native-community/datetimepicker';

type EditAlarmScreenRouteProp = RouteProp<RootStackParamList, 'EditAlarm'>;
type EditAlarmScreenNavProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  route: EditAlarmScreenRouteProp;
};


export default function EditAlarmScreen({ route }: Props) {
  const { id } = route.params;
  const { alarms, updateAlarm, deleteAlarm, barcodes } = useAlarmContext();
  const navigation = useNavigation<EditAlarmScreenNavProp>();

  const existingAlarm = alarms.find((a) => a.id === id);

  const [time, setTime] = useState(new Date());
  const [enabled, setEnabled] = useState(true);
  const [selectedBarcode, setSelectedBarcode] = useState<null | {
    code: string;
    name: string;
  }>(null);
  const [showBarcodeDropdown, setShowBarcodeDropdown] = useState(false);

  useEffect(() => {
    if (existingAlarm) {
      setTime(new Date(existingAlarm.time));
      setEnabled(existingAlarm.enabled);
      setSelectedBarcode(existingAlarm.barcode);
    }
  }, [existingAlarm]);

  if (!existingAlarm) {
    return (
      <View style={styles.container}>
        <Text>Alarm not found.</Text>
      </View>
    );
  }

  const handleCancel = () => {
    navigation.navigate('Home');
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Alarm',
      'Are you sure you want to delete this alarm?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteAlarm(existingAlarm.id);
            navigation.navigate('Home');
          },
        },
      ]
    );
  };

  const handleSave = () => {
    if (!selectedBarcode) {
      Alert.alert('Error', 'Please select or scan a barcode');
      return;
    }

    updateAlarm({
      ...existingAlarm,
      time,
      enabled,
      barcode: selectedBarcode,
    });

    navigation.goBack();
  };

  const handleScanNewBarcode = () => {
    navigation.navigate('BarcodeScanner', {
      onBarcodeScanned: (barcode: { name: string; code: string }) => {
        setSelectedBarcode(barcode);
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text>Edit Alarm</Text>

      <Text style={styles.sectionLabel}>Enabled</Text>
      <Switch value={enabled} onValueChange={setEnabled} />

      <Text style={styles.sectionLabel}>Alarm Time</Text>
      <DateTimePicker
        value={time}
        mode="time"
        onChange={(e, date) => {
          if (date) setTime(date);
        }}
      />

      <Text style={styles.sectionLabel}>Barcode</Text>

      <TouchableOpacity
        style={styles.scanButton}
        onPress={handleScanNewBarcode}
      >
        <Text style={{ color: 'blue' }}>New</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setShowBarcodeDropdown((prev) => !prev)}
      >
        <Text>{selectedBarcode?.name || 'Select a barcode'}</Text>
      </TouchableOpacity>

      {showBarcodeDropdown && (
        <View style={styles.dropdownContainer}>
          <ScrollView>
            {barcodes.map((b, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.dropdownItem,
                  selectedBarcode?.code === b.code && styles.selectedItem,
                ]}
                onPress={() => {
                  setSelectedBarcode(b);
                  setShowBarcodeDropdown(false);
                }}
              >
                <Text>{b.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Cancel + Delete buttons */}
      <View style={styles.buttonGroup}>
        <Button title="Cancel" onPress={handleCancel} />
        <Button title="Delete" onPress={handleDelete} color="red" />
      </View>

      {/* Save button */}
      <View style={styles.saveButtonContainer}>
        <Button title="Save Changes" onPress={handleSave} />
      </View>
    </View>
  );
}

