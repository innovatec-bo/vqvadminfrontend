import{_ as y}from"./AppTextField-bc3597c6.js";import{V as x}from"./VCol-ba474af9.js";import{V as b}from"./VCheckbox-d20e8622.js";import{V as v}from"./VRow-6bb6adbe.js";import{r as p,o as h,c as f,b as l,e as i,n,a0 as u,F as C,f as V,d as r,v as d,s as S,a3 as O,x as I,i as U}from"./index-e0f854fb.js";import{V as z}from"./VTooltip-388bebf1.js";import{_ as $}from"./AppCardCode-850538ca.js";import"./form-e3b9662b.js";import"./VTextField-11682da1.js";/* empty css                   */import"./VCounter-b2b420ec.js";import"./VImg-06c338d7.js";import"./VField-7b8c32e3.js";import"./easing-9f15041e.js";import"./VInput-93290e0f.js";import"./forwardRefs-8348545e.js";import"./VCheckboxBtn-42ffa7af.js";import"./VSelectionControl-398f4203.js";import"./VOverlay-f0a4b6b6.js";import"./lazy-35f55630.js";import"./scopeId-b072862c.js";import"./constants-0978c720.js";import"./VCard-18f293ae.js";import"./VAvatar-b3e45d40.js";import"./VCardText-7683b789.js";import"./VDivider-756cacd6.js";const A={__name:"DemoCheckboxInlineTextField",setup(k){const t=p(!0),e=p(!1);return(a,o)=>{const s=y;return h(),f(C,null,[l(v,null,{default:i(()=>[l(x,{sm:"1",cols:"2",class:"d-flex align-end"},{default:i(()=>[l(b,{modelValue:n(t),"onUpdate:modelValue":o[0]||(o[0]=c=>u(t)?t.value=c:null)},null,8,["modelValue"])]),_:1}),l(x,{sm:"11",cols:"10"},{default:i(()=>[l(s,{label:"Include files",placeholder:"Placeholder Text"})]),_:1})]),_:1}),l(v,null,{default:i(()=>[l(x,{cols:"2",sm:"1",class:"d-flex align-end"},{default:i(()=>[l(b,{modelValue:n(e),"onUpdate:modelValue":o[1]||(o[1]=c=>u(e)?e.value=c:null)},null,8,["modelValue"])]),_:1}),l(x,{cols:"10",sm:"11"},{default:i(()=>[l(s,{disabled:!n(e),label:"I only work if you check the box",placeholder:"Placeholder Text"},null,8,["disabled"])]),_:1})]),_:1})],64)}}},D={__name:"DemoCheckboxLabelSlot",setup(k){const t=p(!1);return(e,a)=>(h(),V(b,{modelValue:n(t),"onUpdate:modelValue":a[1]||(a[1]=o=>u(t)?t.value=o:null)},{label:i(()=>[r("div",null,[a[3]||(a[3]=d(" I agree that ")),l(z,{location:"bottom"},{activator:i(({props:o})=>[r("a",S({href:"https://vuetifyjs.com/",target:"_blank",rel:"noopener noreferrer"},o,{onClick:a[0]||(a[0]=O(()=>{},["stop"]))})," Vuetify ",16)]),default:i(()=>[a[2]||(a[2]=d(" Opens in new window "))]),_:1}),a[4]||(a[4]=d(" is awesome "))])]),_:1},8,["modelValue"]))}},J={class:"demo-space-x"},F={__name:"DemoCheckboxStates",setup(k){const t=p(!0),e=p(!0),a=p(!0),o=p(!1);return(s,c)=>(h(),f("div",J,[l(b,{modelValue:n(t),"onUpdate:modelValue":c[0]||(c[0]=m=>u(t)?t.value=m:null),label:"On"},null,8,["modelValue"]),l(b,{modelValue:n(o),"onUpdate:modelValue":c[1]||(c[1]=m=>u(o)?o.value=m:null),label:"Off"},null,8,["modelValue"]),l(b,{indeterminate:n(e),"onUpdate:indeterminate":c[2]||(c[2]=m=>u(e)?e.value=m:null),modelValue:n(e),"onUpdate:modelValue":c[3]||(c[3]=m=>u(e)?e.value=m:null),label:"Indeterminate"},null,8,["indeterminate","modelValue"]),l(b,{"model-value":n(a),disabled:"",label:"On disabled"},null,8,["model-value"]),l(b,{disabled:"",label:"Off disabled"})]))}},j={class:"demo-space-x"},E={__name:"DemoCheckboxCheckboxValue",setup(k){const t=p(1),e=p("Show");return(a,o)=>(h(),f("div",j,[l(b,{modelValue:n(t),"onUpdate:modelValue":o[0]||(o[0]=s=>u(t)?t.value=s:null),"true-value":1,"false-value":0,label:`${n(t).toString()}`},null,8,["modelValue","label"]),l(b,{modelValue:n(e),"onUpdate:modelValue":o[1]||(o[1]=s=>u(e)?e.value=s:null),"true-value":"Show","false-value":"Hide",color:"success",label:`${n(e).toString()}`},null,8,["modelValue","label"])]))}},P={class:"demo-space-x"},R={__name:"DemoCheckboxIcon",setup(k){const t=p(!0),e=p(!0),a=p(!0),o=s=>{const c=s.toString();return c.charAt(0).toUpperCase()+c.slice(1)};return(s,c)=>(h(),f("div",P,[l(b,{modelValue:n(t),"onUpdate:modelValue":c[0]||(c[0]=m=>u(t)?t.value=m:null),label:o(n(t)),"true-icon":"tabler-check","false-icon":"tabler-x"},null,8,["modelValue","label"]),l(b,{modelValue:n(e),"onUpdate:modelValue":c[1]||(c[1]=m=>u(e)?e.value=m:null),label:o(n(e)),"true-icon":"tabler-alarm","false-icon":"tabler-alarm",color:"success"},null,8,["modelValue","label"]),l(b,{modelValue:n(a),"onUpdate:modelValue":c[2]||(c[2]=m=>u(a)?a.value=m:null),label:o(n(a)),"true-icon":"tabler-check","false-icon":"tabler-circle-x",color:"error"},null,8,["modelValue","label"])]))}},B={class:"demo-space-x"},M={class:"mt-1"},H={__name:"DemoCheckboxModelAsArray",setup(k){const t=p(["John"]);return(e,a)=>(h(),f(C,null,[r("div",B,[l(b,{modelValue:n(t),"onUpdate:modelValue":a[0]||(a[0]=o=>u(t)?t.value=o:null),label:"John",value:"John"},null,8,["modelValue"]),l(b,{modelValue:n(t),"onUpdate:modelValue":a[1]||(a[1]=o=>u(t)?t.value=o:null),label:"Jacob",color:"success",value:"Jacob"},null,8,["modelValue"]),l(b,{modelValue:n(t),"onUpdate:modelValue":a[2]||(a[2]=o=>u(t)?t.value=o:null),label:"Johnson",color:"info",value:"Johnson"},null,8,["modelValue"])]),r("p",M,I(n(t)),1)],64))}},N={class:"demo-space-x"},W={__name:"DemoCheckboxColors",setup(k){const t=p(["Primary","Secondary","Success","Info","Warning","Error"]),e=p([]);return(a,o)=>(h(),f("div",N,[(h(!0),f(C,null,U(n(t),s=>(h(),V(b,{key:s,modelValue:n(e),"onUpdate:modelValue":o[0]||(o[0]=c=>u(e)?e.value=c:null),label:s,color:s.toLowerCase(),value:s},null,8,["modelValue","label","color","value"]))),128))]))}},Y={class:"demo-space-x"},q={__name:"DemoCheckboxDensity",setup(k){const t=p(!0),e=p(!1),a=o=>{const s=o.toString();return s.charAt(0).toUpperCase()+s.slice(1)};return(o,s)=>(h(),f("div",Y,[l(b,{modelValue:n(t),"onUpdate:modelValue":s[0]||(s[0]=c=>u(t)?t.value=c:null),density:"compact",label:a(n(t))},null,8,["modelValue","label"]),l(b,{modelValue:n(e),"onUpdate:modelValue":s[1]||(s[1]=c=>u(e)?e.value=c:null),density:"compact",label:a(n(e))},null,8,["modelValue","label"])]))}},G={class:"demo-space-x"},K={__name:"DemoCheckboxBasic",setup(k){const t=p(!0),e=p(!1),a=o=>{const s=o.toString();return s.charAt(0).toUpperCase()+s.slice(1)};return(o,s)=>(h(),f("div",G,[l(b,{modelValue:n(t),"onUpdate:modelValue":s[0]||(s[0]=c=>u(t)?t.value=c:null),label:a(n(t))},null,8,["modelValue","label"]),l(b,{modelValue:n(e),"onUpdate:modelValue":s[1]||(s[1]=c=>u(e)?e.value=c:null),label:a(n(e))},null,8,["modelValue","label"])]))}},Q={ts:`<script lang="ts" setup>
const checkboxOne = ref(true)
const checkboxTwo = ref(false)

const capitalizedLabel = (label: boolean) => {
  const convertLabelText = label.toString()

  return convertLabelText.charAt(0).toUpperCase() + convertLabelText.slice(1)
}
<\/script>

<template>
  <div class="demo-space-x">
    <VCheckbox
      v-model="checkboxOne"
      :label="capitalizedLabel(checkboxOne)"
    />

    <VCheckbox
      v-model="checkboxTwo"
      :label="capitalizedLabel(checkboxTwo)"
    />
  </div>
</template>
`,js:`<script setup>
const checkboxOne = ref(true)
const checkboxTwo = ref(false)

const capitalizedLabel = label => {
  const convertLabelText = label.toString()
  
  return convertLabelText.charAt(0).toUpperCase() + convertLabelText.slice(1)
}
<\/script>

<template>
  <div class="demo-space-x">
    <VCheckbox
      v-model="checkboxOne"
      :label="capitalizedLabel(checkboxOne)"
    />

    <VCheckbox
      v-model="checkboxTwo"
      :label="capitalizedLabel(checkboxTwo)"
    />
  </div>
</template>
`},X={ts:`<script lang="ts" setup>
const checkbox = ref(1)
const checkboxString = ref('Show')
<\/script>

<template>
  <div class="demo-space-x">
    <VCheckbox
      v-model="checkbox"
      :true-value="1"
      :false-value="0"
      :label="\`\${checkbox.toString()}\`"
    />

    <VCheckbox
      v-model="checkboxString"
      true-value="Show"
      false-value="Hide"
      color="success"
      :label="\`\${checkboxString.toString()}\`"
    />
  </div>
</template>
`,js:`<script setup>
const checkbox = ref(1)
const checkboxString = ref('Show')
<\/script>

<template>
  <div class="demo-space-x">
    <VCheckbox
      v-model="checkbox"
      :true-value="1"
      :false-value="0"
      :label="\`\${checkbox.toString()}\`"
    />

    <VCheckbox
      v-model="checkboxString"
      true-value="Show"
      false-value="Hide"
      color="success"
      :label="\`\${checkboxString.toString()}\`"
    />
  </div>
</template>
`},Z={ts:`<script lang="ts" setup>
const colorCheckbox = ref(['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Error'])
const selectedCheckbox = ref([])
<\/script>

<template>
  <div class="demo-space-x">
    <VCheckbox
      v-for="color in colorCheckbox"
      :key="color"
      v-model="selectedCheckbox"
      :label="color"
      :color="color.toLowerCase()"
      :value="color"
    />
  </div>
</template>
`,js:`<script setup>
const colorCheckbox = ref([
  'Primary',
  'Secondary',
  'Success',
  'Info',
  'Warning',
  'Error',
])

const selectedCheckbox = ref([])
<\/script>

<template>
  <div class="demo-space-x">
    <VCheckbox
      v-for="color in colorCheckbox"
      :key="color"
      v-model="selectedCheckbox"
      :label="color"
      :color="color.toLowerCase()"
      :value="color"
    />
  </div>
</template>
`},ee={ts:`<script lang="ts" setup>
const checkboxOne = ref(true)
const checkboxTwo = ref(false)

const capitalizedLabel = (label: boolean) => {
  const convertLabelText = label.toString()

  return convertLabelText.charAt(0).toUpperCase() + convertLabelText.slice(1)
}
<\/script>

<template>
  <div class="demo-space-x">
    <VCheckbox
      v-model="checkboxOne"
      density="compact"
      :label="capitalizedLabel(checkboxOne)"
    />

    <VCheckbox
      v-model="checkboxTwo"
      density="compact"
      :label="capitalizedLabel(checkboxTwo)"
    />
  </div>
</template>
`,js:`<script setup>
const checkboxOne = ref(true)
const checkboxTwo = ref(false)

const capitalizedLabel = label => {
  const convertLabelText = label.toString()
  
  return convertLabelText.charAt(0).toUpperCase() + convertLabelText.slice(1)
}
<\/script>

<template>
  <div class="demo-space-x">
    <VCheckbox
      v-model="checkboxOne"
      density="compact"
      :label="capitalizedLabel(checkboxOne)"
    />

    <VCheckbox
      v-model="checkboxTwo"
      density="compact"
      :label="capitalizedLabel(checkboxTwo)"
    />
  </div>
</template>
`},le={ts:`<script lang="ts" setup>
const toggleCheckboxOne = ref(true)
const toggleCheckboxTwo = ref(true)
const toggleCheckboxThree = ref(true)

const capitalizedLabel = (label: boolean) => {
  const convertLabelText = label.toString()

  return convertLabelText.charAt(0).toUpperCase() + convertLabelText.slice(1)
}
<\/script>

<template>
  <div class="demo-space-x">
    <VCheckbox
      v-model="toggleCheckboxOne"
      :label="capitalizedLabel(toggleCheckboxOne)"
      true-icon="tabler-check"
      false-icon="tabler-x"
    />

    <VCheckbox
      v-model="toggleCheckboxTwo"
      :label="capitalizedLabel(toggleCheckboxTwo)"
      true-icon="tabler-alarm"
      false-icon="tabler-alarm"
      color="success"
    />

    <VCheckbox
      v-model="toggleCheckboxThree"
      :label="capitalizedLabel(toggleCheckboxThree)"
      true-icon="tabler-check"
      false-icon="tabler-circle-x"
      color="error"
    />
  </div>
</template>
`,js:`<script setup>
const toggleCheckboxOne = ref(true)
const toggleCheckboxTwo = ref(true)
const toggleCheckboxThree = ref(true)

const capitalizedLabel = label => {
  const convertLabelText = label.toString()
  
  return convertLabelText.charAt(0).toUpperCase() + convertLabelText.slice(1)
}
<\/script>

<template>
  <div class="demo-space-x">
    <VCheckbox
      v-model="toggleCheckboxOne"
      :label="capitalizedLabel(toggleCheckboxOne)"
      true-icon="tabler-check"
      false-icon="tabler-x"
    />

    <VCheckbox
      v-model="toggleCheckboxTwo"
      :label="capitalizedLabel(toggleCheckboxTwo)"
      true-icon="tabler-alarm"
      false-icon="tabler-alarm"
      color="success"
    />

    <VCheckbox
      v-model="toggleCheckboxThree"
      :label="capitalizedLabel(toggleCheckboxThree)"
      true-icon="tabler-check"
      false-icon="tabler-circle-x"
      color="error"
    />
  </div>
</template>
`},oe={ts:`<script lang="ts" setup>
const includeFiles = ref(true)
const isInputEnabled = ref(false)
<\/script>

<template>
  <VRow>
    <VCol
      sm="1"
      cols="2"
      class="d-flex align-end"
    >
      <VCheckbox v-model="includeFiles" />
    </VCol>

    <VCol
      sm="11"
      cols="10"
    >
      <AppTextField
        label="Include files"
        placeholder="Placeholder Text"
      />
    </VCol>
  </VRow>

  <VRow>
    <VCol
      cols="2"
      sm="1"
      class="d-flex align-end"
    >
      <VCheckbox v-model="isInputEnabled" />
    </VCol>

    <VCol
      cols="10"
      sm="11"
    >
      <AppTextField
        :disabled="!isInputEnabled"
        label="I only work if you check the box"
        placeholder="Placeholder Text"
      />
    </VCol>
  </VRow>
</template>
`,js:`<script setup>
const includeFiles = ref(true)
const isInputEnabled = ref(false)
<\/script>

<template>
  <VRow>
    <VCol
      sm="1"
      cols="2"
      class="d-flex align-end"
    >
      <VCheckbox v-model="includeFiles" />
    </VCol>

    <VCol
      sm="11"
      cols="10"
    >
      <AppTextField
        label="Include files"
        placeholder="Placeholder Text"
      />
    </VCol>
  </VRow>

  <VRow>
    <VCol
      cols="2"
      sm="1"
      class="d-flex align-end"
    >
      <VCheckbox v-model="isInputEnabled" />
    </VCol>

    <VCol
      cols="10"
      sm="11"
    >
      <AppTextField
        :disabled="!isInputEnabled"
        label="I only work if you check the box"
        placeholder="Placeholder Text"
      />
    </VCol>
  </VRow>
</template>
`},te={ts:`<script lang="ts" setup>
const checkbox = ref(false)
<\/script>

<template>
  <VCheckbox v-model="checkbox">
    <template #label>
      <div>
        I agree that
        <VTooltip location="bottom">
          <template #activator="{ props }">
            <a
              href="https://vuetifyjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              v-bind="props"
              @click.stop
            >
              Vuetify
            </a>
          </template>
          Opens in new window
        </VTooltip>
        is awesome
      </div>
    </template>
  </VCheckbox>
</template>
`,js:`<script setup>
const checkbox = ref(false)
<\/script>

<template>
  <VCheckbox v-model="checkbox">
    <template #label>
      <div>
        I agree that
        <VTooltip location="bottom">
          <template #activator="{ props }">
            <a
              href="https://vuetifyjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              v-bind="props"
              @click.stop
            >
              Vuetify
            </a>
          </template>
          Opens in new window
        </VTooltip>
        is awesome
      </div>
    </template>
  </VCheckbox>
</template>
`},ae={ts:`<script lang="ts" setup>
const selected = ref(['John'])
<\/script>

<template>
  <div class="demo-space-x">
    <VCheckbox
      v-model="selected"
      label="John"
      value="John"
    />

    <VCheckbox
      v-model="selected"
      label="Jacob"
      color="success"
      value="Jacob"
    />

    <VCheckbox
      v-model="selected"
      label="Johnson"
      color="info"
      value="Johnson"
    />
  </div>

  <p class="mt-1">
    {{ selected }}
  </p>
</template>
`,js:`<script setup>
const selected = ref(['John'])
<\/script>

<template>
  <div class="demo-space-x">
    <VCheckbox
      v-model="selected"
      label="John"
      value="John"
    />

    <VCheckbox
      v-model="selected"
      label="Jacob"
      color="success"
      value="Jacob"
    />

    <VCheckbox
      v-model="selected"
      label="Johnson"
      color="info"
      value="Johnson"
    />
  </div>

  <p class="mt-1">
    {{ selected }}
  </p>
</template>
`},ce={ts:`<script setup lang="ts">
const toggleCheckbox = ref(true)
const toggleIndeterminateCheckbox = ref(true)
const disabledCheckbox = ref(true)
const toggleOffCheckbox = ref(false)
<\/script>

<template>
  <div class="demo-space-x">
    <VCheckbox
      v-model="toggleCheckbox"
      label="On"
    />

    <VCheckbox
      v-model="toggleOffCheckbox"
      label="Off"
    />

    <VCheckbox
      v-model:indeterminate="toggleIndeterminateCheckbox"
      v-model="toggleIndeterminateCheckbox"
      label="Indeterminate"
    />

    <VCheckbox
      :model-value="disabledCheckbox"
      disabled
      label="On disabled"
    />

    <VCheckbox
      disabled
      label="Off disabled"
    />
  </div>
</template>
`,js:`<script setup>
const toggleCheckbox = ref(true)
const toggleIndeterminateCheckbox = ref(true)
const disabledCheckbox = ref(true)
const toggleOffCheckbox = ref(false)
<\/script>

<template>
  <div class="demo-space-x">
    <VCheckbox
      v-model="toggleCheckbox"
      label="On"
    />

    <VCheckbox
      v-model="toggleOffCheckbox"
      label="Off"
    />

    <VCheckbox
      v-model:indeterminate="toggleIndeterminateCheckbox"
      v-model="toggleIndeterminateCheckbox"
      label="Indeterminate"
    />

    <VCheckbox
      :model-value="disabledCheckbox"
      disabled
      label="On disabled"
    />

    <VCheckbox
      disabled
      label="Off disabled"
    />
  </div>
</template>
`},ze={__name:"checkbox",setup(k){return(t,e)=>{const a=K,o=$,s=q,c=W,m=H,g=R,_=E,T=F,w=D,L=A;return h(),V(v,{class:"match-height"},{default:i(()=>[l(x,{cols:"12",md:"6"},{default:i(()=>[l(o,{title:"Basic",code:Q},{default:i(()=>[e[0]||(e[0]=r("p",null,[r("code",null,"v-checkbox"),d(" in its simplest form provides a toggle between 2 values.")],-1)),l(a)]),_:1},8,["code"])]),_:1}),l(x,{cols:"12",md:"6"},{default:i(()=>[l(o,{title:"Density",code:ee},{default:i(()=>[e[1]||(e[1]=r("p",null,[d("Use "),r("code",null,"density"),d(" prop to reduces the input height. Available options are: "),r("code",null,"default"),d(", "),r("code",null,"comfortable"),d(", and "),r("code",null,"compact"),d(".")],-1)),l(s)]),_:1},8,["code"])]),_:1}),l(x,{cols:"12",md:"6"},{default:i(()=>[l(o,{title:"Colors",code:Z},{default:i(()=>[e[2]||(e[2]=r("p",null,[d("Checkboxes can be colored by using any of the builtin colors and contextual names using the "),r("code",null,"color"),d(" prop.")],-1)),l(c)]),_:1},8,["code"])]),_:1}),l(x,{cols:"12",md:"6"},{default:i(()=>[l(o,{title:"Model as array",code:ae},{default:i(()=>[e[3]||(e[3]=r("p",null,[d("Multiple "),r("code",null,"v-checkbox"),d("'s can share the same "),r("code",null,"v-model"),d(" by using an array.")],-1)),l(m)]),_:1},8,["code"])]),_:1}),l(x,{cols:"12",md:"6"},{default:i(()=>[l(o,{title:"Icon",code:le},{default:i(()=>[e[4]||(e[4]=r("p",null,[d("Use "),r("code",null,"false-icon"),d(" and "),r("code",null,"true-icon"),d(" prop to change the icon on the checkbox.")],-1)),l(g)]),_:1},8,["code"])]),_:1}),l(x,{cols:"12",md:"6"},{default:i(()=>[l(o,{title:"Checkbox Value",code:X},{default:i(()=>[e[5]||(e[5]=r("p",null,[d("Use "),r("code",null,"false-value"),d(" and "),r("code",null,"true-value"),d(" prop to sets value for truthy and falsy state")],-1)),l(_)]),_:1},8,["code"])]),_:1}),l(x,{cols:"12",md:"6"},{default:i(()=>[l(o,{title:"States",code:ce},{default:i(()=>[e[6]||(e[6]=r("p",null,[r("code",null,"v-checkbox"),d(" can have different states such as "),r("code",null,"default"),d(", "),r("code",null,"disabled"),d(", and "),r("code",null,"indeterminate"),d(".")],-1)),l(T)]),_:1},8,["code"])]),_:1}),l(x,{cols:"12",md:"6"},{default:i(()=>[l(o,{title:"Label Slot",code:te},{default:i(()=>[e[7]||(e[7]=r("p",null,[d("Checkbox labels can be defined in "),r("code",null,"label"),d(" slot - that will allow to use HTML content.")],-1)),l(w)]),_:1},8,["code"])]),_:1}),l(x,{cols:"12",md:"6"},{default:i(()=>[l(o,{title:"Inline text-field",code:oe},{default:i(()=>[e[8]||(e[8]=r("p",null,[d("You can place "),r("code",null,"v-checkbox"),d(" in line with other components such as "),r("code",null,"v-text-field"),d(".")],-1)),l(L)]),_:1},8,["code"])]),_:1})]),_:1})}}};export{ze as default};
