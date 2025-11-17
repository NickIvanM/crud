import React, { useState, useEffect } from "react";

function RecordForm({ token, reload, editRecord, setEditRecord }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editRecord) setName(editRecord.name);
  }, [editRecord]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = editRecord ? "PUT" : "POST";
    const url = editRecord
      ? `http://127.0.0.1:8000/api/records/${editRecord.id}/`
      : "http://127.0.0.1:8000/api/records/";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then(() => {
        setName("");
        setEditRecord(null);
        reload();
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter record name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="btn btn-primary" type="submit">
          {editRecord ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}

export default RecordForm;
