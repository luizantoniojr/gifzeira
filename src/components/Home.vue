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
    <Lista :lista="lista" :temItemNaLista="temItemNaLista" @buscarMais="buscarMais"/>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GiphyService from "@/services/giphyService";
import Lista from "./Lista.vue";

@Component({ components: { Lista } })
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
