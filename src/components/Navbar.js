import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Text, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));

  const handleSearchPress = () => {
    // Navigate to search page
  };

  const handleSignOut = () => {
    // Add sign out logic here
    console.log('Signed out');
  };

  const toggleDrawer = () => {
    const toValue = isDrawerOpen ? 0 : 1;
    setIsDrawerOpen(!isDrawerOpen);
    Animated.timing(animatedValue, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const renderMenuIcon = () => {
    return <Ionicons name="menu" size={30} color="black" onPress={toggleDrawer} />;
  };

  const DrawerContent = () => {
    return (
      <Animated.View style={[styles.drawer, { transform: [{ translateX: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-SCREEN_WIDTH, 0],
      }) }] }]}>
        <TouchableOpacity onPress={handleSignOut} style={styles.drawerItem}>
          <Text style={styles.drawerItemText}>Sign Out</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
    {renderMenuIcon()}
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.iconContainer}>
        <Ionicons name="calendar-outline" size={30} color="black" style={styles.iconSpacing} />
        <Ionicons name="mail-outline" size={30} color="black" style={styles.iconSpacing} />
        <Ionicons name="notifications-outline" size={30} color="black" style={styles.iconSpacing} />
        <TouchableOpacity onPress={handleSearchPress} style={styles.iconSpacing}>
          <Ionicons name="search-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
      {isDrawerOpen && (
        <TouchableWithoutFeedback onPress={toggleDrawer}>
          <View style={styles.overlay}>
            <DrawerContent />
          </View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  </View>
);
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
    paddingTop: 0,
    zIndex: 2,
  },menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    padding: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 30,
  },
  iconSpacing: {
    marginLeft: 15,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  drawer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
    drawerItem: {
    paddingVertical: 10,
    },
    drawerItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    },
    });
    
    export default Navbar;