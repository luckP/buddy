import React, { useState } from 'react';

import { Text, TouchableOpacity } from "react-native";
import styles from "./Filter.style";

const Filter: React.FC<{filter: string, isSelected:boolean , onPress: () => void}> = ({filter, isSelected, onPress}) => {
    return (
        <TouchableOpacity style={isSelected? styles.filterButton : styles.filterButtonDisabled} onPress={onPress}>
            <Text style={styles.filterText}>{filter}</Text>
        </TouchableOpacity>
    );
}

export default Filter;