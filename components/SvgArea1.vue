<template>
  <svg ref="svgArea" viewBox="0 0 191 100">
    <rect
      x="0"
      y="0"
      width="191"
      height="100"
      fill="#fefefe"
      stroke="#FFB300"
      stroke-width="4"
    ></rect>
    <text :height="height" width="100" x="4" y="12" font-size="8px">
      10万円給付ったー
    </text>
    <foreignObject
      :width="width"
      :height="height"
      :font-size="fontsize"
      :style="style"
      requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
      x="4"
      y="40"
    >
      {{ text1st }}
    </foreignObject>
    <text :height="height" width="100" x="125" y="90" font-size="8px">
      #10万円こう使う
    </text>
  </svg>
</template>

<script>
export default {
  props: {
    text1st: {
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
