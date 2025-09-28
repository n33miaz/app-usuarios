import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchRandomUser, User } from '../services/api';

const HomeScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    setLoading(true);
    try {
      const newUser = await fetchRandomUser();
      setUser(newUser);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Não foi possível gerar o usuário.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.picture.large }} style={styles.userImage} />
      <Text style={styles.name}>{`${user.name.first} ${user.name.last}`}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Idade:</Text>
          <Text style={styles.infoText}>{user.dob.age} anos</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Telefone:</Text>
          <Text style={styles.infoText}>{user.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Localização:</Text>
          <Text style={styles.infoText}>{`${user.location.city}, ${user.location.state}`}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={loadUser}>
        <Text style={styles.buttonText}>Gerar Novo Usuário</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#007bff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 25,
  },
  infoContainer: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;