import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'https://api.coinlore.net/api/',
})

apiClient.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'

    return config
  },
  error => {
    return Promise.reject(error)
  },
)
