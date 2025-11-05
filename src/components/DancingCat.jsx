import { useEffect, useRef } from 'react'
import catImage from '../assets/images/cat.svg'
import ControlPanel from './ControlPanel'
import { useAnimation } from '../hooks/useAnimation'
import '../styles/DancingCat.css'

function DancingCat() {
  const {
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
  } = useAnimation()

  const catRef = useRef(null)

  useEffect(() => {
    if (catRef.current && isDancing) {
      const keyframes = generateKeyframes(danceStyle, jumpHeight, rotationIntensity, scaleIntensity)

      // 기존 애니메이션 제거
      catRef.current.style.animation = 'none'

      // 강제 리플로우
      void catRef.current.offsetHeight

      // 새 애니메이션 적용
      catRef.current.style.animation = `dance-${danceStyle} ${speed}s ease-in-out infinite`

      // 동적 keyframes 생성
      updateKeyframes(danceStyle, keyframes)
    } else if (catRef.current && !isDancing) {
      catRef.current.style.animation = 'none'
    }
  }, [isDancing, speed, jumpHeight, rotationIntensity, scaleIntensity, danceStyle])

  const generateKeyframes = (style, jump, rotation, scale) => {
    const baseScale = 1
    const maxScale = baseScale + scale

    switch (style) {
      case 'bounce':
        return [
          { offset: 0, transform: `translateY(0) rotate(0deg) scale(${baseScale})` },
          { offset: 0.25, transform: `translateY(-${jump}px) rotate(-${rotation}deg) scale(${maxScale})` },
          { offset: 0.5, transform: `translateY(0) rotate(${rotation}deg) scale(${baseScale})` },
          { offset: 0.75, transform: `translateY(-${jump}px) rotate(-${rotation}deg) scale(${maxScale})` },
          { offset: 1, transform: `translateY(0) rotate(0deg) scale(${baseScale})` }
        ]

      case 'spin':
        return [
          { offset: 0, transform: `rotate(0deg) scale(${baseScale})` },
          { offset: 0.25, transform: `rotate(${rotation * 9}deg) scale(${maxScale})` },
          { offset: 0.5, transform: `rotate(${rotation * 18}deg) scale(${baseScale})` },
          { offset: 0.75, transform: `rotate(${rotation * 27}deg) scale(${maxScale})` },
          { offset: 1, transform: `rotate(${rotation * 36}deg) scale(${baseScale})` }
        ]

      case 'wave':
        return [
          { offset: 0, transform: `translateX(0) translateY(0) rotate(0deg) scale(${baseScale})` },
          { offset: 0.25, transform: `translateX(-${jump}px) translateY(-${jump / 2}px) rotate(-${rotation}deg) scale(${maxScale})` },
          { offset: 0.5, transform: `translateX(0) translateY(-${jump}px) rotate(0deg) scale(${baseScale})` },
          { offset: 0.75, transform: `translateX(${jump}px) translateY(-${jump / 2}px) rotate(${rotation}deg) scale(${maxScale})` },
          { offset: 1, transform: `translateX(0) translateY(0) rotate(0deg) scale(${baseScale})` }
        ]

      case 'crazy':
        return [
          { offset: 0, transform: `translateY(0) rotate(0deg) scale(${baseScale})` },
          { offset: 0.1, transform: `translateY(-${jump}px) rotate(-${rotation * 2}deg) scale(${maxScale})` },
          { offset: 0.2, transform: `translateY(${jump / 2}px) rotate(${rotation}deg) scale(${baseScale})` },
          { offset: 0.3, transform: `translateY(-${jump * 1.5}px) rotate(-${rotation * 3}deg) scale(${maxScale * 1.1})` },
          { offset: 0.4, transform: `translateY(0) rotate(${rotation * 2}deg) scale(${baseScale})` },
          { offset: 0.5, transform: `translateY(-${jump}px) rotate(0deg) scale(${maxScale})` },
          { offset: 0.6, transform: `translateY(${jump / 2}px) rotate(-${rotation}deg) scale(${baseScale})` },
          { offset: 0.7, transform: `translateY(-${jump / 2}px) rotate(${rotation * 2}deg) scale(${maxScale})` },
          { offset: 0.8, transform: `translateY(0) rotate(-${rotation}deg) scale(${baseScale})` },
          { offset: 0.9, transform: `translateY(-${jump / 3}px) rotate(${rotation}deg) scale(${maxScale})` },
          { offset: 1, transform: `translateY(0) rotate(0deg) scale(${baseScale})` }
        ]

      default:
        return []
    }
  }

  const updateKeyframes = (style, keyframes) => {
    const styleSheet = document.styleSheets[0]
    const animationName = `dance-${style}`

    // 기존 keyframes 제거
    for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
      if (styleSheet.cssRules[i].name === animationName) {
        styleSheet.deleteRule(i)
      }
    }

    // 새 keyframes 추가
    let keyframesString = `@keyframes ${animationName} {`
    keyframes.forEach(frame => {
      keyframesString += `${frame.offset * 100}% { transform: ${frame.transform}; }`
    })
    keyframesString += '}'

    styleSheet.insertRule(keyframesString, styleSheet.cssRules.length)
  }

  return (
    <div className="dancing-cat-container">
      <div ref={catRef} className="cat">
        <img src={catImage} alt="Dancing Cat" />
      </div>

      <ControlPanel
        isDancing={isDancing}
        speed={speed}
        jumpHeight={jumpHeight}
        rotationIntensity={rotationIntensity}
        scaleIntensity={scaleIntensity}
        danceStyle={danceStyle}
        onToggleDance={toggleDance}
        onSpeedChange={setSpeed}
        onJumpHeightChange={setJumpHeight}
        onRotationChange={setRotationIntensity}
        onScaleChange={setScaleIntensity}
        onStyleChange={setDanceStyle}
        onReset={resetSettings}
      />
    </div>
  )
}

export default DancingCat
