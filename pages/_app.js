import "../styles/styles.css"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div style={{ width: '100%', paddingTop: 100, paddingBottom: 100 }}>
        <div style={{ width: "calc(100% - 40px)", maxWidth: 1020, margin: 'auto' }}>
          <Component {...pageProps} />
        </div>
      </div>
    </>
  )
}

export default MyApp
