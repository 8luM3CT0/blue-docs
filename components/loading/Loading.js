//front-end
import Image from 'next/image'
import { Circle } from 'better-react-spinkit'
//back-end

function Loading () {
  return (
    <center
      style={{
        display: 'grid',
        placeItems: 'center',
        height: '100vh'
      }}
    >
      <div className='relative h-[200px]'>
        <Image
          src='https://links.papareact.com/1ui'
          className='mb-[10px]'
          layout='fill'
          objectFit='contain'
        />
      </div>
      <Circle color='#007FFF' size={60} />
    </center>
  )
}

export default Loading
