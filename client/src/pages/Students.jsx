import { useEffect, useState } from 'react'
import { api } from '../api'

export default function Students() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    api.get('/students').then(data => {
      if (Array.isArray(data)) setStudents(data)
    })
  }, [])

  return (
    <div>
      <h1 style={styles.heading}>Student Information</h1>
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Course</th>
              <th style={styles.th}>Clubs</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} style={styles.tr}>
                <td style={styles.td}>{s.name}</td>
                <td style={styles.td}>{s.email}</td>
                <td style={styles.td}>{s.phone}</td>
                <td style={styles.td}>{s.course || 'N/A'}</td>
                <td style={styles.td}>
                  {s.clubs.length > 0
                    ? s.clubs.map(c => <span key={c} style={styles.badge}>{c}</span>)
                    : <span style={styles.noClub}>No Club</span>}
                </td>
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
  td: { padding: '14px 18px' },
  badge: { background: '#28a745', color: 'white', padding: '4px 10px', borderRadius: 20, fontSize: 12, marginRight: 4, display: 'inline-block' },
  noClub: { color: 'gray', fontStyle: 'italic' }
}
