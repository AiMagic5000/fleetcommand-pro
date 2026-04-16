export default function Dashboard() {
  return (
    <iframe
      src="/api/tms"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        border: "none",
        zIndex: 9999,
      }}
      title="FleetCommand Pro Dashboard"
    />
  )
}
