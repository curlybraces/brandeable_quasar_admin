import Vue from 'vue'
import axios from 'axios'
import {LocalStorage} from "quasar";

Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Authorization': LocalStorage.getItem("token"),
  }
})
