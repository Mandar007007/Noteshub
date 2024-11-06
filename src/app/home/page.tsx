// components/ThreeScene.js
"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';

const ThreeScene = () => {
  const mountRef = useRef(null);
  const modelRef = useRef(null); // To reference the loaded model
  const mouse = { x: 0, y: 0 }; // Track mouse coordinates

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();

    // Set up the camera with an initial fov
    const initialFov = window.innerWidth < 768 ? 20 : 10; // Example: wider fov on smaller screens
    const camera = new THREE.PerspectiveCamera(initialFov, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2; // Move camera back to fit model better

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add ambient light for general illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Soft white light
    scene.add(ambientLight);

    // Add directional light for shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Strong directional light
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Optional additional lighting for enhanced depth
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-5, -5, -5);
    scene.add(pointLight);

    // Load the GLTF model
    const loader = new GLTFLoader();
    loader.load('/scene.gltf', (gltf) => {
      modelRef.current = gltf.scene;
      
      // Set model position to the left
      modelRef.current.position.x = -0.05; // Shift model left on x-axis

      // Initial rotation in x-axis
      scene.add(modelRef.current);
    }, undefined, (error) => {
      console.error('An error occurred while loading the model:', error);
    });

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);

      // Continuous rotation
      if (modelRef.current) {
        // modelRef.current.rotation.x += 0.01;
        // modelRef.current.rotation.y += 0.01;
        modelRef.current.rotation.y = mouse.x * 0.5; // Rotate in y based on mouse
        modelRef.current.rotation.x = -mouse.y * 0.5; // Optional: rotate slightly in z based on mouse
      }

      // Render the scene
      renderer.render(scene, camera);
    };
    animate();

    // Update mouse coordinates on mouse move
    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Handle window resizing and make fov responsive
    const onResize = () => {
      // Update renderer size
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // Update camera aspect ratio
      camera.aspect = window.innerWidth / window.innerHeight;
      
      // Adjust fov based on window width
      camera.fov = window.innerWidth < 768 ? 20 : 10; // Example responsive fov
      camera.updateProjectionMatrix(); // Apply changes to camera
    };
    window.addEventListener('resize', onResize);

    // Clean up on component unmount
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className='' style={{ width: '100vw', height: '100vh' }} />;
};

export default ThreeScene;
