import React, { useState, useEffect } from "react";
import { styles } from "../../styles/Box";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Constants from 'expo-constants';
const API_BASE_URL = Constants.manifest.extra.API_BASE_URL;

const ViewStaff = ({ route }) => {
  const { staff_id } = route.params;
  const [staff, setStaff] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("shopAdminToken");

        const response = await axios.get(
          `${API_BASE_URL}/api/shop_admins/staffs/${staff_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStaff(response.data.staff);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // console.log(staff_id);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {staff.first_name + " " + staff.last_name}
      </Text>
      <Text style={styles.description}>{staff.address}</Text>
      <Text style={styles.description}>{staff.phone_number}</Text>
      <Text style={styles.description}>{staff.email}</Text>
    </View>
  );
};

export default ViewStaff;
