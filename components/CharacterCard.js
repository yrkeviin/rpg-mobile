// components/CharacterCard.js
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Card, Text, Portal, Modal, Button } from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';

export default function CharacterCard({ character, onToggleRecruit, onRemoveCharacter }) {
  const [removeModalVisible, setRemoveModalVisible] = useState(false);

  const handleLongPress = () => {
    setRemoveModalVisible(true);
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
      <Card 
        style={[
          styles.card, 
          character.recruited && styles.cardRecruited
        ]}
        onPress={() => onToggleRecruit(character)}
        onLongPress={handleLongPress}
      >
        <Card.Content style={styles.cardContent}>
          <Text 
            style={[
              styles.characterText, 
              character.recruited && styles.characterRecruitedText
            ]}
          >
            {character.name}
          </Text>
          <Text style={styles.status}>
            {character.recruited ? "⭐" : "💤"}
          </Text>
        </Card.Content>
      </Card>

      <Portal>
        <Modal 
          visible={removeModalVisible} 
          onDismiss={cancelRemove}
          contentContainerStyle={styles.modal}
        >
          <MaterialIcons 
            name="warning" 
            size={48} 
            color="#C5282F" 
            style={styles.warningIcon}
          />
          <Text style={styles.modalTitle}>Remover Personagem</Text>
          <Text style={styles.modalText}>
            Tem certeza que deseja remover "{character.name}" da party?
          </Text>
          <Text style={styles.modalSubText}>
            Esta ação não pode ser desfeita.
          </Text>
          <Card.Actions style={styles.modalButtons}>
            <Button 
              mode="outlined" 
              onPress={cancelRemove}
              textColor="#F4E4BC"
              style={styles.modalButton}
            >
              Cancelar
            </Button>
            <Button 
              mode="contained" 
              onPress={confirmRemove}
              buttonColor="#C5282F"
              textColor="#F4E4BC"
              style={styles.modalButton}
              icon={() => <MaterialIcons name="delete" size={16} color="#F4E4BC" />}
            >
              Remover
            </Button>
          </Card.Actions>
        </Modal>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2C1810",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#58180D",
  },
  cardRecruited: {
    backgroundColor: "#58180D",
    borderColor: "#E69A28",
    borderWidth: 2,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  characterText: {
    flex: 1,
    fontSize: 16,
    color: "#F4E4BC",
    fontWeight: "500",
  },
  characterRecruitedText: {
    color: "#E69A28",
    fontWeight: "bold",
  },
  status: {
    fontSize: 20,
    marginLeft: 10,
  },
  modal: {
    backgroundColor: "#2C1810",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    borderColor: "#C5282F",
    borderWidth: 2,
  },
  warningIcon: {
    alignSelf: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#C5282F",
    textAlign: "center",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#F4E4BC",
    textAlign: "center",
    marginBottom: 10,
  },
  modalSubText: {
    fontSize: 14,
    color: "#C5282F",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    justifyContent: "space-between",
    gap: 10,
  },
  modalButton: {
    flex: 1,
  },
});