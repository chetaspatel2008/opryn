#!/bin/bash

# 1. Update LandingPage.tsx
cp opryn/src/App.tsx src/pages/LandingPage.tsx
sed -i '' 's/export default function App()/export default function LandingPage()/g' src/pages/LandingPage.tsx

# 2. Merge index.css
cat opryn/src/index.css >> src/index.css.tmp
cat src/index.css >> src/index.css.tmp
# Remove duplicate import
sed -i '' 's/@import "tailwindcss";//g' src/index.css.tmp
sed -i '' 's/@tailwind base;//g' src/index.css.tmp
sed -i '' 's/@tailwind components;//g' src/index.css.tmp
sed -i '' 's/@tailwind utilities;//g' src/index.css.tmp

# Add it back to top
echo '@import "tailwindcss";' > src/index.css
cat src/index.css.tmp >> src/index.css
rm src/index.css.tmp

