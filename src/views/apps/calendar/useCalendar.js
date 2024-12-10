import { useCalendarStore } from '@/views/apps/calendar/useCalendarStore'
import { useConfigStore } from '@core/stores/config'
import esLocale from "@fullcalendar/core/locales/es"
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'

export const blankEvent = {
  title: '',
  start: '',
  end: '',
  allDay: false,
  url: '',
  extendedProps: {
    /*
          ℹ️ We have to use undefined here because if we have blank string as value then select placeholder will be active (moved to top).
          Hence, we need to set it to undefined or null
        */
    calendar: undefined,
    guests: [],
    location: '',
    description: '',
    customer: {
      customerId: null,
      customerName: ''
    },
  },
}

export const useCalendar = (event, isEventHandlerSidebarActive, isLeftSidebarOpen, isLoading) => {
  const configStore = useConfigStore()

  // 👉 Store
  const store = useCalendarStore()

  // 👉 Calendar template ref
  const refCalendar = ref()


  const userId = useCookie('userData').value.id

  // 👉 Calendar colors
  const calendarsColor = {
    1: 'info',
    2: 'success',
    3: 'secondary',
    4: 'warning',
  }


  // ℹ️ Extract event data from event API
  const extractEventDataFromEventApi = eventApi => {
    const { id, title, start, end, url, extendedProps: { calendar, guests, location, description, customer: { customerId, customerName } }, allDay } = eventApi
    
    return {
      id,
      title,
      start,
      end,
      url,
      extendedProps: {
        calendar,
        guests,
        location,
        description,
        customer: {
          customerId,
          customerName
        }
      },
      allDay,
    }
  }

  
  if (typeof process !== 'undefined' && process.server)
    store.fetchEvents()


  // 👉 Fetch events
  const fetchEvents = (info, successCallback) => {
    isLoading.value = true
    // If there's no info => Don't make useless API call
    if (!info)
      return
    store.fetchEvents(userId)
      .then(r => {
        successCallback(r.map(e => ({
          ...e,
          title: e.title,
          start: e.scheduled_at,
          end: e.scheduled_at,
          extendedProps: {
            activityId: e.id,
            calendar: e.type_activity_id,
            description: e.description,
            customer: {
              customerId: e.opportunity_id,
              customerName: e.name_opportunity
            }
          }
        })))
      })
      .catch(e => {
        showWarningToast('Se produjo un error al obtener los eventos del calendario')
      }).finally(() => {
        isLoading.value = false
      })
  }


  // 👉 Calendar API
  const calendarApi = ref(null)


  // 👉 Update event in calendar [UI]
  const updateEventInCalendar = (updatedEventData, propsToUpdate, extendedPropsToUpdate) => {
    const existingEvent = calendarApi.value?.getEventById(String(updatedEventData.id))
    if (!existingEvent) {
      console.warn('Can\'t found event in calendar to update')
      
      return
    }

    // ---Set event properties except date related
    // Docs: https://fullcalendar.io/docs/Event-setProp
    // dateRelatedProps => ['start', 'end', 'allDay']
    for (let index = 0; index < propsToUpdate.length; index++) {
      const propName = propsToUpdate[index]

      existingEvent.setProp(propName, updatedEventData[propName])
    }

    // --- Set date related props
    // ? Docs: https://fullcalendar.io/docs/Event-setDates
    existingEvent.setDates(updatedEventData.start, updatedEventData.end, { allDay: updatedEventData.allDay })

    // --- Set event's extendedProps
    // ? Docs: https://fullcalendar.io/docs/Event-setExtendedProp
    for (let index = 0; index < extendedPropsToUpdate.length; index++) {
      const propName = extendedPropsToUpdate[index]

      existingEvent.setExtendedProp(propName, updatedEventData.extendedProps[propName])
    }
  }


  // 👉 Remove event in calendar [UI]
  const removeEventInCalendar = eventId => {
    const _event = calendarApi.value?.getEventById(eventId)
    if (_event)
      _event.remove()
  }


  // 👉 refetch events
  const refetchEvents = () => {
    calendarApi.value?.refetchEvents()
  }

  watch(() => store.selectedCalendars, refetchEvents)


  // 👉 Add event
  const addEvent = _event => {
    isLoading.value = true
    const data = {
      title: _event.title,
      description: _event.extendedProps.description,
      type_activity_id: _event.extendedProps.calendar,
      opportunity_id: _event.extendedProps.customer.customerId,
      assigned_to: userId,
      scheduled_at: _event.start
    }

    store.addEvent(data)
      .then((response) => {
        showSuccessToast('Actividad creada correctamente', response?.data?.message)
        refetchEvents()
      }).catch((e) => {
        showWarningToast('Error al crear una nueva actividad')
      }).finally(() => {
        isLoading.value = false
      })
  }


  // 👉 Update event
  const updateEvent = _event => {
    const data = {
      id: _event.id,
      title: _event.title,
      description: _event.extendedProps.description,
      type_activity: _event.extendedProps.calendar,
      opportunity_id: _event.extendedProps.customer.customerId,
      name_opportunity: _event.extendedProps.customer.customerName,
      scheduled_at: _event.start,
    }

    store.updateEvent(data)
      .then(r => {
        const propsToUpdate = ['id', 'title', 'start', 'customer']
        const extendedPropsToUpdate = ['calendar', 'description']
        updateEventInCalendar(r, propsToUpdate, extendedPropsToUpdate)
      })
    refetchEvents()
  }


  // 👉 Remove event
  const removeEvent = eventId => {
    store.changeStatusEvent(eventId).then(() => {
      removeEventInCalendar(eventId)
    })
  }


  // 👉 Completed event
  const completedEvent = eventId => {
    isLoading.value = true
    store.changeStatusEvent({id: eventId, state_activity: "COMPLETED"}).then((response) => {
      showSuccessToast('Actividad finalizada correctamente', response?.data?.message)
      removeEventInCalendar(eventId)
    }).catch((e) => {
      showWarningToast('Error al intentar finalizar la actividad')
    }).finally(() => {
      isLoading.value = false
    })
  }


  // 👉 Cancelled event
  const cancelledEvent = eventId => {
    isLoading.value = true
    store.changeStatusEvent({id: eventId, state_activity: "CANCELLED"}).then((response) => {
      showSuccessToast('Actividad cancelada correctamente', response?.data?.message)
      removeEventInCalendar(eventId)
    }).catch((e) => {
      showWarningToast('Error al intentar cancelar la actividad')
    }).finally(() => {
      isLoading.value = false
    })
  }


  // 👉 Calendar options
  const calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'drawerToggler,prev,next title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
    },
    events: fetchEvents,

    locale: esLocale,

    // ❗ We need this to be true because when its false and event is allDay event and end date is same as start data then Full calendar will set end to null
    forceEventDuration: true,

    /*
        Enable dragging and resizing event
        Docs: https://fullcalendar.io/docs/editable
      */
    editable: true,

    /*
        Enable resizing event from start
        Docs: https://fullcalendar.io/docs/eventResizableFromStart
      */
    eventResizableFromStart: true,

    /*
        Automatically scroll the scroll-containers during event drag-and-drop and date selecting
        Docs: https://fullcalendar.io/docs/dragScroll
      */
    dragScroll: true,

    /*
        Max number of events within a given day
        Docs: https://fullcalendar.io/docs/dayMaxEvents
      */
    dayMaxEvents: 2,

    /*
        Determines if day names and week names are clickable
        Docs: https://fullcalendar.io/docs/navLinks
      */
    navLinks: true,
    eventClassNames({ event: calendarEvent }) {
      const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]
      
      return [
        // Background Color
        `bg-light-${colorName} text-${colorName}`,
      ]
    },
    eventClick({ event: clickedEvent }) {
      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
      event.value = extractEventDataFromEventApi(clickedEvent)
      isEventHandlerSidebarActive.value = true
    },

    // customButtons
    dateClick(info) {
      event.value = { ...event.value, start: info.date }
      isEventHandlerSidebarActive.value = true
    },

    /*
          Handle event drop (Also include dragged event)
          Docs: https://fullcalendar.io/docs/eventDrop
          We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
        */
    eventDrop({ event: droppedEvent }) {
      updateEvent(extractEventDataFromEventApi(droppedEvent))
    },

    /*
          Handle event resize
          Docs: https://fullcalendar.io/docs/eventResize
        */
    eventResize({ event: resizedEvent }) {
      if (resizedEvent.start && resizedEvent.end)
        updateEvent(extractEventDataFromEventApi(resizedEvent))
    },
    customButtons: {
      drawerToggler: {
        text: 'calendarDrawerToggler',
        click() {
          isLeftSidebarOpen.value = true
        },
      },
    },
  }


  // 👉 onMounted
  onMounted(() => {
    calendarApi.value = refCalendar.value.getApi()
  })


  // 👉 Jump to date on sidebar(inline) calendar change
  const jumpToDate = currentDate => {
    calendarApi.value?.gotoDate(new Date(currentDate))
  }

  watch(() => configStore.isAppRTL, val => {
    calendarApi.value?.setOption('direction', val ? 'rtl' : 'ltr')
  }, { immediate: true })
  
  return {
    refCalendar,
    calendarOptions,
    refetchEvents,
    fetchEvents,
    addEvent,
    updateEvent,
    removeEvent,
    completedEvent,
    cancelledEvent,
    jumpToDate,
  }
}
