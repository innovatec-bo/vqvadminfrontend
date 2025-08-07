import{V as T}from"./VTooltip-61bb994b.js";import{o as v,f as O,e,b as t,a4 as l,cp as c,cq as d,s as M,v as i,d as p,r as L,a as y,n as b,ah as k,a0 as h,c as f,F as C,i as D,x as P}from"./index-39962cd3.js";import{V as m,a as S}from"./VList-8805b827.js";import{V as u}from"./VMenu-6091985f.js";import{V as I,c as A}from"./VCard-bc138e33.js";import{V as $}from"./VDivider-a60e04be.js";import{V as j}from"./VCardText-0bdd888d.js";import{_ as F}from"./AppCardCode-c9f0f56f.js";import{V as E}from"./VRow-87407b7b.js";import{V as _}from"./VCol-82cb3abe.js";import"./VOverlay-e29f993c.js";import"./easing-9f15041e.js";import"./lazy-9db2c83f.js";import"./scopeId-518eb095.js";import"./VImg-e16123bf.js";import"./forwardRefs-8348545e.js";import"./ssrBoot-5a34f763.js";import"./VAvatar-011f68bf.js";import"./dialog-transition-a4fdd50f.js";import"./constants-0978c720.js";const R={__name:"DemoMenuActivatorAndTooltip",setup(V){const a=[{title:"Option 1",value:"Option 1"},{title:"Option 2",value:"Option 2"},{title:"Option 3",value:"Option 3"}];return(s,o)=>(v(),O(u,{location:"top"},{activator:e(({props:n})=>[t(T,{location:"top"},{activator:e(({props:r})=>[t(l,c(d(M(n,r))),{default:e(()=>o[0]||(o[0]=[i(" Dropdown w/ Tooltip ",-1)])),_:2,__:[0]},1040)]),default:e(()=>[o[1]||(o[1]=p("span",null,"I am a Tooltip",-1))]),_:2,__:[1]},1024)]),default:e(()=>[t(m,{items:a})]),_:1}))}},G={__name:"DemoMenuPopover",setup(V){const a=L(!1);return(s,o)=>{const n=y("IconBtn");return v(),O(u,{modelValue:b(a),"onUpdate:modelValue":o[0]||(o[0]=r=>h(a)?a.value=r:null),location:"top"},{activator:e(({props:r})=>[t(l,c(d(r)),{default:e(()=>o[1]||(o[1]=[i(" Menu as Popover ",-1)])),_:2,__:[1]},1040)]),default:e(()=>[t(I,{"max-width":"300"},{default:e(()=>[t(m,null,{default:e(()=>[t(S,{"prepend-avatar":b(k),title:"John Leider",subtitle:"Founder of Vuetify",class:"mx-0"},null,8,["prepend-avatar"])]),_:1}),t($),t(j,null,{default:e(()=>o[2]||(o[2]=[i(" Gingerbread bear claw cake. Soufflé candy sesame snaps chocolate ice cream cake. Dessert candy canes oat cake pudding cupcake. Bear claw sweet wafer bonbon dragée toffee. ",-1)])),_:1,__:[2]}),t(A,null,{default:e(()=>[t(n,{icon:"tabler-heart"}),t(n,{icon:"tabler-bookmark"}),t(n,{icon:"tabler-thumb-down"})]),_:1})]),_:1})]),_:1},8,["modelValue"])}}},H={__name:"DemoMenuOpenOnHover",setup(V){const a=[{title:"Option 1",value:"Option 1"},{title:"Option 2",value:"Option 2"},{title:"Option 3",value:"Option 3"}];return(s,o)=>(v(),O(u,{"open-on-hover":""},{activator:e(({props:n})=>[t(l,c(d(n)),{default:e(()=>o[0]||(o[0]=[i(" On hover ",-1)])),_:2,__:[0]},1040)]),default:e(()=>[t(m,{items:a})]),_:1}))}},J={class:"demo-space-x"},N={__name:"DemoMenuLocation",setup(V){const a=[{title:"Option 1",value:"Option 1"},{title:"Option 2",value:"Option 2"},{title:"Option 3",value:"Option 3"}];return(s,o)=>(v(),f("div",J,[t(u,{location:"top"},{activator:e(({props:n})=>[t(l,c(d(n)),{default:e(()=>o[0]||(o[0]=[i(" Top ",-1)])),_:2,__:[0]},1040)]),default:e(()=>[t(m,{items:a})]),_:1}),t(u,{location:"bottom"},{activator:e(({props:n})=>[t(l,c(d(n)),{default:e(()=>o[1]||(o[1]=[i(" Bottom ",-1)])),_:2,__:[1]},1040)]),default:e(()=>[t(m,{items:a})]),_:1}),t(u,{location:"start"},{activator:e(({props:n})=>[t(l,c(d(n)),{default:e(()=>o[2]||(o[2]=[i(" Start ",-1)])),_:2,__:[2]},1040)]),default:e(()=>[t(m,{items:a})]),_:1}),t(u,{location:"end"},{activator:e(({props:n})=>[t(l,c(d(n)),{default:e(()=>o[3]||(o[3]=[i(" End ",-1)])),_:2,__:[3]},1040)]),default:e(()=>[t(m,{items:a})]),_:1})]))}},X={class:"demo-space-x"},Y={__name:"DemoMenuCustomTransitions",setup(V){const a=[{title:"Option 1",value:"Option 1"},{title:"Option 2",value:"Option 2"},{title:"Option 3",value:"Option 3"}];return(s,o)=>(v(),f("div",X,[t(u,{transition:"scale-transition"},{activator:e(({props:n})=>[t(l,c(d(n)),{default:e(()=>o[0]||(o[0]=[i(" Scale Transition ",-1)])),_:2,__:[0]},1040)]),default:e(()=>[t(m,{items:a})]),_:1}),t(u,{transition:"slide-x-transition"},{activator:e(({props:n})=>[t(l,c(d(n)),{default:e(()=>o[1]||(o[1]=[i(" Slide X Transition ",-1)])),_:2,__:[1]},1040)]),default:e(()=>[t(m,{items:a})]),_:1}),t(u,{transition:"slide-y-transition"},{activator:e(({props:n})=>[t(l,c(d(n)),{default:e(()=>o[2]||(o[2]=[i(" Slide Y Transition ",-1)])),_:2,__:[2]},1040)]),default:e(()=>[t(m,{items:a})]),_:1})]))}},U={class:"demo-space-x"},q={__name:"DemoMenuBasic",setup(V){const a=["primary","secondary","success","info","warning","error"],s=[{title:"Option 1",value:"Option 1"},{title:"Option 2",value:"Option 2"},{title:"Option 3",value:"Option 3"}];return(o,n)=>(v(),f("div",U,[(v(),f(C,null,D(a,r=>t(u,{key:r},{activator:e(({props:B})=>[t(l,M({color:r},{ref_for:!0},B),{default:e(()=>[i(P(r),1)]),_:2},1040,["color"])]),default:e(()=>[t(m,{items:s})]),_:2},1024)),64))]))}},z={ts:`<script lang="ts" setup>
import { mergeProps } from 'vue'

const items = [{ title: 'Option 1', value: 'Option 1' }, { title: 'Option 2', value: 'Option 2' }, { title: 'Option 3', value: 'Option 3' }]
<\/script>

<template>
  <VMenu location="top">
    <template #activator="{ props: menuProps }">
      <VTooltip location="top">
        <template #activator="{ props: tooltipProps }">
          <VBtn v-bind="mergeProps(menuProps, tooltipProps)">
            Dropdown w/ Tooltip
          </VBtn>
        </template>
        <span>I am a Tooltip</span>
      </VTooltip>
    </template>

    <VList :items="items" />
  </VMenu>
</template>
`,js:`<script setup>
import { mergeProps } from 'vue'

const items = [
  {
    title: 'Option 1',
    value: 'Option 1',
  },
  {
    title: 'Option 2',
    value: 'Option 2',
  },
  {
    title: 'Option 3',
    value: 'Option 3',
  },
]
<\/script>

<template>
  <VMenu location="top">
    <template #activator="{ props: menuProps }">
      <VTooltip location="top">
        <template #activator="{ props: tooltipProps }">
          <VBtn v-bind="mergeProps(menuProps, tooltipProps)">
            Dropdown w/ Tooltip
          </VBtn>
        </template>
        <span>I am a Tooltip</span>
      </VTooltip>
    </template>

    <VList :items="items" />
  </VMenu>
</template>
`},W={ts:`<script lang="ts" setup>
const menusVariant = ['primary', 'secondary', 'success', 'info', 'warning', 'error']
const items = [{ title: 'Option 1', value: 'Option 1' }, { title: 'Option 2', value: 'Option 2' }, { title: 'Option 3', value: 'Option 3' }]
<\/script>

<template>
  <div class="demo-space-x">
    <VMenu
      v-for="menu in menusVariant"
      :key="menu"
    >
      <template #activator="{ props }">
        <VBtn
          :color="menu"
          v-bind="props"
        >
          {{ menu }}
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>
  </div>
</template>
`,js:`<script setup>
const menusVariant = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error',
]

const items = [
  {
    title: 'Option 1',
    value: 'Option 1',
  },
  {
    title: 'Option 2',
    value: 'Option 2',
  },
  {
    title: 'Option 3',
    value: 'Option 3',
  },
]
<\/script>

<template>
  <div class="demo-space-x">
    <VMenu
      v-for="menu in menusVariant"
      :key="menu"
    >
      <template #activator="{ props }">
        <VBtn
          :color="menu"
          v-bind="props"
        >
          {{ menu }}
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>
  </div>
</template>
`},K={ts:`<script lang="ts" setup>
const items = [{ title: 'Option 1', value: 'Option 1' }, { title: 'Option 2', value: 'Option 2' }, { title: 'Option 3', value: 'Option 3' }]
<\/script>

<template>
  <div class="demo-space-x">
    <VMenu transition="scale-transition">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Scale Transition
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu transition="slide-x-transition">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Slide X Transition
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu transition="slide-y-transition">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Slide Y Transition
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>
  </div>
</template>
`,js:`<script setup>
const items = [
  {
    title: 'Option 1',
    value: 'Option 1',
  },
  {
    title: 'Option 2',
    value: 'Option 2',
  },
  {
    title: 'Option 3',
    value: 'Option 3',
  },
]
<\/script>

<template>
  <div class="demo-space-x">
    <VMenu transition="scale-transition">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Scale Transition
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu transition="slide-x-transition">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Slide X Transition
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu transition="slide-y-transition">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Slide Y Transition
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>
  </div>
</template>
`},Q={ts:`<script lang="ts" setup>
const items = [{ title: 'Option 1', value: 'Option 1' }, { title: 'Option 2', value: 'Option 2' }, { title: 'Option 3', value: 'Option 3' }]
<\/script>

<template>
  <div class="demo-space-x">
    <VMenu location="top">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Top
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu location="bottom">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Bottom
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu location="start">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Start
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu location="end">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          End
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>
  </div>
</template>
`,js:`<script setup>
const items = [
  {
    title: 'Option 1',
    value: 'Option 1',
  },
  {
    title: 'Option 2',
    value: 'Option 2',
  },
  {
    title: 'Option 3',
    value: 'Option 3',
  },
]
<\/script>

<template>
  <div class="demo-space-x">
    <VMenu location="top">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Top
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu location="bottom">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Bottom
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu location="start">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          Start
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>

    <VMenu location="end">
      <template #activator="{ props }">
        <VBtn v-bind="props">
          End
        </VBtn>
      </template>

      <VList :items="items" />
    </VMenu>
  </div>
</template>
`},Z={ts:`<script lang="ts" setup>
const items = [{ title: 'Option 1', value: 'Option 1' }, { title: 'Option 2', value: 'Option 2' }, { title: 'Option 3', value: 'Option 3' }]
<\/script>

<template>
  <VMenu open-on-hover>
    <template #activator="{ props }">
      <VBtn v-bind="props">
        On hover
      </VBtn>
    </template>

    <VList :items="items" />
  </VMenu>
</template>
`,js:`<script setup>
const items = [
  {
    title: 'Option 1',
    value: 'Option 1',
  },
  {
    title: 'Option 2',
    value: 'Option 2',
  },
  {
    title: 'Option 3',
    value: 'Option 3',
  },
]
<\/script>

<template>
  <VMenu open-on-hover>
    <template #activator="{ props }">
      <VBtn v-bind="props">
        On hover
      </VBtn>
    </template>

    <VList :items="items" />
  </VMenu>
</template>
`},tt={ts:`<script lang="ts" setup>
import avatar1 from '@images/avatars/avatar-1.png'

const menu = ref(false)
<\/script>

<template>
  <VMenu
    v-model="menu"
    location="top"
  >
    <template #activator="{ props }">
      <VBtn v-bind="props">
        Menu as Popover
      </VBtn>
    </template>

    <VCard max-width="300">
      <VList>
        <VListItem
          :prepend-avatar="avatar1"
          title="John Leider"
          subtitle="Founder of Vuetify"
          class="mx-0"
        />
      </VList>

      <VDivider />

      <VCardText>
        Gingerbread bear claw cake. Soufflé candy sesame snaps chocolate ice cream cake.
        Dessert candy canes oat cake pudding cupcake. Bear claw sweet wafer bonbon dragée toffee.
      </VCardText>

      <VCardActions>
        <IconBtn icon="tabler-heart" />
        <IconBtn icon="tabler-bookmark" />
        <IconBtn icon="tabler-thumb-down" />
      </VCardActions>
    </VCard>
  </VMenu>
</template>
`,js:`<script setup>
import avatar1 from '@images/avatars/avatar-1.png'

const menu = ref(false)
<\/script>

<template>
  <VMenu
    v-model="menu"
    location="top"
  >
    <template #activator="{ props }">
      <VBtn v-bind="props">
        Menu as Popover
      </VBtn>
    </template>

    <VCard max-width="300">
      <VList>
        <VListItem
          :prepend-avatar="avatar1"
          title="John Leider"
          subtitle="Founder of Vuetify"
          class="mx-0"
        />
      </VList>

      <VDivider />

      <VCardText>
        Gingerbread bear claw cake. Soufflé candy sesame snaps chocolate ice cream cake.
        Dessert candy canes oat cake pudding cupcake. Bear claw sweet wafer bonbon dragée toffee.
      </VCardText>

      <VCardActions>
        <IconBtn icon="tabler-heart" />
        <IconBtn icon="tabler-bookmark" />
        <IconBtn icon="tabler-thumb-down" />
      </VCardActions>
    </VCard>
  </VMenu>
</template>
`},Mt={__name:"menu",setup(V){return(a,s)=>{const o=q,n=F,r=Y,B=N,w=H,g=G,x=R;return v(),O(E,{class:"match-height"},{default:e(()=>[t(_,{cols:"12",md:"6"},{default:e(()=>[t(n,{title:"Basic",code:W},{default:e(()=>[s[0]||(s[0]=p("p",null," Remember to put the element that activates the menu in the activator slot. ",-1)),t(o)]),_:1,__:[0]},8,["code"])]),_:1}),t(_,{cols:"12",md:"6"},{default:e(()=>[t(n,{title:"Custom transitions",code:K},{default:e(()=>[s[1]||(s[1]=p("p",null,[i("Vuetify comes with 3 standard transitions, "),p("code",null,"scale"),i(", "),p("code",null,"slide-x"),i(" and "),p("code",null,"slide-y"),i(". Use "),p("code",null,"transition"),i(" prop to add transition to a menu.")],-1)),t(r)]),_:1,__:[1]},8,["code"])]),_:1}),t(_,{cols:"12",md:"6"},{default:e(()=>[t(n,{title:"Location",code:Q},{default:e(()=>[s[2]||(s[2]=p("p",null,[i("Menu can be offset relative to the activator by using the "),p("code",null,"location"),i(" prop.")],-1)),t(B)]),_:1,__:[2]},8,["code"])]),_:1}),t(_,{cols:"12",md:"6"},{default:e(()=>[t(n,{title:"Open on hover",code:Z},{default:e(()=>[s[3]||(s[3]=p("p",null,[i("Menus can be accessed using hover instead of clicking with the "),p("code",null,"open-on-hover"),i(" prop.")],-1)),t(w)]),_:1,__:[3]},8,["code"])]),_:1}),t(_,{cols:"12",md:"6"},{default:e(()=>[t(n,{title:"Popover",code:tt},{default:e(()=>[s[4]||(s[4]=p("p",null,"A menu can be configured to be static when opened, allowing it to function as a popover. This can be useful when there are multiple interactive items within the menu contents.",-1)),t(g)]),_:1,__:[4]},8,["code"])]),_:1}),t(_,{cols:"12",md:"6"},{default:e(()=>[t(n,{title:"Activator and tooltip",code:z},{default:e(()=>[s[5]||(s[5]=p("p",null,[i("With the new "),p("code",null,"v-slot"),i(" syntax, nested activators such as those seen with a "),p("code",null,"v-menu"),i(" and "),p("code",null,"v-tooltip"),i(" attached to the same activator button, need a particular setup in order to function correctly")],-1)),t(x)]),_:1,__:[5]},8,["code"])]),_:1})]),_:1})}}};export{Mt as default};
