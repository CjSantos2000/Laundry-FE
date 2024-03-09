import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../styles/Form";
import axios from "axios";

import Constants from 'expo-constants';
const API_BASE_URL = Constants.manifest.extra.API_BASE_URL;

const EditSellingItems = ({ navigation, route }) => {
  const { sellingItem } = route.params;
  const [name, setName] = useState(sellingItem.name);
  const [quantity, setQuantity] = useState(`${sellingItem.quantity}`);
  const [price, setPrice] = useState(`${sellingItem.price}`);

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("staffToken");

      const response = await axios.put(
       `${API_BASE_URL}/api/staffs/selling_items/${
          sellingItem.id
        }`,
        {
          name: name,
          quantity: quantity,
          price: price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response.data.message);

      navigation.navigate("Staff Selling Items", {
        result: response.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Add Selling Items</Text>
        <Text style={styles.description}></Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter quantity"
          value={quantity}
          onChangeText={(text) => setQuantity(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter price"
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleSubmit}>
          <Text style={styles.inputButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EditSellingItems;
