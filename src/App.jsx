import React from 'react'
import CrudOperations from './components/crudOperations'
import Sidebar from './components/Sidebar'
import Menuu from './components/antDesignMenu'
import Headerr from './components/header'
// import ProSidebar, { MultiLevelSidebar } from './components/tailSidebar'


const App = () => {
  return (
    <div className='wrapperSidebar'>
{/* <Sidebar /> */}
<Menuu />
<div style={{width:"100%"}}>
<Headerr />
      <CrudOperations />
      </div>   </div>
  )
}

export default App