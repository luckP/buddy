import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BarChart, ProgressChart, LineChart } from 'react-native-chart-kit';
import styles from './RoutineScreen.style';

const screenWidth = Dimensions.get('window').width;

const routineTasks = [
  { id: '1', label: 'Walk your pet' },
  { id: '2', label: 'Provide fresh water' },
  { id: '3', label: 'Healthy meal time' },
  { id: '4', label: 'Playtime / Exercise' },
  { id: '5', label: 'Grooming / Brushing' },
  { id: '6', label: 'Health Check (quick)' },
];

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
  propsForBackgroundLines: {
    stroke: '#eee',
  },
  propsForLabels: {
    fontSize: 12,
  },
};

const RoutineScreen: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleTask = (id: string) => {
    setCompletedTasks((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const estimatedTime = (completedTasks.length * 0.5).toFixed(1);

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Progress Donut */}
        <ProgressChart
          data={{
            labels: ['Walk', 'Meal', 'Play'],
            data: [0.6, 0.8, 0.7],
          }}
          width={screenWidth - 40}
          height={180}
          strokeWidth={16}
          radius={40}
          chartConfig={chartConfig}
          style={styles.chart}
        />

        {/* Line Chart */}
        <LineChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                data: [3, 4, 2, 6, 1, 5, 4],
              },
            ],
          }}
          width={screenWidth - 40}
          height={200}
          yAxisSuffix=""
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />

        {/* Bar Chart */}
        <BarChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            datasets: [
              {
                data: [4, 6, 5, 3, 4],
              },
            ],
          }}
          width={screenWidth - 40}
          height={200}
          yAxisSuffix=""
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          style={styles.chart}
        />

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>Completed</Text>
            <Text style={styles.summaryValue}>{completedTasks.length}</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>Time</Text>
            <Text style={styles.summaryValue}>~{estimatedTime} hrs</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>Streak</Text>
            <Text style={styles.summaryValue}>3 days</Text>
          </View>
        </View>

        {/* Task Checklist */}
        <Text style={styles.subtitle}>Today’s Tasks</Text>
        {routineTasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={styles.taskCard}
            onPress={() => toggleTask(task.id)}
          >
            <Icon
              name={completedTasks.includes(task.id) ? 'check-circle' : 'circle-o'}
              size={24}
              color={completedTasks.includes(task.id) ? 'green' : '#ccc'}
              style={styles.taskIcon}
            />
            <Text
              style={[
                styles.taskText,
                completedTasks.includes(task.id) && styles.taskTextCompleted,
              ]}
            >
              {task.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Add new routine (coming soon)</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RoutineScreen;
