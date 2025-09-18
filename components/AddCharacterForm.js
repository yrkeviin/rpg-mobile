// components/AddCharacterForm.js
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Portal, Modal, Text } from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';

export default function AddCharacterForm({ onAddCharacter }) {
  const [newCharacter, setNewCharacter] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddCharacter = () => {
    if (newCharacter.trim() === "") {
      return;
    }
    setModalVisible(true);
  };

  const confirmAdd = () => {
    onAddCharacter(newCharacter);
    setNewCharacter("");
    setModalVisible(false);
  };

  const cancelAdd = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="🎭 Nome do novo personagem..."
          value={newCharacter}
          onChangeText={setNewCharacter}
          onSubmitEditing={handleAddCharacter}
          mode="outlined"
          outlineColor="#E69A28"
          activeOutlineColor="#E69A28"
          textColor="#1A0E0A"
          theme={{
            colors: {
              background: "#F4E4BC",
              onSurfaceVariant: "#1A0E0A"
            }
          }}
        />
        <Button
          mode="contained"
          onPress={handleAddCharacter}
          style={styles.button}
          buttonColor="#C5282F"
          textColor="#E69A28"
          icon={() => <MaterialIcons name="person-add" size={20} color="#E69A28" />}
        >
          
        </Button>
      </View>

      <Portal>
        <Modal 
          visible={modalVisible} 
          onDismiss={cancelAdd}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.modalTitle}>Confirmar Adição</Text>
          <Text style={styles.modalText}>
            Deseja adicionar "{newCharacter}" à sua party?
          </Text>
          <View style={styles.modalButtons}>
            <Button 
              mode="outlined" 
              onPress={cancelAdd}
              style={styles.modalButton}
              textColor="#C5282F"
            >
              Cancelar
            </Button>
            <Button 
              mode="contained" 
              onPress={confirmAdd}
              style={styles.modalButton}
              buttonColor="#E69A28"
              textColor="#1A0E0A"
            >
              Adicionar
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
  },
  button: {
    justifyContent: "center",
    borderColor: "#E69A28",
    borderWidth: 2,
  },
  modal: {
    backgroundColor: "#2C1810",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    borderColor: "#E69A28",
    borderWidth: 2,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E69A28",
    textAlign: "center",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#F4E4BC",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
  },
  modalButton: {
    flex: 1,
  },
});