import { useEffect, useRef } from "react"
import useFetch from "../../hooks/useFetch"

const SelectType = ({ setTypeSelect }) => {

const url = 'https://pokeapi.co/api/v2/type'  
const [ types, getTypes ] = useFetch(url)

useEffect(() => {
  getTypes()
}, [])

const typeRef = useRef()

const handleChange = () => {
    setTypeSelect(typeRef.current.value)
}

  return (
    <select className="pokecard__selectType" ref={typeRef} onChange={handleChange}>
      <option value='All Pokemons'>All Pokemons</option>
      {
        types?.results.map(type => (
          <option key={type.url} value={type.url}>{type.name}</option>
        ))
      }
    </select>
  )
}

export default SelectType