import axios from "axios";

export const api_interna = axios.create({
    baseURL : "https://localhost:3000/"
})

export const api_spotify = axios.create({
    baseURL : "https://api.spotify.com/" // alterar para a url da api do spotify futuramente
})

/*
Exemplo de uso:

import { api_interna } from "@/lib/api";

function handleGet(){
api_interna.get("example_route/").then((response) => {

console.log(response.data);

}.catch((error) => {
console.log(error);
}

*/