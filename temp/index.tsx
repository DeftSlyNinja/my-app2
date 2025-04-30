import { useState } from 'react' 
import { Image, StyleSheet, Platform, ScrollView, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
// import { Card } from '@/components/Card';
import { Card } from '@/components/ui/card'
import { Link } from 'expo-router'
import { Box } from '@/components/ui/box';
import { Input, InputField } from '@/components/ui/input';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

/*
  Assignment 3 Requirements:
  1. Implement Navigation
    - Clicking an item should navigate to a detail page.
  2. Pass Data Between Screens:
    - When an item is clicked, pass details to new screen using navigation params.
    - Display passed data on detail screen.
  3. Mangage state w/ Hooks
    - useState for local state management.
    - useContext to store and acces a shared list of tasks globally.
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
    <Box className='flex-1 p-4'>
      <Heading size='3xl' className='self-center'>My Game Library</Heading>
        <Input variant='outline' size='lg' className='mt-2 mb-2'>
          <InputField
            placeholder='Search game library...'
            value={query}
            onChangeText={handleSearch}
          />
        </Input>
        <FlatList 
          data={filteredGames} 
          keyExtractor={(item) => item.id} 
          renderItem={({ item }) => (
            <TouchableOpacity /*onPress={}*/>
              <Card size='md' variant='elevated' className='m-3 shadow-lg'>
                <Heading size='xl'>{item.title}</Heading>
                <Text italic={true}>{item.genre}</Text>
                <Text className={item.completed ? 'text-green-600' : 'text-red-600'}>{item.completed ? "Completed" : "Incomplete"}</Text>
              </Card>
            </TouchableOpacity>
          )}>
        </FlatList>
    </Box>
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