import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TypeBadge from '../components/TypeBadge';
import StatBar from '../components/StatBar';

const { width } = Dimensions.get('window');

export default function PokemonDetailsScreen({ route, navigation }) {
  const { pokemonName, pokemonId, pokemonImage } = route.params || {};

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchPokemonDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const identifier = pokemonName || pokemonId || '1';
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      setDetails(data);
    } catch (err) {
      console.error('Details fetch error:', err);
      setError('Could not load Pokémon details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, [pokemonName, pokemonId]);

  const nameFormatted = pokemonName
    ? pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)
    : details
    ? details.name.charAt(0).toUpperCase() + details.name.slice(1)
    : 'Pokémon Details';

  const idFormatted = details
    ? `#${String(details.id).padStart(3, '0')}`
    : pokemonId
    ? `#${String(pokemonId).padStart(3, '0')}`
    : '#000';

  const mainType = details?.types?.[0]?.type?.name || 'normal';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#DC2626" />

      {/* Top Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{nameFormatted}</Text>
        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => setIsFavorite((prev) => !prev)}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={isFavorite ? '#EF4444' : '#0F172A'}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#DC2626" />
          <Text style={styles.loadingText}>Loading details for {nameFormatted}...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchPokemonDetails}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Artwork Hero View */}
          <View style={styles.heroContainer}>
            <View style={styles.idContainer}>
              <Text style={styles.idText}>{idFormatted}</Text>
            </View>
            <Image
              source={{
                uri:
                  details.sprites?.other?.['official-artwork']?.front_default ||
                  pokemonImage ||
                  details.sprites?.front_default,
              }}
              style={styles.pokemonImage}
              resizeMode="contain"
            />
          </View>

          {/* Details Card Sheet */}
          <View style={styles.sheetContainer}>
            <Text style={styles.pokemonName}>{nameFormatted}</Text>

            {/* Type Badges */}
            <View style={styles.typesRow}>
              {details.types?.map((t) => (
                <TypeBadge key={t.type.name} type={t.type.name} />
              ))}
            </View>

            <View style={styles.divider} />

            {/* Physical Specs (Height, Weight, Base XP) */}
            <Text style={styles.sectionTitle}>Physical Attributes</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Ionicons name="resize-outline" size={20} color="#2563EB" />
                <Text style={styles.statBoxValue}>
                  {(details.height / 10).toFixed(1)} m
                </Text>
                <Text style={styles.statBoxLabel}>Height</Text>
              </View>

              <View style={styles.statBox}>
                <Ionicons name="barbell-outline" size={20} color="#2563EB" />
                <Text style={styles.statBoxValue}>
                  {(details.weight / 10).toFixed(1)} kg
                </Text>
                <Text style={styles.statBoxLabel}>Weight</Text>
              </View>

              <View style={styles.statBox}>
                <Ionicons name="trophy-outline" size={20} color="#2563EB" />
                <Text style={styles.statBoxValue}>{details.base_experience || 0}</Text>
                <Text style={styles.statBoxLabel}>Base Exp</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Base Stats Progress Bars */}
            <Text style={styles.sectionTitle}>Base Stats</Text>
            <View style={styles.baseStatsContainer}>
              {details.stats?.map((s) => {
                const statNameMap = {
                  hp: 'HP',
                  attack: 'Attack',
                  defense: 'Defense',
                  'special-attack': 'Sp. Atk',
                  'special-defense': 'Sp. Def',
                  speed: 'Speed',
                };
                const label = statNameMap[s.stat.name] || s.stat.name;
                return (
                  <StatBar
                    key={s.stat.name}
                    label={label}
                    value={s.base_stat}
                    max={160}
                  />
                );
              })}
            </View>

            <View style={styles.divider} />

            {/* Abilities */}
            <Text style={styles.sectionTitle}>Abilities</Text>
            <View style={styles.abilitiesRow}>
              {details.abilities?.map((a) => {
                const abilityName =
                  a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1);
                return (
                  <View key={a.ability.name} style={styles.abilityChip}>
                    <Ionicons name="sparkles" size={14} color="#D97706" style={{ marginRight: 4 }} />
                    <Text style={styles.abilityText}>
                      {abilityName} {a.is_hidden ? '(Hidden)' : ''}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  errorText: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  scrollContent: {
    paddingBottom: 40,
    backgroundColor: '#F8FAFC',
  },
  heroContainer: {
    width: width,
    height: 240,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  idContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  idText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  pokemonImage: {
    width: 200,
    height: 200,
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  pokemonName: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 10,
  },
  typesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statBoxValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 6,
  },
  statBoxLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  baseStatsContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  abilitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  abilityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  abilityText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#92400E',
  },
});
