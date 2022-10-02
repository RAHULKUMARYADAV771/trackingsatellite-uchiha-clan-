import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'


const ISSModel = ({position}) => {
    const obj = useLoader(OBJLoader, 'models/scene.obj')
    return ( 
        <primitive object={obj} position={position} scale={0.01} rotation={[0, 5.5, 0]}/>
     );
}
 
export default ISSModel;
