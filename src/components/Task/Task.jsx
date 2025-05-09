import React from 'react'
import PropTypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useTimer } from '../TimesHooks/TimerHooks'

export default function Task({
  id,
  description,
  created,
  completed,
  initialSeconds,
  onCompleteTask,
  onDeleteTask,
  onEditTask,
}) {
  const { seconds, running, start, pause } = useTimer(id, initialSeconds)
  const min = String(Math.floor(seconds / 60)).padStart(2, '0')
  const sec = String(seconds % 60).padStart(2, '0')

  return (
    <li className={`${completed ? 'completed' : ''}`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => onCompleteTask(id)}
          id={`checkbox-${id}`}
        />

        <label htmlFor={`checkbox-${id}`}>
          <span className="title">{description}</span>

          <span className="description">
            <button
              className="icon icon-play"
              type="button"
              aria-label="Start timer"
              onClick={start}
              disabled={running || seconds === 0}
            />
            <button
              className="icon icon-pause"
              type="button"
              aria-label="Pause timer"
              onClick={pause}
              disabled={!running}
            />
            {min}:{sec}
          </span>

          <span className="description">
            created {formatDistanceToNow(created)} ago
          </span>
        </label>

        <button
          className="icon icon-edit"
          type="button"
          aria-label="Edit task"
          onClick={() => onEditTask(id, description)}
        />
        <button
          className="icon icon-destroy"
          type="button"
          aria-label="Delete task"
          onClick={() => onDeleteTask(id)}
        />
      </div>
    </li>
  )
}

Task.propTypes = {
  id:PropTypes.number.isRequired,
  description:PropTypes.string.isRequired,
  created:PropTypes.instanceOf(Date).isRequired,
  completed:PropTypes.bool.isRequired,
  initialSeconds:PropTypes.number.isRequired,
  onCompleteTask:PropTypes.func.isRequired,
  onDeleteTask:PropTypes.func.isRequired,
  onEditTask:PropTypes.func.isRequired,
}
