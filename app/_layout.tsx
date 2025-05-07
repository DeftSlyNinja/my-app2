import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import "@/global.css";
import { GluestackUIProvider, ModeType } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { createContext, useEffect, useState } from 'react';
import 'react-native-reanimated';
import { VideoGameProvider } from '@/components/ui/games-context-provider';



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

type ThemeContextType = {
  colorMode: ModeType;
  toggleColorMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  colorMode: "light",
  toggleColorMode: () => {},
});

export default function RootLayout() {
  const [colorMode, setColorMode] = useState<ModeType>("light");

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const toggleColorMode = async () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <GluestackUIProvider mode={colorMode}>
      <ThemeContext.Provider value={{colorMode, toggleColorMode}}>
        <VideoGameProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </VideoGameProvider>
      </ThemeContext.Provider>
    </GluestackUIProvider>
  );
}
