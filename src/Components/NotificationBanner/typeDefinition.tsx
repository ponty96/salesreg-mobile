export type IBannerStyle = 'success' | 'warning' | 'danger' | 'info' | 'none'
export type IBannerPosition = 'top' | 'bottom'
export type IDuration = 'long' | 'short' | number
export interface INotificationBannerProps {
  title?: string
  subtitle?: string
  style?: IBannerStyle
  customView?: React.ReactNode
}
