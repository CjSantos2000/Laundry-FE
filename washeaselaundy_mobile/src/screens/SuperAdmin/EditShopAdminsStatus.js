import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../../styles/Form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";

const EditShopAdminsStatus = ({ route, navigation }) => {
  const { shop_admin } = route.params;
  const [status, setStatus] = useState(shop_admin.subscription.status_id);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Pending", value: 1 },
    { label: "Successful", value: 6 },
    { label: "Failed", value: 10 },
  ]);

  const handleStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("superAdminToken");

      const response = await axios.post(
        `${"http://192.168.133.240:8000"}/api/super_admins/shop_admins/status/${
          shop_admin.id
        }`,
        {
          status_id: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigation.navigate("Super Admin Shop Admins", {
        result: response.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Shop Admin Status</Text>
        <Text style={styles.description}></Text>
        <DropDownPicker
          open={open}
          value={status}
          items={items}
          setOpen={setOpen}
          setValue={setStatus}
          setItems={setItems}
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleStatus}>
          <Text style={styles.inputButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EditShopAdminsStatus;