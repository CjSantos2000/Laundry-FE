import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../styles/Form";
import axios from "axios";
import { AirbnbRating } from "react-native-ratings";

import Constants from 'expo-constants';
const API_BASE_URL = Constants.manifest.extra.API_BASE_URL;

const Feedback = ({ route, navigation }) => {
  const { transaction_id } = route.params;
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  console.log(rating);

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("customerToken");

      const response = await axios.post(
        `${API_BASE_URL}/api/customers/feedback/add`,
        {
          message: message,
          transaction_id: transaction_id,
          rating: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigation.navigate("User Transaction History");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Transaction Feedback</Text>
        <AirbnbRating
          count={5}
          reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
          defaultRating={0}
          size={30}
          onFinishRating={(rating) => setRating(rating)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter message"
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleSubmit}>
          <Text style={styles.inputButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Feedback;
