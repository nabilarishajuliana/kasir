import React, { useState, useEffect } from "react";
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
  Platform,
} from "react-native";

import { IUser } from "../types/user-types";
import * as ImagePicker from "expo-image-picker";
import { TextInput, Divider } from "react-native-paper";
import { updateUser, updateUserWithPhoto } from "../Api/GetUser";
import { NavigationProp, useNavigation } from "@react-navigation/native";

interface UpdateProfileProps {
  route: { params: { user: IUser } };
}

const UpdateProfile: React.FC<UpdateProfileProps> = ({ route }) => {
  const { user } = route.params;
  const { navigate } = useNavigation<NavigationProp<any>>();

  const [image, setImage] = useState(null);
  const [formdata, setFormdata] = useState({
    name: user.name,
    username: user.username,
    photo_profile: user.photo_profile,
    localUri: "",
    filename: "",
    type: "",
    file: null,
  });

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      console.log("ImagePicker Result:", result);

      if (!result.canceled) {
        const selectedAsset = result.assets[0];
        setImage(selectedAsset.uri);

        console.log("Result URI:", selectedAsset.uri);

        setFormdata({
          ...formdata,
          localUri: selectedAsset.uri,
          filename: selectedAsset.uri.split("/").pop(),
          type: selectedAsset.type,
          file: selectedAsset,
        });
      }
    } catch (error) {
      console.log("ImagePicker Error:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (formdata.file) {
        const formData = new FormData();
        formData.append("name", formdata.name);
        formData.append("username", formdata.username);
        formData.append("photo_profile", formdata.file); 

        console.log("FormData:", formData);

        const response = await updateUserWithPhoto(user.uuid, formData);
        if (response) {
          alert("Berhasil update");
          console.log("berhasil update", response);
          navigate("Profile");
        } else {
          alert("Gagal");
        }
      } else {
        const response = await updateUser(user.uuid, formdata);
        if (response) {
          alert("Berhasil update");
          console.log("berhasil update", response);
          navigate("Profile");
        } else {
          alert("Gagal");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (value, name) => {
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  // const [image, setImage] = useState(null);
  // const [formdata, setformdata] = React.useState({
  //   name: user.name,
  //   photo_profile: user.photo_profile,
  //   username: user.username,
  // });

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 1,
  //   });

  //   console.log("hasil", result);

  //   if (!result.canceled) {
  //     //   setImage(result.assets[0].uri);
  //     setformdata({
  //       ...formdata,
  //       photo_profile: result.assets[0].uri,
  //     });
  //   }
  // };

  // const handleChange = (value: any, name: any) => {
  //   setformdata({
  //     ...formdata,
  //     [name]: value,
  //   });
  // };

  // const handleSubmit = async () => {
  //   // setIsLoading(true);

  //   try {

  //     const response = await updateUser(user.uuid,formdata);
  //     // console.log("Response transaksi", response);
  //     console.log("data update",formdata)

  //     if (response ) {
  //       // setIsLoading(false);
  //       alert("berhasil update");

  //       console.log(response);
  //       navigate("Profile");
  //     } else {
  //       // setIsLoading(false);

  //       alert("Gagal ");
  //     }
  //   } catch (error) {
  //     // console.log(error);
  //   }
  // };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Update Profile Page</Text> */}

      {user && (
        <View style={styles.userData}>
          <View style={styles.containerPhoto}>
            <TouchableOpacity 
            // onPress={pickImage}
            >
              <Image
                source={{
                  uri: formdata.photo_profile
                    ? formdata.photo_profile
                    : "https://www.w3schools.com/howto/img_avatar.png",
                }}
                style={styles.profileImage}
              />
              {/* <Text>change photo</Text> */}
            </TouchableOpacity>
          </View>
          <TextInput
            label="Nama"
            value={formdata.name}
            onChangeText={(value) => handleChange(value, "name")}
            mode="outlined"
            outlineColor="orange"
            activeOutlineColor="orange"
            style={{
              backgroundColor: "white",
              marginHorizontal: 15,
              marginBottom: 20,
              marginTop: 10,
              borderRadius: 30,
              color: "black",
            }}
            outlineStyle={{ borderRadius: 10 }}
          />
          <TextInput
            label="Username"
            value={formdata.username}
            onChangeText={(value) => handleChange(value, "username")}
            mode="outlined"
            outlineColor="orange"
            activeOutlineColor="orange"
            style={{
              backgroundColor: "white",
              marginBottom: 20,
              marginTop: 10,
              borderRadius: 30,
              color: "black",
              marginHorizontal: 15,
            }}
            outlineStyle={{ borderRadius: 10 }}
          />
        </View>
      )}
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Update Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    // flex:1
  },
  containerPhoto: {
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  userData: {
    //   borderWidth: 1,
    //   padding: 10,
    //   borderRadius: 5,
    //   borderColor: "lightgray",
    width: "100%",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 5,
    borderWidth: 3,
    borderColor: "white",
  },
  button: {
    backgroundColor: "orange",
    color: "white",
    padding: 15,
    borderRadius: 30,
    fontWeight: "bold",
    alignItems: "center",
    marginTop: 20,
  },
});

export default UpdateProfile;
