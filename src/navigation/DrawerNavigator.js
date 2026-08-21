import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomTabNavigator from './BottomTabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import HelpScreen from '../screens/HelpScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out of Pokédex?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: () => props.navigation.navigate('MainTabs') },
    ]);
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      <View style={styles.headerArea}>
        <View style={styles.iconCircle}>
          <Ionicons name="flash" size={32} color="#DC2626" />
        </View>
        <Text style={styles.headerTitle}>Pokédex App</Text>
        <Text style={styles.headerSubtitle}>Gotta Catch 'Em All!</Text>
      </View>

      <View style={styles.itemListContainer}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.logoutContainer}>
        <DrawerItem
          label="Log Out"
          labelStyle={styles.logoutLabel}
          icon={({ color, size }) => (
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          )}
          onPress={handleLogout}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#DC2626',
        drawerInactiveTintColor: '#475569',
        drawerLabelStyle: {
          fontWeight: '700',
          fontSize: 14,
        },
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{
          drawerLabel: 'Pokédex Home',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="apps-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{
          drawerLabel: 'Help & Support',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  headerArea: {
    backgroundColor: '#DC2626',
    padding: 24,
    paddingTop: 36,
    marginBottom: 12,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  headerSubtitle: {
    color: '#FEE2E2',
    fontSize: 12,
    marginTop: 2,
  },
  itemListContainer: {
    flex: 1,
  },
  logoutContainer: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 8,
    marginBottom: 16,
  },
  logoutLabel: {
    color: '#EF4444',
    fontWeight: '700',
  },
});
