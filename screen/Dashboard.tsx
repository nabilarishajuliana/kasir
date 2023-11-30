import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import RootLayout from '../Layout/RootLayout';
// import RootLayout from './RootLayout'; // Ubah path sesuai dengan struktur proyek Anda

const DashboardScreen = () => {
  return (
    <>
    <RootLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
        {/* <WebView
          style={styles.video}
          source={{ uri: 'https://www.youtube.com/embed/QgiZVuQUoHo?si=8EGjV2QJ0QcniV4B' }}
          allowsFullscreenVideo
        /> */}
      </View>
    </RootLayout>
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  video: {
    width: 300,
    height: 200,
    marginTop: 20,
  },
});

export default DashboardScreen;
