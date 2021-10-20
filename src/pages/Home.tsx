import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface EditTaskProps {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find(task => task.title === newTaskTitle)) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      )
    } else {
        const task = {
          id: new Date().getTime(),
          title: newTaskTitle,
          done: false
        };
        setTasks(oldState => [...oldState, task]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({...task}));
    updatedTasks.map(task => {
      task.id===id && (task.done=!task.done);
    });
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "NÃO",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "SIM", onPress: () => {
            setTasks(oldState => oldState.filter(
              task => task.id !== id
            ));
          }
        }
      ]
    )
  }

  function handleEditTask({ taskId, taskNewTitle } : EditTaskProps) {
    const updatedTasks = tasks.map(task => ({...task}));
    updatedTasks.map(task => {
      task.id===taskId && (task.title=taskNewTitle);
    });
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header 
        tasksCounter={tasks.length} 
        tasksDoneCounter={(tasks.filter(task => task.done).length)} 
      />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})