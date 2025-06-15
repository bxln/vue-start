<template>
  <div class="custom-input">
    <input 
      :value="modelValue"
      @input="updateValue"
      :placeholder="placeholder"
      class="input-field"
    >
    <span class="input-length">{{ modelValue.length }} 字符</span>
  </div>
</template>

<script setup>
// 定义 props
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})

// 定义 emits
const emit = defineEmits(['update:modelValue'])

// 更新值
const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<style scoped>
.custom-input {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}

.input-field {
  flex: 1;
  padding: 8px 12px;
  border: 2px solid #42b883;
  border-radius: 4px;
  font-size: 14px;
}

.input-field:focus {
  outline: none;
  border-color: #369870;
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
}

.input-length {
  font-size: 12px;
  color: #666;
  min-width: 60px;
}
</style>
