import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../../styles/Form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Constants from 'expo-constants';
const API_BASE_URL = Constants.manifest.extra.API_BASE_URL;

const EditLaundryService = ({ navigation, route }) => {
  const { service_id } = route.params;
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const token = await AsyncStorage.getItem("shopAdminToken");

        const response = await axios.get(
          `${API_BASE_URL}/api/shop_admins/services/${service_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // setServices(response.data.service);
        setName(response.data.service.name);
        setDescription(response.data.service.description);
        setPrice(response.data.service.price);
      } catch (error) {
        console.log(error);
      }
    };

    fetchService();
  }, []);

  const handleEdit = async () => {
    setError("");
    try {
      const token = await AsyncStorage.getItem("shopAdminToken");

      const response = await axios.put(
        `${API_BASE_URL}/api/shop_admins/services/${service_id}`,
        {
          name: name,
          description: description,
          price: price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response.data.message);
      navigation.navigate("Shop Admin Laundry Services", {
        result: response.data.message,
      });
    } catch (error) {
      setError("");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Add Laundry Service</Text>
        {error !== "" && (
          <Text style={[styles.description, { color: "red" }]}>{error}</Text>
        )}
        <Text style={styles.description}></Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter price"
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleEdit}>
          <Text style={styles.inputButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EditLaundryService;
