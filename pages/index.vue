<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-text>
          <p>
            日本政府が国民1人あたり10万円を給付する方針を固めたようです。<br />
            皆さんは10万円給付されたら何を買いたいですか？<br />
            何をしたいですか？
          </p>
          <hr class="my-3" />
          <div v-if="formLength == 1">
            <!-- <svg-area-1 ref="svgArea" :text1st="form1st.text" /> -->
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
                {{ form1st.text }}
              </foreignObject>
              <text :height="height" width="100" x="125" y="90" font-size="8px">
                #10万円こう使う
              </text>
            </svg>
          </div>
          <div v-if="formLength == 2">
            <svg-area-2 :text1st="form1st.text" :text2nd="form2nd.text" />
          </div>
          <div v-if="formLength == 3">
            <svg-area-3
              :text1st="form1st.text"
              :text2nd="form2nd.text"
              :text3rd="form3rd.text"
            />
          </div>
          <v-form ref="form">
            <v-text-field
              :counter="counter"
              v-model="form1st.text"
              :rules="[limit_length]"
              @click="initForm1st()"
              label="共有してみよう！やりたいことその1"
              clearable
              color="primary"
            >
            </v-text-field>
            <v-text-field
              :counter="counter"
              v-model="form2nd.text"
              :rules="[limit_length]"
              @click="initForm2nd()"
              v-if="formLength >= 2"
              label="やりたいことその2"
              clearable
              color="primary"
            >
            </v-text-field>
            <v-text-field
              :counter="counter"
              v-model="form3rd.text"
              :rules="[limit_length]"
              @click="initForm3rd()"
              v-if="formLength >= 3"
              label="やりたいことその3"
              clearable
              color="primary"
            >
            </v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="addForm"
            v-if="formLength < 3"
            color="success"
            outlined
            small
            dark
          >
            <v-icon dark left>mdi-plus</v-icon>やりたいこと追加
          </v-btn>
          <v-btn
            @click="removeForm"
            v-if="formLength > 1"
            color="error"
            outlined
            small
            dark
          >
            <v-icon dark left>mdi-minus</v-icon>やりたいこと削除
          </v-btn>
          <v-spacer />
        </v-card-actions>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="create()" color="warning" large dark>
            <v-icon dark left>mdi-currency-jpy</v-icon>
            <strong>こう使う！！</strong>
          </v-btn>
          <v-spacer />
        </v-card-actions>
        <v-card-actions v-if="tweet">
          <v-spacer />
          <v-btn @click="submit()" color="primary" large dark>
            <v-icon dark left>mdi-twitter</v-icon>
            <strong>ここからツイート</strong>
          </v-btn>
          <v-spacer />
        </v-card-actions>
        <v-card-text>
          <hr class="my-3" />
          <p>
            COVID-19の早期収束、一人でも少ない被害を願います。<br />
            また、この経済施策で少しでも日本経済が改善することを望みます。
          </p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
// import SvgArea1 from '@/components/SvgArea1'
import SvgArea2 from '@/components/SvgArea2'
import SvgArea3 from '@/components/SvgArea3'
import firebase from 'firebase'

const defaultMessage = '10万円どう使う？'
const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
  projectId: process.env.PROJECT_ID
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
const db = firebase.firestore()
const svg2imageData = (svgElement, successCallback, errorCallback) => {
  const canvas = document.createElement('canvas')
  canvas.width = 191
  canvas.height = 100
  const ctx = canvas.getContext('2d')
  const image = new Image()
  image.onload = () => {
    ctx.drawImage(image, 0, 0, 191, 100)
    successCallback(canvas.toDataURL())
  }
  image.onerror = (e) => {
    errorCallback(e)
  }
  const svgData = new XMLSerializer().serializeToString(svgElement)
  image.src =
    'data:image/svg+xml;charset=utf-8;base64,' +
    btoa(unescape(encodeURIComponent(svgData)))
}

export default {
  components: {
    // SvgArea1,
    SvgArea2,
    SvgArea3
  },
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
      },
      limit_length: (value) => {
        if (!value) value = ''
        return value.length <= 15 || '15文字以内で入力してください'
      },
      counter: 15,
      tweet: false,
      width: 188,
      height: 20,
      fontsize: '12px',
      style: 'style=line-height:12px;'
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
      switch (this.formLength) {
        case 2:
          this.form2nd.text = defaultMessage
          break
        case 3:
          this.form3rd.text = defaultMessage
      }
      if (this.formLength > 1) this.formLength--
    },
    submit() {
      if (this.$refs.form.validate()) {
        // すべてのバリデーションが通過したときのみ
        // if文の中に入る
        console.log('true')
        this.tweet = true
      } else {
        console.log('false')
      }
    },
    create() {
      if (this.$refs.form.validate()) {
        svg2imageData(this.$refs.svgArea, async (data) => {
          const storageRef = firebase.storage().ref()
          const fileRef = storageRef.child(`test.png`)

          // Firebase Cloud Storageにアップロード
          await fileRef.putString(data, 'data_url')
          const url = await fileRef.getDownloadURL()
          console.log(url)

          // Firestoreに保存しておく
          const card = db.collection('cards').doc('test')
          await card.set({
            url,
            message: this.form1st.text
          })
        })

        console.log('true')
        this.tweet = true
      } else {
        console.log('false')
      }
    }
  }
}
</script>
