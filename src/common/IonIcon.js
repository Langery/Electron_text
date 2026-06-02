import React, { memo } from 'react'
import {
  PlusCircleOutlined,
  ReloadOutlined,
  ArrowRightOutlined,
  HighlightOutlined,
  CoffeeOutlined,
  ExperimentOutlined,
  MessageOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons'

const iconMap = {
  'add-circle-outline': PlusCircleOutlined,
  'refresh-outline': ReloadOutlined,
  'arrow-forward-outline': ArrowRightOutlined,
  'balloon-outline': HighlightOutlined,
  'beer-outline': CoffeeOutlined,
  'bandage-outline': ExperimentOutlined,
  'chatbubbles-outline': MessageOutlined,
  'cart-outline': ShoppingCartOutlined
}

const IonIcon = memo(({ name, size = 20, color = '#1CA57A', style, className = '' }) => {
  const IconComponent = iconMap[name]

  if (!IconComponent) {
    return <span className={`ion-icon ${className}`} style={{ width: size, height: size, display: 'inline-flex', ...style }} />
  }

  return (
    <IconComponent
      className={className}
      style={{ fontSize: size, color, ...style }}
    />
  )
})

export default IonIcon