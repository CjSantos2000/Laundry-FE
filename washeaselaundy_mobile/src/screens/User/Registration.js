import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../styles/Form";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';

import Constants from 'expo-constants';
const API_BASE_URL = Constants.manifest.extra.API_BASE_URL;

const Registration = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("customerToken");
    if (token) {
      navigation.navigate("User Tab Navigator", { screen: "Dashboard" });
    }
  };

  const handleImagePicker = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  const handleRegister = async () => {
    setError("");
    try {
      const formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('address', address);
      formData.append('phone_number', phoneNumber);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('password_confirmation', passwordConfirmation);
      if (profileImage) {
        formData.append('profile_image', {
          uri: profileImage,
          name: 'profile.jpg',
          type: 'image/jpg',
        });
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/customers/register`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      const { token, user } = response.data.response;

      await AsyncStorage.setItem("customerToken", token);
      await AsyncStorage.setItem("customerData", JSON.stringify(user));
        
      navigation.navigate("User Tab Navigator", { screen: "Dashboard" });
    } catch (error) {
       console.log(error);
      setError("Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account!</Text>

      {error !== "" && (
        <Text style={[styles.description, { color: "red" }]}>{error}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="First name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={passwordConfirmation}
        onChangeText={(text) => setPasswordConfirmation(text)}
        secureTextEntry
      />

      <TouchableOpacity style={styles.inputButton} onPress={handleImagePicker}>
        <Text style={styles.inputButtonText}>Choose Profile Image</Text>
      </TouchableOpacity>
      {profileImage && <Image source={{ uri: profileImage }} style={{ width: 200, height: 200 }} />}

      <TouchableOpacity style={styles.inputButton} onPress={handleRegister}>
        <Text style={styles.inputButtonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.inputText}>
        Already have an account?{" "}
        <Text
          style={styles.subInputText}
          onPress={() => navigation.navigate("User Login")}
        >
          Login
        </Text>
      </Text>
    </View>
  );
};

export default Registration;
