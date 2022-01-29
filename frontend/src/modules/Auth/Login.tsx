import { Formik } from 'formik'
import useAuth from '../../hooks/useAuth'
import * as SC from './Login.styled'

function Login() {
  const { user, logIn } = useAuth()

  console.log(user)
  logIn()

  const handleForm = (values: any, { setSubmitting }: any) => {
    console.log(values)
    console.log(setSubmitting)
  }

  return (
    <SC.LoginContainer>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validate={(values) => {
          const errors: { email?: string; password?: string } = {}
          if (!values.email) {
            errors.email = 'Required'
          } else {
            ;/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          }
          console.log(errors)
          return errors
        }}
        onSubmit={handleForm}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </SC.LoginContainer>
  )
}

export default Login
