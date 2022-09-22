import React from 'react'
import Aside from '../Components/Aside'
import NewsTable from '../Components/NewsTable'

const News = ({setMessage}) => {
  return (
    <>
    <div className="flex w-full h-auto md:h-screen bg-gray-50 dark:bg-gray-900 ">
      <Aside />
      <main className="md:px-6 mx-auto w-full grow overflow-y-auto">
   
        <NewsTable setMessage={setMessage} />
      </main>
    </div>
  </>
    
  )
}

export default News