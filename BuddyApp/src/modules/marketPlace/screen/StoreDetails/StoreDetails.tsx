import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import styles from './StoreDetails.style';
import { fetchStore } from '../../services/marketPlaceService';

const StoreDetails = ({ route }: { route: any }) => {
    const { storeId } = route.params;

    const [store, setStore]: any = useState<any>(null);

    const getStore = async () => {
        try {
            const store = await fetchStore(storeId);
            setStore(store);
        } catch (error) {
            console.error('Error fetching store:', error);
        }
    }

    useEffect(() => {
        getStore();
    }, [storeId]);

    if (!store) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{store.name}</Text>
            <Text style={styles.description}>{store.description}</Text>
        </View>
    );
};

export default StoreDetails;