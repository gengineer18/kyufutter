<template>
  <svg ref="svgArea" viewBox="0 0 191 100">
    <rect
      x="0"
      y="0"
      width="191"
      height="100"
      fill="#fefefe"
      stroke="#00acee"
      stroke-width="4"
    ></rect>
    <foreignObject
      :width="width"
      :height="height"
      :font-size="fontsize"
      :style="style"
      requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
      x="4"
      y="18"
    >
      {{ text1st }}
    </foreignObject>
    <foreignObject
      :width="width"
      :height="height"
      :font-size="fontsize"
      :style="style"
      requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
      x="4"
      y="55"
    >
      {{ text2nd }}
    </foreignObject>
  </svg>
</template>

<script>
export default {
  props: {
    text1st: {
      type: String,
      required: false,
      default: ''
    },
    text2nd: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      width: 188,
      height: 20,
      fontsize: '12px',
      style: 'style=line-height:12px;'
    }
  }
}
</script>
