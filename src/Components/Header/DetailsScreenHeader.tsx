import React from 'react'

import BaseHeader, { IProps } from './BaseHeader'

const Header = (props: IProps) => (
  <BaseHeader
    leftIconTitle="md-arrow-back"
    leftIconType="Ionicons"
    title={props.title}
    rightIconStyle={{
      transform: [{ rotate: '270deg' }]
    }}
    rightIconTitle="pencil"
    rightIconType="MaterialCommunityIcons"
    {...props}
  />
)

export default Header
