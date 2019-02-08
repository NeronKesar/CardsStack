import ApiService from '../../utils/ApiService'

export const getPhotosApi = () =>
  ApiService(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=DEMO_KEY`)
