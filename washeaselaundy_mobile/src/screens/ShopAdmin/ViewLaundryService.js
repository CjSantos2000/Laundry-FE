import React, { useState, useEffect } from "react";
import { styles } from "../../styles/Box";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Constants from 'expo-constants';
const API_BASE_URL = Constants.manifest.extra.API_BASE_URL;

const ViewLaundryService = ({ route }) => {
  const { service_id } = route.params;
  const [services, setServices] = useState({});

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
        setServices(response.data.service);
      } catch (error) {
        console.log(error);
      }
    };

    fetchService();
  }, []);

  // console.log(service_id);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{services.name}</Text>
      <Text style={styles.description}>{services.description}</Text>
      <Text style={styles.description}>{services.price} pesos</Text>
    </View>
  );
};

export default ViewLaundryService;
