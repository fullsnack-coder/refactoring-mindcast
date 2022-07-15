import {
  AuthLoginInput,
  AuthRegisterInput,
  StoreAction,
  User,
} from '@application/types'
import { loginUser, logoutUser, registerUser } from '@infrastructure/api/auth'

import { takeLatest, put, call } from 'redux-saga/effects'

type AuthStatus = 'idle' | 'started' | 'success' | 'failure'

type AuthState = {
  authStatus: AuthStatus
  isLoggedIn: boolean
  currentUser?: User | null
}

type AuthPayloads = {
  user?: User
  loginInfo?: AuthLoginInput
  registerInfo?: AuthRegisterInput
  onSuccess?: () => void
  onFailure?: (error?: Error) => void
}

const AUTH_LOGIN_STARTED = 'auth/login-started'
const AUTH_REGISTER_STARTED = 'auth/register-started'
const AUTH_SUCCESS = 'auth/success'
const AUTH_FAILURE = 'auth/failure'
const AUTH_LOGOUT = 'auth/logout'

const initialState: AuthState = {
  currentUser: null,
  isLoggedIn: false,
  authStatus: 'idle',
}

export const LoginStart = (
  input: AuthLoginInput,
  onSuccess?: () => void,
  onFailure?: (error?: Error) => void,
): StoreAction<AuthPayloads> => ({
  type: AUTH_LOGIN_STARTED,
  payload: { loginInfo: input, onSuccess, onFailure },
})

export const RegisterStart = (
  input: AuthRegisterInput,
  onSuccess?: () => void,
  onFailure?: (error?: Error) => void,
): StoreAction<AuthPayloads> => ({
  type: AUTH_REGISTER_STARTED,
  payload: { registerInfo: input, onSuccess, onFailure },
})

export const authFailure = (_: Error): StoreAction => ({
  type: AUTH_FAILURE,
})

export const authSuccess = (user: User): StoreAction<AuthPayloads> => ({
  type: AUTH_SUCCESS,
  payload: { user },
})

export const logout = (): StoreAction => ({
  type: AUTH_LOGOUT,
})

function* loginSagaWorker({ payload }: StoreAction<AuthPayloads>) {
  try {
    if (!payload?.loginInfo) throw new Error('data not provided')
    const response: User = yield call(loginUser, payload.loginInfo)
    yield put(authSuccess(response))
    if (payload?.onSuccess) yield call(payload.onSuccess)
  } catch (error) {
    yield put(authFailure(error as Error))
    if (payload?.onFailure) yield call(payload.onFailure, error as Error)
  }
}

function* registerSagaWorker({ payload }: StoreAction<AuthPayloads>) {
  try {
    if (!payload?.registerInfo) throw new Error('data not provided')
    const response: User = yield call(registerUser, payload.registerInfo)
    yield put(authSuccess(response))
    if (payload?.onSuccess) yield call(payload.onSuccess)
  } catch (error) {
    yield put(authFailure(error as Error))
    if (payload?.onFailure) yield call(payload.onFailure, error as Error)
  }
}

function* logoutSagaWorker({ payload }: StoreAction<AuthPayloads>) {
  try {
    yield call(logoutUser)
    if (payload?.onSuccess) yield call(payload?.onSuccess)
  } catch (error) {
    if (payload?.onFailure) yield call(payload?.onFailure, error as Error)
  }
}

export function* watcherLoginAuthentication() {
  yield takeLatest(AUTH_LOGIN_STARTED, loginSagaWorker)
}

export function* watcherRegisterAuthentication() {
  yield takeLatest(AUTH_REGISTER_STARTED, registerSagaWorker)
}

export function* watcherLogoutAuthentication() {
  yield takeLatest(AUTH_LOGOUT, logoutSagaWorker)
}

const authReducer = (
  state = initialState,
  action: StoreAction<AuthPayloads>,
): AuthState => {
  switch (action.type) {
    case AUTH_LOGIN_STARTED:
    case AUTH_REGISTER_STARTED: {
      return {
        ...state,
        authStatus: 'started',
      }
    }
    case AUTH_SUCCESS: {
      const { payload } = action
      return {
        ...state,
        authStatus: 'success',
        isLoggedIn: true,
        currentUser: payload!.user,
      }
    }
    case AUTH_FAILURE:
      return {
        ...state,
        authStatus: 'failure',
        isLoggedIn: false,
        currentUser: null,
      }
    case AUTH_LOGOUT:
      return initialState
    default:
      return state
  }
}

export default authReducer
