// App.js
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider, Snackbar } from "react-native-paper";
import * as SQLite from "expo-sqlite";

import Header from "./components/Header";
import AddCharacterForm from "./components/AddCharacterForm";
import CharacterList from "./components/CharacterList";
import FilterButtons from "./components/FilterButtons";

export default function App() {
  const [db, setDb] = useState(null);
  const [characters, setCharacters] = useState([
    { id: 1, name: "🧙‍♂️ Gandalf o Mago", recruited: 0 },
    { id: 2, name: "⚔️ Aragorn o Guerreiro", recruited: 1 },
    { id: 3, name: "🏹 Legolas o Arqueiro", recruited: 0 }
  ]);
  const [filter, setFilter] = useState("all"); // all, recruited, available
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

  useEffect(() => {
    async function openDatabase() {
      try {
        const database = await SQLite.openDatabaseAsync("party.db");
        setDb(database);
      } catch (error) {
        console.error("Erro ao abrir banco de dados:", error);
      }
    }
    
    openDatabase();
  }, []);

  const showSnackbar = (message) => {
    setSnackbar({ visible: true, message });
  };

  const hideSnackbar = () => {
    setSnackbar({ visible: false, message: "" });
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
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        
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

        <Snackbar
          visible={snackbar.visible}
          onDismiss={hideSnackbar}
          duration={3000}
          style={styles.snackbar}
        >
          {snackbar.message}
        </Snackbar>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A0E0A", 
    paddingTop: 50, 
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  snackbar: {
    backgroundColor: "#E69A28",
  }
});