import React from 'react'
import CrudOperations from './components/crudOperations'
import Sidebar from './components/Sidebar'
import Menuu from './components/antDesignMenu'
// import ProSidebar, { MultiLevelSidebar } from './components/tailSidebar'


const App = () => {
  return (
    <div className='wrapperSidebar'>
{/* <Sidebar /> */}
<Menuu />
      <CrudOperations />
    </div>
  )
}

export default App