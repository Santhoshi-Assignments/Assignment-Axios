import React, { useState } from 'react';
import jsonData from './Data.json'
import './CrudApp.css';

const CrudApp = () => {
  const [data, setData] = useState(jsonData);
  const [newItem, setNewItem] = useState('');
  const [editItem, setEditItem] = useState(null);

  const handleAdd = () => {
    const newItemObject = {
      id: Date.now(),
      title: newItem,
      completed: false,
    };

    setData([...data, newItemObject]);
    setNewItem('');
  };

  const handleEdit = (id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, title: newItem } : item
    );

    setData(updatedData);
    setEditItem(null);
    setNewItem('');
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const handleEditClick = (id, title) => {
    setEditItem(id);
    setNewItem(title);
  };

  const handleCancelEdit = () => {
    setEditItem(null);
    setNewItem('');
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {editItem === item.id ? (
              <>
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
                <button onClick={() => handleEdit(item.id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <span>{item.title}</span>
                <div>
                <button onClick={() => handleEditClick(item.id, item.title)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
        />
        <button onClick={editItem ? () => handleEdit(editItem) : handleAdd}>
          {editItem ? 'Edit' : 'Add'}
        </button>
      </div>
    </div>
  );
};

export default CrudApp;


