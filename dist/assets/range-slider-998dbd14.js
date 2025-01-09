import{m as Z,u as ee,a as le,V as ae,b as Y,g as E}from"./VSliderTrack-493685b6.js";import{m as te,V as q}from"./VInput-41cea425.js";import{m as se,u as oe,V as ue}from"./form-32d3f16f.js";import{aR as ne,aN as re,r as V,bS as ie,bb as de,a2 as G,b2 as ce,b as t,F as me,s as pe,o as h,f as R,n as $,a0 as w,e as d,$ as ve,d as i,v}from"./index-7ea6e93c.js";import{_ as be}from"./AppCardCode-e9a31227.js";import{V as fe}from"./VRow-64677d26.js";import{V as k}from"./VCol-a5be9b19.js";import"./VImg-08f625e0.js";import"./constants-71880aa6.js";import"./VCard-ab6043fc.js";import"./VAvatar-04485412.js";import"./VCardText-d9bf8dee.js";import"./VDivider-b8340ea2.js";const Ve=ne({...se(),...te(),...Z(),strict:Boolean,modelValue:{type:Array,default:()=>[0,0]}},"VRangeSlider"),x=re()({name:"VRangeSlider",props:Ve(),emits:{"update:focused":l=>!0,"update:modelValue":l=>!0,end:l=>!0,start:l=>!0},setup(l,o){let{slots:e,emit:u}=o;const a=V(),n=V(),g=V(),{rtlClasses:M}=ie();function j(c){if(!a.value||!n.value)return;const b=E(c,a.value.$el,l.direction),m=E(c,n.value.$el,l.direction),r=Math.abs(b),p=Math.abs(m);return r<p||r===p&&b<0?a.value.$el:n.value.$el}const U=ee(l),s=de(l,"modelValue",void 0,c=>c!=null&&c.length?c.map(b=>U.roundValue(b)):[0,0]),{activeThumbRef:f,hasLabels:H,max:z,min:I,mousePressed:J,onSliderMousedown:K,onSliderTouchstart:Q,position:L,trackContainerRef:X}=le({props:l,steps:U,onSliderStart:()=>{u("start",s.value)},onSliderEnd:c=>{var r;let{value:b}=c;const m=f.value===((r=a.value)==null?void 0:r.$el)?[b,s.value[1]]:[s.value[0],b];!l.strict&&m[0]<m[1]&&(s.value=m),u("end",s.value)},onSliderMove:c=>{var p,_,y,D;let{value:b}=c;const[m,r]=s.value;!l.strict&&m===r&&m!==I.value&&(f.value=b>m?(p=n.value)==null?void 0:p.$el:(_=a.value)==null?void 0:_.$el,(y=f.value)==null||y.focus()),f.value===((D=a.value)==null?void 0:D.$el)?s.value=[Math.min(b,r),r]:s.value=[m,Math.max(m,b)]},getActiveThumb:j}),{isFocused:B,focus:N,blur:A}=oe(l),O=G(()=>L(s.value[0])),W=G(()=>L(s.value[1]));return ce(()=>{const[c,b]=q.filterProps(l),m=!!(l.label||e.label||e.prepend);return t(q,pe({class:["v-slider","v-range-slider",{"v-slider--has-labels":!!e["tick-label"]||H.value,"v-slider--focused":B.value,"v-slider--pressed":J.value,"v-slider--disabled":l.disabled},M.value,l.class],style:l.style,ref:g},c,{focused:B.value}),{...e,prepend:m?r=>{var p,_;return t(me,null,[((p=e.label)==null?void 0:p.call(e,r))??(l.label?t(ue,{class:"v-slider__label",text:l.label},null):void 0),(_=e.prepend)==null?void 0:_.call(e,r)])}:void 0,default:r=>{var y,D;let{id:p,messagesId:_}=r;return t("div",{class:"v-slider__container",onMousedown:K,onTouchstartPassive:Q},[t("input",{id:`${p.value}_start`,name:l.name||p.value,disabled:!!l.disabled,readonly:!!l.readonly,tabindex:"-1",value:s.value[0]},null),t("input",{id:`${p.value}_stop`,name:l.name||p.value,disabled:!!l.disabled,readonly:!!l.readonly,tabindex:"-1",value:s.value[1]},null),t(ae,{ref:X,start:O.value,stop:W.value},{"tick-label":e["tick-label"]}),t(Y,{ref:a,"aria-describedby":_.value,focused:B&&f.value===((y=a.value)==null?void 0:y.$el),modelValue:s.value[0],"onUpdate:modelValue":S=>s.value=[S,s.value[1]],onFocus:S=>{var T,F,C,P;N(),f.value=(T=a.value)==null?void 0:T.$el,s.value[0]===s.value[1]&&s.value[1]===I.value&&S.relatedTarget!==((F=n.value)==null?void 0:F.$el)&&((C=a.value)==null||C.$el.blur(),(P=n.value)==null||P.$el.focus())},onBlur:()=>{A(),f.value=void 0},min:I.value,max:s.value[1],position:O.value},{"thumb-label":e["thumb-label"]}),t(Y,{ref:n,"aria-describedby":_.value,focused:B&&f.value===((D=n.value)==null?void 0:D.$el),modelValue:s.value[1],"onUpdate:modelValue":S=>s.value=[s.value[0],S],onFocus:S=>{var T,F,C,P;N(),f.value=(T=n.value)==null?void 0:T.$el,s.value[0]===s.value[1]&&s.value[0]===z.value&&S.relatedTarget!==((F=a.value)==null?void 0:F.$el)&&((C=n.value)==null||C.$el.blur(),(P=a.value)==null||P.$el.focus())},onBlur:()=>{A(),f.value=void 0},min:s.value[0],max:z.value,position:W.value},{"thumb-label":e["thumb-label"]})])}})}),{}}}),_e={__name:"DemoRangeSliderVertical",setup(l){const o=V([20,40]);return(e,u)=>(h(),R(x,{modelValue:$(o),"onUpdate:modelValue":u[0]||(u[0]=a=>w(o)?o.value=a:null),direction:"vertical"},null,8,["modelValue"]))}},ge={__name:"DemoRangeSliderThumbLabel",setup(l){const o=["Winter","Spring","Summer","Fall"],e=["tabler-snowflake","tabler-leaf","tabler-flame","tabler-droplet"],u=V([1,2]);return(a,n)=>(h(),R(x,{modelValue:$(u),"onUpdate:modelValue":n[0]||(n[0]=g=>w(u)?u.value=g:null),tick:o,min:"0",max:"3",step:1,"show-ticks":"always","thumb-label":"","tick-size":"4"},{"thumb-label":d(({modelValue:g})=>[t(ve,{icon:e[g]},null,8,["icon"])]),_:1},8,["modelValue"]))}},Se={__name:"DemoRangeSliderStep",setup(l){const o=V([20,40]);return(e,u)=>(h(),R(x,{modelValue:$(o),"onUpdate:modelValue":u[0]||(u[0]=a=>w(o)?o.value=a:null),step:"10"},null,8,["modelValue"]))}},he={__name:"DemoRangeSliderColor",setup(l){const o=V([10,60]);return(e,u)=>(h(),R(x,{modelValue:$(o),"onUpdate:modelValue":u[0]||(u[0]=a=>w(o)?o.value=a:null),color:"success","track-color":"warning"},null,8,["modelValue"]))}},Re={__name:"DemoRangeSliderDisabled",setup(l){const o=V([30,60]);return(e,u)=>(h(),R(x,{modelValue:$(o),"onUpdate:modelValue":u[0]||(u[0]=a=>w(o)?o.value=a:null),disabled:"",label:"Disabled"},null,8,["modelValue"]))}},ke={__name:"DemoRangeSliderBasic",setup(l){const o=V([10,60]);return(e,u)=>(h(),R(x,{modelValue:$(o),"onUpdate:modelValue":u[0]||(u[0]=a=>w(o)?o.value=a:null)},null,8,["modelValue"]))}},$e={ts:`<script setup lang="ts">
const sliderValues = ref([10, 60])
<\/script>

<template>
  <VRangeSlider v-model="sliderValues" />
</template>
`,js:`<script setup>
const sliderValues = ref([
  10,
  60,
])
<\/script>

<template>
  <VRangeSlider v-model="sliderValues" />
</template>
`},we={ts:`<script lang="ts" setup>
const sliderValues = ref([10, 60])
<\/script>

<template>
  <VRangeSlider
    v-model="sliderValues"
    color="success"
    track-color="warning"
  />
</template>
`,js:`<script setup>
const sliderValues = ref([
  10,
  60,
])
<\/script>

<template>
  <VRangeSlider
    v-model="sliderValues"
    color="success"
    track-color="warning"
  />
</template>
`},xe={ts:`<script lang="ts" setup>
const slidersValues = ref([30, 60])
<\/script>

<template>
  <VRangeSlider
    v-model="slidersValues"
    disabled
    label="Disabled"
  />
</template>
`,js:`<script setup>
const slidersValues = ref([
  30,
  60,
])
<\/script>

<template>
  <VRangeSlider
    v-model="slidersValues"
    disabled
    label="Disabled"
  />
</template>
`},ye={ts:`<script lang="ts" setup>
const sliderValues = ref([20, 40])
<\/script>

<template>
  <VRangeSlider
    v-model="sliderValues"
    step="10"
  />
</template>
`,js:`<script setup>
const sliderValues = ref([
  20,
  40,
])
<\/script>

<template>
  <VRangeSlider
    v-model="sliderValues"
    step="10"
  />
</template>
`},De={ts:`<script lang="ts" setup>
const seasons = ['Winter', 'Spring', 'Summer', 'Fall']
const icons = ['tabler-snowflake', 'tabler-leaf', 'tabler-flame', 'tabler-droplet']
const sliderValues = ref([1, 2])
<\/script>

<template>
  <VRangeSlider
    v-model="sliderValues"
    :tick="seasons"
    min="0"
    max="3"
    :step="1"
    show-ticks="always"
    thumb-label
    tick-size="4"
  >
    <template #thumb-label="{ modelValue }">
      <VIcon :icon="icons[modelValue]" />
    </template>
  </VRangeSlider>
</template>
`,js:`<script setup>
const seasons = [
  'Winter',
  'Spring',
  'Summer',
  'Fall',
]

const icons = [
  'tabler-snowflake',
  'tabler-leaf',
  'tabler-flame',
  'tabler-droplet',
]

const sliderValues = ref([
  1,
  2,
])
<\/script>

<template>
  <VRangeSlider
    v-model="sliderValues"
    :tick="seasons"
    min="0"
    max="3"
    :step="1"
    show-ticks="always"
    thumb-label
    tick-size="4"
  >
    <template #thumb-label="{ modelValue }">
      <VIcon :icon="icons[modelValue]" />
    </template>
  </VRangeSlider>
</template>
`},Te={ts:`<script lang="ts" setup>
const sliderValues = ref([20, 40])
<\/script>

<template>
  <VRangeSlider
    v-model="sliderValues"
    direction="vertical"
  />
</template>
`,js:`<script setup>
const sliderValues = ref([
  20,
  40,
])
<\/script>

<template>
  <VRangeSlider
    v-model="sliderValues"
    direction="vertical"
  />
</template>
`},We={__name:"range-slider",setup(l){return(o,e)=>{const u=ke,a=be,n=Re,g=he,M=Se,j=ge,U=_e;return h(),R(fe,null,{default:d(()=>[t(k,{cols:"12",md:"6"},{default:d(()=>[t(a,{title:"Basic",code:$e},{default:d(()=>[e[0]||(e[0]=i("p",null,[v("The "),i("code",null,"v-slider"),v(" component is a better visualization of the number input.")],-1)),t(u)]),_:1},8,["code"])]),_:1}),t(k,{cols:"12",md:"6"},{default:d(()=>[t(a,{title:"Disabled",code:xe},{default:d(()=>[e[1]||(e[1]=i("p",null,[v("You cannot interact with "),i("code",null,"disabled"),v(" sliders.")],-1)),t(n)]),_:1},8,["code"])]),_:1}),t(k,{cols:"12",md:"6"},{default:d(()=>[t(a,{title:"Color",code:we},{default:d(()=>[e[2]||(e[2]=i("p",null,[v("Use "),i("code",null,"color"),v(" prop to the sets the slider color. "),i("code",null,"track-color"),v(" prop to sets the color of slider's unfilled track.")],-1)),t(g)]),_:1},8,["code"])]),_:1}),t(k,{cols:"12",md:"6"},{default:d(()=>[t(a,{title:"Step",code:ye},{default:d(()=>[e[3]||(e[3]=i("p",null,[i("code",null,"v-range-slider"),v(" can have steps other than 1. This can be helpful for some applications where you need to adjust values with more or less accuracy.")],-1)),t(M)]),_:1},8,["code"])]),_:1}),t(k,{cols:"12",md:"6"},{default:d(()=>[t(a,{title:"Thumb label",code:De},{default:d(()=>[e[4]||(e[4]=i("p",null,[v(" Using the "),i("code",null,"tick-labels"),v(" prop along with the "),i("code",null,"thumb-label"),v(" slot, you can create a very customized solution. ")],-1)),t(j)]),_:1},8,["code"])]),_:1}),t(k,{cols:"12",md:"6"},{default:d(()=>[t(a,{title:"Vertical",code:Te},{default:d(()=>[e[5]||(e[5]=i("p",null,[v("You can use the "),i("code",null,"vertical"),v(" prop to switch sliders to a vertical orientation. If you need to change the height of the slider, use css.")],-1)),t(U)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{We as default};
