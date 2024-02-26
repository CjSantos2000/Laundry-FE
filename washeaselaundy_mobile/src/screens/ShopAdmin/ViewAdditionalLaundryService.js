import React, { useState, useEffect } from "react";
import { styles } from "../../styles/Box";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ViewAdditionalLaundryService = ({ route }) => {
  const { additional_service_id } = route.params;
  const [service, setAdditionalService] = useState({});

  useEffect(() => {
    const fetchService = async () => {
      try {
        const token = await AsyncStorage.getItem("shopAdminToken");

        const response = await axios.get(
          `${"http://192.168.133.240:8000"}/api/shop_admins/additional-services/${additional_service_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAdditionalService(response.data.additional_service);
      } catch (error) {
        console.log(error);
      }
    };

    fetchService();
  }, []);

  // console.log(additional_service_id);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{service.name}</Text>
      <Text style={styles.description}>{service.description}</Text>
      <Text style={styles.description}>{service.price} pesos</Text>
    </View>
  );
};

export default ViewAdditionalLaundryService;
