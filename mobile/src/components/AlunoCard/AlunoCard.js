import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Chip } from 'react-native-paper';
import { CURSO_LABELS } from '../../utils/constants';

const AlunoCard = ({ aluno, onPress }) => {
  const { id, nome, turma, curso, matricula } = aluno;

  return (
    <TouchableOpacity onPress={() => onPress(aluno)} style={styles.touchable}>
      <Card style={styles.card} elevation={3}>
        <Card.Content>
          <View style={styles.header}>
            <Title style={styles.title} numberOfLines={2}>
              {nome}
            </Title>
            <Chip
              mode="outlined"
              style={styles.cursoChip}
              textStyle={styles.cursoText}
            >
              {curso}
            </Chip>
          </View>

          <Paragraph style={styles.info} numberOfLines={1}>
            🎓 {CURSO_LABELS[curso] || curso}
          </Paragraph>
          <Paragraph style={styles.info} numberOfLines={1}>
            📚 Turma: {turma}
          </Paragraph>
          <Paragraph style={styles.info} numberOfLines={1}>
            🆔 Matrícula: {matricula}
          </Paragraph>

          <View style={styles.footer}>
            <Paragraph style={styles.detailsLink}>
              Toque para ver detalhes →
            </Paragraph>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginVertical: 4,
  },
  card: {
    marginHorizontal: 16,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
    color: '#333',
  },
  cursoChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  cursoText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  footer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 8,
  },
  detailsLink: {
    fontSize: 12,
    color: '#007AFF',
    textAlign: 'right',
    fontStyle: 'italic',
  },
});

export default AlunoCard;