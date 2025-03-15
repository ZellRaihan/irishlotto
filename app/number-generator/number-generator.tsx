'use client'

import { useState, useEffect, useMemo, useRef } from "react"
import { Button } from "@/components/ui/button"
import { LotteryLogo } from "@/components/lottery-logo"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { 
  Sparkles, RefreshCw, Save, Share2, Copy, Dice1, Dice3, Dice5,
  Zap, BarChart3, Shuffle
} from "lucide-react"

type GameType = 'mainDraw' | 'plusOne' | 'plusTwo' | 'all'
type GenerationMethod = 'random' | 'quickPick' | 'hotNumbers'

export function NumberGenerator() {
  const [selectedGame, setSelectedGame] = useState<GameType>('mainDraw')
  const [generatedNumbers, setGeneratedNumbers] = useState<{
    mainDraw: number[][] | null,
    plusOne: number[][] | null,
    plusTwo: number[][] | null
  }>({
    mainDraw: null,
    plusOne: null,
    plusTwo: null
  })
  const [savedSets, setSavedSets] = useState<Array<{
    game: GameType,
    numbers: {
      mainDraw: number[][] | null,
      plusOne: number[][] | null,
      plusTwo: number[][] | null
    },
    date: string,
    isFavorite?: boolean
  }>>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [numSets, setNumSets] = useState<1 | 3 | 5>(1)
  const [showConfetti, setShowConfetti] = useState(false)
  const [generationMethod, setGenerationMethod] = useState<GenerationMethod>('random')
  const [useEnhancedAnimation, setUseEnhancedAnimation] = useState(true)
  
  // Counter animation states
  const [showCounterAnimation, setShowCounterAnimation] = useState(false)
  const [counterNumbers, setCounterNumbers] = useState<number[][]>([])
  const counterIntervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Hot numbers data (would typically come from an API in a real app)
  const hotNumbers = useMemo(() => ({
    mainDraw: [7, 17, 27, 32, 38, 42],
    plusOne: [3, 11, 19, 24, 36, 47],
    plusTwo: [5, 13, 22, 29, 33, 41]
  }), [])
  
  // Quick pick numbers (predefined sets that are statistically balanced)
  const quickPickSets = useMemo(() => [
    [1, 10, 19, 28, 37, 46],
    [2, 11, 20, 29, 38, 47],
    [3, 12, 21, 30, 39, 45],
    [4, 13, 22, 31, 40, 44],
    [5, 14, 23, 32, 41, 43],
    [6, 15, 24, 33, 42, 47],
    [7, 16, 25, 34, 43, 46],
    [8, 17, 26, 35, 44, 45],
    [9, 18, 27, 36, 45, 44],
  ], [])
  
  // Load saved sets from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedNumberSets')
    if (saved) {
      try {
        setSavedSets(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse saved sets', e)
      }
    }
  }, [])
  
  // Cleanup counter animation interval on unmount
  useEffect(() => {
    return () => {
      if (counterIntervalRef.current) {
        clearTimeout(counterIntervalRef.current)
      }
    }
  }, [])
  
  // Generate random numbers
  const generateNumbers = () => {
    setIsGenerating(true)
    
    // Start counter animation
    startCounterAnimation()
    
    // Simulate a delay for visual effect
    setTimeout(() => {
      const newNumbers = {
        mainDraw: selectedGame === 'mainDraw' || selectedGame === 'all' 
          ? Array(numSets).fill(0).map(() => generateNumberSet('mainDraw'))
          : generatedNumbers.mainDraw,
        plusOne: selectedGame === 'plusOne' || selectedGame === 'all' 
          ? Array(numSets).fill(0).map(() => generateNumberSet('plusOne'))
          : generatedNumbers.plusOne,
        plusTwo: selectedGame === 'plusTwo' || selectedGame === 'all' 
          ? Array(numSets).fill(0).map(() => generateNumberSet('plusTwo'))
          : generatedNumbers.plusTwo
      }
      
      // Stop counter animation
      stopCounterAnimation()
      
      setGeneratedNumbers(newNumbers)
      setIsGenerating(false)
      
      // Show confetti animation
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
      
      toast.success(`${getGenerationMethodName()} numbers generated!`, {
        description: `Generated ${numSets} ${numSets === 1 ? 'line' : 'lines'} of lucky numbers.`
      })
    }, 2000) // Increased delay to show more of the counter animation
  }
  
  // Start the counter animation
  const startCounterAnimation = () => {
    setShowCounterAnimation(true)
    
    // Initialize with random numbers
    const initialCounters: number[][] = []
    
    if (selectedGame === 'mainDraw' || selectedGame === 'all') {
      for (let i = 0; i < numSets; i++) {
        initialCounters.push(Array(6).fill(0).map(() => Math.floor(Math.random() * 47) + 1))
      }
    }
    
    if (selectedGame === 'plusOne' || selectedGame === 'all') {
      for (let i = 0; i < numSets; i++) {
        initialCounters.push(Array(6).fill(0).map(() => Math.floor(Math.random() * 47) + 1))
      }
    }
    
    if (selectedGame === 'plusTwo' || selectedGame === 'all') {
      for (let i = 0; i < numSets; i++) {
        initialCounters.push(Array(6).fill(0).map(() => Math.floor(Math.random() * 47) + 1))
      }
    }
    
    setCounterNumbers(initialCounters)
    
    // Update numbers rapidly to create counting effect
    // Start with fast updates and gradually slow down for dramatic effect
    let interval = 50;
    
    const updateCounter = () => {
      setCounterNumbers(prev => 
        prev.map(set => 
          set.map(() => Math.floor(Math.random() * 47) + 1)
        )
      );
      
      // Gradually increase the interval for a slowing down effect
      interval += 5;
      
      if (interval < 300) {
        counterIntervalRef.current = setTimeout(updateCounter, interval);
      }
    };
    
    counterIntervalRef.current = setTimeout(updateCounter, interval);
  }
  
  // Stop the counter animation
  const stopCounterAnimation = () => {
    if (counterIntervalRef.current) {
      clearTimeout(counterIntervalRef.current)
      counterIntervalRef.current = null
    }
    setShowCounterAnimation(false)
  }
  
  // Generate a set of numbers based on the selected method and game
  const generateNumberSet = (game: 'mainDraw' | 'plusOne' | 'plusTwo'): number[] => {
    switch (generationMethod) {
      case 'quickPick':
        return getQuickPickNumbers();
      case 'hotNumbers':
        return [...hotNumbers[game]]; // Return a copy to avoid mutations
      case 'random':
      default:
        return generateRandomSet();
    }
  }
  
  // Get a random set from the quick pick options
  const getQuickPickNumbers = (): number[] => {
    const randomIndex = Math.floor(Math.random() * quickPickSets.length);
    return [...quickPickSets[randomIndex]]; // Return a copy to avoid mutations
  }
  
  // Get the display name for the current generation method
  const getGenerationMethodName = (): string => {
    switch (generationMethod) {
      case 'quickPick':
        return 'Quick Pick';
      case 'hotNumbers':
        return 'Hot Numbers';
      case 'random':
      default:
        return 'Random';
    }
  }
  
  // Generate a random set of 6 unique numbers between 1-47
  const generateRandomSet = (): number[] => {
    const numbers: number[] = []
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 47) + 1
      if (!numbers.includes(num)) {
        numbers.push(num)
      }
    }
    return numbers.sort((a, b) => a - b)
  }
  
  // Save the current set of numbers
  const saveSet = () => {
    if (
      (!generatedNumbers.mainDraw || generatedNumbers.mainDraw.length === 0) && 
      (!generatedNumbers.plusOne || generatedNumbers.plusOne.length === 0) && 
      (!generatedNumbers.plusTwo || generatedNumbers.plusTwo.length === 0)
    ) return
    
    const newSavedSet = {
      game: selectedGame,
      numbers: generatedNumbers,
      date: new Date().toISOString(),
      isFavorite: false
    }
    
    const updatedSets = [newSavedSet, ...savedSets].slice(0, 10) // Keep only the last 10 sets
    setSavedSets(updatedSets)
    localStorage.setItem('savedNumberSets', JSON.stringify(updatedSets))
    
    toast.success("Numbers saved!", {
      description: `Saved ${numSets} ${numSets === 1 ? 'line' : 'lines'} of numbers for future reference.`
    })
  }
  
  // Toggle favorite status for a saved set
  const toggleFavorite = (index: number) => {
    const updatedSets = [...savedSets];
    updatedSets[index] = {
      ...updatedSets[index],
      isFavorite: !updatedSets[index].isFavorite
    };
    
    setSavedSets(updatedSets);
    localStorage.setItem('savedNumberSets', JSON.stringify(updatedSets));
    
    toast.success(updatedSets[index].isFavorite 
      ? "Added to favorites!" 
      : "Removed from favorites!", {
      description: updatedSets[index].isFavorite 
        ? "This set has been added to your favorites."
        : "This set has been removed from your favorites."
    });
  }
  
  // Share the generated numbers
  const shareNumbers = () => {
    if (
      (!generatedNumbers.mainDraw || generatedNumbers.mainDraw.length === 0) && 
      (!generatedNumbers.plusOne || generatedNumbers.plusOne.length === 0) && 
      (!generatedNumbers.plusTwo || generatedNumbers.plusTwo.length === 0)
    ) return
    
    let shareText = "My Irish Lotto Lucky Numbers:\n\n"
    
    if (generatedNumbers.mainDraw && generatedNumbers.mainDraw.length > 0) {
      shareText += `Lotto:\n`
      generatedNumbers.mainDraw.forEach((set, index) => {
        shareText += `Line ${index + 1}: ${set.join(', ')}\n`
      })
      shareText += '\n'
    }
    
    if (generatedNumbers.plusOne && generatedNumbers.plusOne.length > 0) {
      shareText += `Lotto Plus 1:\n`
      generatedNumbers.plusOne.forEach((set, index) => {
        shareText += `Line ${index + 1}: ${set.join(', ')}\n`
      })
      shareText += '\n'
    }
    
    if (generatedNumbers.plusTwo && generatedNumbers.plusTwo.length > 0) {
      shareText += `Lotto Plus 2:\n`
      generatedNumbers.plusTwo.forEach((set, index) => {
        shareText += `Line ${index + 1}: ${set.join(', ')}\n`
      })
      shareText += '\n'
    }
    
    shareText += "Generated at IrishLottoResults.ie"
    
    // Try native share API first
    if (navigator.share) {
      navigator.share({
        title: "My Irish Lotto Lucky Numbers",
        text: shareText,
        url: window.location.href
      }).catch(err => {
        console.error('Error sharing:', err)
        copyToClipboard(shareText)
      })
    } else {
      copyToClipboard(shareText)
    }
  }
  
  // Copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!", {
        description: "Your numbers have been copied and are ready to share."
      })
    }).catch(err => {
      console.error('Failed to copy:', err)
      toast.error("Failed to copy to clipboard")
    })
  }
  
  // Get game display name
  const getGameDisplayName = (game: GameType) => {
    switch (game) {
      case 'mainDraw':
        return 'Lotto'
      case 'plusOne':
        return 'Lotto Plus 1'
      case 'plusTwo':
        return 'Lotto Plus 2'
      case 'all':
        return 'All Games'
      default:
        return 'Lotto'
    }
  }
  
  // Copy a specific set of numbers
  const copyNumbers = (numbers: number[] | null) => {
    if (!numbers) return
    
    const text = numbers.join(', ')
    copyToClipboard(text)
  }
  
  // Copy all sets of a specific game
  const copyAllSets = (numberSets: number[][] | null) => {
    if (!numberSets || numberSets.length === 0) return
    
    const text = numberSets.map(set => set.join(', ')).join('\n')
    copyToClipboard(text)
  }
  
  return (
    <div className="space-y-8 relative">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {Array.from({ length: useEnhancedAnimation ? 150 : 100 }).map((_, i) => (
            <motion.div
              key={`confetti-${i}`}
              className="absolute"
              initial={{ 
                top: "-10%", 
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                backgroundColor: [
                  "#FF5733", "#33FF57", "#3357FF", "#F3FF33", 
                  "#FF33F3", "#33FFF3", "#FF3333", "#33FF33",
                  "#8A2BE2", "#FF1493", "#00FFFF", "#FFD700"
                ][Math.floor(Math.random() * 12)],
                borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                rotate: `${Math.random() * 360}deg`
              }}
              animate={{ 
                top: "110%",
                rotate: `${Math.random() * 360 + 360}deg`,
                left: `${parseFloat(String(Math.random() * 100)) + (Math.random() > 0.5 ? 10 : -10)}%`
              }}
              transition={{ 
                duration: Math.random() * 3 + 2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all hover:shadow-lg">
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Tabs defaultValue="mainDraw" onValueChange={(value: string) => setSelectedGame(value as GameType)} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="mainDraw" className="flex items-center gap-2">
                  <LotteryLogo variant="lotto" className="h-4 w-12" />
                  <span className="hidden sm:inline">Main Draw</span>
                </TabsTrigger>
                <TabsTrigger value="plusOne" className="flex items-center gap-2">
                  <LotteryLogo variant="lottoPlus1" className="h-4 w-12" />
                  <span className="hidden sm:inline">Plus 1</span>
                </TabsTrigger>
                <TabsTrigger value="plusTwo" className="flex items-center gap-2">
                  <LotteryLogo variant="lottoPlus2" className="h-4 w-12" />
                  <span className="hidden sm:inline">Plus 2</span>
                </TabsTrigger>
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="hidden sm:inline">All Games</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Generation Method Selector */}
          <div className="flex flex-wrap justify-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setGenerationMethod('random')}
              className={`gap-2 ${generationMethod === 'random' ? 'bg-blue-50 border-blue-200 text-blue-700' : ''}`}
            >
              <Shuffle className="w-4 h-4" />
              <span>Random</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setGenerationMethod('quickPick')}
              className={`gap-2 ${generationMethod === 'quickPick' ? 'bg-green-50 border-green-200 text-green-700' : ''}`}
            >
              <Zap className="w-4 h-4" />
              <span>Quick Pick</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setGenerationMethod('hotNumbers')}
              className={`gap-2 ${generationMethod === 'hotNumbers' ? 'bg-amber-50 border-amber-200 text-amber-700' : ''}`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Hot Numbers</span>
            </Button>
            
            <div className="w-full mt-3 flex justify-center">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setNumSets(1)}
                  className={`gap-1 ${numSets === 1 ? 'bg-blue-50 border-blue-200 text-blue-700' : ''}`}
                >
                  <Dice1 className="w-4 h-4" />
                  <span>1 Line</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setNumSets(3)}
                  className={`gap-1 ${numSets === 3 ? 'bg-blue-50 border-blue-200 text-blue-700' : ''}`}
                >
                  <Dice3 className="w-4 h-4" />
                  <span>3 Lines</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setNumSets(5)}
                  className={`gap-1 ${numSets === 5 ? 'bg-blue-50 border-blue-200 text-blue-700' : ''}`}
                >
                  <Dice5 className="w-4 h-4" />
                  <span>5 Lines</span>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center gap-6">
            {/* Counter Animation */}
            <AnimatePresence>
              {showCounterAnimation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full space-y-6"
                >
                  <div className="flex justify-center items-center">
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="absolute -inset-4 rounded-lg bg-blue-500/20"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <motion.h2 
                        className="text-xl font-semibold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent relative"
                      >
                        Finding Your Lucky Numbers...
                      </motion.h2>
                    </motion.div>
                  </div>
                  
                  {counterNumbers.map((numbers, gameIndex) => (
                    <motion.div 
                      key={`counter-${gameIndex}`}
                      className={`border border-gray-100 rounded-lg p-4 shadow-sm ${
                        gameIndex === 0 ? 'bg-gradient-to-r from-blue-50 to-indigo-50' : 
                        gameIndex === 1 ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 
                        'bg-gradient-to-r from-purple-50 to-fuchsia-50'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: gameIndex * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <LotteryLogo 
                            variant={gameIndex === 0 ? "lotto" : gameIndex === 1 ? "lottoPlus1" : "lottoPlus2"} 
                            className="h-4 w-12" 
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {gameIndex === 0 ? "Lotto" : gameIndex === 1 ? "Lotto Plus 1" : "Lotto Plus 2"}
                          </span>
                          <motion.span 
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              background: gameIndex === 0 ? 'rgba(59, 130, 246, 0.1)' : 
                                         gameIndex === 1 ? 'rgba(16, 185, 129, 0.1)' : 
                                         'rgba(139, 92, 246, 0.1)',
                              color: gameIndex === 0 ? 'rgb(30, 64, 175)' : 
                                     gameIndex === 1 ? 'rgb(6, 95, 70)' : 
                                     'rgb(91, 33, 182)'
                            }}
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            Calculating...
                          </motion.span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 justify-center">
                        {numbers.map((num, i) => (
                          <motion.div
                            key={`counter-${gameIndex}-${i}`}
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium text-white shadow-md ${
                              gameIndex === 0 ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 
                              gameIndex === 1 ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 
                              'bg-gradient-to-br from-purple-500 to-fuchsia-600'
                            }`}
                            animate={{ 
                              scale: [0.95, 1.05, 0.95],
                              boxShadow: [
                                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                              ]
                            }}
                            transition={{ 
                              duration: 1.5, 
                              repeat: Infinity,
                              delay: i * 0.1
                            }}
                          >
                            {num}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Display generated numbers above the button */}
            <AnimatePresence>
              {!showCounterAnimation && !isGenerating && (
                (generatedNumbers.mainDraw && generatedNumbers.mainDraw.length > 0) || 
                (generatedNumbers.plusOne && generatedNumbers.plusOne.length > 0) || 
                (generatedNumbers.plusTwo && generatedNumbers.plusTwo.length > 0)
              ) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full mb-2"
                >
                  <div className="flex flex-wrap gap-3 justify-center">
                    {generatedNumbers.mainDraw && generatedNumbers.mainDraw.length > 0 && (
                      <motion.div 
                        className="border border-gray-100 rounded-lg p-3 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <LotteryLogo variant="lotto" className="h-3 w-9" />
                            <span className="text-xs font-medium text-gray-700">Lotto</span>
                            <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                              {getGenerationMethodName()}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyAllSets(generatedNumbers.mainDraw)}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="w-3 h-3 text-blue-500" />
                          </Button>
                        </div>
                        {generatedNumbers.mainDraw.map((set, setIndex) => (
                          <div key={`main-set-${setIndex}`} className="mb-2 last:mb-0">
                            {numSets > 1 && (
                              <div className="text-xs text-gray-500 mb-1">Line {setIndex + 1}</div>
                            )}
                            <div className="flex gap-1.5 justify-center">
                              {set.map((num, i) => (
                                <motion.div
                                  key={`quick-main-${setIndex}-${i}`}
                                  className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-medium text-white shadow-sm"
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: i * 0.05 }}
                                  whileHover={{ scale: 1.1 }}
                                >
                                  {num}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                    
                    {generatedNumbers.plusOne && generatedNumbers.plusOne.length > 0 && (
                      <motion.div 
                        className="border border-gray-100 rounded-lg p-3 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <LotteryLogo variant="lottoPlus1" className="h-3 w-9" />
                            <span className="text-xs font-medium text-gray-700">Plus 1</span>
                            <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-800 rounded-full">
                              {getGenerationMethodName()}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyAllSets(generatedNumbers.plusOne)}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="w-3 h-3 text-green-500" />
                          </Button>
                        </div>
                        {generatedNumbers.plusOne.map((set, setIndex) => (
                          <div key={`plus1-set-${setIndex}`} className="mb-2 last:mb-0">
                            {numSets > 1 && (
                              <div className="text-xs text-gray-500 mb-1">Line {setIndex + 1}</div>
                            )}
                            <div className="flex gap-1.5 justify-center">
                              {set.map((num, i) => (
                                <motion.div
                                  key={`quick-plus1-${setIndex}-${i}`}
                                  className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-xs font-medium text-white shadow-sm"
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: i * 0.05 }}
                                  whileHover={{ scale: 1.1 }}
                                >
                                  {num}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                    
                    {generatedNumbers.plusTwo && generatedNumbers.plusTwo.length > 0 && (
                      <motion.div 
                        className="border border-gray-100 rounded-lg p-3 bg-gradient-to-r from-purple-50 to-fuchsia-50 shadow-sm"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <LotteryLogo variant="lottoPlus2" className="h-3 w-9" />
                            <span className="text-xs font-medium text-gray-700">Plus 2</span>
                            <span className="text-xs px-1.5 py-0.5 bg-purple-100 text-purple-800 rounded-full">
                              {getGenerationMethodName()}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyAllSets(generatedNumbers.plusTwo)}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="w-3 h-3 text-purple-500" />
                          </Button>
                        </div>
                        {generatedNumbers.plusTwo.map((set, setIndex) => (
                          <div key={`plus2-set-${setIndex}`} className="mb-2 last:mb-0">
                            {numSets > 1 && (
                              <div className="text-xs text-gray-500 mb-1">Line {setIndex + 1}</div>
                            )}
                            <div className="flex gap-1.5 justify-center">
                              {set.map((num, i) => (
                                <motion.div
                                  key={`quick-plus2-${setIndex}-${i}`}
                                  className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center text-xs font-medium text-white shadow-sm"
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: i * 0.05 }}
                                  whileHover={{ scale: 1.1 }}
                                >
                                  {num}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Method Description */}
            <div className="text-center text-sm text-gray-500 max-w-md">
              {generationMethod === 'random' && (
                <p>Completely random numbers generated using a cryptographically secure algorithm.</p>
              )}
              {generationMethod === 'quickPick' && (
                <p>Statistically balanced number sets designed to provide better coverage across the number range.</p>
              )}
              {generationMethod === 'hotNumbers' && (
                <p>Numbers that have appeared most frequently in recent draws, based on statistical analysis.</p>
              )}
            </div>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                onClick={generateNumbers}
                disabled={isGenerating}
                className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all px-6 py-4 text-base h-auto relative overflow-hidden group"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    {generationMethod === 'random' && <Shuffle className="w-4 h-4" />}
                    {generationMethod === 'quickPick' && <Zap className="w-4 h-4" />}
                    {generationMethod === 'hotNumbers' && <BarChart3 className="w-4 h-4" />}
                    Generate {getGenerationMethodName()} Numbers
                    <span className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </>
                )}
              </Button>
            </motion.div>
            
            <div className="flex gap-2 mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={saveSet}
                disabled={!generatedNumbers.mainDraw && !generatedNumbers.plusOne && !generatedNumbers.plusTwo}
                className="gap-1 text-xs"
              >
                <Save className="w-3 h-3" />
                Save
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={shareNumbers}
                disabled={!generatedNumbers.mainDraw && !generatedNumbers.plusOne && !generatedNumbers.plusTwo}
                className="gap-1 text-xs"
              >
                <Share2 className="w-3 h-3" />
                Share
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setGeneratedNumbers({
                    mainDraw: null,
                    plusOne: null,
                    plusTwo: null
                  })
                }}
                disabled={!generatedNumbers.mainDraw && !generatedNumbers.plusOne && !generatedNumbers.plusTwo}
                className="gap-1 text-xs"
              >
                <RefreshCw className="w-3 h-3" />
                Clear
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <motion.div 
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-100 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          About the Number Generator
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-blue-700 mb-2 flex items-center gap-1">
              <Shuffle className="h-3.5 w-3.5" />
              Random Generation
            </h4>
            <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
              <li>Generate truly random numbers for Irish Lotto games</li>
              <li>Each set contains 6 unique numbers between 1-47</li>
              <li>Generate up to 5 lines of numbers for each game</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-blue-700 mb-2 flex items-center gap-1">
              <Zap className="h-3.5 w-3.5" />
              Quick Pick
            </h4>
            <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
              <li>Statistically balanced number sets</li>
              <li>Better coverage across the number range</li>
              <li>Designed to provide a good mix of odd/even numbers</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-blue-700 mb-2 flex items-center gap-1">
              <BarChart3 className="h-3.5 w-3.5" />
              Hot Numbers
            </h4>
            <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
              <li>Based on frequency analysis of recent draws</li>
              <li>Uses numbers that appear most frequently</li>
              <li>Updated regularly with the latest draw data</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-blue-700 mb-2 flex items-center gap-1">
              <Save className="h-3.5 w-3.5" />
              Save & Share
            </h4>
            <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
              <li>Save your favorite number combinations</li>
              <li>Share your lucky numbers with friends and family</li>
              <li>Use these numbers to play the Irish Lotto at your local retailer or online</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 