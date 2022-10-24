import UploadFile from '@/components/UploadFile'
import dynamic from 'next/dynamic'

export default function Home() {
  const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
    loading: () => <h2>The map is loading...</h2>,
    ssr: false,
  })

  return (
    <main>
      <div className="mx-5 flex h-screen flex-col">
        <div className="flex-none">
          <UploadFile />
        </div>
        <div className="flex-1 w-11/12 m-auto my-5">
          <MapWithNoSSR />
        </div>
      </div>
    </main>
  )
}
