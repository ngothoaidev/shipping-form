import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import provinceData from '../data/province.json'
import wardData from '../data/ward.json'

function FormComponent({onAddProduct}){
    const { 
        register, 
        handleSubmit, 
        watch, 
        reset,
        formState: { errors } 
    } = useForm({
        defaultValues: {
            houseNumber: '',
            street: '',
            city: '',
            ward: ''
        }
    });

    // Watch city to filter wards
    const selectedCity = watch('city');

    // Get provinces as array
    const provinces = Object.values(provinceData);

    // Filter wards based on selected city
    const availableWards = selectedCity 
        ? Object.values(wardData).filter(ward => ward.parent_code === selectedCity)
        : [];

    function onSubmit(data){
        // Pass the data up to the parent
        onAddProduct({
            houseNumber: data.houseNumber,
            street: data.street,
            city: data.city,
            ward: data.ward
        });
        // Reset form
        reset();
    }

    const inputDecoration = 'w-full py-1 px-1 mt-2 border rounded-sm';
    const errorDecoration = 'text-red-500 text-sm mt-1';
    const titleDecoration = 'mt-4 font-bold text-2xl';
    
    return (
        <form className='px-2 py-2 bg-white' onSubmit={handleSubmit(onSubmit)}>
            <h1 className={titleDecoration}>House Number</h1>
            <input 
                className={inputDecoration} 
                type='text' 
                placeholder='Input House Number' 
                {...register('houseNumber', { 
                    required: 'House number is required',
                    minLength: {
                        value: 1,
                        message: 'House number must be at least 1 character'
                    }
                })}
            />
            {errors.houseNumber && <p className={errorDecoration}>{errors.houseNumber.message}</p>}
            
            <h1 className={titleDecoration}>Street</h1>
            <input 
                className={inputDecoration} 
                type='text' 
                placeholder='Input Street' 
                {...register('street', { 
                    required: 'Street is required',
                    minLength: {
                        value: 3,
                        message: 'Street must be at least 3 characters'
                    }
                })}
            />
            {errors.street && <p className={errorDecoration}>{errors.street.message}</p>}
            
            <h1 className={titleDecoration}>City</h1>
            <select 
                className={inputDecoration} 
                {...register('city', { 
                    required: 'City is required'
                })}
            >
                <option value="">Select City</option>
                {provinces.map(province => (
                    <option key={province.code} value={province.code}>
                        {province.name_with_type}
                    </option>
                ))}
            </select>
            {errors.city && <p className={errorDecoration}>{errors.city.message}</p>}
            
            <h1 className={titleDecoration}>Ward</h1>
            <select 
                className={inputDecoration} 
                {...register('ward', { 
                    required: 'Ward is required'
                })} 
                disabled={!selectedCity}
            >
                <option value="">Select Ward</option>
                {availableWards.map(ward => (
                    <option key={ward.code} value={ward.code}>
                        {ward.name_with_type}
                    </option>
                ))}
            </select>
            {errors.ward && <p className={errorDecoration}>{errors.ward.message}</p>}
            
            <button type='submit' className='bg-blue-500 hover:bg-blue-600 rounded-sm text-xl py-2 text-white w-full border border-black mt-4'>
                Submit
            </button>
        </form>
    )
}

export default FormComponent