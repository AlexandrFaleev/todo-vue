<script setup>
defineProps({
    stats: {
        type: Object,
        required: true
    }
})
defineEmits('deleteAll')
</script>

<template>
    <div class="todo__info">
        <div class="todo__counter">
            Выполнено {{stats.done}} из {{stats.total}}
        </div>
        <button type="button" class="todo__delete-all" v-if="stats.total > 0" @click="$emit('deleteAll')">
            Удалить все
        </button>
    </div>
</template>