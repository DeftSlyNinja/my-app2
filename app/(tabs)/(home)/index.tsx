import { useState, useEffect } from 'react' 
import { Image, StyleSheet, Platform, ScrollView, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Card } from '@/components/ui/card'
import { useRouter } from 'expo-router'
import { Box } from '@/components/ui/box';
import { Input, InputField } from '@/components/ui/input';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Divider } from '@/components/ui/divider';
import { useVideoGameContext } from '@/components/ui/games-context-provider';


export default function HomeScreen() {

  const { videoGames } = useVideoGameContext();
  const [query, setQuery] = useState('');
  const [filteredGames, setFilteredGames] = useState(videoGames);
  const router = useRouter();

  const handleSearch = (query: string) => {
    setQuery(query);
    const filteredData = videoGames.filter((game) => 
      game.title.toLowerCase().includes(query.toLowerCase()));
    setFilteredGames(filteredData)
  };

  useEffect(() => {
    if (query === '') {
      setFilteredGames(videoGames);
    } else {
      const filtered = videoGames.filter((game) =>
        game.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredGames(filtered);
    }
  }, [videoGames]);


  return (
    <Box className='flex-1 p-4 bg-white dark:bg-zinc-700'>
      <Heading size='3xl' className='self-center'>My Game Library</Heading>
        <Input variant='outline' size='lg' className='mt-2 mb-2 bg-white'>
          <InputField
            placeholder='Search game library...'
            value={query}
            onChangeText={handleSearch}
          />
        </Input>
        <FlatList 
          data={filteredGames} 
          keyExtractor={(item) => item.id} 
          renderItem={({ item }) => {
            
            const handleLinkPress = () => {
                router.push({
                    pathname: '/(tabs)/(home)/[title]',
                    params: { title: item.title },
                })
              }

            return(
                <TouchableOpacity onPress={handleLinkPress}>
                  <Card size='md' variant='elevated' className='m-3 shadow-lg'>
                    <Heading size='xl'>{item.title}</Heading>
                    <Divider></Divider>
                    <Text italic={true}> - {item.genre}</Text>
                    <Text className={item.completed ? 'text-green-600' : 'text-red-600'}> - {item.completed ? "Completed" : "Incomplete"}</Text>
                  </Card>
                </TouchableOpacity>
                )
            }
          }>
        </FlatList>
    </Box>
  );
}