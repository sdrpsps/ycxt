import { defineStore } from 'pinia'

export const useCounter = defineStore('count', {
  state: () => ({
    value: 1,
  }),
})
