export default class Darken {
  private dark: boolean
  constructor(
    options?: {
      container?: string | null
      default?: string
      toggle?: string | null
      remember?: string | null
      usePrefersColorScheme?: boolean
      class?: string
      variables?: object
      onChange?: (active: boolean) => void
    },
    callback?: (active: boolean) => void
  )
  toggle(): void
  on(): void
  off(): void
}
