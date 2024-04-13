import React, { useState } from 'react';

function Dialog({ onClose }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '5px' }}  onClick={(e) => e.stopPropagation()}>
        <p>内容…</p>
        <button onClick={onClose} >關閉/button>
      </div>
    </div>
  );
}

export default Dialog;
