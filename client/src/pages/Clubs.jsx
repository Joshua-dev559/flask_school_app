import { useEffect, useState } from 'react'
import { api } from '../api'

export default function Clubs() {
  const [clubs, setClubs] = useState([])

  useEffect(() => {
    api.get('/clubs').then(data => {
      if (Array.isArray(data)) setClubs(data)
    })
  }, [])

  return (
    <div>
      <h1 style={styles.heading}>Clubs</h1>
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Club Name</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map(c => (
              <tr key={c.id} style={styles.tr}>
                <td style={styles.td}>{c.id}</td>
                <td style={styles.td}>{c.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const styles = {
  heading: { textAlign: 'center', color: 'white', fontSize: 36, margin: '30px 0', textShadow: '2px 2px 5px rgba(0,0,0,0.3)' },
  tableWrap: { background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { background: '#007BFF', color: 'white' },
  th: { padding: '16px 18px', textAlign: 'left', fontSize: 16 },
  tr: { borderBottom: '1px solid #ddd' },
  td: { padding: '14px 18px' }
}
