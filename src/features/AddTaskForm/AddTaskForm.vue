<script setup>
defineProps({
    class: {
        type: String,
        required: false,
        default: ''
    }
})
const emit = defineEmits(['addTask'])
import {Field} from '@/shared/components';
import {Button} from '@/shared/components';
const model = defineModel({type: String, default: ''})
</script>

<template>
    <form :class="class" @submit.prevent="$emit('addTask')">
        <Field
            id="new-task-name"
            title="Название задачи"
            v-model="model"
        />
        <Button 
            text="Добавить"
            className="todo__add-btn"
            type="submit"
        />
    </form>
</template>