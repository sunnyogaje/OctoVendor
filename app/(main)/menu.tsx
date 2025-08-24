import React from 'react';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 16 },
        ]}
      >
        {/* Page title */}
        <View style={{ paddingTop: insets.top + 6, marginBottom: 16 }}>
          <Text style={styles.title}>Menu</Text>
        </View>

        {/* ...rest of your dashboard content goes here... */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
    color: '#111827',
  },
});