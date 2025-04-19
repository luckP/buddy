import React from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { launchCamera, launchImageLibrary, Asset } from "react-native-image-picker";
import { COLORS } from "../../../../constants/theme";

type Props = {
    setSelectedImage: (uri: string | null) => void;
  };

  const ImageButton: React.FC<Props> = ({ setSelectedImage }) => {



  const handleImagePick = () => {
    Alert.alert(
      "Selecionar imagem",
      "Escolha uma opção",
      [
        {
          text: "Galeria",
          onPress: () => {
            launchImageLibrary(
              { mediaType: "photo", quality: 0.8 },
              (response) => handleResult(response.assets)
            );
          },
        },
        {
          text: "Câmera",
          onPress: () => {
            launchCamera(
              { mediaType: "photo", quality: 0.8 },
              (response) => handleResult(response.assets)
            );
          },
        },
        { text: "Cancelar", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const handleResult = (assets?: Asset[]) => {
    if (assets && assets.length > 0) {
      const image = assets[0];
      console.log("📷 Selected image:", image.uri);
      if (image.uri) setSelectedImage(image.uri);
    }
  };

  return (
    <TouchableOpacity onPress={handleImagePick} style={styles.button}>
      <Icon name="image" size={20} color={COLORS.primary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    marginRight: 6,
  },
});

export default ImageButton;
