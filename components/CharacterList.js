
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CharacterCard from "./CharacterCard";

export default function CharacterList({ characters, onToggleRecruit, onRemoveCharacter }) {
  if (characters.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum personagem encontrado 🔍</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      {characters.map((item) => (
        <CharacterCard
          key={item.id}
          character={item}
          onToggleRecruit={onToggleRecruit}
          onRemoveCharacter={onRemoveCharacter}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#C5282F',
    fontSize: 16,
  },
});