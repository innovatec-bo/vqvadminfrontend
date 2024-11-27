<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import BitacoraCustomer from './BitacoraCustomer.vue'

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },

  customer: { type: String, required: true },
})

const emit = defineEmits([
  'update:isDrawerOpen',
])

const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
 
}

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="500"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <BitacoraCustomer :customer="customer" />
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
