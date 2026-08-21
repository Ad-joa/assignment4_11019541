import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [highResArt, setHighResArt] = useState(true);

  const handleClearCache = () => {
    Alert.alert('Cache Cleared', 'Local Pokémon image cache has been cleared successfully.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#DC2626" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>Preferences</Text>

          <View style={styles.row}>
            <View style={styles.rowInfo}>
              <Ionicons name="volume-high-outline" size={20} color="#2563EB" />
              <Text style={styles.rowLabel}>Sound Effects</Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
              thumbColor={soundEnabled ? '#2563EB' : '#F1F5F9'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.rowInfo}>
              <Ionicons name="moon-outline" size={20} color="#2563EB" />
              <Text style={styles.rowLabel}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
              thumbColor={darkMode ? '#2563EB' : '#F1F5F9'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <View style={styles.rowInfo}>
              <Ionicons name="image-outline" size={20} color="#2563EB" />
              <Text style={styles.rowLabel}>High-Res Official Artwork</Text>
            </View>
            <Switch
              value={highResArt}
              onValueChange={setHighResArt}
              trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
              thumbColor={highResArt ? '#2563EB' : '#F1F5F9'}
            />
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>Storage & Data</Text>

          <TouchableOpacity style={styles.clearBtn} onPress={handleClearCache}>
            <Ionicons name="trash-outline" size={18} color="#EF4444" />
            <Text style={styles.clearBtnText}>Clear Pokémon Cache</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#DC2626',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#DC2626',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8FAFC',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  rowInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 8,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  clearBtnText: {
    color: '#EF4444',
    fontWeight: '700',
    fontSize: 14,
  },
});
