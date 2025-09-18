// components/CharacterList.js
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import CharacterCard from "./CharacterCard";

export default function CharacterList({ characters, onToggleRecruit, onRemoveCharacter }) {
  const renderCharacter = ({ item }) => (
    <CharacterCard
      character={item}
      onToggleRecruit={onToggleRecruit}
      onRemoveCharacter={onRemoveCharacter}
    />
  );

  if (characters.length === 0) {
    return (
      <Text style={styles.emptyText}>
        Nenhum personagem encontrado 🔍
      </Text>
    );
  }

  return (
    <FlatList
      data={characters}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderCharacter}
      style={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  emptyText: {
    textAlign: "center",
    color: "#C5282F",
    fontSize: 16,
    marginTop: 50,
  },
});