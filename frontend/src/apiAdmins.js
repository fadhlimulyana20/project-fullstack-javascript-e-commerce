// API untuk CRUD admin
const API_URL = '/api/admins';

export async function fetchAdmins() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Gagal mengambil data admin');
  return res.json();
}

export async function createAdmin(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Gagal menambah admin');
  return res.json();
}

export async function updateAdmin(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Gagal mengupdate admin');
  return res.json();
}

export async function deleteAdmin(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Gagal menghapus admin');
  return res.json();
}
