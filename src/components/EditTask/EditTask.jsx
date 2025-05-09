import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function EditTask({ id, description, onEditTask }) {
  const [value, setValue] = useState(description)

  const submit = () => {
    onEditTask(id, value.trim())
  }

  return (
    <input
      className="edit"
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={submit}
      onKeyDown={e => e.key === 'Enter' && submit()}
    />
  )
}

EditTask.propTypes = {
  id: PropTypes.number.isRequired,
  description:PropTypes.string.isRequired,
  onEditTask:PropTypes.func.isRequired,
}
