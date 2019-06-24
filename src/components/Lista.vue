<template>
  <v-layout v-if="temItemNaLista" align-center justify-center column fill-height>
    <v-card>
      <v-container grid-list-xl fluid>
        <v-layout row wrap>
          <v-flex v-for="item in lista" :key="item.id" xs6 sm6 md4 lg3>
            <v-card flat tile>
              <v-img
                :src="item.images.downsized.url"
                :lazy-src="item.images.downsized.url"
                aspect-ratio="1"
                class="grey lighten-2"
              >
                <template v-slot:placeholder>
                  <v-layout fill-height align-center justify-center ma-0>
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-layout>
                </template>
              </v-img>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-flex md2 mt-3>
      <v-btn small color="primary" dark @click="buscarMais">Buscar mais</v-btn>
    </v-flex>
  </v-layout>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class Lista extends Vue {
  @Prop({ type: Boolean, required: true })
  temItemNaLista!: boolean;

  @Prop({ type: Array, required: true })
  lista!: Array<any>;

  buscarMais() {
    this.$emit("buscarMais");
  }
}
</script>

<style>
</style>

