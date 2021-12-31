import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { loadTopCountries } from './api';

export default function App() {
  const [topCountries, setTopCountries] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const countries = await loadTopCountries();
    setTopCountries(countries);
  }

  return (
    <View style={styles.container}>
      {topCountries.map((country, idx) => (
        <Text key={`country_${idx}`}>{country.countryName}</Text>
      ))}
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
