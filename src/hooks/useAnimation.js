import { useState } from 'react'

export const useAnimation = () => {
  const [isDancing, setIsDancing] = useState(true)
  const [speed, setSpeed] = useState(2) // 초 단위
  const [jumpHeight, setJumpHeight] = useState(30) // px
  const [rotationIntensity, setRotationIntensity] = useState(10) // 도
  const [scaleIntensity, setScaleIntensity] = useState(0.1) // 배율
  const [danceStyle, setDanceStyle] = useState('bounce') // bounce, spin, wave, crazy

  const toggleDance = () => {
    setIsDancing(!isDancing)
  }

  const resetSettings = () => {
    setSpeed(2)
    setJumpHeight(30)
    setRotationIntensity(10)
    setScaleIntensity(0.1)
    setDanceStyle('bounce')
  }

  return {
    isDancing,
    speed,
    jumpHeight,
    rotationIntensity,
    scaleIntensity,
    danceStyle,
    toggleDance,
    setSpeed,
    setJumpHeight,
    setRotationIntensity,
    setScaleIntensity,
    setDanceStyle,
    resetSettings
  }
}
