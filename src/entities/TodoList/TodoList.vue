<script setup>
import {TodoItem} from '../TodoItem';
import { useTodoContext } from '@/widgets/Todo/todoContext'

const {
    tasks,
    stats
} = useTodoContext()
</script>

<template>
    <ul class="todo__list" v-if="stats.total > 0">
        <TodoItem
            v-for="task in tasks"
            :task="task"
        />
    </ul>
    <div class="todo__empty" v-if="stats.total === 0">
        У вас пока нет задач
    </div>
    <div class="todo__empty" v-if="stats.total > 0 && tasks.length === 0">
        Задача не найдена
    </div>
</template>