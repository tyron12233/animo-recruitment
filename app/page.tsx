"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Code, Palette, Star, ChevronDown, Sparkles } from "lucide-react"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"

const positions = [
  {
    category: "Executive Board",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    surfaceColor: "bg-blue-100/30",
    icon: <Star className="w-6 h-6" />,
    positions: ["Executive Vice President", "Treasurer", "Project Manager"],
  },
  {
    category: "Development Board",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    surfaceColor: "bg-green-100/30",
    icon: <Code className="w-6 h-6" />,
    positions: ["Backend Developers Head", "DevOps Manager"],
  },
  {
    category: "Creatives & Marketing",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    surfaceColor: "bg-red-100/30",
    icon: <Palette className="w-6 h-6" />,
    positions: ["Content Creator (2 positions)", "Graphic Designer"],
  },
  {
    category: "Others",
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50",
    surfaceColor: "bg-yellow-100/30",
    icon: <Users className="w-6 h-6" />,
    positions: ["Lasallian Student Ambassador"],
  },
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const isMobile = useIsMobile()
  const { scrollY } = useScroll()
  
  // Reduce scroll-based transforms on mobile for better performance
  const y1 = useTransform(scrollY, [0, 1000], [0, isMobile ? -50 : -200])
  const y2 = useTransform(scrollY, [0, 1000], [0, isMobile ? 50 : 200])
  const y3 = useTransform(scrollY, [0, 1000], [0, isMobile ? -25 : -100])
  const rotate = useTransform(scrollY, [0, 1000], [0, isMobile ? 180 : 360])
  const scale = useTransform(scrollY, [0, 500], [1, isMobile ? 1.05 : 1.2])

  const springConfig = { stiffness: isMobile ? 50 : 100, damping: isMobile ? 40 : 30, restDelta: 0.001 }
  const x = useSpring(0, springConfig)

  // Reduce floating elements on mobile and simplify animations
  const floatingBackgrounds = useMemo(() => {
    const count = isMobile ? 4 : 12 // Fewer elements on mobile
    return [...Array(count)].map((_, i) => (
          <motion.div
            key={i}
            animate={isMobile ? 
              // Simpler animation for mobile
              {
                opacity: [0.1, 0.2, 0.1],
              } : 
              // Full animation for desktop
              {
                y: [0, -20, 0],
                opacity: [0.1, 0.3, 0.1],
              }
            }
            transition={{
              duration: isMobile ? 6 : 4 + Math.random() * 2, // Slower on mobile
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
            className={`absolute w-1.5 h-1.5 rounded-full ${
              ["bg-blue-500/20", "bg-red-500/20", "bg-green-500/20", "bg-yellow-500/20"][Math.floor(Math.random() * 4)]
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ));
  }, [isMobile])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white overflow-hidden relative"
      style={{
        fontFamily: 'Inter, sans-serif',
        willChange: isMobile ? 'auto' : 'transform', // Optimize compositing for desktop
      }}
    >
      {/* Google-style Background - Optimized for mobile */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Google brand color floating shapes - Reduced complexity on mobile */}
        <motion.div
          style={{ y: y1, rotate: isMobile ? 0 : rotate }}
          className={`absolute -top-32 -right-32 ${isMobile ? 'w-40 h-40' : 'w-80 h-80'} bg-blue-500/10 rounded-full ${isMobile ? 'blur-xl' : 'blur-3xl'}`}
        />
        <motion.div
          style={{ y: y2 }}
          className={`absolute top-1/4 -left-32 ${isMobile ? 'w-36 h-36' : 'w-72 h-72'} bg-red-500/10 rounded-full ${isMobile ? 'blur-xl' : 'blur-3xl'}`}
        />
        <motion.div
          style={{ y: y3, scale: isMobile ? 1 : scale }}
          className={`absolute bottom-1/4 right-1/4 ${isMobile ? 'w-32 h-32' : 'w-64 h-64'} bg-green-500/10 rounded-full ${isMobile ? 'blur-xl' : 'blur-3xl'}`}
        />
        <motion.div
          style={{ y: y1 }}
          className={`absolute bottom-0 left-1/4 ${isMobile ? 'w-28 h-28' : 'w-56 h-56'} bg-yellow-500/10 rounded-full ${isMobile ? 'blur-xl' : 'blur-3xl'}`}
        />

        {/* Subtle geometric elements - Disabled on mobile for performance */}
        {!isMobile && (
          <>
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-500/30 rotate-45"
            />
            <motion.div
              animate={{
                rotate: [360, 0],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute top-2/3 left-1/4 w-4 h-4 bg-red-500/25 rounded-full"
            />
          </>
        )}

        {/* Minimal floating elements */}
        {floatingBackgrounds}
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <span className="text-xl sm:text-2xl font-semibold text-gray-900">animo.dev</span>
            </motion.div>
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {["Positions", "About Us", "Apply"].map((item, index) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    href={item === "Apply" ? "/apply" : `#${item.toLowerCase().replace(" ", "")}`}
                    className="text-gray-600 hover:text-blue-600 transition-colors font-medium relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 pt-8 sm:pt-12 lg:pt-20 pb-16 sm:pb-24 lg:pb-32">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-6xl mx-auto"
          >
            {/* Responsive Browser Window Mockup */}
            <motion.div
              className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-6 lg:p-8 mb-8 sm:mb-12 border border-gray-200/50 relative overflow-hidden"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Browser chrome - responsive */}
              <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8 pb-3 sm:pb-4 lg:pb-6 border-b border-gray-200/50">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="flex space-x-1 sm:space-x-2">
                    <motion.div
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-red-500 rounded-full"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    />
                    <motion.div
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-yellow-500 rounded-full"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    />
                    <motion.div
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    />
                  </div>
                  <div className="bg-gray-50 rounded-lg sm:rounded-xl px-2 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-xs sm:text-sm text-gray-600 font-mono border border-gray-200">
                    <span className="text-green-600 hidden sm:inline">🔒</span>
                    <span className="sm:ml-1">animo.dev/recruitment</span>
                  </div>
                </div>
                <div className="flex space-x-1 sm:space-x-2">
                  <motion.div
                    className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-blue-500 rounded-full shadow-lg"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-red-500 rounded-full shadow-lg"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, delay: 0.2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-yellow-500 rounded-full shadow-lg"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, delay: 0.4, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-green-500 rounded-full shadow-lg"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, delay: 0.6, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
              </div>

              {/* Hero content - responsive typography */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="px-2 sm:px-4"
              >
                <motion.h1
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <span className="text-gray-900">LOOKING FOR</span>
                  <br />
                  <motion.span
                    className="bg-gradient-to-r from-blue-600 via-red-500 to-green-600 bg-clip-text text-transparent"
                    animate={isMobile ? 
                      // Disable gradient animation on mobile for performance
                      {} : 
                      {
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }
                    }
                    transition={isMobile ? 
                      {} : 
                      {
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }
                    }
                    style={isMobile ? {} : { backgroundSize: "200% 200%" }}
                  >
                    OFFICERS!
                  </motion.span>
                </motion.h1>

                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mb-4 sm:mb-0"
                >
                  <Link href="/apply">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-12 lg:px-16 py-3 sm:py-6 lg:py-8 text-base sm:text-xl lg:text-2xl rounded-3xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 relative overflow-hidden group font-semibold"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        initial={{ x: "-100%" }}
                        animate={isMobile ? {} : { x: "100%" }}
                        transition={isMobile ? 
                          {} : 
                          {
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatDelay: 4,
                            ease: "easeInOut",
                          }
                        }
                      />
                      <span className="relative z-10 flex items-center">
                        APPLY NOW
                        <motion.div
                          animate={isMobile ? {} : { x: [0, 4, 0] }}
                          transition={isMobile ? {} : { duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                        </motion.div>
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Floating elements inside browser - hidden on mobile for cleaner look */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 12,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute top-8 right-8 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-blue-500/20 rounded-lg hidden sm:block"
              />
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute bottom-8 left-8 w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 bg-red-500/20 rounded-full hidden sm:block"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-center px-4"
          >
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Join animo.dev and be part of a dynamic team that's shaping the future of technology and innovation at{" "}
              <span className="font-semibold text-green-600">De La Salle Lipa</span>.
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.5, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-gray-400 mx-auto" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Positions Section */}
      <section id="positions" className="relative z-10 py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-blue-50 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6 border border-blue-200"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              <span className="text-blue-700 font-medium text-sm sm:text-base">Open Positions</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
              Available{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Positions
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We're looking for passionate individuals to join our team across various departments. Find the perfect
              role that matches your skills and interests.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {positions.map((dept, index) => (
              <motion.div
                key={dept.category}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white relative overflow-hidden">
                  {/* Surface tint overlay */}
                  <div
                    className={`absolute inset-0 ${dept.surfaceColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <CardContent className="p-4 sm:p-6 lg:p-8 relative z-10">
                    <motion.div
                      className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${dept.color} rounded-2xl flex items-center justify-center text-white mb-4 sm:mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                      whileHover={{ rotate: 15, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {dept.icon}
                    </motion.div>

                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 group-hover:text-gray-800 transition-colors">
                      {dept.category}
                    </h3>

                    <div className="space-y-2 sm:space-y-3">
                      {dept.positions.map((position, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 + idx * 0.1, duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          <Badge
                            variant="secondary"
                            className={`block w-full text-left justify-start py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium ${dept.bgColor} border-0 hover:shadow-md transition-shadow duration-200 text-gray-700`}
                          >
                            {position}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative z-10 py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600">
          {/* Disable complex animations on mobile for performance */}
          {!isMobile && (
            <>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 90, 180],
                }}
                transition={{
                  duration: 25,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute top-10 right-10 w-24 h-24 sm:w-32 sm:h-32 bg-white/5 rounded-full blur-2xl"
              />
              <motion.div
                animate={{
                  scale: [1.1, 1, 1.1],
                  x: [0, 30, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute bottom-10 left-10 w-20 h-20 sm:w-24 sm:h-24 bg-white/5 rounded-full blur-2xl"
              />
            </>
          )}
        </div>

        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 lg:mb-8"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Ready to Make an{" "}
              <motion.span
                animate={isMobile ? 
                  {} : 
                  {
                    textShadow: [
                      "0 0 20px rgba(255,255,255,0.3)",
                      "0 0 30px rgba(255,255,255,0.5)",
                      "0 0 20px rgba(255,255,255,0.3)",
                    ],
                  }
                }
                transition={isMobile ? {} : { duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                Impact?
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Join our team and help us build innovative solutions that make a difference in the tech community. Be part
              of something bigger than yourself.
            </motion.p>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Link href="/apply">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 sm:px-12 lg:px-16 py-4 sm:py-6 lg:py-8 text-base sm:text-xl lg:text-2xl rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 font-semibold relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/50 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={isMobile ? {} : { x: "100%" }}
                    transition={isMobile ? 
                      {} : 
                      {
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 5,
                        ease: "easeInOut",
                      }
                    }
                  />
                  <span className="relative z-10 flex items-center">
                    Start Your Application
                    <motion.div
                      animate={isMobile ? {} : { x: [0, 6, 0] }}
                      transition={isMobile ? {} : { duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                    </motion.div>
                  </span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 via-red-500 to-green-500 rounded-xl shadow-lg"></div>
              <span className="text-xl sm:text-2xl font-bold">animo.dev</span>
            </div>
            <p className="text-gray-400 text-base sm:text-lg">
              Building the future of technology, one line of code at a time.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
