import React from 'react';
import { View, ScrollView, Alert, StyleSheet, Text } from 'react-native';
import { Appbar, Card, Title, Paragraph, Divider, Chip } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import Loading from '../../components/Loading';
import useAlunoDetails from '../../hooks/useAlunoDetails';
import { CURSO_LABELS } from '../../utils/constants';

const AlunoDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { alunoId } = route.params;
  const { aluno, loading, error, refetch } = useAlunoDetails(alunoId);

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Carregando..." />
        </Appbar.Header>
        <Loading message="Carregando dados do aluno..." />
      </View>
    );
  }

  if (error) {
    Alert.alert(
      'Erro',
      `Não foi possível carregar os dados do aluno: ${error.message}`,
      [
        { text: 'Voltar', onPress: () => navigation.goBack() },
        { text: 'Tentar Novamente', onPress: refetch }
      ]
    );
    return null;
  }

  if (!aluno) {
    return (
      <View style={{ flex: 1 }}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Aluno Não Encontrado" />
        </Appbar.Header>
        <Card style={{ margin: 16, padding: 20 }}>
          <Paragraph style={{ textAlign: 'center', fontSize: 16 }}>
            Aluno não encontrado ou foi removido do sistema.
          </Paragraph>
        </Card>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Detalhes do Aluno" />
        <Appbar.Action icon="refresh" onPress={refetch} />
      </Appbar.Header>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card} elevation={3}>
          <Card.Content>
            <View style={styles.header}>
              <Title style={styles.nome}>{aluno.nome}</Title>
              <Chip
                mode="outlined"
                style={styles.cursoChip}
                textStyle={styles.chipText}
              >
                {aluno.curso}
              </Chip>
            </View>

            <Divider style={styles.divider} />

            <View style={styles.infoSection}>
              <Paragraph style={styles.infoItem}>
                <Text style={styles.label}>ID:</Text> {aluno.id}
              </Paragraph>

              <Paragraph style={styles.infoItem}>
                <Text style={styles.label}>Matrícula:</Text> {aluno.matricula}
              </Paragraph>

              <Paragraph style={styles.infoItem}>
                <Text style={styles.label}>Turma:</Text> {aluno.turma}
              </Paragraph>

              <Paragraph style={styles.infoItem}>
                <Text style={styles.label}>Curso:</Text> {CURSO_LABELS[aluno.curso] || aluno.curso}
              </Paragraph>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
    color: '#333',
  },
  cursoChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  statusActive: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
  },
  statusInactive: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  chipText: {
    color: '#333',
    fontWeight: '600',
  },
  divider: {
    marginVertical: 16,
    backgroundColor: '#e0e0e0',
  },
  infoSection: {
    gap: 12,
  },
  infoItem: {
    fontSize: 16,
    lineHeight: 24,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  observacoesSection: {
    marginTop: 8,
  },
  observacoesTitle: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  observacoesText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#666',
    fontStyle: 'italic',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
});

export default AlunoDetails;