import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import styles from './ReplyModal.style';

type ReplyModalProps = {
    visible: boolean;
    onSubmit: (replyText: string) => void;
    onClose: () => void;
};

const ReplyModal: React.FC<ReplyModalProps> = ({ visible, onSubmit, onClose }) => {
    const [replyText, setReplyText] = useState('');

    const handleSubmit = () => {
        if (replyText.trim() === '') return;
        onSubmit(replyText);
        setReplyText('');
    };

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.overlay}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalContainer}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Reply to Comment</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Write your reply..."
                            value={replyText}
                            onChangeText={setReplyText}
                            multiline
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                                <Text style={styles.submitButtonText}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

export default ReplyModal;
