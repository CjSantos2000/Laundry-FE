import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../styles/Form";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";

import Constants from 'expo-constants';
const API_BASE_URL = Constants.manifest.extra.API_BASE_URL;

const AddCartItems = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [machine, setMachine] = useState(null);
  const [transactionModeId, setTransactionModeId] = useState(
    route.params.transaction_mode_id == null
      ? null
      : route.params.transaction_mode_id
  );
  const [shopAdminId, setShopAdminId] = useState(
    route.params.shop_admin_id == null ? null : route.params.shop_admin_id
  );
  const [serviceId, setServiceId] = useState(
    route.params.service_id == null ? null : route.params.service_id
  );
  const [additionalServiceId, setAdditionalServiceId] = useState(
    route.params.additional_service_id == null
      ? null
      : route.params.additional_service_id
  );
  const [garmentId, setGarmentId] = useState(
    route.params.garment_id == null ? null : route.params.garment_id
  );
  const [price, setPrice] = useState(
    route.params.price == null ? null : route.params.price
  );
  const {
    transaction_mode_id,
    shop_admin_id,
    service_id,
    additional_service_id,
  } = route.params;
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  console.log(machine);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("customerToken");

        const response = await axios.get(
          `${API_BASE_URL}/api/customers/machines/${shop_admin_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setItems(
          response.data.machines
            .filter((item) => item.status_id === 7)
            .map((item) => ({
              label: item.name,
              value: item.id,
            }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleAddItem = async () => {
    try {
      const token = await AsyncStorage.getItem("customerToken");

      const response = await axios.post(
        `${`${API_BASE_URL}/api/customers/login`}/api/customers/cart/add`,
        {
          name: name,
          quantity: quantity,
          weight: weight,
          transaction_mode_id: transactionModeId,
          shop_admin_id: shopAdminId,
          service_id: serviceId,
          additional_service_id: additionalServiceId,
          garment_id: garmentId,
          machine_id: transaction_mode_id === 1 ? machine : null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName("");
      setQuantity("");
      setWeight("");

      navigation.navigate("User Cart", {
        service_id: serviceId,
        transaction_mode_id: transactionModeId,
        shop_admin_id: shopAdminId,
        additional_service_id: additionalServiceId,
        price: price,
        garment_id: garmentId,
        result: response.data.message,
      });
    } catch (error) {
      setName("");
      setQuantity("");
      setWeight("");
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Add Cart Item</Text>
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
          placeholder="Enter weight"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />
        {transaction_mode_id === 1 && (
          <DropDownPicker
            open={open}
            value={machine}
            items={items}
            setOpen={setOpen}
            setValue={setMachine}
            setItems={setItems}
          />
        )}
        <TouchableOpacity style={styles.inputButton} onPress={handleAddItem}>
          <Text style={styles.inputButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddCartItems;
