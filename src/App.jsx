import React from 'react'
import CrudOperations from './components/crudOperations'
import Sidebar from './components/Sidebar'


const App = () => {
  return (
    <div>
<Sidebar />
      <CrudOperations />
    </div>
  )
}

export default App