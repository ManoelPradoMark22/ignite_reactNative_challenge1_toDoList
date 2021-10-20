import React from 'react';
import { FlatList, View, StyleSheet, Dimensions, Image } from 'react-native';

import { ItemWrapper } from './ItemWrapper';

import { TaskItem } from './TaskItem';

import { EditTaskProps } from '../pages/Home';

import emptyImage from '../assets/illustrations/emptyBox.png';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (({ taskId, taskNewTitle } : EditTaskProps) => void);
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTask } : TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={<View style={styles.footerFlatList}/>}
      ListEmptyComponent={<View style={styles.imgEmpty}>
        <Image source={emptyImage}/>
      </View>}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem
              tasks={tasks}
              item={item}
              index={index}
              toggleTaskDone={toggleTaskDone}
              removeTask={removeTask}
              editTask={editTask}
            />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}

const styles = StyleSheet.create({
  footerFlatList: {
    height: Dimensions.get('screen').height ? Dimensions.get('screen').height/2 : 500,
  },
  imgEmpty: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})