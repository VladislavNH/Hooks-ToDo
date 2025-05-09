import React, { useState, useRef, useCallback, useMemo } from 'react'
import './TodoApp.css'

import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList    from './components/TaskList/TaskList'
import Footer      from './components/Footer/Footer'

export default function App() {
  const idCounter = useRef(1)

  const [tasks, setTasks]           = useState([])
  const [renderMode, setRenderMode] = useState('All')

  const addTask = useCallback((description, initialSeconds = 0) => {
    const trimmed = description.trim()
    if (!trimmed) return

    const id = idCounter.current
    idCounter.current += 1

    const newItem = {
      id,
      description:    trimmed,
      created:        new Date(),
      completed:      false,
      editing:        false,
      initialSeconds,
    }

    localStorage.removeItem(`timer-${id}`)

    setTasks(prev => [...prev, newItem])
  }, [])


  const deleteTask = useCallback(id => {
    setTasks(prev => prev.filter(t => t.id !== id))
    localStorage.removeItem(`timer-${id}`)
  }, [])

  const completeTask = useCallback(id => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }, [])

  const editTask = useCallback((id, description) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, editing: !t.editing, description } : t
      )
    )
  }, [])

  const deleteAllComplete = useCallback(() => {
    setTasks(prev => prev.filter(t => !t.completed))
  }, [])

  const itemsLeft = useMemo(
    () => tasks.filter(t => !t.completed).length,
    [tasks]
  )

  const visibleTasks = useMemo(() => {
    switch (renderMode) {
      case 'Active':
        return tasks.filter(t => !t.completed)
      case 'Completed':
        return tasks.filter(t => t.completed)
      default:
        return tasks
    }
  }, [tasks, renderMode])

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm onItemAdded={addTask} />
      </header>

      <section className="main">
        <TaskList
          tasks={visibleTasks}
          renderMode={renderMode}
          onCompleteTask={completeTask}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
        />
        <Footer
          itemsLeft={itemsLeft}
          renderMode={renderMode}
          renderOptions={['All', 'Active', 'Completed']}
          onRenderModeChange={setRenderMode}
          onDeleteAllComplete={deleteAllComplete}
        />
      </section>
    </section>
  )
}
