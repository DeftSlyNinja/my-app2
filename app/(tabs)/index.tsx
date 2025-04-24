import { useState } from 'react' 
import { Image, StyleSheet, Platform, ScrollView, FlatList, TextInput, Button } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Card } from '@/components/Card';

/* 
    Assignment Requirements:
    - Text Component
    - TextInput Component
    - Button (Optional)
    - ScrollView Component
    - FlatList Component
    - Style w/ Flexbox
    - Optimize for both small and large screens
*/

export default function HomeScreen() {

  const [query, setQuery] = useState('');
  const [filteredGames, setFilteredGames] = useState(videoGames);

  const handleSearch = (query: string) => {
    setQuery(query);
    const filteredData = videoGames.filter((game) => 
      game.title.toLowerCase().includes(query.toLowerCase()));
    setFilteredGames(filteredData)
  };


  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          My Game Library
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.inputContainer}>
        <TextInput 
          style={styles.searchBar}
          onChangeText={handleSearch}
          value={query}
          placeholder='Search for game title...'>  
        </TextInput>
        <Button title="Not Implemented"></Button>
      </ThemedView>
      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.listContainer}>
          <FlatList 
            data={filteredGames} 
            keyExtractor={(item) => item.id} 
            renderItem={({ item }) => (
              <ThemedView>
                <Card title={item.title} genre={item.genre} completed={item.completed}></Card>
                {/* <ThemedText type="title">{item.title}</ThemedText> */}
              </ThemedView>
            )}>
          </FlatList>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

// List Data

const videoGames = [
  { id: '1', title: 'Halo', genre: 'First-Person Shooter', completed: true },
  { id: '2', title: 'Zelda', genre: 'Action-Adventure', completed: false },
  { id: '3', title: 'Mario', genre: 'Platformer', completed: true },
  { id: '4', title: 'Call of Duty', genre: 'First-Person Shooter', completed: false },
  { id: '5', title: 'Dredge', genre: 'Adventure / Fishing', completed: true },
  { id: '6', title: 'Delta Force', genre: 'Tactical Shooter', completed: false },
  { id: '7', title: 'Oblivion', genre: 'Action RPG', completed: true },
  { id: '8', title: 'Skyrim', genre: 'Action RPG', completed: true },
  { id: '9', title: 'Dota 2', genre: 'MOBA', completed: false },
  { id: '10', title: 'League of Legends', genre: 'MOBA', completed: false },
  { id: '11', title: 'Diablo', genre: 'Action RPG / Hack and Slash', completed: true },
  { id: '12', title: 'GTA', genre: 'Action-Adventure / Open World', completed: false },
  { id: '13', title: 'The Last Spell', genre: 'Tactical RPG / Roguelite', completed: true },
  { id: '14', title: 'Brotato', genre: 'Arena Shooter / Roguelite', completed: false },
  { id: '15', title: 'Dungeons of Dredmor', genre: 'Roguelike RPG', completed: true },
  { id: '16', title: 'Apex Legends', genre: 'Battle Royale / Hero Shooter', completed: false },
  { id: '17', title: 'Final Fantasy XIV', genre: 'MMORPG', completed: true },
  { id: '18', title: 'World of Warcraft', genre: 'MMORPG', completed: true },
  { id: '19', title: 'Slay the Spire', genre: 'Deck-building Roguelike', completed: false },
  { id: '20', title: 'Balatro', genre: 'Poker Roguelike / Deck-builder', completed: true },
];

// Styles below

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    margin: 10
  },
  container: {

    // borderColor: 'red',
    // borderWidth:5,

    flex: 1,
    padding: 16,
  },
  listContainer: {

    // borderColor: 'red',
    // borderWidth:5,

    flex: 1,
    borderRadius: 5,
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleContainer: {

    // borderColor: 'red',
    // borderWidth:5,

    // flex:1,
    alignItems: 'center'
  },
  inputContainer: {

    // borderColor: 'red',
    // borderWidth:5,

    // flex:1,
  },
  scrollContainer: {
    // borderColor: 'red',
    // borderWidth:5,

    flex:4,
  }
});
