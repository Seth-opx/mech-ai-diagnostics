export default function Garages() {
  return (
    <main className="screen">
      <h2>Garages proches</h2>
      <div className="card">
        <p>
          La géolocalisation et la recherche de garages peuvent être connectées ensuite à Google Places,
          Apple Maps ou une base Supabase.
        </p>
      </div>
      {['Garage Central', 'Auto Service Express', 'Mécanique Pro'].map((name, index) => (
        <div className="card" key={name}>
          <h3>{name}</h3>
          <p>{index + 1}. Diagnostic, entretien, réparation.</p>
          <button className="btn-secondary" style={{ marginTop: 10 }}>Voir détails</button>
        </div>
      ))}
    </main>
  )
}
