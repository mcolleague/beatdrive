const Library = (props) => {
  return (
    <div className="Library">
      <div>Je suis library</div>
      <div>{Object.keys(props)}</div>
    </div>
  )
}

export default Library
