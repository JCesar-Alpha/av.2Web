import React from 'react';
import { View, FlatList, Alert, RefreshControl } from 'react-native';
import { Appbar, Text, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AlunoCard from '../../components/AlunoCard';
import Loading from '../../components/Loading';
import useAlunos from '../../hooks/useAlunos';

const Home = () => {
  const navigation = useNavigation();
  const { alunos, loading, error, refetch } = useAlunos();

  const handleAlunoPress = (aluno) => {
    navigation.navigate('AlunoDetails', { alunoId: aluno.id });
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleInfoPress = () => {
    Alert.alert(
      'Informações do Sistema',
      `Total de alunos cadastrados: ${alunos.length}\n\nSistema Educacional Mobile v1.0.0`,
      [{ text: 'OK' }]
    );
  };

  if (loading && alunos.length === 0) {
    return <Loading message="Carregando alunos..." />;
  }

  if (error && alunos.length === 0) {
    return (
      <View style={{ flex: 1 }}>
        <Appbar.Header>
          <Appbar.Content title="Lista de Alunos" />
        </Appbar.Header>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text variant="headlineMedium" style={{ color: '#F44336', marginBottom: 16 }}>
            Erro ao Carregar
          </Text>
          <Text variant="bodyMedium" style={{ textAlign: 'center', color: '#666', marginBottom: 24 }}>
            {error.message}
          </Text>
          <FAB
            icon="refresh"
            label="Tentar Novamente"
            onPress={refetch}
            style={{ backgroundColor: '#007AFF' }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Lista de Alunos" />
        <Appbar.Action 
          icon="refresh" 
          onPress={refetch} 
        />
        <Appbar.Action 
          icon="information" 
          onPress={handleInfoPress} 
        />
      </Appbar.Header>

      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AlunoCard aluno={item} onPress={handleAlunoPress} />
        )}
        ListEmptyComponent={
          <View style={{ padding: 40, alignItems: 'center' }}>
            <Text variant="bodyLarge" style={{ textAlign: 'center', color: '#666', marginBottom: 8 }}>
              Nenhum aluno encontrado.
            </Text>
            <Text variant="bodyMedium" style={{ textAlign: 'center', color: '#999' }}>
              Verifique sua conexão com a internet.
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        contentContainerStyle={{
          paddingBottom: 80,
          flexGrow: 1,
        }}
        ListHeaderComponent={
          alunos.length > 0 ? (
            <View style={{ padding: 16, backgroundColor: '#f8f9fa' }}>
              <Text variant="bodyMedium" style={{ textAlign: 'center', color: '#666' }}>
                {alunos.length} {alunos.length === 1 ? 'aluno encontrado' : 'alunos encontrados'}
              </Text>
            </View>
          ) : null
        }
      />

      <FAB
        icon="refresh"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: '#007AFF',
        }}
        onPress={refetch}
        loading={loading}
      />
    </View>
  );
};

export default Home;