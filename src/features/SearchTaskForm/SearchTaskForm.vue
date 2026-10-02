<script setup>
defineProps({
    class: {
        type: String,
        required: false,
        default: ''
    }
})
const model = defineModel({type: String, default: ''})
import {Field} from '@/shared/components';
</script>

<template>
    <form :class="class">
        <Field
            id="search-task"
            title="Поиск задачи"
            type="search"
            v-model="model"
        />
    </form>
</template>