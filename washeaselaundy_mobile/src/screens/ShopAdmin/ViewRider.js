import React, { useState, useEffect } from "react";
import { styles } from "../../styles/Box";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Constants from 'expo-constants';
const API_BASE_URL = Constants.manifest.extra.API_BASE_URL;

const ViewRider = ({ route }) => {
  const { rider_id } = route.params;
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [address, setAddress] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [email, setEmail] = useState("");
  const [rider, setRider] = useState({});

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

        setRider(response.data.rider);
        // setFirstName(response.data.rider.first_name);
        // setLastName(response.data.rider.last_name);
        // setAddress(response.data.rider.address);
        // setPhoneNumber(response.data.rider.phone_number);
        // setEmail(response.data.rider.email);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // console.log(rider_id);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {rider.first_name + " " + rider.last_name}
      </Text>
      <Text style={styles.description}>{rider.address}</Text>
      <Text style={styles.description}>{rider.phone_number}</Text>
      <Text style={styles.description}>{rider.email}</Text>
    </View>
  );
};

export default ViewRider;
