<script setup>
defineProps({
    tasks: {
        type: Array,
        required: false
    },
    stats: {
        type: Object,
        required: true
    }
})
defineEmits(['deleteTask', 'toggleTask'])
import TodoItem from '../TodoItem/TodoItem.vue';
</script>

<template>
    <ul class="todo__list" v-if="stats.total > 0">
        <TodoItem
            v-for="task in tasks"
            :task="task"
            @deleteTask="$emit('deleteTask', $event)"
            @toggleTask="$emit('toggleTask', $event)"
        />
    </ul>
    <div class="todo__empty" v-if="stats.total === 0">
        У вас пока нет задач
    </div>
    <div class="todo__empty" v-if="stats.total > 0 && tasks.length === 0">
        Задача не найдена
    </div>
</template>