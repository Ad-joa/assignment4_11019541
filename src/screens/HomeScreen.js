import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Header from '../components/Header';
import PokemonCard from '../components/PokemonCard';
import { Ionicons } from '@expo/vector-icons';
import { useDrawer } from '../navigation/DrawerNavigator';

export default function HomeScreen({ navigation }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState({});
  const drawer = useDrawer();

  const handleOpenDrawer = () => {
    if (drawer && drawer.openDrawer) {
      drawer.openDrawer();
    } else if (navigation && navigation.openDrawer) {
      navigation.openDrawer();
    }
  };

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=60');
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();

      const formatted = data.results.map((item, index) => {
        const id = index + 1;
        return {
          id,
          name: item.name,
          number: id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        };
      });

      setPokemonList(formatted);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Unable to fetch Pokémon data. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredPokemon = useMemo(() => {
    return pokemonList.filter((pkmn) => {
      const nameMatch = pkmn.name.toLowerCase().includes(searchQuery.toLowerCase());
      const numberMatch = String(pkmn.number).includes(searchQuery);
      return nameMatch || numberMatch;
    });
  }, [pokemonList, searchQuery]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#DC2626" />
      <View style={styles.container}>
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenDrawer={handleOpenDrawer}
        />

        <View style={styles.body}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>All Pokémon</Text>
            <Text style={styles.countBadge}>{filteredPokemon.length} loaded</Text>
          </View>

          {loading ? (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color="#DC2626" />
              <Text style={styles.loadingText}>Fetching Pokémon from PokéAPI...</Text>
            </View>
          ) : error ? (
            <View style={styles.centerContainer}>
              <Ionicons name="cloud-offline-outline" size={48} color="#EF4444" />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={fetchPokemon}>
                <Text style={styles.retryButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={filteredPokemon}
              keyExtractor={(item) => String(item.id)}
              numColumns={2}
              contentContainerStyle={styles.gridContent}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <PokemonCard
                  name={item.name}
                  image={item.image}
                  number={item.number}
                  isFavorite={!!favorites[item.id]}
                  onToggleFavorite={() => toggleFavorite(item.id)}
                  onPress={() =>
                    navigation.navigate('PokemonDetails', {
                      pokemonName: item.name,
                      pokemonId: item.id,
                      pokemonImage: item.image,
                    })
                  }
                />
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyTitle}>No Pokémon Found</Text>
                  <Text style={styles.emptySubtitle}>
                    Try searching for another name or number.
                  </Text>
                </View>
              }
            />
          )}
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
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  body: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  countBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  gridContent: {
    paddingBottom: 24,
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
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#64748B',
  },
});
