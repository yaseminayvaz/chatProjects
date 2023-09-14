import { StyleSheet, Text, View, Button } from 'react-native';
import {useEffect, useState} from 'react';
import * as Permissions from 'expo-permissions';
import SmsRetriever from 'react-native-sms-retriever';


export default function App() { 
 /* useEffect(() => {
    async function requestPermissions() {
      const { status } = await Permissions.askAsync(Permissions.SMS);
      if (status === 'granted') {
        console.log('SMS izni verildi.');

        SmsRetriever.startSmsRetriever();

        SmsRetriever.addSmsListener(event => {
          if (event.message) {
            console.log('Gelen SMS:', event.message);
          }
        });
      } else {
        console.log('SMS izni reddedildi.');
      }
    }
    requestPermissions();
  }, []);
*/
useEffect(() => {
  async function startSmsRetriever() {
    try {
      const registered = await SmsRetriever.startSmsRetriever();
      if (registered) {
        SmsRetriever.addSmsListener(event => {
          if (event.message) {
            console.log('Gelen SMS:', event.message);
          }
        });
      } else {
        console.error('SMS dinleme başlatılamadı.');
      }
    } catch (error) {
      console.error('SMS dinleme hatası:', error);
    }
  }
  startSmsRetriever();
}, []);


  return (
    <View style={styles.container}>
   <Text>Hello, Expo SMS Reader</Text>
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
