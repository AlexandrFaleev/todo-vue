<script setup>
import { provide, computed } from 'vue'
import { useTodos } from '@/shared/hooks/useTodos';
import { TODO_CONTEXT } from './todoContext'
import { AddTaskForm, SearchTaskForm, TodoInfo } from '@/features';
import { TodoList } from '@/entities';
import './Todo.scss';

const {
  tasks,
  filteredTasks,
  newTaskTitle,
  search,
  stats,
  isLoading,
  error,
  loadTodos,
  createTask,
  deleteTaskItem,
  toggleTask,
  deleteAllTasks
} = useTodos()

loadTodos()
const visibleTasks = computed(() => filteredTasks.value ?? tasks.value)

provide(TODO_CONTEXT, {
  tasks: visibleTasks,
  stats,
  isLoading,
  error,
  deleteTaskItem,
  toggleTask,
  deleteAllTasks
})

</script>

<template>
  <div class="todo">
    <h1 class="todo__title">To Do List</h1>
    <AddTaskForm class="todo__form" v-model="newTaskTitle" @addTask="createTask"/>
    <SearchTaskForm class="todo__form" v-model="search" />
    <TodoInfo />
    <TodoList />
  </div>
</template>