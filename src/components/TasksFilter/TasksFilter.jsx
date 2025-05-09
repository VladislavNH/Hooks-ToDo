import React from 'react'
import PropTypes from 'prop-types'
import './TasksFilter.css'

export default function TasksFilter({
  renderOptions,
  renderMode,
  onRenderModeChange,
}) {
  return (
    <ul className="filters">
      {renderOptions.map(option => (
        <li key={option}>
          <button
            type="button"
            className={renderMode === option ? 'selected' : ''}
            onClick={() => onRenderModeChange(option)}
          >
            {option}
          </button>
        </li>
      ))}
    </ul>
  )
}

TasksFilter.propTypes = {
  renderOptions:PropTypes.arrayOf(PropTypes.string),
  renderMode:PropTypes.oneOf(['All', 'Active', 'Completed']),
  onRenderModeChange:PropTypes.func.isRequired,
}

TasksFilter.defaultProps = {
  renderOptions: ['All', 'Active', 'Completed'],
  renderMode:'All',
}
