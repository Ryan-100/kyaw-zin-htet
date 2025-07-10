import React from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Object3D
  }
  materials: Record<string, THREE.Material>
}

export function Rocket(props: React.JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/model/rocket.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.mesh_0 as THREE.Mesh).geometry}
          material={(nodes.mesh_0 as THREE.Mesh).material}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/model/rocket.glb')
