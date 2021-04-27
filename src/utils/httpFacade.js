import axios from 'axios'
import QueryString from 'query-string'

class HttpFacade {
  constructor() {
    this.http = axios.create({
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.http.interceptors.request.use(
      function (config) {
        const token = window.sessionStorage.getItem('_gcut')
        if (token) config.headers.Authorization = 'Bearer ' + token
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )

    this.http.interceptors.response.use(
      function (response) {
        return response
      },
      function (error) {
        return Promise.reject(error.response)
      }
    )
  }

  post = async ({ url, body }) => {
    const response = await this.http.post(url, body)
    return response.data
  }

  patch = async ({ url, body }) => {
    const response = await this.http.patch(url, body)
    return response.data
  }

  get = async ({ url, query }) => {
    const queryString = QueryString.stringify(query)
    const response = await this.http.get(`${url}?${queryString}`)
    return response.data
  }

  delete = async ({ url }) => {
    const response = await this.http.delete(url)
    return response.data
  }

  put = async ({ url, body }) => {
    const response = await this.http.put(url, body)
    return response.data
  }

  headers = headers => {
    this.http.defaults.headers = headers
    return this
  }
}

export default new HttpFacade()
