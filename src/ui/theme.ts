export const theme = {
  color: {
    bg: '#0E1013',
    surface: '#191C21',
    bubbleThem: '#22262D',
    bubbleYou: '#2F6F4E',
    text: '#E8EAED',
    textDim: '#9AA0A6',
    accent: '#E4B363',
    danger: '#C4483C',
    proof: '#4E8CF0',
  },
  space: { xs: 4, sm: 8, md: 12, lg: 20, xl: 32 },
  radius: { bubble: 18, chip: 10 },
  type: {
    body: { fontSize: 16, lineHeight: 22 },
    meta: { fontSize: 12, lineHeight: 16 },
    title: { fontSize: 22, lineHeight: 28, fontWeight: '600' as const },
  },
} as const;
