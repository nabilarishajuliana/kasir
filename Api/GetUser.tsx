import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../types/user-types";

const getUser = async (): Promise<IUser[]> => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await fetch(
      `https://api-cafe-v2.m3sra-kediri.my.id/v1/user/auth`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    // console.log("result get user",responseData)

    // const result: IUser[] = responseData.data.map((item: IUser) => ({
    //     id: item.id,
    //     uuid: item.uuid,
    //     name: item.name,
    //     photo_profile: item.photo_profile,
    //     username: item.username,
    //     role:"KASIR"
    //   }));

    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      // console.log(error.message);
      // console.log( AsyncStorage.getItem('token'))
    } else {
      // console.log(error);
      // console.log( AsyncStorage.getItem('token'))

      throw error;
    }
  }
};

export { getUser };

const updateUser = async (uuid, formdata) => {
  const token = await AsyncStorage.getItem("token");

  try {
    const response = await fetch(
      `https://api-cafe-v2.m3sra-kediri.my.id/v1/user/${uuid ?? ""}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(formdata),
      }
    );

    const data = await response.json();
    console.log("update", data);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      // console.log(error.message);
    } else {
      // console.log(error);
      // ini user login kan cantik
      throw error;
    }
  }
};

const updateUserWithPhoto = async (uuid, formData) => {
  const token = await AsyncStorage.getItem("token");

  console.log("ini data masuk ke fetch update", JSON.stringify(formData));

  try {
    const response = await fetch(
      `https://api-cafe-v2.m3sra-kediri.my.id/v1/user/${uuid ?? ""}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
        body: formData,
      }
    );


    const data = await response.json();
    console.log("update with photo", data);

    // debug
    console.log("Response status:", response.status);
    const responseData = await response.text();
    console.log("Response data:", responseData);


    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      // ini user login kan cantik
      throw error;
    }
  }
};
export { updateUser, updateUserWithPhoto };
