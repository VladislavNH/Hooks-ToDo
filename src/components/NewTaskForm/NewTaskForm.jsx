import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css' 

export default function NewTaskForm({ onItemAdded }) {
  const [text,    setText]    = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const description = text.trim()
    if (!description) return

    const min = parseInt(minutes, 10) || 0
    const sec = parseInt(seconds, 10) || 0
    const totalSeconds = min * 60 + sec

    onItemAdded(description, totalSeconds)
    setText(''); setMinutes(''); setSeconds('')
  }

  return (
    <form className="new-todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        min="0"
        value={minutes}
        onChange={e => setMinutes(e.target.value)}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        min="0"
        value={seconds}
        onChange={e => setSeconds(e.target.value)}
      />
      <button
        type="submit"
        style={{ display: 'none' }}
        aria-label="Add new task"
      />
    </form>
  )
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}
