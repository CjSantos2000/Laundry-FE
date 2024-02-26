import React, { useState, useEffect } from "react";
import { styles } from "../../styles/Box";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ViewShopAdmins = ({ route }) => {
  const { shop_admin } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{shop_admin.shop_name}</Text>
      <Text style={styles.description}>
        {shop_admin.first_name} {shop_admin.last_name}
      </Text>
      <Text style={styles.description}>{shop_admin.address}</Text>
      <Text style={styles.description}>{shop_admin.phone_number}</Text>
      <Text style={styles.description}>{shop_admin.email}</Text>
    </View>
  );
};

export default ViewShopAdmins;
