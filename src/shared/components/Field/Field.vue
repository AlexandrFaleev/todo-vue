<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: 'text'
  },
  title: {
    type: String,
    required: true,
  },
})
const model = defineModel({type: String, default: ''})

import styles from './Field.module.scss'
</script>

<template>
  <div :class="styles.field">
    <label
      :for="id"
      :class="styles.field__label"
    >
     {{ title }}
    </label>
    <input
      :id="id"
      :type="type"
      :class="styles.field__input"
      v-model="model"
      placeholder=" "
      autocomplete="off"
    />
  </div>
</template>