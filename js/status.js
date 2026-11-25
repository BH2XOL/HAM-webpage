/* Custom MD3 Radio Status Badge (fetches https://status.bh2xol.com/) */
(function () {
  var container = document.getElementById('radio-status');
  if (!container || typeof window.fetch !== 'function') return;

  var ENDPOINT = 'https://status.bh2xol.com/';
  var REFRESH_MS = 60000;

  function formatUtcTime(iso) {
    if (!iso) return '';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    var hh = String(d.getUTCHours()).padStart(2, '0');
    var mm = String(d.getUTCMinutes()).padStart(2, '0');
    return hh + ':' + mm + 'Z';
  }

  function formatFreq(freq) {
    if (!freq) return '';
    var text = String(freq).trim();
    if (!text) return '';
    return /[a-zA-Z]$/.test(text) ? text : text + ' MHz';
  }

  function clearBadge() {
    container.innerHTML = '';
  }

  function renderChip(data) {
    if (!data || typeof data !== 'object') {
      clearBadge();
      return;
    }

    var isOnAir = String(data.status || '').toLowerCase() === 'onair';
    var freqText = formatFreq(data.freq);
    var modeText = data.mode ? String(data.mode).trim().toUpperCase() : '';
    var sinceText = isOnAir ? formatUtcTime(data.since) : '';

    var chip = document.createElement('div');
    chip.className = 'radio-chip ' + (isOnAir ? 'is-onair' : 'is-offair');

    var dot = document.createElement('span');
    dot.className = 'radio-dot';
    dot.setAttribute('aria-hidden', 'true');
    chip.appendChild(dot);

    var label = document.createElement('span');
    label.className = 'radio-label';
    label.textContent = 'STATION';
    chip.appendChild(label);

    var state = document.createElement('span');
    state.className = 'radio-state';
    state.textContent = isOnAir ? 'ON AIR' : 'OFF AIR';
    chip.appendChild(state);

    if (freqText) {
      var sep = document.createElement('span');
      sep.className = 'radio-sep';
      sep.textContent = '·';
      chip.appendChild(sep);

      var freq = document.createElement('span');
      freq.className = 'radio-freq';
      freq.textContent = freqText;
      chip.appendChild(freq);
    }

    if (modeText) {
      var mode = document.createElement('span');
      mode.className = 'radio-mode';
      mode.textContent = modeText;
      chip.appendChild(mode);
    }

    if (sinceText) {
      var since = document.createElement('span');
      since.className = 'radio-since';
      since.textContent = sinceText;
      chip.appendChild(since);
    }

    container.innerHTML = '';
    container.appendChild(chip);
  }

  function fetchStatus() {
    fetch(ENDPOINT, { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        renderChip(data);
      })
      .catch(function () {
        if (!container.hasChildNodes()) {
          clearBadge();
        }
      });
  }

  fetchStatus();
  setInterval(fetchStatus, REFRESH_MS);
})();
