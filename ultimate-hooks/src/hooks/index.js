import { useEffect, useState } from "react"
import axios from "axios"
export const useResource = (baseUrl, token = null) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl)
      .then(r => setResources(r.data))
  }, [baseUrl, token])

  const create = async resource => {
    let config = null
    if (token) {
      config = {
        headers: { Authorization: token },
      }
    }
  
    const response = await axios.post(baseUrl, resource, config)
    setResources(resources.concat(response.data))
    return response.data
  }
  const service = {
    create
  }

  return [
    resources, service
  ]
}
