import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Colognes from './pages/Colognes'
import Clothes from './pages/Clothes'
import ProductPage from './pages/ProductPage'
import ClothingPage from './pages/ClothingPage'
import GearShop from './pages/GearShop'
import GearProductPage from './pages/GearProductPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/colognes" element={<Colognes />} />
          <Route path="/colognes/:slug" element={<ProductPage />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/clothes/:slug" element={<ClothingPage />} />
          <Route path="/bags" element={<GearShop category="bags" />} />
          <Route
            path="/bags/:slug"
            element={<GearProductPage category="bags" />}
          />
          <Route path="/slides" element={<GearShop category="slides" />} />
          <Route
            path="/slides/:slug"
            element={<GearProductPage category="slides" />}
          />
          <Route path="/airpods" element={<GearShop category="airpods" />} />
          <Route
            path="/airpods/:slug"
            element={<GearProductPage category="airpods" />}
          />
          <Route path="/product/:slug" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
