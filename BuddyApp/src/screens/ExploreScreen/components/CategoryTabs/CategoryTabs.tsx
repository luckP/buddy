import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // or another icon library
import styles from './CategoryTabs.style';
import { COLORS } from '../../../../constants/theme';

const CategoryTabs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('All'); // Manage selected tab

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'All' && styles.activeTab]}
        onPress={() => setSelectedTab('All')}
      >
        <Icon name="ellipsis-h" size={20} color={selectedTab === 'All' ? COLORS.primary : COLORS.inactive} />
        <Text style={[styles.tabText, selectedTab === 'All' && styles.activeText]}>All</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, selectedTab === 'Grooming' && styles.activeTab]}
        onPress={() => setSelectedTab('Grooming')}
      >
        <Icon name="leaf" size={20} color={selectedTab === 'Grooming' ? COLORS.primary : COLORS.inactive} />
        <Text style={[styles.tabText, selectedTab === 'Grooming' && styles.activeText]}>Grooming</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, selectedTab === 'Veterinary' && styles.activeTab]}
        onPress={() => setSelectedTab('Veterinary')}
      >
        <Icon name="plus" size={20} color={selectedTab === 'Veterinary' ? COLORS.primary : COLORS.inactive} />
        <Text style={[styles.tabText, selectedTab === 'Veterinary' && styles.activeText]}>Veterinary</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, selectedTab === 'Training' && styles.activeTab]}
        onPress={() => setSelectedTab('Training')}
      >
        <Icon name="user-secret" size={20} color={selectedTab === 'Training' ? COLORS.primary : COLORS.inactive} />
        <Text style={[styles.tabText, selectedTab === 'Training' && styles.activeText]}>Training</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryTabs;
