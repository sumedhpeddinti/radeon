import { motion } from "motion/react"

import { IconAvatar } from "../icon-avatar"

export default function AvatarBox({ checked }: { checked?: boolean }) {
  return (
    <IconAvatar
      size="xlarge"
      className="bg-ui-button-neutral shadow-buttons-neutral after:button-neutral-gradient relative mb-4 flex h-[50px] w-[50px] items-center justify-center rounded-xl after:inset-0 after:content-['']"
    >
      {checked && (
        <motion.div
          className="absolute -right-[5px] -top-1 flex size-5 items-center justify-center rounded-full border-[0.5px] border-[rgba(3,7,18,0.2)] bg-[#3B82F6] bg-gradient-to-b from-white/0 to-white/20 shadow-[0px_1px_2px_0px_rgba(3,7,18,0.12),0px_1px_2px_0px_rgba(255,255,255,0.10)_inset,0px_-1px_5px_0px_rgba(255,255,255,0.10)_inset,0px_0px_0px_0px_rgba(3,7,18,0.06)_inset]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <motion.path
              d="M5.8335 10.4167L9.16683 13.75L14.1668 6.25"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.3,
                delay: 1.1,
                bounce: 0.6,
                ease: [0.1, 0.8, 0.2, 1.01],
              }}
            />
          </svg>
        </motion.div>
      )}
      <svg
        className="rounded-[10px]"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="400" height="400" fill="#18181B" />
        <g transform="translate(50, 95) scale(0.8)">
          <path
            d="M 218 2 L 209 3 L 203 4 L 199 5 L 195 6 L 192 7 L 189 8 L 184 10 L 179 12 L 175 14 L 169 17 L 164 20 L 155 26 L 151 29 L 145 34 L 131 48 L 127 53 L 124 57 L 121 61 L 119 64 L 114 72 L 110 79 L 107 86 L 101 96 L 86 121 L 56 170 L 47 183 L 34 206 L 26 219 L 7 248 L 3 256 L 1 259 L 108 258 L 108 257 L 112 252 L 112 251 L 118 243 L 124 232 L 136 215 L 144 201 L 154 187 L 158 179 L 168 165 L 172 157 L 179 146 L 195 121 L 197 118 L 199 115 L 202 111 L 208 104 L 210 102 L 216 97 L 220 94 L 224 92 L 229 89 L 234 87 L 237 86 L 240 85 L 244 84 L 250 83 L 289 83 L 344 29 L 371 2 Z"
            fill="url(#paint0_linear_11869_12671)"
            stroke="url(#paint1_linear_11869_12671)"
            strokeWidth="2"
          />
          <circle
            cx="278.8"
            cy="210.1"
            r="49.9"
            fill="url(#paint0_linear_11869_12671)"
            stroke="url(#paint1_linear_11869_12671)"
            strokeWidth="2"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_11869_12671"
            x1="200"
            y1="40"
            x2="200"
            y2="360"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_11869_12671"
            x1="200"
            y1="40"
            x2="200"
            y2="360"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="white" stopOpacity="0.7" />
          </linearGradient>
        </defs>
      </svg>
    </IconAvatar>
  )
}
