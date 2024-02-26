import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../../styles/Form";

const ChangePassword = () => {
  return (
    <>
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Enter old password" />
        <TextInput style={styles.input} placeholder="Enter new paassword" />
        <TextInput
          style={styles.input}
          placeholder="Enter confirm new password"
        />
        <TouchableOpacity style={styles.inputButton}>
          <Text style={styles.inputButtonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ChangePassword;
