import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useAlarmContext } from '../../../context/AlarmContext';
import styles from './HomeScreen.styles';
import { RootStackParamList } from '../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { alarms, toggleAlarm, deleteAlarm } = useAlarmContext();

  const renderRightActions = (alarmId: string) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteAlarm(alarmId)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Your Alarms</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AlarmSetup')}>
          <Text style={styles.plusButton}>＋</Text>
        </TouchableOpacity>
      </View>

      {alarms.length === 0 ? (
        <Text style={styles.noAlarms}>
          No alarms yet. Tap the + icon to create one.
        </Text>
      ) : (
        <View style={styles.alarmListContainer}>
          <ScrollView>
            {alarms.map((item) => {
  const timeString = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(new Date(item.time));

  return (
    <Swipeable
      key={item.id}
      renderRightActions={() => renderRightActions(item.id)}
      overshootRight={false}
    >
      <View style={styles.alarmCardRow}>
        <View style={styles.alarmCardContent}>
          <Text style={styles.alarmName}>{item.barcode.name}</Text>
          <Text style={styles.alarmTime}>{timeString}</Text>
        </View>
        <View style={styles.toggleWrapper}>
          <Switch
            value={item.enabled}
            onValueChange={() => toggleAlarm(item.id)}
          />
        </View>
      </View>
    </Swipeable>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
