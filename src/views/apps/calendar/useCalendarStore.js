import { $api } from "@/utils/api";

export const useCalendarStore = defineStore('calendar', {
  // arrow function recommended for full type inference
  state: () => ({
    availableCalendars: [
      {
        color: 'info',
        value: 1,
        label: 'Visita',
      },
      {
        color: 'success',
        value: 2,
        label: 'Llamada',
      },
      {
        color: 'secondary',
        value: 3,
        label: 'Cotización',
      },
      {
        color: 'warning',
        value: 4,
        label: 'Otro',
      },
    ],
    selectedCalendars: [1, 2, 3, 4],
  }),
  actions: {
    async fetchEvents(asesorid) {
      const fechaActual = new Date();

      const fechaInicio = new Date(fechaActual);
      fechaInicio.setMonth(fechaActual.getMonth() - 6);

      const fechaFin = new Date(fechaActual);
      fechaFin.setMonth(fechaActual.getMonth() + 6);

      const { data, error } = await $api(`/activity/asesor/${asesorid}/fecha-rango`, {
        method: 'GET',
        params: {
          fecha_inicio: fechaInicio.toISOString().split('T')[0],
          fecha_fin: fechaFin.toISOString().split('T')[0],
        },
      })

      if (error) return error

      const filteredActivities = data.filter(activity =>
        this.selectedCalendars.includes(activity.type_activity_id)
      );

      return filteredActivities
    },
    async addEvent(activity) {
      const { data, error } = await $api('/activity', {
        method: 'POST',
        body: activity,
      })

      if (error) return error

      return data
    },
    async updateEvent(activity) {
      console.log("updateEvent", activity)
      return await $api(`/activity/${activity.id}`, {
        method: 'PATCH',
        body: activity,
      })
    },
    async removeEvent(activityId) {
      return await $api(`/activity/${activityId}/discard`, {
        method: 'PATCH',
      })
    },
    async changeStatusEvent(activity) {
      return await $api(`/activity/${activity.id}/change_status_activity`, {
        method: 'PATCH',
        body: activity,
      })
    },
  },
})
