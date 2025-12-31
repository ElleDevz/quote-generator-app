'use client'

import { useState, useEffect, useCallback } from 'react'

interface Quote {
  content: string
  author: string
}

// Fallback quotes database for when API is unavailable
const FALLBACK_QUOTES: Quote[] = [
  {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    content: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    content: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    content: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    content: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair"
  },
  {
    content: "Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.",
    author: "Roy T. Bennett"
  },
  {
    content: "I learned that courage was not the absence of fear, but the triumph over it.",
    author: "Nelson Mandela"
  },
  {
    content: "Opportunities don't happen. You create them.",
    author: "Chris Grosser"
  },
  {
    content: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    content: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    content: "Success is not how high you have climbed, but how you make a positive difference to the world.",
    author: "Roy T. Bennett"
  },
  {
    content: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson"
  },
  {
    content: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt"
  },
  {
    content: "Do not wait to strike till the iron is hot; but make it hot by striking.",
    author: "William Butler Yeats"
  }
]

// Curated scenery images from Unsplash
const SCENERY_IMAGES = [
  'photo-1506905925346-21bda4d32df4', // Mountains
  'photo-1469474968028-56623f02e42e', // Forest and lake
  'photo-1447752875215-b2761acb3c5d', // Mountain landscape
  'photo-1472214103451-9374bd1c798e', // Mountain peak
  'photo-1426604966848-d7adac402bff', // Forest
  'photo-1470071459604-3b5ec3a7fe05', // Foggy mountains
  'photo-1441974231531-c6227db76b6e', // Forest path
  'photo-1501594907352-04cda38ebc29', // Sunset over mountains
  'photo-1506905925346-21bda4d32df4', // Northern lights
  'photo-1518173946687-a4c8892bbd9f', // Beach sunset
  'photo-1475924156734-496f6cac6ec1', // Starry sky
  'photo-1519681393784-d120267933ba', // Mountain lake
  'photo-1464822759023-fed622ff2c3b', // Mountain valley
  'photo-1493246507139-91e8fad9978e', // Wildflower meadow
  'photo-1418065460487-3e41a6c84dc5', // Mountain lake reflection
]

export default function Home() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usesFallback, setUsesFallback] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState('')

  const getRandomFallbackQuote = () => {
    const randomIndex = Math.floor(Math.random() * FALLBACK_QUOTES.length)
    return FALLBACK_QUOTES[randomIndex]
  }

  const getRandomBackgroundImage = () => {
    const randomIndex = Math.floor(Math.random() * SCENERY_IMAGES.length)
    const imageId = SCENERY_IMAGES[randomIndex]
    return `https://images.unsplash.com/${imageId}?q=80&w=2070&auto=format&fit=crop`
  }

  const fetchQuote = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    // Update background image with each new quote
    setBackgroundImage(getRandomBackgroundImage())
    
    try {
      // Try to fetch from API with a timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
      
      const response = await fetch('https://api.quotable.io/random?tags=inspirational|motivational', {
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error('Failed to fetch quote')
      }
      
      const data = await response.json()
      setQuote({
        content: data.content,
        author: data.author
      })
      setUsesFallback(false)
    } catch (err) {
      // Fallback to local quotes if API fails
      console.log('API unavailable, using fallback quotes:', err)
      const fallbackQuote = getRandomFallbackQuote()
      setQuote(fallbackQuote)
      setUsesFallback(true)
      setError(null) // Don't show error, just use fallback
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchQuote()
  }, [fetchQuote])

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6">
      {/* Scenery Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: backgroundImage ? `url('${backgroundImage}')` : 'none',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Quote Generator
          </h1>
          <p className="text-gray-100 drop-shadow-md">
            Get inspired with motivational quotes
          </p>
        </div>

        {/* Quote Card */}
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 min-h-[300px] flex flex-col justify-between transition-all duration-300 hover:shadow-3xl">
          {loading ? (
            <div className="flex items-center justify-center flex-1">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center flex-1">
              <p className="text-red-500 text-center">{error}</p>
            </div>
          ) : quote ? (
            <>
              <div className="flex-1 flex items-center">
                <div>
                  <svg
                    className="w-8 h-8 text-purple-400 mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-100 leading-relaxed mb-6">
                    {quote.content}
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                    — {quote.author}
                  </p>
                  <svg
                    className="w-8 h-8 text-purple-400 mt-4 ml-auto"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.57-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                  </svg>
                </div>
              </div>
              
              {/* New Quote Button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={fetchQuote}
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  New Quote
                </button>
              </div>
            </>
          ) : null}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-white/90 drop-shadow-md">
          <p>
            {usesFallback 
              ? '⚡ Using curated quotes collection' 
              : 'Powered by Quotable API'}
          </p>
          <p className="mt-2 text-xs text-white/70">
            Photos from{' '}
            <a 
              href="https://unsplash.com/?utm_source=quote-generator&utm_medium=referral" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}

