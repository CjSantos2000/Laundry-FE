import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../../styles/Form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";

import Constants from 'expo-constants';
const API_BASE_URL = Constants.manifest.extra.API_BASE_URL;

const EditTransactionItem = ({ route, navigation }) => {
  const { transaction_item_id, transaction_mode_id } = route.params;
  const [machine, setMachine] = useState(0);
  const [status, setStatus] = useState(0);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(
    transaction_mode_id === 1
      ? [
          { label: "Select item", value: 0 },
          { label: "Processing", value: 2 },
          { label: "Successful", value: 6 },
        ]
      : [
          { label: "Select item", value: 0 },
          { label: "Pending", value: 1 },
          { label: "Processing", value: 2 },
          { label: "Ready to Pickup", value: 3 },
          { label: "Delivered", value: 4 },
          { label: "Cancelled", value: 5 },
          { label: "Successful", value: 6 },
        ]
  );
  const [open2, setOpen2] = useState(false);
  const [items2, setItems2] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("staffToken");

        const response = await axios.get(
          `${API_BASE_URL}/api/staffs/transactions/machines`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setItems2(
          response.data.machines.map((item) => ({
            label: item.name,
            value: item.id,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTransactionItem = async () => {
      try {
        const token = await AsyncStorage.getItem("staffToken");

        const response = await axios.get(
          `${API_BASE_URL}/api/staffs/transactions/item/${transaction_item_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMachine(response.data.transaction_item.machine_id);
        setStatus(response.data.transaction_item.status_id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTransactionItem();
    fetchData();
  }, []);

  const handleAddItem = async () => {
    try {
      const token = await AsyncStorage.getItem("staffToken");

      const response = await axios.put(
        `${API_BASE_URL}/api/staffs/transactions/item/${transaction_item_id}`,
        {
          machine_id: machine,
          status_id: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigation.navigate("Staff View Transaction", {
        transaction_id: response.data.response[0].transaction_id,
        result: response.data.response[0].message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Select Machine</Text>
        <Text style={styles.description}></Text>
        <DropDownPicker
          open={open}
          value={status}
          items={items}
          setOpen={setOpen}
          setValue={setStatus}
          setItems={setItems}
        />
        <DropDownPicker
          open={open2}
          value={machine}
          items={items2}
          setOpen={setOpen2}
          setValue={setMachine}
          setItems={setItems2}
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleAddItem}>
          <Text style={styles.inputButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EditTransactionItem;
