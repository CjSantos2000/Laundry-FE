// CardItem.js
import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const CardItem = ({ title, description, imageUrl }) => (
  <Card style={styles.card}>
    <Card.Cover source={{ uri: imageUrl }} style={styles.cardImage} />
    <Card.Content>
      <Title>{title}</Title>
      <Paragraph>{description}</Paragraph>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    width: "50%", // Take up half of the screen width
    marginBottom: 16,
  },
  cardImage: {
    height: 150, // Set the height of the image as needed
  },
});

export default CardItem;
