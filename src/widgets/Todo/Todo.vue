<script setup>
import { AddTaskForm, SearchTaskForm, TodoInfo } from '@/features';
import { TodoList } from '@/entities';
import { useTodos } from '@/shared/hooks/useTodos';
import './Todo.scss';

const {
tasks,
filteredTasks,
newTaskTitle,
search,
stats,
addTask,
deleteTask,
toggleTask,
deleteAll
} = useTodos()

</script>

<template>
  <div class="todo">
    <h1 class="todo__title">To Do List</h1>
    <AddTaskForm class="todo__form" v-model="newTaskTitle" @addTask="addTask"/>
    <SearchTaskForm class="todo__form" v-model="search" />
    <TodoInfo
      :stats="stats"
      @deleteAll="deleteAll"
    />
    <TodoList
      :tasks="filteredTasks ?? tasks"
      :stats="stats"
      @deleteTask="deleteTask"
      @toggleTask="toggleTask"
    />
  </div>
</template>