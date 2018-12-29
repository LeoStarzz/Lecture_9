export const create = (type, body) => {
  return fetch(`http://localhost:8080/${type}/`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => res.json()).then(data => data);
}

export const getData = (data) => {
  return fetch(`http://localhost:8080/${data}/`, { method: 'GET' }).then(res => res.json()).then(data => data);
}

export const deleteAll = (data) => {
  return fetch(`http://localhost:8080/${data}/`, { method: 'DELETE' });
}

export const deleteOne = (type, id) => {
  return fetch(`http://localhost:8080/${type}/${id}/`, { method: 'DELETE' }).then((res) => res.json()).then(data => data);
}

export const updateData = (type, id, body) => {
  return fetch(`http://localhost:8080/${type}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json()).then(data => data);
}