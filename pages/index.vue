<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-text>
          <p>
            日本政府が国民1人あたり10万円を給付する方針を固めたようです。<br />
            皆さんは10万円給付されたら何を買いたいですか？<br />
            何をしたいですか？<br />
            共有してみよう！<br />
            COVID-19の早期収束を願います。
          </p>
          <hr class="my-3" />
          <div>
            <svg ref="svgArea" viewBox="0 0 191 100">
              <rect
                x="0"
                y="0"
                width="191"
                height="100"
                fill="#fff"
                stroke="#12b886"
                stroke-width="4"
              ></rect>
              <foreignObject
                requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
                width="188"
                height="100"
                x="4"
                y="40"
                font-size="12px"
                style="line-height:1rem;"
              >
                {{ form1st.text }}
              </foreignObject>
            </svg>
          </div>
          <v-text-field
            :counter="20"
            v-model="form1st.text"
            @click="initForm1st()"
            label="共有してみよう！やりたいことその1"
            color="primary"
          >
          </v-text-field>
          <v-text-field
            :counter="20"
            v-model="form2nd.text"
            @click="initForm2nd()"
            v-if="formLength >= 2"
            label="やりたいことその2"
            color="primary"
          >
          </v-text-field>
          <v-text-field
            :counter="20"
            v-model="form3rd.text"
            @click="initForm3rd()"
            v-if="formLength >= 3"
            label="やりたいことその3"
            color="primary"
          >
          </v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="addForm" color="primary" small dark>
            <v-icon dark left>mdi-plus</v-icon>やりたいこと追加
          </v-btn>
          <v-btn @click="removeForm" color="primary" small dark>
            <v-icon dark left>mdi-minus</v-icon>やりたいこと削除
          </v-btn>
          <v-spacer />
        </v-card-actions>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire" large dark>
            <v-icon dark left>mdi-twitter</v-icon>Twitterでシェアする
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
const defaultMessage = '10万円どう使う？'
export default {
  data() {
    return {
      formLength: 1,
      form1st: {
        init: false,
        text: defaultMessage
      },
      form2nd: {
        init: false,
        text: defaultMessage
      },
      form3rd: {
        init: false,
        text: defaultMessage
      }
    }
  },
  methods: {
    initForm1st() {
      if (!this.form1st.init) {
        this.form1st.text = ''
        this.form1st.init = true
      }
    },
    initForm2nd() {
      if (!this.form2nd.init) {
        this.form2nd.text = ''
        this.form2nd.init = true
      }
    },
    initForm3rd() {
      if (!this.form3rd.init) {
        this.form3rd.text = ''
        this.form3rd.init = true
      }
    },
    addForm() {
      if (this.formLength < 3) this.formLength++
    },
    removeForm() {
      if (this.formLength > 1) this.formLength--
    }
  }
}
</script>
