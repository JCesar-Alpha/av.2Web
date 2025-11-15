import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

const Loading = ({ message = 'Carregando...', size = 'large' }) => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <ActivityIndicator size={size} color="#007AFF" />
        <Text style={styles.text}>{message}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 20,
    elevation: 4,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default Loading;