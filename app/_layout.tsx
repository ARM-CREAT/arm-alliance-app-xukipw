
import "react-native-reanimated";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SystemBars } from "react-native-edge-to-edge";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme, Alert } from "react-native";
import { useNetworkState } from "expo-network";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button } from "@/components/button";
import { WidgetProvider } from "@/contexts/WidgetContext";
import { ContentProvider } from "@/contexts/ContentContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const networkState = useNetworkState();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  React.useEffect(() => {
    if (
      !networkState.isConnected &&
      networkState.isInternetReachable === false
    ) {
      Alert.alert(
        "🔌 Vous êtes hors ligne",
        "Vous pouvez continuer à utiliser l'application! Vos modifications seront sauvegardées localement et synchronisées lorsque vous serez de nouveau en ligne."
      );
    }
  }, [networkState.isConnected, networkState.isInternetReachable]);

  if (!loaded) {
    return null;
  }

  const CustomDefaultTheme: Theme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      primary: "rgb(0, 122, 255)", // System Blue
      background: "rgb(242, 242, 247)", // Light mode background
      card: "rgb(255, 255, 255)", // White cards/surfaces
      text: "rgb(0, 0, 0)", // Black text for light mode
      border: "rgb(216, 216, 220)", // Light gray for separators/borders
      notification: "rgb(255, 59, 48)", // System Red
    },
  };

  const CustomDarkTheme: Theme = {
    ...DarkTheme,
    colors: {
      primary: "rgb(10, 132, 255)", // System Blue (Dark Mode)
      background: "rgb(1, 1, 1)", // True black background for OLED displays
      card: "rgb(28, 28, 30)", // Dark card/surface color
      text: "rgb(255, 255, 255)", // White text for dark mode
      border: "rgb(44, 44, 46)", // Dark gray for separators/borders
      notification: "rgb(255, 69, 58)", // System Red (Dark Mode)
    },
  };
  return (
    <>
      <StatusBar style="auto" animated />
        <ThemeProvider
          value={colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme}
        >
          <AuthProvider>
            <LanguageProvider>
              <ContentProvider>
                <WidgetProvider>
                  <GestureHandlerRootView>
                <Stack>
                  {/* Main app with tabs */}
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

                  {/* Auth screens */}
                  <Stack.Screen
                    name="admin-login"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="test-password"
                    options={{
                      headerShown: false,
                    }}
                  />

                  {/* Admin screens */}
                  <Stack.Screen
                    name="admin-dashboard"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="admin-guide"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="manage-news"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="manage-events"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="manage-media"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="manage-members"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="video-conference"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="public-dashboard"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="regions"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="analytics"
                    options={{
                      headerShown: false,
                    }}
                  />

                  {/* Public screens */}
                  <Stack.Screen
                    name="membership"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="contact"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="events"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="news"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="chat"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="donations"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="media-gallery"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="share"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="install-pwa"
                    options={{
                      headerShown: false,
                    }}
                  />

                  {/* Modal Demo Screens */}
                  <Stack.Screen
                    name="modal"
                    options={{
                      presentation: "modal",
                      title: "Standard Modal",
                    }}
                  />
                  <Stack.Screen
                    name="formsheet"
                    options={{
                      presentation: "formSheet",
                      title: "Form Sheet Modal",
                      sheetGrabberVisible: true,
                      sheetAllowedDetents: [0.5, 0.8, 1.0],
                      sheetCornerRadius: 20,
                    }}
                  />
                  <Stack.Screen
                    name="transparent-modal"
                    options={{
                      presentation: "transparentModal",
                      headerShown: false,
                    }}
                  />
                </Stack>
                  <SystemBars style={"auto"} />
                  </GestureHandlerRootView>
                </WidgetProvider>
              </ContentProvider>
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
    </>
  );
}
