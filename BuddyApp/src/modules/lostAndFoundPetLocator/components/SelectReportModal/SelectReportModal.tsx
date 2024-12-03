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
  StatusBar,
} from "react-native";
import Swiper from "react-native-swiper";
import styles from "./SelectReportModal.style";
import { LostAndFoundReport } from "../../../../models/models";

type ReportCardProps = {
  selectedReport: LostAndFoundReport | null;
  setSelectedReport: (report: LostAndFoundReport | null) => void;
};

const SelectReportModal: React.FC<ReportCardProps> = ({
  selectedReport,
  setSelectedReport,
}) => {
  const [comments, setComments] = useState([
    {
      id: "1",
      text: "I saw this dog near the park!",
      likes: 3,
      reported: false,
    },
    { id: "2", text: "Hope you find your pet soon!", likes: 1, reported: false },
  ]);
  const [newComment, setNewComment] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<(() => void) | null>(null);

  if (!selectedReport) {
    return null;
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments((prev) => [
        ...prev,
        {
          id: (prev.length + 1).toString(),
          text: newComment,
          likes: 0,
          reported: false,
        },
      ]);
      setNewComment("");
    }
  };

  const handleLikeComment = (id: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  const handleReportComment = (id: string) => {
    setConfirmationAction(() =>
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === id ? { ...comment, reported: true } : comment
        )
      )
    );
    setShowConfirmation(true);
  };

  const handleReportPost = () => {
    setConfirmationAction(() => () => console.log("Report flagged for review."));
    setShowConfirmation(true);
  };

  const confirmAction = () => {
    if (confirmationAction) {
      confirmationAction();
    }
    setShowConfirmation(false);
  };

  const cancelAction = () => {
    setConfirmationAction(null);
    setShowConfirmation(false);
  };

  const { width } = Dimensions.get("window");

  return (
    <>
      {/* Main Modal */}
      <Modal
        visible={!!selectedReport && !showConfirmation}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedReport(null)}
      >
        <View style={styles.modalContainer}>
          {/* Title */}
          <Text style={styles.reportTitle}>{selectedReport.title}</Text>

          {/* Carousel */}
          <View style={styles.carouselContainer}>
            <Swiper
              style={styles.swiper}
              height={200}
              showsPagination={true}
              dotStyle={styles.dotStyle}
              activeDotStyle={styles.activeDotStyle}
              loop={true}
            >
              {selectedReport.images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={styles.carouselImage}
                />
              ))}
            </Swiper>
          </View>

          {/* Description and Contact */}
          <ScrollView style={styles.detailsContainer}>
            <Text style={styles.reportDescription}>
              {selectedReport.description}
            </Text>
            <Text style={styles.reportContact}>
              Contact: {selectedReport.contact}
            </Text>
          </ScrollView>

          {/* Comments Section */}
          <View style={styles.commentsContainer}>
            <Text style={styles.sectionTitle}>Comments</Text>
            <FlatList
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.comment}>
                  <Text style={styles.commentText}>{item.text}</Text>
                  <View style={styles.commentActions}>
                    <TouchableOpacity
                      onPress={() => handleLikeComment(item.id)}
                      style={styles.likeButton}
                    >
                      <Text>👍 {item.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleReportComment(item.id)}
                      style={styles.reportButton}
                    >
                      <Text style={{ color: item.reported ? "red" : "black" }}>
                        Report
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            <View style={styles.addCommentContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                value={newComment}
                onChangeText={setNewComment}
              />
              <TouchableOpacity
                style={styles.addCommentButton}
                onPress={handleAddComment}
              >
                <Text style={styles.addCommentButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.alertButton}
              onPress={handleReportPost}
            >
              <Text style={styles.alertButtonText}>Report Post</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedReport(null)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmation}
        transparent
        animationType="fade"
        onRequestClose={cancelAction}
      >
        <View style={styles.confirmationModalContainer}>
          <View style={styles.confirmationBox}>
            <Text style={styles.confirmationText}>Are you sure?</Text>
            <View style={styles.confirmationActions}>
              <TouchableOpacity style={styles.confirmButton} onPress={confirmAction}>
                <Text style={styles.confirmButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={cancelAction}>
                <Text style={styles.cancelButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SelectReportModal;
