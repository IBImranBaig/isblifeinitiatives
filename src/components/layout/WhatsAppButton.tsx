const WHATSAPP_URL = "https://wa.aisensy.com/+917411247123";

/**
 * Floating WhatsApp chat button — fixed bottom-right on every page. Sits above
 * the scroll pen (z-40) and is the only fixed element with pointer events there.
 */
export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-6px_rgba(37,211,102,0.6)] outline-none transition-transform duration-300 ease-[var(--ease-settle)] hover:scale-110 focus-visible:ring-2 focus-visible:ring-white/80 sm:bottom-6 sm:right-6"
    >
      {/* Soft pulse ring */}
      <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30 [animation-duration:2.4s]" />
      <svg viewBox="0 0 32 32" aria-hidden className="h-7 w-7 fill-current">
        <path d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.46 1.713 6.403L3.2 28.8l6.57-1.72a12.74 12.74 0 0 0 6.233 1.587h.005c7.06 0 12.8-5.74 12.802-12.8a12.73 12.73 0 0 0-3.748-9.052A12.73 12.73 0 0 0 16.003 3.2Zm0 23.36h-.004a10.6 10.6 0 0 1-5.4-1.48l-.387-.23-4.003 1.05 1.068-3.9-.252-.4a10.56 10.56 0 0 1-1.62-5.6c0-5.867 4.776-10.64 10.65-10.64a10.58 10.58 0 0 1 7.524 3.12 10.56 10.56 0 0 1 3.114 7.527c-.003 5.867-4.778 10.64-10.642 10.64Zm5.835-7.967c-.32-.16-1.892-.933-2.185-1.04-.293-.107-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.572-1.587-.95-.848-1.592-1.895-1.778-2.215-.187-.32-.02-.493.14-.652.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.986-2.373-.26-.624-.524-.54-.72-.55l-.613-.01c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.667 0 1.573 1.146 3.093 1.306 3.307.16.213 2.253 3.44 5.46 4.825.763.33 1.358.526 1.822.673.766.244 1.463.21 2.014.127.614-.092 1.892-.773 2.158-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373Z" />
      </svg>
    </a>
  );
}
