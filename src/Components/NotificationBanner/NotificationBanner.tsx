import { _Store } from './Root'
import {
  IBannerPosition,
  IBannerStyle,
  IDuration,
  INotificationBannerProps
} from './typeDefinition'

interface IShowProps {
  bannerPosition?: IBannerPosition
  duration?: IDuration
}

function NotificationBanner({
  title,
  subtitle,
  style,
  customView
}: INotificationBannerProps) {
  return new NotificationBannerContext({
    title,
    subtitle,
    style,
    customView
  })
}

class NotificationBannerContext {
  private title: string
  private subtitle: string
  private style: IBannerStyle
  private autoDismiss: boolean = true
  private customView: React.ReactNode

  constructor({
    title,
    subtitle,
    style,
    customView
  }: INotificationBannerProps) {
    this.title = title || ''
    this.subtitle = subtitle || ''
    this.style = style || 'success'
    this.customView = customView || null
    this.show = this.show.bind(this)
    this.dismiss = this.dismiss.bind(this)
  }

  show = ({ bannerPosition, duration }: IShowProps) => {
    _Store.dispatch('notificationBanner', {
      trigger: Date.now(),
      shouldShow: true,
      title: this.title,
      duration:
        duration == 'long' || !duration
          ? 5000
          : duration == 'short'
          ? 2000
          : duration,
      subtitle: this.subtitle,
      style: this.style,
      customView: this.customView,
      autoDismiss: this.autoDismiss,
      bannerPosition: bannerPosition || 'top'
    })
  }

  dismiss = () => {
    _Store.dispatch('notificationBanner', {
      trigger: Date.now(),
      shouldShow: false
    })
  }
}

export { NotificationBanner }
