export default class GiphyService {
    apiKey: String = "hmBN2VqHYwr8CyvNWGVzHf9R9BOyMPf5";
    baseURL: String = "https://api.giphy.com/v1/gifs";

    obter(http: any, termoPesquisa: String, limite: number, offset: number) {
        return http.get(`${this.baseURL}/search?api_key=${this.apiKey}&q=${termoPesquisa}&limit=${limite}&offset=${offset}`)
            .then((response: any) => { return response.body; });
    }
}