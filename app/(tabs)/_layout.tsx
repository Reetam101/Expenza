import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import CustomTabs from "@/components/CustomTabs";

const TabLayout = () => {
  return (
    <Tabs
      tabBar={CustomTabs}
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="statistics" />
      <Tabs.Screen name="wallet" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
