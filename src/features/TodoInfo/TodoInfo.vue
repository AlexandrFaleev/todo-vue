<script setup>
import { useTodoContext } from '@/widgets/Todo/todoContext'

const { stats, deleteAllTasks } = useTodoContext()
</script>

<template>
    <div class="todo__info">
        <div class="todo__counter">
            Выполнено {{stats.done}} из {{stats.total}}
        </div>
        <button type="button" class="todo__delete-all" v-if="stats.total > 0" @click="deleteAllTasks">
            Удалить все
        </button>
    </div>
</template>