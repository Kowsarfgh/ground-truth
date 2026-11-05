import { Navigate, Route, Routes } from 'react-router-dom'

import { RootLayout } from '@/components/layout/RootLayout'
import { About } from '@/pages/About'
import { Compare } from '@/pages/Compare'
import { Explore } from '@/pages/Explore'
import { Home } from '@/pages/Home'
import { Stories } from '@/pages/Stories'
import { TehranStory } from '@/pages/TehranStory'

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/tehran" element={<TehranStory />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
