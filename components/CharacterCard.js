
import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Pressable } from "react-native";

export default function CharacterCard({ character, onToggleRecruit, onRemoveCharacter }) {
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const timerRef = useRef(null);

  const handlePressIn = () => {
    timerRef.current = setTimeout(() => {
      setRemoveModalVisible(true);
    }, 800);
  };

  const handlePressOut = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handlePress = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    onToggleRecruit(character);
  };

  const confirmRemove = () => {
    onRemoveCharacter(character);
    setRemoveModalVisible(false);
  };

  const cancelRemove = () => {
    setRemoveModalVisible(false);
  };

  return (
    <>
      <Pressable
        style={[
          styles.card,
          character.recruited ? styles.cardRecruited : styles.cardAvailable
        ]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.row}>
          <Text style={[
            styles.name,
            character.recruited ? styles.nameRecruited : styles.nameAvailable
          ]}>
            {character.name}
          </Text>
          <Text style={styles.statusIcon}>
            {character.recruited ? "⭐" : "💤"}
          </Text>
        </View>
      </Pressable>

      <Modal
        visible={removeModalVisible}
        transparent
        animationType="fade"
        onRequestClose={cancelRemove}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalWarning}>⚠️</Text>
            <Text style={styles.modalTitle}>Remover Personagem</Text>
            <Text style={styles.modalText}>
              Tem certeza que deseja remover "{character.name}" da party?
            </Text>
            <Text style={styles.modalDanger}>Esta ação não pode ser desfeita.</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={cancelRemove} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmRemove} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>🗑️ Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginBottom: 10,
    cursor: 'pointer',
    userSelect: 'none',
  },
  cardRecruited: {
    backgroundColor: '#58180D',
    borderWidth: 2,
    borderColor: '#E69A28',
  },
  cardAvailable: {
    backgroundColor: '#2C1810',
    borderWidth: 1,
    borderColor: '#58180D',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  nameRecruited: {
    color: '#E69A28',
    fontWeight: 'bold',
  },
  nameAvailable: {
    color: '#F4E4BC',
    fontWeight: '500',
  },
  statusIcon: {
    fontSize: 20,
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#2C1810',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C5282F',
    maxWidth: '90%',
    alignItems: 'center',
  },
  modalWarning: {
    fontSize: 48,
    color: '#C5282F',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C5282F',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#F4E4BC',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDanger: {
    fontSize: 14,
    color: '#C5282F',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderColor: '#F4E4BC',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#F4E4BC',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#C5282F',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#F4E4BC',
    fontWeight: 'bold',
  },
});