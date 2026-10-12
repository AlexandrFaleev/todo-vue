<script setup>
import {TodoItem} from '../TodoItem';
import { useTodoContext } from '@/widgets/Todo/todoContext'

const {
  tasks,
  stats,
  isLoading,
  error,
} = useTodoContext()
</script>

<template>
  <ul class="todo__list" v-if="stats.total > 0">
      <TodoItem
          v-for="task in tasks"
          :task="task"
      />
  </ul>
  <div class="todo__empty" v-else-if="error">
    Задачи не найдены =(
  </div>
  <div v-if="isLoading" class="loader"></div>
  <div class="todo__empty" v-else-if="stats.total === 0 && !error">
      У вас пока нет задач
  </div>
  <div class="todo__empty" v-else-if="stats.total > 0 && tasks.length === 0 && !error">
      Задача не найдена
  </div>
</template>