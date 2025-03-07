import React, { useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import Swiper from "react-native-swiper";
import styles from "./SelectReportModal.style";
import { LostAndFoundReport } from "../../../../models/models";

const { width } = Dimensions.get("window");

const SelectReportModal = ({ selectedReport, setSelectedReport }: any) => {
  const [comments, setComments] = useState([
    { id: "1", text: "I saw this dog near the park!", likes: 3 },
    { id: "2", text: "Hope you find your pet soon!", likes: 1 },
  ]);
  const [newComment, setNewComment] = useState("");

  if (!selectedReport) return null;

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments((prev) => [
        ...prev,
        { id: (prev.length + 1).toString(), text: newComment, likes: 0 },
      ]);
      setNewComment("");
    }
  };

  return (
    <Modal visible={!!selectedReport} transparent animationType="slide">
      <View style={styles.modalContainer}>
        {/* Title at the top */}
        <Text style={styles.reportTitle}>{selectedReport.petName}</Text>
        <TouchableOpacity onPress={() => setSelectedReport(null)} style={styles.closeButtonTop}>
          <Text style={styles.closeButtonTopText}>×</Text>
        </TouchableOpacity>

        {/* Image Carousel */}
        <View style={styles.imageContainer}>
          <Swiper
            style={styles.swiper}
            showsPagination
            loop
          >
            {selectedReport?.images && selectedReport.images.map((image: any, index: any) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.carouselImage}
                resizeMode="cover" // Ensures images are well-fitted
              />
            ))}
          </Swiper>
        </View>

        {/* Description */}
        <ScrollView style={styles.detailsContainer}>
          <Text style={styles.reportDescription}>{selectedReport.description}</Text>
        </ScrollView>

        {/* Comments Section */}
        <View style={styles.commentsContainer}>
          <Text style={styles.sectionTitle}>Comments</Text>
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.comment}>
                <Text>{item.text}</Text>
              </View>
            )}
          />

          {/* Add Comment */}
          <View style={styles.addCommentContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity onPress={handleAddComment} style={styles.addCommentButton}>
              <Text style={styles.addCommentButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Close Button */}
        {/* <TouchableOpacity onPress={() => setSelectedReport(null)} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity> */}
      </View>
    </Modal>
  );
};

export default SelectReportModal;
