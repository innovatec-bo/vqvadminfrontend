import { useAbility } from '@casl/vue'

/**
 * Returns ability result if ACL is configured or else just return true
 * We should allow passing string | undefined to can because for admin ability we omit defining action & subject
 *
 * Useful if you don't know if ACL is configured or not
 * Used in @core files to handle absence of ACL without errors
 *
 * @param {string} action CASL Actions // https://casl.js.org/v4/en/guide/intro#basics
 * @param {string} subject CASL Subject // https://casl.js.org/v4/en/guide/intro#basics
 */
export const can = (action, subject) => {
  const vm = getCurrentInstance()
  const ability = useAbility()

  // Si el sujeto (subject) es un array, verificar si alguno de los roles coincide
  const subjectInRules = Array.isArray(subject)
    ? subject.some(sub => Object.values(ability.rules).some(rule => rule.subject === sub))
    : Object.values(ability.rules).some(rule => rule.subject === subject)

  if (!subjectInRules) {
    return false
  }

  const localCan = vm.proxy && '$can' in vm.proxy
  
  return localCan ? vm.proxy?.$can(action, subject) : true
}



/**
 * Check if user can view item based on it's ability
 * Based on item's action and subject & Hide group if all of it's children are hidden
 * @param {object} item navigation object item
 */
export const canViewNavMenuGroup = item => {
  const hasAnyVisibleChild = item.children.some(i => can(i.action, i.subject))

  // Si el item tiene múltiples sujetos (roles), verifica si al menos uno es válido
  const itemHasValidRole = Array.isArray(item.subject)
    ? item.subject.some(sub => can(item.action, sub))
    : can(item.action, item.subject)

  // Si no se definen action y subject, retorna basado en los hijos visibles
  if (!(item.action && item.subject))
    return hasAnyVisibleChild
  
  return itemHasValidRole && hasAnyVisibleChild
}

export const canNavigate = to => {
  const ability = useAbility()
  
  return to.matched.some(route => ability.can(route.meta.action, route.meta.subject))
}
