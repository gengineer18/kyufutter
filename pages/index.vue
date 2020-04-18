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
            <svg ref="svgArea" viewBox="0 0 1200 630">
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
              <text
                :height="height"
                :width="width"
                :font-size="fontsize"
                x="25"
                y="350"
              >
                {{ form1st.text }}
              </text>
              <text
                :height="height"
                width="100"
                x="788"
                y="570"
                font-size="50px"
              >
                #10万円こう使う
              </text>
            </svg>
          </div>
          <div v-if="formLength == 2">
            <svg ref="svgArea" viewBox="0 0 1200 630">
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
              <text
                :height="height"
                :width="width"
                :font-size="fontsize"
                x="25"
                y="280"
              >
                {{ form1st.text }}
              </text>
              <text
                :height="height"
                :width="width"
                :font-size="fontsize"
                x="25"
                y="440"
              >
                {{ form2nd.text }}
              </text>
              <text
                :height="height"
                width="100"
                x="788"
                y="540"
                font-size="50px"
              >
                #10万円こう使う
              </text>
            </svg>
          </div>
          <div v-if="formLength == 3">
            <svg ref="svgArea" viewBox="0 0 1200 630">
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
              <text
                :height="height"
                :width="width"
                :font-size="fontsize"
                x="25"
                y="240"
              >
                {{ form1st.text }}
              </text>
              <text
                :height="height"
                :width="width"
                :font-size="fontsize"
                x="25"
                y="360"
              >
                {{ form2nd.text }}
              </text>
              <text
                :height="height"
                :width="width"
                :font-size="fontsize"
                x="25"
                y="480"
              >
                {{ form3rd.text }}
              </text>
              <text
                :height="height"
                width="100"
                x="788"
                y="570"
                font-size="50px"
              >
                #10万円こう使う
              </text>
            </svg>
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
  canvas.width = 1200
  canvas.height = 630
  const ctx = canvas.getContext('2d')
  const image = new Image()
  image.onload = () => {
    ctx.drawImage(image, 0, 0, 1200, 630)
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
  data() {
    return {
      formLength: 1,
      form1st: {
        init: false,
        text: defaultMessage
      },
      form2nd: {
        init: false,
        text: ''
      },
      form3rd: {
        init: false,
        text: ''
      },
      limit_length: (value) => {
        if (!value) value = ''
        return value.length <= 15 || '15文字以内で入力してください'
      },
      counter: 15,
      tweet: false,
      width: 1184.4,
      height: 126,
      fontsize: '74px',
      style: 'style=line-height:74px;'
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
          this.form2nd.text = ''
          break
        case 3:
          this.form3rd.text = ''
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
          const docId = db.collection('posts').doc().id
          const fileRef = storageRef.child(`${docId}.png`)

          // Firebase Cloud Storageにアップロード
          await fileRef.putString(data, 'data_url')
          const url = await fileRef.getDownloadURL()

          // Firestoreに保存しておく
          const card = db.collection('posts').doc(docId)
          await card.set({
            url,
            form1stText: this.form1st.text,
            form2ndText: this.form2nd.text,
            form3rdText: this.form3rd.text
          })
        })
        this.tweet = true
      } else {
        console.log('false')
      }
    }
  }
}
</script>
