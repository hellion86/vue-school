export const usePageStore = defineStore('pageStore', () => {

  const pageData = ref({
    title: ''
  })

  return {
    pageData
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
}
