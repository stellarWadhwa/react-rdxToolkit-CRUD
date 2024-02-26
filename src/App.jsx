import React from 'react'
import CrudOperations from './components/crudOperations'
import Sidebar from './components/Sidebar'
// import ProSidebar, { MultiLevelSidebar } from './components/tailSidebar'


const App = () => {
  return (
    <div className='wrapperSidebar'>
<Sidebar />
      <CrudOperations />
    </div>
  )
}

export default App