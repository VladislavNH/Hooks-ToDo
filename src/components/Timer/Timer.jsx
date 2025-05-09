import React from 'react'
import PropTypes from 'prop-types'
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons'
import { useTimer } from '../TimesHooks/TimerHooks'
import './Timer.css'

export default function Timer({ taskId }) {
  const { seconds, running, start, pause, reset } = useTimer(taskId)

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  const toggle = running ? pause : start

  return (
    <div className="timer">
      <span className="timer-display">
        {mm}:{ss}
      </span>

      <button
        type="button"
        className="timer-btn icon"
        onClick={toggle}
        aria-label={running ? 'Pause timer' : 'Start timer'}
      >
        {running
          ? <PauseCircleOutlined style={{ fontSize: '1.5rem' }} />
          : <PlayCircleOutlined  style={{ fontSize: '1.5rem' }} />
        }
      </button>

      <button
        type="button"
        className="timer-btn reset-btn"
        onClick={reset}
        aria-label="Reset timer"
      >
        Reset
      </button>
    </div>
  )
}

Timer.propTypes = {
  taskId: PropTypes.number.isRequired,
}
