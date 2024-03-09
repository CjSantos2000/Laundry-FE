import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  Platform,
} from "react-native";
import { styles } from "../../styles/Form";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Constants from 'expo-constants';
const API_BASE_URL = Constants.manifest.extra.API_BASE_URL;

const AccountInformation = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImageUri(result.assets[0].uri);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("riderData");
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setFirstName(parsedUserData.first_name);
        setLastName(parsedUserData.last_name);
        setAddress(parsedUserData.address);
        setPhoneNumber(parsedUserData.phone_number);
        setEmail(parsedUserData.email);
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("address", address);
      formData.append("phone_number", phoneNumber);
      formData.append("email", email);

      if (imageUri) {
        const uriParts = imageUri.split(".");
        const fileType = uriParts[uriParts.length - 1];

        formData.append("image", {
          uri: imageUri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const apiEndpoint = `${API_BASE_URL}/api/riders/edit-profile`;
      const token = await AsyncStorage.getItem("riderToken");

      const response = await axios.post(apiEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      await AsyncStorage.setItem(
        "riderData",
        JSON.stringify(response.data.user)
      );
      navigation.navigate("Rider Tab Navigator", { screen: "Dashboard" });
    } catch (error) {
      console.error("Error editing profile:", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.description}>Fill your personal details.</Text>
        <TouchableOpacity
          style={[styles.inputButton, { marginBottom: 10 }]}
          onPress={pickImage}
        >
          <Text style={styles.inputButtonText}>Add Image</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Enter first name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter last name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 200, height: 200 }}
          />
        )}
        <TouchableOpacity
          style={[styles.inputButton, { marginTop: 30 }]}
          onPress={handleSubmit}
        >
          <Text style={styles.inputButtonText}>Confirm Information</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AccountInformation;
