import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    deleteButton: {
  backgroundColor: '#FF3B30',
  justifyContent: 'center',
  alignItems: 'flex-end',
  paddingHorizontal: 20,
  borderRadius: 8,
  marginBottom: 12,
},
deleteButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},

  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  plusButton: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  noAlarms: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  alarmListContainer: {
    flex: 1,
    marginBottom: 16,
  },
  alarmCardContent: {
  flex: 1,
  justifyContent: 'center',
},
  alarmCardRow: {
    backgroundColor: '#f1f1f1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  alarmCardText: {
    flex: 1,
  },
  alarmName: {
    fontSize: 18,
    fontWeight: '600',
  },
  alarmTime: {
    fontSize: 16,
    color: '#555',
  },
  toggleWrapper: {
  width: 60,
  justifyContent: 'center',
  alignItems: 'flex-end',
},
});
