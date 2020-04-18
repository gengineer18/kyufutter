<template>
  <span>
    <rect
      x="0"
      y="0"
      width="1200"
      height="630"
      fill="#fefefe"
      stroke="#FFB300"
      stroke-width="25"
    ></rect>
    <text :height="height" width="630" x="25" y="76" font-size="50px">
      10万円給付ったー
    </text>
    <text :height="height" :width="width" :font-size="fontsize" x="25" y="350">
      {{ text1st }}
    </text>
    <text :height="height" width="100" x="788" y="570" font-size="50px">
      #10万円こう使う
    </text>
  </span>
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
