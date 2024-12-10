export default [
  {
    title: 'Panel',
    icon: { icon: 'tabler-smart-home' },
    to: 'dashboards-analytics',
    badgeContent: '3',
    badgeClass: 'bg-global-primary',
    subject: 'ADMINISTRADOR',
  },
  {
    title: 'Lista de Actividades',
    icon: { icon: 'tabler-menu' },
    to: 'activity-list',
    subject: 'ASESOR',
  },
  {
    title: 'Kanban',
    icon: { icon: 'tabler-smart-home' },
    to: 'opportunities-my-contacts',
    subject: ['ASESOR', 'ADMINISTRADOR'],
  },
  {
    title: 'Calendario',
    icon: { icon: 'tabler-calendar-event' },
    to: 'activity-calendar',
    subject: ['ASESOR'],
  },
  {
    title: 'Bitacora',
    icon: { icon: 'tabler-smart-home' },
    to: 'system-log-list',
    subject: ['ADMINISTRADOR'],

  },
]
