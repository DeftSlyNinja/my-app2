import { useState } from 'react' 
import { Image, StyleSheet, Platform, ScrollView, FlatList, TextInput, Button } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

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
                <ThemedText type="title">{item.title}</ThemedText>
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
  { id: '11', title: 'Diablo' },
  { id: '12', title: 'GTA' },
  { id: '13', title: 'The Last Spell' },
  { id: '14', title: 'Brotatoe' },
  { id: '15', title: 'Dungeons of Dredmor' },
  { id: '16', title: 'Apex Legends' },
  { id: '17', title: 'Final Fantasy XIV' },
  { id: '18', title: 'World of Warcraft' },
  { id: '19', title: 'Slay the Spire' },
  { id: '20', title: 'Balatro' },
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
