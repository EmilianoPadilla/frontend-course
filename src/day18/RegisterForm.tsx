import { useForm } from 'react-hook-form' //Imports the main hook from React Hook Form. useForm gives you all the tools needed to manage the form
import { zodResolver } from '@hookform/resolvers/zod' //Imports the connector between React Hook Form and Zod. 
import { z } from 'zod' //Imports Zod itself so you can write validation rules using z.string(), z.email() etc.

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type RegisterFormData = z.infer<typeof registerSchema> //Automatically generates a TypeScript type from your Zod schema. Instead of writing the interface manually, Zod creates it.

function RegisterForm() {
  const {
    register, //connects inputs to the form
    handleSubmit, //handles submission and validation
    formState: { errors, isSubmitting }, //contains current validation errors
  } = useForm<RegisterFormData>({ //Initializes the form with the RegisterFormData type
    resolver: zodResolver(registerSchema), //connects the Zod schema to React Hook Form, enabling validation based on the schema
  })

  function onSubmit(data: RegisterFormData) { //Your submit function — only called if ALL validations pass. 
    console.log('Form submitted!', data)      //data contains the validated form values. In a real app I'd send this to my backend API here
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register('name')} placeholder="Your name" />
        {errors.name && <p>{errors.name.message}</p>} 
      </div>                                                                                                       

      <div>
        <label>Email</label>
        <input {...register('email')} placeholder="your@email.com" />
        {errors.email && <p>{errors.email.message}</p>}  
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register('password')} placeholder="Min 8 characters" />
        {errors.password && <p>{errors.password.message}</p>}  
      </div> 

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Register'}
      </button>
    </form>
  )
}

export default RegisterForm