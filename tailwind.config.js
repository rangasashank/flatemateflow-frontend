/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float1: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        float2: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(20px)' },
        },
        float3: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(10px) translateX(15px)' },
        },
        float4: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-25px)' },
        },
        float5: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(-30px)' },
        },
      },
      animation: {
        float1: 'float1 6s ease-in-out infinite',
        float2: 'float2 8s ease-in-out infinite',
        float3: 'float3 10s ease-in-out infinite',
        float4: 'float4 7s ease-in-out infinite',
        float5: 'float5 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

