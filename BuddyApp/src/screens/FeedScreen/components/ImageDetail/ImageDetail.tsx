import React from 'react';
import {
    Modal,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './ImageDetail.style';

type ImageDetailProps = {
    visible: boolean;
    imageUrl: string;
    onClose: () => void;
};

const ImageDetail: React.FC<ImageDetailProps> = ({ visible, imageUrl, onClose }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.container}>
                {/* Close Button */}
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Icon name="close" size={24} color="#fff" />
                </TouchableOpacity>

                {/* Full-Screen Image */}
                <Image source={{ uri: imageUrl }} style={styles.image} />
            </View>
        </Modal>
    );
};



export default ImageDetail;
