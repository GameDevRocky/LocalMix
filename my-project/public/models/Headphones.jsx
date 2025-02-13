

// Desk.jsx
import React, { forwardRef, useRef } from 'react';
import { useGLTF } from '@react-three/drei';

const Headphones = forwardRef((props, ref) => {
  const group = useRef();
  
  // Load the GLTF model
  const { scene, nodes, materials } = useGLTF('/models/microphones.glb');

  return (
    <group ref={ref} {...props} dispose={null}>
      {/* Render the loaded scene */}
      <primitive object={scene} />
      
      {/* Example: Customize materials or nodes if needed */}
      {/*<mesh
        geometry={nodes.Table.geometry}
        material={materials.Wood}
      /> */}
    </group>
  );
});

// Preload the GLTF model for optimization
useGLTF.preload('/models/microphones.glb');

export default Headphones;
