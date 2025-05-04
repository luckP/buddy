import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import styles from './CreateImageScreen.style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigation/NavigationTypes';
import { generateAiImage } from '../../services/aiImageService';

const styleOptions = ['Anime', 'Cartoon', 'Realist', 'Watercolor', 'Oil Painting'];

const CreateImageScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(true);

  const pickImage = async () => {
    const result: any = await launchImageLibrary({ mediaType: 'photo', quality: 1 });
    if (result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleConfirm = async () => {
    if (description && selectedImage) {
      try {
        await generateAiImage(`${description}${selectedStyle ? ' in ' + selectedStyle + ' style' : ''}`, selectedImage);
        setModalSuccess(true);
      } catch (error) {
        console.error('Image generation failed', error);
        setModalSuccess(false);
      }
    } else {
      setModalSuccess(false);
    }
    setModalVisible(true);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    if (modalSuccess) {
      navigation.goBack();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o título"
        value={title}
        onChangeText={setTitle}
      />

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
        ) : (
          <Icon name="camera" size={40} color="#ccc" />
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Descreva a imagem para a IA"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={5}
      />

      <Text style={styles.label}>Escolher Estilo</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.styleSelector}>
        {styleOptions.map((style) => (
          <TouchableOpacity
            key={style}
            style={[styles.styleButton, selectedStyle === style && styles.styleButtonSelected]}
            onPress={() => setSelectedStyle(style)}
          >
            <Text style={[styles.styleButtonText, selectedStyle === style && styles.styleButtonTextSelected]}>
              {style}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name={modalSuccess ? 'check-circle' : 'times-circle'} size={60} color={modalSuccess ? 'green' : 'red'} />
            <Text style={styles.modalText}>
              {modalSuccess ? 'Imagem criada com sucesso!' : 'Erro ao criar imagem. Preencha todos os campos.'}
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default CreateImageScreen;