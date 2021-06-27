import { reactive, InjectionKey, readonly } from '@nuxtjs/composition-api'

interface AccountStore {
  state: {
    readonly account: string;
    readonly signature: string;
  };
  setAccount: (account: string) => void;
  setSignature: (signature: string) => void;
  logout: () => void;
}

const state = reactive({
  account: '',
  signature: ''
})
const setAccount = (account: string) => {
  state.account = account
}
const setSignature = (signature: string) => {
  state.signature = signature
}
const logout = (): void => {
  state.account = ''
  state.signature = ''
}

export const AccountKey: InjectionKey<AccountStore> = Symbol('AccountKey')

export default {
  state: readonly(state),
  setAccount,
  setSignature,
  logout
}
