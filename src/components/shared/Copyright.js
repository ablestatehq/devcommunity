import React from 'react'

const Copyright = () => {
    const [year, setYear] = React.useState(new Date().getFullYear())

  return (
    <p>
      &copy; Ablestate Creatives Ltd. {year}
    </p>
  )
}

export default Copyright