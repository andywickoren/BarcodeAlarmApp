import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionLabel: {
    marginTop: 20,
  },
  scanButton: {
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 10,
    borderRadius: 5,
  },
  dropdownButton: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  dropdownContainer: {
    maxHeight: 150,
    marginVertical: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedItem: {
    backgroundColor: '#ddd',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  saveButtonContainer: {
  marginTop: 10,
},
});

export default styles;
