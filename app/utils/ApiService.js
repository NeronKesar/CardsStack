import { create } from 'axios'

const ApiService = create({})

ApiService.interceptors.response.use(response => {
  if (response !== null) {
    return response.data
  }
})

export default ApiService
