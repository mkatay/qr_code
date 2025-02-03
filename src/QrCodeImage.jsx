import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas-pro';
import { uploadFile } from './uploadFile'; // A Cloudinary feltöltő függvény

export const QrCodeImage = ({ element }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    if (element) {
      const captureAndUpload = async () => {
        try {
          // 1. QR-kód rögzítése canvas-ként
          const canvas = await html2canvas(element);
          
          // 2. Kép konvertálása Blob formátumba
          canvas.toBlob(async (blob) => {
            if (!blob) return;
            
            // 3. Blob átalakítása File objektummá
            const file = new File([blob], "qr-code.png", { type: "image/png" });

            // 4. Feltöltés Cloudinary-re
            setUploadStatus("Feltöltés folyamatban...");
            const { url } = await uploadFile(file);
console.log('Ezt az url-t kell feltölteni a Firestore adatbázisba:',url);
            setImageSrc(url);
            setUploadStatus("Feltöltés sikeres!");
          }, "image/png");
        } catch (error) {
          console.error("Hiba történt:", error);
          setUploadStatus("Hiba a feltöltés során.");
        }
      };
      captureAndUpload();
    }
  }, [element]);

  return (
    <div>
      {uploadStatus && <p>{uploadStatus}</p>}
      {imageSrc ? (
        <img src={imageSrc} alt="QR Code" style={{ marginTop: '20px', maxWidth: '100%' }} />
      ) : (
        <p>Kép generálása folyamatban...</p>
      )}
    </div>
  );
};
