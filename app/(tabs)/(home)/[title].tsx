import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Button, SafeAreaView } from 'react-native';
import videoGameData from '@/data/videogames.json';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';

export default function TitlePage() {
  const router = useRouter();
  const { title } = useLocalSearchParams<{title: string}>();
  const videoGame = videoGameData.find((item) => item.title === title);
  const {
    id,
    genre,
    completed
  } = videoGame || {};

  return (
  <SafeAreaView className='flex-1 bg-white dark:bg-zinc-700'>
    <Box className='p-4 m-4 dark:bg-[#151718] bg-white max-h-screen-safe items-center rounded-md'>
      <Stack.Screen
        options={{
          title: title,
        }}
      />
      <Heading size='xl'>{title} Details</Heading>
      <VStack space="md" className='mr-auto mt-4 mb-4'>
          <Text>Genre: {genre}</Text>
          <Text>Completion Status: 
            <Text className={completed ? 'text-green-600' : 'text-red-600'}> {completed ? "Completed" : "Incomplete"}</Text>
          </Text>
      </VStack>
      <Button title="Go Back" onPress={() => router.back()} />
    </Box>
  </SafeAreaView>
  );
}