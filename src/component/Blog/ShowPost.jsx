import parse from 'html-react-parser'
const ShowPost = ({content}) => {
  return (
    <div className='m-4 p-4 bg-gray-200'>
      {parse(content)}   
    </div>
  )
}

export default ShowPost
