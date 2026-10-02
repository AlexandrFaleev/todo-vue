<script setup>
import CrossIcon from '@/shared/assets/icons/CrossIcon.vue';
import { useTodoContext } from '@/widgets/Todo/todoContext'
defineProps({
    task: {
        type: Object,
        required: true
    }
})
const {
    deleteTask,
    toggleTask
} = useTodoContext()
</script>

<template>
    <li class="todo__item todo-item">
        <input
            :id="task.id"
            class="todo-item__checkbox"
            type="checkbox"
            :checked="task.isDone"
            @change="toggleTask(task.id)"
        />
        <label :for="task.id" class="todo-item__title">{{ task.title }}</label>
        <button type="button" class="todo-item__button" @click="deleteTask(task.id)">
            <CrossIcon />
        </button>
    </li>
</template>