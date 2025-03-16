'use client'

import { useState, useEffect } from "react"
import { LotteryDraw } from "@/types/lottery"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/utils/formatters"
import { LotteryLogo } from "@/components/lottery-logo"
import { Check, AlertCircle, RefreshCw, Sparkles, Share2, Save, History, X, Clock, Award } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { format } from "date-fns"

type GameType = 'mainDraw' | 'plusOne' | 'plusTwo'

interface NumberCheckerProps {
  latestResult: LotteryDraw
}

// Add this helper function outside the component
function formatWinnerText(count: number): string {
  if (count === 0) return "No Winners";
  if (count === 1) return "1 Winner";
  return `${count.toLocaleString()} Winners`;
}

export function NumberChecker({ latestResult }: NumberCheckerProps) {
  const [selectedGame, setSelectedGame] = useState<GameType>('mainDraw')
  const [numbers, setNumbers] = useState<Array<string | null>>(Array(6).fill(null))
  const [isChecked, setIsChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedChecks, setSavedChecks] = useState<Array<{
    game: GameType,
    numbers: string[],
    date: string,
    result: any
  }>>([])
  const [showHistory, setShowHistory] = useState(false)
  const [matchResult, setMatchResult] = useState<{
    matches: number[]
    bonusMatch: boolean
    prize: number | null
    matchDescription: string
  } | null>(null)
  
  // Load saved checks from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedNumberChecks')
    if (saved) {
      try {
        setSavedChecks(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse saved checks', e)
      }
    }
  }, [])
  
  // Reset the check when game changes
  useEffect(() => {
    setIsChecked(false)
    setMatchResult(null)
    setError(null)
  }, [selectedGame])
  
  // Handle number input change
  const handleNumberChange = (index: number, value: string) => {
    // Only allow numbers between 1-47
    if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 47)) {
      const newNumbers = [...numbers]
      newNumbers[index] = value === '' ? null : value
      setNumbers(newNumbers)
      
      // Reset check when numbers change
      setIsChecked(false)
      setMatchResult(null)
      setError(null)
    }
  }
  
  // Generate quick pick numbers
  const generateQuickPick = () => {
    const availableNumbers = Array.from({ length: 47 }, (_, i) => (i + 1).toString())
    const quickPick: string[] = []
    
    // Select 6 random unique numbers
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length)
      quickPick.push(availableNumbers[randomIndex])
      availableNumbers.splice(randomIndex, 1)
    }
    
    setNumbers(quickPick)
    setIsChecked(false)
    setMatchResult(null)
    setError(null)
    
    // Show toast notification
    toast.success("Quick Pick numbers generated!", {
      description: "6 random numbers have been selected for you."
    })
  }
  
  // Save the current check to history
  const saveCheck = () => {
    if (!matchResult || !isChecked) return
    
    const newSavedCheck = {
      game: selectedGame,
      numbers: numbers.filter((n): n is string => n !== null),
      date: new Date().toISOString(),
      result: matchResult
    }
    
    const updatedChecks = [newSavedCheck, ...savedChecks].slice(0, 10) // Keep only the last 10 checks
    setSavedChecks(updatedChecks)
    localStorage.setItem('savedNumberChecks', JSON.stringify(updatedChecks))
    
    toast.success("Check saved to history!", {
      description: "You can view this check later in your history."
    })
  }
  
  // Share results
  const shareResults = () => {
    if (!matchResult || !isChecked) return
    
    const gameDisplayName = getGameDisplayName()
    const currentGameResult = getCurrentGameResult()
    const userNumbers = numbers.filter((n): n is string => n !== null).join(', ')
    const winningNumbers = currentGameResult.winningNumbers.standard.join(', ')
    const bonusNumber = currentGameResult.winningNumbers.bonus
    
    // Create a more detailed and engaging share message
    const shareTitle = `My Irish Lotto ${gameDisplayName} Results`
    const shareText = `I checked my Irish Lotto ${gameDisplayName} numbers (${userNumbers}) and ${
      matchResult.matches.length > 0 || matchResult.bonusMatch 
        ? `matched ${matchResult.matches.length} number${matchResult.matches.length !== 1 ? 's' : ''}${matchResult.bonusMatch ? ' + bonus' : ''}!` 
        : `didn't match any numbers.`
    }
    
${matchResult.prize && matchResult.prize > 0 
    ? `I would have won ${formatCurrency(matchResult.prize)} with the ${matchResult.matchDescription}!` 
    : 'No prize this time, but there\'s always the next draw!'
}

Winning numbers: ${winningNumbers} (Bonus: ${bonusNumber})

Check your numbers at IrishLottoResults.ie`

    // Show share options in a toast
    const showShareOptions = () => {
      toast(
        <div className="space-y-4">
          <h3 className="font-medium text-gray-800">Share Your Results</h3>
          
          <div className="bg-white rounded-lg border border-gray-200 p-3 text-sm">
            <div className="font-medium text-gray-800 mb-1">{shareTitle}</div>
            <div className="text-gray-600 whitespace-pre-line">{shareText.split('\n\n').slice(0, 2).join('\n\n')}</div>
            <div className="mt-2 text-xs text-blue-600">IrishLottoResults.ie</div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="gap-1 bg-[#1877F2] text-white border-[#1877F2] hover:bg-[#0d6efd] hover:text-white"
              onClick={() => shareToSocialMedia('facebook')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
              </svg>
              Facebook
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="gap-1 bg-[#1DA1F2] text-white border-[#1DA1F2] hover:bg-[#0c85d0] hover:text-white"
              onClick={() => shareToSocialMedia('twitter')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
              </svg>
              Twitter
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="gap-1 bg-[#25D366] text-white border-[#25D366] hover:bg-[#128c7e] hover:text-white"
              onClick={() => shareToSocialMedia('whatsapp')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              WhatsApp
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="gap-1 bg-[#0088cc] text-white border-[#0088cc] hover:bg-[#006699] hover:text-white"
              onClick={() => shareToSocialMedia('telegram')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
              </svg>
              Telegram
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="gap-1"
              onClick={() => copyToClipboard(shareText)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
              </svg>
              Copy Text
            </Button>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              Share your results with friends and family!
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-xs h-7 px-2"
              onClick={() => copyToClipboard(shareText)}
            >
              View Full Text
            </Button>
          </div>
        </div>,
        {
          duration: 10000,
          position: 'bottom-center',
          className: 'w-full max-w-md',
        }
      );
    };

    // Share to different social media platforms
    const shareToSocialMedia = (platform: string) => {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(shareText);
      const title = encodeURIComponent(shareTitle);
      
      let shareUrl = '';
      
      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
          break;
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=${text}%20${url}`;
          break;
        case 'telegram':
          shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
          break;
        default:
          break;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    };
    
    // Try native share API first
    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: window.location.href
      }).catch(err => {
        console.error('Error sharing:', err);
        showShareOptions();
      });
    } else {
      // Fall back to custom share options
      showShareOptions();
    }
  }

  // Helper function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!", {
        description: "Your results have been copied and are ready to share."
      });
    }).catch(err => {
      console.error('Failed to copy:', err);
      toast.error("Failed to copy to clipboard");
    });
  }
  
  // Get the current game result based on selected game
  const getCurrentGameResult = () => {
    switch (selectedGame) {
      case 'mainDraw':
        return latestResult.mainDraw
      case 'plusOne':
        return latestResult.plusOne
      case 'plusTwo':
        return latestResult.plusTwo
      default:
        return latestResult.mainDraw
    }
  }
  
  // Get game display name
  const getGameDisplayName = () => {
    switch (selectedGame) {
      case 'mainDraw':
        return 'Lotto'
      case 'plusOne':
        return 'Lotto Plus 1'
      case 'plusTwo':
        return 'Lotto Plus 2'
      default:
        return 'Lotto'
    }
  }
  
  // Check numbers against winning numbers
  const checkNumbers = () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Use setTimeout to ensure this is a client-side operation
      // This prevents Next.js from showing the global loading component
      setTimeout(() => {
        try {
          // Convert input strings to numbers and filter out nulls
          const userNumbers = numbers
            .filter((num): num is string => num !== null)
            .map(num => parseInt(num))
          
          // Only proceed if all 6 numbers are provided
          if (userNumbers.length !== 6) {
            setError("Please enter all 6 numbers")
            setIsLoading(false)
            return
          }
          
          const gameResult = getCurrentGameResult()
          
          // Validate that we have the game result data
          if (!gameResult || !gameResult.winningNumbers) {
            setError("Could not retrieve game results data")
            setIsLoading(false)
            return
          }
          
          const winningNumbers = gameResult.winningNumbers.standard
          const bonusNumber = gameResult.winningNumbers.bonus
          
          // Find matches
          const matches = userNumbers.filter(num => winningNumbers.includes(num))
          const bonusMatch = userNumbers.includes(bonusNumber)
          
          // Determine prize based on matches - using a simplified approach
          let prize = 0
          let matchDescription = 'No Prize'
          
          // Define default prize values based on Irish Lotto rules
          const defaultPrizes = {
            'Jackpot': gameResult.jackpotAmount || 0,
            'Match 5 + Bonus': 5000,
            'Match 5': 500,
            'Match 4 + Bonus': 50,
            'Match 4': 20,
            'Match 3 + Bonus': 10,
            'Match 3': 3,
            'Match 2 + Bonus': 2
          }
          
          // Determine match type
          if (matches.length === 6) {
            matchDescription = 'Jackpot'
          } else if (matches.length === 5 && bonusMatch) {
            matchDescription = 'Match 5 + Bonus'
          } else if (matches.length === 5) {
            matchDescription = 'Match 5'
          } else if (matches.length === 4 && bonusMatch) {
            matchDescription = 'Match 4 + Bonus'
          } else if (matches.length === 4) {
            matchDescription = 'Match 4'
          } else if (matches.length === 3 && bonusMatch) {
            matchDescription = 'Match 3 + Bonus'
          } else if (matches.length === 3) {
            matchDescription = 'Match 3'
          } else if (matches.length === 2 && bonusMatch) {
            matchDescription = 'Match 2 + Bonus'
          } else {
            matchDescription = 'No Prize'
          }
          
          // Get prize amount from default values
          if (matchDescription !== 'No Prize') {
            // Try to get prize from the prizes array if it exists
            if (gameResult.prizes && Array.isArray(gameResult.prizes)) {
              const prizesMatch = gameResult.prizes.find(p => p.match === matchDescription)
              if (prizesMatch && typeof prizesMatch.prize === 'number') {
                prize = prizesMatch.prize
              } else {
                // Fall back to default values
                prize = defaultPrizes[matchDescription as keyof typeof defaultPrizes] || 0
              }
            } else {
              // Use default values if prizes array doesn't exist
              prize = defaultPrizes[matchDescription as keyof typeof defaultPrizes] || 0
            }
          }
          
          setMatchResult({
            matches: matches,
            bonusMatch,
            prize,
            matchDescription
          })
          
          setIsChecked(true)
          setIsLoading(false)
        } catch (innerErr) {
          console.error("Error in setTimeout callback:", innerErr)
          setError("An error occurred while checking your numbers. Please try again.")
          setIsLoading(false)
        }
      }, 0)
    } catch (err) {
      console.error("Error checking numbers:", err)
      setError("An error occurred while checking your numbers. Please try again.")
      setIsLoading(false)
    }
  }
  
  // Reset the form
  const resetForm = () => {
    setNumbers(Array(6).fill(null))
    setIsChecked(false)
    setMatchResult(null)
    setError(null)
  }
  
  // Check if form is valid
  const isFormValid = numbers.filter(num => num !== null).length === 6
  
  // Check if numbers are unique
  const areNumbersUnique = new Set(numbers.filter(num => num !== null)).size === numbers.filter(num => num !== null).length
  
  // Load a saved check
  const loadSavedCheck = (savedCheck: any) => {
    setSelectedGame(savedCheck.game)
    setNumbers(savedCheck.numbers)
    setMatchResult(savedCheck.result)
    setIsChecked(true)
    setShowHistory(false)
    
    toast.success("Loaded saved check", {
      description: "Your saved numbers have been loaded."
    })
  }
  
  // Delete a saved check
  const deleteSavedCheck = (index: number) => {
    const updatedChecks = [...savedChecks]
    updatedChecks.splice(index, 1)
    setSavedChecks(updatedChecks)
    localStorage.setItem('savedNumberChecks', JSON.stringify(updatedChecks))
    
    toast.success("Check deleted", {
      description: "The saved check has been removed from your history."
    })
  }
  
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all hover:shadow-lg">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Number Checker
            </h2>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHistory(!showHistory)}
              className="gap-1"
            >
              <History className="w-4 h-4" />
              {savedChecks.length > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {savedChecks.length}
                </span>
              )}
              <span className="hidden sm:inline">History</span>
            </Button>
          </div>
          
          <Tabs defaultValue="mainDraw" onValueChange={(value: string) => setSelectedGame(value as GameType)}>
            <TabsList className="grid grid-cols-3 mb-6">
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
            </TabsList>
            
            <TabsContent value="mainDraw" className="space-y-6">
              <GameNumberChecker 
                gameResult={latestResult.mainDraw}
                numbers={numbers}
                handleNumberChange={handleNumberChange}
                checkNumbers={checkNumbers}
                resetForm={resetForm}
                generateQuickPick={generateQuickPick}
                saveCheck={saveCheck}
                shareResults={shareResults}
                isFormValid={isFormValid}
                areNumbersUnique={areNumbersUnique}
                isChecked={isChecked}
                isLoading={isLoading}
                error={error}
                matchResult={matchResult}
              />
            </TabsContent>
            
            <TabsContent value="plusOne" className="space-y-6">
              <GameNumberChecker 
                gameResult={latestResult.plusOne}
                numbers={numbers}
                handleNumberChange={handleNumberChange}
                checkNumbers={checkNumbers}
                resetForm={resetForm}
                generateQuickPick={generateQuickPick}
                saveCheck={saveCheck}
                shareResults={shareResults}
                isFormValid={isFormValid}
                areNumbersUnique={areNumbersUnique}
                isChecked={isChecked}
                isLoading={isLoading}
                error={error}
                matchResult={matchResult}
              />
            </TabsContent>
            
            <TabsContent value="plusTwo" className="space-y-6">
              <GameNumberChecker 
                gameResult={latestResult.plusTwo}
                numbers={numbers}
                handleNumberChange={handleNumberChange}
                checkNumbers={checkNumbers}
                resetForm={resetForm}
                generateQuickPick={generateQuickPick}
                saveCheck={saveCheck}
                shareResults={shareResults}
                isFormValid={isFormValid}
                areNumbersUnique={areNumbersUnique}
                isChecked={isChecked}
                isLoading={isLoading}
                error={error}
                matchResult={matchResult}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Your Check History
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHistory(false)}
                  className="text-gray-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {savedChecks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <History className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>You haven't saved any checks yet.</p>
                  <p className="text-sm">Check your numbers and save the results to see them here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedChecks.map((check, index) => (
                    <div 
                      key={index} 
                      className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <LotteryLogo 
                              variant={
                                check.game === 'mainDraw' ? 'lotto' : 
                                check.game === 'plusOne' ? 'lottoPlus1' : 'lottoPlus2'
                              } 
                              className="h-4 w-12" 
                            />
                            <span className="text-sm font-medium text-gray-700">
                              {check.game === 'mainDraw' ? 'Lotto' : 
                               check.game === 'plusOne' ? 'Lotto Plus 1' : 'Lotto Plus 2'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {format(new Date(check.date), "d MMM yyyy, HH:mm")}
                          </p>
                        </div>
                        
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => loadSavedCheck(check)}
                            className="h-8 w-8 p-0"
                          >
                            <Check className="w-4 h-4 text-blue-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteSavedCheck(index)}
                            className="h-8 w-8 p-0"
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        {check.numbers.map((num, i) => (
                          <div 
                            key={i} 
                            className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-medium"
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-gray-600">{check.result.matchDescription}</span>
                        </div>
                        
                        {check.result.prize > 0 ? (
                          <div className="bg-green-50 px-2 py-1 rounded text-xs font-medium text-green-700 flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            {formatCurrency(check.result.prize)}
                          </div>
                        ) : (
                          <div className="bg-gray-50 px-2 py-1 rounded text-xs font-medium text-gray-500">
                            No Prize
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-100 shadow-sm">
        <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          How to use the Number Checker
        </h3>
        <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
          <li>Select the game you want to check (Main Draw, Plus 1, or Plus 2)</li>
          <li>Enter your 6 numbers (between 1-47) or use Quick Pick for random numbers</li>
          <li>Click "Check My Numbers" to see if you've won</li>
          <li>The results will show which numbers matched and any prize you would have won</li>
          <li>Save your checks to history or share your results with friends</li>
          <li>This checker uses the latest draw results from {latestResult.drawDate}</li>
        </ul>
      </div>
    </div>
  )
}

interface GameNumberCheckerProps {
  gameResult: any
  numbers: Array<string | null>
  handleNumberChange: (index: number, value: string) => void
  checkNumbers: () => void
  resetForm: () => void
  generateQuickPick: () => void
  saveCheck: () => void
  shareResults: () => void
  isFormValid: boolean
  areNumbersUnique: boolean
  isChecked: boolean
  isLoading: boolean
  error: string | null
  matchResult: {
    matches: number[]
    bonusMatch: boolean
    prize: number | null
    matchDescription: string
  } | null
}

function GameNumberChecker({
  gameResult,
  numbers,
  handleNumberChange,
  checkNumbers,
  resetForm,
  generateQuickPick,
  saveCheck,
  shareResults,
  isFormValid,
  areNumbersUnique,
  isChecked,
  isLoading,
  error,
  matchResult
}: GameNumberCheckerProps) {
  const [showNumberGrid, setShowNumberGrid] = useState(false)
  
  // Handle number selection from grid
  const handleNumberSelect = (num: number) => {
    const numStr = num.toString()
    
    // Check if number is already selected
    const index = numbers.findIndex(n => n === numStr)
    
    if (index !== -1) {
      // If already selected, remove it
      const newNumbers = [...numbers]
      newNumbers[index] = null
      handleNumberChange(index, '')
    } else {
      // If not selected, add it to the first empty slot
      const emptyIndex = numbers.findIndex(n => n === null)
      if (emptyIndex !== -1) {
        handleNumberChange(emptyIndex, numStr)
      }
    }
  }
  
  // Check if a number is already selected
  const isNumberSelected = (num: number) => {
    return numbers.includes(num.toString())
  }
  
  return (
    <>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Enter Your Numbers
          </span>
        </h2>
        
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          {numbers.map((number, index) => (
            <motion.div 
              key={index} 
              className="relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <input
                type="text"
                inputMode="numeric"
                value={number || ''}
                onChange={(e) => handleNumberChange(index, e.target.value)}
                className="w-14 h-14 rounded-full border border-gray-300 text-center text-lg font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all hover:border-blue-300"
                maxLength={2}
                placeholder={(index + 1).toString()}
              />
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowNumberGrid(!showNumberGrid)}
            className="text-blue-600 border-blue-200"
          >
            {showNumberGrid ? "Hide Number Grid" : "Show Number Grid"}
          </Button>
        </div>
        
        <AnimatePresence>
          {showNumberGrid && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Select your numbers from the grid:</h3>
                <div className="grid grid-cols-7 sm:grid-cols-10 gap-2">
                  {Array.from({ length: 47 }, (_, i) => i + 1).map(num => (
                    <button
                      key={num}
                      onClick={() => handleNumberSelect(num)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                        isNumberSelected(num)
                          ? 'bg-blue-500 text-white shadow-sm transform scale-105'
                          : 'bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                      disabled={numbers.filter(n => n !== null).length >= 6 && !isNumberSelected(num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!areNumbersUnique && numbers.filter(num => num !== null).length > 1 && (
          <motion.div 
            className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-2 rounded-md border border-red-100"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-4 h-4" />
            <span>Numbers must be unique</span>
          </motion.div>
        )}
        
        {error && (
          <motion.div 
            className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-2 rounded-md border border-red-100"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </motion.div>
        )}
        
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={checkNumbers} 
            disabled={!isFormValid || !areNumbersUnique || isLoading}
            className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Checking...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Check My Numbers
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={resetForm}
            className="gap-2"
            disabled={isLoading}
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </Button>
          
          <Button 
            variant="outline" 
            onClick={generateQuickPick}
            className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
            disabled={isLoading}
          >
            <Sparkles className="w-4 h-4" />
            Quick Pick
          </Button>
        </div>
      </div>
      
      {isChecked && matchResult && (
        <motion.div 
          className="space-y-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Your Results</h2>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={saveCheck}
                  className="gap-1 text-xs"
                >
                  <Save className="w-3 h-3" />
                  Save
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={shareResults}
                  className="gap-1 text-xs"
                >
                  <Share2 className="w-3 h-3" />
                  Share
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Winning Numbers</h3>
                <div className="flex flex-wrap items-center gap-2">
                  {gameResult.winningNumbers.standard.map((number: number, index: number) => (
                    <motion.div
                      key={index}
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm ${
                        matchResult.matches.includes(number)
                          ? 'bg-green-100 border border-green-300 text-green-800 shadow-sm'
                          : 'bg-gray-100 border border-gray-200 text-gray-700'
                      }`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {number}
                    </motion.div>
                  ))}
                  <div className="flex items-center gap-1 ml-1">
                    <span className="text-xs text-gray-500">Bonus</span>
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm ${
                        matchResult.bonusMatch
                          ? 'bg-yellow-100 border border-yellow-300 text-yellow-800 shadow-sm'
                          : 'bg-gray-100 border border-gray-200 text-gray-700'
                      }`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      {gameResult.winningNumbers.bonus}
                    </motion.div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Your Numbers</h3>
                <div className="flex flex-wrap items-center gap-2">
                  {numbers
                    .filter((num): num is string => num !== null)
                    .map((number, index) => {
                      const num = parseInt(number)
                      const isMatch = gameResult.winningNumbers.standard.includes(num)
                      const isBonusMatch = num === gameResult.winningNumbers.bonus
                      
                      return (
                        <motion.div
                          key={index}
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm ${
                            isMatch
                              ? 'bg-green-100 border border-green-300 text-green-800 shadow-sm'
                              : isBonusMatch
                              ? 'bg-yellow-100 border border-yellow-300 text-yellow-800 shadow-sm'
                              : 'bg-gray-100 border border-gray-200 text-gray-700'
                          }`}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {number}
                        </motion.div>
                      )
                    })}
                </div>
              </div>
              
              <motion.div 
                className={`rounded-lg p-5 border shadow-sm ${
                  matchResult.prize !== null && matchResult.prize > 0
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                    : 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-gray-800">Match Result:</h3>
                    <p className="text-gray-600">
                      {matchResult.matchDescription}
                      {matchResult.matches.length > 0 && (
                        <span> ({matchResult.matches.length} number{matchResult.matches.length !== 1 ? 's' : ''} matched
                        {matchResult.bonusMatch ? ' + bonus' : ''})</span>
                      )}
                    </p>
                  </div>
                  
                  {matchResult.prize !== null && matchResult.prize > 0 ? (
                    <div className="bg-white px-5 py-3 rounded-md border border-green-200 shadow-sm">
                      <div className="text-sm text-green-600">Prize Amount:</div>
                      <div className="text-2xl font-bold text-green-700">{formatCurrency(matchResult.prize)}</div>
                    </div>
                  ) : (
                    <div className="bg-white px-5 py-3 rounded-md border border-gray-200 shadow-sm">
                      <div className="text-sm text-gray-500">Prize Amount:</div>
                      <div className="text-2xl font-bold text-gray-700">No Prize</div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
} 