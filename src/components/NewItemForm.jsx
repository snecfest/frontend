import React from 'react';
import { useForm } from 'react-hook-form';
import { ProgramAdd } from '../services/ProgramService';
import toast from 'react-hot-toast';

const NewItemForm = ({onClose}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async(data) => {
    console.log('Form Data:', data);
    try {
        const response=await ProgramAdd(data)
        console.log('response in the component',response)
        if(response.status===200){
          toast.success(response.data.message)
          onClose()
        }
        else{
          toast.error(response.status)
        }
    } catch (error) {
        console.log('error in the program add component',error)
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="programCode" className="block text-gray-700">Program ID</label>
          <input
            id="programCode"
            type="text"
            {...register('programCode', { required: 'Program ID is required' })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter Program ID"
          />
          {errors.programId && (
            <p className="text-red-500 text-sm mt-1">{errors.programId.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="studentId" className="block text-gray-700">Student ID</label>
          <input
            id="studentId"
            type="text"
            {...register('studentId', { required: 'Student ID is required' })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter Student ID"
          />
          {errors.studentId && (
            <p className="text-red-500 text-sm mt-1">{errors.studentId.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default NewItemForm;
