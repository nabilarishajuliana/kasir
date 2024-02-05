import React, { useEffect, useState } from "react";
import { IUser } from "../types/user-types";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Button,
  BackHandler,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import { Icon, MD3Colors } from "react-native-paper";
import { getUser } from "../Api/GetUser";
import { NavigationProp, useNavigation } from "@react-navigation/native";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [users, setUser] = useState<IUser | null>(null);
  const { navigate } = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        // console.log("data user", users);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [users]);

  return (
    <>
      <View>
        {loading ? (
          <View>
            <ActivityIndicator
              size="large"
              color="orange"
              style={{ flex: 1, marginTop: 10 }}
            />
          </View>
        ) : (
          <View style={styles.container}>
            {users && (
              <View>
                {/* <View style={styles.containerphoto}>
                  <Image
                    source={require("../assets/bgprofile.jpg")}
                    style={{ width: "100%", height: 200 }}
                  />
                  <Image
                    source={{
                      uri: users.data.photo_profile
                        ? users.data.photo_profile
                        : "https://www.w3schools.com/howto/img_avatar.png",
                    }}
                    style={styles.profileImage}
                  />
                  <Text style={styles.textTittle}>{users.data.name}</Text>
                  <Text style={styles.textSub}>
                    Username: {users.data.username}
                  </Text>
                </View> */}
                <View style={styles.containerphoto}>
                  <ImageBackground // Gunakan ImageBackground untuk membuat foto sebagai background
                    source={require("../assets/bgprofile.jpg")}
                    style={[styles.ImageBackground]}
                  >
                    <Image
                      source={{
                        uri: users.data.photo_profile
                          ? users.data.photo_profile
                          : "https://www.w3schools.com/howto/img_avatar.png",
                      }}
                      style={styles.profileImage}
                    />
                    <Text style={styles.textTittle}>{users.data.name}</Text>
                    <Text style={styles.textSub}>
                      Username: {users.data.username}
                    </Text>
                  </ImageBackground>
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.text}>ID:</Text>
                  <Text style={styles.textbox}>{users.data.id}</Text>
                  <Text style={styles.text}>UUID: </Text>
                  <Text style={styles.textbox}>{users.data.uuid}</Text>
                  <Text style={styles.text}>Role: </Text>
                  <Text style={styles.textbox}>{users.data.role}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        navigate("UpdateProfile", { user: users.data })
                      }
                      style={styles.button}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        <Icon source="account-edit" color="white" size={25} />
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "white",
  },
  textTittle: {
    fontSize: 20,
    marginBottom: 3,
    fontWeight: "bold",
  },
  textSub: {
    fontSize: 15,
    marginBottom: 15,
    color: "white",
  },
  text: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  loadingContainer: {
    backgroundColor: "#f0f0f0",
  },
  ImageBackground: {
    alignItems: "center",
    // backgroundColor: "orange",
    // borderTopRightRadius: 50,
    // borderTopLeftRadius: 50,
  },
  containerphoto: {
  },
  containerText: {
    backgroundColor: "white",
    flex: 1,
    marginBottom: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 25,
    paddingTop: 15,
    position: "relative", // Tambahkan properti position relative
    paddingBottom: 50,
  },
  textbox: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 12,
  },
  button: {
    backgroundColor: "orange",
    color: "white",
    padding: 10,
    borderRadius: 50,
    fontWeight: "bold",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute", // Tambahkan properti position absolute
    bottom: 20, // Geser tombol ke bagian bawah kontainer teks
    alignItems: "center",
    right: 20,
  },
});

export default Profile;
