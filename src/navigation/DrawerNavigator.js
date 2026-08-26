import React, { createContext, useState, useContext, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomTabNavigator from './BottomTabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import HelpScreen from '../screens/HelpScreen';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.78;

const DrawerContext = createContext();

export function useDrawer() {
  return useContext(DrawerContext);
}

export default function DrawerNavigator() {
  const [currentScreen, setCurrentScreen] = useState('MainTabs');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const animValue = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  const openDrawer = () => {
    setIsDrawerOpen(true);
    Animated.timing(animValue, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = (callback) => {
    Animated.timing(animValue, {
      toValue: -DRAWER_WIDTH,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsDrawerOpen(false);
      if (callback) callback();
    });
  };

  const navigateTo = (screenName) => {
    closeDrawer(() => {
      setCurrentScreen(screenName);
    });
  };

  const handleLogout = () => {
    closeDrawer(() => {
      Alert.alert('Logout', 'Are you sure you want to log out of Pokédex?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => setCurrentScreen('MainTabs'),
        },
      ]);
    });
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'Settings':
        return (
          <View style={styles.screenWrapper}>
            <View style={styles.screenHeader}>
              <TouchableOpacity style={styles.menuBtn} onPress={openDrawer}>
                <Ionicons name="menu" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.screenHeaderTitle}>Settings</Text>
              <View style={{ width: 40 }} />
            </View>
            <SettingsScreen />
          </View>
        );
      case 'Help':
        return (
          <View style={styles.screenWrapper}>
            <View style={styles.screenHeader}>
              <TouchableOpacity style={styles.menuBtn} onPress={openDrawer}>
                <Ionicons name="menu" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.screenHeaderTitle}>Help & Support</Text>
              <View style={{ width: 40 }} />
            </View>
            <HelpScreen />
          </View>
        );
      case 'MainTabs':
      default:
        return <BottomTabNavigator screenProps={{ openDrawer }} />;
    }
  };

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer, navigateTo }}>
      <View style={{ flex: 1 }}>
        {renderActiveScreen()}

        {/* Drawer Modal */}
        <Modal
          visible={isDrawerOpen}
          transparent
          animationType="none"
          onRequestClose={() => closeDrawer()}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity
              style={styles.backdrop}
              activeOpacity={1}
              onPress={() => closeDrawer()}
            />
            <Animated.View
              style={[
                styles.drawerSheet,
                { transform: [{ translateX: animValue }] },
              ]}
            >
              <SafeAreaView style={{ flex: 1 }}>
                {/* Header Header */}
                <View style={styles.drawerHeader}>
                  <View style={styles.logoCircle}>
                    <Ionicons name="flash" size={30} color="#DC2626" />
                  </View>
                  <Text style={styles.drawerAppTitle}>Pokédex App</Text>
                  <Text style={styles.drawerSubtitle}>Gotta Catch 'Em All!</Text>
                </View>

                {/* Drawer Items */}
                <View style={styles.drawerNavList}>
                  <TouchableOpacity
                    style={[
                      styles.drawerNavItem,
                      currentScreen === 'MainTabs' && styles.activeNavItem,
                    ]}
                    onPress={() => navigateTo('MainTabs')}
                  >
                    <Ionicons
                      name="apps-outline"
                      size={20}
                      color={currentScreen === 'MainTabs' ? '#DC2626' : '#475569'}
                    />
                    <Text
                      style={[
                        styles.drawerNavText,
                        currentScreen === 'MainTabs' && styles.activeNavText,
                      ]}
                    >
                      Pokédex Home
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.drawerNavItem,
                      currentScreen === 'Settings' && styles.activeNavItem,
                    ]}
                    onPress={() => navigateTo('Settings')}
                  >
                    <Ionicons
                      name="settings-outline"
                      size={20}
                      color={currentScreen === 'Settings' ? '#DC2626' : '#475569'}
                    />
                    <Text
                      style={[
                        styles.drawerNavText,
                        currentScreen === 'Settings' && styles.activeNavText,
                      ]}
                    >
                      Settings
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.drawerNavItem,
                      currentScreen === 'Help' && styles.activeNavItem,
                    ]}
                    onPress={() => navigateTo('Help')}
                  >
                    <Ionicons
                      name="help-circle-outline"
                      size={20}
                      color={currentScreen === 'Help' ? '#DC2626' : '#475569'}
                    />
                    <Text
                      style={[
                        styles.drawerNavText,
                        currentScreen === 'Help' && styles.activeNavText,
                      ]}
                    >
                      Help & Support
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Logout Button */}
                <View style={styles.logoutSection}>
                  <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={20} color="#EF4444" />
                    <Text style={styles.logoutBtnText}>Log Out</Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </Animated.View>
          </View>
        </Modal>
      </View>
    </DrawerContext.Provider>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  drawerSheet: {
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  drawerHeader: {
    backgroundColor: '#DC2626',
    padding: 20,
    paddingTop: 24,
    marginBottom: 12,
  },
  logoCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  drawerAppTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  drawerSubtitle: {
    color: '#FEE2E2',
    fontSize: 11,
    marginTop: 2,
  },
  drawerNavList: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 8,
    gap: 4,
  },
  drawerNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  activeNavItem: {
    backgroundColor: '#FEF2F2',
  },
  drawerNavText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  activeNavText: {
    color: '#DC2626',
  },
  logoutSection: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    padding: 16,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  logoutBtnText: {
    color: '#EF4444',
    fontWeight: '700',
    fontSize: 14,
  },
  screenWrapper: {
    flex: 1,
    backgroundColor: '#DC2626',
  },
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#DC2626',
  },
  menuBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
});
