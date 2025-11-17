import React from "react";

function RecordTable({ records, token, reload, setEditRecord }) {
  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/records/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Token ${token}` },
    })
      .then(() => reload())
      .catch((err) => console.error(err));
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {records.map((r) => (
          <tr key={r.id}>
            <td>{r.id}</td>
            <td>{r.name}</td>
            <td>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => setEditRecord(r)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(r.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RecordTable;
