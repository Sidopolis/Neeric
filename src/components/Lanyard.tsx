/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, Html, Text, useGLTF, useTexture } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import cardGLB from './card.glb';
import lanyard from './lanyard.png';
import { NeericLogoDiagonal } from './NeericLogo';
import * as THREE from 'three';
import './Lanyard.css';
import { GLTF } from 'three-stdlib';  
import { motion, useMotionValue, useSpring, PanInfo, useTransform } from 'framer-motion';
import { MouseEvent } from 'react';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard() {
  // Motion values for vertical drag and stretch
  const y = useMotionValue(0);
  const scaleY = useMotionValue(1);
  const springY = useSpring(y, { stiffness: 300, damping: 18 });
  const springScaleY = useSpring(scaleY, { stiffness: 300, damping: 18 });

  // Band height: base + stretch
  const baseBandHeight = 64;
  const bandHeight = useTransform(springY, v => `${baseBandHeight + v}px`);

  function handleDrag(_: unknown, info: PanInfo) {
    // Only allow downward drag
    if (info.offset.y > 0) {
      y.set(info.offset.y);
      scaleY.set(1 + Math.min(0.18, info.offset.y / 180));
    } else {
      y.set(0);
      scaleY.set(1);
    }
  }
  function handleDragEnd() {
    y.set(0);
    scaleY.set(1);
  }

  return (
    <div className="lanyard-card-outer minimal">
      {/* Minimal straight lanyard band, animated height */}
      <motion.div
        className="lanyard-minimal-band"
        style={{
          height: bandHeight,
        }}
      />
      {/* Minimal card with stretch and bounce */}
      <motion.div
        className="lanyard-card minimal-card"
        style={{
          y: springY,
          scaleY: springScaleY,
          touchAction: 'none',
        }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 120 }}
        dragElastic={0.18}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.01 }}
        tabIndex={0}
      >
        <div className="lanyard-card-header">
          <NeericLogoDiagonal size={32} color="#1ed760" />
          <span className="lanyard-card-title">NEERIC</span>
        </div>
        <div className="lanyard-card-name">D Sidhant Patro</div>
        <div className="lanyard-card-role">Alone Developer</div>
        <div className="lanyard-card-desc">
          Building Neeric to help teams clean up AWS and save big
        </div>
      </motion.div>
    </div>
  );
} 