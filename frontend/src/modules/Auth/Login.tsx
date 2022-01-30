import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Formik } from 'formik'
import Button from '../../components/Button'
import { AuthLoginPayload } from '../../interfaces/AuthLoginPayload'
import { useAuthLogin } from './Auth.service'
import * as userService from '../../services/user'
import * as SC from './Login.styled'
import { useNavigate } from 'react-router-dom'

const DEFAULT_VALUES: AuthLoginPayload = {
  login: '',
  password: '',
}

function Login() {
  const { mutate } = useAuthLogin()
  const navigate = useNavigate()
  const handleForm = (payload: AuthLoginPayload, { setSubmitting }: any) => {
    mutate(
      {
        payload,
      },
      {
        onSuccess: (response) => {
          if (!response.access_token) {
            setSubmitting(false)
            return
          }
          userService.setToken(response.access_token)
          navigate('/')
        },
        onError: (error) => {
          console.log('got errror')
          console.log(error)
          setSubmitting(false)
        },
      }
    )
  }

  return (
    <SC.LoginContainer>
      <Formik
        initialValues={DEFAULT_VALUES}
        validateOnMount
        validate={(values) => {
          const errors: { login?: string; password?: string } = {}

          if (!values.login || values.login?.length < 3) {
            errors.login = 'Login must be provided'
          }

          if (!values.password || values.password?.length < 3) {
            errors.password = 'Password must be provided'
          }

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
            <SC.InputWrapper>
              <SC.IconBox isError={!!errors.login && touched.login}>
                <FontAwesomeIcon icon={faSearch} />
              </SC.IconBox>
              <SC.LoginInput
                type="text"
                name="login"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.login}
                isError={!!errors.login && touched.login}
              />
            </SC.InputWrapper>

            <SC.InputWrapper>
              <SC.IconBox isError={!!errors.password && touched.password}>
                <FontAwesomeIcon icon={faSearch} />
              </SC.IconBox>
              <SC.LoginInput
                isError={!!errors.password && touched.password}
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </SC.InputWrapper>
            <SC.ButtonWrapper>
              <Button
                type="submit"
                disabled={!!errors.login || !!errors.password || isSubmitting}
              >
                Log In
              </Button>
            </SC.ButtonWrapper>
          </form>
        )}
      </Formik>
    </SC.LoginContainer>
  )
}

export default Login
