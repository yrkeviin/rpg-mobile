
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function FilterButtons({ currentFilter, onFilterChange, charactersCount }) {
  const buttons = [
    {
      value: "all",
      label: `Todos (${charactersCount.all})`,
      icon: "👥",
    },
    {
      value: "recruited",
      label: `Recrutados (${charactersCount.recruited})`,
      icon: "⭐",
    },
    {
      value: "available",
      label: `Disponíveis (${charactersCount.available})`,
      icon: "💤",
    },
  ];

  return (
    <View style={styles.container}>
      {buttons.map(btn => (
        <TouchableOpacity
          key={btn.value}
          onPress={() => onFilterChange(btn.value)}
          style={[styles.button, currentFilter === btn.value && styles.buttonActive]}
        >
          <Text style={[styles.buttonText, currentFilter === btn.value && styles.buttonTextActive]}>
            {btn.icon} {btn.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#2C1810',
    borderColor: '#E69A28',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 2,
    marginBottom: 4,
  },
  buttonActive: {
    backgroundColor: '#E69A28',
  },
  buttonText: {
    color: '#E69A28',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonTextActive: {
    color: '#1A0E0A',
  },
});