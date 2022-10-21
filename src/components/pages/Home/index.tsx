import UploadFile from '@/components/UploadFile'
import dynamic from 'next/dynamic'

export default function Home() {
  const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
    loading: () => <h2>The map is loading...</h2>,
    ssr: false,
  })

  return (
    <main>
      <UploadFile />

      <div id="map">
        <MapWithNoSSR />
      </div>
    </main>
  )
}
