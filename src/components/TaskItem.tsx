import React, { useState, useRef, useEffect } from 'react';
import { Image, TouchableOpacity, View, TextInput , StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Task } from '../components/TasksList';
import { EditTaskProps } from '../pages/Home';

import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';
import checkIcon from '../assets/icons/check/check.png';

interface TaskItemProps {
  tasks: Task[];
  item: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (({ taskId, taskNewTitle } : EditTaskProps) => void);
}

export function TaskItem({ tasks, item, index, toggleTaskDone, removeTask, editTask } : TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setEditedTitle(item.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    if (editedTitle==='') {
      Alert.alert(
        "Task vazia",
        "Você não pode cadastrar uma task vazia",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      )
    } else if(tasks.find(task => task.title === editedTitle)) {
        Alert.alert(
          "Task já cadastrada",
          "Você não pode cadastrar uma task com o mesmo nome",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        )
    } else {
        editTask({taskId: item.id, taskNewTitle: editedTitle});
        setIsEditing(false);
    }
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return (
    <View style={styles.boxContainer}>
      <TouchableOpacity
        testID={`button-${index}`}
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => toggleTaskDone(item.id)}
      >
        <View 
          testID={`marker-${index}`}
          style={item.done ? styles.taskMarkerDone : styles.taskMarker} 
        >
          {item.done && (
            <Icon 
              name="check"
              size={12}
              color="#FFF"
            />
          )}
        </View>

        <TextInput
          ref={textInputRef}
          multiline
          value={editedTitle}
          editable={isEditing}
          onChangeText={setEditedTitle}
          onSubmitEditing={handleSubmitEditing}
          style={item.done ? styles.taskTextDone : styles.taskText}
        />
      </TouchableOpacity>
      
      <View style={ styles.iconsContainer }>

        { isEditing ? (
          <>
            <TouchableOpacity
            onPress={handleSubmitEditing}
            style={{paddingRight: 12}}
            >
              <Image source={checkIcon} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCancelEditing}
            >
              <Icon name="x" size={24} color="#b2b2b2" />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        ) }

        <View style={ styles.iconsDivider } />

        <TouchableOpacity
          disabled={isEditing}
          testID={`trash-${index}`}
          style={{ marginRight: 24 }}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    paddingLeft: 15
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 12
  }
})