import React, { useEffect, useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';

export const ReadQR = ({ setScanQR }) => {
  const [qrResult, setQrResult] = useState(null);
  

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();

    const startScan = async () => {
      try {
        const videoInputDevices = await BrowserQRCodeReader.listVideoInputDevices();
        if (videoInputDevices.length === 0) {
          console.error("Nincs elérhető kamera!");
          return;
        }

        const selectedDeviceId = videoInputDevices[0].deviceId;
        console.log(`QR-kód olvasás indítása kamerával: ${selectedDeviceId}`);

        const videoElement = document.getElementById('qr-video');

        const controls = await codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          videoElement,
          (result, error, controls) => {
            if (result) {
              console.log('Beolvasott QR-kód:', result.getText());
              setQrResult(result.getText());
              setScanQR(false);
              controls.stop();
            }
            if (error) {
              console.error("QR-kód olvasási hiba:", error);
            }
          }
        );

        // 20 másodperc után automatikusan leállítja a beolvasást
        setTimeout(() => controls.stop(), 20000);
      } catch (error) {
        console.error("QR-kód olvasási hiba:", error);
      }
    };

    startScan();

  }, [setScanQR]);

  return (
    <div style={{maxWidth:'300px'}}>
      <h2>QR-kód beolvasása</h2>
      <video id="qr-video" style={{ width: '100%', border: '1px solid black' }}></video>
      {qrResult && <p>QR-kód tartalma: {qrResult}</p>}
    </div>
  );
};


