import { reactive, InjectionKey, readonly } from '@nuxtjs/composition-api'


interface AccountStore {
  state: {
    readonly account: string;
  };
  setAccount: (account: string) => void;
}

export const AccountKey: InjectionKey<AccountStore> = Symbol('AccountKey')

const state = reactive({
  account: '',
})

const setAccount = (account: string) => {
  state.account = account
}

export default {
  state: readonly(state),
  setAccount,
}
