// File ini (sw.js) akan berjalan di background.
// Untuk sekarang, fungsinya sederhana: menangani event notifikasi.

self.addEventListener('install', event => {
  console.log('Service Worker: Install');
});

self.addEventListener('activate', event => {
  console.log('Service Worker: Activate');
});

// Listener saat notifikasi di-klik
self.addEventListener('notificationclick', event => {
  console.log('Notifikasi di-klik:', event.notification.tag);
  event.notification.close();

  // Bagian ini akan membuka kembali aplikasi saat notifikasi di-klik
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
