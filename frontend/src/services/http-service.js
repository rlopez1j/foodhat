import Axios from "axios"

const httpCall = async (type, uri, {headers = null, body = null, params = null}) => {
  const url = `${process.env.BACKEND_API}/${uri}`
  let responseData

  await Axios({
    method: type,
    url: url,
    headers: headers,
    data: body,
    params: params
  })
  .then((httpResponse) => {
    responseData = httpResponse.data
  })
  .catch(err => console.log('Error! ', err)) // figure out what to return on err

  return responseData
}

const HttpService = {
  get: async (path, config = {headers: null, params: null, }) => 
    await httpCall('GET', path, config),
  put: async (path, body) => {},
  post: async (path, config = {headers: null, body: null}) =>
    await httpCall('POST', path, config),
  delete: async (path, body) => {}
}

export default HttpService