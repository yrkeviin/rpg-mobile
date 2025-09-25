
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from "./components/Header";
import AddCharacterForm from "./components/AddCharacterForm";
import CharacterList from "./components/CharacterList";
import FilterButtons from "./components/FilterButtons";

export default function App() {
  const [characters, setCharacters] = useState([
    { id: 1, name: "🧙‍♂️ Gandalf o Mago", recruited: 0 },
    { id: 2, name: "⚔️ Aragorn o Guerreiro", recruited: 1 },
    { id: 3, name: "🏹 Legolas o Arqueiro", recruited: 0 }
  ]);

  const [filter, setFilter] = useState("all");
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });
  const [snackbarTimeout, setSnackbarTimeout] = useState(null);

  const showSnackbar = (message) => {
    setSnackbar({ visible: true, message });
    if (snackbarTimeout) clearTimeout(snackbarTimeout);
    const timeout = setTimeout(() => {
      setSnackbar({ visible: false, message: "" });
    }, 3000);
    setSnackbarTimeout(timeout);
  };

  function addCharacter(characterName) {
    if (characterName.trim() === "") return;
    const newId = Math.max(...characters.map(c => c.id), 0) + 1;
    const newCharacterObj = {
      id: newId,
      name: characterName,
      recruited: 0 
    };
    setCharacters(prevCharacters => [newCharacterObj, ...prevCharacters]);
    showSnackbar(`${characterName} foi adicionado à party! 🎉`);
  }

  function toggleRecruit(character) {
    setCharacters(prevCharacters =>
      prevCharacters.map(char =>
        char.id === character.id
          ? { ...char, recruited: char.recruited ? 0 : 1 }
          : char
      )
    );
    const action = character.recruited ? "dispensado" : "recrutado";
    showSnackbar(`${character.name} foi ${action}! ${character.recruited ? "💤" : "⭐"}`);
  }

  function removeCharacter(character) {
    setCharacters(prevCharacters =>
      prevCharacters.filter(char => char.id !== character.id)
    );
    showSnackbar(`${character.name} foi removido da party! 👋`);
  }

  const getFilteredCharacters = () => {
    switch (filter) {
      case "recruited":
        return characters.filter(char => char.recruited === 1);
      case "available":
        return characters.filter(char => char.recruited === 0);
      default:
        return characters;
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <AddCharacterForm onAddCharacter={addCharacter} />
      <FilterButtons 
        currentFilter={filter} 
        onFilterChange={setFilter}
        charactersCount={{
          all: characters.length,
          recruited: characters.filter(c => c.recruited === 1).length,
          available: characters.filter(c => c.recruited === 0).length
        }}
      />
      <CharacterList 
        characters={getFilteredCharacters()}
        onToggleRecruit={toggleRecruit}
        onRemoveCharacter={removeCharacter}
      />
      {snackbar.visible && (
        <View style={styles.snackbar}>
          <Text style={styles.snackbarText}>{snackbar.message}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A0E0A',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  snackbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30,
    alignItems: 'center',
    zIndex: 1000,
  },
  snackbarText: {
    backgroundColor: '#E69A28',
    color: '#1A0E0A',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    overflow: 'hidden',
    maxWidth: '90%',
  },
});