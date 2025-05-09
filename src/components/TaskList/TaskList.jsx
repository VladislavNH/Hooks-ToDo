import React from 'react'
import PropTypes from 'prop-types'

import Task     from '../Task/Task'
import EditTask from '../EditTask/EditTask'

export default function TaskList({
  tasks,
  renderMode,
  onCompleteTask,
  onDeleteTask,
  onEditTask,
}) {
  const visible = tasks.filter(t => {
    if (renderMode === 'Active')    return !t.completed
    if (renderMode === 'Completed') return  t.completed
    return true
  })

  return (
    <ul className="todo-list">
      {visible.map(task => {
        const { id, description, created, completed, editing, initialSeconds } = task
        const liClass = [
          completed ? 'completed' : '',
          editing   ? 'editing'   : '',
        ].filter(Boolean).join(' ')

        return (
          <li key={id} className={liClass}>
            {editing ? (
              <EditTask
                id={id}
                description={description}
                onEditTask={onEditTask}
              />
            ) : (
              <Task
                id={id}
                description={description}
                created={created}
                completed={completed}
                initialSeconds={initialSeconds}   
                onCompleteTask={onCompleteTask}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id:PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    created:PropTypes.instanceOf(Date).isRequired,
    completed:PropTypes.bool.isRequired,
    editing:PropTypes.bool.isRequired,
    initialSeconds:PropTypes.number.isRequired,
  })).isRequired,
  renderMode:PropTypes.oneOf(['All','Active','Completed']),
  onCompleteTask:PropTypes.func.isRequired,
  onDeleteTask:PropTypes.func.isRequired,
  onEditTask:PropTypes.func.isRequired,
}
TaskList.defaultProps = {
  renderMode: 'All',
}
