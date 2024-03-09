import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../styles/Form";
import axios from "axios";

import Constants from 'expo-constants';
const API_BASE_URL = Constants.manifest.extra.API_BASE_URL;

const AddRider = ({ navigation, route }) => {
  const { rider_id } = route.params;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("shopAdminToken");

        const response = await axios.get(
          `${API_BASE_URL}/api/shop_admins/riders/${rider_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFirstName(response.data.rider.first_name);
        setLastName(response.data.rider.last_name);
        setAddress(response.data.rider.address);
        setPhoneNumber(response.data.rider.phone_number);
        setEmail(response.data.rider.email);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleEditItem = async () => {
    try {
      const token = await AsyncStorage.getItem("shopAdminToken");

      const response = await axios.put(
       `${API_BASE_URL}/api/shop_admins/riders/${rider_id}`,
        {
          first_name: firstName,
          last_name: lastName,
          address: address,
          phone_number: phoneNumber,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //   console.log(response.data);

      navigation.navigate("Shop Admin Riders", {
        result: response.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Rider</Text>
        <Text style={styles.description}></Text>
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
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password confirmation"
          value={passwordConfirmation}
          onChangeText={(text) => setPasswordConfirmation(text)}
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleEditItem}>
          <Text style={styles.inputButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddRider;
