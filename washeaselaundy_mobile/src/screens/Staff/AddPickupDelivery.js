import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../../styles/Form";

const AddPickupDelivery = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Add</Text>
        <Text style={styles.description}></Text>
        <TextInput style={styles.input} placeholder="Enter name" />
        <TouchableOpacity style={styles.inputButton}>
          <Text style={styles.inputButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddPickupDelivery;
