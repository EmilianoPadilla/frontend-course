import useMediaQuery from './useMediaQuery'

function MediaQueryDemo() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')

  return (
    <div>
      <h1>Media Query Demo</h1>
      <p>Current screen: {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}</p>

      {isMobile && <p>Showing mobile layout!</p>}
      {!isMobile && <p>Showing desktop layout!</p>}
    </div>
  )
}

export default MediaQueryDemo