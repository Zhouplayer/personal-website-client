// TreeContext.js
import { createContext } from 'react';

/**
 * @typedef {'CHAOS' | 'FORMED'} AppState
 */

/**
 * @typedef {Object} PointerCoords
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} PanOffset
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} TreeContextType
 * @property {AppState} state
 * @property {(state: AppState) => void} setState
 * @property {number} rotationSpeed
 * @property {(speed: number) => void} setRotationSpeed
 * @property {boolean} webcamEnabled
 * @property {(enabled: boolean) => void} setWebcamEnabled
 * @property {PointerCoords | null} pointer
 * @property {(coords: PointerCoords | null) => void} setPointer
 * @property {number} hoverProgress
 * @property {(progress: number) => void} setHoverProgress
 * @property {number} clickTrigger
 * @property {(time: number) => void} setClickTrigger
 * @property {string | null} selectedPhotoUrl
 * @property {(url: string | null) => void} setSelectedPhotoUrl
 * @property {PanOffset} panOffset
 * @property {import('react').Dispatch<import('react').SetStateAction<PanOffset>>} setPanOffset
 * @property {number} rotationBoost
 * @property {import('react').Dispatch<import('react').SetStateAction<number>>} setRotationBoost
 * @property {number} zoomOffset
 * @property {import('react').Dispatch<import('react').SetStateAction<number>>} setZoomOffset
 */

/**
 * @typedef {Object} ParticleData
 * @property {string} id
 * @property {[number, number, number]} chaosPos
 * @property {[number, number, number]} treePos
 * @property {[number, number, number]} chaosRot
 * @property {[number, number, number]} treeRot
 * @property {number} scale
 * @property {string} color
 * @property {string} [image]
 * @property {number} [year]
 * @property {string} [month]
 * @property {'LEAF' | 'ORNAMENT' | 'PHOTO'} type
 */

/**
 * @type {import('react').Context<TreeContextType>}
 */
export const TreeContext = createContext(
  /** @type {TreeContextType} */({})
);