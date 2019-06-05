<template>
  <v-container>
    <v-layout align-center justify-center fill-height>
      <v-flex xs12 sm6>
        <v-text-field
          placeholder="Insira o nome do GIF"
          v-model="termoBusca"
          append-icon="search"
          @keypress.enter="novaBusca"
          @click:append="novaBusca"
        ></v-text-field>
      </v-flex>
    </v-layout>
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
      <v-flex md2>
        <v-btn small color="primary" dark @click="buscarMais">Buscar mais</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GiphyService from "@/services/giphyService";

@Component({})
export default class Home extends Vue {
  termoBusca: String = "";
  giphyService: GiphyService = new GiphyService();
  lista: any[] = new Array<any>();
  limite: number = 50;
  offset: number = 0;

  get temItemNaLista() {
    return this.lista.length > 0;
  }

  novaBusca() {
    this.lista = new Array<any>();
    this.offset = 0;
    this.buscar();
  }

  buscar() {
    this.giphyService
      .obter(this.$http, this.termoBusca, this.limite, this.offset)
      .then((retorno: any) => {
        this.lista = this.lista.concat(retorno.data);
      });
  }

  incrementarPagina() {
    this.offset = this.offset + this.limite;
  }

  buscarMais() {
    this.incrementarPagina();
    this.buscar();
  }
}
</script>

<style>
</style>
