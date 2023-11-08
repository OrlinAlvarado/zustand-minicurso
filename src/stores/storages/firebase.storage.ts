import { StateStorage, createJSONStorage } from 'zustand/middleware'

const firebaserl = 'https://tubp-lnggua.firebaseio.com/zustand'

const storageApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
      try {
        const data = await fetch(`${ firebaserl }/${ name }.json`).then( res => res.json())
        return JSON.stringify(data);
      } catch (error) {
        return null
      }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    const data = await fetch(`${ firebaserl }/${ name }.json`, {
        method: 'PUT',
        body: value
    }).then( res => res.json())
  },
  removeItem: function (name: string): void {

  }
}

export const firebaseStorage = createJSONStorage(() => storageApi)