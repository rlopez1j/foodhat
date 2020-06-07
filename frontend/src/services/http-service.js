import Axios from "axios"

const HttpService = {
  get: async (path, {
    params: body
  }) => {
    Axios.get(path, body)
      .then((response) => {
        return response
      })
      .catch(err => console.log('Error! ', err))
  },
  put: async (path, body) => {},
  post: async (path, body) => {},
  delete: async (path, body) => {}
}

export default HttpService