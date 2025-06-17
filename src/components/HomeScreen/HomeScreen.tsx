import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import { useAlarmContext } from '../../../context/AlarmContext';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { alarms } = useAlarmContext();

  const renderItem = ({ item }: any) => {
    const timeString = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date(item.time));

    return (
      <TouchableOpacity style={styles.alarmCard}>
        <Text style={styles.alarmName}>{item.barcode.name}</Text>
        <Text style={styles.alarmTime}>{timeString}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Alarms</Text>

      {alarms.length === 0 ? (
        <Text style={styles.noAlarms}>No alarms yet. Tap below to create one.</Text>
      ) : (
        <FlatList
          data={alarms}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}

      <Button
        title="Create New Alarm"
        onPress={() => navigation.navigate('AlarmSetup')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noAlarms: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  alarmCard: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  alarmName: {
    fontSize: 18,
    fontWeight: '600',
  },
  alarmTime: {
    fontSize: 16,
    color: '#555',
  },
});
