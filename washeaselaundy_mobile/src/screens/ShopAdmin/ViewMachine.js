import React, { useState, useEffect } from "react";
import { styles } from "../../styles/Box";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import Constants from 'expo-constants';
const API_BASE_URL = Constants.manifest.extra.API_BASE_URL;

const ViewStaff = ({ route }) => {
  const { machine_id } = route.params;
  // const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [machineType, setMachineType] = useState("");
  const [machine, setMachine] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("shopAdminToken");

        const response = await axios.get(
          `${API_BASE_URL}/api/shop_admins/machines/${machine_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data.machine);
        setMachine(response.data.machine);
        // setName(response.data.machine.name);
        // setStatus(response.data.machine.status.name);
        // setMachineType(response.data.machine.machine_type.name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{machine.name}</Text>
      {/* <Text style={styles.description}>{status}</Text>
      <Text style={styles.description}>{machineType}</Text> */}
    </View>
  );
};

export default ViewStaff;
