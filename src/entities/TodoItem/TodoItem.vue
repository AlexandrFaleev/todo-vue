<script setup>
defineProps({
    task: {
        type: Object,
        required: true
    }
})
defineEmits(['deleteTask', 'toggleTask'])
import CrossIcon from '@/shared/assets/icons/CrossIcon.vue';
</script>

<template>
    <li class="todo__item todo-item">
        <input
            :id="task.id"
            class="todo-item__checkbox"
            type="checkbox"
            :checked="task.isDone"
            @change="$emit('toggleTask', task.id)"
        />
        <label :for="task.id" class="todo-item__title">{{ task.title }}</label>
        <button type="button" class="todo-item__button" @click="$emit('deleteTask', task.id)">
            <CrossIcon />
        </button>
    </li>
</template>