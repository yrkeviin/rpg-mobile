import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";

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
          placeholderTextColor="#A67C52"
        />
        <TouchableOpacity onPress={handleAddCharacter} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={cancelAdd}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar personagem?</Text>
            <Text style={styles.modalText}>{newCharacter}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={confirmAdd} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Adicionar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelAdd} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#F4E4BC',
    color: '#1A0E0A',
    borderColor: '#E69A28',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#C5282F',
    borderRadius: 8,
    padding: 10,
    minWidth: 40,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: '#1A0E0A',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderColor: '#C5282F',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cancelButtonText: {
    color: '#C5282F',
    fontWeight: 'bold',
  }
});
