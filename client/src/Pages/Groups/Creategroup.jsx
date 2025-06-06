import React, { useState } from 'react';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState([]);

  const handleCreateGroup = async () => {
    await fetch('/api/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: groupName, members }),
    });
    alert('Group created!');
  };

  return (
    <div>
      <h2>Create Group</h2>
      <input value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Group Name" />
      <input
        placeholder="Add member email"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setMembers([...members, e.target.value]);
            e.target.value = '';
          }
        }}
      />
      <button onClick={handleCreateGroup}>Create</button>
    </div>
  );
};

export default CreateGroup;
