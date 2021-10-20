import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import logoImg from '../assets/images/logo/logo.png';

interface HeaderProps {
  tasksCounter: number;
  tasksDoneCounter: number;
}

export function Header({ tasksCounter, tasksDoneCounter }: HeaderProps) {
  const tasksCounterText = tasksCounter===1 ? 'tarefa' : 'tarefas';
  let tasksDoneCounterText = '';
  
  if (tasksCounter === 1) {
    tasksDoneCounterText = tasksDoneCounter===1 ? 'Concluída' : 'Não concluída';
  } else if(tasksDoneCounter===tasksCounter) {
    if (tasksCounter===0) {
      tasksDoneCounterText = '0 concluídas';
    } else {
      tasksDoneCounterText = 'Todas concluídas';
    }
  } else {
    tasksDoneCounterText = `${tasksDoneCounter} ${tasksDoneCounter===1 ? 'concluída' : 'concluídas'}`
  }
  
  return (
    <View style={styles.container}>
      <Image source={logoImg} />
      
      <View style={styles.boxTaks}>
        <View style={styles.tasks}>
          <Text style={styles.tasksCounter}>Você tem </Text>
          <Text style={styles.tasksCounterBold}>{tasksCounter} {tasksCounterText}</Text>
        </View>
        <View style={styles.tasks}>
          <Text style={styles.tasksDoneCounterBold}>{tasksDoneCounterText}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(true) + 16,
    paddingHorizontal: 24,
    paddingBottom: 60,
    backgroundColor: '#8257E5',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  boxTaks: {
    alignItems: 'flex-end',
    flexDirection: 'column'
  },
  tasks: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  tasksCounter: {
    fontSize: 15,
    color: '#FFF',
    fontFamily: 'Inter-Regular',
  },
  tasksCounterBold: {
    fontSize: 15,
    color: '#FFF',
    fontFamily: 'Inter-Bold',
  },
  tasksDoneCounterBold: {
    fontSize: 14,
    color: '#FFF',
    fontFamily: 'Inter-Bold',
  }
});