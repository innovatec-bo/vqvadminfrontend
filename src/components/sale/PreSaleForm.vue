<script setup>
const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:isDialogVisible'])

const dialogVisibleUpdate = val => {
  emit('update:isDialogVisible', val)
}

const checkboxContent = [
  {
    title: 'Discount',
    subtitle: '20%',
    desc: 'Wow! Get 20% off on your next purchase!',
    value: 'discount',
  },
  {
    title: 'Updates',
    subtitle: 'Free',
    desc: 'Get Updates regarding related products.',
    value: 'updates',
  },
]

const selectedCheckbox = ref(['discount'])
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    max-width="800"
    @update:model-value="dialogVisibleUpdate"
  >
    <!-- 👉 Dialog close btn -->
    <DialogCloseBtn @click="$emit('update:isDialogVisible', false)" />

    <VCard class="share-project-dialog pa-5 pa-sm-8">
      <VCardText>
        <h3 class="text-h3 text-center mb-3">
          Registrar Preventa
        </h3>
        <p class="text-sm-body-1 text-center mb-6">
          Share project with a team members
        </p>
        <VRow>
          <VCol
            cols="12"
            sm="6"
          >
            <AppTextField
              label="Nit"
              placeholder="12345678"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
          >
            <AppTextField
              label="Razon Social"
              placeholder="Canzza SRL"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
          >
            <AppTextField
              label="Precio Final"
              placeholder="100.000"
              type="number"
              prefix="$"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
          >
            <AppTextField
              label="Anticipo (Pagado)"
              placeholder="10.000"
              type="number"
              prefix="$"
            />
          </VCol>
        </VRow>
        <h4 class="text-h5 mb-4 mt-8">
          Para registrar una Venta se tiene que Marcar los Siguientes Procesos : 
        </h4>

        <VList class="card-list">
          <VListItem>
            <CustomCheckboxes
              v-model:selected-checkbox="selectedCheckbox"
              :checkbox-content="checkboxContent"
              :grid-column="{ sm: '6', cols: '12' }"
            />
          </VListItem>
        </VList>

        <div class="d-flex align-center justify-space-between flex-wrap gap-3 mt-6">
          <h6 class="text-h6 font-weight-medium d-flex align-start">
            <VIcon
              icon="tabler-users"
              class="me-2"
              size="20"
            />
            <div>Public to Master - ThemeSelection</div>
          </h6>

          <VBtn class="text-capitalize">
            Registrar Venta
          </VBtn>
        </div>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.share-project-dialog {
  .card-list {
    --v-card-list-gap: 1rem;
  }
}
</style>
