import './App.css'
import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { QrCodeImage } from './QrCodeImage';

function App() {
  const value = '123456';
  const qrCodeRef = useRef(null);
  const [qrElement, setQrElement] = useState(null); // Állapot az aktuális elemhez

  useEffect(() => {
    setQrElement(qrCodeRef.current);
  }, []);

  return (
    <>
      <div
        ref={qrCodeRef}
        style={{ height:"auto",margin:"0 auto",maxWidth:128,width:"100%",background:'white',padding:'16px' }}
      >
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={value}
          viewBox={`0 0 256 256`}
        />
      </div>
      <QrCodeImage element={qrElement} />
    </>
  );
}

export default App;
