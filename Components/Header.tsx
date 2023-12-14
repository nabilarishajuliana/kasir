import React, {useEffect,useState,} from 'react';
import { View, Text, Image, StyleSheet,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useAuth } from '../context/AuthContext';

// import { Button } from 'antd';


const Header = () => {
  const [nama, setNama] = useState('');
  // const { userData } = useAuth();

  useEffect(() => {
    // Mengambil data dari AsyncStorage saat komponen di-mount
    AsyncStorage.getItem('username')
      .then(value => {
        if (value !== null) {
          setNama(value); // Menyimpan nilai ke state
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <View style={styles.headerContainer}>

      <View style={styles.userInfo}>
        <Image
          source={{
            uri:
              
              'https://www.w3schools.com/howto/img_avatar.png'
          }}
          style={styles.profileImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.userName}>{nama}</Text>
          <Text style={styles.userRole}>kasir</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'normal',
    color: '#333',
  },
  userRole: {
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: '500',
    color: '#666',
    marginTop: -2,
  },
});

export default Header;
