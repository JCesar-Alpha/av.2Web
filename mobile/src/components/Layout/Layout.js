import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Appbar } from 'react-native-paper';

const Layout = ({ children, title, navigation, showBack = false }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#007AFF" barStyle="light-content" />
      <Appbar.Header style={styles.header}>
        {showBack && navigation && (
          <Appbar.BackAction onPress={() => navigation.goBack()} />
        )}
        <Appbar.Content title={title} />
      </Appbar.Header>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
  },
  content: {
    flex: 1,
  },
});

export default Layout;