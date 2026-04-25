import { useEffect, useState } from 'react'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string

type Status = 'idle' | 'loading' | 'ready' | 'error'

// Module-level singleton — survives StrictMode double-invocation
let status: Status = 'idle'
let scriptInjected = false
const listeners = new Set<(s: Status) => void>()

function notify(s: Status) {
  status = s
  listeners.forEach((fn) => fn(s))
}

function loadScript() {
  if (scriptInjected) return
  scriptInjected = true

  // Use the recommended async bootstrap pattern
  ;(window as any).__googleMapsCallback = () => notify('ready')

  const script = document.createElement('script')
  script.src =
    `https://maps.googleapis.com/maps/api/js` +
    `?key=${API_KEY}` +
    `&callback=__googleMapsCallback` +
    `&loading=async`
  // Do NOT set script.async — the loading=async param handles it
  // and avoids the "loaded directly without loading=async" warning
  script.defer = true
  script.onerror = () => notify('error')
  document.head.appendChild(script)
}

export function useGoogleMaps(): boolean {
  const [ready, setReady] = useState(status === 'ready')

  useEffect(() => {
    // Already ready by the time this effect runs (e.g. StrictMode re-mount)
    if (status === 'ready') {
      setReady(true)
      return
    }

    const handler = (s: Status) => {
      if (s === 'ready') setReady(true)
    }
    listeners.add(handler)

    if (status === 'idle') {
      notify('loading')
      loadScript()
    }

    return () => {
      listeners.delete(handler)
    }
  }, [])

  return ready
}
