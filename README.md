## QR-kód képpé alakítása
## Feltöltés Cloudinary-re
## URL mentése Firestore-ba

- Az html2canvas rögzíti a QR-kódot.
- A canvas.toBlob() átalakítja a képet Blob formátumba.
- A Blob egy File objektummá alakul, így a Cloudinary API megfelelően tudja kezelni.
- Az uploadFile(file) függvény feltölti a Cloudinary-re, és visszakapjuk az URL-t.
- Az URL mentésre kerül a Firestore adatbázisba.