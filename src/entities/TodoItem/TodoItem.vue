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
  deleteTaskItem,
  toggleTask
} = useTodoContext()
</script>

<template>
    <li class="todo__item todo-item">
        <input
            :id="task.id"
            class="todo-item__checkbox"
            type="checkbox"
            :checked="task.completed"
            @change="toggleTask(task.id, task.completed)"
        />
        <label :for="task.id" class="todo-item__title">{{ task.title }}</label>
        <button type="button" class="todo-item__button" @click="deleteTaskItem(task.id)">
            <CrossIcon />
        </button>
    </li>
</template>