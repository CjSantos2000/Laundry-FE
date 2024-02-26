import React, { useState, useEffect } from "react";
import { styles } from "../../styles/Box";
import { Text, View } from "react-native";

const ViewSellingItems = ({ route }) => {
  const { sellingItem } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{sellingItem.name}</Text>
      <Text style={styles.description}>{sellingItem.quantity} pieces</Text>
      <Text style={styles.description}>{sellingItem.price} pesos</Text>
    </View>
  );
};

export default ViewSellingItems;
