/*eslint-disable*/
/* eslint-disable space-before-function-paren */
import { useEffect, useReducer } from 'react'
import useAuth from 'context/auth'

function fetchReducer(state, action) {
  switch (action.type) {
    case 'fetch':
      return {
        ...state,
        data: null,
        error: null,
        message: null,
        isLoading: true
      }
    case 'success':
      return {
        ...state,
        isLoading: false,
        data: action.payload.data ? action.payload.data : action.payload,
        message: action.payload.message
      }
    case 'error':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return { ...state }
  }
}

const INIT_STATE = { data: null, error: null, isLoading: true }

const useFetch = (key, func, reload, ...rest) => {
  const { setSession } = useAuth()
  const [state, dispatch] = useReducer(fetchReducer, INIT_STATE)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        if (mounted) {
          dispatch({ type: 'fetch' })
          const dataFromStorage = JSON.parse(sessionStorage.getItem(key))
          if (dataFromStorage) {
            dispatch({ type: 'success', payload: { data: dataFromStorage } })
          } else {
            const res = await func(...rest)
            if (mounted && res) {
              key &&
                sessionStorage.setItem(
                  key,
                  JSON.stringify(res.data ? res.data : res)
                )
              dispatch({ type: 'success', payload: res })
            }
          }
        }
      } catch (error) {
        if (error) {
          if (error.status === 400) {
            dispatch({ type: 'error', payload: error.data.message })
          } else if (error.status === 401 || error.status === 403) {
            setSession(false)
          } else {
            dispatch({ type: 'error', payload: error.message })
          }
        } else {
          dispatch({ type: 'error', payload: 'Unexpected network error.' })
        }
      }
    })()

    return () => (mounted = false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, func, reload, setSession])

  return state
}

export default useFetch
