// Two-click YouTube embed: nothing is loaded from Google until the visitor clicks.
// Usage: <div class="yt" data-yt-id="VIDEO_ID" data-thumb="assets/thumb.jpg"></div>
// The thumbnail (optional) must be a local file, not YouTube's image server.
document.querySelectorAll('.yt').forEach(function (box) {
  var id = (box.dataset.ytId || '').trim();
  if (!id) {
    box.innerHTML = '<div class="yt-soon">Video coming soon</div>';
    return;
  }
  if (box.dataset.thumb) {
    box.style.backgroundImage = 'url("' + box.dataset.thumb + '")';
    box.classList.add('has-thumb');
  }
  var btn = document.createElement('button');
  btn.className = 'yt-button';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Play video: ' + (box.dataset.title || 'video'));
  btn.innerHTML = '<span class="play"></span>' +
    '<small>Clicking loads the video from YouTube (Google). Their privacy policy applies.</small>';
  btn.addEventListener('click', function () {
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
    f.title = box.dataset.title || 'Video';
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
    box.innerHTML = '';
    box.appendChild(f);
  });
  box.appendChild(btn);
});
