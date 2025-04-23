import { Image, StyleSheet, Platform, ScrollView, FlatList, TextInput, Button } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>

      <ThemedText type="subtitle">
        My Game Library
      </ThemedText>

      <TextInput style={styles.searchBar} placeholder='Enter game title...'></TextInput>
      <Button title="Submit"></Button>
      <ThemedView style={styles.titleContainer}>

        <FlatList 
          data={videoGames} 
          keyExtractor={(item) => item.id} 
          renderItem={({ item }) => (
            <ThemedView style={styles.stepContainer}>
              <ThemedText type="title">{item.title}</ThemedText>
            </ThemedView>
          )}>
          
        </FlatList>

      </ThemedView>
    </ScrollView>
  );
}

const videoGames = [
  { id: '1', title: 'Halo' },
  { id: '2', title: 'Zelda' },
  { id: '3', title: 'Mario' },
  { id: '4', title: 'Call of Duty' },
  { id: '5', title: 'Dredge' },
  { id: '6', title: 'Delta Force' },
  { id: '7', title: 'Oblivion' },
  { id: '8', title: 'Skyrim' },
  { id: '9', title: 'Dota 2' },
  { id: '10', title: 'League of Legends' },
];
const styles = StyleSheet.create({
  searchBar: {
    color: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    margin: 10
  },
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
