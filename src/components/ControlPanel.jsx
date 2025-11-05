import '../styles/ControlPanel.css'

function ControlPanel({
  isDancing,
  speed,
  jumpHeight,
  rotationIntensity,
  scaleIntensity,
  danceStyle,
  onToggleDance,
  onSpeedChange,
  onJumpHeightChange,
  onRotationChange,
  onScaleChange,
  onStyleChange,
  onReset
}) {
  return (
    <div className="control-panel">
      <h2>🎮 Dance Controls</h2>

      {/* 시작/정지 버튼 */}
      <button className="control-button primary" onClick={onToggleDance}>
        {isDancing ? '⏸ Stop Dancing' : '▶ Start Dancing'}
      </button>

      {/* 춤 스타일 선택 */}
      <div className="control-group">
        <label>🎭 Dance Style</label>
        <div className="style-buttons">
          <button
            className={`style-button ${danceStyle === 'bounce' ? 'active' : ''}`}
            onClick={() => onStyleChange('bounce')}
          >
            Bounce
          </button>
          <button
            className={`style-button ${danceStyle === 'spin' ? 'active' : ''}`}
            onClick={() => onStyleChange('spin')}
          >
            Spin
          </button>
          <button
            className={`style-button ${danceStyle === 'wave' ? 'active' : ''}`}
            onClick={() => onStyleChange('wave')}
          >
            Wave
          </button>
          <button
            className={`style-button ${danceStyle === 'crazy' ? 'active' : ''}`}
            onClick={() => onStyleChange('crazy')}
          >
            Crazy
          </button>
        </div>
      </div>

      {/* 속도 조절 */}
      <div className="control-group">
        <label>⚡ Speed: {speed.toFixed(1)}s</label>
        <input
          type="range"
          min="0.5"
          max="5"
          step="0.1"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className="slider"
        />
        <div className="slider-labels">
          <span>Fast</span>
          <span>Slow</span>
        </div>
      </div>

      {/* 점프 높이 조절 */}
      <div className="control-group">
        <label>🦘 Jump Height: {jumpHeight}px</label>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={jumpHeight}
          onChange={(e) => onJumpHeightChange(parseInt(e.target.value))}
          className="slider"
        />
        <div className="slider-labels">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>

      {/* 회전 강도 조절 */}
      <div className="control-group">
        <label>🔄 Rotation: {rotationIntensity}°</label>
        <input
          type="range"
          min="0"
          max="45"
          step="5"
          value={rotationIntensity}
          onChange={(e) => onRotationChange(parseInt(e.target.value))}
          className="slider"
        />
        <div className="slider-labels">
          <span>None</span>
          <span>Intense</span>
        </div>
      </div>

      {/* 크기 변화 조절 */}
      <div className="control-group">
        <label>📏 Scale: {(scaleIntensity * 100).toFixed(0)}%</label>
        <input
          type="range"
          min="0"
          max="0.5"
          step="0.05"
          value={scaleIntensity}
          onChange={(e) => onScaleChange(parseFloat(e.target.value))}
          className="slider"
        />
        <div className="slider-labels">
          <span>None</span>
          <span>Large</span>
        </div>
      </div>

      {/* 리셋 버튼 */}
      <button className="control-button reset" onClick={onReset}>
        🔄 Reset to Default
      </button>
    </div>
  )
}

export default ControlPanel
