export const StagesOpportunity = {
  LEAD: {
    value: 1,
    label: 'LEAD',
  },
  PROSPECT: {
    value: 2,
    label: 'PROSPECTO',
  },
  PRESALE: {
    value: 3,
    label: 'PRE-VENTA',
  },
  SALE: {
    value: 4,
    label: 'VENTA',
  },
  DELIVERY: {
    value: 5,
    label: 'ENTREGA',
  },
  LOSS: {
    value: 6,
    label: 'PERDIDA',
  },
  FINISHED: {
    value: 7,
    label: 'COMPLETADA',
  },
}
export const getStageValue = stage => {
  return StagesOpportunity[stage]?.value ?? null
}
  
export const movementRules = {
  [StagesOpportunity.LEAD.label]: [StagesOpportunity.PROSPECT.label, StagesOpportunity.PRESALE.label],
  [StagesOpportunity.PROSPECT.label]: [StagesOpportunity.PRESALE.label],
  [StagesOpportunity.PRESALE.label]: [StagesOpportunity.SALE.label],
}
  
export const isMovementValid = (fromStage, toStage) => {
  return movementRules[fromStage]?.includes(toStage)
}
  