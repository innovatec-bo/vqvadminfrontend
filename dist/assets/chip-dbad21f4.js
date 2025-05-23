import{V as r}from"./VChip-40043de9.js";import{V as E,a as $,b as W,c as w}from"./VList-4c431b15.js";import{V as L}from"./VListItemAction-df56bf82.js";import{r as d,o as c,f as C,e as t,b as e,cp as A,cq as M,v as l,a4 as J,$ as v,n as p,a0 as z,c as h,ah as T,d as s,ai as j,a7 as N,a5 as B,z as y}from"./index-e0f854fb.js";import{V as U}from"./VMenu-249905aa.js";import{_ as F}from"./AppCombobox-8668484b.js";import{_}from"./_plugin-vue_export-helper-c27b6911.js";import{V as x}from"./VAvatar-b3e45d40.js";import{_ as R}from"./AppCardCode-850538ca.js";import{V as Y}from"./VRow-6bb6adbe.js";import{V as u}from"./VCol-ba474af9.js";import"./ssrBoot-ed486564.js";import"./VImg-06c338d7.js";import"./VDivider-756cacd6.js";import"./VOverlay-f0a4b6b6.js";import"./easing-9f15041e.js";import"./lazy-35f55630.js";import"./scopeId-b072862c.js";import"./forwardRefs-8348545e.js";import"./dialog-transition-98a33614.js";import"./form-e3b9662b.js";import"./VSelect-fa04fc6a.js";import"./VTextField-11682da1.js";/* empty css                   */import"./VCounter-b2b420ec.js";import"./VField-7b8c32e3.js";import"./VInput-93290e0f.js";import"./VCheckboxBtn-42ffa7af.js";import"./VSelectionControl-398f4203.js";import"./filter-7a6e71cd.js";import"./constants-0978c720.js";import"./VCard-18f293ae.js";import"./VCardText-7683b789.js";const O={__name:"DemoChipExpandable",setup(V){const i=d(!1);return(o,m)=>(c(),C(U,{modelValue:p(i),"onUpdate:modelValue":m[1]||(m[1]=n=>z(i)?i.value=n:null),transition:"scale-transition"},{activator:t(({props:n})=>[e(r,A(M(n)),{default:t(()=>m[2]||(m[2]=[l(" VueJS ")])),_:2},1040)]),default:t(()=>[e(E,null,{default:t(()=>[e($,null,{append:t(()=>[e(L,{class:"ms-3"},{default:t(()=>[e(J,{icon:"",variant:"text",size:"x-small",color:"default",onClick:m[0]||(m[0]=n=>i.value=!1)},{default:t(()=>[e(v,{size:"20",icon:"tabler-x"})]),_:1})]),_:1})]),default:t(()=>[e(W,{class:"mb-2"},{default:t(()=>m[3]||(m[3]=[l(" VueJS ")])),_:1}),e(w,null,{default:t(()=>m[4]||(m[4]=[l("The Progressive JavaScript Framework")])),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]))}},q={__name:"DemoChipInSelects",setup(V){const i=d(["Programming","Playing games","Sleeping"]),o=d(["Streaming","Eating","Programming","Playing games","Sleeping"]);return(m,n)=>{const b=F;return c(),C(b,{modelValue:p(i),"onUpdate:modelValue":n[0]||(n[0]=g=>z(i)?i.value=g:null),chips:"",clearable:"",multiple:"","closable-chips":"","clear-icon":"tabler-circle-x",items:p(o),label:"Your favorite hobbies","prepend-icon":"tabler-filter"},null,8,["modelValue","items"])}}},G={},H={class:"demo-space-x"};function K(V,i){return c(),h("div",H,[e(r,{size:"x-small"},{default:t(()=>i[0]||(i[0]=[l(" x-small chip ")])),_:1}),e(r,{size:"small"},{default:t(()=>i[1]||(i[1]=[l(" small chip ")])),_:1}),e(r,{size:"default"},{default:t(()=>i[2]||(i[2]=[l(" Default ")])),_:1}),e(r,{size:"large"},{default:t(()=>i[3]||(i[3]=[l(" large chip ")])),_:1}),e(r,{size:"x-large"},{default:t(()=>i[4]||(i[4]=[l(" x-large chip ")])),_:1})])}const Q=_(G,[["render",K]]),X={class:"demo-space-x"},Z={__name:"DemoChipWithAvatar",setup(V){return(i,o)=>(c(),h("div",X,[e(r,{pill:""},{default:t(()=>[e(x,{start:"",image:p(T)},null,8,["image"]),o[0]||(o[0]=s("span",null,"John Doe",-1))]),_:1}),e(r,{pill:""},{default:t(()=>[e(x,{start:"",image:p(j)},null,8,["image"]),o[1]||(o[1]=s("span",null,"Darcy Nooser",-1))]),_:1}),e(r,{pill:""},{default:t(()=>[e(x,{start:"",image:p(N)},null,8,["image"]),o[2]||(o[2]=s("span",null,"Felicia Risker",-1))]),_:1}),e(r,{pill:""},{default:t(()=>[e(x,{start:"",image:p(B)},null,8,["image"]),o[3]||(o[3]=s("span",null,"Minnie Mostly",-1))]),_:1})]))}},ii={},ei={class:"demo-space-x"};function ti(V,i){return c(),h("div",ei,[e(r,null,{default:t(()=>[e(v,{start:"",size:"16",icon:"tabler-user"}),i[0]||(i[0]=l(" Account "))]),_:1}),e(r,{color:"primary"},{default:t(()=>[e(v,{start:"",size:"16",icon:"tabler-star"}),i[1]||(i[1]=l(" Premium "))]),_:1}),e(r,{color:"secondary"},{default:t(()=>[e(v,{start:"",size:"16",icon:"tabler-cake"}),i[2]||(i[2]=l(" 1 Year "))]),_:1}),e(r,{color:"success"},{default:t(()=>[e(v,{start:"",size:"16",icon:"tabler-bell"}),i[3]||(i[3]=l(" Notification "))]),_:1}),e(r,{color:"info"},{default:t(()=>[e(v,{start:"",size:"16",icon:"tabler-messages"}),i[4]||(i[4]=l(" Message "))]),_:1}),e(r,{color:"warning"},{default:t(()=>[e(v,{start:"",size:"16",icon:"tabler-alert-triangle"}),i[5]||(i[5]=l(" Warning "))]),_:1}),e(r,{color:"error"},{default:t(()=>[e(v,{start:"",size:"16",icon:"tabler-alert-circle"}),i[6]||(i[6]=l(" Error "))]),_:1})])}const li=_(ii,[["render",ti]]),ri={class:"demo-space-x"},oi={__name:"DemoChipClosable",setup(V){const i=d(!0),o=d(!0),m=d(!0),n=d(!0),b=d(!0),g=d(!0),S=d(!0);return(I,a)=>(c(),h("div",ri,[p(i)?(c(),C(r,{key:0,closable:"","onClick:close":a[0]||(a[0]=f=>i.value=!p(i))},{default:t(()=>a[7]||(a[7]=[l(" Default ")])),_:1})):y("",!0),p(o)?(c(),C(r,{key:1,closable:"",color:"primary","onClick:close":a[1]||(a[1]=f=>o.value=!p(o))},{default:t(()=>a[8]||(a[8]=[l(" Primary ")])),_:1})):y("",!0),p(m)?(c(),C(r,{key:2,closable:"",color:"secondary","onClick:close":a[2]||(a[2]=f=>m.value=!p(m))},{default:t(()=>a[9]||(a[9]=[l(" Secondary ")])),_:1})):y("",!0),p(n)?(c(),C(r,{key:3,closable:"",color:"success","onClick:close":a[3]||(a[3]=f=>n.value=!p(n))},{default:t(()=>a[10]||(a[10]=[l(" Success ")])),_:1})):y("",!0),p(b)?(c(),C(r,{key:4,closable:"",color:"info","onClick:close":a[4]||(a[4]=f=>b.value=!p(b))},{default:t(()=>a[11]||(a[11]=[l(" Info ")])),_:1})):y("",!0),p(g)?(c(),C(r,{key:5,closable:"",color:"warning","onClick:close":a[5]||(a[5]=f=>g.value=!p(g))},{default:t(()=>a[12]||(a[12]=[l(" Warning ")])),_:1})):y("",!0),p(S)?(c(),C(r,{key:6,closable:"",color:"error","onClick:close":a[6]||(a[6]=f=>S.value=!p(S))},{default:t(()=>a[13]||(a[13]=[l(" Error ")])),_:1})):y("",!0)]))}},ai={},si={class:"demo-space-x"};function ni(V,i){return c(),h("div",si,[e(r,{label:""},{default:t(()=>i[0]||(i[0]=[l(" Default ")])),_:1}),e(r,{label:"",color:"primary"},{default:t(()=>i[1]||(i[1]=[l(" Primary ")])),_:1}),e(r,{label:"",color:"secondary"},{default:t(()=>i[2]||(i[2]=[l(" Secondary ")])),_:1}),e(r,{label:"",color:"success"},{default:t(()=>i[3]||(i[3]=[l(" Success ")])),_:1}),e(r,{label:"",color:"info"},{default:t(()=>i[4]||(i[4]=[l(" Info ")])),_:1}),e(r,{label:"",color:"warning"},{default:t(()=>i[5]||(i[5]=[l(" Warning ")])),_:1}),e(r,{label:"",color:"error"},{default:t(()=>i[6]||(i[6]=[l(" Error ")])),_:1})])}const pi=_(ai,[["render",ni]]),ci={},mi={class:"demo-space-x"};function Vi(V,i){return c(),h("div",mi,[e(r,{variant:"outlined"},{default:t(()=>i[0]||(i[0]=[l(" Default ")])),_:1}),e(r,{color:"primary",variant:"outlined"},{default:t(()=>i[1]||(i[1]=[l(" Primary ")])),_:1}),e(r,{color:"secondary",variant:"outlined"},{default:t(()=>i[2]||(i[2]=[l(" Secondary ")])),_:1}),e(r,{color:"success",variant:"outlined"},{default:t(()=>i[3]||(i[3]=[l(" Success ")])),_:1}),e(r,{color:"info",variant:"outlined"},{default:t(()=>i[4]||(i[4]=[l(" Info ")])),_:1}),e(r,{color:"warning",variant:"outlined"},{default:t(()=>i[5]||(i[5]=[l(" Warning ")])),_:1}),e(r,{color:"error",variant:"outlined"},{default:t(()=>i[6]||(i[6]=[l(" Error ")])),_:1})])}const ui=_(ci,[["render",Vi]]),di={},Ci={class:"demo-space-x"};function fi(V,i){return c(),h("div",Ci,[e(r,{variant:"elevated"},{default:t(()=>i[0]||(i[0]=[l(" Default ")])),_:1}),e(r,{color:"primary",variant:"elevated"},{default:t(()=>i[1]||(i[1]=[l(" Primary ")])),_:1}),e(r,{color:"secondary",variant:"elevated"},{default:t(()=>i[2]||(i[2]=[l(" Secondary ")])),_:1}),e(r,{color:"success",variant:"elevated"},{default:t(()=>i[3]||(i[3]=[l(" Success ")])),_:1}),e(r,{color:"info",variant:"elevated"},{default:t(()=>i[4]||(i[4]=[l(" Info ")])),_:1}),e(r,{color:"warning",variant:"elevated"},{default:t(()=>i[5]||(i[5]=[l(" Warning ")])),_:1}),e(r,{color:"error",variant:"elevated"},{default:t(()=>i[6]||(i[6]=[l(" Error ")])),_:1})])}const vi=_(di,[["render",fi]]),hi={},bi={class:"demo-space-x"};function gi(V,i){return c(),h("div",bi,[e(r,null,{default:t(()=>i[0]||(i[0]=[l(" Default ")])),_:1}),e(r,{color:"primary"},{default:t(()=>i[1]||(i[1]=[l(" Primary ")])),_:1}),e(r,{color:"secondary"},{default:t(()=>i[2]||(i[2]=[l(" Secondary ")])),_:1}),e(r,{color:"success"},{default:t(()=>i[3]||(i[3]=[l(" Success ")])),_:1}),e(r,{color:"info"},{default:t(()=>i[4]||(i[4]=[l(" Info ")])),_:1}),e(r,{color:"warning"},{default:t(()=>i[5]||(i[5]=[l(" Warning ")])),_:1}),e(r,{color:"error"},{default:t(()=>i[6]||(i[6]=[l(" Error ")])),_:1})])}const yi=_(hi,[["render",gi]]),_i={ts:`<script lang="ts" setup>
const isDefaultChipVisible = ref(true)
const isPrimaryChipVisible = ref(true)
const isSecondaryChipVisible = ref(true)
const isSuccessChipVisible = ref(true)
const isInfoChipVisible = ref(true)
const isWarningChipVisible = ref(true)
const isErrorChipVisible = ref(true)
<\/script>

<template>
  <div class="demo-space-x">
    <VChip
      v-if="isDefaultChipVisible"
      closable
      @click:close="isDefaultChipVisible = !isDefaultChipVisible"
    >
      Default
    </VChip>

    <VChip
      v-if="isPrimaryChipVisible"
      closable
      color="primary"
      @click:close="isPrimaryChipVisible = !isPrimaryChipVisible"
    >
      Primary
    </VChip>

    <VChip
      v-if="isSecondaryChipVisible"
      closable
      color="secondary"
      @click:close="isSecondaryChipVisible = !isSecondaryChipVisible"
    >
      Secondary
    </VChip>

    <VChip
      v-if="isSuccessChipVisible"
      closable
      color="success"
      @click:close="isSuccessChipVisible = !isSuccessChipVisible"
    >
      Success
    </VChip>

    <VChip
      v-if="isInfoChipVisible"
      closable
      color="info"
      @click:close="isInfoChipVisible = !isInfoChipVisible"
    >
      Info
    </VChip>

    <VChip
      v-if="isWarningChipVisible"
      closable
      color="warning"
      @click:close="isWarningChipVisible = !isWarningChipVisible"
    >
      Warning
    </VChip>

    <VChip
      v-if="isErrorChipVisible"
      closable
      color="error"
      @click:close="isErrorChipVisible = !isErrorChipVisible"
    >
      Error
    </VChip>
  </div>
</template>
`,js:`<script setup>
const isDefaultChipVisible = ref(true)
const isPrimaryChipVisible = ref(true)
const isSecondaryChipVisible = ref(true)
const isSuccessChipVisible = ref(true)
const isInfoChipVisible = ref(true)
const isWarningChipVisible = ref(true)
const isErrorChipVisible = ref(true)
<\/script>

<template>
  <div class="demo-space-x">
    <VChip
      v-if="isDefaultChipVisible"
      closable
      @click:close="isDefaultChipVisible = !isDefaultChipVisible"
    >
      Default
    </VChip>

    <VChip
      v-if="isPrimaryChipVisible"
      closable
      color="primary"
      @click:close="isPrimaryChipVisible = !isPrimaryChipVisible"
    >
      Primary
    </VChip>

    <VChip
      v-if="isSecondaryChipVisible"
      closable
      color="secondary"
      @click:close="isSecondaryChipVisible = !isSecondaryChipVisible"
    >
      Secondary
    </VChip>

    <VChip
      v-if="isSuccessChipVisible"
      closable
      color="success"
      @click:close="isSuccessChipVisible = !isSuccessChipVisible"
    >
      Success
    </VChip>

    <VChip
      v-if="isInfoChipVisible"
      closable
      color="info"
      @click:close="isInfoChipVisible = !isInfoChipVisible"
    >
      Info
    </VChip>

    <VChip
      v-if="isWarningChipVisible"
      closable
      color="warning"
      @click:close="isWarningChipVisible = !isWarningChipVisible"
    >
      Warning
    </VChip>

    <VChip
      v-if="isErrorChipVisible"
      closable
      color="error"
      @click:close="isErrorChipVisible = !isErrorChipVisible"
    >
      Error
    </VChip>
  </div>
</template>
`},Si={ts:`<template>
  <div class="demo-space-x">
    <VChip>
      Default
    </VChip>

    <VChip color="primary">
      Primary
    </VChip>

    <VChip color="secondary">
      Secondary
    </VChip>

    <VChip color="success">
      Success
    </VChip>

    <VChip color="info">
      Info
    </VChip>

    <VChip color="warning">
      Warning
    </VChip>

    <VChip color="error">
      Error
    </VChip>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-x">
    <VChip>
      Default
    </VChip>

    <VChip color="primary">
      Primary
    </VChip>

    <VChip color="secondary">
      Secondary
    </VChip>

    <VChip color="success">
      Success
    </VChip>

    <VChip color="info">
      Info
    </VChip>

    <VChip color="warning">
      Warning
    </VChip>

    <VChip color="error">
      Error
    </VChip>
  </div>
</template>
`},xi={ts:`<template>
  <div class="demo-space-x">
    <VChip variant="elevated">
      Default
    </VChip>

    <VChip
      color="primary"
      variant="elevated"
    >
      Primary
    </VChip>

    <VChip
      color="secondary"
      variant="elevated"
    >
      Secondary
    </VChip>

    <VChip
      color="success"
      variant="elevated"
    >
      Success
    </VChip>

    <VChip
      color="info"
      variant="elevated"
    >
      Info
    </VChip>

    <VChip
      color="warning"
      variant="elevated"
    >
      Warning
    </VChip>

    <VChip
      color="error"
      variant="elevated"
    >
      Error
    </VChip>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-x">
    <VChip variant="elevated">
      Default
    </VChip>

    <VChip
      color="primary"
      variant="elevated"
    >
      Primary
    </VChip>

    <VChip
      color="secondary"
      variant="elevated"
    >
      Secondary
    </VChip>

    <VChip
      color="success"
      variant="elevated"
    >
      Success
    </VChip>

    <VChip
      color="info"
      variant="elevated"
    >
      Info
    </VChip>

    <VChip
      color="warning"
      variant="elevated"
    >
      Warning
    </VChip>

    <VChip
      color="error"
      variant="elevated"
    >
      Error
    </VChip>
  </div>
</template>
`},Ii={ts:`<script lang="ts" setup>
const isMenuVisible = ref(false)
<\/script>

<template>
  <VMenu
    v-model="isMenuVisible"
    transition="scale-transition"
  >
    <!-- v-menu activator -->
    <template #activator="{ props }">
      <VChip v-bind="props">
        VueJS
      </VChip>
    </template>

    <!-- v-menu list -->
    <VList>
      <VListItem>
        <VListItemTitle class="mb-2">
          VueJS
        </VListItemTitle>
        <VListItemSubtitle>The Progressive JavaScript Framework</VListItemSubtitle>

        <template #append>
          <VListItemAction class="ms-3">
            <VBtn
              icon
              variant="text"
              size="x-small"
              color="default"
              @click="isMenuVisible = false"
            >
              <VIcon
                size="20"
                icon="tabler-x"
              />
            </VBtn>
          </VListItemAction>
        </template>
      </VListItem>
    </VList>
  </VMenu>
</template>
`,js:`<script setup>
const isMenuVisible = ref(false)
<\/script>

<template>
  <VMenu
    v-model="isMenuVisible"
    transition="scale-transition"
  >
    <!-- v-menu activator -->
    <template #activator="{ props }">
      <VChip v-bind="props">
        VueJS
      </VChip>
    </template>

    <!-- v-menu list -->
    <VList>
      <VListItem>
        <VListItemTitle class="mb-2">
          VueJS
        </VListItemTitle>
        <VListItemSubtitle>The Progressive JavaScript Framework</VListItemSubtitle>

        <template #append>
          <VListItemAction class="ms-3">
            <VBtn
              icon
              variant="text"
              size="x-small"
              color="default"
              @click="isMenuVisible = false"
            >
              <VIcon
                size="20"
                icon="tabler-x"
              />
            </VBtn>
          </VListItemAction>
        </template>
      </VListItem>
    </VList>
  </VMenu>
</template>
`},zi={ts:`<script lang="ts" setup>
const chips = ref(['Programming', 'Playing games', 'Sleeping'])
const items = ref(['Streaming', 'Eating', 'Programming', 'Playing games', 'Sleeping'])
<\/script>

<template>
  <AppCombobox
    v-model="chips"
    chips
    clearable
    multiple
    closable-chips
    clear-icon="tabler-circle-x"
    :items="items"
    label="Your favorite hobbies"
    prepend-icon="tabler-filter"
  />
</template>
`,js:`<script setup>
const chips = ref([
  'Programming',
  'Playing games',
  'Sleeping',
])

const items = ref([
  'Streaming',
  'Eating',
  'Programming',
  'Playing games',
  'Sleeping',
])
<\/script>

<template>
  <AppCombobox
    v-model="chips"
    chips
    clearable
    multiple
    closable-chips
    clear-icon="tabler-circle-x"
    :items="items"
    label="Your favorite hobbies"
    prepend-icon="tabler-filter"
  />
</template>
`},Di={ts:`<template>
  <div class="demo-space-x">
    <VChip label>
      Default
    </VChip>

    <VChip
      label
      color="primary"
    >
      Primary
    </VChip>

    <VChip
      label
      color="secondary"
    >
      Secondary
    </VChip>

    <VChip
      label
      color="success"
    >
      Success
    </VChip>

    <VChip
      label
      color="info"
    >
      Info
    </VChip>

    <VChip
      label
      color="warning"
    >
      Warning
    </VChip>

    <VChip
      label
      color="error"
    >
      Error
    </VChip>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-x">
    <VChip label>
      Default
    </VChip>

    <VChip
      label
      color="primary"
    >
      Primary
    </VChip>

    <VChip
      label
      color="secondary"
    >
      Secondary
    </VChip>

    <VChip
      label
      color="success"
    >
      Success
    </VChip>

    <VChip
      label
      color="info"
    >
      Info
    </VChip>

    <VChip
      label
      color="warning"
    >
      Warning
    </VChip>

    <VChip
      label
      color="error"
    >
      Error
    </VChip>
  </div>
</template>
`},ki={ts:`<template>
  <div class="demo-space-x">
    <VChip variant="outlined">
      Default
    </VChip>

    <VChip
      color="primary"
      variant="outlined"
    >
      Primary
    </VChip>

    <VChip
      color="secondary"
      variant="outlined"
    >
      Secondary
    </VChip>

    <VChip
      color="success"
      variant="outlined"
    >
      Success
    </VChip>

    <VChip
      color="info"
      variant="outlined"
    >
      Info
    </VChip>

    <VChip
      color="warning"
      variant="outlined"
    >
      Warning
    </VChip>

    <VChip
      color="error"
      variant="outlined"
    >
      Error
    </VChip>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-x">
    <VChip variant="outlined">
      Default
    </VChip>

    <VChip
      color="primary"
      variant="outlined"
    >
      Primary
    </VChip>

    <VChip
      color="secondary"
      variant="outlined"
    >
      Secondary
    </VChip>

    <VChip
      color="success"
      variant="outlined"
    >
      Success
    </VChip>

    <VChip
      color="info"
      variant="outlined"
    >
      Info
    </VChip>

    <VChip
      color="warning"
      variant="outlined"
    >
      Warning
    </VChip>

    <VChip
      color="error"
      variant="outlined"
    >
      Error
    </VChip>
  </div>
</template>
`},Pi={ts:`<template>
  <div class="demo-space-x">
    <VChip size="x-small">
      x-small chip
    </VChip>

    <VChip size="small">
      small chip
    </VChip>

    <VChip size="default">
      Default
    </VChip>

    <VChip size="large">
      large chip
    </VChip>

    <VChip size="x-large">
      x-large chip
    </VChip>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-x">
    <VChip size="x-small">
      x-small chip
    </VChip>

    <VChip size="small">
      small chip
    </VChip>

    <VChip size="default">
      Default
    </VChip>

    <VChip size="large">
      large chip
    </VChip>

    <VChip size="x-large">
      x-large chip
    </VChip>
  </div>
</template>
`},Ei={ts:`<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
<\/script>

<template>
  <div class="demo-space-x">
    <VChip pill>
      <VAvatar
        start
        :image="avatar1"
      />
      <span>John Doe</span>
    </VChip>

    <VChip pill>
      <VAvatar
        start
        :image="avatar2"
      />
      <span>Darcy Nooser</span>
    </VChip>

    <VChip pill>
      <VAvatar
        start
        :image="avatar3"
      />
      <span>Felicia Risker</span>
    </VChip>

    <VChip pill>
      <VAvatar
        start
        :image="avatar4"
      />
      <span>Minnie Mostly</span>
    </VChip>
  </div>
</template>
`,js:`<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
<\/script>

<template>
  <div class="demo-space-x">
    <VChip pill>
      <VAvatar
        start
        :image="avatar1"
      />
      <span>John Doe</span>
    </VChip>

    <VChip pill>
      <VAvatar
        start
        :image="avatar2"
      />
      <span>Darcy Nooser</span>
    </VChip>

    <VChip pill>
      <VAvatar
        start
        :image="avatar3"
      />
      <span>Felicia Risker</span>
    </VChip>

    <VChip pill>
      <VAvatar
        start
        :image="avatar4"
      />
      <span>Minnie Mostly</span>
    </VChip>
  </div>
</template>
`},$i={ts:`<template>
  <div class="demo-space-x">
    <VChip>
      <VIcon
        start
        size="16"
        icon="tabler-user"
      />
      Account
    </VChip>

    <VChip color="primary">
      <VIcon
        start
        size="16"
        icon="tabler-star"
      />
      Premium
    </VChip>

    <VChip color="secondary">
      <VIcon
        start
        size="16"
        icon="tabler-cake"
      />
      1 Year
    </VChip>

    <VChip color="success">
      <VIcon
        start
        size="16"
        icon="tabler-bell"
      />
      Notification
    </VChip>

    <VChip color="info">
      <VIcon
        start
        size="16"
        icon="tabler-messages"
      />
      Message
    </VChip>

    <VChip color="warning">
      <VIcon
        start
        size="16"
        icon="tabler-alert-triangle"
      />
      Warning
    </VChip>

    <VChip color="error">
      <VIcon
        start
        size="16"
        icon="tabler-alert-circle"
      />
      Error
    </VChip>
  </div>
</template>
`,js:`<template>
  <div class="demo-space-x">
    <VChip>
      <VIcon
        start
        size="16"
        icon="tabler-user"
      />
      Account
    </VChip>

    <VChip color="primary">
      <VIcon
        start
        size="16"
        icon="tabler-star"
      />
      Premium
    </VChip>

    <VChip color="secondary">
      <VIcon
        start
        size="16"
        icon="tabler-cake"
      />
      1 Year
    </VChip>

    <VChip color="success">
      <VIcon
        start
        size="16"
        icon="tabler-bell"
      />
      Notification
    </VChip>

    <VChip color="info">
      <VIcon
        start
        size="16"
        icon="tabler-messages"
      />
      Message
    </VChip>

    <VChip color="warning">
      <VIcon
        start
        size="16"
        icon="tabler-alert-triangle"
      />
      Warning
    </VChip>

    <VChip color="error">
      <VIcon
        start
        size="16"
        icon="tabler-alert-circle"
      />
      Error
    </VChip>
  </div>
</template>
`},me={__name:"chip",setup(V){return(i,o)=>{const m=yi,n=R,b=vi,g=ui,S=pi,I=oi,a=li,f=Z,D=Q,k=q,P=O;return c(),C(Y,{class:"match-height"},{default:t(()=>[e(u,{cols:"12",md:"6"},{default:t(()=>[e(n,{title:"Color",code:Si},{default:t(()=>[o[0]||(o[0]=s("p",null,[l("Use "),s("code",null,"color"),l(" prop to change the background color of chips.")],-1)),e(m)]),_:1},8,["code"])]),_:1}),e(u,{cols:"12",md:"6"},{default:t(()=>[e(n,{title:"Elevated",code:xi},{default:t(()=>[o[1]||(o[1]=s("p",null,[l("Use "),s("code",null,"elevated"),l(" variant option to create filled chips.")],-1)),e(b)]),_:1},8,["code"])]),_:1}),e(u,{cols:"12",md:"6"},{default:t(()=>[e(n,{title:"Outlined",code:ki},{default:t(()=>[o[2]||(o[2]=s("p",null,[l("Use "),s("code",null,"outlined"),l(" variant option to create outline border chips.")],-1)),e(g)]),_:1},8,["code"])]),_:1}),e(u,{cols:"12",md:"6"},{default:t(()=>[e(n,{title:"Label",code:Di},{default:t(()=>[o[3]||(o[3]=s("p",null,[l("Label chips use the "),s("code",null,"v-card"),l(" border-radius. Use "),s("code",null,"label"),l(" prop to create label chips.")],-1)),e(S)]),_:1},8,["code"])]),_:1}),e(u,{cols:"12",md:"6"},{default:t(()=>[e(n,{title:"Closable",code:_i},{default:t(()=>[o[4]||(o[4]=s("p",null,[l("Closable chips can be controlled with a "),s("code",null,"v-model"),l(".")],-1)),e(I)]),_:1},8,["code"])]),_:1}),e(u,{cols:"12",md:"6"},{default:t(()=>[e(n,{title:"With Icon",code:$i},{default:t(()=>[o[5]||(o[5]=s("p",null,"Chips can use text or any icon available in the Material Icons font library.",-1)),e(a)]),_:1},8,["code"])]),_:1}),e(u,{cols:"12",md:"6"},{default:t(()=>[e(n,{title:"With Avatar",code:Ei},{default:t(()=>[o[6]||(o[6]=s("p",null,[l("Use "),s("code",null,"pill"),l(" prop to remove the "),s("code",null,"v-avatar"),l(" padding.")],-1)),e(f)]),_:1},8,["code"])]),_:1}),e(u,{cols:"12",md:"6"},{default:t(()=>[e(n,{title:"Sizes",code:Pi},{default:t(()=>[o[7]||(o[7]=s("p",null,[l("The "),s("code",null,"v-chip"),l(" component can have various sizes from "),s("code",null,"x-small"),l(" to "),s("code",null,"x-large"),l(".")],-1)),e(D)]),_:1},8,["code"])]),_:1}),e(u,{cols:"12",md:"6"},{default:t(()=>[e(n,{title:"In Selects",code:zi},{default:t(()=>[o[8]||(o[8]=s("p",null,[l("Selects can use "),s("code",null,"chips"),l(" to display the selected data. Try adding your own tags below.")],-1)),e(k)]),_:1},8,["code"])]),_:1}),e(u,{cols:"12",md:"6"},{default:t(()=>[e(n,{title:"Expandable",code:Ii},{default:t(()=>[o[9]||(o[9]=s("p",null,[l("Chips can be combined with "),s("code",null,"v-menu"),l(" to enable a specific set of actions for a chip.")],-1)),e(P)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{me as default};
