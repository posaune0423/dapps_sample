import { reactive, InjectionKey, readonly } from '@nuxtjs/composition-api'

interface AccountStore {
  state: {
    readonly account: string;
    readonly signature: string;
  };
  getAccount: () => string;
  getSignature: () => string;
  setAccount: (account: string) => void;
  setSignature: (signature: string) => void;
}

const state = reactive({
  account: '',
  signature: ''
})
const getAccount = () => {
  return state.account
}
const getSignature = () => {
  return state.signature
}
const setAccount = (account: string) => {
  state.account = account
}
const setSignature = (signature: string) => {
  state.signature = signature
}

export const AccountKey: InjectionKey<AccountStore> = Symbol('AccountKey')

export default {
  state: readonly(state),
  getAccount,
  getSignature,
  setAccount,
  setSignature,
}
