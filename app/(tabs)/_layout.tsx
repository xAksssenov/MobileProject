import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function TabLayout() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors["light"].tint,
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "white",
              borderTopColor: "#ccc",
              borderTopWidth: 1,
              elevation: 0,
            },
            tabBarLabelStyle: {
              fontSize: 12,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Главная",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="cart"
            options={{
              title: "Корзина",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "cart" : "cart-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="gallery"
            options={{
              title: "Галерея",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "images" : "images-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      </Provider>
    </GestureHandlerRootView>
  );
}
