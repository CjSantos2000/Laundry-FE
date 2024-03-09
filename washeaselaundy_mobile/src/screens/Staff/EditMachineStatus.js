import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../../styles/Form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";

import Constants from 'expo-constants';
const API_BASE_URL = Constants.manifest.extra.API_BASE_URL;

const EditTransactionItem = ({ route, navigation }) => {
  const { machine_id, transaction_id, machine_status_id } = route.params;
  const [status, setStatus] = useState(machine_status_id);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Available", value: 7 },
    { label: "Not Available", value: 8 },
  ]);

  const handleEdit = async () => {
    try {
      const token = await AsyncStorage.getItem("staffToken");

      const response = await axios.put(
        `${API_BASE_URL}/api/staffs/transactions/edit_machine_status/${machine_id}`,
        {
          status_id: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      navigation.navigate("Staff View Transaction", {
        transaction_id: transaction_id,
        result: response.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Select Machine Status</Text>
        <Text style={styles.description}></Text>
        <DropDownPicker
          open={open}
          value={status}
          items={items}
          setOpen={setOpen}
          setValue={setStatus}
          setItems={setItems}
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleEdit}>
          <Text style={styles.inputButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EditTransactionItem;
