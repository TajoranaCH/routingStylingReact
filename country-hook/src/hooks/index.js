import axios from 'axios'
import { useState, useEffect } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (country) => {
  const [result, setResult] = useState(null)

  useEffect(() => {
    if (!country) {
      setResult(null)
      return
    }
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
    .then(response => {
      setResult({found: true, data: response.data})
    })
    .catch((e) => {
      if (e.message == 'Request failed with status code 404') {
        setResult({ found: false })
        return
      }
      throw e
    })
  }, [country])
  

  return result
}