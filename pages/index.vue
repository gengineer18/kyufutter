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
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="#00acee" nuxt to="/" large dark>
            <v-icon dark left>mdi-twitter</v-icon>Twitterでシェアする
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {}
}
</script>
