import{aS as F,bz as R,bX as A,aV as j,aZ as L,aY as M,bb as q,aO as H,bc as z,bB as N,bZ as J,a_ as W,a$ as Z,b1 as G,r as d,w as O,H as X,b3 as Y,b as t,b4 as K,be as Q,s as D,o as _,c as x,e,v as n,a4 as u,n as S,a0 as p,$ as B,F as T,f as h,d as V}from"./index-0123bc36.js";import{m as aa,V as U}from"./VOverlay-a6e1ee5a.js";import{f as ta}from"./forwardRefs-8348545e.js";import{u as ea}from"./scopeId-2b90247d.js";import{_ as na}from"./AppCardCode-45732b81.js";import{V as la}from"./VRow-c6bd688f.js";import{V as I}from"./VCol-5027ef25.js";import"./easing-9f15041e.js";import"./lazy-0901566a.js";import"./VImg-3995d93c.js";import"./constants-0978c720.js";import"./VCard-15f8e418.js";import"./VAvatar-7cd0ce7e.js";import"./VCardText-e3614485.js";import"./VDivider-742a60be.js";const ia=F({multiLine:Boolean,timeout:{type:[Number,String],default:5e3},vertical:Boolean,...R({location:"bottom"}),...A(),...j(),...L(),...M(),...q(aa({transition:"v-snackbar-transition"}),["persistent","noClickAnimation","scrim","scrollStrategy"])},"VSnackbar"),f=H()({name:"VSnackbar",props:ia(),emits:{"update:modelValue":k=>!0},setup(k,o){let{slots:s}=o;const a=z(k,"modelValue"),{locationStyles:r}=N(k),{positionClasses:c}=J(k),{scopeId:v}=ea(),{themeClasses:i}=W(k),{colorClasses:m,colorStyles:g,variantClasses:w}=Z(k),{roundedClasses:l}=G(k),b=d();O(a,C),O(()=>k.timeout,C),X(()=>{a.value&&C()});let $=-1;function C(){window.clearTimeout($);const y=Number(k.timeout);!a.value||y===-1||($=window.setTimeout(()=>{a.value=!1},y))}function P(){window.clearTimeout($)}return Y(()=>{const[y]=U.filterProps(k);return t(U,D({ref:b,class:["v-snackbar",{"v-snackbar--active":a.value,"v-snackbar--multi-line":k.multiLine&&!k.vertical,"v-snackbar--vertical":k.vertical},c.value,k.class],style:k.style},y,{modelValue:a.value,"onUpdate:modelValue":E=>a.value=E,contentProps:D({class:["v-snackbar__wrapper",i.value,m.value,l.value,w.value],style:[r.value,g.value],onPointerenter:P,onPointerleave:C},y.contentProps),persistent:!0,noClickAnimation:!0,scrim:!1,scrollStrategy:"none",_disableGlobalStack:!0},v),{default:()=>[K(!1,"v-snackbar"),s.default&&t("div",{class:"v-snackbar__content",role:"status","aria-live":"polite"},[s.default()]),s.actions&&t(Q,{defaults:{VBtn:{variant:"text",ripple:!1}}},{default:()=>[t("div",{class:"v-snackbar__actions"},[s.actions()])]})],activator:s.activator})}),ta({},b)}}),oa={class:"demo-space-x"},sa={__name:"DemoSnackbarTransition",setup(k){const o=d(!1),s=d(!1),a=d(!1);return(r,c)=>(_(),x("div",oa,[t(u,{onClick:c[0]||(c[0]=v=>o.value=!0)},{default:e(()=>c[6]||(c[6]=[n(" fade snackbar ",-1)])),_:1,__:[6]}),t(f,{modelValue:S(o),"onUpdate:modelValue":c[1]||(c[1]=v=>p(o)?o.value=v:null),transition:"fade-transition",location:"top start"},{default:e(()=>c[7]||(c[7]=[n(" I'm a fade transition snackbar. ",-1)])),_:1,__:[7]},8,["modelValue"]),t(u,{onClick:c[2]||(c[2]=v=>s.value=!0)},{default:e(()=>c[8]||(c[8]=[n(" Scale snackbar ",-1)])),_:1,__:[8]}),t(f,{modelValue:S(s),"onUpdate:modelValue":c[3]||(c[3]=v=>p(s)?s.value=v:null),transition:"scale-transition",location:"bottom end"},{default:e(()=>c[9]||(c[9]=[n(" I'm a scale transition snackbar. ",-1)])),_:1,__:[9]},8,["modelValue"]),t(u,{onClick:c[4]||(c[4]=v=>a.value=!0)},{default:e(()=>c[10]||(c[10]=[n(" scroll y reverse ",-1)])),_:1,__:[10]}),t(f,{modelValue:S(a),"onUpdate:modelValue":c[5]||(c[5]=v=>p(a)?a.value=v:null),transition:"scroll-y-reverse-transition",location:"top end"},{default:e(()=>c[11]||(c[11]=[n(" I'm a scroll y reverse transition snackbar. ",-1)])),_:1,__:[11]},8,["modelValue"])]))}},ra={class:"demo-space-x"},ca={__name:"DemoSnackbarVariants",setup(k){const o=d(!1),s=d(!1),a=d(!1),r=d(!1),c=d(!1);return(v,i)=>(_(),x("div",ra,[t(u,{onClick:i[0]||(i[0]=m=>o.value=!0)},{default:e(()=>i[10]||(i[10]=[n(" Default ",-1)])),_:1,__:[10]}),t(f,{modelValue:S(o),"onUpdate:modelValue":i[1]||(i[1]=m=>p(o)?o.value=m:null),location:"top start"},{default:e(()=>i[11]||(i[11]=[n(" Jelly chocolate bar candy canes apple pie. ",-1)])),_:1,__:[11]},8,["modelValue"]),t(u,{onClick:i[2]||(i[2]=m=>s.value=!0)},{default:e(()=>i[12]||(i[12]=[n(" tonal ",-1)])),_:1,__:[12]}),t(f,{modelValue:S(s),"onUpdate:modelValue":i[3]||(i[3]=m=>p(s)?s.value=m:null),location:"top end",variant:"tonal"},{default:e(()=>i[13]||(i[13]=[n(" Ice cream cake candy canes. ",-1)])),_:1,__:[13]},8,["modelValue"]),t(u,{onClick:i[4]||(i[4]=m=>a.value=!0)},{default:e(()=>i[14]||(i[14]=[n(" Text ",-1)])),_:1,__:[14]}),t(f,{modelValue:S(a),"onUpdate:modelValue":i[5]||(i[5]=m=>p(a)?a.value=m:null),location:"end center",variant:"text"},{default:e(()=>i[15]||(i[15]=[n(" Pie icing biscuit soufflé liquorice topping. ",-1)])),_:1,__:[15]},8,["modelValue"]),t(u,{onClick:i[6]||(i[6]=m=>r.value=!0)},{default:e(()=>i[16]||(i[16]=[n(" Outlined ",-1)])),_:1,__:[16]}),t(f,{modelValue:S(r),"onUpdate:modelValue":i[7]||(i[7]=m=>p(r)?r.value=m:null),location:"bottom end",variant:"outlined",color:"error"},{default:e(()=>i[17]||(i[17]=[n(" Oat cake caramels sesame snaps candy. ",-1)])),_:1,__:[17]},8,["modelValue"]),t(u,{onClick:i[8]||(i[8]=m=>c.value=!0)},{default:e(()=>i[18]||(i[18]=[n(" Flat ",-1)])),_:1,__:[18]}),t(f,{modelValue:S(c),"onUpdate:modelValue":i[9]||(i[9]=m=>p(c)?c.value=m:null),location:"bottom start",variant:"flat",color:"error"},{default:e(()=>i[19]||(i[19]=[n(" Oat cake caramels sesame snaps candy. ",-1)])),_:1,__:[19]},8,["modelValue"])]))}},ba={class:"demo-space-x"},ua={__name:"DemoSnackbarPosition",setup(k){const o=d(!1),s=d(!1),a=d(!1),r=d(!1),c=d(!1),v=d(!1),i=d(!1),m=d(!1),g=d(!1);return(w,l)=>(_(),x("div",ba,[t(u,{icon:"",variant:"text",onClick:l[0]||(l[0]=b=>s.value=!0)},{default:e(()=>[t(B,{icon:"tabler-arrow-up"})]),_:1}),t(f,{modelValue:S(s),"onUpdate:modelValue":l[1]||(l[1]=b=>p(s)?s.value=b:null),location:"top"},{default:e(()=>l[18]||(l[18]=[n(" I'm a top snackbar. ",-1)])),_:1,__:[18]},8,["modelValue"]),t(u,{icon:"",variant:"text",onClick:l[2]||(l[2]=b=>a.value=!0)},{default:e(()=>[t(B,{icon:"tabler-arrow-up-right"})]),_:1}),t(f,{modelValue:S(a),"onUpdate:modelValue":l[3]||(l[3]=b=>p(a)?a.value=b:null),location:"top end"},{default:e(()=>l[19]||(l[19]=[n(" I'm a top right snackbar. ",-1)])),_:1,__:[19]},8,["modelValue"]),t(u,{icon:"",variant:"text",onClick:l[4]||(l[4]=b=>i.value=!0)},{default:e(()=>[t(B,{icon:"tabler-arrow-right"})]),_:1}),t(f,{modelValue:S(i),"onUpdate:modelValue":l[5]||(l[5]=b=>p(i)?i.value=b:null),location:"end center"},{default:e(()=>l[20]||(l[20]=[n(" I'm a center end snackbar. ",-1)])),_:1,__:[20]},8,["modelValue"]),t(u,{icon:"",variant:"text",onClick:l[6]||(l[6]=b=>r.value=!0)},{default:e(()=>[t(B,{icon:"tabler-arrow-down-right"})]),_:1}),t(f,{modelValue:S(r),"onUpdate:modelValue":l[7]||(l[7]=b=>p(r)?r.value=b:null),location:"bottom end"},{default:e(()=>l[21]||(l[21]=[n(" I'm a bottom end snackbar. ",-1)])),_:1,__:[21]},8,["modelValue"]),t(u,{icon:"",variant:"text",onClick:l[8]||(l[8]=b=>c.value=!0)},{default:e(()=>[t(B,{icon:"tabler-arrow-down"})]),_:1}),t(f,{modelValue:S(c),"onUpdate:modelValue":l[9]||(l[9]=b=>p(c)?c.value=b:null)},{default:e(()=>l[22]||(l[22]=[n(" I'm a bottom snackbar. ",-1)])),_:1,__:[22]},8,["modelValue"]),t(u,{icon:"",variant:"text",onClick:l[10]||(l[10]=b=>v.value=!0)},{default:e(()=>[t(B,{icon:"tabler-arrow-down-left"})]),_:1}),t(f,{modelValue:S(v),"onUpdate:modelValue":l[11]||(l[11]=b=>p(v)?v.value=b:null),location:"bottom start"},{default:e(()=>l[23]||(l[23]=[n(" I'm a bottom start snackbar. ",-1)])),_:1,__:[23]},8,["modelValue"]),t(u,{icon:"",variant:"text",onClick:l[12]||(l[12]=b=>m.value=!0)},{default:e(()=>[t(B,{icon:"tabler-arrow-left"})]),_:1}),t(f,{modelValue:S(m),"onUpdate:modelValue":l[13]||(l[13]=b=>p(m)?m.value=b:null),location:"start center"},{default:e(()=>l[24]||(l[24]=[n(" I'm a center start snackbar. ",-1)])),_:1,__:[24]},8,["modelValue"]),t(u,{icon:"",variant:"text",onClick:l[14]||(l[14]=b=>o.value=!0)},{default:e(()=>[t(B,{icon:"tabler-arrow-up-left"})]),_:1}),t(f,{modelValue:S(o),"onUpdate:modelValue":l[15]||(l[15]=b=>p(o)?o.value=b:null),location:"top start"},{default:e(()=>l[25]||(l[25]=[n(" I'm a top start snackbar. ",-1)])),_:1,__:[25]},8,["modelValue"]),t(u,{icon:"",variant:"text",onClick:l[16]||(l[16]=b=>g.value=!0)},{default:e(()=>[t(B,{icon:"tabler-arrows-minimize"})]),_:1}),t(f,{modelValue:S(g),"onUpdate:modelValue":l[17]||(l[17]=b=>p(g)?g.value=b:null),location:"center"},{default:e(()=>l[26]||(l[26]=[n(" I'm a center snackbar. ",-1)])),_:1,__:[26]},8,["modelValue"])]))}},ka={__name:"DemoSnackbarVertical",setup(k){const o=d(!1);return(s,a)=>(_(),x(T,null,[t(u,{onClick:a[0]||(a[0]=r=>o.value=!0)},{default:e(()=>a[4]||(a[4]=[n(" Open Snackbar ",-1)])),_:1,__:[4]}),t(f,{modelValue:S(o),"onUpdate:modelValue":a[3]||(a[3]=r=>p(o)?o.value=r:null),vertical:""},{actions:e(()=>[t(u,{color:"success",onClick:a[1]||(a[1]=r=>o.value=!1)},{default:e(()=>a[5]||(a[5]=[n(" Undo ",-1)])),_:1,__:[5]}),t(u,{color:"error",onClick:a[2]||(a[2]=r=>o.value=!1)},{default:e(()=>a[6]||(a[6]=[n(" Close ",-1)])),_:1,__:[6]})]),default:e(()=>[a[7]||(a[7]=n(" Sugar plum chocolate bar halvah sesame snaps apple pie donut croissant marshmallow. Sweet roll donut gummies sesame snaps icing bear claw tiramisu cotton candy. ",-1))]),_:1,__:[7]},8,["modelValue"])],64))}},Va={__name:"DemoSnackbarTimeout",setup(k){const o=d(!1);return(s,a)=>(_(),x(T,null,[t(u,{onClick:a[0]||(a[0]=r=>o.value=!0)},{default:e(()=>a[2]||(a[2]=[n(" Open Snackbar ",-1)])),_:1,__:[2]}),t(f,{modelValue:S(o),"onUpdate:modelValue":a[1]||(a[1]=r=>p(o)?o.value=r:null),timeout:2e3},{default:e(()=>a[3]||(a[3]=[n(" My timeout is set to 2000. ",-1)])),_:1,__:[3]},8,["modelValue"])],64))}},ma={__name:"DemoSnackbarMultiLine",setup(k){const o=d(!1);return(s,a)=>(_(),x(T,null,[t(u,{onClick:a[0]||(a[0]=r=>o.value=!0)},{default:e(()=>a[3]||(a[3]=[n(" Open Snackbar ",-1)])),_:1,__:[3]}),t(f,{modelValue:S(o),"onUpdate:modelValue":a[2]||(a[2]=r=>p(o)?o.value=r:null),"multi-line":""},{actions:e(()=>[t(u,{color:"error",onClick:a[1]||(a[1]=r=>o.value=!1)},{default:e(()=>a[4]||(a[4]=[n(" Close ",-1)])),_:1,__:[4]})]),default:e(()=>[a[5]||(a[5]=n(" I am a multi-line snackbar. I can have more than one line. This is another line that is quite long. ",-1))]),_:1,__:[5]},8,["modelValue"])],64))}},da={__name:"DemoSnackbarWithAction",setup(k){const o=d(!1);return(s,a)=>(_(),x(T,null,[t(u,{onClick:a[0]||(a[0]=r=>o.value=!0)},{default:e(()=>a[3]||(a[3]=[n(" Open Snackbar ",-1)])),_:1,__:[3]}),t(f,{modelValue:S(o),"onUpdate:modelValue":a[2]||(a[2]=r=>p(o)?o.value=r:null)},{actions:e(()=>[t(u,{color:"error",onClick:a[1]||(a[1]=r=>o.value=!1)},{default:e(()=>a[4]||(a[4]=[n(" Close ",-1)])),_:1,__:[4]})]),default:e(()=>[a[5]||(a[5]=n(" Hello, I'm a snackbar with actions. ",-1))]),_:1,__:[5]},8,["modelValue"])],64))}},Sa={__name:"DemoSnackbarBasic",setup(k){const o=d(!1);return(s,a)=>(_(),x(T,null,[t(u,{onClick:a[0]||(a[0]=r=>o.value=!0)},{default:e(()=>a[2]||(a[2]=[n(" Open Snackbar ",-1)])),_:1,__:[2]}),t(f,{modelValue:S(o),"onUpdate:modelValue":a[1]||(a[1]=r=>p(o)?o.value=r:null)},{default:e(()=>a[3]||(a[3]=[n(" Hello, I'm a snackbar ",-1)])),_:1,__:[3]},8,["modelValue"])],64))}},pa={ts:`<script lang="ts" setup>
const isSnackbarVisible = ref(false)
<\/script>

<template>
  <VBtn @click="isSnackbarVisible = true">
    Open Snackbar
  </VBtn>

  <!-- SnackBar -->
  <VSnackbar v-model="isSnackbarVisible">
    Hello, I'm a snackbar
  </VSnackbar>
</template>
`,js:`<script setup>
const isSnackbarVisible = ref(false)
<\/script>

<template>
  <VBtn @click="isSnackbarVisible = true">
    Open Snackbar
  </VBtn>

  <!-- SnackBar -->
  <VSnackbar v-model="isSnackbarVisible">
    Hello, I'm a snackbar
  </VSnackbar>
</template>
`},fa={ts:`<script lang="ts" setup>
const isSnackbarVisible = ref(false)
<\/script>

<template>
  <VBtn @click="isSnackbarVisible = true">
    Open Snackbar
  </VBtn>

  <!-- Snackbar -->
  <VSnackbar
    v-model="isSnackbarVisible"
    multi-line
  >
    I am a multi-line snackbar. I can have more than one line. This is another line that is quite long.

    <template #actions>
      <VBtn
        color="error"
        @click="isSnackbarVisible = false"
      >
        Close
      </VBtn>
    </template>
  </VSnackbar>
</template>
`,js:`<script setup>
const isSnackbarVisible = ref(false)
<\/script>

<template>
  <VBtn @click="isSnackbarVisible = true">
    Open Snackbar
  </VBtn>

  <!-- Snackbar -->
  <VSnackbar
    v-model="isSnackbarVisible"
    multi-line
  >
    I am a multi-line snackbar. I can have more than one line. This is another line that is quite long.

    <template #actions>
      <VBtn
        color="error"
        @click="isSnackbarVisible = false"
      >
        Close
      </VBtn>
    </template>
  </VSnackbar>
</template>
`},va={ts:`<script lang="ts" setup>
const isSnackbarTopStartVisible = ref(false)
const isSnackbarTopVisible = ref(false)
const isSnackbarTopEndVisible = ref(false)
const isSnackbarBottomEndVisible = ref(false)
const isSnackbarBottomVisible = ref(false)
const isSnackbarBottomStartVisible = ref(false)
const isSnackbarEndVisible = ref(false)
const isSnackbarStartVisible = ref(false)
const isSnackbarCenteredVisible = ref(false)
<\/script>

<template>
  <div class="demo-space-x">
    <!-- top  -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarTopVisible = true"
    >
      <VIcon icon="tabler-arrow-up" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarTopVisible"
      location="top"
    >
      I'm a top snackbar.
    </VSnackbar>

    <!-- top end -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarTopEndVisible = true"
    >
      <VIcon icon="tabler-arrow-up-right" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarTopEndVisible"
      location="top end"
    >
      I'm a top right snackbar.
    </VSnackbar>

    <!-- center end -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarEndVisible = true"
    >
      <VIcon icon="tabler-arrow-right" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarEndVisible"
      location="end center"
    >
      I'm a center end snackbar.
    </VSnackbar>

    <!-- bottom end -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarBottomEndVisible = true"
    >
      <VIcon icon="tabler-arrow-down-right" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarBottomEndVisible"
      location="bottom end"
    >
      I'm a bottom end snackbar.
    </VSnackbar>

    <!-- bottom -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarBottomVisible = true"
    >
      <VIcon icon="tabler-arrow-down" />
    </VBtn>

    <VSnackbar v-model="isSnackbarBottomVisible">
      I'm a bottom snackbar.
    </VSnackbar>

    <!-- bottom start -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarBottomStartVisible = true"
    >
      <VIcon icon="tabler-arrow-down-left" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarBottomStartVisible"
      location="bottom start"
    >
      I'm a bottom start snackbar.
    </VSnackbar>

    <!-- center start -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarStartVisible = true"
    >
      <VIcon icon="tabler-arrow-left" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarStartVisible"
      location="start center"
    >
      I'm a center start snackbar.
    </VSnackbar>

    <!-- top start -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarTopStartVisible = true"
    >
      <VIcon icon="tabler-arrow-up-left" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarTopStartVisible"
      location="top start"
    >
      I'm a top start snackbar.
    </VSnackbar>

    <!-- center -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarCenteredVisible = true"
    >
      <VIcon icon="tabler-arrows-minimize" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarCenteredVisible"
      location="center"
    >
      I'm a center snackbar.
    </VSnackbar>
  </div>
</template>
`,js:`<script setup>
const isSnackbarTopStartVisible = ref(false)
const isSnackbarTopVisible = ref(false)
const isSnackbarTopEndVisible = ref(false)
const isSnackbarBottomEndVisible = ref(false)
const isSnackbarBottomVisible = ref(false)
const isSnackbarBottomStartVisible = ref(false)
const isSnackbarEndVisible = ref(false)
const isSnackbarStartVisible = ref(false)
const isSnackbarCenteredVisible = ref(false)
<\/script>

<template>
  <div class="demo-space-x">
    <!-- top  -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarTopVisible = true"
    >
      <VIcon icon="tabler-arrow-up" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarTopVisible"
      location="top"
    >
      I'm a top snackbar.
    </VSnackbar>

    <!-- top end -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarTopEndVisible = true"
    >
      <VIcon icon="tabler-arrow-up-right" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarTopEndVisible"
      location="top end"
    >
      I'm a top right snackbar.
    </VSnackbar>

    <!-- center end -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarEndVisible = true"
    >
      <VIcon icon="tabler-arrow-right" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarEndVisible"
      location="end center"
    >
      I'm a center end snackbar.
    </VSnackbar>

    <!-- bottom end -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarBottomEndVisible = true"
    >
      <VIcon icon="tabler-arrow-down-right" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarBottomEndVisible"
      location="bottom end"
    >
      I'm a bottom end snackbar.
    </VSnackbar>

    <!-- bottom -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarBottomVisible = true"
    >
      <VIcon icon="tabler-arrow-down" />
    </VBtn>

    <VSnackbar v-model="isSnackbarBottomVisible">
      I'm a bottom snackbar.
    </VSnackbar>

    <!-- bottom start -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarBottomStartVisible = true"
    >
      <VIcon icon="tabler-arrow-down-left" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarBottomStartVisible"
      location="bottom start"
    >
      I'm a bottom start snackbar.
    </VSnackbar>

    <!-- center start -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarStartVisible = true"
    >
      <VIcon icon="tabler-arrow-left" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarStartVisible"
      location="start center"
    >
      I'm a center start snackbar.
    </VSnackbar>

    <!-- top start -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarTopStartVisible = true"
    >
      <VIcon icon="tabler-arrow-up-left" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarTopStartVisible"
      location="top start"
    >
      I'm a top start snackbar.
    </VSnackbar>

    <!-- center -->
    <VBtn
      icon
      variant="text"
      @click="isSnackbarCenteredVisible = true"
    >
      <VIcon icon="tabler-arrows-minimize" />
    </VBtn>

    <VSnackbar
      v-model="isSnackbarCenteredVisible"
      location="center"
    >
      I'm a center snackbar.
    </VSnackbar>
  </div>
</template>
`},Ba={ts:`<script lang="ts" setup>
const isSnackbarVisible = ref(false)
<\/script>

<template>
  <VBtn @click="isSnackbarVisible = true">
    Open Snackbar
  </VBtn>

  <!-- Snackbar -->
  <VSnackbar
    v-model="isSnackbarVisible"
    :timeout="2000"
  >
    My timeout is set to 2000.
  </VSnackbar>
</template>
`,js:`<script setup>
const isSnackbarVisible = ref(false)
<\/script>

<template>
  <VBtn @click="isSnackbarVisible = true">
    Open Snackbar
  </VBtn>

  <!-- Snackbar -->
  <VSnackbar
    v-model="isSnackbarVisible"
    :timeout="2000"
  >
    My timeout is set to 2000.
  </VSnackbar>
</template>
`},_a={ts:`<script lang="ts" setup>
const isSnackbarFadeVisible = ref(false)
const isSnackbarScaleVisible = ref(false)
const isSnackbarScrollReverseVisible = ref(false)
<\/script>

<template>
  <div class="demo-space-x">
    <!-- fade -->
    <VBtn @click="isSnackbarFadeVisible = true">
      fade snackbar
    </VBtn>

    <VSnackbar
      v-model="isSnackbarFadeVisible"
      transition="fade-transition"
      location="top start"
    >
      I'm a fade transition snackbar.
    </VSnackbar>

    <!-- scale -->
    <VBtn @click="isSnackbarScaleVisible = true">
      Scale snackbar
    </VBtn>

    <VSnackbar
      v-model="isSnackbarScaleVisible"
      transition="scale-transition"
      location="bottom end"
    >
      I'm a scale transition snackbar.
    </VSnackbar>

    <!-- scroll y reverse -->
    <VBtn @click="isSnackbarScrollReverseVisible = true">
      scroll y reverse
    </VBtn>

    <VSnackbar
      v-model="isSnackbarScrollReverseVisible"
      transition="scroll-y-reverse-transition"
      location="top end"
    >
      I'm a scroll y reverse transition snackbar.
    </VSnackbar>
  </div>
</template>
`,js:`<script setup>
const isSnackbarFadeVisible = ref(false)
const isSnackbarScaleVisible = ref(false)
const isSnackbarScrollReverseVisible = ref(false)
<\/script>

<template>
  <div class="demo-space-x">
    <!-- fade -->
    <VBtn @click="isSnackbarFadeVisible = true">
      fade snackbar
    </VBtn>

    <VSnackbar
      v-model="isSnackbarFadeVisible"
      transition="fade-transition"
      location="top start"
    >
      I'm a fade transition snackbar.
    </VSnackbar>

    <!-- scale -->
    <VBtn @click="isSnackbarScaleVisible = true">
      Scale snackbar
    </VBtn>

    <VSnackbar
      v-model="isSnackbarScaleVisible"
      transition="scale-transition"
      location="bottom end"
    >
      I'm a scale transition snackbar.
    </VSnackbar>

    <!-- scroll y reverse -->
    <VBtn @click="isSnackbarScrollReverseVisible = true">
      scroll y reverse
    </VBtn>

    <VSnackbar
      v-model="isSnackbarScrollReverseVisible"
      transition="scroll-y-reverse-transition"
      location="top end"
    >
      I'm a scroll y reverse transition snackbar.
    </VSnackbar>
  </div>
</template>
`},ga={ts:`<script lang="ts" setup>
const isDefaultSnackbarVisible = ref(false)
const isTonalSnackbarVisible = ref(false)
const isTextSnackbarVisible = ref(false)
const isOutlinedSnackbarVisible = ref(false)
const isFlatSnackbarVisible = ref(false)
<\/script>

<template>
  <div class="demo-space-x">
    <!-- Default toggle btn -->
    <VBtn @click="isDefaultSnackbarVisible = true">
      Default
    </VBtn>

    <!-- Default snackbar -->
    <VSnackbar
      v-model="isDefaultSnackbarVisible"
      location="top start"
    >
      Jelly chocolate bar candy canes apple pie.
    </VSnackbar>

    <!-- tonal toggle btn -->
    <VBtn @click="isTonalSnackbarVisible = true">
      tonal
    </VBtn>

    <!-- tonal snackbar -->
    <VSnackbar
      v-model="isTonalSnackbarVisible"
      location="top end"
      variant="tonal"
    >
      Ice cream cake candy canes.
    </VSnackbar>

    <!-- Text toggle btn -->
    <VBtn @click="isTextSnackbarVisible = true">
      Text
    </VBtn>

    <!-- Text snackbar -->
    <VSnackbar
      v-model="isTextSnackbarVisible"
      location="end center"
      variant="text"
    >
      Pie icing biscuit soufflé liquorice topping.
    </VSnackbar>

    <!-- Outline toggle btn -->
    <VBtn @click="isOutlinedSnackbarVisible = true">
      Outlined
    </VBtn>

    <!-- Outline snackbar -->
    <VSnackbar
      v-model="isOutlinedSnackbarVisible"
      location="bottom end"
      variant="outlined"
      color="error"
    >
      Oat cake caramels sesame snaps candy.
    </VSnackbar>

    <!-- flat toggle btn -->
    <VBtn @click="isFlatSnackbarVisible = true">
      Flat
    </VBtn>

    <!-- flat snackbar -->
    <VSnackbar
      v-model="isFlatSnackbarVisible"
      location="bottom start"
      variant="flat"
      color="error"
    >
      Oat cake caramels sesame snaps candy.
    </VSnackbar>
  </div>
</template>
`,js:`<script setup>
const isDefaultSnackbarVisible = ref(false)
const isTonalSnackbarVisible = ref(false)
const isTextSnackbarVisible = ref(false)
const isOutlinedSnackbarVisible = ref(false)
const isFlatSnackbarVisible = ref(false)
<\/script>

<template>
  <div class="demo-space-x">
    <!-- Default toggle btn -->
    <VBtn @click="isDefaultSnackbarVisible = true">
      Default
    </VBtn>

    <!-- Default snackbar -->
    <VSnackbar
      v-model="isDefaultSnackbarVisible"
      location="top start"
    >
      Jelly chocolate bar candy canes apple pie.
    </VSnackbar>

    <!-- tonal toggle btn -->
    <VBtn @click="isTonalSnackbarVisible = true">
      tonal
    </VBtn>

    <!-- tonal snackbar -->
    <VSnackbar
      v-model="isTonalSnackbarVisible"
      location="top end"
      variant="tonal"
    >
      Ice cream cake candy canes.
    </VSnackbar>

    <!-- Text toggle btn -->
    <VBtn @click="isTextSnackbarVisible = true">
      Text
    </VBtn>

    <!-- Text snackbar -->
    <VSnackbar
      v-model="isTextSnackbarVisible"
      location="end center"
      variant="text"
    >
      Pie icing biscuit soufflé liquorice topping.
    </VSnackbar>

    <!-- Outline toggle btn -->
    <VBtn @click="isOutlinedSnackbarVisible = true">
      Outlined
    </VBtn>

    <!-- Outline snackbar -->
    <VSnackbar
      v-model="isOutlinedSnackbarVisible"
      location="bottom end"
      variant="outlined"
      color="error"
    >
      Oat cake caramels sesame snaps candy.
    </VSnackbar>

    <!-- flat toggle btn -->
    <VBtn @click="isFlatSnackbarVisible = true">
      Flat
    </VBtn>

    <!-- flat snackbar -->
    <VSnackbar
      v-model="isFlatSnackbarVisible"
      location="bottom start"
      variant="flat"
      color="error"
    >
      Oat cake caramels sesame snaps candy.
    </VSnackbar>
  </div>
</template>
`},Ia={ts:`<script lang="ts" setup>
const isSnackbarVisible = ref(false)
<\/script>

<template>
  <VBtn @click="isSnackbarVisible = true">
    Open Snackbar
  </VBtn>

  <VSnackbar
    v-model="isSnackbarVisible"
    vertical
  >
    Sugar plum chocolate bar halvah sesame snaps apple pie donut croissant marshmallow. Sweet roll donut gummies sesame snaps icing bear claw tiramisu cotton candy.

    <template #actions>
      <VBtn
        color="success"
        @click="isSnackbarVisible = false"
      >
        Undo
      </VBtn>

      <VBtn
        color="error"
        @click="isSnackbarVisible = false"
      >
        Close
      </VBtn>
    </template>
  </VSnackbar>
</template>
`,js:`<script setup>
const isSnackbarVisible = ref(false)
<\/script>

<template>
  <VBtn @click="isSnackbarVisible = true">
    Open Snackbar
  </VBtn>

  <VSnackbar
    v-model="isSnackbarVisible"
    vertical
  >
    Sugar plum chocolate bar halvah sesame snaps apple pie donut croissant marshmallow. Sweet roll donut gummies sesame snaps icing bear claw tiramisu cotton candy.

    <template #actions>
      <VBtn
        color="success"
        @click="isSnackbarVisible = false"
      >
        Undo
      </VBtn>

      <VBtn
        color="error"
        @click="isSnackbarVisible = false"
      >
        Close
      </VBtn>
    </template>
  </VSnackbar>
</template>
`},xa={ts:`<script lang="ts" setup>
const isSnackbarVisibility = ref(false)
<\/script>

<template>
  <VBtn @click="isSnackbarVisibility = true">
    Open Snackbar
  </VBtn>

  <!-- Snackbar -->
  <VSnackbar v-model="isSnackbarVisibility">
    Hello, I'm a snackbar with actions.

    <template #actions>
      <VBtn
        color="error"
        @click="isSnackbarVisibility = false"
      >
        Close
      </VBtn>
    </template>
  </VSnackbar>
</template>
`,js:`<script setup>
const isSnackbarVisibility = ref(false)
<\/script>

<template>
  <VBtn @click="isSnackbarVisibility = true">
    Open Snackbar
  </VBtn>

  <!-- Snackbar -->
  <VSnackbar v-model="isSnackbarVisibility">
    Hello, I'm a snackbar with actions.

    <template #actions>
      <VBtn
        color="error"
        @click="isSnackbarVisibility = false"
      >
        Close
      </VBtn>
    </template>
  </VSnackbar>
</template>
`},Ma={__name:"snackbar",setup(k){return(o,s)=>{const a=Sa,r=na,c=da,v=ma,i=Va,m=ka,g=ua,w=ca,l=sa;return _(),h(la,{class:"match-height"},{default:e(()=>[t(I,{cols:"12",md:"6"},{default:e(()=>[t(r,{title:"Basic",code:pa},{default:e(()=>[s[0]||(s[0]=V("p",null,[n("The "),V("code",null,"v-snackbar"),n(" component is used to display a quick message to a user. Snackbars support positioning, removal delay, and callbacks.")],-1)),t(a)]),_:1,__:[0]},8,["code"])]),_:1}),t(I,{cols:"12",md:"6"},{default:e(()=>[t(r,{title:"With Action",code:xa},{default:e(()=>[s[1]||(s[1]=V("p",null,[n("Use "),V("code",null,"actions"),n(" slot to add action button. A "),V("code",null,"v-snackbar"),n(" in its simplest form displays a temporary and closable notification to the user.")],-1)),t(c)]),_:1,__:[1]},8,["code"])]),_:1}),t(I,{cols:"12",md:"6"},{default:e(()=>[t(r,{title:"Multi Line",code:fa},{default:e(()=>[s[2]||(s[2]=V("p",null,[n("The "),V("code",null,"multi-line"),n(" property extends the height of the "),V("code",null,"v-snackbar"),n(" to give you a little more room for content.")],-1)),t(v)]),_:1,__:[2]},8,["code"])]),_:1}),t(I,{cols:"12",md:"6"},{default:e(()=>[t(r,{title:"Timeout",code:Ba},{default:e(()=>[s[3]||(s[3]=V("p",null,[n("The "),V("code",null,"timeout"),n(" property lets you customize the delay before the "),V("code",null,"v-snackbar"),n(" is hidden.")],-1)),t(i)]),_:1,__:[3]},8,["code"])]),_:1}),t(I,{cols:"12",md:"6"},{default:e(()=>[t(r,{title:"Vertical",code:Ia},{default:e(()=>[s[4]||(s[4]=V("p",null,[n("The "),V("code",null,"vertical"),n(" property allows you to stack the content of your "),V("code",null,"v-snackbar"),n(".")],-1)),t(m)]),_:1,__:[4]},8,["code"])]),_:1}),t(I,{cols:"12",md:"6"},{default:e(()=>[t(r,{title:"Position",code:va},{default:e(()=>[s[5]||(s[5]=V("p",null,[n("Use "),V("code",null,"location"),n(" prop to change the position of snackbar.")],-1)),t(g)]),_:1,__:[5]},8,["code"])]),_:1}),t(I,{cols:"12",md:"6"},{default:e(()=>[t(r,{title:"Variants",code:ga},{default:e(()=>[s[6]||(s[6]=V("p",null,[n("Apply different styles to the snackbar using props such as "),V("code",null,"shaped"),n(", "),V("code",null,"rounded"),n(", "),V("code",null,"color"),n(", "),V("code",null,"text"),n(", "),V("code",null,"outlined"),n(", "),V("code",null,"tile"),n(" and more.")],-1)),t(w)]),_:1,__:[6]},8,["code"])]),_:1}),t(I,{cols:"12",md:"6"},{default:e(()=>[t(r,{title:"Transition",code:_a},{default:e(()=>[s[7]||(s[7]=V("p",null,"Use transition prop to sets the component transition.",-1)),t(l)]),_:1,__:[7]},8,["code"])]),_:1})]),_:1})}}};export{Ma as default};
