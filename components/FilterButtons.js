// components/FilterButtons.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";

export default function FilterButtons({ currentFilter, onFilterChange, charactersCount }) {
  const buttons = [
    {
      value: "all",
      label: `Todos (${charactersCount.all})`,
      icon: "account-group",
    },
    {
      value: "recruited",
      label: `Recrutados (${charactersCount.recruited})`,
      icon: "star",
    },
    {
      value: "available",
      label: `Disponíveis (${charactersCount.available})`,
      icon: "sleep",
    },
  ];

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={currentFilter}
        onValueChange={onFilterChange}
        buttons={buttons}
        style={styles.segmentedButtons}
        theme={{
          colors: {
            secondaryContainer: "#E69A28",
            onSecondaryContainer: "#1A0E0A",
            outline: "#C5282F",
            onSurface: "#F4E4BC",
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  segmentedButtons: {
    backgroundColor: "transparent",
  },
});