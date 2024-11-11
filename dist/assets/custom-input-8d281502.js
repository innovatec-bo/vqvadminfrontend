import{_ as I}from"./_plugin-vue_export-helper-c27b6911.js";import{V as p}from"./VCol-fa8b79cf.js";import{V as _}from"./form-eec3d544.js";import{V as w}from"./VCheckbox-4d4ae22a.js";import{V as y}from"./VRow-7cfaa3eb.js";import{o as a,f as u,e as n,c as h,F as R,i as $,s as f,b as c,y as W,d as m,A as v,v as V,x as g,z as b,r as C,n as k,a0 as x,$ as D}from"./index-3e1c086b.js";import{a as U,V as j}from"./VRadioGroup-b5c5db25.js";import{_ as B}from"./CustomRadiosWithIcon-e04944ee.js";import{V as G}from"./VSpacer-4a70a6f6.js";import{_ as q}from"./AppCardCode-fcedd3e0.js";import{_ as F}from"./CustomRadios-7a106a00.js";import"./VCheckboxBtn-393e9589.js";import"./VSelectionControl-d1b8b485.js";import"./VInput-775ff67b.js";import"./VImg-7feacbbd.js";import"./VAvatar-5a0bc182.js";import"./constants-f3b5ca65.js";import"./VCard-8f9f713c.js";import"./VCardText-3d3a8217.js";import"./VDivider-a55c6262.js";const A=["src"],E={__name:"CustomCheckboxesWithImage",props:{selectedCheckbox:{type:Array,required:!0},checkboxContent:{type:Array,required:!0},gridColumn:{type:null,required:!1}},emits:["update:selectedCheckbox"],setup(r,{emit:l}){const e=r,d=l,s=o=>{typeof o!="boolean"&&d("update:selectedCheckbox",o)};return(o,i)=>e.checkboxContent&&e.selectedCheckbox?(a(),u(y,{key:0},{default:n(()=>[(a(!0),h(R,null,$(e.checkboxContent,t=>(a(),u(p,f({key:t.value,ref_for:!0},r.gridColumn),{default:n(()=>[c(_,{class:W(["custom-input custom-checkbox rounded cursor-pointer w-100",e.selectedCheckbox.includes(t.value)?"active":""])},{default:n(()=>[m("div",null,[c(w,{id:`custom-checkbox-with-img-${t.value}`,"model-value":e.selectedCheckbox,value:t.value,"onUpdate:modelValue":s},null,8,["id","model-value","value"])]),m("img",{src:t.bgImage,alt:"bg-img",class:"custom-checkbox-image"},null,8,A)]),_:2},1032,["class"]),t.label||o.$slots.label?(a(),u(_,{key:0,for:`custom-checkbox-with-img-${t.value}`,class:"cursor-pointer"},{default:n(()=>[v(o.$slots,"label",{label:t.label},()=>[V(g(t.label),1)],!0)]),_:2},1032,["for"])):b("",!0)]),_:2},1040))),128))]),_:3})):b("",!0)}},P=I(E,[["__scopeId","data-v-4fc072ba"]]),T="/assets/custom-checkbox-img-1-ad01355a.png",L="/assets/custom-checkbox-img-2-2d35a86b.png",N="/assets/custom-checkbox-img-3-1a4526bb.png",O={__name:"DemoCustomInputCustomCheckboxesWithImage",setup(r){const l=[{bgImage:T,value:"basic"},{bgImage:L,value:"premium"},{bgImage:N,value:"enterprise"}],e=C(["basic"]);return(d,s)=>{const o=P;return a(),u(o,{"selected-checkbox":k(e),"onUpdate:selectedCheckbox":s[0]||(s[0]=i=>x(e)?e.value=i:null),"checkbox-content":l,"grid-column":{sm:"4",cols:"12"}},null,8,["selected-checkbox"])}}};const J=["src"],H={__name:"CustomRadiosWithImage",props:{selectedRadio:{type:String,required:!0},radioContent:{type:Array,required:!0},gridColumn:{type:null,required:!1}},emits:["update:selectedRadio"],setup(r,{emit:l}){const e=r,d=l,s=o=>{d("update:selectedRadio",o)};return(o,i)=>e.radioContent?(a(),u(j,{key:0,"model-value":e.selectedRadio,"onUpdate:modelValue":s},{default:n(()=>[c(y,null,{default:n(()=>[(a(!0),h(R,null,$(e.radioContent,t=>(a(),u(p,f({key:t.bgImage,ref_for:!0},r.gridColumn),{default:n(()=>[c(_,{class:W(["custom-input custom-radio rounded cursor-pointer w-100",e.selectedRadio===t.value?"active":""])},{default:n(()=>[v(o.$slots,"content",{item:t},()=>[t.bgImage?(a(),h("img",{key:0,src:t.bgImage,alt:"bg-img",class:"custom-radio-image"},null,8,J)):b("",!0)],!0),c(U,{id:`custom-radio-with-img-${t.value}`,value:t.value},null,8,["id","value"])]),_:2},1032,["class"]),t.label||o.$slots.label?(a(),u(_,{key:0,for:`custom-radio-with-img-${t.value}`,class:"cursor-pointer"},{default:n(()=>[v(o.$slots,"label",{label:t.label},()=>[V(g(t.label),1)],!0)]),_:2},1032,["for"])):b("",!0)]),_:2},1040))),128))]),_:3})]),_:3},8,["model-value"])):b("",!0)}},K=I(H,[["__scopeId","data-v-62785ce1"]]),M="/assets/custom-radio-img-1-9fd6addb.png",Q="/assets/custom-radio-img-2-81c76549.png",X="/assets/custom-radio-img-3-9150de6f.png",Y={__name:"DemoCustomInputCustomRadiosWithImage",setup(r){const l=[{bgImage:M,value:"basic"},{bgImage:Q,value:"premium"},{bgImage:X,value:"enterprise"}],e=C("basic");return(d,s)=>{const o=K;return a(),u(o,{"selected-radio":k(e),"onUpdate:selectedRadio":s[0]||(s[0]=i=>x(e)?e.value=i:null),"radio-content":l,"grid-column":{sm:"4",cols:"12"}},null,8,["selected-radio"])}}};const Z={class:"d-flex flex-column align-center text-center gap-2"},ee={class:"cr-title text-base"},te={class:"text-sm clamp-text mb-0"},oe={__name:"CustomCheckboxesWithIcon",props:{selectedCheckbox:{type:Array,required:!0},checkboxContent:{type:Array,required:!0},gridColumn:{type:null,required:!1}},emits:["update:selectedCheckbox"],setup(r,{emit:l}){const e=r,d=l,s=o=>{typeof o!="boolean"&&d("update:selectedCheckbox",o)};return(o,i)=>e.checkboxContent&&e.selectedCheckbox?(a(),u(y,{key:0},{default:n(()=>[(a(!0),h(R,null,$(e.checkboxContent,t=>(a(),u(p,f({key:t.title,ref_for:!0},r.gridColumn),{default:n(()=>[c(_,{class:W(["custom-input custom-checkbox-icon rounded cursor-pointer",e.selectedCheckbox.includes(t.value)?"active":""])},{default:n(()=>[v(o.$slots,"default",{item:t},()=>[m("div",Z,[c(D,f({ref_for:!0},t.icon,{class:"text-high-emphasis"}),null,16),m("h6",ee,g(t.title),1),m("p",te,g(t.desc),1)])],!0),m("div",null,[c(w,{"model-value":e.selectedCheckbox,value:t.value,"onUpdate:modelValue":s},null,8,["model-value","value"])])]),_:2},1032,["class"])]),_:2},1040))),128))]),_:3})):b("",!0)}},se=I(oe,[["__scopeId","data-v-0cda6519"]]),ce={__name:"DemoCustomInputCustomCheckboxesWithIcon",setup(r){const l=[{title:"Backup",desc:"Backup every file from your project.",value:"backup",icon:{icon:"tabler-server-2",size:"28"}},{title:"Encrypt",desc:"Translate your data to encrypted text.",value:"encrypt",icon:{icon:"tabler-ban",size:"28"}},{title:"Site Lock",desc:"Security tool to protect your website.",value:"site-lock",icon:{icon:"tabler-lock",size:"28"}}],e=C(["backup"]);return(d,s)=>{const o=se;return a(),u(o,{"selected-checkbox":k(e),"onUpdate:selectedCheckbox":s[0]||(s[0]=i=>x(e)?e.value=i:null),"checkbox-content":l,"grid-column":{sm:"4",cols:"12"}},null,8,["selected-checkbox"])}}},ne={__name:"DemoCustomInputCustomRadiosWithIcon",setup(r){const l=[{title:"Starter",desc:"For freelancers who work with multiple clients",value:"starter",icon:{icon:"tabler-rocket",size:"28"}},{title:"Personal",desc:"Join our talented community of talented digital agencies",value:"personal",icon:{icon:"tabler-star",size:"28"}},{title:"Enterprise",desc:"Team plan for free upto 15 seats",value:"enterprise",icon:{icon:"tabler-crown",size:"28"}}],e=C("starter");return(d,s)=>{const o=B;return a(),u(o,{"selected-radio":k(e),"onUpdate:selectedRadio":s[0]||(s[0]=i=>x(e)?e.value=i:null),"radio-content":l,"grid-column":{sm:"4",cols:"12"}},null,8,["selected-radio"])}}};const ae={class:"flex-grow-1"},le={class:"d-flex align-center mb-1"},re={class:"cr-title text-base"},ie={key:0,class:"text-disabled text-base"},ue={class:"text-sm mb-0"},de={__name:"CustomCheckboxes",props:{selectedCheckbox:{type:Array,required:!0},checkboxContent:{type:Array,required:!0},gridColumn:{type:null,required:!1}},emits:["update:selectedCheckbox"],setup(r,{emit:l}){const e=r,d=l,s=o=>{typeof o!="boolean"&&d("update:selectedCheckbox",o)};return(o,i)=>e.checkboxContent&&e.selectedCheckbox?(a(),u(y,{key:0},{default:n(()=>[(a(!0),h(R,null,$(e.checkboxContent,t=>(a(),u(p,f({key:t.title,ref_for:!0},r.gridColumn),{default:n(()=>[c(_,{class:W(["custom-input custom-checkbox rounded cursor-pointer",e.selectedCheckbox.includes(t.value)?"active":""])},{default:n(()=>[m("div",null,[c(w,{"model-value":e.selectedCheckbox,value:t.value,"onUpdate:modelValue":s},null,8,["model-value","value"])]),v(o.$slots,"default",{item:t},()=>[m("div",ae,[m("div",le,[m("h6",re,g(t.title),1),c(G),t.subtitle?(a(),h("span",ie,g(t.subtitle),1)):b("",!0)]),m("p",ue,g(t.desc),1)])],!0)]),_:2},1032,["class"])]),_:2},1040))),128))]),_:3})):b("",!0)}},me=I(de,[["__scopeId","data-v-6eb5735e"]]),pe={__name:"DemoCustomInputCustomCheckboxes",setup(r){const l=[{title:"Discount",subtitle:"20%",desc:"Wow! Get 20% off on your next purchase!",value:"discount"},{title:"Updates",subtitle:"Free",desc:"Get Updates regarding related products.",value:"updates"}],e=C(["discount"]);return(d,s)=>{const o=me;return a(),u(o,{"selected-checkbox":k(e),"onUpdate:selectedCheckbox":s[0]||(s[0]=i=>x(e)?e.value=i:null),"checkbox-content":l,"grid-column":{sm:"6",cols:"12"}},null,8,["selected-checkbox"])}}},be={__name:"DemoCustomInputCustomRadios",setup(r){const l=[{title:"Basic",subtitle:"Free",desc:"Get 1 project with 1 team member.",value:"basic"},{title:"Premium",subtitle:"$45.80",value:"premium",desc:"Get 5 projects with 5 team members."}],e=C("basic");return(d,s)=>{const o=F;return a(),u(o,{"selected-radio":k(e),"onUpdate:selectedRadio":s[0]||(s[0]=i=>x(e)?e.value=i:null),"radio-content":l,"grid-column":{sm:"6",cols:"12"}},null,8,["selected-radio"])}}},ge={ts:`<script setup lang="ts">
import type { CustomInputContent } from '@core/types'

const checkboxContent: CustomInputContent[] = [
  {
    title: 'Discount',
    subtitle: '20%',
    desc: 'Wow! Get 20% off on your next purchase!',
    value: 'discount',
  },
  {
    title: 'Updates',
    subtitle: 'Free',
    desc: 'Get Updates regarding related products.',
    value: 'updates',
  },
]

const selectedCheckbox = ref(['discount'])
<\/script>

<template>
  <CustomCheckboxes
    v-model:selected-checkbox="selectedCheckbox"
    :checkbox-content="checkboxContent"
    :grid-column="{ sm: '6', cols: '12' }"
  />
</template>
`,js:`<script setup>
const checkboxContent = [
  {
    title: 'Discount',
    subtitle: '20%',
    desc: 'Wow! Get 20% off on your next purchase!',
    value: 'discount',
  },
  {
    title: 'Updates',
    subtitle: 'Free',
    desc: 'Get Updates regarding related products.',
    value: 'updates',
  },
]

const selectedCheckbox = ref(['discount'])
<\/script>

<template>
  <CustomCheckboxes
    v-model:selected-checkbox="selectedCheckbox"
    :checkbox-content="checkboxContent"
    :grid-column="{ sm: '6', cols: '12' }"
  />
</template>
`},_e={ts:`<script setup lang="ts">
import type { CustomInputContent } from '@core/types'

const checkboxContent: CustomInputContent[] = [
  {
    title: 'Backup',
    desc: 'Backup every file from your project.',
    value: 'backup',
    icon: { icon: 'tabler-server-2', size: '28' },
  },
  {
    title: 'Encrypt',
    desc: 'Translate your data to encrypted text.',
    value: 'encrypt',
    icon: { icon: 'tabler-ban', size: '28' },
  },
  {
    title: 'Site Lock',
    desc: 'Security tool to protect your website.',
    value: 'site-lock',
    icon: { icon: 'tabler-lock', size: '28' },
  },
]

const selectedCheckbox = ref(['backup'])
<\/script>

<template>
  <CustomCheckboxesWithIcon
    v-model:selected-checkbox="selectedCheckbox"
    :checkbox-content="checkboxContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`,js:`<script setup>
const checkboxContent = [
  {
    title: 'Backup',
    desc: 'Backup every file from your project.',
    value: 'backup',
    icon: {
      icon: 'tabler-server-2',
      size: '28',
    },
  },
  {
    title: 'Encrypt',
    desc: 'Translate your data to encrypted text.',
    value: 'encrypt',
    icon: {
      icon: 'tabler-ban',
      size: '28',
    },
  },
  {
    title: 'Site Lock',
    desc: 'Security tool to protect your website.',
    value: 'site-lock',
    icon: {
      icon: 'tabler-lock',
      size: '28',
    },
  },
]

const selectedCheckbox = ref(['backup'])
<\/script>

<template>
  <CustomCheckboxesWithIcon
    v-model:selected-checkbox="selectedCheckbox"
    :checkbox-content="checkboxContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`},he={ts:`<script setup lang="ts">
import bg1 from '@images/pages/custom-checkbox-img-1.png'
import bg2 from '@images/pages/custom-checkbox-img-2.png'
import bg3 from '@images/pages/custom-checkbox-img-3.png'

const checkboxContent: { bgImage: string; value: string }[] = [
  {
    bgImage: bg1,
    value: 'basic',
  },
  {
    bgImage: bg2,
    value: 'premium',
  },
  {
    bgImage: bg3,
    value: 'enterprise',
  },
]

const selectedCheckbox = ref(['basic'])
<\/script>

<template>
  <CustomCheckboxesWithImage
    v-model:selected-checkbox="selectedCheckbox"
    :checkbox-content="checkboxContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`,js:`<script setup>
import bg1 from '@images/pages/custom-checkbox-img-1.png'
import bg2 from '@images/pages/custom-checkbox-img-2.png'
import bg3 from '@images/pages/custom-checkbox-img-3.png'

const checkboxContent = [
  {
    bgImage: bg1,
    value: 'basic',
  },
  {
    bgImage: bg2,
    value: 'premium',
  },
  {
    bgImage: bg3,
    value: 'enterprise',
  },
]

const selectedCheckbox = ref(['basic'])
<\/script>

<template>
  <CustomCheckboxesWithImage
    v-model:selected-checkbox="selectedCheckbox"
    :checkbox-content="checkboxContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`},Ce={ts:`<script setup lang="ts">
import type { CustomInputContent } from '@core/types'

const radioContent: CustomInputContent[] = [
  {
    title: 'Basic',
    subtitle: 'Free',
    desc: 'Get 1 project with 1 team member.',
    value: 'basic',
  },
  {
    title: 'Premium',
    subtitle: '$45.80',
    value: 'premium',
    desc: 'Get 5 projects with 5 team members.',
  },
]

const selectedRadio = ref('basic')
<\/script>

<template>
  <CustomRadios
    v-model:selected-radio="selectedRadio"
    :radio-content="radioContent"
    :grid-column="{ sm: '6', cols: '12' }"
  />
</template>
`,js:`<script setup>
const radioContent = [
  {
    title: 'Basic',
    subtitle: 'Free',
    desc: 'Get 1 project with 1 team member.',
    value: 'basic',
  },
  {
    title: 'Premium',
    subtitle: '$45.80',
    value: 'premium',
    desc: 'Get 5 projects with 5 team members.',
  },
]

const selectedRadio = ref('basic')
<\/script>

<template>
  <CustomRadios
    v-model:selected-radio="selectedRadio"
    :radio-content="radioContent"
    :grid-column="{ sm: '6', cols: '12' }"
  />
</template>
`},ke={ts:`<script setup lang="ts">
import type { CustomInputContent } from '@core/types'

const radioContent: CustomInputContent[] = [
  {
    title: 'Starter',
    desc: 'For freelancers who work with multiple clients',
    value: 'starter',
    icon: { icon: 'tabler-rocket', size: '28' },
  },
  {
    title: 'Personal',
    desc: 'Join our talented community of talented digital agencies',
    value: 'personal',
    icon: { icon: 'tabler-star', size: '28' },
  },
  {
    title: 'Enterprise',
    desc: 'Team plan for free upto 15 seats',
    value: 'enterprise',
    icon: { icon: 'tabler-crown', size: '28' },
  },
]

const selectedRadio = ref('starter')
<\/script>

<template>
  <CustomRadiosWithIcon
    v-model:selected-radio="selectedRadio"
    :radio-content="radioContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`,js:`<script setup>
const radioContent = [
  {
    title: 'Starter',
    desc: 'For freelancers who work with multiple clients',
    value: 'starter',
    icon: {
      icon: 'tabler-rocket',
      size: '28',
    },
  },
  {
    title: 'Personal',
    desc: 'Join our talented community of talented digital agencies',
    value: 'personal',
    icon: {
      icon: 'tabler-star',
      size: '28',
    },
  },
  {
    title: 'Enterprise',
    desc: 'Team plan for free upto 15 seats',
    value: 'enterprise',
    icon: {
      icon: 'tabler-crown',
      size: '28',
    },
  },
]

const selectedRadio = ref('starter')
<\/script>

<template>
  <CustomRadiosWithIcon
    v-model:selected-radio="selectedRadio"
    :radio-content="radioContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`},xe={ts:`<script setup lang="ts">
import bg1 from '@images/pages/custom-radio-img-1.png'
import bg2 from '@images/pages/custom-radio-img-2.png'
import bg3 from '@images/pages/custom-radio-img-3.png'

const radioContent: { bgImage: string; value: string }[] = [
  {
    bgImage: bg1,
    value: 'basic',
  },
  {
    bgImage: bg2,
    value: 'premium',
  },
  {
    bgImage: bg3,
    value: 'enterprise',
  },
]

const selectedRadio = ref('basic')
<\/script>

<template>
  <CustomRadiosWithImage
    v-model:selected-radio="selectedRadio"
    :radio-content="radioContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`,js:`<script setup>
import bg1 from '@images/pages/custom-radio-img-1.png'
import bg2 from '@images/pages/custom-radio-img-2.png'
import bg3 from '@images/pages/custom-radio-img-3.png'

const radioContent = [
  {
    bgImage: bg1,
    value: 'basic',
  },
  {
    bgImage: bg2,
    value: 'premium',
  },
  {
    bgImage: bg3,
    value: 'enterprise',
  },
]

const selectedRadio = ref('basic')
<\/script>

<template>
  <CustomRadiosWithImage
    v-model:selected-radio="selectedRadio"
    :radio-content="radioContent"
    :grid-column="{ sm: '4', cols: '12' }"
  />
</template>
`},Pe={__name:"custom-input",setup(r){return(l,e)=>{const d=be,s=q,o=pe,i=ne,t=ce,z=Y,S=O;return a(),u(y,null,{default:n(()=>[c(p,{cols:"12",md:"6"},{default:n(()=>[c(s,{title:"Custom Radios",code:Ce},{default:n(()=>[c(d)]),_:1},8,["code"])]),_:1}),c(p,{cols:"12",md:"6"},{default:n(()=>[c(s,{title:"Custom Checkboxes",code:ge},{default:n(()=>[c(o)]),_:1},8,["code"])]),_:1}),c(p,{cols:"12",md:"6"},{default:n(()=>[c(s,{title:"Custom Radios With Icon",code:ke},{default:n(()=>[c(i)]),_:1},8,["code"])]),_:1}),c(p,{cols:"12",md:"6"},{default:n(()=>[c(s,{title:"Custom Checkboxes With Icon",code:_e},{default:n(()=>[c(t)]),_:1},8,["code"])]),_:1}),c(p,{cols:"12",md:"6"},{default:n(()=>[c(s,{title:"Custom Radios With Image",code:xe},{default:n(()=>[c(z)]),_:1},8,["code"])]),_:1}),c(p,{cols:"12",md:"6"},{default:n(()=>[c(s,{title:"Custom Checkboxes With Image",code:he},{default:n(()=>[c(S)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{Pe as default};
