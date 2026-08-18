export default function Advertisement() {
  return (
    <div className="advertisement-section">
      <video className="advertisement-video" autoPlay muted loop playsInline>
        <source src="/video/store-intro.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
