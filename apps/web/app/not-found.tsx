'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"

const LAUNCH_DATE = new Date('2025-01-01T00:00:00')

const calculateTimeLeft = () => {
  const difference = +LAUNCH_DATE - +new Date()
  let timeLeft = {}

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
  }

  return timeLeft
}

const CountdownItem = ({ value, label }: { value: number; label: string }) => (
  <Card className="w-24 h-24 flex flex-col items-center justify-center">
    <CardContent className="p-0">
      <motion.div
        key={value}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold"
      >
        {value}
      </motion.div>
      <div className="text-sm">{label}</div>
    </CardContent>
  </Card>
)

export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  return (
    <div className="flex items-center  justify-center mt-32 space-x-4 mb-8">
        
      {Object.entries(timeLeft).map(([key, value]) => (
        <CountdownItem key={key} value={value as number} label={key} />
      ))}
    </div>
  )
}

export default Countdown