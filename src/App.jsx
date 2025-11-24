import { useState } from 'react'
import './App.css'

import FormComponent from './component/Form'

function App() {
  const [formData, setFormData] = useState([]);
  function handleAddForm(newFormData){
    const newForm = {
      id: Date.now(),
      ...newFormData
    };
    setFormData([...formData, newForm]);
  } 
  return (
    <div className='flex items-center justify-center min-h-screen bg-slate-200'>
      <div className='flex flex-col w-2/3 transition-colors duration-300 bg-white shadow-lg rounded-lg text-gray-900'>
        <FormComponent onAddProduct={handleAddForm} />
      </div>
    </div>
  )
}

export default App
