import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, shaderMaterial, useTexture } from '@react-three/drei'
import { BoxGeometry } from 'three'
import Navbar from './components/Navbar';
import ISSModel from './components/ISSModel';

function calcPosFromLatLonRad(lat,lon,radius){
  
  var phi   = (90-lat)*(Math.PI/180);
  var theta = (lon+180)*(Math.PI/180);

  let x = -(radius * Math.sin(phi)*Math.cos(theta));
  let z = (radius * Math.sin(phi)*Math.sin(theta));
  let y = (radius * Math.cos(phi));

  return [x,y,z];

}



const ISS = (props)=>{
  const ISSRef = useRef()
  
  

  return(
    <mesh
    {...props}
    ref={ISSRef}
    scale={1}>
      <sphereGeometry args={[0.01,64,32]}/>
      <meshPhysicalMaterial color={"blue"}/>
    </mesh>
  )
}


const Earth = (props)=>{
  
  const earthRef = useRef()
  const texture = useTexture('images/earthmap4k.jpg')

  // useFrame((state, delta) => (earthRef.current.rotation.y -= 0.001))

  //earthRef.current.position.x = 1

  return (
    <mesh
    {...props}
    ref={earthRef}
    scale = {1.5}
    >
      <sphereGeometry args={[1,64,32]}/>
      <meshPhysicalMaterial map={texture} />
    </mesh>
  )
}





function App() {

  // Default Value
  const [ISSLoc,setISSloc] = useState({
    "timestamp": 1664538901, 
    "iss_position": {
      "longitude": "166.9851", 
      "latitude": "-0.1490"},
       "message": "success"}
       )

  
  // Update every second
  useEffect(() =>{
    
    let interval = setInterval(() => {
      fetch("http://api.open-notify.org/iss-now.json")
    .then( res => (res.json()))
    .then( json =>{
      setISSloc(json)
      console.log(ISSLoc.iss_position.longitude,ISSLoc.iss_position.latitude)
    })
    }, (1000))
    return () => clearInterval(interval)
})

  
  let ISSPosition = calcPosFromLatLonRad(Number(ISSLoc.iss_position.latitude),Number(ISSLoc.iss_position.longitude),1.59)
  //const ISSPosition = calcPosFromLatLonRad(166.9851,-0.1490,1.01)

  return (

    <section class="hero is-grey is-fullheight">
      <div class="hero-head">
        <Navbar></Navbar>
      </div>

      <div class="hero-body ">
          <Canvas className='main'>
            <ambientLight intensity={0.4}/>
            <OrbitControls></OrbitControls>
            <pointLight position={[10, 10, 10]} />
            <Earth position={[0, 0, 0]} />
            {/* <ISS position={ISSPosition}></ISS> */}
            <ISSModel position={ISSPosition}></ISSModel>
          </Canvas>
      </div>  
  </section>
  );
}

export default App;
