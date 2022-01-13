import { useState } from 'react';
/**
 * initialState ==> {
 *  nombre: '',
 *  description: '',
 * }
 * 
 * return values { nombre: 'jose', description: 'datos' }
 * 
 */

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value
    })
  }

  // limpiar con un nuevo estado si se manda
  const cleanForm = (newFormState = initialState) => {
    setValues(newFormState);
  }

  return [ values, handleInputChange, cleanForm ];

}
