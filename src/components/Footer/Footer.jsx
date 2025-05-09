import React from 'react'
import PropTypes from 'prop-types'
import TasksFilter from '../TasksFilter/TasksFilter'

export default function Footer({ itemsLeft, renderMode, renderOptions, onRenderModeChange, onDeleteAllComplete }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft}</strong> items left
      </span>
      <TasksFilter
        renderMode={renderMode}
        renderOptions={renderOptions}
        onRenderModeChange={onRenderModeChange}
      />
      <button
        className="clear-completed"
        onClick={onDeleteAllComplete}
       type="button"
      >
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  itemsLeft:PropTypes.number.isRequired,
  renderMode:PropTypes.oneOf(['All','Active','Completed']),
  renderOptions:PropTypes.arrayOf(PropTypes.string),
  onRenderModeChange:PropTypes.func.isRequired,
  onDeleteAllComplete:PropTypes.func.isRequired,
}

Footer.defaultProps = {
  renderMode:    'All',
  renderOptions: ['All','Active','Completed'],
}
