import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import AlunoDetails from '../screens/AlunoDetails';
import NotFound from '../screens/NotFound';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitle: 'Voltar',
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={Home}
        options={{
          title: 'Lista de Alunos',
        }}
      />
      <Stack.Screen 
        name="AlunoDetails" 
        component={AlunoDetails}
        options={{
          title: 'Detalhes do Aluno',
        }}
      />
      <Stack.Screen 
        name="NotFound" 
        component={NotFound}
        options={{
          title: 'Página Não Encontrada',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;