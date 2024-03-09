import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../styles/Form";
import axios from "axios";

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

  const handleRegister = async () => {
    setError("");
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/customers/register`,
        {
          first_name: firstName,
          last_name: lastName,
          address: address,
          phone_number: phoneNumber,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
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
    <>
      <View style={[styles.container, { flex: 1 }]}>
        <Text style={styles.title}>Hello!</Text>
        <Text style={styles.description}>Create a new account.</Text>
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
    </>
  );
};

export default Registration;
