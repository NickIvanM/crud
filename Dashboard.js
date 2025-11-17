import React, { useEffect, useState } from "react";
import RecordForm from "./RecordForm";
import RecordTable from "./RecordTable";

function Dashboard({ token, setToken }) {
  const [records, setRecords] = useState([]);
  const [editRecord, setEditRecord] = useState(null);

  // Load all records (GET)
  const loadRecords = () => {
    fetch("http://127.0.0.1:8000/api/records/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setRecords(data))
      .catch((err) => console.error(err));
  };

  // Add new record (POST)
  const addRecord = (newName) => {
    if (!newName) return;

    fetch("http://127.0.0.1:8000/api/records/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ name: newName }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add record");
        return res.json();
      })
      .then(() => loadRecords()) // reload records after adding
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadRecords();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Dashboard</h2>
      <button
        className="btn btn-secondary mb-3"
        onClick={() => setToken(null)}
      >
        Logout
      </button>

      <RecordForm
        token={token}
        reload={loadRecords}
        editRecord={editRecord}
        setEditRecord={setEditRecord}
        addRecord={addRecord} // pass addRecord to form
      />

      <RecordTable
        records={records}
        token={token}
        reload={loadRecords}
        setEditRecord={setEditRecord}
      />
    </div>
  );
}

export default Dashboard;
