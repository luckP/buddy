import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './RoutineScreen.style';

const routineTasks = [
  { id: '1', label: 'Walk your pet' },
  { id: '2', label: 'Provide fresh water' },
  { id: '3', label: 'Healthy meal time' },
  { id: '4', label: 'Playtime / Exercise' },
  { id: '5', label: 'Grooming / Brushing' },
  { id: '6', label: 'Health Check (quick)' },
];

const RoutineScreen: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const toggleTask = (id: string) => {
    if (completedTasks.includes(id)) {
      setCompletedTasks(completedTasks.filter(taskId => taskId !== id));
    } else {
      setCompletedTasks([...completedTasks, id]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Daily Pet Routines</Text>

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
  );
};

export default RoutineScreen;
