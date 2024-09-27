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
    title: 'Panel Asesor',
    icon: { icon: 'tabler-smart-home' },
    to: 'activity-list',
    subject: 'ASESOR',

  },
  {
    title: 'Oportunidades',
    icon: { icon: 'tabler-smart-home' },
    to: 'opportunities-my-contacts',
    subject: ['ASESOR', 'ADMINISTRADOR'],

  },
]
