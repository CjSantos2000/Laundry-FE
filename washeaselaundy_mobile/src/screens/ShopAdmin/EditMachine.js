import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../styles/Form";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";

const EditMachine = ({ navigation, route }) => {
  const { machine_id } = route.params;
  const [name, setName] = useState("");
  const [machineType, setMachineType] = useState("");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Wash", value: "1" },
    { label: "Dry", value: "2" },
  ]);

  console.log(machineType);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("shopAdminToken");

        const response = await axios.get(
          `${"http://192.168.133.240:8000"}/api/shop_admins/machines/${machine_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.machine);
        setName(response.data.machine.name);
        setMachineType(response.data.machine.machine_type_id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleEditItem = async () => {
    try {
      const token = await AsyncStorage.getItem("shopAdminToken");

      const response = await axios.put(
        `${"http://192.168.133.240:8000"}/api/shop_admins/machines/${machine_id}`,
        {
          machine_type_id: machineType,
          name: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response.data);

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
        <Text style={styles.title}>Edit Machine</Text>
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
        <TouchableOpacity style={styles.inputButton} onPress={handleEditItem}>
          <Text style={styles.inputButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EditMachine;
