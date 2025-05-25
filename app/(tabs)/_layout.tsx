import { Tabs, useRouter } from "expo-router";
import React, { useContext } from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Button, ButtonText } from "@/components/ui/button";
import { ThemeContext } from "../_layout";
import { Box } from "@/components/ui/box";
import { Fab, FabIcon } from "@/components/ui/fab";
import { EditIcon } from "@/components/ui/icon";

export default function TabLayout() {
  const router = useRouter();
  const { toggleColorMode } = useContext(ThemeContext);

  return (
    <Box className="flex-1">
      <Tabs
        screenOptions={{
          // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarActiveTintColor: "blue",
          headerShown: true,
          headerTitleAlign: "center",
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
            headerRight: () => (
              <Button onPress={toggleColorMode}>
                <ButtonText>Theme</ButtonText>
              </Button>
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />
      </Tabs>
      <Fab
        size="lg"
        className="bottom-32 dark:bg-zinc-700"
        onPress={() => router.navigate("/add-videogame")}
      >
        <FabIcon as={EditIcon} color="white"></FabIcon>
      </Fab>
    </Box>
  );
}
