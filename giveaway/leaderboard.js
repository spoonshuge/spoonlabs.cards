// 1) Point this at the *published* CSV of your responses sheet.
//    To get this: in Google Sheets File → Publish to web → CSV → copy the URL.
const sheetCsvUrl = 'https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID_HERE/pub?gid=0&single=true&output=csv';

fetch(sheetCsvUrl)
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
  })
  .then(csvText => {
    // Parse CSV, skip header row
    const rows = csvText.trim().split('\n').slice(1);
    // Expect columns: timestamp,name,displayName,contactMethod,email/phone/insta,code,entries
    const data = rows.reduce((acc, line) => {
      const cols = line.split(',');
      const displayName = cols[2]?.trim();
      const entries = parseInt(cols[6] || '1', 10);
      if (!displayName) return acc;
      acc[displayName] = (acc[displayName] || 0) + (isNaN(entries) ? 1 : entries);
      return acc;
    }, {});

    // Convert to sorted array
    const sorted = Object.entries(data)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    // Render into table
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = ''; // clear “Loading…”
    sorted.forEach((row, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>${row.name}</td>
        <td>${row.count}</td>
      `;
      tbody.appendChild(tr);
    });

    // If no entries at all
    if (sorted.length === 0) {
      tbody.innerHTML = '<tr><td colspan="3">No entries yet.</td></tr>';
    }
  })
  .catch(err => {
    console.error('Failed loading leaderboard:', err);
    document.getElementById('leaderboard-body').innerHTML =
      '<tr><td colspan="3" style="color:red;">Error loading leaderboard.</td></tr>';
  });
