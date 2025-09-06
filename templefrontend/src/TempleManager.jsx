import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import config from './config';

const TempleManager = () => {
  const [temples, setTemples] = useState([]);
  const [temple, setTemple] = useState({
    templeId: '',
    name: '',
    location: '',
    lordName: '',
    establishedYear: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedTemple, setFetchedTemple] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/templeapi`;

  useEffect(() => {
    fetchAllTemples();
  }, []);

  const fetchAllTemples = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setTemples(res.data);
    } catch (error) {
      setMessage('Failed to fetch temples.');
    }
  };

  const handleChange = (e) => {
    setTemple({ ...temple, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in temple) {
      if (!temple[key] || temple[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addTemple = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, temple);
      setMessage('Temple added successfully.');
      fetchAllTemples();
      resetForm();
    } catch (error) {
      setMessage('Error adding temple.');
    }
  };

  const updateTemple = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, temple);
      setMessage('Temple updated successfully.');
      fetchAllTemples();
      resetForm();
    } catch (error) {
      setMessage('Error updating temple.');
    }
  };

  const deleteTemple = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllTemples();
    } catch (error) {
      setMessage('Error deleting temple.');
    }
  };

  const getTempleById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedTemple(res.data);
      setMessage('');
    } catch (error) {
      setFetchedTemple(null);
      setMessage('Temple not found.');
    }
  };

  const handleEdit = (t) => {
    setTemple(t);
    setEditMode(true);
    setMessage(`Editing temple with ID ${t.templeId}`);
  };

  const resetForm = () => {
    setTemple({
      templeId: '',
      name: '',
      location: '',
      lordName: '',
      establishedYear: ''
    });
    setEditMode(false);
  };

  return (
    <div className="cart-container">

      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>Temple Management</h2>

      <div>
        <h3>{editMode ? 'Edit Temple' : 'Add Temple'}</h3>
        <div className="form-grid">
          <input type="number" name="templeId" placeholder="Temple ID" value={temple.templeId} onChange={handleChange} />
          <input type="text" name="name" placeholder="Temple Name" value={temple.name} onChange={handleChange} />
          <input type="text" name="location" placeholder="Location" value={temple.location} onChange={handleChange} />
          <input type="text" name="lordName" placeholder="Lord Name" value={temple.lordName} onChange={handleChange} />
          <input type="number" name="establishedYear" placeholder="Established Year" value={temple.establishedYear} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addTemple}>Add Temple</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateTemple}>Update Temple</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div>
        <h3>Get Temple By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter Temple ID"
        />
        <button className="btn-blue" onClick={getTempleById}>Fetch</button>

        {fetchedTemple && (
          <div>
            <h4>Temple Found:</h4>
            <pre>{JSON.stringify(fetchedTemple, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h3>All Temples</h3>
        {temples.length === 0 ? (
          <p>No temples found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(temple).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {temples.map((t) => (
                  <tr key={t.templeId}>
                    {Object.keys(temple).map((key) => (
                      <td key={key}>{t[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(t)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteTemple(t.templeId)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default TempleManager;
