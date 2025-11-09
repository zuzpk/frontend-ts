// public/sw.js
self.addEventListener('push', (event) => {
  const data = event.data?.json() || { title: 'Notification', body: 'You have a new message!' };

  const options = {
    body: data.body,
    icon: data.icon || '/imgs/zuz-logo.png',
    badge: '/imgs/zuz-logo.png',
    data: data.url || '/',
    tag: data.tag || 'default',
    requireInteraction: true,
    silent: false,
    sound: '/sounds/notification.wav'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});