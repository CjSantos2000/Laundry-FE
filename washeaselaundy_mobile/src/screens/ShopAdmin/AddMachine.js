import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../styles/Form";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";

const AddMachine = ({ navigation }) => {
  const [name, setName] = useState("");
  const [machineType, setMachineType] = useState("");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Wash", value: "1" },
    { label: "Dry", value: "2" },
  ]);

  const handleAddItem = async () => {
    try {
      const token = await AsyncStorage.getItem("shopAdminToken");

      const response = await axios.post(
        `${"http://192.168.133.240:8000"}/api/shop_admins/machines/add`,
        {
          name: name,
          machine_type_id: machineType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response.data.message);

      navigation.navigate("Shop Admin Machines", {
        result: response.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Add Machine</Text>
        <Text style={styles.description}></Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <DropDownPicker
          open={open}
          value={machineType}
          items={items}
          setOpen={setOpen}
          setValue={setMachineType}
          setItems={setItems}
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleAddItem}>
          <Text style={styles.inputButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddMachine;
