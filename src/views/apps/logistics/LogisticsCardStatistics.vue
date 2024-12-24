<script setup>
import { formatCurrency } from '@/utils/currencyFormatter';
import { ref, watch } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true, 
  }
})

const logisticData = ref([])

const updateLogisticData = (data) => {
  logisticData.value = [
    {
      icon: 'tabler-users-group',
      color: 'primary',
      title: 'Total de leads',
      value: data.total_leads || 0,
      isHover: false,
    },
    {
      icon: 'tabler-exchange ',
      color: 'primary',
      title: 'Total de prospectos',
      value: data.total_prospect || 0,
      isHover: false,
    },
    {
      icon: 'tabler-coins',
      color: 'primary',
      title: 'Total de ventas',
      value: data.total_sales || 0,
      amount: formatCurrency(data.total_amount_sale || 0),
      isHover: false, 
    },
    {
      icon: 'tabler-clock-record',
      color: 'primary',
      title: 'Promedio de cierre',
      value: `${data.average_closure_time || 0} dias`,
      isHover: false,
    },
  ]
}

updateLogisticData(props.data)

watch(() => props.data, (newData) => {
  updateLogisticData(newData)
})
</script>

<template>
  <VRow class="match-height match-height-cards">
    <VCol
      v-for="(data, index) in logisticData"
      :key="index"
      cols="12"
      md="3"
      sm="6"
    >
      <div>
        <AppCardActions
          class="logistics-card-statistics cursor-pointer"
          :style="data.isHover ? { 'border-block-end': `2px solid rgba(var(--v-theme-${data.color}))` } : { 'border-block-end': `2px solid rgba(var(--v-theme-${data.color}), var(--v-disabled-opacity))` }"
          @mouseenter="data.isHover = true"
          @mouseleave="data.isHover = false"
          v-model:loading="props.isLoading"
          noActions
        >
          <VCardText>
            <div class="d-flex align-center gap-x-4 mb-2">
              <VAvatar
                variant="tonal"
                :color="data.color"
                rounded
              >
                <VIcon
                  :icon="data.icon"
                  size="28"
                />
              </VAvatar>
              <div class="gap-y-2">
                <h5 class="text-h5 font-weight-medium">
                {{ data.value }}
              </h5>
              <div class="v-list-item-subtitle">
                {{ data.amount }}
              </div>
              </div>
            </div>
            <div class="text-body-1">
              {{ data.title }}
            </div>
            <div class="d-flex gap-x-2" v-if="data.change">
              <h6 class="text-h6 font-weight-medium">
                {{ (data.change > 0) ? '+' : '' }} {{ data.change }}%
              </h6>
            </div>
          </VCardText>
        </AppCardActions>
      </div>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
@use "@core/scss/base/mixins" as mixins;

.logistics-card-statistics:hover {
  @include mixins.elevation(12);

  transition: all 0.1s ease-out;
}
.match-height-cards > div > div, .match-height-cards > div > div > div{
  height: 100% !important;
}
</style>
