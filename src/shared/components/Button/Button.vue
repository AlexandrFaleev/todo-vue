<script setup>
    defineProps({
        text: {
            type: String,
            required: true
        },
        className: {
            type: String,
            required: false,
            default: ''
        },
        type: {
            type: String,
            required: false,
            default: 'button'
        }
    })
    import styles from './Button.module.scss'
</script>

<template>
    <button :class="`${className ? className : ''} ${styles.button}`" :type="type">
        {{ text }}
    </button>
</template>