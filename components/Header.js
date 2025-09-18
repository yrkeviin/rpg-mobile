// components/Header.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { Title, Paragraph } from "react-native-paper";

export default function Header() {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>🏰 Minha Party RPG</Title>
      <Paragraph style={styles.subtitle}>
        ⭐ Recrutado • 💤 Disponível • Segure para remover
      </Paragraph>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E69A28",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: "#C5282F",
    textAlign: "center",
  },
});