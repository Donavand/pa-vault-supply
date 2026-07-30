import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Colognes from './pages/Colognes'
import Clothes from './pages/Clothes'
import ProductPage from './pages/ProductPage'
import ClothingPage from './pages/ClothingPage'
import GearShop from './pages/GearShop'
import GearProductPage from './pages/GearProductPage'
import WomenShop from './pages/WomenShop'
import WomenProductPage from './pages/WomenProductPage'

function RedirectToMenClothes() {
  const { slug } = useParams<{ slug: string }>()
  return <Navigate to={`/men/clothes/${slug}`} replace />
}

function RedirectToMenBags() {
  const { slug } = useParams<{ slug: string }>()
  return <Navigate to={`/men/bags/${slug}`} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/colognes" element={<Colognes />} />
          <Route path="/colognes/:slug" element={<ProductPage />} />

          <Route path="/men" element={<Navigate to="/men/clothes" replace />} />
          <Route path="/men/clothes" element={<Clothes />} />
          <Route path="/men/clothes/:slug" element={<ClothingPage />} />
          <Route
            path="/men/bags"
            element={
              <GearShop
                category="bags"
                basePath="/men/bags"
                title="Men · Bags"
                showMenTabs
              />
            }
          />
          <Route
            path="/men/bags/:slug"
            element={
              <GearProductPage category="bags" basePath="/men/bags" />
            }
          />

          <Route path="/women" element={<Navigate to="/women/clothes" replace />} />
          <Route
            path="/women/clothes"
            element={<WomenShop section="clothes" />}
          />
          <Route
            path="/women/clothes/:slug"
            element={<WomenProductPage section="clothes" />}
          />
          <Route path="/women/bags" element={<WomenShop section="bags" />} />
          <Route
            path="/women/bags/:slug"
            element={<WomenProductPage section="bags" />}
          />

          <Route path="/clothes" element={<Navigate to="/men/clothes" replace />} />
          <Route path="/clothes/:slug" element={<RedirectToMenClothes />} />
          <Route path="/bags" element={<Navigate to="/men/bags" replace />} />
          <Route path="/bags/:slug" element={<RedirectToMenBags />} />

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
