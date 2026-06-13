

import { memo, useState, useEffect, useRef } from 'react'
import LiveTicker from '../../../layouts/LiveTicker'


const HeroSection = memo(() => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [nextImageIndex, setNextImageIndex] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState('left')
  const timerRef = useRef(null)
  const containerRef = useRef(null)

  const images = [
    {
      desktop: '/Desktop4.png',
      laptop: '/Laptop3.png',
      tablet: '/Tablet.png',
      mobile: '/mobile.png',
      alt: 'Sports Stadium 1'
    },
    {
      desktop: '/Desktop5.png',
      laptop: '/Laptop4.png',
      tablet: '/Tablet3.png',
      mobile: '/mobile2.png',
      alt: 'Sports Stadium 2'
    },
    {
      desktop: '/Desktop6.png',
      laptop: '/Laptop5.png',
      tablet: '/tablet4.png',
      mobile: '/mobile3.png',
      alt: 'Sports Stadium 3'
    }
  ]

  const getImageSrcForScreen = (image) => {
    if (typeof window === 'undefined') return image.desktop
    const w = window.innerWidth
    if (w >= 1280) return image.desktop
    if (w >= 1024) return image.laptop
    if (w >= 768) return image.tablet
    return image.mobile
  }

  useEffect(() => {
    const updateHeight = () => {
      const src = getImageSrcForScreen(images[currentImageIndex])
      const img = new Image()
      img.onload = () => {
        const aspectRatio = img.naturalHeight / img.naturalWidth
        const containerWidth = window.innerWidth

        // 🔥 MODERATE increase - 0.85 instead of 0.7 (thoda sa badha)
        const scaleFactor = 0.85  // Balance between height and comfort
        const calculatedHeight = containerWidth * aspectRatio * scaleFactor

        setContainerHeight(`${calculatedHeight}px`)
      }
      img.src = src
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [currentImageIndex])

  const goToIndex = (newIndex, dir = 'left') => {
    if (animating || newIndex === currentImageIndex) return
    setDirection(dir)
    setNextImageIndex(newIndex)
    setAnimating(true)
    setTimeout(() => {
      setCurrentImageIndex(newIndex)
      setNextImageIndex(null)
      setAnimating(false)
    }, 380)
  }

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrentImageIndex(prev => {
        const next = (prev + 1) % images.length
        goToIndex(next, 'left')
        return prev
      })
    }, 5000)
  }

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [currentImageIndex])

  const ImageSlide = ({ image, className = '' }) => (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      <img
        src={getImageSrcForScreen(image)}
        alt={image.alt}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'cover'  // No stretch - maintains aspect ratio
        }}
      />
    </div>
  )

  return (
    <div
      ref={containerRef}
      className="relative text-white overflow-hidden w-full h-auto"
    >
      <style>{`

      `}</style>

      <ImageSlide
        image={images[currentImageIndex]}
        className={
          animating
            ? direction === 'left'
              ? 'slide-current-out'
              : 'slide-current-out-reverse'
            : ''
        }
      />

      {animating && nextImageIndex !== null && (
        <ImageSlide
          image={images[nextImageIndex]}
          className={direction === 'left' ? 'slide-next-in' : 'slide-next-in-reverse'}
        />
      )}

      <div className="absolute inset-0 bg-black/30 z-10" />

      <div className="relative z-20">
        <LiveTicker />
      </div>

  
   
    </div>
  )
})

HeroSection.displayName = 'HeroSection'
export default HeroSection