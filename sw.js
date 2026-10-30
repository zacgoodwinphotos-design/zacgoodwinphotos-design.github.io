/* Offline support: keeps the app and its images on the phone. Bump VERSION when files change. */
const VERSION = "fp-v17";
const ASSETS = [
 "./",
 "index.html",
 "manifest.webmanifest",
 "icons/icon-192.png",
 "icons/icon-512.png",
 "icons/icon-maskable-512.png",
 "img/cable-face-pull-peak.webp",
 "img/cable-face-pull-start.webp",
 "img/cable-row-peak.webp",
 "img/cable-row-start.webp",
 "img/cable-tricep-pushdown-peak.webp",
 "img/cable-tricep-pushdown-start.webp",
 "img/dumbbell-bench-press-peak.webp",
 "img/dumbbell-bench-press-start.webp",
 "img/dumbbell-bicep-curl-peak.webp",
 "img/dumbbell-bicep-curl-start.webp",
 "img/dumbbell-hip-thrust-peak.webp",
 "img/dumbbell-hip-thrust-start.webp",
 "img/dumbbell-lunge-peak.webp",
 "img/dumbbell-lunge-start.webp",
 "img/dumbbell-row-peak.webp",
 "img/dumbbell-row-start.webp",
 "img/dumbbell-shoulder-press-peak.webp",
 "img/dumbbell-shoulder-press-start.webp",
 "img/dumbbell-skullcrusher-peak.webp",
 "img/dumbbell-skullcrusher-start.webp",
 "img/hammer-curl-peak.webp",
 "img/hammer-curl-start.webp",
 "img/hip-abductor-peak.webp",
 "img/hip-abductor-start.webp",
 "img/incline-dumbbell-curl-peak.webp",
 "img/incline-dumbbell-curl-start.webp",
 "img/lat-pulldown-peak.webp",
 "img/lat-pulldown-start.webp",
 "img/leg-press-peak.webp",
 "img/leg-press-start.webp",
 "img/machine-bench-press-peak.webp",
 "img/machine-bench-press-start.webp",
 "img/machine-fly-peak.webp",
 "img/machine-fly-start.webp",
 "img/plank-main.webp",
 "img/romanian-deadlift-peak.webp",
 "img/romanian-deadlift-start.webp",
 "img/seated-calf-press-peak.webp",
 "img/seated-calf-press-start.webp",
 "img/seated-leg-curl-peak.webp",
 "img/seated-leg-curl-start.webp",
 "img/single-leg-calf-raise-peak.webp",
 "img/single-leg-calf-raise-start.webp",
 "img/single-leg-rdl-peak.webp",
 "img/single-leg-rdl-start.webp"
];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if(req.method !== "GET") return;
  const url = new URL(req.url);
  if(url.origin === location.origin){
    if(req.mode === "navigate"){
      e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put("index.html", copy)); return r; }).catch(() => caches.match("index.html")));
      return;
    }
    e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
  } else if(url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com")){
    e.respondWith(caches.open(VERSION + "-fonts").then(c => c.match(req).then(hit => hit || fetch(req).then(r => { c.put(req, r.clone()); return r; }))));
  }
});
