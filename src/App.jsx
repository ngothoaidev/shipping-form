import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import FormComponent from './component/Form'

function App() {
  const [formData, setFormData] = useState('');
  function handleAddForm(newFormData){
    const newForm = {
      id: Date.now(),
      ...newProductData
    };
    setFormData([...formData, newForm]);
  } 
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className={'flex flex-col w-2/3 transition-colors duration-300 bg-gray-100 text-gray-900'}>
        <FormComponent onAddProduct={handleAddForm} />
      </div>
    </div>
  )
}

export default App
