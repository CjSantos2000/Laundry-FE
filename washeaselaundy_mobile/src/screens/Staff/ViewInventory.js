import React, { useState, useEffect } from "react";
import { styles } from "../../styles/Box";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Constants from 'expo-constants';
const API_BASE_URL = Constants.manifest.extra.API_BASE_URL;

const ViewInventory = ({ route }) => {
  const { inventory_id } = route.params;
  const [inventory, setInventory] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("staffToken");

        const response = await axios.get(
        `${API_BASE_URL}/api/staffs/inventories/${inventory_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInventory(response.data.inventory);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{inventory.name}</Text>
      <Text style={styles.description}>{inventory.quantity}</Text>
      <Text style={styles.description}>{inventory.type}</Text>
    </View>
  );
};

export default ViewInventory;
