import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HelpScreen() {
  const faqs = [
    {
      q: 'How do I search for a Pokémon?',
      a: 'Use the search bar at the top of the Home screen. You can type either the name (e.g. "Pikachu") or the Pokédex number (e.g. "25").',
    },
    {
      q: 'How do I favorite a Pokémon?',
      a: 'Tap the heart icon on any Pokémon card on the Home screen or Details screen to toggle favorite state.',
    },
    {
      q: 'Where does the data come from?',
      a: 'All statistics, types, and official images are live fetched directly from PokéAPI (https://pokeapi.co/).',
    },
    {
      q: 'What stats are displayed on the details screen?',
      a: 'Height (in meters), Weight (in kilograms), Base Experience, and full base stats including HP, Attack, Defense, Special Attack, Special Defense, and Speed.',
    },
  ];

  const handleContactSupport = () => {
    Alert.alert('Contact Support', 'Pokédex Support Team email: support@pokedexapp.org');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#DC2626" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

        {faqs.map((faq, idx) => (
          <View key={idx} style={styles.faqCard}>
            <View style={styles.questionRow}>
              <Ionicons name="help-circle" size={20} color="#DC2626" />
              <Text style={styles.questionText}>{faq.q}</Text>
            </View>
            <Text style={styles.answerText}>{faq.a}</Text>
          </View>
        ))}

        <View style={styles.supportCard}>
          <Ionicons name="headset-outline" size={32} color="#2563EB" />
          <Text style={styles.supportTitle}>Still Need Assistance?</Text>
          <Text style={styles.supportSubtitle}>
            Our support team is available to help answer questions about the Pokédex app.
          </Text>
          <TouchableOpacity style={styles.supportBtn} onPress={handleContactSupport}>
            <Text style={styles.supportBtnText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#F8FAFC',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  questionText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1,
  },
  answerText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 19,
    paddingLeft: 28,
  },
  supportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 8,
    marginBottom: 4,
  },
  supportSubtitle: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 16,
  },
  supportBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  supportBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});
