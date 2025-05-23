import{_ as g}from"./_plugin-vue_export-helper-c27b6911.js";import{o as u,c as _,b as e,a1 as t,r as f,n as v,a0 as h,e as s,d as o,x as b,f as y,H as B,as as k,w as $,v as l}from"./index-e0f854fb.js";import{_ as M}from"./AppCardCode-850538ca.js";import{V as x}from"./VRow-6bb6adbe.js";import{V as p}from"./VCol-ba474af9.js";import"./constants-0978c720.js";import"./VCard-18f293ae.js";import"./VAvatar-b3e45d40.js";import"./VImg-06c338d7.js";import"./VCardText-7683b789.js";import"./VDivider-756cacd6.js";const I={},D={class:"demo-space-y"};function U(m,a){return u(),_("div",D,[e(t,{color:"rgb(var(--v-theme-primary))","model-value":"75",striped:""}),e(t,{color:"rgb(var(--v-theme-success))","model-value":"55",striped:""}),e(t,{color:"rgb(var(--v-theme-warning))","model-value":"35",striped:""})])}const T=g(I,[["render",U]]),j={class:"demo-space-y"},R={__name:"DemoProgressLinearSlots",setup(m){const a=f(20),r=f(33),i=f(78);return(d,c)=>(u(),_("div",j,[e(t,{modelValue:v(i),"onUpdate:modelValue":c[0]||(c[0]=n=>h(i)?i.value=n:null),color:"primary",height:"8"},null,8,["modelValue"]),e(t,{modelValue:v(a),"onUpdate:modelValue":c[1]||(c[1]=n=>h(a)?a.value=n:null),color:"primary",height:"20"},{default:s(({value:n})=>[o("span",null,b(Math.ceil(n))+"%",1)]),_:1},8,["modelValue"]),e(t,{modelValue:v(r),"onUpdate:modelValue":c[2]||(c[2]=n=>h(r)?r.value=n:null),height:"20",color:"primary"},{default:s(()=>[o("span",null,b(Math.ceil(v(r)))+"%",1)]),_:1},8,["modelValue"])]))}},C={},S={class:"demo-space-y"};function N(m,a){return u(),_("div",S,[e(t,{"model-value":"78",height:"8",color:"primary",rounded:!1}),e(t,{"model-value":"20",color:"primary",height:"20",rounded:!1}),e(t,{"model-value":"33",height:"20",color:"primary",rounded:!1})])}const Y=g(C,[["render",N]]),A={};function E(m,a){return u(),y(t,{color:"primary",indeterminate:"",reverse:""})}const H=g(A,[["render",E]]),q={};function z(m,a){return u(),y(t,{indeterminate:"",color:"primary"})}const F=g(q,[["render",z]]),G={class:"demo-space-y"},J={__name:"DemoProgressLinearBuffering",setup(m){const a=f(10),r=f(20),i=f(),d=()=>{clearInterval(i.value),i.value=setInterval(()=>{a.value+=Math.random()*(15-5)+5,r.value+=Math.random()*(15-5)+6},2e3)};return B(d),k(()=>{clearInterval(i.value)}),$(a,()=>{if(a.value<100)return!1;a.value=0,r.value=10,d()}),(c,n)=>(u(),_("div",G,[e(t,{modelValue:v(a),"onUpdate:modelValue":n[0]||(n[0]=V=>h(a)?a.value=V:null),color:"primary",height:"8","buffer-value":v(r)},null,8,["modelValue","buffer-value"])]))}},K={},O={class:"demo-space-y"};function Q(m,a){return u(),_("div",O,[e(t,{"model-value":"15","bg-color":"primary",color:"primary"}),e(t,{"model-value":"30","bg-color":"secondary",color:"secondary"}),e(t,{"model-value":"45","bg-color":"success",color:"success"})])}const W=g(K,[["render",Q]]),X={ts:`<script setup lang="ts">
const modelValue = ref(10)
const bufferValue = ref(20)
const interval = ref()

const startBuffer = () => {
  clearInterval(interval.value)

  interval.value = setInterval(() => {
    modelValue.value += Math.random() * (15 - 5) + 5
    bufferValue.value += Math.random() * (15 - 5) + 6
  }, 2000)
}

onMounted(startBuffer)

onBeforeUnmount(() => {
  clearInterval(interval.value)
})

watch(modelValue, () => {
  if (modelValue.value < 100)
    return false

  modelValue.value = 0
  bufferValue.value = 10
  startBuffer()
})
<\/script>

<template>
  <div class="demo-space-y">
    <VProgressLinear
      v-model="modelValue"
      color="primary"
      height="8"
      :buffer-value="bufferValue"
    />
  </div>
</template>
`,js:`<script setup>
const modelValue = ref(10)
const bufferValue = ref(20)
const interval = ref()

const startBuffer = () => {
  clearInterval(interval.value)
  interval.value = setInterval(() => {
    modelValue.value += Math.random() * (15 - 5) + 5
    bufferValue.value += Math.random() * (15 - 5) + 6
  }, 2000)
}

onMounted(startBuffer)
onBeforeUnmount(() => {
  clearInterval(interval.value)
})
watch(modelValue, () => {
  if (modelValue.value < 100)
    return false
  modelValue.value = 0
  bufferValue.value = 10
  startBuffer()
})
<\/script>

<template>
  <div class="demo-space-y">
    <VProgressLinear
      v-model="modelValue"
      color="primary"
      height="8"
      :buffer-value="bufferValue"
    />
  </div>
</template>
`},Z={ts:`<template>
  <div class="demo-space-y">
    <VProgressLinear
      model-value="15"
      bg-color="primary"
      color="primary"
    />

    <VProgressLinear
      model-value="30"
      bg-color="secondary"
      color="secondary"
    />

    <VProgressLinear
      model-value="45"
      bg-color="success"
      color="success"
    />
  </div>
</template>
`,js:`<template>
  <div class="demo-space-y">
    <VProgressLinear
      model-value="15"
      bg-color="primary"
      color="primary"
    />

    <VProgressLinear
      model-value="30"
      bg-color="secondary"
      color="secondary"
    />

    <VProgressLinear
      model-value="45"
      bg-color="success"
      color="success"
    />
  </div>
</template>
`},ee={ts:`<template>
  <VProgressLinear
    indeterminate
    color="primary"
  />
</template>
`,js:`<template>
  <VProgressLinear
    indeterminate
    color="primary"
  />
</template>
`},re={ts:`<template>
  <VProgressLinear
    color="primary"
    indeterminate
    reverse
  />
</template>
`,js:`<template>
  <VProgressLinear
    color="primary"
    indeterminate
    reverse
  />
</template>
`},oe={ts:`<template>
  <div class="demo-space-y">
    <VProgressLinear
      model-value="78"
      height="8"
      color="primary"
      :rounded="false"
    />

    <VProgressLinear
      model-value="20"
      color="primary"
      height="20"
      :rounded="false"
    />

    <VProgressLinear
      model-value="33"
      height="20"
      color="primary"
      :rounded="false"
    />
  </div>
</template>
`,js:`<template>
  <div class="demo-space-y">
    <VProgressLinear
      model-value="78"
      height="8"
      color="primary"
      :rounded="false"
    />

    <VProgressLinear
      model-value="20"
      color="primary"
      height="20"
      :rounded="false"
    />

    <VProgressLinear
      model-value="33"
      height="20"
      color="primary"
      :rounded="false"
    />
  </div>
</template>
`},le={ts:`<script setup lang="ts">
const skill = ref(20)
const knowledge = ref(33)
const power = ref(78)
<\/script>

<template>
  <div class="demo-space-y">
    <VProgressLinear
      v-model="power"
      color="primary"
      height="8"
    />

    <VProgressLinear
      v-model="skill"
      color="primary"
      height="20"
    >
      <template #default="{ value }">
        <span>{{ Math.ceil(value) }}%</span>
      </template>
    </VProgressLinear>

    <VProgressLinear
      v-model="knowledge"
      height="20"
      color="primary"
    >
      <span>{{ Math.ceil(knowledge) }}%</span>
    </VProgressLinear>
  </div>
</template>
`,js:`<script setup>
const skill = ref(20)
const knowledge = ref(33)
const power = ref(78)
<\/script>

<template>
  <div class="demo-space-y">
    <VProgressLinear
      v-model="power"
      color="primary"
      height="8"
    />

    <VProgressLinear
      v-model="skill"
      color="primary"
      height="20"
    >
      <template #default="{ value }">
        <span>{{ Math.ceil(value) }}%</span>
      </template>
    </VProgressLinear>

    <VProgressLinear
      v-model="knowledge"
      height="20"
      color="primary"
    >
      <span>{{ Math.ceil(knowledge) }}%</span>
    </VProgressLinear>
  </div>
</template>
`},ae={ts:`<template>
  <div class="demo-space-y">
    <VProgressLinear
      color="rgb(var(--v-theme-primary))"
      model-value="75"
      striped
    />

    <VProgressLinear
      color="rgb(var(--v-theme-success))"
      model-value="55"
      striped
    />

    <VProgressLinear
      color="rgb(var(--v-theme-warning))"
      model-value="35"
      striped
    />
  </div>
</template>
`,js:`<template>
  <div class="demo-space-y">
    <VProgressLinear
      color="rgb(var(--v-theme-primary))"
      model-value="75"
      striped
    />

    <VProgressLinear
      color="rgb(var(--v-theme-success))"
      model-value="55"
      striped
    />

    <VProgressLinear
      color="rgb(var(--v-theme-warning))"
      model-value="35"
      striped
    />
  </div>
</template>
`},ge={__name:"progress-linear",setup(m){return(a,r)=>{const i=W,d=M,c=J,n=F,V=H,L=Y,P=R,w=T;return u(),y(x,{class:"match-height"},{default:s(()=>[e(p,{cols:"12",md:"6"},{default:s(()=>[e(d,{title:"Color",code:Z},{default:s(()=>[r[0]||(r[0]=o("p",null,[l("Use the props "),o("code",null,"color"),l(" and "),o("code",null,"background-color"),l(" to set colors.")],-1)),e(i)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:s(()=>[e(d,{title:"Buffering",code:X},{default:s(()=>[r[1]||(r[1]=o("p",null,[l("The primary value is controlled by "),o("code",null,"v-model"),l(", whereas the buffer is controlled by the "),o("code",null,"buffer-value"),l(" prop.")],-1)),e(c)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:s(()=>[e(d,{title:"Indeterminate",code:ee},{default:s(()=>[r[2]||(r[2]=o("p",null,[l("for continuously animating progress bar,use prop "),o("code",null,"indeterminate"),l(". This indicates continuous process. ")],-1)),e(n)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:s(()=>[e(d,{title:"Reversed",code:re},{default:s(()=>[r[3]||(r[3]=o("p",null,[l("Use prop "),o("code",null,"reverse"),l(" to animate continuously in reverse direction. The component also has RTL support.")],-1)),e(V)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:s(()=>[e(d,{title:"Rounded",code:oe},{default:s(()=>[r[4]||(r[4]=o("p",null,[l(" The "),o("code",null," rounded "),l("prop is used to apply a border radius to the v-progress-linear component. By default we have set "),o("code",null,"rounded"),l(" prop true. You can disable it by using "),o("code",null,":rounded='false'"),l(". ")],-1)),e(L)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:s(()=>[e(d,{title:"Slots",code:le},{default:s(()=>[r[5]||(r[5]=o("p",null,[l("The v-progress-linear component will be responsive to user input when using "),o("code",null,"v-model"),l(". You can use the default slot or bind a local model to display inside of the progress.")],-1)),e(P)]),_:1},8,["code"])]),_:1}),e(p,{cols:"12",md:"6"},{default:s(()=>[e(d,{title:"Striped",code:ae},{default:s(()=>[r[6]||(r[6]=o("p",null,[l(" The "),o("code",null,"striped"),l(" prop is used to apply striped background.")],-1)),e(w)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{ge as default};
