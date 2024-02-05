import React, {useEffect,useState,} from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { getUser } from '../Api/GetUser';
import { IUser } from '../types/user-types';

// import { useAuth } from '../context/AuthContext';

// import { Button } from 'antd';


const Header = () => {
  const [nama, setNama] = useState('');
  // const { userData } = useAuth();
  const { navigate } = useNavigation<NavigationProp<any>>();
  const [users, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        // console.log("data user", users);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, [users]);



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

    <TouchableOpacity
    onPress={() => {navigate('Profile') }}
    >

    {users && 
    <View style={styles.userInfo}>
        <Image
          source={{
            uri: users.data.photo_profile
              ? users.data.photo_profile
              : "https://www.w3schools.com/howto/img_avatar.png",
          }}
          style={styles.profileImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.userName}>{users.data.name}</Text>
          <Text style={styles.userRole}>{users.data.role}</Text>
        </View>
      </View>
    }
      
    </TouchableOpacity>
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
    // borderWidth: 1,
    // backgroundColor: '#f0f0f0',
    backgroundColor: 'orange',
    padding: 8,
    borderRadius: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor:"white",
    borderWidth:2
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    marginRight:10
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
    color: 'white',
    marginTop: -2,
  },
});

export default Header;
