import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const NotFound = () => {
  const navigation = useNavigation();

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card} elevation={4}>
        <Card.Content style={styles.content}>
          <Title style={styles.title}>404 - Página Não Encontrada</Title>
          <Paragraph style={styles.message}>
            A página que você está procurando não existe ou foi movida.
          </Paragraph>
          <Button
            mode="contained"
            onPress={handleGoHome}
            style={styles.button}
            icon="home"
          >
            Voltar para a Página Inicial
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 12,
    backgroundColor: '#FFF3CD',
    borderColor: '#FFC107',
    borderWidth: 1,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#856404',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#856404',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
  },
});

export default NotFound;