(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
      if (decorator = decorators[i4])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // node_modules/howler/dist/howler.js
  var require_howler = __commonJS({
    "node_modules/howler/dist/howler.js"(exports) {
      (function() {
        "use strict";
        var HowlerGlobal2 = function() {
          this.init();
        };
        HowlerGlobal2.prototype = {
          /**
           * Initialize the global Howler object.
           * @return {Howler}
           */
          init: function() {
            var self = this || Howler3;
            self._counter = 1e3;
            self._html5AudioPool = [];
            self.html5PoolSize = 10;
            self._codecs = {};
            self._howls = [];
            self._muted = false;
            self._volume = 1;
            self._canPlayEvent = "canplaythrough";
            self._navigator = typeof window !== "undefined" && window.navigator ? window.navigator : null;
            self.masterGain = null;
            self.noAudio = false;
            self.usingWebAudio = true;
            self.autoSuspend = true;
            self.ctx = null;
            self.autoUnlock = true;
            self._setup();
            return self;
          },
          /**
           * Get/set the global volume for all sounds.
           * @param  {Float} vol Volume from 0.0 to 1.0.
           * @return {Howler/Float}     Returns self or current volume.
           */
          volume: function(vol) {
            var self = this || Howler3;
            vol = parseFloat(vol);
            if (!self.ctx) {
              setupAudioContext();
            }
            if (typeof vol !== "undefined" && vol >= 0 && vol <= 1) {
              self._volume = vol;
              if (self._muted) {
                return self;
              }
              if (self.usingWebAudio) {
                self.masterGain.gain.setValueAtTime(vol, Howler3.ctx.currentTime);
              }
              for (var i4 = 0; i4 < self._howls.length; i4++) {
                if (!self._howls[i4]._webAudio) {
                  var ids2 = self._howls[i4]._getSoundIds();
                  for (var j3 = 0; j3 < ids2.length; j3++) {
                    var sound2 = self._howls[i4]._soundById(ids2[j3]);
                    if (sound2 && sound2._node) {
                      sound2._node.volume = sound2._volume * vol;
                    }
                  }
                }
              }
              return self;
            }
            return self._volume;
          },
          /**
           * Handle muting and unmuting globally.
           * @param  {Boolean} muted Is muted or not.
           */
          mute: function(muted) {
            var self = this || Howler3;
            if (!self.ctx) {
              setupAudioContext();
            }
            self._muted = muted;
            if (self.usingWebAudio) {
              self.masterGain.gain.setValueAtTime(muted ? 0 : self._volume, Howler3.ctx.currentTime);
            }
            for (var i4 = 0; i4 < self._howls.length; i4++) {
              if (!self._howls[i4]._webAudio) {
                var ids2 = self._howls[i4]._getSoundIds();
                for (var j3 = 0; j3 < ids2.length; j3++) {
                  var sound2 = self._howls[i4]._soundById(ids2[j3]);
                  if (sound2 && sound2._node) {
                    sound2._node.muted = muted ? true : sound2._muted;
                  }
                }
              }
            }
            return self;
          },
          /**
           * Handle stopping all sounds globally.
           */
          stop: function() {
            var self = this || Howler3;
            for (var i4 = 0; i4 < self._howls.length; i4++) {
              self._howls[i4].stop();
            }
            return self;
          },
          /**
           * Unload and destroy all currently loaded Howl objects.
           * @return {Howler}
           */
          unload: function() {
            var self = this || Howler3;
            for (var i4 = self._howls.length - 1; i4 >= 0; i4--) {
              self._howls[i4].unload();
            }
            if (self.usingWebAudio && self.ctx && typeof self.ctx.close !== "undefined") {
              self.ctx.close();
              self.ctx = null;
              setupAudioContext();
            }
            return self;
          },
          /**
           * Check for codec support of specific extension.
           * @param  {String} ext Audio file extention.
           * @return {Boolean}
           */
          codecs: function(ext) {
            return (this || Howler3)._codecs[ext.replace(/^x-/, "")];
          },
          /**
           * Setup various state values for global tracking.
           * @return {Howler}
           */
          _setup: function() {
            var self = this || Howler3;
            self.state = self.ctx ? self.ctx.state || "suspended" : "suspended";
            self._autoSuspend();
            if (!self.usingWebAudio) {
              if (typeof Audio !== "undefined") {
                try {
                  var test = new Audio();
                  if (typeof test.oncanplaythrough === "undefined") {
                    self._canPlayEvent = "canplay";
                  }
                } catch (e4) {
                  self.noAudio = true;
                }
              } else {
                self.noAudio = true;
              }
            }
            try {
              var test = new Audio();
              if (test.muted) {
                self.noAudio = true;
              }
            } catch (e4) {
            }
            if (!self.noAudio) {
              self._setupCodecs();
            }
            return self;
          },
          /**
           * Check for browser support for various codecs and cache the results.
           * @return {Howler}
           */
          _setupCodecs: function() {
            var self = this || Howler3;
            var audioTest = null;
            try {
              audioTest = typeof Audio !== "undefined" ? new Audio() : null;
            } catch (err) {
              return self;
            }
            if (!audioTest || typeof audioTest.canPlayType !== "function") {
              return self;
            }
            var mpegTest = audioTest.canPlayType("audio/mpeg;").replace(/^no$/, "");
            var ua = self._navigator ? self._navigator.userAgent : "";
            var checkOpera = ua.match(/OPR\/([0-6].)/g);
            var isOldOpera = checkOpera && parseInt(checkOpera[0].split("/")[1], 10) < 33;
            var checkSafari = ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1;
            var safariVersion = ua.match(/Version\/(.*?) /);
            var isOldSafari = checkSafari && safariVersion && parseInt(safariVersion[1], 10) < 15;
            self._codecs = {
              mp3: !!(!isOldOpera && (mpegTest || audioTest.canPlayType("audio/mp3;").replace(/^no$/, ""))),
              mpeg: !!mpegTest,
              opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
              ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
              oga: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
              wav: !!(audioTest.canPlayType('audio/wav; codecs="1"') || audioTest.canPlayType("audio/wav")).replace(/^no$/, ""),
              aac: !!audioTest.canPlayType("audio/aac;").replace(/^no$/, ""),
              caf: !!audioTest.canPlayType("audio/x-caf;").replace(/^no$/, ""),
              m4a: !!(audioTest.canPlayType("audio/x-m4a;") || audioTest.canPlayType("audio/m4a;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
              m4b: !!(audioTest.canPlayType("audio/x-m4b;") || audioTest.canPlayType("audio/m4b;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
              mp4: !!(audioTest.canPlayType("audio/x-mp4;") || audioTest.canPlayType("audio/mp4;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
              weba: !!(!isOldSafari && audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
              webm: !!(!isOldSafari && audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
              dolby: !!audioTest.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
              flac: !!(audioTest.canPlayType("audio/x-flac;") || audioTest.canPlayType("audio/flac;")).replace(/^no$/, "")
            };
            return self;
          },
          /**
           * Some browsers/devices will only allow audio to be played after a user interaction.
           * Attempt to automatically unlock audio on the first user interaction.
           * Concept from: http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
           * @return {Howler}
           */
          _unlockAudio: function() {
            var self = this || Howler3;
            if (self._audioUnlocked || !self.ctx) {
              return;
            }
            self._audioUnlocked = false;
            self.autoUnlock = false;
            if (!self._mobileUnloaded && self.ctx.sampleRate !== 44100) {
              self._mobileUnloaded = true;
              self.unload();
            }
            self._scratchBuffer = self.ctx.createBuffer(1, 1, 22050);
            var unlock = function(e4) {
              while (self._html5AudioPool.length < self.html5PoolSize) {
                try {
                  var audioNode = new Audio();
                  audioNode._unlocked = true;
                  self._releaseHtml5Audio(audioNode);
                } catch (e5) {
                  self.noAudio = true;
                  break;
                }
              }
              for (var i4 = 0; i4 < self._howls.length; i4++) {
                if (!self._howls[i4]._webAudio) {
                  var ids2 = self._howls[i4]._getSoundIds();
                  for (var j3 = 0; j3 < ids2.length; j3++) {
                    var sound2 = self._howls[i4]._soundById(ids2[j3]);
                    if (sound2 && sound2._node && !sound2._node._unlocked) {
                      sound2._node._unlocked = true;
                      sound2._node.load();
                    }
                  }
                }
              }
              self._autoResume();
              var source = self.ctx.createBufferSource();
              source.buffer = self._scratchBuffer;
              source.connect(self.ctx.destination);
              if (typeof source.start === "undefined") {
                source.noteOn(0);
              } else {
                source.start(0);
              }
              if (typeof self.ctx.resume === "function") {
                self.ctx.resume();
              }
              source.onended = function() {
                source.disconnect(0);
                self._audioUnlocked = true;
                document.removeEventListener("touchstart", unlock, true);
                document.removeEventListener("touchend", unlock, true);
                document.removeEventListener("click", unlock, true);
                document.removeEventListener("keydown", unlock, true);
                for (var i5 = 0; i5 < self._howls.length; i5++) {
                  self._howls[i5]._emit("unlock");
                }
              };
            };
            document.addEventListener("touchstart", unlock, true);
            document.addEventListener("touchend", unlock, true);
            document.addEventListener("click", unlock, true);
            document.addEventListener("keydown", unlock, true);
            return self;
          },
          /**
           * Get an unlocked HTML5 Audio object from the pool. If none are left,
           * return a new Audio object and throw a warning.
           * @return {Audio} HTML5 Audio object.
           */
          _obtainHtml5Audio: function() {
            var self = this || Howler3;
            if (self._html5AudioPool.length) {
              return self._html5AudioPool.pop();
            }
            var testPlay = new Audio().play();
            if (testPlay && typeof Promise !== "undefined" && (testPlay instanceof Promise || typeof testPlay.then === "function")) {
              testPlay.catch(function() {
                console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.");
              });
            }
            return new Audio();
          },
          /**
           * Return an activated HTML5 Audio object to the pool.
           * @return {Howler}
           */
          _releaseHtml5Audio: function(audio) {
            var self = this || Howler3;
            if (audio._unlocked) {
              self._html5AudioPool.push(audio);
            }
            return self;
          },
          /**
           * Automatically suspend the Web Audio AudioContext after no sound has played for 30 seconds.
           * This saves processing/energy and fixes various browser-specific bugs with audio getting stuck.
           * @return {Howler}
           */
          _autoSuspend: function() {
            var self = this;
            if (!self.autoSuspend || !self.ctx || typeof self.ctx.suspend === "undefined" || !Howler3.usingWebAudio) {
              return;
            }
            for (var i4 = 0; i4 < self._howls.length; i4++) {
              if (self._howls[i4]._webAudio) {
                for (var j3 = 0; j3 < self._howls[i4]._sounds.length; j3++) {
                  if (!self._howls[i4]._sounds[j3]._paused) {
                    return self;
                  }
                }
              }
            }
            if (self._suspendTimer) {
              clearTimeout(self._suspendTimer);
            }
            self._suspendTimer = setTimeout(function() {
              if (!self.autoSuspend) {
                return;
              }
              self._suspendTimer = null;
              self.state = "suspending";
              var handleSuspension = function() {
                self.state = "suspended";
                if (self._resumeAfterSuspend) {
                  delete self._resumeAfterSuspend;
                  self._autoResume();
                }
              };
              self.ctx.suspend().then(handleSuspension, handleSuspension);
            }, 3e4);
            return self;
          },
          /**
           * Automatically resume the Web Audio AudioContext when a new sound is played.
           * @return {Howler}
           */
          _autoResume: function() {
            var self = this;
            if (!self.ctx || typeof self.ctx.resume === "undefined" || !Howler3.usingWebAudio) {
              return;
            }
            if (self.state === "running" && self.ctx.state !== "interrupted" && self._suspendTimer) {
              clearTimeout(self._suspendTimer);
              self._suspendTimer = null;
            } else if (self.state === "suspended" || self.state === "running" && self.ctx.state === "interrupted") {
              self.ctx.resume().then(function() {
                self.state = "running";
                for (var i4 = 0; i4 < self._howls.length; i4++) {
                  self._howls[i4]._emit("resume");
                }
              });
              if (self._suspendTimer) {
                clearTimeout(self._suspendTimer);
                self._suspendTimer = null;
              }
            } else if (self.state === "suspending") {
              self._resumeAfterSuspend = true;
            }
            return self;
          }
        };
        var Howler3 = new HowlerGlobal2();
        var Howl3 = function(o5) {
          var self = this;
          if (!o5.src || o5.src.length === 0) {
            console.error("An array of source files must be passed with any new Howl.");
            return;
          }
          self.init(o5);
        };
        Howl3.prototype = {
          /**
           * Initialize a new Howl group object.
           * @param  {Object} o Passed in properties for this group.
           * @return {Howl}
           */
          init: function(o5) {
            var self = this;
            if (!Howler3.ctx) {
              setupAudioContext();
            }
            self._autoplay = o5.autoplay || false;
            self._format = typeof o5.format !== "string" ? o5.format : [o5.format];
            self._html5 = o5.html5 || false;
            self._muted = o5.mute || false;
            self._loop = o5.loop || false;
            self._pool = o5.pool || 5;
            self._preload = typeof o5.preload === "boolean" || o5.preload === "metadata" ? o5.preload : true;
            self._rate = o5.rate || 1;
            self._sprite = o5.sprite || {};
            self._src = typeof o5.src !== "string" ? o5.src : [o5.src];
            self._volume = o5.volume !== void 0 ? o5.volume : 1;
            self._xhr = {
              method: o5.xhr && o5.xhr.method ? o5.xhr.method : "GET",
              headers: o5.xhr && o5.xhr.headers ? o5.xhr.headers : null,
              withCredentials: o5.xhr && o5.xhr.withCredentials ? o5.xhr.withCredentials : false
            };
            self._duration = 0;
            self._state = "unloaded";
            self._sounds = [];
            self._endTimers = {};
            self._queue = [];
            self._playLock = false;
            self._onend = o5.onend ? [{ fn: o5.onend }] : [];
            self._onfade = o5.onfade ? [{ fn: o5.onfade }] : [];
            self._onload = o5.onload ? [{ fn: o5.onload }] : [];
            self._onloaderror = o5.onloaderror ? [{ fn: o5.onloaderror }] : [];
            self._onplayerror = o5.onplayerror ? [{ fn: o5.onplayerror }] : [];
            self._onpause = o5.onpause ? [{ fn: o5.onpause }] : [];
            self._onplay = o5.onplay ? [{ fn: o5.onplay }] : [];
            self._onstop = o5.onstop ? [{ fn: o5.onstop }] : [];
            self._onmute = o5.onmute ? [{ fn: o5.onmute }] : [];
            self._onvolume = o5.onvolume ? [{ fn: o5.onvolume }] : [];
            self._onrate = o5.onrate ? [{ fn: o5.onrate }] : [];
            self._onseek = o5.onseek ? [{ fn: o5.onseek }] : [];
            self._onunlock = o5.onunlock ? [{ fn: o5.onunlock }] : [];
            self._onresume = [];
            self._webAudio = Howler3.usingWebAudio && !self._html5;
            if (typeof Howler3.ctx !== "undefined" && Howler3.ctx && Howler3.autoUnlock) {
              Howler3._unlockAudio();
            }
            Howler3._howls.push(self);
            if (self._autoplay) {
              self._queue.push({
                event: "play",
                action: function() {
                  self.play();
                }
              });
            }
            if (self._preload && self._preload !== "none") {
              self.load();
            }
            return self;
          },
          /**
           * Load the audio file.
           * @return {Howler}
           */
          load: function() {
            var self = this;
            var url = null;
            if (Howler3.noAudio) {
              self._emit("loaderror", null, "No audio support.");
              return;
            }
            if (typeof self._src === "string") {
              self._src = [self._src];
            }
            for (var i4 = 0; i4 < self._src.length; i4++) {
              var ext, str;
              if (self._format && self._format[i4]) {
                ext = self._format[i4];
              } else {
                str = self._src[i4];
                if (typeof str !== "string") {
                  self._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                  continue;
                }
                ext = /^data:audio\/([^;,]+);/i.exec(str);
                if (!ext) {
                  ext = /\.([^.]+)$/.exec(str.split("?", 1)[0]);
                }
                if (ext) {
                  ext = ext[1].toLowerCase();
                }
              }
              if (!ext) {
                console.warn('No file extension was found. Consider using the "format" property or specify an extension.');
              }
              if (ext && Howler3.codecs(ext)) {
                url = self._src[i4];
                break;
              }
            }
            if (!url) {
              self._emit("loaderror", null, "No codec support for selected audio sources.");
              return;
            }
            self._src = url;
            self._state = "loading";
            if (window.location.protocol === "https:" && url.slice(0, 5) === "http:") {
              self._html5 = true;
              self._webAudio = false;
            }
            new Sound3(self);
            if (self._webAudio) {
              loadBuffer(self);
            }
            return self;
          },
          /**
           * Play a sound or resume previous playback.
           * @param  {String/Number} sprite   Sprite name for sprite playback or sound id to continue previous.
           * @param  {Boolean} internal Internal Use: true prevents event firing.
           * @return {Number}          Sound ID.
           */
          play: function(sprite, internal) {
            var self = this;
            var id2 = null;
            if (typeof sprite === "number") {
              id2 = sprite;
              sprite = null;
            } else if (typeof sprite === "string" && self._state === "loaded" && !self._sprite[sprite]) {
              return null;
            } else if (typeof sprite === "undefined") {
              sprite = "__default";
              if (!self._playLock) {
                var num = 0;
                for (var i4 = 0; i4 < self._sounds.length; i4++) {
                  if (self._sounds[i4]._paused && !self._sounds[i4]._ended) {
                    num++;
                    id2 = self._sounds[i4]._id;
                  }
                }
                if (num === 1) {
                  sprite = null;
                } else {
                  id2 = null;
                }
              }
            }
            var sound2 = id2 ? self._soundById(id2) : self._inactiveSound();
            if (!sound2) {
              return null;
            }
            if (id2 && !sprite) {
              sprite = sound2._sprite || "__default";
            }
            if (self._state !== "loaded") {
              sound2._sprite = sprite;
              sound2._ended = false;
              var soundId = sound2._id;
              self._queue.push({
                event: "play",
                action: function() {
                  self.play(soundId);
                }
              });
              return soundId;
            }
            if (id2 && !sound2._paused) {
              if (!internal) {
                self._loadQueue("play");
              }
              return sound2._id;
            }
            if (self._webAudio) {
              Howler3._autoResume();
            }
            var seek = Math.max(0, sound2._seek > 0 ? sound2._seek : self._sprite[sprite][0] / 1e3);
            var duration = Math.max(0, (self._sprite[sprite][0] + self._sprite[sprite][1]) / 1e3 - seek);
            var timeout = duration * 1e3 / Math.abs(sound2._rate);
            var start = self._sprite[sprite][0] / 1e3;
            var stop = (self._sprite[sprite][0] + self._sprite[sprite][1]) / 1e3;
            sound2._sprite = sprite;
            sound2._ended = false;
            var setParams = function() {
              sound2._paused = false;
              sound2._seek = seek;
              sound2._start = start;
              sound2._stop = stop;
              sound2._loop = !!(sound2._loop || self._sprite[sprite][2]);
            };
            if (seek >= stop) {
              self._ended(sound2);
              return;
            }
            var node = sound2._node;
            if (self._webAudio) {
              var playWebAudio = function() {
                self._playLock = false;
                setParams();
                self._refreshBuffer(sound2);
                var vol = sound2._muted || self._muted ? 0 : sound2._volume;
                node.gain.setValueAtTime(vol, Howler3.ctx.currentTime);
                sound2._playStart = Howler3.ctx.currentTime;
                if (typeof node.bufferSource.start === "undefined") {
                  sound2._loop ? node.bufferSource.noteGrainOn(0, seek, 86400) : node.bufferSource.noteGrainOn(0, seek, duration);
                } else {
                  sound2._loop ? node.bufferSource.start(0, seek, 86400) : node.bufferSource.start(0, seek, duration);
                }
                if (timeout !== Infinity) {
                  self._endTimers[sound2._id] = setTimeout(self._ended.bind(self, sound2), timeout);
                }
                if (!internal) {
                  setTimeout(function() {
                    self._emit("play", sound2._id);
                    self._loadQueue();
                  }, 0);
                }
              };
              if (Howler3.state === "running" && Howler3.ctx.state !== "interrupted") {
                playWebAudio();
              } else {
                self._playLock = true;
                self.once("resume", playWebAudio);
                self._clearTimer(sound2._id);
              }
            } else {
              var playHtml5 = function() {
                node.currentTime = seek;
                node.muted = sound2._muted || self._muted || Howler3._muted || node.muted;
                node.volume = sound2._volume * Howler3.volume();
                node.playbackRate = sound2._rate;
                try {
                  var play = node.play();
                  if (play && typeof Promise !== "undefined" && (play instanceof Promise || typeof play.then === "function")) {
                    self._playLock = true;
                    setParams();
                    play.then(function() {
                      self._playLock = false;
                      node._unlocked = true;
                      if (!internal) {
                        self._emit("play", sound2._id);
                      } else {
                        self._loadQueue();
                      }
                    }).catch(function() {
                      self._playLock = false;
                      self._emit("playerror", sound2._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                      sound2._ended = true;
                      sound2._paused = true;
                    });
                  } else if (!internal) {
                    self._playLock = false;
                    setParams();
                    self._emit("play", sound2._id);
                  }
                  node.playbackRate = sound2._rate;
                  if (node.paused) {
                    self._emit("playerror", sound2._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                    return;
                  }
                  if (sprite !== "__default" || sound2._loop) {
                    self._endTimers[sound2._id] = setTimeout(self._ended.bind(self, sound2), timeout);
                  } else {
                    self._endTimers[sound2._id] = function() {
                      self._ended(sound2);
                      node.removeEventListener("ended", self._endTimers[sound2._id], false);
                    };
                    node.addEventListener("ended", self._endTimers[sound2._id], false);
                  }
                } catch (err) {
                  self._emit("playerror", sound2._id, err);
                }
              };
              if (node.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA") {
                node.src = self._src;
                node.load();
              }
              var loadedNoReadyState = window && window.ejecta || !node.readyState && Howler3._navigator.isCocoonJS;
              if (node.readyState >= 3 || loadedNoReadyState) {
                playHtml5();
              } else {
                self._playLock = true;
                self._state = "loading";
                var listener = function() {
                  self._state = "loaded";
                  playHtml5();
                  node.removeEventListener(Howler3._canPlayEvent, listener, false);
                };
                node.addEventListener(Howler3._canPlayEvent, listener, false);
                self._clearTimer(sound2._id);
              }
            }
            return sound2._id;
          },
          /**
           * Pause playback and save current position.
           * @param  {Number} id The sound ID (empty to pause all in group).
           * @return {Howl}
           */
          pause: function(id2) {
            var self = this;
            if (self._state !== "loaded" || self._playLock) {
              self._queue.push({
                event: "pause",
                action: function() {
                  self.pause(id2);
                }
              });
              return self;
            }
            var ids2 = self._getSoundIds(id2);
            for (var i4 = 0; i4 < ids2.length; i4++) {
              self._clearTimer(ids2[i4]);
              var sound2 = self._soundById(ids2[i4]);
              if (sound2 && !sound2._paused) {
                sound2._seek = self.seek(ids2[i4]);
                sound2._rateSeek = 0;
                sound2._paused = true;
                self._stopFade(ids2[i4]);
                if (sound2._node) {
                  if (self._webAudio) {
                    if (!sound2._node.bufferSource) {
                      continue;
                    }
                    if (typeof sound2._node.bufferSource.stop === "undefined") {
                      sound2._node.bufferSource.noteOff(0);
                    } else {
                      sound2._node.bufferSource.stop(0);
                    }
                    self._cleanBuffer(sound2._node);
                  } else if (!isNaN(sound2._node.duration) || sound2._node.duration === Infinity) {
                    sound2._node.pause();
                  }
                }
              }
              if (!arguments[1]) {
                self._emit("pause", sound2 ? sound2._id : null);
              }
            }
            return self;
          },
          /**
           * Stop playback and reset to start.
           * @param  {Number} id The sound ID (empty to stop all in group).
           * @param  {Boolean} internal Internal Use: true prevents event firing.
           * @return {Howl}
           */
          stop: function(id2, internal) {
            var self = this;
            if (self._state !== "loaded" || self._playLock) {
              self._queue.push({
                event: "stop",
                action: function() {
                  self.stop(id2);
                }
              });
              return self;
            }
            var ids2 = self._getSoundIds(id2);
            for (var i4 = 0; i4 < ids2.length; i4++) {
              self._clearTimer(ids2[i4]);
              var sound2 = self._soundById(ids2[i4]);
              if (sound2) {
                sound2._seek = sound2._start || 0;
                sound2._rateSeek = 0;
                sound2._paused = true;
                sound2._ended = true;
                self._stopFade(ids2[i4]);
                if (sound2._node) {
                  if (self._webAudio) {
                    if (sound2._node.bufferSource) {
                      if (typeof sound2._node.bufferSource.stop === "undefined") {
                        sound2._node.bufferSource.noteOff(0);
                      } else {
                        sound2._node.bufferSource.stop(0);
                      }
                      self._cleanBuffer(sound2._node);
                    }
                  } else if (!isNaN(sound2._node.duration) || sound2._node.duration === Infinity) {
                    sound2._node.currentTime = sound2._start || 0;
                    sound2._node.pause();
                    if (sound2._node.duration === Infinity) {
                      self._clearSound(sound2._node);
                    }
                  }
                }
                if (!internal) {
                  self._emit("stop", sound2._id);
                }
              }
            }
            return self;
          },
          /**
           * Mute/unmute a single sound or all sounds in this Howl group.
           * @param  {Boolean} muted Set to true to mute and false to unmute.
           * @param  {Number} id    The sound ID to update (omit to mute/unmute all).
           * @return {Howl}
           */
          mute: function(muted, id2) {
            var self = this;
            if (self._state !== "loaded" || self._playLock) {
              self._queue.push({
                event: "mute",
                action: function() {
                  self.mute(muted, id2);
                }
              });
              return self;
            }
            if (typeof id2 === "undefined") {
              if (typeof muted === "boolean") {
                self._muted = muted;
              } else {
                return self._muted;
              }
            }
            var ids2 = self._getSoundIds(id2);
            for (var i4 = 0; i4 < ids2.length; i4++) {
              var sound2 = self._soundById(ids2[i4]);
              if (sound2) {
                sound2._muted = muted;
                if (sound2._interval) {
                  self._stopFade(sound2._id);
                }
                if (self._webAudio && sound2._node) {
                  sound2._node.gain.setValueAtTime(muted ? 0 : sound2._volume, Howler3.ctx.currentTime);
                } else if (sound2._node) {
                  sound2._node.muted = Howler3._muted ? true : muted;
                }
                self._emit("mute", sound2._id);
              }
            }
            return self;
          },
          /**
           * Get/set the volume of this sound or of the Howl group. This method can optionally take 0, 1 or 2 arguments.
           *   volume() -> Returns the group's volume value.
           *   volume(id) -> Returns the sound id's current volume.
           *   volume(vol) -> Sets the volume of all sounds in this Howl group.
           *   volume(vol, id) -> Sets the volume of passed sound id.
           * @return {Howl/Number} Returns self or current volume.
           */
          volume: function() {
            var self = this;
            var args = arguments;
            var vol, id2;
            if (args.length === 0) {
              return self._volume;
            } else if (args.length === 1 || args.length === 2 && typeof args[1] === "undefined") {
              var ids2 = self._getSoundIds();
              var index = ids2.indexOf(args[0]);
              if (index >= 0) {
                id2 = parseInt(args[0], 10);
              } else {
                vol = parseFloat(args[0]);
              }
            } else if (args.length >= 2) {
              vol = parseFloat(args[0]);
              id2 = parseInt(args[1], 10);
            }
            var sound2;
            if (typeof vol !== "undefined" && vol >= 0 && vol <= 1) {
              if (self._state !== "loaded" || self._playLock) {
                self._queue.push({
                  event: "volume",
                  action: function() {
                    self.volume.apply(self, args);
                  }
                });
                return self;
              }
              if (typeof id2 === "undefined") {
                self._volume = vol;
              }
              id2 = self._getSoundIds(id2);
              for (var i4 = 0; i4 < id2.length; i4++) {
                sound2 = self._soundById(id2[i4]);
                if (sound2) {
                  sound2._volume = vol;
                  if (!args[2]) {
                    self._stopFade(id2[i4]);
                  }
                  if (self._webAudio && sound2._node && !sound2._muted) {
                    sound2._node.gain.setValueAtTime(vol, Howler3.ctx.currentTime);
                  } else if (sound2._node && !sound2._muted) {
                    sound2._node.volume = vol * Howler3.volume();
                  }
                  self._emit("volume", sound2._id);
                }
              }
            } else {
              sound2 = id2 ? self._soundById(id2) : self._sounds[0];
              return sound2 ? sound2._volume : 0;
            }
            return self;
          },
          /**
           * Fade a currently playing sound between two volumes (if no id is passed, all sounds will fade).
           * @param  {Number} from The value to fade from (0.0 to 1.0).
           * @param  {Number} to   The volume to fade to (0.0 to 1.0).
           * @param  {Number} len  Time in milliseconds to fade.
           * @param  {Number} id   The sound id (omit to fade all sounds).
           * @return {Howl}
           */
          fade: function(from, to, len, id2) {
            var self = this;
            if (self._state !== "loaded" || self._playLock) {
              self._queue.push({
                event: "fade",
                action: function() {
                  self.fade(from, to, len, id2);
                }
              });
              return self;
            }
            from = Math.min(Math.max(0, parseFloat(from)), 1);
            to = Math.min(Math.max(0, parseFloat(to)), 1);
            len = parseFloat(len);
            self.volume(from, id2);
            var ids2 = self._getSoundIds(id2);
            for (var i4 = 0; i4 < ids2.length; i4++) {
              var sound2 = self._soundById(ids2[i4]);
              if (sound2) {
                if (!id2) {
                  self._stopFade(ids2[i4]);
                }
                if (self._webAudio && !sound2._muted) {
                  var currentTime = Howler3.ctx.currentTime;
                  var end = currentTime + len / 1e3;
                  sound2._volume = from;
                  sound2._node.gain.setValueAtTime(from, currentTime);
                  sound2._node.gain.linearRampToValueAtTime(to, end);
                }
                self._startFadeInterval(sound2, from, to, len, ids2[i4], typeof id2 === "undefined");
              }
            }
            return self;
          },
          /**
           * Starts the internal interval to fade a sound.
           * @param  {Object} sound Reference to sound to fade.
           * @param  {Number} from The value to fade from (0.0 to 1.0).
           * @param  {Number} to   The volume to fade to (0.0 to 1.0).
           * @param  {Number} len  Time in milliseconds to fade.
           * @param  {Number} id   The sound id to fade.
           * @param  {Boolean} isGroup   If true, set the volume on the group.
           */
          _startFadeInterval: function(sound2, from, to, len, id2, isGroup) {
            var self = this;
            var vol = from;
            var diff = to - from;
            var steps = Math.abs(diff / 0.01);
            var stepLen = Math.max(4, steps > 0 ? len / steps : len);
            var lastTick = Date.now();
            sound2._fadeTo = to;
            sound2._interval = setInterval(function() {
              var tick = (Date.now() - lastTick) / len;
              lastTick = Date.now();
              vol += diff * tick;
              vol = Math.round(vol * 100) / 100;
              if (diff < 0) {
                vol = Math.max(to, vol);
              } else {
                vol = Math.min(to, vol);
              }
              if (self._webAudio) {
                sound2._volume = vol;
              } else {
                self.volume(vol, sound2._id, true);
              }
              if (isGroup) {
                self._volume = vol;
              }
              if (to < from && vol <= to || to > from && vol >= to) {
                clearInterval(sound2._interval);
                sound2._interval = null;
                sound2._fadeTo = null;
                self.volume(to, sound2._id);
                self._emit("fade", sound2._id);
              }
            }, stepLen);
          },
          /**
           * Internal method that stops the currently playing fade when
           * a new fade starts, volume is changed or the sound is stopped.
           * @param  {Number} id The sound id.
           * @return {Howl}
           */
          _stopFade: function(id2) {
            var self = this;
            var sound2 = self._soundById(id2);
            if (sound2 && sound2._interval) {
              if (self._webAudio) {
                sound2._node.gain.cancelScheduledValues(Howler3.ctx.currentTime);
              }
              clearInterval(sound2._interval);
              sound2._interval = null;
              self.volume(sound2._fadeTo, id2);
              sound2._fadeTo = null;
              self._emit("fade", id2);
            }
            return self;
          },
          /**
           * Get/set the loop parameter on a sound. This method can optionally take 0, 1 or 2 arguments.
           *   loop() -> Returns the group's loop value.
           *   loop(id) -> Returns the sound id's loop value.
           *   loop(loop) -> Sets the loop value for all sounds in this Howl group.
           *   loop(loop, id) -> Sets the loop value of passed sound id.
           * @return {Howl/Boolean} Returns self or current loop value.
           */
          loop: function() {
            var self = this;
            var args = arguments;
            var loop, id2, sound2;
            if (args.length === 0) {
              return self._loop;
            } else if (args.length === 1) {
              if (typeof args[0] === "boolean") {
                loop = args[0];
                self._loop = loop;
              } else {
                sound2 = self._soundById(parseInt(args[0], 10));
                return sound2 ? sound2._loop : false;
              }
            } else if (args.length === 2) {
              loop = args[0];
              id2 = parseInt(args[1], 10);
            }
            var ids2 = self._getSoundIds(id2);
            for (var i4 = 0; i4 < ids2.length; i4++) {
              sound2 = self._soundById(ids2[i4]);
              if (sound2) {
                sound2._loop = loop;
                if (self._webAudio && sound2._node && sound2._node.bufferSource) {
                  sound2._node.bufferSource.loop = loop;
                  if (loop) {
                    sound2._node.bufferSource.loopStart = sound2._start || 0;
                    sound2._node.bufferSource.loopEnd = sound2._stop;
                    if (self.playing(ids2[i4])) {
                      self.pause(ids2[i4], true);
                      self.play(ids2[i4], true);
                    }
                  }
                }
              }
            }
            return self;
          },
          /**
           * Get/set the playback rate of a sound. This method can optionally take 0, 1 or 2 arguments.
           *   rate() -> Returns the first sound node's current playback rate.
           *   rate(id) -> Returns the sound id's current playback rate.
           *   rate(rate) -> Sets the playback rate of all sounds in this Howl group.
           *   rate(rate, id) -> Sets the playback rate of passed sound id.
           * @return {Howl/Number} Returns self or the current playback rate.
           */
          rate: function() {
            var self = this;
            var args = arguments;
            var rate, id2;
            if (args.length === 0) {
              id2 = self._sounds[0]._id;
            } else if (args.length === 1) {
              var ids2 = self._getSoundIds();
              var index = ids2.indexOf(args[0]);
              if (index >= 0) {
                id2 = parseInt(args[0], 10);
              } else {
                rate = parseFloat(args[0]);
              }
            } else if (args.length === 2) {
              rate = parseFloat(args[0]);
              id2 = parseInt(args[1], 10);
            }
            var sound2;
            if (typeof rate === "number") {
              if (self._state !== "loaded" || self._playLock) {
                self._queue.push({
                  event: "rate",
                  action: function() {
                    self.rate.apply(self, args);
                  }
                });
                return self;
              }
              if (typeof id2 === "undefined") {
                self._rate = rate;
              }
              id2 = self._getSoundIds(id2);
              for (var i4 = 0; i4 < id2.length; i4++) {
                sound2 = self._soundById(id2[i4]);
                if (sound2) {
                  if (self.playing(id2[i4])) {
                    sound2._rateSeek = self.seek(id2[i4]);
                    sound2._playStart = self._webAudio ? Howler3.ctx.currentTime : sound2._playStart;
                  }
                  sound2._rate = rate;
                  if (self._webAudio && sound2._node && sound2._node.bufferSource) {
                    sound2._node.bufferSource.playbackRate.setValueAtTime(rate, Howler3.ctx.currentTime);
                  } else if (sound2._node) {
                    sound2._node.playbackRate = rate;
                  }
                  var seek = self.seek(id2[i4]);
                  var duration = (self._sprite[sound2._sprite][0] + self._sprite[sound2._sprite][1]) / 1e3 - seek;
                  var timeout = duration * 1e3 / Math.abs(sound2._rate);
                  if (self._endTimers[id2[i4]] || !sound2._paused) {
                    self._clearTimer(id2[i4]);
                    self._endTimers[id2[i4]] = setTimeout(self._ended.bind(self, sound2), timeout);
                  }
                  self._emit("rate", sound2._id);
                }
              }
            } else {
              sound2 = self._soundById(id2);
              return sound2 ? sound2._rate : self._rate;
            }
            return self;
          },
          /**
           * Get/set the seek position of a sound. This method can optionally take 0, 1 or 2 arguments.
           *   seek() -> Returns the first sound node's current seek position.
           *   seek(id) -> Returns the sound id's current seek position.
           *   seek(seek) -> Sets the seek position of the first sound node.
           *   seek(seek, id) -> Sets the seek position of passed sound id.
           * @return {Howl/Number} Returns self or the current seek position.
           */
          seek: function() {
            var self = this;
            var args = arguments;
            var seek, id2;
            if (args.length === 0) {
              if (self._sounds.length) {
                id2 = self._sounds[0]._id;
              }
            } else if (args.length === 1) {
              var ids2 = self._getSoundIds();
              var index = ids2.indexOf(args[0]);
              if (index >= 0) {
                id2 = parseInt(args[0], 10);
              } else if (self._sounds.length) {
                id2 = self._sounds[0]._id;
                seek = parseFloat(args[0]);
              }
            } else if (args.length === 2) {
              seek = parseFloat(args[0]);
              id2 = parseInt(args[1], 10);
            }
            if (typeof id2 === "undefined") {
              return 0;
            }
            if (typeof seek === "number" && (self._state !== "loaded" || self._playLock)) {
              self._queue.push({
                event: "seek",
                action: function() {
                  self.seek.apply(self, args);
                }
              });
              return self;
            }
            var sound2 = self._soundById(id2);
            if (sound2) {
              if (typeof seek === "number" && seek >= 0) {
                var playing = self.playing(id2);
                if (playing) {
                  self.pause(id2, true);
                }
                sound2._seek = seek;
                sound2._ended = false;
                self._clearTimer(id2);
                if (!self._webAudio && sound2._node && !isNaN(sound2._node.duration)) {
                  sound2._node.currentTime = seek;
                }
                var seekAndEmit = function() {
                  if (playing) {
                    self.play(id2, true);
                  }
                  self._emit("seek", id2);
                };
                if (playing && !self._webAudio) {
                  var emitSeek = function() {
                    if (!self._playLock) {
                      seekAndEmit();
                    } else {
                      setTimeout(emitSeek, 0);
                    }
                  };
                  setTimeout(emitSeek, 0);
                } else {
                  seekAndEmit();
                }
              } else {
                if (self._webAudio) {
                  var realTime = self.playing(id2) ? Howler3.ctx.currentTime - sound2._playStart : 0;
                  var rateSeek = sound2._rateSeek ? sound2._rateSeek - sound2._seek : 0;
                  return sound2._seek + (rateSeek + realTime * Math.abs(sound2._rate));
                } else {
                  return sound2._node.currentTime;
                }
              }
            }
            return self;
          },
          /**
           * Check if a specific sound is currently playing or not (if id is provided), or check if at least one of the sounds in the group is playing or not.
           * @param  {Number}  id The sound id to check. If none is passed, the whole sound group is checked.
           * @return {Boolean} True if playing and false if not.
           */
          playing: function(id2) {
            var self = this;
            if (typeof id2 === "number") {
              var sound2 = self._soundById(id2);
              return sound2 ? !sound2._paused : false;
            }
            for (var i4 = 0; i4 < self._sounds.length; i4++) {
              if (!self._sounds[i4]._paused) {
                return true;
              }
            }
            return false;
          },
          /**
           * Get the duration of this sound. Passing a sound id will return the sprite duration.
           * @param  {Number} id The sound id to check. If none is passed, return full source duration.
           * @return {Number} Audio duration in seconds.
           */
          duration: function(id2) {
            var self = this;
            var duration = self._duration;
            var sound2 = self._soundById(id2);
            if (sound2) {
              duration = self._sprite[sound2._sprite][1] / 1e3;
            }
            return duration;
          },
          /**
           * Returns the current loaded state of this Howl.
           * @return {String} 'unloaded', 'loading', 'loaded'
           */
          state: function() {
            return this._state;
          },
          /**
           * Unload and destroy the current Howl object.
           * This will immediately stop all sound instances attached to this group.
           */
          unload: function() {
            var self = this;
            var sounds = self._sounds;
            for (var i4 = 0; i4 < sounds.length; i4++) {
              if (!sounds[i4]._paused) {
                self.stop(sounds[i4]._id);
              }
              if (!self._webAudio) {
                self._clearSound(sounds[i4]._node);
                sounds[i4]._node.removeEventListener("error", sounds[i4]._errorFn, false);
                sounds[i4]._node.removeEventListener(Howler3._canPlayEvent, sounds[i4]._loadFn, false);
                sounds[i4]._node.removeEventListener("ended", sounds[i4]._endFn, false);
                Howler3._releaseHtml5Audio(sounds[i4]._node);
              }
              delete sounds[i4]._node;
              self._clearTimer(sounds[i4]._id);
            }
            var index = Howler3._howls.indexOf(self);
            if (index >= 0) {
              Howler3._howls.splice(index, 1);
            }
            var remCache = true;
            for (i4 = 0; i4 < Howler3._howls.length; i4++) {
              if (Howler3._howls[i4]._src === self._src || self._src.indexOf(Howler3._howls[i4]._src) >= 0) {
                remCache = false;
                break;
              }
            }
            if (cache && remCache) {
              delete cache[self._src];
            }
            Howler3.noAudio = false;
            self._state = "unloaded";
            self._sounds = [];
            self = null;
            return null;
          },
          /**
           * Listen to a custom event.
           * @param  {String}   event Event name.
           * @param  {Function} fn    Listener to call.
           * @param  {Number}   id    (optional) Only listen to events for this sound.
           * @param  {Number}   once  (INTERNAL) Marks event to fire only once.
           * @return {Howl}
           */
          on: function(event, fn, id2, once) {
            var self = this;
            var events = self["_on" + event];
            if (typeof fn === "function") {
              events.push(once ? { id: id2, fn, once } : { id: id2, fn });
            }
            return self;
          },
          /**
           * Remove a custom event. Call without parameters to remove all events.
           * @param  {String}   event Event name.
           * @param  {Function} fn    Listener to remove. Leave empty to remove all.
           * @param  {Number}   id    (optional) Only remove events for this sound.
           * @return {Howl}
           */
          off: function(event, fn, id2) {
            var self = this;
            var events = self["_on" + event];
            var i4 = 0;
            if (typeof fn === "number") {
              id2 = fn;
              fn = null;
            }
            if (fn || id2) {
              for (i4 = 0; i4 < events.length; i4++) {
                var isId = id2 === events[i4].id;
                if (fn === events[i4].fn && isId || !fn && isId) {
                  events.splice(i4, 1);
                  break;
                }
              }
            } else if (event) {
              self["_on" + event] = [];
            } else {
              var keys = Object.keys(self);
              for (i4 = 0; i4 < keys.length; i4++) {
                if (keys[i4].indexOf("_on") === 0 && Array.isArray(self[keys[i4]])) {
                  self[keys[i4]] = [];
                }
              }
            }
            return self;
          },
          /**
           * Listen to a custom event and remove it once fired.
           * @param  {String}   event Event name.
           * @param  {Function} fn    Listener to call.
           * @param  {Number}   id    (optional) Only listen to events for this sound.
           * @return {Howl}
           */
          once: function(event, fn, id2) {
            var self = this;
            self.on(event, fn, id2, 1);
            return self;
          },
          /**
           * Emit all events of a specific type and pass the sound id.
           * @param  {String} event Event name.
           * @param  {Number} id    Sound ID.
           * @param  {Number} msg   Message to go with event.
           * @return {Howl}
           */
          _emit: function(event, id2, msg) {
            var self = this;
            var events = self["_on" + event];
            for (var i4 = events.length - 1; i4 >= 0; i4--) {
              if (!events[i4].id || events[i4].id === id2 || event === "load") {
                setTimeout(function(fn) {
                  fn.call(this, id2, msg);
                }.bind(self, events[i4].fn), 0);
                if (events[i4].once) {
                  self.off(event, events[i4].fn, events[i4].id);
                }
              }
            }
            self._loadQueue(event);
            return self;
          },
          /**
           * Queue of actions initiated before the sound has loaded.
           * These will be called in sequence, with the next only firing
           * after the previous has finished executing (even if async like play).
           * @return {Howl}
           */
          _loadQueue: function(event) {
            var self = this;
            if (self._queue.length > 0) {
              var task = self._queue[0];
              if (task.event === event) {
                self._queue.shift();
                self._loadQueue();
              }
              if (!event) {
                task.action();
              }
            }
            return self;
          },
          /**
           * Fired when playback ends at the end of the duration.
           * @param  {Sound} sound The sound object to work with.
           * @return {Howl}
           */
          _ended: function(sound2) {
            var self = this;
            var sprite = sound2._sprite;
            if (!self._webAudio && sound2._node && !sound2._node.paused && !sound2._node.ended && sound2._node.currentTime < sound2._stop) {
              setTimeout(self._ended.bind(self, sound2), 100);
              return self;
            }
            var loop = !!(sound2._loop || self._sprite[sprite][2]);
            self._emit("end", sound2._id);
            if (!self._webAudio && loop) {
              self.stop(sound2._id, true).play(sound2._id);
            }
            if (self._webAudio && loop) {
              self._emit("play", sound2._id);
              sound2._seek = sound2._start || 0;
              sound2._rateSeek = 0;
              sound2._playStart = Howler3.ctx.currentTime;
              var timeout = (sound2._stop - sound2._start) * 1e3 / Math.abs(sound2._rate);
              self._endTimers[sound2._id] = setTimeout(self._ended.bind(self, sound2), timeout);
            }
            if (self._webAudio && !loop) {
              sound2._paused = true;
              sound2._ended = true;
              sound2._seek = sound2._start || 0;
              sound2._rateSeek = 0;
              self._clearTimer(sound2._id);
              self._cleanBuffer(sound2._node);
              Howler3._autoSuspend();
            }
            if (!self._webAudio && !loop) {
              self.stop(sound2._id, true);
            }
            return self;
          },
          /**
           * Clear the end timer for a sound playback.
           * @param  {Number} id The sound ID.
           * @return {Howl}
           */
          _clearTimer: function(id2) {
            var self = this;
            if (self._endTimers[id2]) {
              if (typeof self._endTimers[id2] !== "function") {
                clearTimeout(self._endTimers[id2]);
              } else {
                var sound2 = self._soundById(id2);
                if (sound2 && sound2._node) {
                  sound2._node.removeEventListener("ended", self._endTimers[id2], false);
                }
              }
              delete self._endTimers[id2];
            }
            return self;
          },
          /**
           * Return the sound identified by this ID, or return null.
           * @param  {Number} id Sound ID
           * @return {Object}    Sound object or null.
           */
          _soundById: function(id2) {
            var self = this;
            for (var i4 = 0; i4 < self._sounds.length; i4++) {
              if (id2 === self._sounds[i4]._id) {
                return self._sounds[i4];
              }
            }
            return null;
          },
          /**
           * Return an inactive sound from the pool or create a new one.
           * @return {Sound} Sound playback object.
           */
          _inactiveSound: function() {
            var self = this;
            self._drain();
            for (var i4 = 0; i4 < self._sounds.length; i4++) {
              if (self._sounds[i4]._ended) {
                return self._sounds[i4].reset();
              }
            }
            return new Sound3(self);
          },
          /**
           * Drain excess inactive sounds from the pool.
           */
          _drain: function() {
            var self = this;
            var limit = self._pool;
            var cnt = 0;
            var i4 = 0;
            if (self._sounds.length < limit) {
              return;
            }
            for (i4 = 0; i4 < self._sounds.length; i4++) {
              if (self._sounds[i4]._ended) {
                cnt++;
              }
            }
            for (i4 = self._sounds.length - 1; i4 >= 0; i4--) {
              if (cnt <= limit) {
                return;
              }
              if (self._sounds[i4]._ended) {
                if (self._webAudio && self._sounds[i4]._node) {
                  self._sounds[i4]._node.disconnect(0);
                }
                self._sounds.splice(i4, 1);
                cnt--;
              }
            }
          },
          /**
           * Get all ID's from the sounds pool.
           * @param  {Number} id Only return one ID if one is passed.
           * @return {Array}    Array of IDs.
           */
          _getSoundIds: function(id2) {
            var self = this;
            if (typeof id2 === "undefined") {
              var ids2 = [];
              for (var i4 = 0; i4 < self._sounds.length; i4++) {
                ids2.push(self._sounds[i4]._id);
              }
              return ids2;
            } else {
              return [id2];
            }
          },
          /**
           * Load the sound back into the buffer source.
           * @param  {Sound} sound The sound object to work with.
           * @return {Howl}
           */
          _refreshBuffer: function(sound2) {
            var self = this;
            sound2._node.bufferSource = Howler3.ctx.createBufferSource();
            sound2._node.bufferSource.buffer = cache[self._src];
            if (sound2._panner) {
              sound2._node.bufferSource.connect(sound2._panner);
            } else {
              sound2._node.bufferSource.connect(sound2._node);
            }
            sound2._node.bufferSource.loop = sound2._loop;
            if (sound2._loop) {
              sound2._node.bufferSource.loopStart = sound2._start || 0;
              sound2._node.bufferSource.loopEnd = sound2._stop || 0;
            }
            sound2._node.bufferSource.playbackRate.setValueAtTime(sound2._rate, Howler3.ctx.currentTime);
            return self;
          },
          /**
           * Prevent memory leaks by cleaning up the buffer source after playback.
           * @param  {Object} node Sound's audio node containing the buffer source.
           * @return {Howl}
           */
          _cleanBuffer: function(node) {
            var self = this;
            var isIOS = Howler3._navigator && Howler3._navigator.vendor.indexOf("Apple") >= 0;
            if (Howler3._scratchBuffer && node.bufferSource) {
              node.bufferSource.onended = null;
              node.bufferSource.disconnect(0);
              if (isIOS) {
                try {
                  node.bufferSource.buffer = Howler3._scratchBuffer;
                } catch (e4) {
                }
              }
            }
            node.bufferSource = null;
            return self;
          },
          /**
           * Set the source to a 0-second silence to stop any downloading (except in IE).
           * @param  {Object} node Audio node to clear.
           */
          _clearSound: function(node) {
            var checkIE = /MSIE |Trident\//.test(Howler3._navigator && Howler3._navigator.userAgent);
            if (!checkIE) {
              node.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
            }
          }
        };
        var Sound3 = function(howl) {
          this._parent = howl;
          this.init();
        };
        Sound3.prototype = {
          /**
           * Initialize a new Sound object.
           * @return {Sound}
           */
          init: function() {
            var self = this;
            var parent = self._parent;
            self._muted = parent._muted;
            self._loop = parent._loop;
            self._volume = parent._volume;
            self._rate = parent._rate;
            self._seek = 0;
            self._paused = true;
            self._ended = true;
            self._sprite = "__default";
            self._id = ++Howler3._counter;
            parent._sounds.push(self);
            self.create();
            return self;
          },
          /**
           * Create and setup a new sound object, whether HTML5 Audio or Web Audio.
           * @return {Sound}
           */
          create: function() {
            var self = this;
            var parent = self._parent;
            var volume = Howler3._muted || self._muted || self._parent._muted ? 0 : self._volume;
            if (parent._webAudio) {
              self._node = typeof Howler3.ctx.createGain === "undefined" ? Howler3.ctx.createGainNode() : Howler3.ctx.createGain();
              self._node.gain.setValueAtTime(volume, Howler3.ctx.currentTime);
              self._node.paused = true;
              self._node.connect(Howler3.masterGain);
            } else if (!Howler3.noAudio) {
              self._node = Howler3._obtainHtml5Audio();
              self._errorFn = self._errorListener.bind(self);
              self._node.addEventListener("error", self._errorFn, false);
              self._loadFn = self._loadListener.bind(self);
              self._node.addEventListener(Howler3._canPlayEvent, self._loadFn, false);
              self._endFn = self._endListener.bind(self);
              self._node.addEventListener("ended", self._endFn, false);
              self._node.src = parent._src;
              self._node.preload = parent._preload === true ? "auto" : parent._preload;
              self._node.volume = volume * Howler3.volume();
              self._node.load();
            }
            return self;
          },
          /**
           * Reset the parameters of this sound to the original state (for recycle).
           * @return {Sound}
           */
          reset: function() {
            var self = this;
            var parent = self._parent;
            self._muted = parent._muted;
            self._loop = parent._loop;
            self._volume = parent._volume;
            self._rate = parent._rate;
            self._seek = 0;
            self._rateSeek = 0;
            self._paused = true;
            self._ended = true;
            self._sprite = "__default";
            self._id = ++Howler3._counter;
            return self;
          },
          /**
           * HTML5 Audio error listener callback.
           */
          _errorListener: function() {
            var self = this;
            self._parent._emit("loaderror", self._id, self._node.error ? self._node.error.code : 0);
            self._node.removeEventListener("error", self._errorFn, false);
          },
          /**
           * HTML5 Audio canplaythrough listener callback.
           */
          _loadListener: function() {
            var self = this;
            var parent = self._parent;
            parent._duration = Math.ceil(self._node.duration * 10) / 10;
            if (Object.keys(parent._sprite).length === 0) {
              parent._sprite = { __default: [0, parent._duration * 1e3] };
            }
            if (parent._state !== "loaded") {
              parent._state = "loaded";
              parent._emit("load");
              parent._loadQueue();
            }
            self._node.removeEventListener(Howler3._canPlayEvent, self._loadFn, false);
          },
          /**
           * HTML5 Audio ended listener callback.
           */
          _endListener: function() {
            var self = this;
            var parent = self._parent;
            if (parent._duration === Infinity) {
              parent._duration = Math.ceil(self._node.duration * 10) / 10;
              if (parent._sprite.__default[1] === Infinity) {
                parent._sprite.__default[1] = parent._duration * 1e3;
              }
              parent._ended(self);
            }
            self._node.removeEventListener("ended", self._endFn, false);
          }
        };
        var cache = {};
        var loadBuffer = function(self) {
          var url = self._src;
          if (cache[url]) {
            self._duration = cache[url].duration;
            loadSound(self);
            return;
          }
          if (/^data:[^;]+;base64,/.test(url)) {
            var data2 = atob(url.split(",")[1]);
            var dataView = new Uint8Array(data2.length);
            for (var i4 = 0; i4 < data2.length; ++i4) {
              dataView[i4] = data2.charCodeAt(i4);
            }
            decodeAudioData(dataView.buffer, self);
          } else {
            var xhr = new XMLHttpRequest();
            xhr.open(self._xhr.method, url, true);
            xhr.withCredentials = self._xhr.withCredentials;
            xhr.responseType = "arraybuffer";
            if (self._xhr.headers) {
              Object.keys(self._xhr.headers).forEach(function(key) {
                xhr.setRequestHeader(key, self._xhr.headers[key]);
              });
            }
            xhr.onload = function() {
              var code = (xhr.status + "")[0];
              if (code !== "0" && code !== "2" && code !== "3") {
                self._emit("loaderror", null, "Failed loading audio file with status: " + xhr.status + ".");
                return;
              }
              decodeAudioData(xhr.response, self);
            };
            xhr.onerror = function() {
              if (self._webAudio) {
                self._html5 = true;
                self._webAudio = false;
                self._sounds = [];
                delete cache[url];
                self.load();
              }
            };
            safeXhrSend(xhr);
          }
        };
        var safeXhrSend = function(xhr) {
          try {
            xhr.send();
          } catch (e4) {
            xhr.onerror();
          }
        };
        var decodeAudioData = function(arraybuffer, self) {
          var error = function() {
            self._emit("loaderror", null, "Decoding audio data failed.");
          };
          var success = function(buffer) {
            if (buffer && self._sounds.length > 0) {
              cache[self._src] = buffer;
              loadSound(self, buffer);
            } else {
              error();
            }
          };
          if (typeof Promise !== "undefined" && Howler3.ctx.decodeAudioData.length === 1) {
            Howler3.ctx.decodeAudioData(arraybuffer).then(success).catch(error);
          } else {
            Howler3.ctx.decodeAudioData(arraybuffer, success, error);
          }
        };
        var loadSound = function(self, buffer) {
          if (buffer && !self._duration) {
            self._duration = buffer.duration;
          }
          if (Object.keys(self._sprite).length === 0) {
            self._sprite = { __default: [0, self._duration * 1e3] };
          }
          if (self._state !== "loaded") {
            self._state = "loaded";
            self._emit("load");
            self._loadQueue();
          }
        };
        var setupAudioContext = function() {
          if (!Howler3.usingWebAudio) {
            return;
          }
          try {
            if (typeof AudioContext !== "undefined") {
              Howler3.ctx = new AudioContext();
            } else if (typeof webkitAudioContext !== "undefined") {
              Howler3.ctx = new webkitAudioContext();
            } else {
              Howler3.usingWebAudio = false;
            }
          } catch (e4) {
            Howler3.usingWebAudio = false;
          }
          if (!Howler3.ctx) {
            Howler3.usingWebAudio = false;
          }
          var iOS = /iP(hone|od|ad)/.test(Howler3._navigator && Howler3._navigator.platform);
          var appVersion = Howler3._navigator && Howler3._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
          var version2 = appVersion ? parseInt(appVersion[1], 10) : null;
          if (iOS && version2 && version2 < 9) {
            var safari = /safari/.test(Howler3._navigator && Howler3._navigator.userAgent.toLowerCase());
            if (Howler3._navigator && !safari) {
              Howler3.usingWebAudio = false;
            }
          }
          if (Howler3.usingWebAudio) {
            Howler3.masterGain = typeof Howler3.ctx.createGain === "undefined" ? Howler3.ctx.createGainNode() : Howler3.ctx.createGain();
            Howler3.masterGain.gain.setValueAtTime(Howler3._muted ? 0 : Howler3._volume, Howler3.ctx.currentTime);
            Howler3.masterGain.connect(Howler3.ctx.destination);
          }
          Howler3._setup();
        };
        if (typeof define === "function" && define.amd) {
          define([], function() {
            return {
              Howler: Howler3,
              Howl: Howl3
            };
          });
        }
        if (typeof exports !== "undefined") {
          exports.Howler = Howler3;
          exports.Howl = Howl3;
        }
        if (typeof global !== "undefined") {
          global.HowlerGlobal = HowlerGlobal2;
          global.Howler = Howler3;
          global.Howl = Howl3;
          global.Sound = Sound3;
        } else if (typeof window !== "undefined") {
          window.HowlerGlobal = HowlerGlobal2;
          window.Howler = Howler3;
          window.Howl = Howl3;
          window.Sound = Sound3;
        }
      })();
      (function() {
        "use strict";
        HowlerGlobal.prototype._pos = [0, 0, 0];
        HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0];
        HowlerGlobal.prototype.stereo = function(pan) {
          var self = this;
          if (!self.ctx || !self.ctx.listener) {
            return self;
          }
          for (var i4 = self._howls.length - 1; i4 >= 0; i4--) {
            self._howls[i4].stereo(pan);
          }
          return self;
        };
        HowlerGlobal.prototype.pos = function(x3, y4, z2) {
          var self = this;
          if (!self.ctx || !self.ctx.listener) {
            return self;
          }
          y4 = typeof y4 !== "number" ? self._pos[1] : y4;
          z2 = typeof z2 !== "number" ? self._pos[2] : z2;
          if (typeof x3 === "number") {
            self._pos = [x3, y4, z2];
            if (typeof self.ctx.listener.positionX !== "undefined") {
              self.ctx.listener.positionX.setTargetAtTime(self._pos[0], Howler.ctx.currentTime, 0.1);
              self.ctx.listener.positionY.setTargetAtTime(self._pos[1], Howler.ctx.currentTime, 0.1);
              self.ctx.listener.positionZ.setTargetAtTime(self._pos[2], Howler.ctx.currentTime, 0.1);
            } else {
              self.ctx.listener.setPosition(self._pos[0], self._pos[1], self._pos[2]);
            }
          } else {
            return self._pos;
          }
          return self;
        };
        HowlerGlobal.prototype.orientation = function(x3, y4, z2, xUp, yUp, zUp) {
          var self = this;
          if (!self.ctx || !self.ctx.listener) {
            return self;
          }
          var or = self._orientation;
          y4 = typeof y4 !== "number" ? or[1] : y4;
          z2 = typeof z2 !== "number" ? or[2] : z2;
          xUp = typeof xUp !== "number" ? or[3] : xUp;
          yUp = typeof yUp !== "number" ? or[4] : yUp;
          zUp = typeof zUp !== "number" ? or[5] : zUp;
          if (typeof x3 === "number") {
            self._orientation = [x3, y4, z2, xUp, yUp, zUp];
            if (typeof self.ctx.listener.forwardX !== "undefined") {
              self.ctx.listener.forwardX.setTargetAtTime(x3, Howler.ctx.currentTime, 0.1);
              self.ctx.listener.forwardY.setTargetAtTime(y4, Howler.ctx.currentTime, 0.1);
              self.ctx.listener.forwardZ.setTargetAtTime(z2, Howler.ctx.currentTime, 0.1);
              self.ctx.listener.upX.setTargetAtTime(xUp, Howler.ctx.currentTime, 0.1);
              self.ctx.listener.upY.setTargetAtTime(yUp, Howler.ctx.currentTime, 0.1);
              self.ctx.listener.upZ.setTargetAtTime(zUp, Howler.ctx.currentTime, 0.1);
            } else {
              self.ctx.listener.setOrientation(x3, y4, z2, xUp, yUp, zUp);
            }
          } else {
            return or;
          }
          return self;
        };
        Howl.prototype.init = function(_super) {
          return function(o5) {
            var self = this;
            self._orientation = o5.orientation || [1, 0, 0];
            self._stereo = o5.stereo || null;
            self._pos = o5.pos || null;
            self._pannerAttr = {
              coneInnerAngle: typeof o5.coneInnerAngle !== "undefined" ? o5.coneInnerAngle : 360,
              coneOuterAngle: typeof o5.coneOuterAngle !== "undefined" ? o5.coneOuterAngle : 360,
              coneOuterGain: typeof o5.coneOuterGain !== "undefined" ? o5.coneOuterGain : 0,
              distanceModel: typeof o5.distanceModel !== "undefined" ? o5.distanceModel : "inverse",
              maxDistance: typeof o5.maxDistance !== "undefined" ? o5.maxDistance : 1e4,
              panningModel: typeof o5.panningModel !== "undefined" ? o5.panningModel : "HRTF",
              refDistance: typeof o5.refDistance !== "undefined" ? o5.refDistance : 1,
              rolloffFactor: typeof o5.rolloffFactor !== "undefined" ? o5.rolloffFactor : 1
            };
            self._onstereo = o5.onstereo ? [{ fn: o5.onstereo }] : [];
            self._onpos = o5.onpos ? [{ fn: o5.onpos }] : [];
            self._onorientation = o5.onorientation ? [{ fn: o5.onorientation }] : [];
            return _super.call(this, o5);
          };
        }(Howl.prototype.init);
        Howl.prototype.stereo = function(pan, id2) {
          var self = this;
          if (!self._webAudio) {
            return self;
          }
          if (self._state !== "loaded") {
            self._queue.push({
              event: "stereo",
              action: function() {
                self.stereo(pan, id2);
              }
            });
            return self;
          }
          var pannerType = typeof Howler.ctx.createStereoPanner === "undefined" ? "spatial" : "stereo";
          if (typeof id2 === "undefined") {
            if (typeof pan === "number") {
              self._stereo = pan;
              self._pos = [pan, 0, 0];
            } else {
              return self._stereo;
            }
          }
          var ids2 = self._getSoundIds(id2);
          for (var i4 = 0; i4 < ids2.length; i4++) {
            var sound2 = self._soundById(ids2[i4]);
            if (sound2) {
              if (typeof pan === "number") {
                sound2._stereo = pan;
                sound2._pos = [pan, 0, 0];
                if (sound2._node) {
                  sound2._pannerAttr.panningModel = "equalpower";
                  if (!sound2._panner || !sound2._panner.pan) {
                    setupPanner(sound2, pannerType);
                  }
                  if (pannerType === "spatial") {
                    if (typeof sound2._panner.positionX !== "undefined") {
                      sound2._panner.positionX.setValueAtTime(pan, Howler.ctx.currentTime);
                      sound2._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime);
                      sound2._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime);
                    } else {
                      sound2._panner.setPosition(pan, 0, 0);
                    }
                  } else {
                    sound2._panner.pan.setValueAtTime(pan, Howler.ctx.currentTime);
                  }
                }
                self._emit("stereo", sound2._id);
              } else {
                return sound2._stereo;
              }
            }
          }
          return self;
        };
        Howl.prototype.pos = function(x3, y4, z2, id2) {
          var self = this;
          if (!self._webAudio) {
            return self;
          }
          if (self._state !== "loaded") {
            self._queue.push({
              event: "pos",
              action: function() {
                self.pos(x3, y4, z2, id2);
              }
            });
            return self;
          }
          y4 = typeof y4 !== "number" ? 0 : y4;
          z2 = typeof z2 !== "number" ? -0.5 : z2;
          if (typeof id2 === "undefined") {
            if (typeof x3 === "number") {
              self._pos = [x3, y4, z2];
            } else {
              return self._pos;
            }
          }
          var ids2 = self._getSoundIds(id2);
          for (var i4 = 0; i4 < ids2.length; i4++) {
            var sound2 = self._soundById(ids2[i4]);
            if (sound2) {
              if (typeof x3 === "number") {
                sound2._pos = [x3, y4, z2];
                if (sound2._node) {
                  if (!sound2._panner || sound2._panner.pan) {
                    setupPanner(sound2, "spatial");
                  }
                  if (typeof sound2._panner.positionX !== "undefined") {
                    sound2._panner.positionX.setValueAtTime(x3, Howler.ctx.currentTime);
                    sound2._panner.positionY.setValueAtTime(y4, Howler.ctx.currentTime);
                    sound2._panner.positionZ.setValueAtTime(z2, Howler.ctx.currentTime);
                  } else {
                    sound2._panner.setPosition(x3, y4, z2);
                  }
                }
                self._emit("pos", sound2._id);
              } else {
                return sound2._pos;
              }
            }
          }
          return self;
        };
        Howl.prototype.orientation = function(x3, y4, z2, id2) {
          var self = this;
          if (!self._webAudio) {
            return self;
          }
          if (self._state !== "loaded") {
            self._queue.push({
              event: "orientation",
              action: function() {
                self.orientation(x3, y4, z2, id2);
              }
            });
            return self;
          }
          y4 = typeof y4 !== "number" ? self._orientation[1] : y4;
          z2 = typeof z2 !== "number" ? self._orientation[2] : z2;
          if (typeof id2 === "undefined") {
            if (typeof x3 === "number") {
              self._orientation = [x3, y4, z2];
            } else {
              return self._orientation;
            }
          }
          var ids2 = self._getSoundIds(id2);
          for (var i4 = 0; i4 < ids2.length; i4++) {
            var sound2 = self._soundById(ids2[i4]);
            if (sound2) {
              if (typeof x3 === "number") {
                sound2._orientation = [x3, y4, z2];
                if (sound2._node) {
                  if (!sound2._panner) {
                    if (!sound2._pos) {
                      sound2._pos = self._pos || [0, 0, -0.5];
                    }
                    setupPanner(sound2, "spatial");
                  }
                  if (typeof sound2._panner.orientationX !== "undefined") {
                    sound2._panner.orientationX.setValueAtTime(x3, Howler.ctx.currentTime);
                    sound2._panner.orientationY.setValueAtTime(y4, Howler.ctx.currentTime);
                    sound2._panner.orientationZ.setValueAtTime(z2, Howler.ctx.currentTime);
                  } else {
                    sound2._panner.setOrientation(x3, y4, z2);
                  }
                }
                self._emit("orientation", sound2._id);
              } else {
                return sound2._orientation;
              }
            }
          }
          return self;
        };
        Howl.prototype.pannerAttr = function() {
          var self = this;
          var args = arguments;
          var o5, id2, sound2;
          if (!self._webAudio) {
            return self;
          }
          if (args.length === 0) {
            return self._pannerAttr;
          } else if (args.length === 1) {
            if (typeof args[0] === "object") {
              o5 = args[0];
              if (typeof id2 === "undefined") {
                if (!o5.pannerAttr) {
                  o5.pannerAttr = {
                    coneInnerAngle: o5.coneInnerAngle,
                    coneOuterAngle: o5.coneOuterAngle,
                    coneOuterGain: o5.coneOuterGain,
                    distanceModel: o5.distanceModel,
                    maxDistance: o5.maxDistance,
                    refDistance: o5.refDistance,
                    rolloffFactor: o5.rolloffFactor,
                    panningModel: o5.panningModel
                  };
                }
                self._pannerAttr = {
                  coneInnerAngle: typeof o5.pannerAttr.coneInnerAngle !== "undefined" ? o5.pannerAttr.coneInnerAngle : self._coneInnerAngle,
                  coneOuterAngle: typeof o5.pannerAttr.coneOuterAngle !== "undefined" ? o5.pannerAttr.coneOuterAngle : self._coneOuterAngle,
                  coneOuterGain: typeof o5.pannerAttr.coneOuterGain !== "undefined" ? o5.pannerAttr.coneOuterGain : self._coneOuterGain,
                  distanceModel: typeof o5.pannerAttr.distanceModel !== "undefined" ? o5.pannerAttr.distanceModel : self._distanceModel,
                  maxDistance: typeof o5.pannerAttr.maxDistance !== "undefined" ? o5.pannerAttr.maxDistance : self._maxDistance,
                  refDistance: typeof o5.pannerAttr.refDistance !== "undefined" ? o5.pannerAttr.refDistance : self._refDistance,
                  rolloffFactor: typeof o5.pannerAttr.rolloffFactor !== "undefined" ? o5.pannerAttr.rolloffFactor : self._rolloffFactor,
                  panningModel: typeof o5.pannerAttr.panningModel !== "undefined" ? o5.pannerAttr.panningModel : self._panningModel
                };
              }
            } else {
              sound2 = self._soundById(parseInt(args[0], 10));
              return sound2 ? sound2._pannerAttr : self._pannerAttr;
            }
          } else if (args.length === 2) {
            o5 = args[0];
            id2 = parseInt(args[1], 10);
          }
          var ids2 = self._getSoundIds(id2);
          for (var i4 = 0; i4 < ids2.length; i4++) {
            sound2 = self._soundById(ids2[i4]);
            if (sound2) {
              var pa = sound2._pannerAttr;
              pa = {
                coneInnerAngle: typeof o5.coneInnerAngle !== "undefined" ? o5.coneInnerAngle : pa.coneInnerAngle,
                coneOuterAngle: typeof o5.coneOuterAngle !== "undefined" ? o5.coneOuterAngle : pa.coneOuterAngle,
                coneOuterGain: typeof o5.coneOuterGain !== "undefined" ? o5.coneOuterGain : pa.coneOuterGain,
                distanceModel: typeof o5.distanceModel !== "undefined" ? o5.distanceModel : pa.distanceModel,
                maxDistance: typeof o5.maxDistance !== "undefined" ? o5.maxDistance : pa.maxDistance,
                refDistance: typeof o5.refDistance !== "undefined" ? o5.refDistance : pa.refDistance,
                rolloffFactor: typeof o5.rolloffFactor !== "undefined" ? o5.rolloffFactor : pa.rolloffFactor,
                panningModel: typeof o5.panningModel !== "undefined" ? o5.panningModel : pa.panningModel
              };
              var panner = sound2._panner;
              if (panner) {
                panner.coneInnerAngle = pa.coneInnerAngle;
                panner.coneOuterAngle = pa.coneOuterAngle;
                panner.coneOuterGain = pa.coneOuterGain;
                panner.distanceModel = pa.distanceModel;
                panner.maxDistance = pa.maxDistance;
                panner.refDistance = pa.refDistance;
                panner.rolloffFactor = pa.rolloffFactor;
                panner.panningModel = pa.panningModel;
              } else {
                if (!sound2._pos) {
                  sound2._pos = self._pos || [0, 0, -0.5];
                }
                setupPanner(sound2, "spatial");
              }
            }
          }
          return self;
        };
        Sound.prototype.init = function(_super) {
          return function() {
            var self = this;
            var parent = self._parent;
            self._orientation = parent._orientation;
            self._stereo = parent._stereo;
            self._pos = parent._pos;
            self._pannerAttr = parent._pannerAttr;
            _super.call(this);
            if (self._stereo) {
              parent.stereo(self._stereo);
            } else if (self._pos) {
              parent.pos(self._pos[0], self._pos[1], self._pos[2], self._id);
            }
          };
        }(Sound.prototype.init);
        Sound.prototype.reset = function(_super) {
          return function() {
            var self = this;
            var parent = self._parent;
            self._orientation = parent._orientation;
            self._stereo = parent._stereo;
            self._pos = parent._pos;
            self._pannerAttr = parent._pannerAttr;
            if (self._stereo) {
              parent.stereo(self._stereo);
            } else if (self._pos) {
              parent.pos(self._pos[0], self._pos[1], self._pos[2], self._id);
            } else if (self._panner) {
              self._panner.disconnect(0);
              self._panner = void 0;
              parent._refreshBuffer(self);
            }
            return _super.call(this);
          };
        }(Sound.prototype.reset);
        var setupPanner = function(sound2, type) {
          type = type || "spatial";
          if (type === "spatial") {
            sound2._panner = Howler.ctx.createPanner();
            sound2._panner.coneInnerAngle = sound2._pannerAttr.coneInnerAngle;
            sound2._panner.coneOuterAngle = sound2._pannerAttr.coneOuterAngle;
            sound2._panner.coneOuterGain = sound2._pannerAttr.coneOuterGain;
            sound2._panner.distanceModel = sound2._pannerAttr.distanceModel;
            sound2._panner.maxDistance = sound2._pannerAttr.maxDistance;
            sound2._panner.refDistance = sound2._pannerAttr.refDistance;
            sound2._panner.rolloffFactor = sound2._pannerAttr.rolloffFactor;
            sound2._panner.panningModel = sound2._pannerAttr.panningModel;
            if (typeof sound2._panner.positionX !== "undefined") {
              sound2._panner.positionX.setValueAtTime(sound2._pos[0], Howler.ctx.currentTime);
              sound2._panner.positionY.setValueAtTime(sound2._pos[1], Howler.ctx.currentTime);
              sound2._panner.positionZ.setValueAtTime(sound2._pos[2], Howler.ctx.currentTime);
            } else {
              sound2._panner.setPosition(sound2._pos[0], sound2._pos[1], sound2._pos[2]);
            }
            if (typeof sound2._panner.orientationX !== "undefined") {
              sound2._panner.orientationX.setValueAtTime(sound2._orientation[0], Howler.ctx.currentTime);
              sound2._panner.orientationY.setValueAtTime(sound2._orientation[1], Howler.ctx.currentTime);
              sound2._panner.orientationZ.setValueAtTime(sound2._orientation[2], Howler.ctx.currentTime);
            } else {
              sound2._panner.setOrientation(sound2._orientation[0], sound2._orientation[1], sound2._orientation[2]);
            }
          } else {
            sound2._panner = Howler.ctx.createStereoPanner();
            sound2._panner.pan.setValueAtTime(sound2._stereo, Howler.ctx.currentTime);
          }
          sound2._panner.connect(sound2._node);
          if (!sound2._paused) {
            sound2._parent.pause(sound2._id, true).play(sound2._id, true);
          }
        };
      })();
    }
  });

  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var i;
  var t;
  var r;
  var o;
  var f;
  var e = {};
  var c = [];
  var s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  function a(n2, l4) {
    for (var u4 in l4)
      n2[u4] = l4[u4];
    return n2;
  }
  function h(n2) {
    var l4 = n2.parentNode;
    l4 && l4.removeChild(n2);
  }
  function v(l4, u4, i4) {
    var t4, r3, o5, f4 = {};
    for (o5 in u4)
      "key" == o5 ? t4 = u4[o5] : "ref" == o5 ? r3 = u4[o5] : f4[o5] = u4[o5];
    if (arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : i4), "function" == typeof l4 && null != l4.defaultProps)
      for (o5 in l4.defaultProps)
        void 0 === f4[o5] && (f4[o5] = l4.defaultProps[o5]);
    return y(l4, f4, t4, r3, null);
  }
  function y(n2, i4, t4, r3, o5) {
    var f4 = { type: n2, props: i4, key: t4, ref: r3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == o5 ? ++u : o5 };
    return null == o5 && null != l.vnode && l.vnode(f4), f4;
  }
  function d(n2) {
    return n2.children;
  }
  function _(n2, l4) {
    this.props = n2, this.context = l4;
  }
  function k(n2, l4) {
    if (null == l4)
      return n2.__ ? k(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
    for (var u4; l4 < n2.__k.length; l4++)
      if (null != (u4 = n2.__k[l4]) && null != u4.__e)
        return u4.__e;
    return "function" == typeof n2.type ? k(n2) : null;
  }
  function b(n2) {
    var l4, u4;
    if (null != (n2 = n2.__) && null != n2.__c) {
      for (n2.__e = n2.__c.base = null, l4 = 0; l4 < n2.__k.length; l4++)
        if (null != (u4 = n2.__k[l4]) && null != u4.__e) {
          n2.__e = n2.__c.base = u4.__e;
          break;
        }
      return b(n2);
    }
  }
  function m(n2) {
    (!n2.__d && (n2.__d = true) && t.push(n2) && !g.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || r)(g);
  }
  function g() {
    for (var n2; g.__r = t.length; )
      n2 = t.sort(function(n3, l4) {
        return n3.__v.__b - l4.__v.__b;
      }), t = [], n2.some(function(n3) {
        var l4, u4, i4, t4, r3, o5;
        n3.__d && (r3 = (t4 = (l4 = n3).__v).__e, (o5 = l4.__P) && (u4 = [], (i4 = a({}, t4)).__v = t4.__v + 1, j(o5, t4, i4, l4.__n, void 0 !== o5.ownerSVGElement, null != t4.__h ? [r3] : null, u4, null == r3 ? k(t4) : r3, t4.__h), z(u4, t4), t4.__e != r3 && b(t4)));
      });
  }
  function w(n2, l4, u4, i4, t4, r3, o5, f4, s4, a4) {
    var h3, v3, p3, _2, b3, m3, g3, w3 = i4 && i4.__k || c, A = w3.length;
    for (u4.__k = [], h3 = 0; h3 < l4.length; h3++)
      if (null != (_2 = u4.__k[h3] = null == (_2 = l4[h3]) || "boolean" == typeof _2 ? null : "string" == typeof _2 || "number" == typeof _2 || "bigint" == typeof _2 ? y(null, _2, null, null, _2) : Array.isArray(_2) ? y(d, { children: _2 }, null, null, null) : _2.__b > 0 ? y(_2.type, _2.props, _2.key, null, _2.__v) : _2)) {
        if (_2.__ = u4, _2.__b = u4.__b + 1, null === (p3 = w3[h3]) || p3 && _2.key == p3.key && _2.type === p3.type)
          w3[h3] = void 0;
        else
          for (v3 = 0; v3 < A; v3++) {
            if ((p3 = w3[v3]) && _2.key == p3.key && _2.type === p3.type) {
              w3[v3] = void 0;
              break;
            }
            p3 = null;
          }
        j(n2, _2, p3 = p3 || e, t4, r3, o5, f4, s4, a4), b3 = _2.__e, (v3 = _2.ref) && p3.ref != v3 && (g3 || (g3 = []), p3.ref && g3.push(p3.ref, null, _2), g3.push(v3, _2.__c || b3, _2)), null != b3 ? (null == m3 && (m3 = b3), "function" == typeof _2.type && _2.__k === p3.__k ? _2.__d = s4 = x(_2, s4, n2) : s4 = P(n2, _2, p3, w3, b3, s4), "function" == typeof u4.type && (u4.__d = s4)) : s4 && p3.__e == s4 && s4.parentNode != n2 && (s4 = k(p3));
      }
    for (u4.__e = m3, h3 = A; h3--; )
      null != w3[h3] && ("function" == typeof u4.type && null != w3[h3].__e && w3[h3].__e == u4.__d && (u4.__d = k(i4, h3 + 1)), N(w3[h3], w3[h3]));
    if (g3)
      for (h3 = 0; h3 < g3.length; h3++)
        M(g3[h3], g3[++h3], g3[++h3]);
  }
  function x(n2, l4, u4) {
    for (var i4, t4 = n2.__k, r3 = 0; t4 && r3 < t4.length; r3++)
      (i4 = t4[r3]) && (i4.__ = n2, l4 = "function" == typeof i4.type ? x(i4, l4, u4) : P(u4, i4, i4, t4, i4.__e, l4));
    return l4;
  }
  function P(n2, l4, u4, i4, t4, r3) {
    var o5, f4, e4;
    if (void 0 !== l4.__d)
      o5 = l4.__d, l4.__d = void 0;
    else if (null == u4 || t4 != r3 || null == t4.parentNode)
      n:
        if (null == r3 || r3.parentNode !== n2)
          n2.appendChild(t4), o5 = null;
        else {
          for (f4 = r3, e4 = 0; (f4 = f4.nextSibling) && e4 < i4.length; e4 += 2)
            if (f4 == t4)
              break n;
          n2.insertBefore(t4, r3), o5 = r3;
        }
    return void 0 !== o5 ? o5 : t4.nextSibling;
  }
  function C(n2, l4, u4, i4, t4) {
    var r3;
    for (r3 in u4)
      "children" === r3 || "key" === r3 || r3 in l4 || H(n2, r3, null, u4[r3], i4);
    for (r3 in l4)
      t4 && "function" != typeof l4[r3] || "children" === r3 || "key" === r3 || "value" === r3 || "checked" === r3 || u4[r3] === l4[r3] || H(n2, r3, l4[r3], u4[r3], i4);
  }
  function $(n2, l4, u4) {
    "-" === l4[0] ? n2.setProperty(l4, u4) : n2[l4] = null == u4 ? "" : "number" != typeof u4 || s.test(l4) ? u4 : u4 + "px";
  }
  function H(n2, l4, u4, i4, t4) {
    var r3;
    n:
      if ("style" === l4)
        if ("string" == typeof u4)
          n2.style.cssText = u4;
        else {
          if ("string" == typeof i4 && (n2.style.cssText = i4 = ""), i4)
            for (l4 in i4)
              u4 && l4 in u4 || $(n2.style, l4, "");
          if (u4)
            for (l4 in u4)
              i4 && u4[l4] === i4[l4] || $(n2.style, l4, u4[l4]);
        }
      else if ("o" === l4[0] && "n" === l4[1])
        r3 = l4 !== (l4 = l4.replace(/Capture$/, "")), l4 = l4.toLowerCase() in n2 ? l4.toLowerCase().slice(2) : l4.slice(2), n2.l || (n2.l = {}), n2.l[l4 + r3] = u4, u4 ? i4 || n2.addEventListener(l4, r3 ? T : I, r3) : n2.removeEventListener(l4, r3 ? T : I, r3);
      else if ("dangerouslySetInnerHTML" !== l4) {
        if (t4)
          l4 = l4.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
        else if ("href" !== l4 && "list" !== l4 && "form" !== l4 && "tabIndex" !== l4 && "download" !== l4 && l4 in n2)
          try {
            n2[l4] = null == u4 ? "" : u4;
            break n;
          } catch (n3) {
          }
        "function" == typeof u4 || (null != u4 && (false !== u4 || "a" === l4[0] && "r" === l4[1]) ? n2.setAttribute(l4, u4) : n2.removeAttribute(l4));
      }
  }
  function I(n2) {
    this.l[n2.type + false](l.event ? l.event(n2) : n2);
  }
  function T(n2) {
    this.l[n2.type + true](l.event ? l.event(n2) : n2);
  }
  function j(n2, u4, i4, t4, r3, o5, f4, e4, c4) {
    var s4, h3, v3, y4, p3, k3, b3, m3, g3, x3, A, P2 = u4.type;
    if (void 0 !== u4.constructor)
      return null;
    null != i4.__h && (c4 = i4.__h, e4 = u4.__e = i4.__e, u4.__h = null, o5 = [e4]), (s4 = l.__b) && s4(u4);
    try {
      n:
        if ("function" == typeof P2) {
          if (m3 = u4.props, g3 = (s4 = P2.contextType) && t4[s4.__c], x3 = s4 ? g3 ? g3.props.value : s4.__ : t4, i4.__c ? b3 = (h3 = u4.__c = i4.__c).__ = h3.__E : ("prototype" in P2 && P2.prototype.render ? u4.__c = h3 = new P2(m3, x3) : (u4.__c = h3 = new _(m3, x3), h3.constructor = P2, h3.render = O), g3 && g3.sub(h3), h3.props = m3, h3.state || (h3.state = {}), h3.context = x3, h3.__n = t4, v3 = h3.__d = true, h3.__h = []), null == h3.__s && (h3.__s = h3.state), null != P2.getDerivedStateFromProps && (h3.__s == h3.state && (h3.__s = a({}, h3.__s)), a(h3.__s, P2.getDerivedStateFromProps(m3, h3.__s))), y4 = h3.props, p3 = h3.state, v3)
            null == P2.getDerivedStateFromProps && null != h3.componentWillMount && h3.componentWillMount(), null != h3.componentDidMount && h3.__h.push(h3.componentDidMount);
          else {
            if (null == P2.getDerivedStateFromProps && m3 !== y4 && null != h3.componentWillReceiveProps && h3.componentWillReceiveProps(m3, x3), !h3.__e && null != h3.shouldComponentUpdate && false === h3.shouldComponentUpdate(m3, h3.__s, x3) || u4.__v === i4.__v) {
              h3.props = m3, h3.state = h3.__s, u4.__v !== i4.__v && (h3.__d = false), h3.__v = u4, u4.__e = i4.__e, u4.__k = i4.__k, u4.__k.forEach(function(n3) {
                n3 && (n3.__ = u4);
              }), h3.__h.length && f4.push(h3);
              break n;
            }
            null != h3.componentWillUpdate && h3.componentWillUpdate(m3, h3.__s, x3), null != h3.componentDidUpdate && h3.__h.push(function() {
              h3.componentDidUpdate(y4, p3, k3);
            });
          }
          h3.context = x3, h3.props = m3, h3.state = h3.__s, (s4 = l.__r) && s4(u4), h3.__d = false, h3.__v = u4, h3.__P = n2, s4 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s, null != h3.getChildContext && (t4 = a(a({}, t4), h3.getChildContext())), v3 || null == h3.getSnapshotBeforeUpdate || (k3 = h3.getSnapshotBeforeUpdate(y4, p3)), A = null != s4 && s4.type === d && null == s4.key ? s4.props.children : s4, w(n2, Array.isArray(A) ? A : [A], u4, i4, t4, r3, o5, f4, e4, c4), h3.base = u4.__e, u4.__h = null, h3.__h.length && f4.push(h3), b3 && (h3.__E = h3.__ = null), h3.__e = false;
        } else
          null == o5 && u4.__v === i4.__v ? (u4.__k = i4.__k, u4.__e = i4.__e) : u4.__e = L(i4.__e, u4, i4, t4, r3, o5, f4, c4);
      (s4 = l.diffed) && s4(u4);
    } catch (n3) {
      u4.__v = null, (c4 || null != o5) && (u4.__e = e4, u4.__h = !!c4, o5[o5.indexOf(e4)] = null), l.__e(n3, u4, i4);
    }
  }
  function z(n2, u4) {
    l.__c && l.__c(u4, n2), n2.some(function(u5) {
      try {
        n2 = u5.__h, u5.__h = [], n2.some(function(n3) {
          n3.call(u5);
        });
      } catch (n3) {
        l.__e(n3, u5.__v);
      }
    });
  }
  function L(l4, u4, i4, t4, r3, o5, f4, c4) {
    var s4, a4, v3, y4 = i4.props, p3 = u4.props, d4 = u4.type, _2 = 0;
    if ("svg" === d4 && (r3 = true), null != o5) {
      for (; _2 < o5.length; _2++)
        if ((s4 = o5[_2]) && "setAttribute" in s4 == !!d4 && (d4 ? s4.localName === d4 : 3 === s4.nodeType)) {
          l4 = s4, o5[_2] = null;
          break;
        }
    }
    if (null == l4) {
      if (null === d4)
        return document.createTextNode(p3);
      l4 = r3 ? document.createElementNS("http://www.w3.org/2000/svg", d4) : document.createElement(d4, p3.is && p3), o5 = null, c4 = false;
    }
    if (null === d4)
      y4 === p3 || c4 && l4.data === p3 || (l4.data = p3);
    else {
      if (o5 = o5 && n.call(l4.childNodes), a4 = (y4 = i4.props || e).dangerouslySetInnerHTML, v3 = p3.dangerouslySetInnerHTML, !c4) {
        if (null != o5)
          for (y4 = {}, _2 = 0; _2 < l4.attributes.length; _2++)
            y4[l4.attributes[_2].name] = l4.attributes[_2].value;
        (v3 || a4) && (v3 && (a4 && v3.__html == a4.__html || v3.__html === l4.innerHTML) || (l4.innerHTML = v3 && v3.__html || ""));
      }
      if (C(l4, p3, y4, r3, c4), v3)
        u4.__k = [];
      else if (_2 = u4.props.children, w(l4, Array.isArray(_2) ? _2 : [_2], u4, i4, t4, r3 && "foreignObject" !== d4, o5, f4, o5 ? o5[0] : i4.__k && k(i4, 0), c4), null != o5)
        for (_2 = o5.length; _2--; )
          null != o5[_2] && h(o5[_2]);
      c4 || ("value" in p3 && void 0 !== (_2 = p3.value) && (_2 !== y4.value || _2 !== l4.value || "progress" === d4 && !_2) && H(l4, "value", _2, y4.value, false), "checked" in p3 && void 0 !== (_2 = p3.checked) && _2 !== l4.checked && H(l4, "checked", _2, y4.checked, false));
    }
    return l4;
  }
  function M(n2, u4, i4) {
    try {
      "function" == typeof n2 ? n2(u4) : n2.current = u4;
    } catch (n3) {
      l.__e(n3, i4);
    }
  }
  function N(n2, u4, i4) {
    var t4, r3;
    if (l.unmount && l.unmount(n2), (t4 = n2.ref) && (t4.current && t4.current !== n2.__e || M(t4, null, u4)), null != (t4 = n2.__c)) {
      if (t4.componentWillUnmount)
        try {
          t4.componentWillUnmount();
        } catch (n3) {
          l.__e(n3, u4);
        }
      t4.base = t4.__P = null;
    }
    if (t4 = n2.__k)
      for (r3 = 0; r3 < t4.length; r3++)
        t4[r3] && N(t4[r3], u4, "function" != typeof n2.type);
    i4 || null == n2.__e || h(n2.__e), n2.__e = n2.__d = void 0;
  }
  function O(n2, l4, u4) {
    return this.constructor(n2, u4);
  }
  function S(u4, i4, t4) {
    var r3, o5, f4;
    l.__ && l.__(u4, i4), o5 = (r3 = "function" == typeof t4) ? null : t4 && t4.__k || i4.__k, f4 = [], j(i4, u4 = (!r3 && t4 || i4).__k = v(d, null, [u4]), o5 || e, e, void 0 !== i4.ownerSVGElement, !r3 && t4 ? [t4] : o5 ? null : i4.firstChild ? n.call(i4.childNodes) : null, f4, !r3 && t4 ? t4 : o5 ? o5.__e : i4.firstChild, r3), z(f4, u4);
  }
  n = c.slice, l = { __e: function(n2, l4) {
    for (var u4, i4, t4; l4 = l4.__; )
      if ((u4 = l4.__c) && !u4.__)
        try {
          if ((i4 = u4.constructor) && null != i4.getDerivedStateFromError && (u4.setState(i4.getDerivedStateFromError(n2)), t4 = u4.__d), null != u4.componentDidCatch && (u4.componentDidCatch(n2), t4 = u4.__d), t4)
            return u4.__E = u4;
        } catch (l5) {
          n2 = l5;
        }
    throw n2;
  } }, u = 0, i = function(n2) {
    return null != n2 && void 0 === n2.constructor;
  }, _.prototype.setState = function(n2, l4) {
    var u4;
    u4 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = a({}, this.state), "function" == typeof n2 && (n2 = n2(a({}, u4), this.props)), n2 && a(u4, n2), null != n2 && this.__v && (l4 && this.__h.push(l4), m(this));
  }, _.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), m(this));
  }, _.prototype.render = d, t = [], r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, g.__r = 0, f = 0;

  // node_modules/preact/hooks/dist/hooks.module.js
  var t2;
  var u2;
  var r2;
  var o2 = 0;
  var i2 = [];
  var c2 = l.__b;
  var f2 = l.__r;
  var e2 = l.diffed;
  var a2 = l.__c;
  var v2 = l.unmount;
  function m2(t4, r3) {
    l.__h && l.__h(u2, t4, o2 || r3), o2 = 0;
    var i4 = u2.__H || (u2.__H = { __: [], __h: [] });
    return t4 >= i4.__.length && i4.__.push({}), i4.__[t4];
  }
  function l2(n2) {
    return o2 = 1, p(w2, n2);
  }
  function p(n2, r3, o5) {
    var i4 = m2(t2++, 2);
    return i4.t = n2, i4.__c || (i4.__ = [o5 ? o5(r3) : w2(void 0, r3), function(n3) {
      var t4 = i4.t(i4.__[0], n3);
      i4.__[0] !== t4 && (i4.__ = [t4, i4.__[1]], i4.__c.setState({}));
    }], i4.__c = u2), i4.__;
  }
  function y2(r3, o5) {
    var i4 = m2(t2++, 3);
    !l.__s && k2(i4.__H, o5) && (i4.__ = r3, i4.__H = o5, u2.__H.__h.push(i4));
  }
  function s2(n2) {
    return o2 = 5, d2(function() {
      return { current: n2 };
    }, []);
  }
  function d2(n2, u4) {
    var r3 = m2(t2++, 7);
    return k2(r3.__H, u4) && (r3.__ = n2(), r3.__H = u4, r3.__h = n2), r3.__;
  }
  function x2() {
    var t4;
    for (i2.sort(function(n2, t5) {
      return n2.__v.__b - t5.__v.__b;
    }); t4 = i2.pop(); )
      if (t4.__P)
        try {
          t4.__H.__h.forEach(g2), t4.__H.__h.forEach(j2), t4.__H.__h = [];
        } catch (u4) {
          t4.__H.__h = [], l.__e(u4, t4.__v);
        }
  }
  l.__b = function(n2) {
    u2 = null, c2 && c2(n2);
  }, l.__r = function(n2) {
    f2 && f2(n2), t2 = 0;
    var r3 = (u2 = n2.__c).__H;
    r3 && (r3.__h.forEach(g2), r3.__h.forEach(j2), r3.__h = []);
  }, l.diffed = function(t4) {
    e2 && e2(t4);
    var o5 = t4.__c;
    o5 && o5.__H && o5.__H.__h.length && (1 !== i2.push(o5) && r2 === l.requestAnimationFrame || ((r2 = l.requestAnimationFrame) || function(n2) {
      var t5, u4 = function() {
        clearTimeout(r3), b2 && cancelAnimationFrame(t5), setTimeout(n2);
      }, r3 = setTimeout(u4, 100);
      b2 && (t5 = requestAnimationFrame(u4));
    })(x2)), u2 = null;
  }, l.__c = function(t4, u4) {
    u4.some(function(t5) {
      try {
        t5.__h.forEach(g2), t5.__h = t5.__h.filter(function(n2) {
          return !n2.__ || j2(n2);
        });
      } catch (r3) {
        u4.some(function(n2) {
          n2.__h && (n2.__h = []);
        }), u4 = [], l.__e(r3, t5.__v);
      }
    }), a2 && a2(t4, u4);
  }, l.unmount = function(t4) {
    v2 && v2(t4);
    var u4, r3 = t4.__c;
    r3 && r3.__H && (r3.__H.__.forEach(function(n2) {
      try {
        g2(n2);
      } catch (n3) {
        u4 = n3;
      }
    }), u4 && l.__e(u4, r3.__v));
  };
  var b2 = "function" == typeof requestAnimationFrame;
  function g2(n2) {
    var t4 = u2, r3 = n2.__c;
    "function" == typeof r3 && (n2.__c = void 0, r3()), u2 = t4;
  }
  function j2(n2) {
    var t4 = u2;
    n2.__c = n2.__(), u2 = t4;
  }
  function k2(n2, t4) {
    return !n2 || n2.length !== t4.length || t4.some(function(t5, u4) {
      return t5 !== n2[u4];
    });
  }
  function w2(n2, t4) {
    return "function" == typeof t4 ? t4(n2) : t4;
  }

  // src/display/sound/sound.ts
  var import_howler = __toESM(require_howler());

  // src/utils/decorators.ts
  function lazy(target, name, {
    get: initializer,
    enumerable,
    configurable,
    set: setter
  } = {}) {
    const { constructor } = target;
    if (initializer === void 0) {
      throw `@lazy can't be set as a property \`${name}\` on ${constructor.name} class, using a getter instead!`;
    }
    if (setter) {
      throw `@lazy can't be annotated with get ${name}() existing a setter on ${constructor.name} class!`;
    }
    function set(that, value) {
      if (value === void 0) {
        value = that;
        that = this;
      }
      Object.defineProperty(that, name, {
        enumerable,
        configurable,
        value
      });
      return value;
    }
    return {
      get() {
        if (this === target) {
          return initializer();
        }
        if (this.constructor !== constructor && Object.getPrototypeOf(this).constructor === constructor) {
          return initializer();
        }
        return set(this, initializer.call(this));
      },
      set
    };
  }

  // src/utils/enums.ts
  var Gravity = /* @__PURE__ */ ((Gravity3) => {
    Gravity3[Gravity3["Auto"] = 0] = "Auto";
    Gravity3[Gravity3["0G"] = 1] = "0G";
    Gravity3[Gravity3["1/64G"] = 2] = "1/64G";
    Gravity3[Gravity3["1/32G"] = 3] = "1/32G";
    Gravity3[Gravity3["1/16G"] = 4] = "1/16G";
    Gravity3[Gravity3["1/8G"] = 5] = "1/8G";
    Gravity3[Gravity3["1/4G"] = 6] = "1/4G";
    Gravity3[Gravity3["1/2G"] = 7] = "1/2G";
    Gravity3[Gravity3["1G"] = 8] = "1G";
    Gravity3[Gravity3["20G"] = 9] = "20G";
    return Gravity3;
  })(Gravity || {});
  var SoftDrop = /* @__PURE__ */ ((SoftDrop3) => {
    SoftDrop3[SoftDrop3["Auto"] = 0] = "Auto";
    SoftDrop3[SoftDrop3["0G"] = 1] = "0G";
    SoftDrop3[SoftDrop3["1/64G"] = 2] = "1/64G";
    SoftDrop3[SoftDrop3["1/32G"] = 3] = "1/32G";
    SoftDrop3[SoftDrop3["1/16G"] = 4] = "1/16G";
    SoftDrop3[SoftDrop3["1/8G"] = 5] = "1/8G";
    SoftDrop3[SoftDrop3["1/4G"] = 6] = "1/4G";
    SoftDrop3[SoftDrop3["1/2G"] = 7] = "1/2G";
    SoftDrop3[SoftDrop3["1G"] = 8] = "1G";
    SoftDrop3[SoftDrop3["20G"] = 9] = "20G";
    return SoftDrop3;
  })(SoftDrop || {});
  var RotSys = /* @__PURE__ */ ((RotSys2) => {
    RotSys2[RotSys2["Super"] = 0] = "Super";
    RotSys2[RotSys2["C2"] = 1] = "C2";
    RotSys2[RotSys2["Arika"] = 2] = "Arika";
    RotSys2[RotSys2["DTET"] = 3] = "DTET";
    RotSys2[RotSys2["QQ"] = 4] = "QQ";
    RotSys2[RotSys2["Atari"] = 5] = "Atari";
    RotSys2[RotSys2["Tengen"] = 6] = "Tengen";
    RotSys2[RotSys2["N-Blox"] = 7] = "N-Blox";
    RotSys2[RotSys2["Nintendo"] = 8] = "Nintendo";
    RotSys2[RotSys2["MS"] = 9] = "MS";
    RotSys2[RotSys2["E-60"] = 10] = "E-60";
    RotSys2[RotSys2["IBM PC"] = 11] = "IBM PC";
    RotSys2[RotSys2["JJ"] = 12] = "JJ";
    RotSys2[RotSys2["5k"] = 13] = "5k";
    RotSys2[RotSys2["Plus"] = 14] = "Plus";
    RotSys2[RotSys2["DX"] = 15] = "DX";
    return RotSys2;
  })(RotSys || {});
  var Size = /* @__PURE__ */ ((Size2) => {
    Size2[Size2["Full"] = 0] = "Full";
    Size2[Size2["Small"] = 1] = "Small";
    Size2[Size2["Medium"] = 2] = "Medium";
    Size2[Size2["Large"] = 3] = "Large";
    Size2[Size2["Extra Large"] = 4] = "Extra Large";
    return Size2;
  })(Size || {});
  var Soundbank = /* @__PURE__ */ ((Soundbank2) => {
    Soundbank2[Soundbank2["PPT"] = 0] = "PPT";
    Soundbank2[Soundbank2["TGM3"] = 1] = "TGM3";
    Soundbank2[Soundbank2["NullPM"] = 2] = "NullPM";
    Soundbank2[Soundbank2["Yotipo"] = 3] = "Yotipo";
    Soundbank2[Soundbank2["TOJ"] = 4] = "TOJ";
    Soundbank2[Soundbank2["Retro"] = 5] = "Retro";
    Soundbank2[Soundbank2["Friends"] = 6] = "Friends";
    Soundbank2[Soundbank2["T99"] = 7] = "T99";
    Soundbank2[Soundbank2[".com"] = 8] = ".com";
    Soundbank2[Soundbank2["Party"] = 9] = "Party";
    Soundbank2[Soundbank2["Ultimate"] = 10] = "Ultimate";
    Soundbank2[Soundbank2["Ace"] = 11] = "Ace";
    Soundbank2[Soundbank2["Tetr.js"] = 12] = "Tetr.js";
    return Soundbank2;
  })(Soundbank || {});
  var Block = /* @__PURE__ */ ((Block2) => {
    Block2[Block2["Bevelled"] = 0] = "Bevelled";
    Block2[Block2["Flat"] = 1] = "Flat";
    Block2[Block2["Glossy"] = 2] = "Glossy";
    Block2[Block2["Arika"] = 3] = "Arika";
    Block2[Block2["Aqua"] = 4] = "Aqua";
    Block2[Block2["Arcade"] = 5] = "Arcade";
    Block2[Block2["N-Blox"] = 6] = "N-Blox";
    Block2[Block2["Bone"] = 7] = "Bone";
    Block2[Block2["Retro"] = 8] = "Retro";
    Block2[Block2["Friends"] = 9] = "Friends";
    Block2[Block2["T99"] = 10] = "T99";
    Block2[Block2[".com"] = 11] = ".com";
    Block2[Block2["PPT"] = 12] = "PPT";
    return Block2;
  })(Block || {});
  var NextType = /* @__PURE__ */ ((NextType2) => {
    NextType2[NextType2["TGM3"] = 0] = "TGM3";
    NextType2[NextType2["NullPM"] = 1] = "NullPM";
    NextType2[NextType2["TGM1"] = 2] = "TGM1";
    NextType2[NextType2["Tetr.js"] = 3] = "Tetr.js";
    return NextType2;
  })(NextType || {});
  var Voicebank = /* @__PURE__ */ ((Voicebank2) => {
    Voicebank2[Voicebank2["Alexey"] = 0] = "Alexey";
    Voicebank2[Voicebank2["Friends"] = 1] = "Friends";
    Voicebank2[Voicebank2["TOJ"] = 2] = "TOJ";
    return Voicebank2;
  })(Voicebank || {});
  var Ghost = /* @__PURE__ */ ((Ghost2) => {
    Ghost2[Ghost2["Grey"] = 0] = "Grey";
    Ghost2[Ghost2["Colored"] = 1] = "Colored";
    Ghost2[Ghost2["Off"] = 2] = "Off";
    Ghost2[Ghost2["Hidden"] = 3] = "Hidden";
    return Ghost2;
  })(Ghost || {});
  var Outline = /* @__PURE__ */ ((Outline2) => {
    Outline2[Outline2["Off"] = 0] = "Off";
    Outline2[Outline2["On"] = 1] = "On";
    Outline2[Outline2["Hidden"] = 2] = "Hidden";
    Outline2[Outline2["Only"] = 3] = "Only";
    return Outline2;
  })(Outline || {});
  var IRSMode = /* @__PURE__ */ ((IRSMode2) => {
    IRSMode2[IRSMode2["Off"] = 0] = "Off";
    IRSMode2[IRSMode2["Tap"] = 1] = "Tap";
    IRSMode2[IRSMode2["Hold"] = 2] = "Hold";
    IRSMode2[IRSMode2["Additive"] = 3] = "Additive";
    return IRSMode2;
  })(IRSMode || {});
  var IHSMode = /* @__PURE__ */ ((IHSMode2) => {
    IHSMode2[IHSMode2["Off"] = 0] = "Off";
    IHSMode2[IHSMode2["Tap"] = 1] = "Tap";
    IHSMode2[IHSMode2["Hold"] = 2] = "Hold";
    return IHSMode2;
  })(IHSMode || {});

  // src/utils/generators.ts
  function* range2x2(x3, y4) {
    for (let i4 = 0; i4 < x3; i4++) {
      for (let j3 = 0; j3 < y4; j3++) {
        yield [i4, j3];
      }
    }
  }
  function wrapGenerator(gen) {
    let iter = gen();
    return {
      next: () => {
        return iter.next().value;
      },
      reset: () => {
        iter = gen();
      },
      [Symbol.iterator]: () => {
        return iter;
      }
    };
  }

  // src/utils/randomizer.ts
  var seed = Math.floor(Math.random() * 2147483647);
  var rng = wrapGenerator(function* () {
    while (true)
      yield (seed = seed * 16807 % 2147483647) / 2147483647;
  });
  function setRNGSeed(newSeed) {
    seed = newSeed;
  }
  function randomInt(min, max) {
    return Math.floor(rng.next() * (max - min + 1)) + min;
  }
  function randomIntExcept(min, max, exclude) {
    let r3 = randomInt(min, max);
    while (r3 === exclude) {
      r3 = randomInt(min, max);
    }
    return r3;
  }

  // src/utils/utils.ts
  var $2 = (id2) => document.getElementById(id2);
  var $$ = (selectors) => document.querySelectorAll(selectors);
  var $setText = (ele, text) => ele.textContent = text;
  function clear(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  function range(start, end, inc = 1) {
    const array = [];
    for (let i4 = start; i4 < end; i4 += inc) {
      array.push(i4);
    }
    return array;
  }
  var sleepBuff = new Int32Array(new SharedArrayBuffer(4));

  // src/utils/data.ts
  var version = "0.7.7";
  var Mutable = class {
    static {
      // Scoreing related status
      this.allclear = 0;
    }
    static {
      this.combo = 0;
    }
    static {
      this.level = 0;
    }
    static {
      this.leveltgm = 0;
    }
    static {
      this.leveltgmvisible = 0;
    }
    static {
      // Stats related status
      this.lines = 0;
    }
    static {
      this.lineAmount = 0;
    }
    static {
      this.lineARE = 0;
    }
    static {
      this.lineAREb = 0;
    }
    static {
      this.lineDrought = 0;
    }
    static {
      this.score = 0n;
    }
    static {
      this.newScore = 0n;
    }
    static {
      this.statsFinesse = 0;
    }
    static {
      this.piecesSet = 0;
    }
    static {
      this.scoreTime = 0;
    }
    static {
      this.scoreStartTime = 0;
    }
    static {
      this.digLines = [];
    }
    static {
      this.b2b = 0;
    }
    static {
      this.gravity = 0;
    }
    static {
      this.gravityArr = (() => {
        const array = [];
        array.push(0);
        for (let i4 = 1; i4 < 64; i4 *= 2)
          array.push(i4 / 64);
        for (let i4 = 1; i4 <= 20; i4 += 19)
          array.push(i4);
        return array;
      })();
    }
    static {
      this.lineLimit = 0;
    }
    static {
      /**
       * Playfield.
       */
      this.cellSize = 0;
    }
    static {
      this.column = 0;
    }
    static {
      this.lockDelayLimit = void 0;
    }
    static {
      this.sdArray = [];
    }
    static {
      this.frame = 0;
    }
    static {
      this.frameSkipped = 0;
    }
    static {
      /**
       * for dig challenge mode
       */
      this.frameLastRise = 0;
    }
    static {
      this.frameLastHarddropDown = 0;
    }
    static {
      /**
       * for dig zen mode
       */
      this.digZenBuffer = 0;
    }
    static {
      this.lastPiecesSet = 0;
    }
    static {
      this.toGreyRow = 0;
    }
    static {
      //TODO Make dirty flags for each canvas, draw them all at once during frame call.
      this.lastX = 0;
    }
    static {
      this.lastY = 0;
    }
    static {
      this.lastPos = 0;
    }
    static {
      this.lastLockDelay = 0;
    }
    static {
      this.usedHardDrop = false;
    }
    static {
      this.spinY = 0;
    }
    static {
      this.spinX = 0;
    }
    static {
      this.rotationFailed = false;
    }
    static {
      this.classicRuleDelayLast = 0;
    }
    static {
      this.lastYFrame = 0;
    }
    static {
      this.classicSoftDrop = 0;
    }
    static {
      this.classicGravTest = 0;
    }
    static {
      this.classicStoredY = 0;
    }
    static {
      this.keysDown = 0;
    }
    static {
      this.lastKeys = 0;
    }
    static {
      this.released = 0;
    }
    static {
      this.alarm = false;
    }
    static {
      this.lineClear = 0;
    }
    static {
      this.playedLevelingbgmGrades = [false, false];
    }
    static {
      this.playedLevelingbgmMarathon = [false, false];
    }
    static {
      this.lastbgmTime = 0;
    }
    static {
      this.killAllbgm = false;
    }
    static {
      this.currentLoading = "";
    }
    static {
      this.scoreNes = 0;
    }
    static {
      this.nontetNes = 0;
    }
    static {
      this.tetNes = 0;
    }
    static {
      this.tetRateNes = 0;
    }
    static {
      this.isSpin = false;
    }
    static {
      this.isMini = false;
    }
    static {
      this.lockflashX = 0;
    }
    static {
      this.lockflashY = 0;
    }
    static {
      this.lockflash = 0;
    }
    static {
      this.lockflashOn = false;
    }
    static {
      this.alarmtest = false;
    }
    static {
      this.clearRows = [];
    }
    static {
      this.levelCheck = 0;
    }
  };
  var defaultBinds = {
    pause: 27,
    moveLeft: 37,
    moveRight: 39,
    moveLeft3: 0,
    moveRight3: 0,
    moveDown: 40,
    hardDrop: 32,
    holdPiece: 67,
    rotRight: 88,
    rotLeft: 90,
    rot180: 16,
    retry: 82
  };
  var binds = JSON.parse(JSON.stringify(defaultBinds));
  function setBinds(newBinds) {
    binds = JSON.parse(JSON.stringify(newBinds));
  }
  var flags = {
    hardDrop: 1,
    moveRight: 2,
    moveLeft: 4,
    moveDown: 8,
    holdPiece: 16,
    rotRight: 32,
    rotLeft: 64,
    rot180: 128,
    moveRight3: 256,
    moveLeft3: 512
  };
  var uitypes = "ppt,tgm,npm,yotipo,toj,nes,tf,99,com,party,ultimate,ace,tetrjs".split(",");
  var base = 1 / 65536;
  var speedTableTGM = [
    { level: 0, speed: base * 1024 },
    { level: 30, speed: base * 1536 },
    { level: 35, speed: base * 2048 },
    { level: 40, speed: base * 2560 },
    { level: 50, speed: base * 3072 },
    { level: 60, speed: base * 4096 },
    { level: 70, speed: base * 8192 },
    { level: 80, speed: base * 12288 },
    { level: 90, speed: base * 16384 },
    { level: 100, speed: base * 20480 },
    { level: 120, speed: base * 24576 },
    { level: 140, speed: base * 28672 },
    { level: 160, speed: base * 32768 },
    { level: 170, speed: base * 36865 },
    { level: 200, speed: base * 1024 },
    { level: 220, speed: base * 8192 },
    { level: 230, speed: base * 16384 },
    { level: 233, speed: base * 24576 },
    { level: 236, speed: base * 32768 },
    { level: 239, speed: base * 40960 },
    { level: 243, speed: base * 49152 },
    { level: 247, speed: base * 57344 },
    { level: 251, speed: 1 },
    { level: 300, speed: 2 },
    { level: 330, speed: 3 },
    { level: 360, speed: 4 },
    { level: 400, speed: 5 },
    { level: 420, speed: 4 },
    { level: 450, speed: 3 },
    { level: 500, speed: 20 },
    { level: 9999999999999, speed: 20 }
  ];
  var miscTableTGM = [
    {
      level: 0,
      are: 25,
      areline: 40,
      arelineb: 0,
      das: 14,
      lockdelay: 30
    },
    {
      level: 500,
      are: 25,
      areline: 25,
      arelineb: 0,
      das: 8,
      lockdelay: 30
    },
    {
      level: 600,
      are: 25,
      areline: 16,
      arelineb: -9,
      das: 8,
      lockdelay: 30
    },
    {
      level: 700,
      are: 16,
      areline: 12,
      arelineb: -4,
      das: 8,
      lockdelay: 30
    },
    {
      level: 800,
      are: 12,
      areline: 6,
      arelineb: -6,
      das: 8,
      lockdelay: 30
    },
    {
      level: 900,
      are: 12,
      areline: 6,
      arelineb: -6,
      das: 6,
      lockdelay: 17
    },
    {
      level: 1e3,
      are: 6,
      areline: 6,
      arelineb: 0,
      das: 6,
      lockdelay: 17
    },
    {
      level: 1100,
      are: 5,
      areline: 6,
      arelineb: 0,
      das: 6,
      lockdelay: 15
    },
    {
      level: 1200,
      are: 4,
      areline: 6,
      arelineb: 0,
      das: 6,
      lockdelay: 15
    },
    {
      level: 99999999999999,
      are: 4,
      areline: 6,
      das: 6,
      lockdelay: 15
    }
  ];
  var TetroI = [
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0]
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ];
  var TetroJ = [
    [
      [2, 2, 0, 0],
      [0, 2, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [2, 2, 2, 0],
      [2, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 2, 0, 0],
      [0, 2, 0, 0],
      [0, 2, 2, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 2, 0],
      [2, 2, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ];
  var TetroL = [
    [
      [0, 3, 0, 0],
      [0, 3, 0, 0],
      [3, 3, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [3, 3, 3, 0],
      [0, 0, 3, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 3, 3, 0],
      [0, 3, 0, 0],
      [0, 3, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [3, 0, 0, 0],
      [3, 3, 3, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ];
  var TetroO = [
    [
      [0, 0, 0, 0],
      [4, 4, 0, 0],
      [4, 4, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [4, 4, 0, 0],
      [4, 4, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [4, 4, 0, 0],
      [4, 4, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [4, 4, 0, 0],
      [4, 4, 0, 0],
      [0, 0, 0, 0]
    ]
  ];
  var TetroS = [
    [
      [0, 5, 0, 0],
      [5, 5, 0, 0],
      [5, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [5, 5, 0, 0],
      [0, 5, 5, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 5, 0],
      [0, 5, 5, 0],
      [0, 5, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [5, 5, 0, 0],
      [0, 5, 5, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ];
  var TetroT = [
    [
      [0, 6, 0, 0],
      [6, 6, 0, 0],
      [0, 6, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [6, 6, 6, 0],
      [0, 6, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 6, 0, 0],
      [0, 6, 6, 0],
      [0, 6, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 6, 0, 0],
      [6, 6, 6, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ];
  var TetroZ = [
    [
      [7, 0, 0, 0],
      [7, 7, 0, 0],
      [0, 7, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [0, 7, 7, 0],
      [7, 7, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 7, 0, 0],
      [0, 7, 7, 0],
      [0, 0, 7, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 7, 7, 0],
      [7, 7, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ];
  var RectI = [
    [0, 1, 4, 2],
    [2, 0, 3, 4],
    [0, 2, 4, 3],
    [1, 0, 2, 4]
  ];
  var RectJ = [
    [0, 0, 3, 2],
    [1, 0, 3, 3],
    [0, 1, 3, 3],
    [0, 0, 2, 3]
  ];
  var RectL = [
    [0, 0, 3, 2],
    [1, 0, 3, 3],
    [0, 1, 3, 3],
    [0, 0, 2, 3]
  ];
  var RectO = [
    [1, 0, 3, 2],
    [1, 0, 3, 2],
    [1, 0, 3, 2],
    [1, 0, 3, 2]
  ];
  var RectS = [
    [0, 0, 3, 2],
    [1, 0, 3, 3],
    [0, 1, 3, 3],
    [0, 0, 2, 3]
  ];
  var RectT = [
    [0, 0, 3, 2],
    [1, 0, 3, 3],
    [0, 1, 3, 3],
    [0, 0, 2, 3]
  ];
  var RectZ = [
    [0, 0, 3, 2],
    [1, 0, 3, 3],
    [0, 1, 3, 3],
    [0, 0, 2, 3]
  ];
  var SpinCheckI = {
    highX: [
      [1, 2, 2, 1],
      [1, 3, 1, 3],
      [1, 2, 2, 1],
      [0, 2, 0, 2]
    ],
    highY: [
      [0, 2, 0, 2],
      [1, 2, 2, 1],
      [1, 3, 1, 3],
      [1, 2, 2, 1]
    ],
    lowX: [
      [-1, 4, -1, 4],
      [2, 2, 2, 2],
      [-1, 4, -1, 4],
      [1, 1, 1, 1]
    ],
    lowY: [
      [1, 1, 1, 1],
      [-1, 4, -1, 4],
      [2, 2, 2, 2],
      [-1, 4, -1, 4]
    ]
  };
  var SpinCheckJ = {
    highX: [
      [1, 2],
      [2, 2],
      [1, 0],
      [0, 0]
    ],
    highY: [
      [0, 0],
      [1, 2],
      [2, 2],
      [1, 0]
    ],
    lowX: [
      [0, 2],
      [0, 0],
      [2, 0],
      [2, 2]
    ],
    lowY: [
      [2, 2],
      [0, 2],
      [0, 0],
      [2, 0]
    ]
  };
  var SpinCheckL = {
    highX: [
      [1, 0],
      [2, 2],
      [1, 2],
      [0, 0]
    ],
    highY: [
      [0, 0],
      [1, 0],
      [2, 2],
      [1, 2]
    ],
    lowX: [
      [2, 0],
      [0, 0],
      [0, 2],
      [2, 2]
    ],
    lowY: [
      [2, 2],
      [2, 0],
      [0, 0],
      [0, 3]
    ]
  };
  var SpinCheckS = {
    highX: [
      [0, 2],
      [1, 2],
      [2, 0],
      [1, 0]
    ],
    highY: [
      [0, 1],
      [2, 0],
      [2, 1],
      [0, 2]
    ],
    lowX: [
      [0, -1],
      [1, 2],
      [-1, 3],
      [1, 0]
    ],
    lowY: [
      [0, 1],
      [-1, 3],
      [2, 1],
      [3, -1]
    ]
  };
  var SpinCheckT = {
    highX: [
      [0, 2],
      [2, 2],
      [0, 2],
      [0, 0]
    ],
    highY: [
      [0, 0],
      [0, 2],
      [2, 2],
      [0, 2]
    ],
    lowX: [
      [0, 2],
      [0, 0],
      [0, 2],
      [2, 2]
    ],
    lowY: [
      [2, 2],
      [0, 2],
      [0, 0],
      [0, 2]
    ]
  };
  var SpinCheckZ = {
    highX: [
      [2, 0],
      [2, 1],
      [0, 2],
      [0, 1]
    ],
    highY: [
      [0, 1],
      [2, 0],
      [2, 1],
      [0, 2]
    ],
    lowX: [
      [-1, 3],
      [2, 1],
      [3, -1],
      [0, 1]
    ],
    lowY: [
      [0, 1],
      [-1, 3],
      [2, 1],
      [3, -1]
    ]
  };
  var WKTableSRSI_R = [
    [
      [0, 0],
      [-2, 0],
      [1, 0],
      [-2, 1],
      [1, -2]
    ],
    [
      [0, 0],
      [-1, 0],
      [2, 0],
      [-1, -2],
      [2, 1]
    ],
    [
      [0, 0],
      [2, 0],
      [-1, 0],
      [2, -1],
      [-1, 2]
    ],
    [
      [0, 0],
      [1, 0],
      [-2, 0],
      [1, 2],
      [-2, -1]
    ]
  ];
  var WKTableSRSI_L = [
    [
      [0, 0],
      [-1, 0],
      [2, 0],
      [-1, -2],
      [2, 1]
    ],
    [
      [0, 0],
      [2, 0],
      [-1, 0],
      [2, -1],
      [-1, 2]
    ],
    [
      [0, 0],
      [1, 0],
      [-2, 0],
      [1, 2],
      [-2, -1]
    ],
    [
      [0, 0],
      [-2, 0],
      [1, 0],
      [-2, 1],
      [1, -2]
    ]
  ];
  var WKTableSRSI_2 = [
    [
      [0, 0],
      [-1, 0],
      [-2, 0],
      [1, 0],
      [2, 0],
      [0, 1]
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, -1],
      [0, -2],
      [-1, 0]
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [-1, 0],
      [-2, 0],
      [0, -1]
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, -1],
      [0, -2],
      [1, 0]
    ]
  ];
  var WKTableSRSX_R = [
    [
      [0, 0],
      [-1, 0],
      [-1, -1],
      [0, 2],
      [-1, 2]
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, -2],
      [1, -2]
    ],
    [
      [0, 0],
      [1, 0],
      [1, -1],
      [0, 2],
      [1, 2]
    ],
    [
      [0, 0],
      [-1, 0],
      [-1, 1],
      [0, -2],
      [-1, -2]
    ]
  ];
  var WKTableSRSX_L = [
    [
      [0, 0],
      [1, 0],
      [1, -1],
      [0, 2],
      [1, 2]
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, -2],
      [1, -2]
    ],
    [
      [0, 0],
      [-1, 0],
      [-1, -1],
      [0, 2],
      [-1, 2]
    ],
    [
      [0, 0],
      [-1, 0],
      [-1, 1],
      [0, -2],
      [-1, -2]
    ]
  ];
  var WKTableSRSX_2 = [
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [1, 1],
      [2, 1],
      [-1, 0],
      [-2, 0],
      [-1, 1],
      [-2, 1],
      [0, -1],
      [3, 0],
      [-3, 0]
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [-1, 1],
      [-1, 2],
      [0, -1],
      [0, -2],
      [-1, -1],
      [-1, -2],
      [1, 0],
      [0, 3],
      [0, -3]
    ],
    [
      [0, 0],
      [-1, 0],
      [-2, 0],
      [-1, -1],
      [-2, -1],
      [1, 0],
      [2, 0],
      [1, -1],
      [2, -1],
      [0, 1],
      [-3, 0],
      [3, 0]
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 1],
      [1, 2],
      [0, -1],
      [0, -2],
      [1, -1],
      [1, -2],
      [-1, 0],
      [0, 3],
      [0, -3]
    ]
  ];
  var WKTableSRSI = [WKTableSRSI_R, WKTableSRSI_L, WKTableSRSI_2];
  var WKTableSRSX = [WKTableSRSX_R, WKTableSRSX_L, WKTableSRSX_2];
  var WKTableSRS = [
    WKTableSRSI,
    WKTableSRSX,
    WKTableSRSX,
    WKTableSRSX,
    WKTableSRSX,
    WKTableSRSX,
    WKTableSRSX
  ];
  var WKTableCultris = [
    [0, 0],
    [-1, 0],
    [1, 0],
    [0, 1],
    [-1, 1],
    [1, 1],
    [-2, 0],
    [2, 0],
    [0, -1]
  ];
  var WKTableDRS_R = [
    [0, 0],
    [1, 0],
    [-1, 0],
    [0, 1],
    [1, 1],
    [-1, 1],
    [0, -1]
  ];
  var WKTableDRS_L = [
    [0, 0],
    [-1, 0],
    [1, 0],
    [0, 1],
    [-1, 1],
    [1, 1],
    [0, -1]
  ];
  var WKTableDRS = [WKTableDRS_R, WKTableDRS_L, WKTableDRS_L];
  var WKTableDX_R = [
    [
      [0, 0],
      [-1, -1]
    ],
    [
      [0, 0],
      [1, -1]
    ],
    [
      [0, 0],
      [1, 1]
    ],
    [
      [0, 0],
      [-1, 1]
    ]
  ];
  var WKTableDX_L = [
    [
      [0, 0],
      [1, -1]
    ],
    [
      [0, 0],
      [1, 1]
    ],
    [
      [0, 0],
      [-1, 1]
    ],
    [
      [0, 0],
      [-1, -1]
    ]
  ];
  var WKTableDX_2 = [
    [
      [0, 0],
      [0, -2]
    ],
    [
      [0, 0],
      [-2, 0]
    ],
    [
      [0, 0],
      [0, 2]
    ],
    [
      [0, 0],
      [2, 0]
    ]
  ];
  var WKTableDX = [WKTableDX_R, WKTableDX_L, WKTableDX_2];
  var OffsetSRS = [
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ]
  ];
  var OffsetARS = [
    [
      [0, 0],
      [0, 0],
      [0, -1],
      [1, 0]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ],
    [
      [0, 1],
      [-1, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [1, 0]
    ]
  ];
  var OffsetDRS = [
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0]
    ]
  ];
  var OffsetQRS = [
    [
      [0, 0],
      [0, 0],
      [0, -1],
      [1, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, -1],
      [1, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, -1],
      [1, 0]
    ]
  ];
  var OffsetAtari = [
    [
      [0, -1],
      [-1, 0],
      [0, -2],
      [0, 0]
    ],
    [
      [0, 0],
      [-1, 0],
      [0, -1],
      [0, 0]
    ],
    [
      [0, 0],
      [-1, 0],
      [0, -1],
      [0, 0]
    ],
    [
      [-2, 0],
      [-2, 0],
      [-2, 0],
      [-2, 0]
    ],
    [
      [0, 0],
      [-1, 0],
      [0, -1],
      [0, 0]
    ],
    [
      [0, 0],
      [-1, 0],
      [0, -1],
      [0, 0]
    ],
    [
      [0, 0],
      [-1, 0],
      [0, -1],
      [0, 0]
    ]
  ];
  var OffsetNBlox = [
    [
      [0, 0],
      [-1, 0],
      [0, -1],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [1, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [1, 0]
    ]
  ];
  var OffsetNintendo = [
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [1, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
      [2, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
      [2, 0]
    ]
  ];
  var OffsetMS = [
    [
      [0, 0],
      [0, 0],
      [0, -1],
      [1, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ],
    [
      [1, 1],
      [0, 1],
      [1, 0],
      [1, 1]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 1],
      [0, 1],
      [1, 0],
      [1, 1]
    ]
  ];
  var OffsetE60 = [
    [
      [0, 0],
      [0, 0],
      [0, -1],
      [1, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
      [2, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
      [2, 0]
    ]
  ];
  var OffsetJJSRS = [
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ]
  ];
  var Offset5000 = [
    [
      [0, 1],
      [-1, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, -1],
      [1, 0]
    ],
    [
      [0, 1],
      [-1, 0],
      [0, -1],
      [1, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, -1],
      [1, 0]
    ]
  ];
  var OffsetPlus = [
    [
      [0, 0],
      [0, 0],
      [0, -1],
      [1, 0]
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ],
    [
      [1, 1],
      [0, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
      [2, 0]
    ]
  ];
  var OffsetDX = [
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ]
  ];
  var InitInfoSRS = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  var InitInfoARS = [
    [0, 0, 0],
    [0, 0, 2],
    [0, 0, 2],
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 2],
    [0, 1, 0]
  ];
  var InitInfoDRS = [
    [0, 1, 0],
    [0, 0, 2],
    [0, 0, 2],
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 2],
    [0, 1, 0]
  ];
  var InitInfoQRS = [
    [0, 0, 0],
    [0, 0, 1],
    [0, 0, 3],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 2],
    [0, 0, 0]
  ];
  var InitInfoAtari = [
    [1, 0, 0],
    [1, 0, 2],
    [1, 0, 2],
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 2],
    [1, 1, 0]
  ];
  var InitInfoNBlox = [
    [0, 0, 0],
    [0, 0, 2],
    [0, 0, 2],
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 2],
    [0, 1, 0]
  ];
  var InitInfoNintendo = [
    [0, 0, 0],
    [1, 0, 2],
    [1, 0, 2],
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 2],
    [1, 1, 0]
  ];
  var InitInfoMS = [
    [0, 0, 0],
    [1, 0, 2],
    [1, 0, 2],
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 2],
    [1, 1, 0]
  ];
  var InitInfoE60 = [
    [0, 0, 0],
    [1, 0, 2],
    [1, 0, 2],
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 2],
    [1, 1, 0]
  ];
  var InitInfoJJSRS = [
    [0, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [0, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0]
  ];
  var InitInfo5000 = [
    [0, 0, 3],
    [0, 0, 1],
    [1, 0, 3],
    [0, 0, 0],
    [0, 0, 0],
    [0, -1, 2],
    [0, 0, 0]
  ];
  var InitInfoPlus = [
    [0, 0, 0],
    [1, 0, 2],
    [1, 0, 2],
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 2],
    [1, 1, 0]
  ];
  var InitInfoDX = [
    [0, 0, 0],
    [0, 0, 2],
    [0, 0, 2],
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 2],
    [0, 1, 0]
  ];
  var ColorSRS = [1, 2, 3, 4, 5, 6, 7];
  var ColorARS = [7, 2, 3, 4, 6, 1, 5];
  var ColorQRS = [7, 1, 3, 4, 5, 6, 2];
  var ColorTengen = [7, 3, 6, 2, 5, 4, 1];
  var ColorAtari = [7, 4, 6, 2, 1, 5, 3];
  var ColorNBlox = [3, 6, 2, 7, 1, 4, 5];
  var ColorC2 = [5, 2, 6, 4, 1, 7, 9];
  var ColorNintendo = [9, 2, 7, 9, 2, 9, 7];
  var ColorMS = [7, 6, 4, 1, 2, 8, 5];
  var ColorE60 = [5, 5, 5, 5, 5, 5, 5];
  var ColorIBM = [7, 9, 6, 2, 5, 3, 1];
  var ColorJJSRS = [5, 1, 3, 4, 7, 6, 2];
  var Color5000 = [7, 6, 8, 4, 5, 1, 2];
  var ColorDX = [9, 7, 2, 4, 3, 5, 6];
  var RotSysData = [
    {
      initinfo: InitInfoSRS,
      offset: OffsetSRS,
      color: ColorSRS,
      id: 0 /* Super */
    },
    {
      initinfo: InitInfoSRS,
      offset: OffsetSRS,
      color: ColorC2,
      id: 1 /* C2 */
    },
    {
      initinfo: InitInfoARS,
      offset: OffsetARS,
      color: ColorARS,
      id: 2 /* Arika */
    },
    {
      initinfo: InitInfoDRS,
      offset: OffsetDRS,
      color: ColorARS,
      id: 3 /* DTET */
    },
    {
      initinfo: InitInfoQRS,
      offset: OffsetQRS,
      color: ColorQRS,
      id: 4 /* QQ */
    },
    {
      initinfo: InitInfoAtari,
      offset: OffsetAtari,
      color: ColorAtari,
      id: 5 /* Atari */
    },
    {
      initinfo: InitInfoAtari,
      offset: OffsetAtari,
      color: ColorTengen,
      id: 6 /* Tengen */
    },
    {
      initinfo: InitInfoNBlox,
      offset: OffsetNBlox,
      color: ColorNBlox,
      id: 7 /* N-Blox */
    },
    {
      initinfo: InitInfoNintendo,
      offset: OffsetNintendo,
      color: ColorNintendo,
      id: 8 /* Nintendo */
    },
    {
      initinfo: InitInfoMS,
      offset: OffsetMS,
      color: ColorMS,
      id: 9 /* MS */
    },
    {
      initinfo: InitInfoE60,
      offset: OffsetE60,
      color: ColorE60,
      id: 10 /* E-60 */
    },
    {
      initinfo: InitInfoE60,
      offset: OffsetE60,
      color: ColorIBM,
      id: 11 /* IBM PC */
    },
    {
      initinfo: InitInfoJJSRS,
      offset: OffsetJJSRS,
      color: ColorJJSRS,
      id: 12 /* JJ */
    },
    {
      initinfo: InitInfo5000,
      offset: Offset5000,
      color: Color5000,
      id: 13 /* 5k */
    },
    {
      initinfo: InitInfoPlus,
      offset: OffsetPlus,
      color: ColorARS,
      id: 14 /* Plus */
    },
    {
      initinfo: InitInfoDX,
      offset: OffsetDX,
      color: ColorDX,
      id: 15 /* DX */
    }
  ];
  var PieceData = {
    I: {
      index: 0 /* I */,
      tetro: TetroI,
      rect: RectI,
      spin: SpinCheckI
    },
    J: {
      index: 1 /* J */,
      tetro: TetroJ,
      rect: RectJ,
      spin: SpinCheckJ
    },
    L: {
      index: 2 /* L */,
      tetro: TetroL,
      rect: RectL,
      spin: SpinCheckL
    },
    O: {
      index: 3 /* O */,
      tetro: TetroO,
      rect: RectO,
      spin: void 0
    },
    S: {
      index: 4 /* S */,
      tetro: TetroS,
      rect: RectS,
      spin: SpinCheckS
    },
    T: {
      index: 5 /* T */,
      tetro: TetroT,
      rect: RectT,
      spin: SpinCheckT
    },
    Z: {
      index: 6 /* Z */,
      tetro: TetroZ,
      rect: RectZ,
      spin: SpinCheckZ
    }
  };
  var pieces = [
    PieceData.I,
    PieceData.J,
    PieceData.L,
    PieceData.O,
    PieceData.S,
    PieceData.T,
    PieceData.Z
  ];
  var finesse = [
    [
      [1, 2, 1, 0, 1, 2, 1],
      [2, 2, 2, 2, 1, 1, 2, 2, 2, 2],
      [1, 2, 1, 0, 1, 2, 1],
      [2, 2, 2, 2, 1, 1, 2, 2, 2, 2]
    ],
    [
      [1, 2, 1, 0, 1, 2, 2, 1],
      [2, 2, 3, 2, 1, 2, 3, 3, 2],
      [2, 3, 2, 1, 2, 3, 3, 2],
      [2, 3, 2, 1, 2, 3, 3, 2, 2]
    ],
    [
      [1, 2, 1, 0, 1, 2, 2, 1],
      [2, 2, 3, 2, 1, 2, 3, 3, 2],
      [2, 3, 2, 1, 2, 3, 3, 2],
      [2, 3, 2, 1, 2, 3, 3, 2, 2]
    ],
    [
      [1, 2, 2, 1, 0, 1, 2, 2, 1],
      [1, 2, 2, 1, 0, 1, 2, 2, 1],
      [1, 2, 2, 1, 0, 1, 2, 2, 1],
      [1, 2, 2, 1, 0, 1, 2, 2, 1]
    ],
    [
      [1, 2, 1, 0, 1, 2, 2, 1],
      [2, 2, 2, 1, 1, 2, 3, 2, 2],
      [1, 2, 1, 0, 1, 2, 2, 1],
      [2, 2, 2, 1, 1, 2, 3, 2, 2]
    ],
    [
      [1, 2, 1, 0, 1, 2, 2, 1],
      [2, 2, 3, 2, 1, 2, 3, 3, 2],
      [2, 3, 2, 1, 2, 3, 3, 2],
      [2, 3, 2, 1, 2, 3, 3, 2, 2]
    ],
    [
      [1, 2, 1, 0, 1, 2, 2, 1],
      [2, 2, 2, 1, 1, 2, 3, 2, 2],
      [1, 2, 1, 0, 1, 2, 2, 1],
      [2, 2, 2, 1, 1, 2, 3, 2, 2]
    ]
  ];
  var arrRowGen = {
    simple(arr, offset, range2, width) {
      const holex = randomInt(0, range2) + offset;
      for (let x3 = 0; x3 < width; x3++) {
        arr[holex + x3] = 0;
      }
    },
    simplemessy(arr, ratio, width) {
      let hashole = false;
      for (let x3 = 0; x3 < width; x3++) {
        if (rng.next() >= ratio) {
          hashole = true;
          arr[x3] = 0;
        }
      }
      if (hashole === false) {
        arr[randomInt(0, 10)] = 0;
      }
    }
  };
  var arrStages = [
    {
      begin: 0,
      delay: 60 * 5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 7, 4);
      }
    },
    {
      begin: 5,
      delay: 60 * 7,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 7, 4);
      }
    },
    {
      begin: 20,
      delay: 60 * 5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 7, 4);
      }
    },
    {
      begin: 40,
      delay: 60 * 4,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 2, 3, 4);
      }
    },
    {
      begin: 50,
      delay: 60 * 2,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 4, 1, 2);
      }
    },
    {
      begin: 70,
      delay: 60 * 5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 9, 2);
      }
    },
    {
      begin: 80,
      delay: 60 * 4,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 9, 2);
      }
    },
    {
      begin: 90,
      delay: 60 * 3,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 9, 2);
      }
    },
    {
      begin: 100,
      delay: 60 * 4,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 120,
      delay: 60 * 3.5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 150,
      delay: 60 * 4,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 7, 4);
      }
    },
    {
      begin: 170,
      delay: 60 * 3.5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 7, 4);
      }
    },
    {
      begin: 200,
      delay: 60 * 3.5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 220,
      delay: 60 * 3,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 250,
      delay: 60 * 2.5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 9, 2);
      }
    },
    {
      begin: 300,
      delay: 60 * 3.5,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.9, stack2.width);
      }
    },
    {
      begin: 320,
      delay: 60 * 3,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.9, stack2.width);
      }
    },
    {
      begin: 350,
      delay: 60 * 3.5,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.8, stack2.width);
      }
    },
    {
      begin: 390,
      delay: 60 * 3,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.8, stack2.width);
      }
    },
    {
      begin: 400,
      delay: 60 * 4,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.6, stack2.width);
      }
    },
    {
      begin: 430,
      delay: 60 * 5,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.4, stack2.width);
      }
    },
    {
      begin: 450,
      delay: 60 * 7,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.1, stack2.width);
      }
    },
    {
      begin: 470,
      delay: 60 * 7,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.4, stack2.width);
      }
    },
    {
      begin: 500,
      delay: 60 * 3,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.8, stack2.width);
      }
    },
    {
      begin: 550,
      delay: 60 * 2.5,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.8, stack2.width);
      }
    },
    {
      begin: 600,
      delay: 60 * 3,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.6, stack2.width);
      }
    },
    {
      begin: 650,
      delay: 60 * 2.5,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.6, stack2.width);
      }
    },
    {
      begin: 700,
      delay: 60 * 3.5,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.4, stack2.width);
      }
    },
    {
      begin: 750,
      delay: 60 * 3,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.4, stack2.width);
      }
    },
    {
      begin: 780,
      delay: 60 * 2.5,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.4, stack2.width);
      }
    },
    {
      begin: 800,
      delay: 60 * 2,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.9, stack2.width);
      }
    },
    {
      begin: 900,
      delay: 60 * 1.75,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 950,
      delay: 60 * 1.5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 1e3,
      delay: 60 * 5,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0, stack2.width);
      }
    },
    {
      begin: 1020,
      delay: 60 * 4,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0, stack2.width);
      }
    },
    {
      begin: 1050,
      delay: 60 * 4,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 1, 1, 8);
      }
    },
    {
      begin: 1100,
      delay: 60 * 3,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 2, 1, 6);
      }
    },
    {
      begin: 1150,
      delay: 60 * 3,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 3, 1, 4);
      }
    },
    {
      begin: 1200,
      delay: 60 * 2,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 4, 1, 2);
      }
    },
    {
      begin: 1210,
      delay: 60 * 1.5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 4, 1, 2);
      }
    },
    {
      begin: 1210,
      delay: 60 * 1,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 4, 1, 2);
      }
    },
    {
      begin: 1250,
      delay: 60 * 2,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 9, 1, 1);
      }
    },
    {
      begin: 1260,
      delay: 60 * 0.5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 9, 1, 1);
      }
    },
    {
      begin: 1300,
      delay: 60 * 3,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0, stack2.width);
      }
    },
    {
      begin: 1350,
      delay: 60 * 3,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.1, stack2.width);
      }
    },
    {
      begin: 1400,
      delay: 60 * 4,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.15, stack2.width);
      }
    },
    {
      begin: 1450,
      delay: 60 * 4,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.2, stack2.width);
      }
    },
    {
      begin: 1480,
      delay: 60 * 5,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.2, stack2.width);
      }
    },
    {
      begin: 1500,
      delay: 60 * 1.5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 9, 2);
      }
    },
    {
      begin: 1550,
      delay: 60 * 1.4,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 9, 2);
      }
    },
    {
      begin: 1600,
      delay: 60 * 1.3,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 9, 2);
      }
    },
    {
      begin: 1650,
      delay: 60 * 1.2,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 9, 2);
      }
    },
    {
      begin: 1700,
      delay: 60 * 1.3,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 1800,
      delay: 60 * 1.2,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 1850,
      delay: 60 * 1.15,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 1900,
      delay: 60 * 1.1,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 1950,
      delay: 60 * 1.05,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2e3,
      delay: 60 * 1,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2050,
      delay: 60 * 0.95,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2100,
      delay: 60 * 0.9,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2150,
      delay: 60 * 0.85,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2180,
      delay: 60 * 0.8,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2190,
      delay: 60 * 1,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2200,
      delay: 60 * 0.8,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2300,
      delay: 60 * 0.75,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2400,
      delay: 60 * 0.7,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2450,
      delay: 60 * 0.6,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2500,
      delay: 60 * 0.5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    }
  ];
  var sprintRanks = [
    {
      t: 600,
      u: "\u4FEE\u4ED9\u53BB\u5427",
      b: "Zen"
    },
    {
      t: 540,
      u: "\u6C42\u8FDB9\u5206\u949F",
      b: "9 min...?"
    },
    {
      t: 480,
      u: "\u6C42\u8FDB8\u5206\u949F",
      b: "8 min...?"
    },
    {
      t: 420,
      u: "\u6C42\u8FDB7\u5206\u949F",
      b: "7 min...?"
    },
    {
      t: 360,
      u: "\u6C42\u8FDB6\u5206\u949F",
      b: "6 min...?"
    },
    {
      t: 300,
      u: "\u6C42\u8FDB5\u5206\u949F",
      b: "5 min...?"
    },
    {
      t: 240,
      u: "\u7EC8\u4E8E\u2026\u2026",
      b: "Finally..."
    },
    {
      t: 210,
      u: "<small>\u4F60\u4E00\u5B9A\u662F\u5728\u9017\u6211</small>",
      b: "Too slow."
    },
    {
      t: 180,
      u: "\u6E23\u6E23",
      b: "Well..."
    },
    {
      t: 160,
      u: "<small>\u901F\u5EA6\u901F\u5EA6\u52A0\u5FEB</small>",
      b: "Go faster."
    },
    {
      t: 140,
      u: "<small>\u8FD8\u80FD\u518D\u7ED9\u529B\u70B9\u4E48</small>",
      b: "Any more?"
    },
    {
      t: 120,
      u: "2\u5206\u949F\uFF1F",
      b: "Beat 2 min."
    },
    {
      t: 110,
      u: "\u4E0D\u96BE\u561B",
      b: "So easy."
    },
    {
      t: 100,
      u: "\u65B0\u4E16\u754C",
      b: "New world."
    },
    {
      t: 90,
      u: "\u8D85\u8D8A\u79D2\u9488",
      b: "1 drop/sec!"
    },
    {
      t: 80,
      u: "\u606D\u559C\u5165\u95E8",
      b: "Not bad."
    },
    {
      t: 73,
      u: "\u6E10\u5165\u4F73\u5883",
      b: "Going deeper."
    },
    {
      t: 69,
      u: "\u5C31\u5DEE10\u79D2",
      b: "10 sec faster."
    },
    {
      t: 63,
      u: "\u8FD8\u6709\u51E0\u79D2",
      b: "Approaching."
    },
    {
      t: 60,
      u: "\u6700\u540E\u4E00\u70B9",
      b: "Almost there!"
    },
    {
      t: 56,
      u: "1\u5206\u949F\u5C31\u591F\u4E86",
      b: "1-min Sprinter!"
    },
    {
      t: 53,
      u: "\u5E76\u4E0D\u662F\u6C99\u5305",
      b: "<small>No longer rookie.</small>"
    },
    {
      t: 50,
      u: "50\u4E0D\u662F\u68A6",
      b: "Beat 50."
    },
    {
      t: 48,
      u: "\u6BCF\u79D22\u5757",
      b: "2 drops/sec!"
    },
    {
      t: 45,
      u: "\u5F88\u80FD\u6253\u561B",
      b: "u can tetris."
    },
    {
      t: 42,
      u: "\u6709\u70B9\u5389\u5BB3",
      b: "Interesting."
    },
    {
      t: 40,
      u: "\u4E8E\u662F\u5462\uFF1F",
      b: "So?"
    },
    {
      t: 38,
      u: "\u9AD8\u624B",
      b: "Good."
    },
    {
      t: 35,
      u: "\u505C\u4E0D\u4E0B\u6765",
      b: "Unstoppable."
    },
    {
      t: 33,
      u: "\u89E6\u624B",
      b: "Octopus"
    },
    {
      t: 31,
      u: "\u6BCF\u79D23\u5757",
      b: "3 drops/sec!"
    },
    {
      t: 30,
      u: "\u522B\u8FD9\u6837",
      b: "Noooo"
    },
    {
      t: 29,
      u: "\u4F60\u8D62\u4E86",
      b: "You win."
    },
    {
      t: 27,
      u: "\u8FD9\u4E0D\u9B54\u6CD5",
      b: "Magic."
    },
    {
      t: 25,
      u: "\u95EA\u7535",
      b: "Lightning!"
    },
    {
      t: 24,
      u: "\u6BCF\u79D24\u5757",
      b: "4 drops/sec!"
    },
    {
      t: 23,
      u: "\u795E\u517D",
      b: "Alien."
    },
    {
      t: 22,
      u: "\u795E\u517D\u4ED6\u5988",
      b: "Beats Alien."
    },
    {
      t: 21,
      u: "\u62EF\u6551\u5730\u7403",
      b: "<small>Save the world?</small>"
    },
    {
      t: 20,
      u: "\u4F60\u786E\u5B9A\uFF1F",
      b: "r u sure?"
    },
    {
      t: 19,
      u: "5\u5757\u6BCF\u79D2",
      b: "5pps"
    },
    {
      t: 18,
      u: "\u2026\u2026",
      b: "..."
    },
    {
      t: 16.66,
      u: "\u2026\u2026\u2026\u2026",
      b: "......"
    },
    {
      t: 14.28,
      u: "6\u5757\u6BCF\u79D2",
      b: "6pps"
    },
    {
      t: 12.5,
      u: "7\u5757\u6BCF\u79D2",
      b: "7pps"
    },
    {
      t: 11.11,
      u: "8\u5757\u6BCF\u79D2",
      b: "8pps"
    },
    {
      t: 10,
      u: "9\u5757\u6BCF\u79D2",
      b: "9pps"
    },
    {
      t: 9,
      u: "10\u5757\u6BCF\u79D2",
      b: "10pps"
    },
    {
      t: 0,
      u: "\u2190_\u2190",
      b: "\u2192_\u2192"
    },
    {
      t: -1 / 0,
      u: "\u2191_\u2191",
      b: "\u2193_\u2193"
    }
  ];
  var _Elements = class _Elements {
    static get msg() {
      return $2("msg");
    }
    static get statsIpieces() {
      return $2("ivalue");
    }
    static get stats() {
      return $2("stats");
    }
    static get statsTime() {
      return $2("time");
    }
    static get statsLines() {
      return $2("line");
    }
    static get statsPiece() {
      return $2("piece");
    }
    static get statsFinesse() {
      return $2("finesse");
    }
    static get statsScore() {
      return $2("score");
    }
    static get statsLevel() {
      return $2("level");
    }
    static get h3() {
      return $$("h3");
    }
    static get set() {
      return $2("settings");
    }
    static get leaderboard() {
      return $2("leaderboard");
    }
    static get hidescroll() {
      return $2("hidescroll");
    }
    static get holdCanvas() {
      return $2("hold");
    }
    static get bgStackCanvas() {
      return $2("bgStack");
    }
    static get stackCanvas() {
      return $2("stack");
    }
    static get activeCanvas() {
      return $2("active");
    }
    static get previewCanvas() {
      return $2("preview");
    }
    static get spriteCanvas() {
      return $2("sprite");
    }
    static get timeCanvas() {
      return $$("#time > canvas")[0];
    }
    static get holdCtx() {
      return _Elements.holdCanvas.getContext("2d");
    }
    static get bgStackCtx() {
      return _Elements.bgStackCanvas.getContext("2d");
    }
    static get stackCtx() {
      return _Elements.stackCanvas.getContext("2d");
    }
    static get activeCtx() {
      return _Elements.activeCanvas.getContext("2d");
    }
    static get previewCtx() {
      return _Elements.previewCanvas.getContext("2d");
    }
    static get spriteCtx() {
      return _Elements.spriteCanvas.getContext("2d");
    }
    static get timeCtx() {
      return _Elements.timeCanvas.getContext("2d");
    }
  };
  __decorateClass([
    lazy
  ], _Elements, "msg", 1);
  __decorateClass([
    lazy
  ], _Elements, "statsIpieces", 1);
  __decorateClass([
    lazy
  ], _Elements, "stats", 1);
  __decorateClass([
    lazy
  ], _Elements, "statsTime", 1);
  __decorateClass([
    lazy
  ], _Elements, "statsLines", 1);
  __decorateClass([
    lazy
  ], _Elements, "statsPiece", 1);
  __decorateClass([
    lazy
  ], _Elements, "statsFinesse", 1);
  __decorateClass([
    lazy
  ], _Elements, "statsScore", 1);
  __decorateClass([
    lazy
  ], _Elements, "statsLevel", 1);
  __decorateClass([
    lazy
  ], _Elements, "h3", 1);
  __decorateClass([
    lazy
  ], _Elements, "set", 1);
  __decorateClass([
    lazy
  ], _Elements, "leaderboard", 1);
  __decorateClass([
    lazy
  ], _Elements, "hidescroll", 1);
  __decorateClass([
    lazy
  ], _Elements, "holdCanvas", 1);
  __decorateClass([
    lazy
  ], _Elements, "bgStackCanvas", 1);
  __decorateClass([
    lazy
  ], _Elements, "stackCanvas", 1);
  __decorateClass([
    lazy
  ], _Elements, "activeCanvas", 1);
  __decorateClass([
    lazy
  ], _Elements, "previewCanvas", 1);
  __decorateClass([
    lazy
  ], _Elements, "spriteCanvas", 1);
  __decorateClass([
    lazy
  ], _Elements, "timeCanvas", 1);
  __decorateClass([
    lazy
  ], _Elements, "holdCtx", 1);
  __decorateClass([
    lazy
  ], _Elements, "bgStackCtx", 1);
  __decorateClass([
    lazy
  ], _Elements, "stackCtx", 1);
  __decorateClass([
    lazy
  ], _Elements, "activeCtx", 1);
  __decorateClass([
    lazy
  ], _Elements, "previewCtx", 1);
  __decorateClass([
    lazy
  ], _Elements, "spriteCtx", 1);
  __decorateClass([
    lazy
  ], _Elements, "timeCtx", 1);
  var Elements = _Elements;
  var gravityUnit = 1 / 64;

  // src/utils/enum.ts
  var regex = /^\d+$/;
  function getStringKeys(obj) {
    return Object.keys(obj).filter((key) => regex.test(obj[key]));
  }

  // src/settings.ts
  var Setting = class {
    constructor(name, defaultValue, validator) {
      this.customGet = (v3) => v3;
      this.name = name;
      this.value = defaultValue;
      this.defaultValue = defaultValue;
      this.validator = validator;
    }
    set(value) {
      if (this.validator(value)) {
        this.value = value;
        return true;
      }
      console.warn(`Invalid value for setting ${this.name}: ${value}`);
      return false;
    }
    get() {
      return this.customGet(this.value);
    }
    displayName() {
      return this.value.toString();
    }
    reset() {
      this.value = this.defaultValue;
    }
    setCustomGet(get) {
      this.customGet = get;
      return this;
    }
    createElement(parent) {
    }
  };
  var EnumSetting = class extends Setting {
    constructor(name, defaultValue, values) {
      super(name, defaultValue, (value) => {
        return values[value] !== void 0;
      });
      this.values = values;
    }
    displayName() {
      return this.values[this.value];
    }
  };
  var RangeSetting = class extends Setting {
    constructor(name, defaultValue, min, max, step = 1) {
      super(name, defaultValue, (value) => {
        if (value >= min && value <= max) {
          this.value = Math.ceil(value / step) * step;
          return true;
        }
        return false;
      });
      this.min = min;
      this.max = max;
      this.step = step;
    }
  };
  var BooleanSetting = class extends Setting {
    constructor(name, defaultValue) {
      super(
        name,
        defaultValue,
        (value) => typeof value === "boolean"
      );
    }
    displayName() {
      return this.value ? "On" : "Off";
    }
  };
  var NamedBooleanSetting = class extends BooleanSetting {
    constructor(name, defaultValue, display) {
      super(name, defaultValue);
      this.display = display;
    }
    displayName() {
      return this.display[this.value ? 0 : 1];
    }
  };
  var gravities = [
    "Auto",
    "0G",
    "1/64G",
    "1/32G",
    "1/16G",
    "1/8G",
    "1/4G",
    "1/2G",
    "1G",
    "20G"
  ];
  var defaultSettings = {
    DAS: new RangeSetting("DAS", 10, 0, 30),
    ARR: new RangeSetting("ARR", 2, 0, 30),
    Gravity: new EnumSetting("Gravity", 0, gravities),
    SoftDrop: new EnumSetting("Soft Drop", 0, gravities),
    LockDelay: new RangeSetting("Lock Delay", 30, 0, 100),
    RotSys: new EnumSetting(
      "Rotation System",
      0,
      getStringKeys(RotSys)
    ).setCustomGet((value) => RotSysData[value]),
    Next: new RangeSetting("Next", 6, 0, 6),
    Size: new EnumSetting("Size", 0, getStringKeys(Size)),
    Sound: new BooleanSetting("Sound", true),
    Volume: new RangeSetting("Volume", 50, 0, 100),
    MusicVol: new RangeSetting("Music Volume", 50, 0, 100),
    Soundbank: new EnumSetting(
      "Soundbank",
      12,
      getStringKeys(Soundbank)
    ),
    NextSound: new BooleanSetting("Next Sound", true),
    NextType: new EnumSetting(
      "Next Type",
      3,
      getStringKeys(NextType)
    ),
    Voice: new BooleanSetting("Voice", false),
    Voicebank: new EnumSetting(
      "Voicebank",
      2,
      getStringKeys(Voicebank)
    ),
    Block: new EnumSetting("Block", 13, getStringKeys(Block)),
    Ghost: new EnumSetting("Ghost", 1, getStringKeys(Ghost)),
    Grid: new BooleanSetting("Grid", true),
    Outline: new EnumSetting("Outline", 1, getStringKeys(Outline)),
    DASCut: new BooleanSetting("DAS Cut", false),
    NextSide: new NamedBooleanSetting("Next Side", false, ["Right", "Left"]),
    Messages: new NamedBooleanSetting("Messages", true, ["Right", "Left"]),
    MatrixSway: new BooleanSetting("Matrix Sway", true),
    IRSMode: new EnumSetting("IRS Mode", 0, getStringKeys(IRSMode)),
    IHSMode: new EnumSetting("IHS Mode", 0, getStringKeys(IHSMode)),
    InitialVis: new BooleanSetting("Initial Visibility", true),
    Monochrome: new BooleanSetting("Monochrome", false),
    ResetPB: new BooleanSetting("Reset PB", false)
  };
  var SettingManager = class {
    #settings = {};
    #currentName = "default";
    setSettings(name, settings2) {
      this.#settings[name] = settings2;
    }
    set(name, value) {
      const val = this.#settings[this.#currentName][name].set(value);
      if (this.#currentName === "default") {
        const settingsCopy = {};
        for (const key in this.#settings.default) {
          settingsCopy[key] = this.#settings.default[key].value;
        }
        localStorage.setItem("settings", JSON.stringify(settingsCopy));
      }
      return val;
    }
    get(name) {
      return this.#settings[this.#currentName][name].get();
    }
    getRaw(name) {
      return this.#settings[this.#currentName][name];
    }
    switchSettings(name) {
      this.#currentName = name;
    }
  };
  for (const name in defaultSettings) {
    Object.defineProperty(SettingManager.prototype, name, {
      get() {
        return this.get(name);
      },
      set(value) {
        this.set(name, value);
      }
    });
  }
  var settings = new SettingManager();
  settings.setSettings("default", defaultSettings);

  // src/display/sound/sound.ts
  var piecetypes = "tgm,npm,tgm1,tetrjs".split(",");
  var gametypes = "ppt,tgm,npm,yotipo,toj,nes,tf,99,com,party,ultimate,ace,tetrjs".split(",");
  var voxtypes = ["alexey", "friends", "toj"];
  var waveData = [
    { path: "alarm", type: "fixed" },
    { path: "bravo", type: "game" },
    { path: "levelup", type: "game" },
    { path: "step", type: "game" },
    { path: "endingstart", type: "ui" },
    { path: "erase1", type: "game" },
    { path: "erase2", type: "game" },
    { path: "erase3", type: "game" },
    { path: "erase4", type: "game" },
    { path: "gameover", type: "ui" },
    { path: "garbage", type: "game" },
    { path: "lock", type: "game" },
    { path: "tspin0", type: "game" },
    { path: "tspin1", type: "game" },
    { path: "tspin2", type: "game" },
    { path: "tspin3", type: "game" },
    { path: "piece0", type: "piece" },
    { path: "piece1", type: "piece" },
    { path: "piece2", type: "piece" },
    { path: "piece3", type: "piece" },
    { path: "piece4", type: "piece" },
    { path: "piece5", type: "piece" },
    { path: "piece6", type: "piece" },
    { path: "harddrop", type: "game" },
    { path: "move", type: "game" },
    { path: "rotate", type: "game" },
    { path: "initialrotate", type: "game" },
    { path: "hold", type: "game" },
    { path: "initialhold", type: "game" },
    { path: "ready", type: "ui" },
    { path: "go", type: "ui" },
    { path: "linefall", type: "game" },
    { path: "b2b_erase4", type: "vox" },
    { path: "b2b_tspin1", type: "vox" },
    { path: "b2b_tspin2", type: "vox" },
    { path: "b2b_tspin3", type: "vox" },
    { path: "erase1", type: "vox" },
    { path: "erase2", type: "vox" },
    { path: "erase3", type: "vox" },
    { path: "erase4", type: "vox" },
    { path: "lose", type: "vox" },
    { path: "ren1", type: "vox" },
    { path: "ren2", type: "vox" },
    { path: "ren3", type: "vox" },
    { path: "tspin0", type: "vox" },
    { path: "tspin1", type: "vox" },
    { path: "tspin2", type: "vox" },
    { path: "tspin3", type: "vox" },
    { path: "win", type: "vox" },
    { path: "ren/ren1", type: "game" },
    { path: "ren/ren2", type: "game" },
    { path: "ren/ren3", type: "game" },
    { path: "ren/ren4", type: "game" },
    { path: "ren/ren5", type: "game" },
    { path: "ren/ren6", type: "game" },
    { path: "ren/ren7", type: "game" },
    { path: "ren/ren8", type: "game" },
    { path: "ren/ren9", type: "game" },
    { path: "ren/ren10", type: "game" },
    { path: "ren/ren11", type: "game" },
    { path: "ren/ren12", type: "game" },
    { path: "ren/ren13", type: "game" },
    { path: "ren/ren14", type: "game" },
    { path: "ren/ren15", type: "game" },
    { path: "ren/ren16", type: "game" },
    { path: "ren/ren17", type: "game" },
    { path: "ren/ren18", type: "game" },
    { path: "ren/ren19", type: "game" },
    { path: "ren/ren20", type: "game" },
    { path: "b2b_erase4", type: "game" },
    { path: "b2b_tspin1", type: "game" },
    { path: "b2b_tspin2", type: "game" },
    { path: "b2b_tspin3", type: "game" },
    { path: "grade1", type: "bgm" },
    { path: "grade2", type: "bgm" },
    { path: "grade3", type: "bgm" },
    { path: "marathon", type: "bgm" },
    { path: "marathon2", type: "bgm" },
    { path: "marathon3", type: "bgm" },
    { path: "master", type: "bgm" },
    { path: "masterstrictdire", type: "bgm" },
    { path: "masterstrict", type: "bgm" },
    { path: "retro", type: "bgm" },
    { path: "retropro", type: "bgm" },
    { path: "retroprodrought", type: "bgm" },
    { path: "sprint", type: "bgm" },
    { path: "survial", type: "bgm" },
    { path: "survialdire", type: "bgm" }
  ];
  var Eles = class {
    static get soundLoadingBar() {
      return $2("sound-loading-bar");
    }
    static get soundLabel() {
      return $2("sound-name");
    }
    static get soundsLoading() {
      return $2("sounds-loading");
    }
  };
  __decorateClass([
    lazy
  ], Eles, "soundLoadingBar", 1);
  __decorateClass([
    lazy
  ], Eles, "soundLabel", 1);
  __decorateClass([
    lazy
  ], Eles, "soundsLoading", 1);
  var sidebgmraised = false;
  var soundsLoaded = 0;
  function addToLoad(name) {
    soundsLoaded++;
    Eles.soundLoadingBar.value = soundsLoaded;
    $setText(Eles.soundLabel, name);
    if (Eles.soundLoadingBar.value === Eles.soundLoadingBar.max) {
      Eles.soundsLoading.classList.add("gone");
    }
  }
  var Sound2 = class {
    constructor() {
      this.sounds = {};
      this.music = {};
      this.voices = {};
      this.soundLoaded = "";
      this.amountToLoad = 0;
    }
    addSound(iname, path, loop) {
      this.sounds[iname] = new import_howler.Howl({
        src: [path],
        volume: settings.Volume / 100,
        loop,
        onload() {
          addToLoad(this._src);
        },
        onloaderror() {
          console.error(`loading ${this._src} failed!`);
        }
      });
    }
    addVoice(iname, path) {
      this.voices[iname] = new import_howler.Howl({
        src: [path],
        volume: settings.Volume / 100,
        onload() {
          addToLoad(this._src);
        }
      });
    }
    addMusic(iname, path) {
      this.music[iname + "start"] = new import_howler.Howl({
        src: [path("start")],
        volume: settings.MusicVol / 100,
        onend: () => {
          this.currentMusic = this.music[this.currentMusicName + "loop"].play();
        }
      });
      this.music[iname + "loop"] = new import_howler.Howl({
        src: [path("loop")],
        volume: settings.MusicVol / 100,
        loop: true
      });
    }
    addSideMusic(iname, path) {
      this.music[iname + "start"] = new import_howler.Howl({
        src: [path("start")],
        volume: 0,
        onend: () => {
          this.currentMusic = this.music[this.sideMusicName + "loop"].play();
        }
      });
      this.music[iname + "loop"] = new import_howler.Howl({
        src: [path("loop")],
        volume: 0,
        loop: true
      });
    }
    init() {
      const soundbank = settings.Soundbank;
      const nextType = settings.NextType;
      const voicebank = settings.Voicebank;
      const nextSound = settings.NextSound;
      const voice = settings.Voice;
      const sound2 = settings.Sound;
      if (`${soundbank} ${nextType} ${voicebank} ${nextSound} ${voice} ${sound2}` === this.soundLoaded) {
        return;
      }
      if (sound2) {
        Eles.soundsLoading.classList.remove("gone");
      }
      soundsLoaded = 0;
      Eles.soundLoadingBar.value = 0;
      this.amountToLoad = waveData.length;
      import_howler.Howler.unload();
      if (!sound2)
        return;
      const navLanguage = navigator.language;
      const languageBase = navLanguage.substring(0, 2);
      for (const { path: iname, type } of waveData) {
        switch (type) {
          case "game":
            this.addSound(
              iname,
              `assets/sfx/game/${gametypes[soundbank]}/${iname}.wav`
            );
            break;
          case "vox":
            if (!voice)
              break;
            this.addVoice(
              iname,
              `assets/vox/${voxtypes[voicebank]}/${iname}.wav`
            );
            break;
          case "ui":
            this.addSound(
              iname,
              `assets/sfx/ui/${gametypes[soundbank]}/${iname}_${soundbank === 12 ? languageBase : ""}.wav`
            );
            break;
          case "piece":
            if (nextSound) {
              let language = "";
              if (nextType === 3) {
                if (navLanguage === "ja" && [
                  "piece1",
                  "piece2",
                  "piece4",
                  "piece6"
                ].indexOf(iname) >= 0) {
                  language = "_jp";
                } else if ((navLanguage === "en-US" || navLanguage === "en") && iname === "piece6") {
                  language = "_us";
                } else if (languageBase === "zh" && iname === "piece6") {
                  language = "_us";
                } else if (languageBase === "es") {
                  language = "_es";
                  if (navLanguage === "es-ES" && iname === "piece6") {
                    language += "_spain";
                  }
                } else if (languageBase === "fr") {
                  language = "_fr";
                }
              }
              this.addSound(
                iname,
                `assets/sfx/piece/${piecetypes[nextType]}/${iname}${language}.wav`
              );
            }
            break;
          case "bgm":
            this.addMusic(iname, (v3) => `assets/bgm/${iname}${v3}.ogg`);
            break;
          case "bgmside":
            this.addSideMusic(
              iname,
              (v3) => `assets/bgm/${iname}${v3}.ogg`
            );
            break;
          case "fixed":
            this.addSound(
              iname,
              `assets/sfx/fixed/${iname}.wav`,
              iname === "alarm"
            );
            break;
        }
      }
      this.soundLoaded = `${soundbank} ${nextType} ${voicebank} ${nextSound} ${voice} ${sound2}`;
      Eles.soundLoadingBar.max = Object.keys(this.sounds).length + Object.keys(this.voices).length;
    }
    updateVolume() {
      for (const currentname in this.music) {
        this.music[currentname].volume(settings.MusicVol / 100);
      }
      for (const currentname in this.sounds) {
        this.sounds[currentname].volume(settings.Volume / 100);
      }
      for (const currentname in this.voices) {
        this.voices[currentname].volume(settings.Volume / 100);
      }
    }
    playSFX(name, arg) {
      let noStop;
      if (name === "ren/ren") {
        noStop = true;
      }
      if (settings.Sound) {
        if (arg !== void 0) {
          name += arg;
        }
        if (noStop !== true) {
          this.sounds[name].stop();
        }
        this.sounds[name].play();
      }
    }
    playvox(name, arg) {
      if (settings.Sound && settings.Voice) {
        if (arg !== void 0) {
          name += arg;
        }
        this.voices[name].stop();
        this.voices[name].play();
      }
    }
    stopSFX(name, arg) {
      if (settings.Sound) {
        if (arg !== void 0) {
          name += arg;
        }
        this.sounds[name].stop();
      }
    }
    loadbgm(name, arg) {
      if (settings.Sound) {
        if (arg !== void 0) {
          name += arg;
        }
        this.music[name + "start"] = new import_howler.Howl({
          src: ["assets/bgm/" + name + "start.ogg"],
          volume: settings.MusicVol / 100,
          onend: () => {
            this.currentMusic = this.music[this.currentMusicName + "loop"].play();
          }
        });
        this.music[name + "loop"] = new import_howler.Howl({
          src: ["assets/bgm/" + name + "loop.ogg"],
          volume: settings.MusicVol / 100,
          loop: true
        });
      }
    }
    loadsidebgm(name, arg) {
      if (settings.Sound) {
        if (arg !== void 0) {
          name += arg;
        }
        this.music[name + "start"] = new import_howler.Howl({
          src: ["assets/bgm/" + name + "start.ogg"],
          volume: 0,
          onend: () => {
            this.sideMusic = this.music[this.sideMusicName + "loop"].play();
          }
        });
        this.music[name + "loop"] = new import_howler.Howl({
          src: ["assets/bgm/" + name + "loop.ogg"],
          volume: 0,
          loop: true
        });
      }
    }
    playbgm(name, arg) {
      if (settings.Sound) {
        if (arg !== void 0) {
          name += arg;
        }
        this.currentMusicName = name;
        this.currentMusic = this.music[name + "start"].play();
      }
    }
    playsidebgm(name, arg) {
      if (settings.Sound) {
        if (arg !== void 0) {
          name += arg;
        }
        this.sideMusicName = name;
        this.sideMusic = this.music[name + "start"].play();
      }
    }
    killbgm() {
      if (settings.Sound) {
        for (const currentname in this.music) {
          this.music[currentname].stop();
        }
      }
    }
    raisesidebgm() {
      sound.syncbgm();
      if (settings.Sound) {
        if (sidebgmraised === false) {
          this.music[this.sideMusicName + "start"].fade(
            0,
            settings.MusicVol / 100,
            500
          );
          this.music[this.sideMusicName + "loop"].fade(
            0,
            settings.MusicVol / 100,
            500
          );
          sidebgmraised = true;
        }
      }
    }
    lowersidebgm() {
      if (!settings.Sound && !sidebgmraised) {
        return;
      }
      const vol = settings.MusicVol;
      const musName = this.sideMusicName;
      if (musName) {
        this.music[musName + "start"].fade(vol / 100, 0, 500);
        this.music[musName + "loop"].fade(vol / 100, 0, 500);
        sidebgmraised = false;
      }
    }
    cutsidebgm() {
      if (!settings.Sound && sidebgmraised !== true)
        return;
      const vol = settings.MusicVol;
      const musName = this.sideMusicName;
      this.music[musName + "start"].fade(vol / 100, 0, 1);
      this.music[musName + "loop"].fade(vol / 100, 0, 1);
      sidebgmraised = false;
    }
    mutebgm() {
      if (settings.Sound) {
        for (const currentname in this.music) {
          this.music[currentname].mute(true);
        }
      }
    }
    unmutebgm() {
      if (settings.Sound) {
        for (const currentname in this.music) {
          this.music[currentname].mute(false);
        }
      }
    }
    seekbgm(arg) {
      if (settings.Sound) {
        for (const currentname in this.music) {
          console.log(this.music[currentname].seek());
          this.music[currentname].seek(arg);
        }
      }
    }
    seeksidebgm(arg) {
      if (settings.Sound) {
        this.music[this.sideMusicName + "start"].seek(arg);
        this.music[this.sideMusicName + "loop"].seek(arg);
      }
    }
    syncbgm(arg) {
      if (settings.Sound) {
        this.music[this.sideMusicName + "start"].seek(
          this.music[this.currentMusicName + "start"].seek()
        );
        this.music[this.sideMusicName + "loop"].seek(
          this.music[this.currentMusicName + "loop"].seek()
        );
      }
    }
  };
  var sound = new Sound2();

  // src/utils/lang.ts
  var strs = {};
  async function getLanguageData(lang) {
    if (!strs[lang]) {
      const data2 = await fetch(`/lang/${lang}.json`);
      if (data2.ok) {
        strs[lang] = data2.json();
      }
    }
  }
  var userLang = navigator.language.substring(0, 2);
  var reg = /%(s|d|b|D)/g;
  function t3(str, ...replacements) {
    let final = strs[userLang][str] ?? strs.en[str];
    if (str && replacements.length > 0) {
      let i4 = 0;
      final = final.replace(reg, () => replacements[i4++]);
      if (final.startsWith("$")) {
        const sliced = final.substring(1);
        final = strs[sliced][userLang];
      }
    }
    return final;
  }

  // node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
  var o3 = 0;
  function e3(_2, e4, n2, t4, f4) {
    var l4, s4, u4 = {};
    for (s4 in e4)
      "ref" == s4 ? l4 = e4[s4] : u4[s4] = e4[s4];
    var a4 = { type: _2, props: u4, key: n2, ref: l4, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --o3, __source: t4, __self: f4 };
    if ("function" == typeof _2 && (l4 = _2.defaultProps))
      for (s4 in l4)
        void 0 === u4[s4] && (u4[s4] = l4[s4]);
    return l.vnode && l.vnode(a4), a4;
  }

  // src/components/utils/Btn.tsx
  function Btn({ click, children, class: clazz = "" }) {
    return /* @__PURE__ */ e3("a", { class: "btn " + clazz, onClick: click, children });
  }

  // src/components/utils/Icon.tsx
  var ids = {
    "rising-arrow": /* @__PURE__ */ e3(d, { children: "\uE8E5" }),
    wrench: /* @__PURE__ */ e3(d, { children: "\uE869" }),
    dpad: /* @__PURE__ */ e3(d, { children: "\uE021" }),
    replay: /* @__PURE__ */ e3(d, { children: "\uE04A" }),
    left: /* @__PURE__ */ e3(d, { children: "\uE5C4" }),
    right: /* @__PURE__ */ e3(d, { children: "\uE5C8" }),
    "soft-drop": /* @__PURE__ */ e3(d, { children: "\uE906" }),
    "hard-drop": /* @__PURE__ */ e3(d, { children: "\uE2C4" }),
    hold: /* @__PURE__ */ e3(d, { children: "\uE8D4" }),
    "rot-right": /* @__PURE__ */ e3(d, { children: "\uE15A" }),
    "rot-left": /* @__PURE__ */ e3(d, { children: "\uE166" }),
    "rot-180": /* @__PURE__ */ e3(d, { children: "\uE5D5" }),
    retry: /* @__PURE__ */ e3(d, { children: "\uE040" }),
    pause: /* @__PURE__ */ e3(d, { children: "\uE034" }),
    save: /* @__PURE__ */ e3(d, { children: "\uE161" })
  };
  function Icon({ id: id2 }) {
    return /* @__PURE__ */ e3("i", { class: "material-icons", children: ids[id2] });
  }

  // src/components/center/menu/menuHooks.tsx
  var menus = [];
  function useMenu(menuId) {
    const [on, setOn] = l2(false);
    y2(() => {
      menus[menuId] = (val) => {
        setOn(val);
        if (val) {
          for (let i4 = 0; i4 < menus.length; i4++) {
            if (i4 !== menuId) {
              menus[i4](false);
            }
          }
        }
      };
      return () => {
        delete menus[menuId];
      };
    });
    return on;
  }
  var id = 0;
  function createMenu({
    title,
    icon,
    id: menuId
  }, Ele) {
    const _id = id++;
    return {
      id: _id,
      button({ op = 1 }) {
        return /* @__PURE__ */ e3(Btn, { click: () => menu(_id, op), children: [
          icon && /* @__PURE__ */ e3(Icon, { id: icon }),
          " ",
          t3(title)
        ] });
      },
      menu() {
        return /* @__PURE__ */ e3("nav", { class: `menu ${useMenu(_id) ? "on" : ""}`, id: menuId, children: /* @__PURE__ */ e3(Ele, {}) });
      }
    };
  }
  var menuStack = [];
  var lastMenuId;
  function menu(menuIndex, stackOper) {
    sound.init();
    if (menuIndex !== void 0) {
      if (menuIndex === -1) {
        for (let i4 = 0; i4 < menus.length; i4++) {
          menus[i4](false);
        }
      } else {
        menus[menuIndex](true);
      }
    }
    switch (stackOper) {
      case 0:
        break;
      case 1:
        if (lastMenuId === void 0) {
          menuStack.push(menuIndex);
          lastMenuId = menuIndex;
        } else {
          menuStack.push(lastMenuId);
          lastMenuId = menuIndex;
        }
        break;
      case -1:
        menu(lastMenuId = menuStack.pop(), 0);
        break;
      default:
        menuStack = [];
        lastMenuId = void 0;
        break;
    }
  }

  // src/leaderboard/replays.ts
  var replaydata = $2("replaydata");
  function tryreplaydata() {
    const strreplay = replaydata.value;
    Game.init("replay", strreplay);
  }
  function showreplaydata(strreplay) {
    replaydata.value = strreplay;
    replaydata.select();
    menu(6, 1);
  }
  function curreplaydata() {
    const objKeys = Mutable.replay.keys;
    Mutable.replay.keys = keysEncode(Mutable.replay.keys);
    const strreplay = JSON.stringify(Mutable.replay);
    Mutable.replay.keys = objKeys;
    return strreplay;
  }
  function run(params) {
    Mutable.watchingReplay = true;
    if (params !== void 0) {
      try {
        if (typeof params !== "string")
          throw "wtf";
        if (params === "" || !params.startsWith("{"))
          throw "please paste replay data, correctly...";
        Mutable.replay = JSON.parse(params);
        if (typeof Mutable.replay !== "object")
          throw "json parse fail";
        if (Mutable.replay.type === void 0 || Mutable.replay.keys === void 0 || Mutable.replay.settings === void 0 || Mutable.replay.seed === void 0) {
          throw "something's missing...";
        }
        Mutable.replay.keys = keysDecode(Mutable.replay.keys);
        if (Mutable.replay.keys === null)
          throw "keys decode fail";
      } catch (e4) {
        alert("invalid replay data... \u56DE\u653E\u6570\u636E\u6709\u8BEF...\n" + e4.toString());
        return;
      }
    }
    Game.type = Mutable.replay.type;
    Game.params = Mutable.replay.params;
    settings.setSettings("replay", Mutable.replay.settings);
    rng.seed = Mutable.replay.seed;
  }

  // src/components/utils/ButtonGroup.tsx
  function ButtonGroup({ onClick, data: data2, selected }) {
    const [selectedIndex, setSelectedIndex] = l2(selected);
    return /* @__PURE__ */ e3("div", { class: "btn-group", children: data2.map((item, index) => /* @__PURE__ */ e3(
      "button",
      {
        onClick: () => {
          onClick(index);
          setSelectedIndex(index);
        },
        ...selectedIndex == index ? { class: "active" } : {},
        children: item
      },
      index
    )) });
  }

  // src/components/settings/GroupSetting.tsx
  function GroupSetting({
    setting,
    onClick,
    data: data2,
    selected
  }) {
    return /* @__PURE__ */ e3(d, { children: [
      /* @__PURE__ */ e3("h4", { class: "option-header", children: t3(`setting-${setting}-title`) }),
      /* @__PURE__ */ e3("p", { class: "option-description", children: t3(`setting-${setting}-desc`) }),
      /* @__PURE__ */ e3(ButtonGroup, { data: data2, selected, onClick })
    ] });
  }

  // src/utils/math.ts
  function mod(v3, n2) {
    return (v3 % n2 + n2) % n2;
  }
  function clamp(v3, min, max) {
    return Math.min(Math.max(v3, min), max);
  }
  function fixed(v3, digits) {
    return Math.round(v3 * Math.pow(10, digits)) / Math.pow(10, digits);
  }

  // src/utils/string.ts
  function padZero(v3) {
    return (v3 < 10 ? "0" : "") + v3.toString();
  }
  function timeString(ms) {
    const seconds = fixed(ms % 6e4 / 1e3, 2);
    const minutes = Math.floor(ms / 6e4);
    return `${padZero(minutes)}:${seconds < 10 ? "0" : ""}${seconds.toFixed(2)}`;
  }

  // src/components/utils/PBView.tsx
  var pbs = {};
  var pbValues = {};
  function setPB(key, value) {
    localStorage.setItem(key, value.toString());
    pbs[key]?.();
    pbValues[key] = value;
  }
  function getPB(key) {
    const pb = pbValues[key];
    if (pb) {
      return pb;
    }
    const pbStr = localStorage.getItem(key);
    if (pbStr) {
      return parseFloat(pbStr);
    }
    return 0;
  }
  function PBView({ name }) {
    const [time, setTime] = l2(getPB(name));
    y2(() => {
      pbs[name] = setTime;
      return () => {
        delete pbs[name];
      };
    });
    return /* @__PURE__ */ e3(d, { children: [
      "Fastest time:",
      " ",
      /* @__PURE__ */ e3("span", { id: "sprint-pb", children: timeString(time) })
    ] });
  }

  // src/components/center/menu/BackBtn.tsx
  function BackBtn() {
    return /* @__PURE__ */ e3(Btn, { click: () => menu(void 0, -1), children: t3("menu-back") });
  }

  // src/components/center/menu/main/gametypes/SprintMenu.tsx
  var {
    button: SprintMenuBtn,
    menu: SprintMenu,
    id: SPRINT_MENU_ID
  } = createMenu({ title: "game-sprint", icon: "rising-arrow" }, () => {
    return /* @__PURE__ */ e3(d, { children: [
      /* @__PURE__ */ e3("h1", { class: "boldish", children: "Sprint" }),
      /* @__PURE__ */ e3("p", { class: "no-margin", children: [
        "Clear the lines as fast as you can!",
        /* @__PURE__ */ e3("br", {}),
        /* @__PURE__ */ e3(PBView, { name: "sprint40pb" })
      ] }),
      /* @__PURE__ */ e3("div", { class: "no-margin btn-container", children: [
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "SprintLimit",
            data: ["40", "100", "200"],
            selected: Game.settings.sprint.limit.val,
            onClick: (index) => {
              changeGameSetting("sprint", "limit", index);
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "SprintPieceSet",
            data: ["Standard", "No I", "I Only"],
            selected: Game.settings.sprint.piece.val,
            onClick: (index) => {
              changeGameSetting("sprint", "piece", index);
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "SprintBackfire",
            data: ["Off", "Low", "Med", "High"],
            selected: Game.settings.sprint.backfire.val,
            onClick: (index) => {
              changeGameSetting("sprint", "backfire", index);
            }
          }
        ),
        /* @__PURE__ */ e3("br", {}),
        /* @__PURE__ */ e3(Btn, { click: () => Game.init(0), class: "btn-inline width-50", children: t3("menu-start") }),
        /* @__PURE__ */ e3(BackBtn, {})
      ] })
    ] });
  });

  // src/components/center/menu/main/gametypes/MarathonMenu.tsx
  var {
    button: MarathonMenuBtn,
    menu: MarathonMenu,
    id: MARATHON_MENU_ID
  } = createMenu(
    {
      title: "game-marathon",
      icon: "rising-arrow"
    },
    () => {
      return /* @__PURE__ */ e3(d, { children: [
        /* @__PURE__ */ e3("h1", { class: "boldish", children: "Marathon" }),
        /* @__PURE__ */ e3("p", { class: "no-margin", children: "Standard game. Aim for a high score." }),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "MarathonGoal",
            data: ["150", "200", "300", "Endless"],
            selected: Game.settings.marathon.limit.val,
            onClick: (index) => {
              changeGameSetting("marathon", "limit", index);
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "MarathonLevelCap",
            data: ["Off", "On"],
            selected: Game.settings.marathon.cap.val,
            onClick: (index) => {
              changeGameSetting("marathon", "cap", index);
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "MarathonEntryDelay",
            data: ["None", "Short", "Long"],
            selected: Game.settings.marathon.delay.val,
            onClick: (index) => {
              changeGameSetting("marathon", "delay", index);
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "MarathonNoGravity",
            data: ["Off", "On"],
            selected: Game.settings.marathon.nograv.val,
            onClick: (index) => {
              changeGameSetting("marathon", "nograv", index);
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "MarathonInvisible",
            data: ["Off", "On"],
            selected: Game.settings.marathon.invisible.val,
            onClick: (index) => {
              changeGameSetting("marathon", "invisible", index);
            }
          }
        ),
        /* @__PURE__ */ e3("br", {}),
        /* @__PURE__ */ e3(Btn, { click: () => Game.init(1), class: "btn-inline width-50", children: t3("menu-start") }),
        /* @__PURE__ */ e3(BackBtn, {})
      ] });
    }
  );

  // src/components/center/menu/main/gametypes/MasterMenu.tsx
  var {
    menu: MasterMenu,
    button: MasterMenuBtn,
    id: MASTER_MENU_ID
  } = createMenu(
    {
      title: "game-master",
      icon: "rising-arrow"
    },
    () => {
      return /* @__PURE__ */ e3(d, { children: [
        /* @__PURE__ */ e3("h1", { class: "boldish", children: "Master" }),
        /* @__PURE__ */ e3("p", { class: "no-margin", children: "Super-fast game. Aim for 300 lines." }),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "MasterLock",
            data: ["Forgiving", "Limited", "Strict"],
            selected: Game.settings.master.lock.val,
            onClick: (index) => {
              changeGameSetting("master", "lock", index);
            }
          }
        ),
        /* @__PURE__ */ e3("br", {}),
        /* @__PURE__ */ e3(Btn, { click: () => Game.init(6), class: "btn-inline width-50", children: t3("menu-start") }),
        /* @__PURE__ */ e3(BackBtn, {})
      ] });
    }
  );

  // src/components/center/menu/main/gametypes/RetroMenu.tsx
  var {
    button: RetroMenuBtn,
    menu: RetroMenu,
    id: RETRO_MENU_ID
  } = createMenu(
    {
      title: "game-retro",
      icon: "rising-arrow"
    },
    () => {
      return /* @__PURE__ */ e3(d, { children: [
        /* @__PURE__ */ e3("h1", { class: "boldish", children: "Retro" }),
        /* @__PURE__ */ e3("p", { class: "no-margin", children: "Classic game with a variety of options." }),
        /* @__PURE__ */ e3("div", { class: "no-margin btn-container", children: [
          /* @__PURE__ */ e3(
            GroupSetting,
            {
              setting: "RetroGameType",
              data: ["A-Type", "B-Type"],
              selected: Game.settings.retro.type.val,
              onClick: (index) => {
                changeGameSetting("retro", "type", index);
              }
            }
          ),
          /* @__PURE__ */ e3(
            GroupSetting,
            {
              setting: "RetroStartingLevel",
              data: range(0, 20).map((v3) => padZero(v3)),
              selected: Game.settings.retro.level.val,
              onClick: (index) => {
                changeGameSetting("retro", "level", index);
              }
            }
          ),
          /* @__PURE__ */ e3(
            GroupSetting,
            {
              setting: "RetroHardDrop",
              data: ["Off", "On"],
              selected: Game.settings.retro.drop.val,
              onClick: (index) => {
                changeGameSetting("retro", "drop", index);
              }
            }
          ),
          /* @__PURE__ */ e3(
            GroupSetting,
            {
              setting: "RetroFlashing",
              data: ["Off", "On"],
              selected: Game.settings.retro.flash.val,
              onClick: (index) => {
                changeGameSetting("retro", "flash", index);
              }
            }
          ),
          /* @__PURE__ */ e3("br", {}),
          /* @__PURE__ */ e3(
            "a",
            {
              class: "btn btn-inline width-50",
              onClick: () => Game.init(8 /* Retro */),
              children: "Start"
            }
          ),
          /* @__PURE__ */ e3(BackBtn, {})
        ] })
      ] });
    }
  );

  // src/components/center/menu/main/gametypes/DigMenu.tsx
  var { menu: DigMenu, button: DigMenuBtn, id: DIG_MENU_ID } = createMenu({
    title: "game-dig",
    icon: "rising-arrow"
  }, () => {
    return /* @__PURE__ */ e3(d, { children: [
      /* @__PURE__ */ e3("h1", { class: "boldish", children: "Dig" }),
      /* @__PURE__ */ e3("p", { class: "no-margin", children: [
        "Clear the bottom as line as soon as possible",
        /* @__PURE__ */ e3("br", {}),
        /* @__PURE__ */ e3(PBView, { name: "dig10pb" })
      ] }),
      /* @__PURE__ */ e3(
        GroupSetting,
        {
          setting: "DigCheese",
          data: ["Off", "On"],
          selected: Game.settings.dig.checker.val ? 1 : 0,
          onClick: (index) => {
            changeGameSetting("dig", "checker", index);
          }
        }
      ),
      /* @__PURE__ */ e3(
        GroupSetting,
        {
          setting: "DigZen",
          data: ["Off", "On"],
          selected: Game.settings.dig.zen.val ? 1 : 0,
          onClick: (index) => {
            changeGameSetting("dig", "zen", index);
          }
        }
      ),
      /* @__PURE__ */ e3("br", {}),
      /* @__PURE__ */ e3(Btn, { click: () => Game.init(4), class: "btn-inline width-50", children: t3("menu-start") }),
      /* @__PURE__ */ e3(BackBtn, {})
    ] });
  });

  // src/components/center/menu/main/gametypes/SurvialMenu.tsx
  var {
    button: SurvialMenuBtn,
    menu: SurvialMenu,
    id: SURVIAL_MENU_ID
  } = createMenu(
    {
      title: "game-survival",
      icon: "rising-arrow"
    },
    () => {
      return /* @__PURE__ */ e3(d, { children: [
        /* @__PURE__ */ e3("h1", { class: "boldish", children: "Survival" }),
        /* @__PURE__ */ e3("p", { class: "no-margin", children: "Clear the bottom as line as soon as possible" }),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "SurvivalZenMode",
            data: ["Off", "On"],
            selected: Game.settings.survival.zen.val,
            onClick: (index) => {
              changeGameSetting("survival", "zen", index);
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "SurvivalStartingLevel",
            data: ["0", "500", "1000", "1500", "2000"],
            selected: Game.settings.survival.slevel.val,
            onClick: (index) => {
              changeGameSetting("survival", "slevel", index);
            }
          }
        ),
        /* @__PURE__ */ e3("br", {}),
        /* @__PURE__ */ e3(Btn, { click: () => Game.init(3), class: "btn-inline width-50", children: t3("menu-start") }),
        /* @__PURE__ */ e3(BackBtn, {})
      ] });
    }
  );

  // src/components/center/menu/main/gametypes/GradesMenu.tsx
  var {
    button: GradesMenuBtn,
    menu: GradesMenu,
    id: GRADES_MENU_ID
  } = createMenu(
    {
      title: "game-grades",
      icon: "rising-arrow"
    },
    () => {
      return /* @__PURE__ */ e3(d, { children: [
        /* @__PURE__ */ e3("h1", { class: "boldish", children: "Grades" }),
        /* @__PURE__ */ e3("p", { class: "no-margin", children: [
          /* @__PURE__ */ e3("span", { style: "color: red", children: "UNFINISHED" }),
          /* @__PURE__ */ e3("br", {}),
          "Play as fast as possible to earn the highest grade!"
        ] }),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "GradesGameRule",
            data: ["Classic", "World"],
            selected: Game.settings.grades.rule.val,
            onClick: (index) => {
              changeGameSetting("grades", "rule", index);
            }
          }
        ),
        /* @__PURE__ */ e3("br", {}),
        /* @__PURE__ */ e3(Btn, { click: () => Game.init(9), class: "btn-inline width-50", children: t3("menu-start") }),
        /* @__PURE__ */ e3(BackBtn, {})
      ] });
    }
  );

  // src/components/settings/GroupListSetting.tsx
  function GroupListSetting({
    setting,
    onClick,
    data: data2,
    selected
  }) {
    return /* @__PURE__ */ e3(d, { children: [
      /* @__PURE__ */ e3("h4", { class: "option-header", children: t3(`setting-${setting}-title`) }),
      /* @__PURE__ */ e3("p", { class: "option-description", children: t3(`setting-${setting}-desc`) }),
      /* @__PURE__ */ e3(ButtonGroup, { data: data2, selected, onClick })
    ] });
  }

  // src/components/settings/GroupSliderSetting.tsx
  function GroupSliderSetting({
    setting,
    onInput,
    getName = (value) => value.toString(),
    value: initValue,
    min,
    max,
    step = 1
  }) {
    const [value, setValue] = l2(initValue);
    return /* @__PURE__ */ e3(d, { children: [
      /* @__PURE__ */ e3("h4", { class: "option-header", children: t3(`setting-${setting}-title`) }),
      /* @__PURE__ */ e3("div", { class: "slidecontainer", children: [
        /* @__PURE__ */ e3(
          "input",
          {
            type: "range",
            min,
            max,
            step,
            value,
            class: "slider",
            onInput: (e4) => {
              const val = parseInt(e4.currentTarget.value);
              setValue(val);
              onInput(val);
            }
          }
        ),
        /* @__PURE__ */ e3("p", { class: "slidervalue", children: getName(value) })
      ] })
    ] });
  }

  // src/components/center/menu/main/settings/AudioMenu.tsx
  var { button: AudioMenuBtn, menu: AudioMenu, id: AUDIO_MENU_ID } = createMenu(
    {
      title: "menu-settings-audio"
    },
    () => {
      return /* @__PURE__ */ e3(d, { children: [
        /* @__PURE__ */ e3("h1", { class: "boldish", children: "Audio" }),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "Sound",
            data: ["Off", "On"],
            selected: settings.Sound ? 1 : 0,
            onClick: (index) => {
              settings.Sound = index === 1;
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupSliderSetting,
          {
            setting: "Volume",
            min: 0,
            max: 100,
            value: settings.Volume ?? 50,
            onInput: (value) => {
              settings.Volume = value;
            },
            getName: (index) => `${index}%`
          }
        ),
        /* @__PURE__ */ e3(
          GroupSliderSetting,
          {
            setting: "MusicVol",
            min: 0,
            max: 100,
            value: settings.MusicVol ?? 50,
            onInput: (value) => {
              settings.MusicVol = value;
            },
            getName: (index) => `${index}%`
          }
        ),
        /* @__PURE__ */ e3(
          GroupListSetting,
          {
            setting: "Soundbank",
            data: getStringKeys(Soundbank),
            selected: settings.Soundbank,
            onClick: (index) => {
              settings.Soundbank = index;
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "NextSound",
            data: ["Off", "On"],
            selected: settings.NextSound ? 1 : 0,
            onClick: (index) => {
              settings.NextSound = index === 1;
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupListSetting,
          {
            setting: "NextType",
            data: getStringKeys(NextType),
            onClick: (index) => {
              settings.NextType = index;
            },
            selected: settings.NextType
          }
        ),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "Voice",
            data: ["Off", "On"],
            selected: settings.Voice ? 1 : 0,
            onClick: (index) => {
              settings.Voice = index === 1;
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupListSetting,
          {
            setting: "Voicebank",
            data: getStringKeys(Voicebank),
            selected: settings.Voicebank,
            onClick: (index) => {
              settings.Voicebank = index;
            }
          }
        ),
        /* @__PURE__ */ e3("br", {}),
        /* @__PURE__ */ e3(BackBtn, {})
      ] });
    }
  );

  // src/utils/keys.ts
  function getFlag(keys, key) {
    return keys & key;
  }
  function setFlag(keys, key) {
    return keys ^ key;
  }

  // src/logic/view.ts
  function bg(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#1c1c1c";
    for (let x3 = -1; x3 < ctx.canvas.width + 1; x3 += Mutable.cellSize) {
      ctx.fillRect(x3, 0, 2, ctx.canvas.height);
    }
    for (let y4 = -1; y4 < ctx.canvas.height + 1; y4 += Mutable.cellSize) {
      ctx.fillRect(0, y4, ctx.canvas.width, 2);
    }
  }
  function drawCell(x3, y4, color, ctx, darkness) {
    const spriteCanvas = Elements.spriteCanvas;
    x3 = Math.floor(x3 * Mutable.cellSize);
    y4 = Math.floor(y4 * Mutable.cellSize);
    ctx.drawImage(
      spriteCanvas,
      color * Mutable.cellSize,
      0,
      Mutable.cellSize,
      Mutable.cellSize,
      x3,
      y4,
      Mutable.cellSize,
      Mutable.cellSize
    );
    if (darkness) {
      ctx.fillStyle = `rgba(0,0,0,${darkness})`;
      ctx.fillRect(x3, y4, Mutable.cellSize, Mutable.cellSize);
    }
  }
  var nes = [
    ["#c1c1c1", "#ffffff00"],
    ["#3ebeff", "#ffffff"],
    ["#0058f8", "#ffffff00"],
    ["#f83800", "#ffffff00"],
    ["#ffa347", "#ffffff"],
    ["#80d010", "#ffffff00"],
    ["#db00cd", "#ffffff"],
    ["#ab0023", "#ffffff00"],
    ["#898989", "#ffffff00"],
    ["#0058f8", "#ffffff"]
  ];
  var tetrjs = [
    ["#EEEEEE", "#E0E0E0", "#BDBDBD"],
    ["#26C6DA", "#00BCD4", "#00ACC1"],
    ["#42A5F5", "#2196F3", "#1E88E5"],
    ["#FFA726", "#FF9800", "#FB8C00"],
    ["#FFEE58", "#FFEB3B", "#FDD835"],
    ["#66BB6A", "#4CAF50", "#43A047"],
    ["#AB47BC", "#9C27B0", "#8E24AA"],
    ["#EF5350", "#F44336", "#E53935"],
    ["#616161", "#424242", "#212121"],
    ["#EEEEEE", "#E0E0E0", "#BDBDBD"]
  ];
  var shaded = [
    // 0         +10        -10        -20
    ["#c1c1c1", "#dddddd", "#a6a6a6", "#8b8b8b"],
    ["#25bb9b", "#4cd7b6", "#009f81", "#008568"],
    ["#3397d9", "#57b1f6", "#007dbd", "#0064a2"],
    ["#e67e23", "#ff993f", "#c86400", "#a94b00"],
    ["#efc30f", "#ffdf3a", "#d1a800", "#b38e00"],
    ["#9ccd38", "#b9e955", "#81b214", "#659700"],
    ["#9c5ab8", "#b873d4", "#81409d", "#672782"],
    ["#e64b3c", "#ff6853", "#c62c25", "#a70010"],
    ["#898989", "#a3a3a3", "#6f6f6f", "#575757"],
    ["#c1c1c1", "#dddddd", "#a6a6a6", "#8b8b8b"]
  ];
  var glossy = [
    //25         37         52         -21        -45
    ["#ffffff", "#ffffff", "#ffffff", "#888888", "#4d4d4d"],
    ["#7bffdf", "#9fffff", "#ccffff", "#008165", "#00442e"],
    ["#6cdcff", "#93feff", "#c2ffff", "#00629f", "#002c60"],
    ["#ffc166", "#ffe386", "#ffffb0", "#aa4800", "#650500"],
    ["#ffff6a", "#ffff8c", "#ffffb8", "#b68a00", "#714f00"],
    ["#efff81", "#ffffa2", "#ffffcd", "#6b9200", "#2c5600"],
    ["#dc9dfe", "#ffbeff", "#ffe9ff", "#5d287e", "#210043"],
    ["#ff9277", "#ffb497", "#ffe0bf", "#a7000a", "#600000"],
    ["#cbcbcb", "#ededed", "#ffffff", "#545454", "#1f1f1f"],
    ["#ffffff", "#ffffff", "#ffffff", "#888888", "#4d4d4d"]
  ];
  var tgm = [
    ["#ababab", "#5a5a5a", "#9b9b9b", "#626262"],
    ["#00e8f0", "#0070a0", "#00d0e0", "#0080a8"],
    ["#00a8f8", "#0000b0", "#0090e8", "#0020c0"],
    ["#f8a800", "#b84000", "#e89800", "#c85800"],
    ["#e8e000", "#886800", "#d8c800", "#907800"],
    ["#78f800", "#007800", "#58e000", "#008800"],
    ["#f828f8", "#780078", "#e020e0", "#880088"],
    ["#f08000", "#a00000", "#e86008", "#b00000"],
    ["#7b7b7b", "#303030", "#6b6b6b", "#363636"],
    ["#ababab", "#5a5a5a", "#9b9b9b", "#626262"]
  ];
  var friends = [
    ["#aeaeae", "#808080", "#909090", "#737373", "#666666", "#373737"],
    ["#5fcefe", "#09aef7", "#21beff", "#0f9bd7", "#098cc4", "#02586c"],
    ["#4786e2", "#2159de", "#3177df", "#2141c6", "#1b46a9", "#012476"],
    ["#feae5f", "#ff7900", "#fc942e", "#e35b02", "#db5802", "#993300"],
    ["#fed678", "#ffb618", "#ffc729", "#e39f02", "#ec8e02", "#996600"],
    ["#9fe732", "#63c710", "#84d718", "#59b101", "#559d0d", "#025c01"],
    ["#db60cf", "#c529a6", "#d33ab9", "#af298a", "#9a2183", "#660066"],
    ["#fe9292", "#f72039", "#fe4e71", "#d70f37", "#c70e33", "#9e0c29"],
    ["#494949", "#353535", "#3c3c3c", "#303030", "#2a2a2a", "#171717"],
    ["#aeaeae", "#808080", "#909090", "#737373", "#666666", "#373737"]
  ];
  var t99 = [
    ["#909090", "#d8d6d6", "#5d5d5d", "#9ea09f", "#797979"],
    ["#00e5ff", "#82ffff", "#00aaba", "#1ce7f7", "#00c2d3"],
    ["#1a00fa", "#4287ff", "#000092", "#202aee", "#0000c4"],
    ["#ff6d08", "#ffa76b", "#d14200", "#fb7325", "#f74800"],
    ["#ffdd0d", "#fff45c", "#d59b00", "#f5c81b", "#f2b200"],
    ["#69ff0c", "#a8ff6f", "#13c500", "#62fc1e", "#2fe900"],
    ["#b400fd", "#ea78fe", "#70009a", "#bf20f0", "#7f00c8"],
    ["#ff093b", "#ff7094", "#ba0625", "#fb0b3f", "#ef0020"],
    ["#5e5e5e", "#a6a4a4", "#3c3c3c", "#303030", "#2a2a2a"],
    ["#909090", "#d8d6d6", "#2b2b2b", "#6d6f6f", "#474747"]
  ];
  var tetcom = [
    ["#bdbdbd", "#7f7f7f", "#e2e2e2", "#333333"],
    ["#32808c", "#006274", "#00dff7", "#012c33"],
    ["#28568d", "#003374", "#008bf3", "#021c3c"],
    ["#926a2f", "#744300", "#f9af00", "#331e00"],
    ["#8d8128", "#746600", "#f6e300", "#332e01"],
    ["#218939", "#007419", "#00f84b", "#00330b"],
    ["#7b2f92", "#580074", "#d300f9", "#270033"],
    ["#8c3232", "#740000", "#f70000", "#330000"],
    ["#3e3e3e", "#2d2d2d", "#606060", "#000000"],
    ["#bdbdbd", "#7f7f7f", "#e2e2e2", "#333333"]
  ];
  var ppt = [
    // border    top side  lr side     down side  cntr fill  lit fill  drk fill
    [
      "#687070",
      "#e8e8e8",
      "#c8ccc8",
      "#b8b8b8",
      "#d5d5d5",
      "#f0f0f0",
      "#c0c4c0"
    ],
    [
      "#086c70",
      "#d0fcf8",
      "#008cd8",
      "#05709d",
      "#00a4d8",
      "#00b4d0",
      "#0094d0"
    ],
    [
      "#001060",
      "#80d4f8",
      "#004cb8",
      "#0038a0",
      "#005cb8",
      "#0098d0",
      "#0044a8"
    ],
    [
      "#703000",
      "#f8dcb0",
      "#f05800",
      "#c85110",
      "#f87400",
      "#f8a400",
      "#f85c00"
    ],
    [
      "#b86000",
      "#f8f4d8",
      "#f8b818",
      "#f8a810",
      "#f8c800",
      "#f8e458",
      "#f8b000"
    ],
    [
      "#104c28",
      "#c0fc78",
      "#78c428",
      "#509828",
      "#68bc28",
      "#78d828",
      "#50a820"
    ],
    [
      "#680088",
      "#f8a8f8",
      "#982c98",
      "#802c98",
      "#902c90",
      "#a82c98",
      "#802480"
    ],
    [
      "#600800",
      "#e89c68",
      "#a01418",
      "#850b00",
      "#d82430",
      "#e86868",
      "#c51923"
    ],
    [
      "#131616",
      "#6d6d6d",
      "#474747",
      "#3f433f",
      "#4c4c4c",
      "#868686",
      "#393c39"
    ],
    [
      "#687070",
      "#e8e8e8",
      "#c8ccc8",
      "#b8b8b8",
      "#d5d5d5",
      "#f0f0f0",
      "#c0c4c0"
    ]
  ];
  function makeSprite() {
    const spriteCanvas = Elements.spriteCanvas;
    const spriteCtx = Elements.spriteCtx;
    spriteCanvas.width = Mutable.cellSize * 10;
    spriteCanvas.height = Mutable.cellSize;
    for (let i4 = 0; i4 < 10; i4++) {
      const iCurrent = i4;
      const x3 = i4 * Mutable.cellSize;
      if (settings.Monochrome) {
        i4 = 0;
      }
      let k3;
      let grad;
      if (settings.Block === 0) {
        spriteCtx.fillStyle = shaded[i4][1];
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        spriteCtx.fillStyle = shaded[i4][3];
        spriteCtx.fillRect(
          x3,
          Mutable.cellSize / 2,
          Mutable.cellSize,
          Mutable.cellSize / 2
        );
        spriteCtx.fillStyle = shaded[i4][0];
        spriteCtx.beginPath();
        spriteCtx.moveTo(x3, 0);
        spriteCtx.lineTo(x3 + Mutable.cellSize / 2, Mutable.cellSize / 2);
        spriteCtx.lineTo(x3, Mutable.cellSize);
        spriteCtx.fill();
        spriteCtx.fillStyle = shaded[i4][2];
        spriteCtx.beginPath();
        spriteCtx.moveTo(x3 + Mutable.cellSize, 0);
        spriteCtx.lineTo(x3 + Mutable.cellSize / 2, Mutable.cellSize / 2);
        spriteCtx.lineTo(x3 + Mutable.cellSize, Mutable.cellSize);
        spriteCtx.fill();
      } else if (settings.Block === 1) {
        spriteCtx.fillStyle = tetrjs[i4][1];
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
      } else if (settings.Block === 2) {
        k3 = Math.max(Math.floor(Mutable.cellSize * 0.1), 1);
        grad = spriteCtx.createLinearGradient(
          x3,
          0,
          x3 + Mutable.cellSize,
          Mutable.cellSize
        );
        grad.addColorStop(0.5, glossy[i4][3]);
        grad.addColorStop(1, glossy[i4][4]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        grad = spriteCtx.createLinearGradient(
          x3,
          0,
          x3 + Mutable.cellSize,
          Mutable.cellSize
        );
        grad.addColorStop(0, glossy[i4][2]);
        grad.addColorStop(0.5, glossy[i4][1]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(
          x3,
          0,
          Mutable.cellSize - k3,
          Mutable.cellSize - k3
        );
        grad = spriteCtx.createLinearGradient(
          x3 + k3,
          k3,
          x3 + Mutable.cellSize - k3,
          Mutable.cellSize - k3
        );
        grad.addColorStop(0, shaded[i4][0]);
        grad.addColorStop(0.5, glossy[i4][0]);
        grad.addColorStop(0.5, shaded[i4][0]);
        grad.addColorStop(1, glossy[i4][0]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(
          x3 + k3,
          k3,
          Mutable.cellSize - k3 * 2,
          Mutable.cellSize - k3 * 2
        );
      } else if (settings.Block === 3) {
        k3 = Math.max(Math.floor(Mutable.cellSize * 0.125), 1);
        spriteCtx.fillStyle = tgm[i4][1];
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        spriteCtx.fillStyle = tgm[i4][0];
        spriteCtx.fillRect(
          x3,
          0,
          Mutable.cellSize,
          Math.floor(Mutable.cellSize / 2)
        );
        grad = spriteCtx.createLinearGradient(
          x3,
          k3,
          x3,
          Mutable.cellSize - k3
        );
        grad.addColorStop(0, tgm[i4][2]);
        grad.addColorStop(1, tgm[i4][3]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(
          x3 + k3,
          k3,
          Mutable.cellSize - k3 * 2,
          Mutable.cellSize - k3 * 2
        );
        grad = spriteCtx.createLinearGradient(x3, k3, x3, Mutable.cellSize);
        grad.addColorStop(0, tgm[i4][0]);
        grad.addColorStop(1, tgm[i4][3]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(x3, k3, k3, Mutable.cellSize - k3);
        grad = spriteCtx.createLinearGradient(
          x3,
          0,
          x3,
          Mutable.cellSize - k3
        );
        grad.addColorStop(0, tgm[i4][2]);
        grad.addColorStop(1, tgm[i4][1]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(
          x3 + Mutable.cellSize - k3,
          0,
          k3,
          Mutable.cellSize - k3
        );
      } else if (settings.Block === 4) {
        k3 = Math.max(Math.floor(Mutable.cellSize * 0.1), 1);
        grad = spriteCtx.createLinearGradient(
          x3,
          0,
          x3 + Mutable.cellSize,
          Mutable.cellSize
        );
        grad.addColorStop(0.5, glossy[i4][3]);
        grad.addColorStop(1, glossy[i4][4]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        grad = spriteCtx.createLinearGradient(x3, k3, x3, Mutable.cellSize);
        grad.addColorStop(0, shaded[i4][0]);
        grad.addColorStop(0.1, glossy[i4][2]);
        grad.addColorStop(0.4, shaded[i4][0]);
        grad.addColorStop(0.5, shaded[i4][2]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(
          x3 + k3,
          k3,
          Mutable.cellSize - k3 * 2,
          Mutable.cellSize - k3 * 2
        );
      } else if (settings.Block === 5) {
        k3 = Math.max(Math.floor(Mutable.cellSize * 0.1), 1);
        grad = spriteCtx.createLinearGradient(
          x3,
          0,
          x3 + Mutable.cellSize,
          Mutable.cellSize
        );
        grad.addColorStop(0.5, tgm[i4][3]);
        grad.addColorStop(1, tgm[i4][1]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        grad = spriteCtx.createLinearGradient(
          x3,
          0,
          x3 + Mutable.cellSize,
          Mutable.cellSize
        );
        grad.addColorStop(0, glossy[i4][2]);
        grad.addColorStop(0.5, glossy[i4][1]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(
          x3,
          0,
          Mutable.cellSize - k3,
          Mutable.cellSize - k3
        );
        grad = spriteCtx.createLinearGradient(
          x3 + k3,
          k3,
          x3 + Mutable.cellSize - k3,
          Mutable.cellSize - k3
        );
        grad.addColorStop(0, tgm[i4][2]);
        grad.addColorStop(0.3, tgm[i4][2]);
        grad.addColorStop(0.4, tgm[i4][0]);
        grad.addColorStop(0.7, tgm[i4][0]);
        grad.addColorStop(0.87, tgm[i4][1]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(
          x3 + k3,
          k3,
          Mutable.cellSize - k3 * 2,
          Mutable.cellSize - k3 * 2
        );
        spriteCtx.fillStyle = tgm[i4][1];
        spriteCtx.fillRect(
          x3 + 1.5 * k3,
          1.5 * k3,
          Mutable.cellSize / 8,
          Mutable.cellSize / 8
        );
      } else if (settings.Block === 6) {
        const k4 = Math.max(Math.floor(Mutable.cellSize * 0.1), 1);
        spriteCtx.fillStyle = glossy[i4][4];
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        grad = spriteCtx.createLinearGradient(
          x3 + Mutable.cellSize - k4,
          k4,
          x3 + k4,
          Mutable.cellSize - k4
        );
        grad.addColorStop(0, glossy[i4][0]);
        grad.addColorStop(0.5, glossy[i4][0]);
        grad.addColorStop(0.5, shaded[i4][0]);
        grad.addColorStop(1, shaded[i4][0]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(
          x3 + k4,
          k4,
          Mutable.cellSize - k4 * 2,
          Mutable.cellSize - k4 * 2
        );
        spriteCtx.fillStyle = shaded[i4][1];
        spriteCtx.fillRect(
          x3 + Mutable.cellSize / 5.5,
          0 + Mutable.cellSize / 5.5,
          Mutable.cellSize / 1.64,
          Mutable.cellSize / 1.64
        );
      } else if (settings.Block === 7) {
        k3 = Math.max(Math.floor(Mutable.cellSize * 0.1), 1);
        spriteCtx.fillStyle = "#000";
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        spriteCtx.fillStyle = shaded[i4][1];
        spriteCtx.fillRect(
          x3 + Mutable.cellSize / 7.5,
          0 + Mutable.cellSize / 7.5,
          Mutable.cellSize / 1.4,
          Mutable.cellSize / 1.4
        );
        spriteCtx.fillStyle = "#000";
        spriteCtx.fillRect(
          x3 + Mutable.cellSize / 3.5,
          0 + Mutable.cellSize / 3.5,
          Mutable.cellSize / 2.44,
          Mutable.cellSize / 2.44
        );
        spriteCtx.fillStyle = "#000";
        spriteCtx.fillRect(
          x3 + Mutable.cellSize / 2.7,
          0 + Mutable.cellSize / 8,
          Mutable.cellSize / 4.14,
          Mutable.cellSize / 1.2
        );
      } else if (settings.Block === 8) {
        spriteCtx.fillStyle = "#000";
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        spriteCtx.fillStyle = nes[i4][0];
        spriteCtx.fillRect(
          x3,
          0,
          Mutable.cellSize / 1.125,
          Mutable.cellSize / 1.125
        );
        spriteCtx.fillStyle = "#fff";
        spriteCtx.fillRect(
          x3,
          0,
          Mutable.cellSize / 8,
          Mutable.cellSize / 8
        );
        spriteCtx.fillStyle = "#fff";
        spriteCtx.fillRect(
          x3 + Mutable.cellSize / 8,
          0 + Mutable.cellSize / 8,
          Mutable.cellSize / 8,
          Mutable.cellSize / 4
        );
        spriteCtx.fillStyle = "#fff";
        spriteCtx.fillRect(
          x3 + Mutable.cellSize / 8,
          0 + Mutable.cellSize / 8,
          Mutable.cellSize / 4,
          Mutable.cellSize / 8
        );
        spriteCtx.fillStyle = nes[i4][1];
        spriteCtx.fillRect(
          x3 + Mutable.cellSize / 8,
          0 + Mutable.cellSize / 8,
          Mutable.cellSize / 1.6,
          Mutable.cellSize / 1.6
        );
      } else if (settings.Block === 9) {
        spriteCtx.fillStyle = friends[i4][5];
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        spriteCtx.fillStyle = friends[i4][1];
        spriteCtx.fillRect(
          x3 + Mutable.cellSize / 18,
          0 + Mutable.cellSize / 18,
          Mutable.cellSize / 1.125,
          Mutable.cellSize / 1.125
        );
        spriteCtx.fillStyle = "#fff";
        spriteCtx.fillRect(
          x3 + Mutable.cellSize / 18,
          0 + Mutable.cellSize / 18,
          Mutable.cellSize / 9,
          Mutable.cellSize / 9
        );
        spriteCtx.fillStyle = friends[i4][0];
        spriteCtx.fillRect(
          x3 + Mutable.cellSize / 6,
          0 + Mutable.cellSize / 18,
          Mutable.cellSize / 1.5,
          Mutable.cellSize / 18
        );
        spriteCtx.fillStyle = friends[i4][0];
        spriteCtx.fillRect(
          x3 + Mutable.cellSize / 18,
          0 + Mutable.cellSize / 6,
          Mutable.cellSize / 18,
          Mutable.cellSize / 1.5
        );
        spriteCtx.fillStyle = friends[i4][4];
        spriteCtx.fillRect(
          x3 + Mutable.cellSize / 1.125,
          0 + Mutable.cellSize / 6,
          Mutable.cellSize / 18,
          Mutable.cellSize / 1.5
        );
        spriteCtx.fillStyle = friends[i4][4];
        spriteCtx.fillRect(
          x3 + Mutable.cellSize / 6,
          0 + Mutable.cellSize / 1.125,
          Mutable.cellSize / 1.5,
          Mutable.cellSize / 18
        );
        spriteCtx.fillStyle = friends[i4][2];
        spriteCtx.fillRect(
          x3 + Mutable.cellSize / 4.5,
          0 + Mutable.cellSize / 4.5,
          Mutable.cellSize / 1.8,
          Mutable.cellSize / 1.8
        );
        spriteCtx.fillStyle = friends[i4][3];
        spriteCtx.fillRect(
          x3 + Mutable.cellSize / 3.6,
          0 + Mutable.cellSize / 3.6,
          Mutable.cellSize / 2.25,
          Mutable.cellSize / 2.25
        );
      } else if (settings.Block === 10) {
        spriteCtx.fillStyle = t99[i4][0];
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        const grad2 = spriteCtx.createLinearGradient(
          x3,
          0,
          x3 + Mutable.cellSize / 7,
          Mutable.cellSize / 2
        );
        grad2.addColorStop(0, "#FFFFFFEE");
        grad2.addColorStop(1, "#FFFFFF66");
        spriteCtx.beginPath();
        spriteCtx.moveTo(x3 + Mutable.cellSize / 8, Mutable.cellSize / 8);
        spriteCtx.lineTo(x3 + Mutable.cellSize / 8, Mutable.cellSize / 2);
        spriteCtx.quadraticCurveTo(
          x3 + Mutable.cellSize / 1.5,
          Mutable.cellSize / 4,
          x3 + Mutable.cellSize / (8 / 7),
          Mutable.cellSize / 4
        );
        spriteCtx.lineTo(
          x3 + Mutable.cellSize / (8 / 7),
          Mutable.cellSize / 8
        );
        spriteCtx.fillStyle = grad2;
        spriteCtx.fill();
        spriteCtx.fillStyle = t99[i4][1];
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize / 8);
        spriteCtx.fillStyle = t99[i4][2];
        spriteCtx.fillRect(
          x3,
          Mutable.cellSize / (8 / 7),
          Mutable.cellSize,
          Mutable.cellSize / 8
        );
        spriteCtx.beginPath();
        spriteCtx.moveTo(x3, 0);
        spriteCtx.lineTo(x3, Mutable.cellSize);
        spriteCtx.lineTo(
          x3 + Mutable.cellSize / 8,
          Mutable.cellSize / (8 / 7)
        );
        spriteCtx.lineTo(x3 + Mutable.cellSize / 8, Mutable.cellSize / 8);
        spriteCtx.fillStyle = t99[i4][3];
        spriteCtx.fill();
        spriteCtx.beginPath();
        spriteCtx.moveTo(x3 + Mutable.cellSize, 0);
        spriteCtx.lineTo(x3 + Mutable.cellSize, Mutable.cellSize);
        spriteCtx.lineTo(
          x3 + Mutable.cellSize / (8 / 7),
          Mutable.cellSize / (8 / 7)
        );
        spriteCtx.lineTo(
          x3 + Mutable.cellSize / (8 / 7),
          Mutable.cellSize / 8
        );
        spriteCtx.fillStyle = t99[i4][4];
        spriteCtx.fill();
      } else if (settings.Block === 11) {
        spriteCtx.fillStyle = tetcom[i4][0];
        roundRect(
          spriteCtx,
          x3,
          0,
          Mutable.cellSize,
          Mutable.cellSize,
          Mutable.cellSize / 12,
          true,
          false
        );
        spriteCtx.fillStyle = tetcom[i4][1];
        roundRect(
          spriteCtx,
          x3 + Mutable.cellSize / 18,
          0 + Mutable.cellSize / 18,
          Mutable.cellSize / 1.125,
          Mutable.cellSize / 1.125,
          Mutable.cellSize / 12,
          true,
          false
        );
        const grd = spriteCtx.createRadialGradient(
          x3 + Mutable.cellSize / 2,
          0 + Mutable.cellSize,
          Mutable.cellSize / 32,
          x3 + Mutable.cellSize / 2,
          0 + Mutable.cellSize / 1.5,
          Mutable.cellSize
        );
        grd.addColorStop(0, tetcom[i4][2]);
        grd.addColorStop(1, tetcom[i4][3]);
        spriteCtx.fillStyle = grd;
        spriteCtx.fillRect(
          x3 + Mutable.cellSize / (16 / 2.5),
          0 + Mutable.cellSize / (16 / 2.5),
          Mutable.cellSize / (16 / 11),
          Mutable.cellSize / (16 / 11)
        );
        spriteCtx.beginPath();
        spriteCtx.moveTo(
          x3 + Mutable.cellSize / (16 / 2.5),
          0 + Mutable.cellSize / (16 / 2.5)
        );
        spriteCtx.bezierCurveTo(
          x3 + Mutable.cellSize / (16 / 2.5),
          Mutable.cellSize / 2,
          x3 + Mutable.cellSize / (16 / 13.5),
          Mutable.cellSize / 2,
          x3 + Mutable.cellSize / (16 / 13.5),
          Mutable.cellSize / (16 / 2.5)
        );
        grad = spriteCtx.createLinearGradient(
          x3,
          0,
          x3,
          Mutable.cellSize / 2
        );
        grad.addColorStop(0, "#FFFFFF44");
        grad.addColorStop(1, "#FFFFFF88");
        spriteCtx.fillStyle = grad;
        spriteCtx.fill();
        grad = spriteCtx.createLinearGradient(
          x3 + Mutable.cellSize / 2,
          0,
          x3 + Mutable.cellSize / (16 / 5),
          Mutable.cellSize / 2
        );
        grad.addColorStop(0.65, "#FFFFFF00");
        grad.addColorStop(0.8, "#FFFFFF");
        spriteCtx.fillStyle = grad;
        spriteCtx.fill();
      } else if (settings.Block === 12) {
        spriteCtx.fillStyle = ppt[i4][0];
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        spriteCtx.fillStyle = ppt[i4][4];
        spriteCtx.fillRect(
          x3 + Mutable.cellSize / 16,
          Mutable.cellSize / 16,
          Mutable.cellSize / (16 / 14),
          Mutable.cellSize / (16 / 14)
        );
        let grd = spriteCtx.createRadialGradient(
          x3 + Mutable.cellSize / 2,
          0 + Mutable.cellSize,
          Mutable.cellSize / 64,
          x3 + Mutable.cellSize / 2,
          0 + Mutable.cellSize,
          Mutable.cellSize / 2
        );
        grd.addColorStop(0, ppt[i4][5]);
        grd.addColorStop(1, ppt[i4][6]);
        spriteCtx.fillStyle = grd;
        spriteCtx.fillRect(
          x3 + Mutable.cellSize / 16,
          Mutable.cellSize / 2,
          Mutable.cellSize / (16 / 14),
          Mutable.cellSize / (16 / 7)
        );
        grd = spriteCtx.createLinearGradient(x3, 0, x3, Mutable.cellSize / 2);
        grd.addColorStop(0.2, ppt[i4][6]);
        grd.addColorStop(1, ppt[i4][4]);
        spriteCtx.fillStyle = grd;
        spriteCtx.fillRect(
          x3 + Mutable.cellSize / 16,
          Mutable.cellSize / 16,
          Mutable.cellSize / (16 / 14),
          Mutable.cellSize / (16 / 7)
        );
        spriteCtx.fillStyle = ppt[i4][1];
        spriteCtx.fillRect(
          x3 + Mutable.cellSize / 32,
          Mutable.cellSize / 32,
          Mutable.cellSize / (32 / 30),
          Mutable.cellSize / (32 / 3)
        );
        spriteCtx.fillStyle = ppt[i4][3];
        spriteCtx.fillRect(
          x3 + Mutable.cellSize / 32,
          Mutable.cellSize / (32 / 28),
          Mutable.cellSize / (32 / 30),
          Mutable.cellSize / (32 / 3)
        );
        spriteCtx.beginPath();
        spriteCtx.moveTo(x3 + Mutable.cellSize / 34, Mutable.cellSize / 32);
        spriteCtx.lineTo(
          x3 + Mutable.cellSize / 34,
          Mutable.cellSize / (32 / 31)
        );
        spriteCtx.lineTo(
          x3 + Mutable.cellSize / 8,
          Mutable.cellSize / (8 / 7)
        );
        spriteCtx.lineTo(x3 + Mutable.cellSize / 8, Mutable.cellSize / 8);
        spriteCtx.fillStyle = ppt[i4][2];
        spriteCtx.fill();
        spriteCtx.beginPath();
        spriteCtx.moveTo(
          x3 + Mutable.cellSize / (34 / 33),
          Mutable.cellSize / 32
        );
        spriteCtx.lineTo(
          x3 + Mutable.cellSize / (34 / 33),
          Mutable.cellSize / (32 / 31)
        );
        spriteCtx.lineTo(
          x3 + Mutable.cellSize / (8 / 7),
          Mutable.cellSize / (8 / 7)
        );
        spriteCtx.lineTo(
          x3 + Mutable.cellSize / (8 / 7),
          Mutable.cellSize / 8
        );
        spriteCtx.fillStyle = ppt[i4][2];
        spriteCtx.fill();
      } else if (settings.Block === 13) {
        spriteCtx.fillStyle = tetrjs[i4][2];
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        spriteCtx.beginPath();
        spriteCtx.moveTo(x3 + Mutable.cellSize / 16, Mutable.cellSize / 16);
        spriteCtx.lineTo(
          x3 + Mutable.cellSize / 16,
          Mutable.cellSize / (16 / 10)
        );
        spriteCtx.quadraticCurveTo(
          x3 + Mutable.cellSize / (16 / 8),
          Mutable.cellSize / (16 / 5),
          x3 + Mutable.cellSize / (16 / 15),
          Mutable.cellSize / (16 / 4)
        );
        spriteCtx.lineTo(
          x3 + Mutable.cellSize / (16 / 15),
          Mutable.cellSize / (16 / 1)
        );
        spriteCtx.fillStyle = tetrjs[i4][0];
        spriteCtx.fill();
      }
      i4 = iCurrent;
    }
  }
  function roundRect(ctx, x3, y4, width, height, radius, fill, stroke) {
    if (typeof stroke === "undefined") {
      stroke = true;
    }
    if (typeof radius === "undefined") {
      radius = 5;
    }
    if (typeof radius === "number") {
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
      const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
      for (const side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x3 + radius.tl, y4);
    ctx.lineTo(x3 + width - radius.tr, y4);
    ctx.quadraticCurveTo(x3 + width, y4, x3 + width, y4 + radius.tr);
    ctx.lineTo(x3 + width, y4 + height - radius.br);
    ctx.quadraticCurveTo(
      x3 + width,
      y4 + height,
      x3 + width - radius.br,
      y4 + height
    );
    ctx.lineTo(x3 + radius.bl, y4 + height);
    ctx.quadraticCurveTo(x3, y4 + height, x3, y4 + height - radius.bl);
    ctx.lineTo(x3, y4 + radius.tl);
    ctx.quadraticCurveTo(x3, y4, x3 + radius.tl, y4);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  }
  function draw(tetro, cx, cy, ctx, color, darkness) {
    for (let x3 = 0, len = tetro.length; x3 < len; x3++) {
      for (let y4 = 0, wid = tetro[x3].length; y4 < wid; y4++) {
        if (tetro[x3][y4]) {
          drawCell(
            x3 + cx,
            y4 + cy,
            color !== void 0 ? color : tetro[x3][y4],
            ctx,
            darkness
          );
        }
      }
    }
  }
  var keyToString = {
    8: "Backspace",
    9: "Tab",
    13: "Enter",
    16: "Shift",
    17: "Ctrl",
    18: "Alt",
    19: "Pause",
    20: "Caps Lock",
    27: "Esc",
    32: "Space",
    33: "PgUp",
    34: "PgDn",
    35: "End",
    36: "Home",
    37: "\u2190",
    38: "\u2191",
    39: "\u2192",
    40: "\u2193",
    45: "Insert",
    46: "Delete",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    59: ";",
    61: "=",
    65: "A",
    66: "B",
    67: "C",
    68: "D",
    69: "E",
    70: "F",
    71: "G",
    72: "H",
    73: "I",
    74: "J",
    75: "K",
    76: "L",
    77: "M",
    78: "N",
    79: "O",
    80: "P",
    81: "Q",
    82: "R",
    83: "S",
    84: "T",
    85: "U",
    86: "V",
    87: "W",
    88: "X",
    89: "Y",
    90: "Z",
    96: "0kpad",
    97: "1kpad",
    98: "2kpad",
    99: "3kpad",
    100: "4kpad",
    101: "5kpad",
    102: "6kpad",
    103: "7kpad",
    104: "8kpad",
    105: "9kpad",
    106: "*",
    107: "+",
    109: "-",
    110: ".",
    111: "/",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    173: "-",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'",
    undefined: "---",
    0: "---"
  };
  function keyUpDown(e4) {
    if ([32, 37, 38, 39, 40].indexOf(e4.keyCode) !== -1)
      e4.preventDefault();
    if (e4.type === "keydown" && e4.keyCode === binds.pause) {
      if (Game.paused) {
        Game.unpause();
      } else {
        Game.pause();
      }
    }
    if (e4.type === "keydown" && e4.keyCode === binds.retry) {
      Game.init(Game.type, Game.params);
    }
    if (!Mutable.watchingReplay) {
      if (e4.type === "keydown") {
        if (e4.keyCode === binds.moveLeft) {
          Mutable.keysDown |= flags.moveLeft;
        } else if (e4.keyCode === binds.moveRight) {
          Mutable.keysDown |= flags.moveRight;
        } else if (e4.keyCode === binds.moveDown) {
          Mutable.keysDown |= flags.moveDown;
        } else if (e4.keyCode === binds.hardDrop) {
          Mutable.keysDown |= flags.hardDrop;
        } else if (e4.keyCode === binds.rotRight) {
          Mutable.keysDown |= flags.rotRight;
        } else if (e4.keyCode === binds.rotLeft) {
          Mutable.keysDown |= flags.rotLeft;
        } else if (e4.keyCode === binds.rot180) {
          Mutable.keysDown |= flags.rot180;
        } else if (e4.keyCode === binds.moveLeft3) {
          Mutable.keysDown |= flags.moveLeft3;
        } else if (e4.keyCode === binds.moveRight3) {
          Mutable.keysDown |= flags.moveRight3;
        } else if (e4.keyCode === binds.holdPiece) {
          Mutable.keysDown |= flags.holdPiece;
        }
      } else if (e4.type === "keyup") {
        if (e4.keyCode === binds.moveLeft && getFlag(Mutable.keysDown, flags.moveLeft)) {
          Mutable.keysDown = setFlag(Mutable.keysDown, flags.moveLeft);
        } else if (e4.keyCode === binds.moveRight && getFlag(Mutable.keysDown, flags.moveRight)) {
          Mutable.keysDown = setFlag(Mutable.keysDown, flags.moveRight);
        } else if (e4.keyCode === binds.moveDown && getFlag(Mutable.keysDown, flags.moveDown)) {
          Mutable.keysDown = setFlag(Mutable.keysDown, flags.moveDown);
        } else if (e4.keyCode === binds.hardDrop && getFlag(Mutable.keysDown, flags.hardDrop)) {
          Mutable.keysDown = setFlag(Mutable.keysDown, flags.hardDrop);
        } else if (e4.keyCode === binds.rotRight && getFlag(Mutable.keysDown, flags.rotRight)) {
          Mutable.keysDown = setFlag(Mutable.keysDown, flags.rotRight);
        } else if (e4.keyCode === binds.rotLeft && getFlag(Mutable.keysDown, flags.rotLeft)) {
          Mutable.keysDown = setFlag(Mutable.keysDown, flags.rotLeft);
        } else if (e4.keyCode === binds.rot180 && getFlag(Mutable.keysDown, flags.rot180)) {
          Mutable.keysDown = setFlag(Mutable.keysDown, flags.rot180);
        } else if (e4.keyCode === binds.moveLeft3 && getFlag(Mutable.keysDown, flags.moveLeft3)) {
          Mutable.keysDown = setFlag(Mutable.keysDown, flags.moveLeft3);
        } else if (e4.keyCode === binds.moveRight3 && getFlag(Mutable.keysDown, flags.moveRight3)) {
          Mutable.keysDown = setFlag(Mutable.keysDown, flags.moveRight3);
        } else if (e4.keyCode === binds.holdPiece && getFlag(Mutable.keysDown, flags.holdPiece)) {
          Mutable.keysDown = setFlag(Mutable.keysDown, flags.holdPiece);
        }
      }
    }
  }

  // src/components/utils/ButtonGroupList.tsx
  function ButtonGroupList({ onClick, data: data2, selected }) {
    const [selectedIndex, setSelectedIndex] = l2(selected);
    return /* @__PURE__ */ e3("div", { class: "btn-group", children: data2.map((item, index) => /* @__PURE__ */ e3(
      "button",
      {
        onClick: () => {
          onClick(index);
          setSelectedIndex(index);
        },
        ...selectedIndex == index ? { class: "active" } : {},
        children: item
      },
      index
    )) });
  }

  // src/components/center/menu/main/settings/ControlsMenu.tsx
  var newKey;
  var currCell;
  var tempKey;
  var bobBinds = {
    pause: 27,
    moveLeft: 37,
    moveRight: 39,
    moveLeft3: 0,
    moveRight3: 0,
    moveDown: 40,
    hardDrop: 38,
    holdPiece: 32,
    rotRight: 88,
    rotLeft: 90,
    rot180: 67,
    retry: 82
  };
  document.addEventListener(
    "keyup",
    (e4) => {
      if (currCell) {
        newKey = e4.keyCode;
        if (newKey === 8) {
          newKey = void 0;
        }
        if (newKey) {
          for (const i4 in binds) {
            if (newKey === binds[i4]) {
              delete binds[i4];
              $setText($2(i4), keyToString.undefined);
            }
          }
        }
        binds[currCell.id] = newKey;
        $setText(currCell, keyToString[newKey] || newKey);
        localStorage.setItem("binds", JSON.stringify(binds));
        currCell = void 0;
      }
    },
    false
  );
  var buttons = [];
  var updatedBinds = () => {
    for (const cb of buttons) {
      cb();
    }
  };
  function ControlButton({ default: def, icon, text, id: id2 }) {
    const keycode = binds[id2];
    const keyText = keyToString[keycode] || keycode;
    const [txt, setTxt] = l2(keyText || def);
    const ref = s2(null);
    y2(() => {
      const cb = () => {
        const kc = binds[id2];
        setTxt(keyToString[kc] || kc);
      };
      buttons.push(cb);
      return () => {
        buttons.splice(buttons.indexOf(cb), 1);
      };
    });
    return /* @__PURE__ */ e3("tr", { children: [
      /* @__PURE__ */ e3("th", { children: [
        text,
        " ",
        /* @__PURE__ */ e3(Icon, { id: icon })
      ] }),
      /* @__PURE__ */ e3(
        "td",
        {
          id: id2,
          ref,
          onClick: () => {
            if (currCell) {
              binds[currCell.id] = tempKey;
              $setText(currCell, keyToString[tempKey] || tempKey);
            }
            tempKey = binds[id2];
            setTxt("Press key");
            currCell = ref.current;
          },
          children: txt
        }
      )
    ] });
  }
  var { button: ControlsMenuBtn, menu: ControlsMenu, id: CONTROLS_MENU_ID } = createMenu({
    title: "menu-settings-controls"
  }, () => {
    return /* @__PURE__ */ e3(d, { children: [
      /* @__PURE__ */ e3("h2", { class: "no-margin", children: "Controls" }),
      /* @__PURE__ */ e3("p", { class: "no-margin", children: "Click on the item you want to change, then press any key." }),
      /* @__PURE__ */ e3(
        ButtonGroupList,
        {
          data: ["Custom", "Preset 1", "Preset 2"],
          selected: 0,
          onClick: (index) => {
            switch (index) {
              case 0:
                break;
              case 1:
                setBinds(defaultBinds);
                break;
              case 2:
                setBinds(bobBinds);
                break;
            }
            updatedBinds();
          }
        }
      ),
      /* @__PURE__ */ e3("table", { id: "controls", style: "margin-top: 0px", children: [
        /* @__PURE__ */ e3(
          ControlButton,
          {
            default: "\u2190",
            text: "Move",
            icon: "left",
            id: "moveLeft"
          }
        ),
        /* @__PURE__ */ e3(
          ControlButton,
          {
            default: "\u2192",
            text: "Move",
            icon: "right",
            id: "moveRight"
          }
        ),
        /* @__PURE__ */ e3(
          ControlButton,
          {
            default: "---",
            text: "Triple",
            icon: "left",
            id: "moveLeft3"
          }
        ),
        /* @__PURE__ */ e3(
          ControlButton,
          {
            default: "---",
            text: "Triple",
            icon: "right",
            id: "moveRight3"
          }
        ),
        /* @__PURE__ */ e3(
          ControlButton,
          {
            default: "\u2193",
            text: "Move",
            icon: "soft-drop",
            id: "moveDown"
          }
        ),
        /* @__PURE__ */ e3(
          ControlButton,
          {
            default: "Space",
            text: "Drop",
            icon: "hard-drop",
            id: "hardDrop"
          }
        ),
        /* @__PURE__ */ e3(
          ControlButton,
          {
            default: "C",
            text: "Hold",
            icon: "hold",
            id: "holdPiece"
          }
        ),
        /* @__PURE__ */ e3(
          ControlButton,
          {
            default: "X",
            text: "Spin",
            icon: "rot-right",
            id: "rotRight"
          }
        ),
        /* @__PURE__ */ e3(
          ControlButton,
          {
            default: "Z",
            text: "Spin",
            icon: "rot-left",
            id: "rotLeft"
          }
        ),
        /* @__PURE__ */ e3(
          ControlButton,
          {
            default: "Shift",
            text: "Spin",
            icon: "rot-180",
            id: "rot180"
          }
        ),
        /* @__PURE__ */ e3(
          ControlButton,
          {
            default: "R",
            text: "Retry",
            icon: "retry",
            id: "retry"
          }
        ),
        /* @__PURE__ */ e3(
          ControlButton,
          {
            default: "Esc",
            text: "Pause",
            icon: "pause",
            id: "pause"
          }
        )
      ] }),
      /* @__PURE__ */ e3(BackBtn, {})
    ] });
  });

  // src/components/center/menu/main/settings/GraphicsMenu.tsx
  var { button: GraphicsMenuBtn, menu: GraphicsMenu, id: GRAPHICS_MENU_ID } = createMenu(
    {
      title: "menu-settings-graphics"
    },
    () => {
      return /* @__PURE__ */ e3(d, { children: [
        /* @__PURE__ */ e3("h1", { class: "boldish", children: "Graphics" }),
        /* @__PURE__ */ e3(
          GroupListSetting,
          {
            setting: "Size",
            data: getStringKeys(Size),
            selected: settings.Size,
            onClick: (index) => {
              settings.Size = index;
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupSliderSetting,
          {
            setting: "Next",
            max: 6,
            min: 0,
            step: 1,
            value: settings.Next,
            onInput: (value) => {
              settings.Next = value;
            },
            getName: (index) => index !== 0 ? `${index} PIECES` : "DISABLED"
          }
        ),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "NextSide",
            data: ["Left", "Right"],
            selected: settings.NextSide ? 1 : 0,
            onClick: (index) => {
              settings.NextSide = index === 1;
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupListSetting,
          {
            setting: "Block",
            data: getStringKeys(Block),
            selected: settings.Block,
            onClick: (index) => {
              settings.Block = index;
              makeSprite();
            }
          }
        ),
        /* @__PURE__ */ e3("canvas", { id: "sprite" }),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "Monochrome",
            data: ["Off", "On"],
            selected: settings.Monochrome ? 1 : 0,
            onClick: (index) => {
              settings.Monochrome = index === 1;
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "Outline",
            data: getStringKeys(Outline),
            selected: settings.Outline,
            onClick: (index) => {
              settings.Outline = index;
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "Ghost",
            data: getStringKeys(Ghost),
            selected: settings.Ghost,
            onClick: (index) => {
              settings.Ghost = index;
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "Grid",
            data: ["Off", "On"],
            selected: settings.Grid ? 1 : 0,
            onClick: (index) => {
              settings.Grid = index === 1;
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "Messages",
            data: ["Off", "On"],
            selected: settings.Messages ? 1 : 0,
            onClick: (index) => {
              settings.Messages = index === 1;
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "MatrixSway",
            data: ["Off", "On"],
            selected: settings.MatrixSway ? 1 : 0,
            onClick: (index) => {
              settings.MatrixSway = index === 1;
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "InitialVis",
            data: ["Off", "On"],
            selected: settings.InitialVis ? 1 : 0,
            onClick: (index) => {
              settings.InitialVis = index === 1;
            }
          }
        ),
        /* @__PURE__ */ e3("br", {}),
        /* @__PURE__ */ e3(BackBtn, {})
      ] });
    }
  );

  // src/components/center/menu/main/settings/TuningMenu.tsx
  var framesMs = (index) => `${index} FRAMES; ${Math.round((1e3 / 60 * index + 1e-5) * 100) / 100} MS`;
  var framesHz = (index) => index !== 0 ? `${index} FRAMES; ${Math.round((60 / index + 1e-5) * 100) / 100} HZ` : "INSTANT";
  var {
    button: TuningMenuBtn,
    menu: TuningMenu,
    id: TUNING_MENU_ID
  } = createMenu(
    {
      title: "menu-settings-tuning"
    },
    () => {
      return /* @__PURE__ */ e3(d, { children: [
        /* @__PURE__ */ e3("h1", { class: "boldish", children: "Tuning" }),
        /* @__PURE__ */ e3(
          GroupSliderSetting,
          {
            setting: "DAS",
            max: 30,
            min: 0,
            step: 1,
            value: settings.DAS ?? 10,
            onInput: (value) => {
              settings.DAS = value;
            },
            getName: framesMs
          }
        ),
        /* @__PURE__ */ e3(
          GroupSliderSetting,
          {
            setting: "ARR",
            max: 10,
            min: 0,
            step: 1,
            value: settings.ARR ?? 2,
            onInput: (value) => {
              settings.ARR = value;
            },
            getName: framesHz
          }
        ),
        /* @__PURE__ */ e3(
          GroupSliderSetting,
          {
            setting: "Gravity",
            max: 9,
            min: 0,
            step: 1,
            value: settings.Gravity ?? 0,
            onInput: (value) => {
              settings.Gravity = value;
            },
            getName: (index) => Gravity[index]
          }
        ),
        /* @__PURE__ */ e3(
          GroupSliderSetting,
          {
            setting: "SoftDrop",
            max: 7,
            min: 0,
            step: 1,
            value: settings.SoftDrop ?? 6,
            onInput: (value) => {
              settings.SoftDrop = value;
            },
            getName: (index) => SoftDrop[index + 2]
          }
        ),
        /* @__PURE__ */ e3(
          GroupSliderSetting,
          {
            setting: "LockDelay",
            max: 100,
            min: 0,
            step: 0.1,
            value: settings.LockDelay ?? 30,
            onInput: (value) => {
              settings.LockDelay = value;
            },
            getName: framesMs
          }
        ),
        /* @__PURE__ */ e3(
          GroupListSetting,
          {
            setting: "IRSMode",
            data: getStringKeys(IRSMode),
            selected: settings.IRSMode,
            onClick: (index) => {
              settings.IRSMode = index;
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupListSetting,
          {
            setting: "IHSMode",
            data: getStringKeys(IHSMode),
            selected: settings.IHSMode,
            onClick: (index) => {
              settings.IHSMode = index;
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupListSetting,
          {
            setting: "RotSys",
            data: getStringKeys(RotSys),
            selected: settings.RotSys,
            onClick: (index) => {
              settings.set("RotSys", index);
            }
          }
        ),
        /* @__PURE__ */ e3(
          GroupSetting,
          {
            setting: "ResetPB",
            data: ["Off", "On"],
            selected: settings.ResetPB ? 1 : 0,
            onClick: (index) => {
              settings.ResetPB = index === 1;
            }
          }
        ),
        /* @__PURE__ */ e3("br", {}),
        /* @__PURE__ */ e3(BackBtn, {})
      ] });
    }
  );

  // src/components/center/menu/main/settings/SettingsMenu.tsx
  var { button: SettingsMenuBtn, menu: SettingsMenu, id: SETTINGS_MENU_ID } = createMenu({
    title: "menu-settings",
    icon: "wrench"
  }, () => {
    return /* @__PURE__ */ e3(d, { children: [
      /* @__PURE__ */ e3("h1", { class: "boldish", children: "Settings" }),
      /* @__PURE__ */ e3(ControlsMenuBtn, { op: 1 }),
      /* @__PURE__ */ e3(TuningMenuBtn, { op: 1 }),
      /* @__PURE__ */ e3(GraphicsMenuBtn, { op: 1 }),
      /* @__PURE__ */ e3(AudioMenuBtn, { op: 1 }),
      /* @__PURE__ */ e3(BackBtn, {})
    ] });
  });

  // src/components/center/menu/main/overlays/ReplayMenu.tsx
  var {
    button: ReplayMenuBtn,
    menu: ReplayMenu,
    id: REPLAY_MENU_ID
  } = createMenu(
    {
      title: "menu-replay",
      icon: "replay"
    },
    () => {
      return /* @__PURE__ */ e3(d, { children: [
        /* @__PURE__ */ e3("h2", { children: "Replay" }),
        /* @__PURE__ */ e3("p", { children: "Ctrl+C / Ctrl+V" }),
        /* @__PURE__ */ e3("textarea", { id: "replaydata", spellcheck: false }),
        /* @__PURE__ */ e3("ul", { children: [
          /* @__PURE__ */ e3("li", { children: /* @__PURE__ */ e3(
            "a",
            {
              class: "btn",
              onClick: () => {
                tryreplaydata();
                sound.init();
              },
              children: "Watch"
            }
          ) }),
          /* @__PURE__ */ e3("li", { children: /* @__PURE__ */ e3("a", { class: "btn", onClick: () => menu(void 0, -1), children: "Back" }) })
        ] })
      ] });
    }
  );

  // src/components/center/menu/MainMenu.tsx
  var { menu: MainMenu, id: MAIN_MENU_ID } = createMenu(
    {
      title: "none"
    },
    () => {
      return /* @__PURE__ */ e3(d, { children: [
        /* @__PURE__ */ e3("h1", { style: "font-weight: 4; font-size: 2rem; margin: 0px", children: "Polyomino" }),
        /* @__PURE__ */ e3("p", { class: "no-margin", children: version }),
        /* @__PURE__ */ e3("div", { class: "btn-container no-margin", children: [
          /* @__PURE__ */ e3(
            "a",
            {
              class: "btn btn-inline",
              target: "_blank",
              rel: "noreferrer",
              href: "javascript:void(0)",
              children: "Discord"
            }
          ),
          /* @__PURE__ */ e3("div", { class: "spacer" }),
          /* @__PURE__ */ e3(SprintMenuBtn, { op: 1 }),
          /* @__PURE__ */ e3(MarathonMenuBtn, { op: 1 }),
          /* @__PURE__ */ e3(MasterMenuBtn, { op: 1 }),
          /* @__PURE__ */ e3(RetroMenuBtn, { op: 1 }),
          /* @__PURE__ */ e3(DigMenuBtn, { op: 1 }),
          /* @__PURE__ */ e3(SurvialMenuBtn, { op: 1 }),
          /* @__PURE__ */ e3(GradesMenuBtn, { op: 1 }),
          /* @__PURE__ */ e3("div", { class: "spacer" }),
          /* @__PURE__ */ e3(SettingsMenuBtn, { op: 1 }),
          /* @__PURE__ */ e3(ReplayMenuBtn, { op: 1 })
        ] })
      ] });
    }
  );

  // src/components/center/menu/main/overlays/FailedMenu.tsx
  var { menu: FailedMenu, id: FAILED_MENU_ID } = createMenu({
    title: "none"
  }, () => {
    return /* @__PURE__ */ e3(d, { children: /* @__PURE__ */ e3("div", { class: "btn-container btn-container-bottom", children: [
      /* @__PURE__ */ e3(Btn, { click: () => Game.init(Game.type, Game.params), children: t3("menu-retry") }),
      /* @__PURE__ */ e3(
        Btn,
        {
          click: () => Game.init("replay"),
          class: "btn-inline width-50",
          children: t3("menu-replay")
        }
      ),
      /* @__PURE__ */ e3(
        Btn,
        {
          click: () => showreplaydata(curreplaydata()),
          class: "btn-inline width25-7",
          children: /* @__PURE__ */ e3(Icon, { id: "save" })
        }
      ),
      /* @__PURE__ */ e3(Btn, { click: () => Game.init(1), class: "btn-inline width-50", children: t3("menu-start") }),
      /* @__PURE__ */ e3(Btn, { click: () => menu(MAIN_MENU_ID), children: t3("menu-back") })
    ] }) });
  });

  // src/components/center/menu/main/overlays/PauseMenu.tsx
  var { menu: PauseMenu, id: PAUSE_MENU_ID } = createMenu({
    title: "none",
    id: "pause"
  }, () => {
    return /* @__PURE__ */ e3(d, { children: /* @__PURE__ */ e3("div", { class: "btn-container btn-container-bottom", children: [
      /* @__PURE__ */ e3("a", { class: "btn", onClick: () => Game.unpause(), children: "Resume" }),
      /* @__PURE__ */ e3("a", { class: "btn", onClick: () => Game.init(Game.type, Game.params), children: "Restart" }),
      /* @__PURE__ */ e3("a", { class: "btn", onClick: () => menu(MAIN_MENU_ID), children: "Main Menu" })
    ] }) });
  });

  // src/random_stuff.ts
  var scoreNes = 0;
  function scoreNesRefresh() {
    scoreNes = clamp(scoreNes, 0, 999999);
    $setText($2("nesscore"), scoreNes);
  }
  function tetRateNesRefresh() {
    const nesRate = $2("nesrate");
    if (Mutable.tetRateNes <= 0.25 && (Mutable.tetNes > 0 || Mutable.nontetNes > 3) && Game.params.proMode) {
      nesRate.style.color = "#ff0000";
      nesRate.classList.add("drought-flash");
    } else {
      nesRate.style.color = "#ffffff";
      nesRate.classList.remove("drought-flash");
    }
    $setText(nesRate, Math.floor(Mutable.tetRateNes * 100).toString() + "%");
  }
  function updateScoreTime() {
    Mutable.scoreTime = Date.now() - Mutable.scoreStartTime - Game.pauseTime;
  }

  // src/display/tetrion/matrix.ts
  var matrix = {
    position: {
      horizontal: 0,
      vertical: 0
    },
    velocity: {
      right: 0,
      left: 0,
      down: 0
    }
  };
  function shiftMatrix(direction) {
    if (settings.MatrixSway) {
      if (direction === 0 /* RIGHT */) {
        matrix.velocity.left = 0;
        matrix.velocity.right = 1;
      } else if (direction === 1 /* LEFT */) {
        matrix.velocity.right = 0;
        matrix.velocity.left = 1;
      } else if (direction === 2 /* DOWN */) {
        matrix.velocity.down = 1;
      }
    }
  }
  function matrixReturn(direction, type, sign) {
    const { velocity, position } = matrix;
    if (velocity[direction] > 1) {
      velocity[direction] = 1;
    }
    if (position[type] < 0.5 && position[type] > -0.5) {
      position[type] += sign * 0.2;
    }
    velocity[direction] -= 0.2;
    if (velocity[direction] < 0) {
      velocity[direction] = 0;
    }
  }
  function updateMatrixPosition() {
    if (matrix.velocity.right === 0 && matrix.velocity.left === 0) {
      matrix.position.horizontal /= 1.1;
    } else if (matrix.velocity.right !== 0) {
      matrixReturn(0 /* RIGHT */, "horizontal" /* HORIZONTAL */, 1 /* POSITIVE */);
    } else if (matrix.velocity.left !== 0) {
      matrixReturn(1 /* LEFT */, "horizontal" /* HORIZONTAL */, -1 /* NEGATIVE */);
    }
    if (matrix.velocity.down === 0) {
      matrix.position.vertical /= 1.1;
    } else {
      matrixReturn(2 /* DOWN */, "vertical" /* VERTICAL */, 1 /* POSITIVE */);
    }
    if (Math.abs(matrix.position.horizontal) < 0.01) {
      matrix.position.horizontal = 0;
    }
    if (matrix.position.vertical < 0.01) {
      matrix.position.vertical = 0;
    }
    $2("b").style.transform = `translate(${matrix.position.horizontal / 3}em, ${matrix.position.vertical / 3}em)`;
  }

  // src/utils/blackjack.ts
  function shuffleArray(array) {
    for (let i4 = array.length - 1; i4 > 0; i4--) {
      const j3 = Math.floor(rng.next() * (i4 + 1));
      [array[i4], array[j3]] = [array[j3], array[i4]];
    }
    return array;
  }
  var bagOfRegex = /^(\d+)?\+?(\d+)? ?bag of (.*)$/;
  var sequenceOfRegex = /^(\d+) ?(random)? ?sequence of (.*)$/;
  var withRegex = /^(.*) with (\d+) history(?: (\d+) rolls)?(?: starting with (.*))?$/;
  var listItemRegex = /^(\d*)?\*?(.*)$/;
  var firstRegex = /^(.*) but first (.*)$/;
  function listNormalize(list) {
    return list.split(",").flatMap((x3) => {
      const str = x3.trim();
      if (str.length === 0)
        return [];
      const match = listItemRegex.exec(str);
      if (!match)
        return [];
      const [, count, item] = match;
      if (!count)
        return item;
      else
        return Array(parseInt(count, 10)).fill(item);
    });
  }
  var whitespaceRegex = /\s+/g;
  function chooseRandom(list) {
    return list[Math.floor(rng.next() * list.length)];
  }
  function createRandomizer(str) {
    str = str.replace(whitespaceRegex, " ");
    let first;
    let res = null;
    res = firstRegex.exec(str);
    if (res) {
      const [, list2, firstList] = res;
      first = listNormalize(firstList);
      str = list2;
    }
    res = bagOfRegex.exec(str);
    if (res) {
      const list2 = listNormalize(res[3]);
      const count = res[1] ? parseInt(res[1], 10) : list2.length;
      const bonus = res[2] ? parseInt(res[2], 10) : 0;
      const len = count + bonus;
      return function* () {
        let bag = shuffleArray(list2.slice());
        let bonusBag2 = [];
        if (first) {
          const piece2 = chooseRandom(first);
          yield piece2;
          bag = bag.filter((x3) => x3 !== piece2);
        }
        while (true) {
          for (let i4 = 0; i4 < len; i4++) {
            if (!bag.length) {
              if (bonus) {
                if (!bonusBag2.length)
                  bonusBag2 = shuffleArray(list2.slice());
                yield bonusBag2.pop();
              } else {
                yield chooseRandom(list2);
              }
            } else {
              yield bag.pop();
            }
          }
          bag = shuffleArray(list2.slice());
        }
      };
    }
    res = sequenceOfRegex.exec(str);
    if (res) {
      const list2 = listNormalize(res[3]);
      const len = res[1] ? parseInt(res[1]) : void 0;
      const random = res[2] === "random";
      let newList = first ? [chooseRandom(first)] : [];
      if (len) {
        while (newList.length < len) {
          if (random) {
            newList.push(chooseRandom(list2));
          } else {
            newList.push(...list2);
          }
        }
        newList = newList.slice(0, len);
      } else {
        newList = list2;
      }
      return function* () {
        while (true) {
          yield* newList;
        }
      };
    }
    res = withRegex.exec(str);
    if (res) {
      const list2 = listNormalize(res[1]);
      const historyLen = parseInt(res[2]);
      const rolls = res[3] ? parseInt(res[3]) : void 0;
      const history = res[4] ? listNormalize(res[4]) : [];
      return function* () {
        if (first) {
          const piece2 = chooseRandom(first);
          yield piece2;
          if (history.length === historyLen)
            history.shift();
          history.push(piece2);
        }
        while (true) {
          const arr = shuffleArray(list2.slice());
          for (let i4 = 0; i4 < (rolls ?? list2.length); i4++) {
            const piece2 = chooseRandom(arr);
            if (!history.includes(piece2) || rolls && i4 + 1 === rolls) {
              yield piece2;
              if (history.length === historyLen)
                history.shift();
              history.push(piece2);
              break;
            }
          }
        }
      };
    }
    const list = listNormalize(str);
    return function* () {
      if (first)
        yield chooseRandom(first);
      while (true) {
        yield list[Math.floor(rng.next() * list.length)];
      }
    };
  }
  var rand = (str) => wrapGenerator(createRandomizer(str));
  var tgm1 = rand(
    `I,J,L,O,S,T,Z
		with 4 history 4 rolls starting with Z,Z,Z,Z
		but first I,J,L,T`
  );
  var tgm2 = rand(
    `I,J,L,O,S,T,Z
		with 4 history 6 rolls starting with Z,S,Z,S
		but first I,J,L,T`
  );
  var tgm3 = rand(
    `5*I,5*J,5*L,5*O,5*S,5*T,5*Z
		with 4 history 6 rolls starting with Z,S,Z,S
		${/*weighted on frequency // maybe?*/
    ""}
		but first I,J,L,T`
  );
  var ace = rand("bag of I,J,L,O,S,T,Z but first I,J,L,T");
  var guideline = rand("bag of I,J,L,O,S,T,Z");
  var alexey = rand("I,J,L,O,S,T,Z");
  var nes2 = rand("I,J,L,O,S,T,Z with 1 history");
  var square = rand("bag of 9*I,9*J,9*L,9*O,9*S,9*T,9*Z");
  var sega = rand("1000 random sequence of I,J,L,O,S,T,Z");
  var bonusBag = rand("7+1 bag of I,J,L,O,S,T,Z");
  var bag8 = rand("8 bag of I,J,L,O,S,T,Z");
  var iOnly = rand("I");
  var noI = rand("bag of J,L,O,S,T,Z");

  // src/display/tetrion/preview.ts
  var Preview = class {
    constructor() {
      this.grabBag = [];
      this.randomizer = guideline;
    }
    fillGrabBag() {
      while (this.grabBag.length <= 7) {
        this.grabBag.push(PieceData[this.randomizer.next()].index);
      }
      this.dirty = true;
    }
    reset() {
      this.grabBag = [];
      this.randomizer.reset();
      this.fillGrabBag();
      this.draw();
    }
    next() {
      const next = this.grabBag.shift();
      this.fillGrabBag();
      return next;
    }
    /**
     * Draws the piece preview.
     */
    draw() {
      clear(Elements.previewCtx);
      const drawCount = settings.Next === void 0 ? 6 : settings.Next;
      if (Game.state === 0 /* Normal */) {
      }
      for (let i4 = 0; i4 < drawCount; i4++) {
        let p3 = this.grabBag[i4];
        const initInfo = settings.RotSys.initinfo[p3];
        const r3 = initInfo[2];
        const rect = pieces[p3].rect;
        const rotSysColor = settings.RotSys.color[p3];
        if (i4 === 0) {
          if (piece.ihs === true) {
            if (hold.piece === null) {
              p3 = this.grabBag[i4 + 1];
            } else {
              p3 = hold.piece;
            }
          }
          switch (piece.irsDir) {
            case -1:
              draw(
                pieces[p3].tetro[(r3 + 3) % 4],
                -rect[r3][0] + (4 - rect[r3][2] + rect[r3][0]) / 2,
                -rect[r3][1] + (3 - rect[r3][3] + rect[r3][1]) / 2 + i4 * 3,
                Elements.previewCtx,
                rotSysColor
              );
              break;
            case 0:
              draw(
                pieces[p3].tetro[r3],
                -rect[r3][0] + (4 - rect[r3][2] + rect[r3][0]) / 2,
                -rect[r3][1] + (3 - rect[r3][3] + rect[r3][1]) / 2 + i4 * 3,
                Elements.previewCtx,
                rotSysColor
              );
              $2("irs-indicator").classList.add("gone");
              break;
            case 1:
              draw(
                pieces[p3].tetro[(r3 + 1) % 4],
                -rect[r3][0] + (4 - rect[r3][2] + rect[r3][0]) / 2,
                -rect[r3][1] + (3 - rect[r3][3] + rect[r3][1]) / 2 + i4 * 3,
                Elements.previewCtx,
                rotSysColor
              );
              break;
            case 2:
              draw(
                pieces[p3].tetro[(r3 + 2) % 4],
                -rect[r3][0] + (4 - rect[r3][2] + rect[r3][0]) / 2,
                -rect[r3][1] + (3 - rect[r3][3] + rect[r3][1]) / 2 + i4 * 3,
                Elements.previewCtx,
                rotSysColor
              );
              break;
          }
        } else {
          if (piece.ihs === true && hold.piece === null) {
            p3 = this.grabBag[i4 + 1];
          }
          draw(
            pieces[p3].tetro[r3],
            -rect[r3][0] + (4 - rect[r3][2] + rect[r3][0]) / 2,
            -rect[r3][1] + (3 - rect[r3][3] + rect[r3][1]) / 2 + i4 * 3,
            Elements.previewCtx,
            rotSysColor
          );
        }
      }
      this.dirty = false;
    }
  };
  var preview = new Preview();

  // src/display/tetrion/messages.ts
  function showTetrisMessage(contents) {
    if (settings.Messages) {
      const clearEle = $2("clear");
      clearEle.innerHTML = contents;
      clearEle.classList.remove("flyaway");
      void clearEle.offsetWidth;
      clearEle.classList.add("flyaway");
      const comboname = settings.Voice && settings.Voicebank === 2 ? "ren" : "combo";
      const renEle = $2("renmsg");
      const renDiv = $2("rendiv");
      if (Mutable.combo < 2) {
        renEle.innerHTML = "";
      } else if (Mutable.combo > 19) {
        renEle.innerHTML = t3(comboname, Mutable.combo - 1);
        renDiv.style["animation-duration"] = "0.041s";
      } else {
        renEle.innerHTML = t3(comboname, Mutable.combo - 1);
        renDiv.style["animation-duration"] = 0.5 - 0.485 * ((Mutable.combo - 2) / 18) + "s";
      }
      const b2bEle = $2("b2bmsg");
      const b2bDiv = $2("b2bdiv");
      if (Mutable.b2b <= 0) {
        b2bEle.innerHTML = "";
      } else {
        b2bEle.innerHTML = t3("streak", Mutable.b2b);
        b2bDiv.classList.remove("b2b-fade");
        void b2bDiv.offsetWidth;
        b2bDiv.classList.add("b2b-fade");
      }
    }
  }
  function showSpinMessage(piece2, mini) {
    showTetrisMessage(t3(mini ? "mini" : "spin", piece2));
  }
  function sendClearTetrisMessage(spin, mini) {
    const pieceName = ["I", "J", "L", "O", "S", "T", "Z"][piece.index];
    let message = "";
    if (spin) {
      message = t3("spin", pieceName);
    } else if (mini) {
      message = t3("mini", pieceName);
    }
    if (Mutable.b2b > 1 && (Mutable.lineClear > 3 || spin)) {
      message = t3("b2b", message) + "<br>";
    }
    message += t3("line", Mutable.lineClear);
    if (Mutable.b2b > 1 && (Mutable.lineClear > 3 || spin)) {
      message += "<br>" + t3("b2b_streak", Mutable.b2b) + "</small>";
    }
    showTetrisMessage(message);
  }
  function clearTetrisMessage() {
    $2("clear").innerHTML = "";
    $2("renmsg").innerHTML = "";
    $2("b2bmsg").innerHTML = "";
  }

  // src/display/tetrion/stats.ts
  function statistics() {
    const {
      timeCanvas,
      timeCtx
    } = Elements;
    const time = timeString(Mutable.scoreTime || 0);
    const fsbl = 30;
    let skipL = Mutable.frameSkipped % (fsbl * 2);
    let skipR = Mutable.frameSkipped % (fsbl * 2);
    skipL = skipL - fsbl < 0 ? 0 : skipL - fsbl;
    skipR = skipR > fsbl ? fsbl : skipR;
    skipL = skipL / fsbl * timeCanvas.width;
    skipR = skipR / fsbl * timeCanvas.width;
    timeCtx.clearRect(0, 0, timeCanvas.width, timeCanvas.height);
    timeCtx.fillText(time, timeCanvas.width / 2, timeCanvas.height / 2);
    timeCtx.fillRect(skipL, timeCanvas.height - 0.2, skipR, timeCanvas.height);
  }
  function statisticsStack() {
    const {
      statsPiece,
      statsLines,
      statsLevel,
      statsIpieces,
      statsScore,
      statsFinesse
    } = Elements;
    $setText(statsPiece, Mutable.piecesSet);
    $setText(statsFinesse, Mutable.statsFinesse);
    const scoreEle = $2("score");
    const scoreLabelEle = $2("score-label");
    const newScoreEle = $2("nesscore");
    const nesratetr = $2("nesratetr");
    if (Game.type === 8 /* Retro */) {
      scoreEle.classList.add("gone");
      scoreLabelEle.classList.remove("gone");
      newScoreEle.classList.remove("gone");
      nesratetr.classList.remove("gone");
    } else if (Game.type === 9 /* Grades */) {
      scoreEle.classList.add("gone");
      scoreLabelEle.classList.add("gone");
    } else {
      scoreEle.classList.remove("gone");
      scoreLabelEle.classList.remove("gone");
      newScoreEle.classList.add("gone");
      nesratetr.classList.add("gone");
    }
    const levelEle = $2("level");
    if (Game.type === 0 /* Sprint */ || Game.type === 5 /* ScoreAttack */) {
      $setText(statsLines, Mutable.lineLimit - Mutable.lines);
      $setText(statsLevel, "");
    } else if (Game.type === 1 /* Marathon */ || Game.type === 7) {
      $setText(statsLines, Mutable.lines);
      levelEle.innerHTML = t3("level", Mutable.level + 1);
    } else if (Game.type === 8 /* Retro */) {
      $setText(statsLines, Mutable.lines);
      levelEle.innerHTML = t3("level", Mutable.level + 1);
      if (Mutable.lineDrought < 13) {
        $setText(statsIpieces, Mutable.lineAmount);
      }
      if (Game.params.bType === true) {
        $setText(statsLines, Mutable.lineLimit - Mutable.lines);
      }
    } else if (Game.type === 6 /* Master */) {
      $setText(statsLines, Mutable.lines);
      levelEle.innerHTML = t3("level_m", Mutable.level + 1);
    } else if (Game.type === 3 /* Survival */) {
      if (Game.params.digOffset || Game.params.digOffset !== 0) {
        $setText(statsLevel, Game.params.digOffset + "+");
      } else {
        $setText(statsLevel, "");
      }
      $setText(statsLines, Mutable.lines);
    } else if (Game.type === 9 /* Grades */) {
      $setText(statsLines, Mutable.lines);
      $setText(
        statsLevel,
        `${Mutable.leveltgmvisible}/${(Math.floor(Mutable.leveltgm / 100 % 10) + 1) * 100}`
      );
    } else {
      $setText(statsLines, Mutable.lines);
      $setText(statsLevel, "");
    }
    const holdTextEle = $2("holdtext");
    if (Game.type !== 8) {
      holdTextEle.innerHTML = "<span class='white-border-span'>Hold</span>";
    } else {
      holdTextEle.innerHTML = "";
    }
    if (Game.type === 8 /* Retro */) {
      $2("lineshower").classList.remove("gone");
    } else {
      $2("lineshower").classList.add("gone");
    }
    if (Game.type !== 6 /* Master */) {
      $2("rainbow").classList.add("gone");
    } else {
    }
    if (Game.type === 8 /* Retro */ && Game.params.retroSkin == true) {
      makeSprite();
      switch (parseInt(
        Mutable.level.toString().charAt(Mutable.level.toString().length - 1)
      )) {
        case 0:
          nes[9] = ["#0058f8", "#ffffff"];
          nes[2] = ["#0058f8", "#ffffff00"];
          nes[7] = ["#3ebeff", "#ffffff00"];
          break;
        case 1:
          nes[9] = ["#00a800", "#ffffff"];
          nes[2] = ["#00a800", "#ffffff00"];
          nes[7] = ["#80d010", "#ffffff00"];
          break;
        case 2:
          nes[9] = ["#db00cd", "#ffffff"];
          nes[2] = ["#db00cd", "#ffffff00"];
          nes[7] = ["#f878f8", "#ffffff00"];
          break;
        case 3:
          nes[9] = ["#0058f8", "#ffffff"];
          nes[2] = ["#0058f8", "#ffffff00"];
          nes[7] = ["#5bdb57", "#ffffff00"];
          break;
        case 4:
          nes[9] = ["#e7005b", "#ffffff"];
          nes[2] = ["#e7005b", "#ffffff00"];
          nes[7] = ["#58f898", "#ffffff00"];
          break;
        case 5:
          nes[9] = ["#58f898", "#ffffff"];
          nes[2] = ["#58f898", "#ffffff00"];
          nes[7] = ["#6b88ff", "#ffffff00"];
          break;
        case 6:
          nes[9] = ["#f83800", "#ffffff"];
          nes[2] = ["#f83800", "#ffffff00"];
          nes[7] = ["#7f7f7f", "#ffffff00"];
          break;
        case 7:
          nes[9] = ["#6b47ff", "#ffffff"];
          nes[2] = ["#6b47ff", "#ffffff00"];
          nes[7] = ["#ab0023", "#ffffff00"];
          break;
        case 8:
          nes[9] = ["#0058f8", "#ffffff"];
          nes[2] = ["#0058f8", "#ffffff00"];
          nes[7] = ["#f83800", "#ffffff00"];
          break;
        case 9:
          nes[9] = ["#f83800", "#ffffff"];
          nes[2] = ["#f83800", "#ffffff00"];
          nes[7] = ["#ffa347", "#ffffff00"];
          break;
      }
    } else {
      nes[0] = ["#c1c1c1", "#ffffff00"];
      nes[1] = ["#3ebeff", "#ffffff"];
      nes[2] = ["#0058f8", "#ffffff00"];
      nes[3] = ["#f83800", "#ffffff00"];
      nes[4] = ["#ffa347", "#ffffff"];
      nes[5] = ["#80d010", "#ffffff00"];
      nes[6] = ["#db00cd", "#ffffff"];
      nes[7] = ["#ab0023", "#ffffff00"];
      nes[8] = ["#898989", "#ffffff00"];
      nes[9] = ["#0058f8", "#ffffff"];
    }
    $setText(statsScore, (~~Mutable.newScore).toLocaleString());
  }

  // src/display/tetrion/stack.ts
  var Stack = class {
    /**
     * Creates a matrix for the playfield.
     */
    new(x3, y4, hy) {
      const cells = new Array(x3);
      for (let i4 = 0; i4 < x3; i4++) {
        cells[i4] = new Array(hy + y4);
      }
      this.width = x3;
      this.height = hy + y4;
      this.hiddenHeight = hy;
      this.grid = cells;
      this.dirty = true;
    }
    addPiece(tetro) {
      shiftMatrix(2 /* DOWN */);
      $2("a").classList.remove("greyed");
      Mutable.lineClear = 0;
      let once = false;
      Mutable.lockflashX = piece.x;
      Mutable.lockflashY = piece.y;
      Mutable.lockflashTetro = tetro;
      Mutable.lockflash = 2;
      Mutable.lockflashOn = true;
      spinCheck();
      let range2 = [];
      let valid = false;
      for (let x3 = 0; x3 < tetro.length; x3++) {
        for (let y4 = 0; y4 < tetro[x3].length; y4++) {
          if (tetro[x3][y4] && y4 + piece.y >= 0) {
            this.grid[x3 + piece.x][y4 + piece.y] = settings.RotSys.color[piece.index];
            if (!once || x3 + piece.x < Mutable.column) {
              Mutable.column = x3 + piece.x;
              once = true;
            }
            if (range2.indexOf(y4 + piece.y) === -1) {
              range2.push(y4 + piece.y);
              if (y4 + piece.y >= this.hiddenHeight)
                valid = true;
            }
          }
        }
      }
      if (!valid) {
        Game.state = 9 /* BlockOut */;
        $setText(Elements.msg, t3("lock_out"));
        Game.types[Game.type].die();
        menu(FAILED_MENU_ID);
        sound.playSFX("gameover");
        sound.playvox("lose");
        return;
      }
      range2 = range2.sort((a4, b3) => a4 - b3);
      for (let row = range2[0], len = row + range2.length; row < len; row++) {
        let count = 0;
        for (let x3 = 0; x3 < this.width; x3++) {
          if (this.grid[x3][row])
            count++;
        }
        if (count === this.width) {
          Mutable.lineClear++;
          const rowInDig = Mutable.digLines.indexOf(row);
          if (rowInDig !== -1) {
            for (let y4 = 0; y4 < rowInDig; y4++) {
              Mutable.digLines[y4]++;
            }
            Mutable.digLines.splice(rowInDig, 1);
          }
          Mutable.clearRows.push(row);
          for (let y4 = row; y4 >= row; y4--) {
            for (let x3 = 0; x3 < this.width; x3++) {
              this.grid[x3][y4] = 0;
            }
          }
          for (let x3 = 0; x3 < this.width; x3++) {
            this.grid[x3][0] = void 0;
          }
        }
      }
      if (Mutable.lineClear !== 0) {
        Mutable.lockflash = 0;
        Mutable.lockflashOn = false;
      }
      if (piece.areLimit === 0 && (Game.params.entryDelay !== 1 || Game.params.entryDelay !== 2 || Game.params.entryDelay === void 0)) {
        stack.clearLines();
      }
      if (Game.type === 9 /* Grades */) {
        Mutable.levelCheck = Mutable.leveltgm;
      }
      let scoreAdd = BigInt(Mutable.level + 1);
      let garbage = 0;
      const pieceName = ["I", "J", "L", "O", "S", "T", "Z"][piece.index];
      if (Game.type === 8 /* Retro */) {
        if (Mutable.lineClear !== 0) {
          switch (Mutable.lineClear) {
            case 1:
              Mutable.scoreNes += 40 * (Mutable.level + 1);
              Mutable.nontetNes += Mutable.lineClear;
              showTetrisMessage("SINGLE");
              break;
            case 2:
              Mutable.scoreNes += 100 * (Mutable.level + 1);
              Mutable.nontetNes += Mutable.lineClear;
              showTetrisMessage("DOUBLE");
              break;
            case 3:
              Mutable.scoreNes += 300 * (Mutable.level + 1);
              Mutable.nontetNes += Mutable.lineClear;
              showTetrisMessage("TRIPLE");
              break;
            case 4:
              Mutable.scoreNes += 1200 * (Mutable.level + 1);
              Mutable.tetNes += Mutable.lineClear;
              showTetrisMessage("TETRIS");
              break;
          }
          scoreNesRefresh();
          Mutable.tetRateNes = Mutable.tetNes / (Mutable.tetNes + Mutable.nontetNes);
          tetRateNesRefresh();
          sound.playSFX("erase", Mutable.lineClear);
          sound.playvox("erase", Mutable.lineClear);
        }
      } else if (Mutable.lineClear !== 0) {
        if (Mutable.isSpin) {
          scoreAdd = scoreAdd * ([800n, 1200n, 1600n, 2000n][Mutable.lineClear - 1] * 2n ** BigInt(Mutable.b2b + Mutable.combo));
          garbage = [
            [2, 4, 6, 8],
            [3, 6, 9, 12]
          ][Mutable.b2b !== 0 ? 1 : 0][Mutable.lineClear - 1];
          if (piece.index === 5) {
            if (Mutable.b2b > 0) {
              sound.playvox("b2b_tspin", Mutable.lineClear);
            } else {
              sound.playvox("tspin", Mutable.lineClear);
            }
          } else {
            sound.playvox("erase", Mutable.lineClear);
          }
          if (Mutable.b2b > 0) {
            sound.playSFX("b2b_tspin", Mutable.lineClear);
          } else {
            sound.playSFX("tspin", Mutable.lineClear);
          }
          if (Mutable.isMini) {
            Mutable.newScore += [0n, 200n, 400n, 600n, 800n][Mutable.lineClear] * BigInt(Mutable.level + 1);
          } else if (Mutable.b2b > 0) {
            Mutable.newScore += BigInt(
              Math.floor(
                [400, 800, 1200, 1600, 3e3][Mutable.lineClear] * (Mutable.level + 1) * 1.5
              )
            );
          } else {
            Mutable.newScore += [400n, 800n, 1200n, 1600n, 3000n][Mutable.lineClear] * BigInt(Mutable.level + 1);
          }
          Mutable.b2b += 1;
        } else if (Mutable.lineClear === 4) {
          scoreAdd *= 800n * 2n ** BigInt(Mutable.b2b + Mutable.combo);
          garbage = [4, 5][Mutable.b2b !== 0 ? 1 : 0];
          if (Mutable.b2b > 0) {
            Mutable.newScore += BigInt(
              Math.floor(800 * (Mutable.level + 1) * 1.5)
            );
            sound.playvox("b2b_erase", Mutable.lineClear);
            sound.playSFX("b2b_erase", Mutable.lineClear);
          } else {
            Mutable.newScore += BigInt(800 * (Mutable.level + 1));
            sound.playvox("erase", Mutable.lineClear);
            sound.playSFX("erase", Mutable.lineClear);
          }
          Mutable.b2b += 1;
        } else {
          scoreAdd *= [100n, 300n, 500n, 800n][Mutable.lineClear - 1] * 2n ** BigInt(Mutable.combo);
          Mutable.newScore += BigInt(
            [100, 300, 500, 800][Mutable.lineClear - 1] * (Mutable.level + 1)
          );
          Mutable.b2b = 0;
          $2("b2bmsg").innerHTML = "";
          garbage = [0, 1, 2, 4][Mutable.lineClear - 1];
          sound.playSFX("erase", Mutable.lineClear);
          sound.playvox("erase", Mutable.lineClear);
        }
        garbage += Math.floor(Mutable.combo / 2);
        if (Mutable.combo < 1) {
        } else if (Mutable.combo < 5) {
          sound.playvox("ren1");
        } else if (Mutable.combo < 10) {
          sound.playvox("ren2");
        } else {
          sound.playvox("ren3");
        }
        if (Mutable.combo > 0) {
          if (Mutable.combo > 7 && settings.Soundbank === 6) {
            sound.playSFX("ren/ren", 7);
          } else if (Mutable.combo > 4 && settings.Soundbank === 9) {
            sound.playSFX("ren/ren", 4);
          } else if (Mutable.combo > 20) {
            sound.playSFX("ren/ren", 20);
          } else {
            sound.playSFX("ren/ren", Mutable.combo);
          }
        }
        Mutable.combo += 1;
        if (Mutable.combo > 1) {
          Mutable.newScore += BigInt(
            50 * (Mutable.combo - 1) * Mutable.level
          );
        }
        if (Game.type === 9 /* Grades */) {
          switch (Mutable.lineClear) {
            case 1:
              Mutable.leveltgm += 1;
              Mutable.leveltgmvisible += 1;
              break;
            case 2:
              Mutable.leveltgm += 2;
              Mutable.leveltgmvisible += 2;
              break;
            case 3:
              Mutable.leveltgm += 4;
              Mutable.leveltgmvisible += 4;
              break;
            case 4:
              Mutable.leveltgm += 6;
              Mutable.leveltgmvisible += 6;
              break;
          }
        }
        sendClearTetrisMessage(
          Mutable.isSpin,
          Mutable.isMini && Mutable.isSpin
        );
        Game.types[Game.type].onLineClear(Mutable.lineClear, piece.index, Mutable.isSpin);
      } else {
        if (Mutable.isSpin) {
          scoreAdd *= 2n ** BigInt(Mutable.b2b) * 400n;
          if (settings.Soundbank !== 0 && Mutable.lineClear === 0) {
            sound.playSFX("tspin", Mutable.lineClear);
          }
          showSpinMessage(pieceName, Mutable.isMini);
          if (!Mutable.isMini) {
            Mutable.newScore += [400n, 800n, 1200n, 1600n][Mutable.lineClear] * BigInt(Mutable.level + 1);
          } else {
            Mutable.newScore += 100n * BigInt(Mutable.level + 1);
          }
          if (piece.index === 5) {
            sound.playvox("tspin", Mutable.lineClear);
          }
        } else {
          scoreAdd = 0n;
        }
        if (Mutable.combo > 1) {
          if (settings.Voice && settings.Voicebank === 2) {
            showTetrisMessage(t3("ren", Mutable.combo - 1));
          } else {
            showTetrisMessage(t3("combo", Mutable.combo - 1));
          }
        }
        if (Mutable.combo > 10) {
          sound.playSFX("bravo");
        }
        Mutable.combo = 0;
        $2("renmsg").innerHTML = "";
      }
      Mutable.lines += Mutable.lineClear;
      if (Game.type !== 9) {
        Mutable.levelCheck = Mutable.level;
      }
      if (Game.type === 1 /* Marathon */ || Game.type === 6 /* Master */) {
        if (Game.types[Game.type].params.levelCap === 1) {
          Mutable.level = Math.min(Math.floor(Mutable.lines / 10), 14);
        } else {
          Mutable.level = Math.floor(Mutable.lines / 10);
        }
      } else if (Game.type === 7) {
        Mutable.level = Math.floor(Mutable.lines / 30);
      } else if (Game.type === 8 /* Retro */) {
        const startLevel = Game.types[Game.type].params?.startingLevel ?? 0;
        const startingLines = Math.min(
          Math.max(100, startLevel * 10 - 50),
          startLevel * 10 + 10
        );
        Mutable.level = Math.floor(
          Math.max(
            (Mutable.lines + 10 - startingLines + startLevel * 10) / 10,
            startLevel
          )
        );
        makeSprite();
        stack.draw();
      }
      if (Game.type !== 9) {
        if (Mutable.levelCheck !== Mutable.level) {
          sound.playSFX("levelup");
          const levelEle = $2("level");
          levelEle.classList.remove("level-flash");
          void levelEle.offsetWidth;
          levelEle.classList.add("level-flash");
        }
      }
      if (Game.type === 1 /* Marathon */) {
        const stackEle = $2("stack");
        if (Game.params.invisibleMarathon === true && Mutable.level > 19) {
          if (Mutable.watchingReplay) {
            stackEle.classList.add("invisible-replay");
          } else {
            stackEle.classList.add("invisible");
          }
        } else {
          stackEle.classList.remove("invisible-replay");
          stackEle.classList.remove("invisible");
        }
      }
      if (Mutable.level >= 20 && Game.type === 1 /* Marathon */) {
        if (Mutable.playedLevelingbgmMarathon[1] === false) {
          sound.killbgm();
          sound.playbgm("marathon3");
          Mutable.playedLevelingbgmMarathon[1] = true;
        }
      } else if (Mutable.level >= 10 && Game.type === 1 /* Marathon */) {
        if (Mutable.playedLevelingbgmMarathon[0] === false) {
          sound.killbgm();
          sound.playbgm("marathon2");
          Mutable.playedLevelingbgmMarathon[0] = true;
        }
      }
      if (Mutable.leveltgm >= 700 && Game.type === 9 /* Grades */) {
        if (Mutable.playedLevelingbgmGrades[1] === false) {
          sound.killbgm();
          sound.playbgm("grade3");
          Mutable.playedLevelingbgmGrades[1] = true;
        }
      } else if (Mutable.leveltgm >= 500 && Game.type === 9 /* Grades */) {
        if (Mutable.playedLevelingbgmGrades[0] === false) {
          sound.killbgm();
          sound.playbgm("grade2");
          Mutable.playedLevelingbgmGrades[0] = true;
        }
      }
      Mutable.score += BigInt(scoreAdd ** 16n ** BigInt(Mutable.allclear));
      makeSprite();
      stack.draw();
      let pc = true;
      for (let x3 = 0; x3 < this.width; x3++)
        for (let y4 = 0; y4 < this.height; y4++)
          if (this.grid[x3][y4])
            pc = false;
      if (pc) {
        Mutable.score += 1000000n * 16n ** BigInt(Mutable.allclear);
        Mutable.allclear++;
        sound.playSFX("bravo");
        showTetrisMessage(t3("perfect_clear"));
        garbage += 10;
      }
      const { backFire } = Game.params;
      if (backFire) {
        if (backFire === 1) {
          garbage = [0, 0, 1, 2, 4][Mutable.lineClear];
        } else if (backFire === 3) {
          garbage *= Math.floor(Mutable.lines / 2);
        }
        if (garbage !== 0) {
          if (backFire === 1) {
            const bottomRow = [];
            for (let x3 = 0; x3 < this.width; x3++) {
              bottomRow.push(
                this.grid[x3][this.height - 1] > 0 ? 8 : 0
              );
            }
            for (let y4 = 0; y4 < garbage; y4++) {
              this.rowRise(bottomRow, piece);
            }
          } else if (backFire === 2 || backFire === 3) {
            const hole = randomInt(0, 10);
            const arrRow = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
            arrRow[hole] = 0;
            for (let y4 = 0; y4 < garbage; y4++) {
              this.rowRise(arrRow, piece);
            }
          }
        }
      }
      Mutable.statsFinesse += piece.finesse - finesse[piece.index][piece.pos][Mutable.column];
      Mutable.piecesSet++;
      if (Game.type === 9 /* Grades */) {
        if (Mutable.leveltgmvisible % 100 !== 99) {
          Mutable.leveltgm++;
          Mutable.leveltgmvisible++;
        }
        if (Game.type === 9 /* Grades */) {
          if (Math.floor(Mutable.levelCheck / 100 % 10) !== Math.floor(Mutable.leveltgm / 100 % 10)) {
            sound.playSFX("levelup");
          }
        }
      }
      Mutable.column = 0;
      const grid = this.grid;
      let clearPath = false;
      for (let i4 = 0; i4 < stack.width; i4++) {
        for (let j3 = 0; j3 <= stack.height; j3++) {
          if (j3 === stack.height) {
            clearPath = true;
          }
          if (grid[i4][j3] !== void 0 && grid[i4][j3] !== 0) {
            break;
          }
        }
        if (clearPath) {
          break;
        }
      }
      Mutable.alarmtest = false;
      for (const test in grid) {
        if (grid[test][8] !== void 0 && !Mutable.alarm && !clearPath || grid[test][11] !== void 0 && Mutable.alarm) {
          Mutable.alarmtest = true;
        }
      }
      if (clearPath && Mutable.alarm) {
        Mutable.alarmtest = false;
      }
      if (Mutable.alarmtest && !Mutable.alarm) {
        Mutable.alarm = true;
        Mutable.alarmtest = false;
        sound.playSFX("alarm");
        $2("bgStack").classList.add("alarm");
        if (Game.type === 3 /* Survival */ || Game.type === 7 || Game.type === 6 /* Master */ && Game.params.delayStrictness === 2) {
          console.log("eee");
          sound.raisesidebgm();
        }
      } else if (!Mutable.alarmtest && !Mutable.alarm) {
        Mutable.alarm = false;
        sound.stopSFX("alarm");
        $2("bgStack").classList.remove("alarm");
        if (Game.type === 3 /* Survival */ || Game.type === 7 || Game.type === 6 /* Master */ && Game.params.delayStrictness === 2) {
          sound.lowersidebgm();
        }
      }
      this.dirty = true;
    }
    /**
     * Raise a garbage line.
     * @author farter
     */
    clearLines() {
      Mutable.clearRows.forEach((element) => {
        for (let y4 = element; y4 >= 1; y4--) {
          for (let x3 = 0; x3 < stack.width; x3++) {
            stack.grid[x3][y4] = stack.grid[x3][y4 - 1];
          }
        }
      });
      if (Mutable.clearRows.length !== 0) {
        if (Mutable.lineARE !== 0) {
          sound.playSFX("linefall");
        }
        Mutable.clearRows = [];
        stack.draw();
      }
    }
    rowRise(arrRow, objPiece) {
      let isEmpty = true;
      for (let x3 = 0; x3 < this.width; x3++) {
        for (let y4 = 0; y4 < this.height - 1; y4++) {
          this.grid[x3][y4] = this.grid[x3][y4 + 1];
        }
        if (arrRow[x3])
          isEmpty = false;
        this.grid[x3][this.height - 1] = arrRow[x3];
      }
      let topout = false;
      for (let y4 = 0; y4 < Mutable.digLines.length; y4++) {
        Mutable.digLines[y4]--;
        if (Mutable.digLines[y4] < 0) {
          topout = true;
        }
      }
      if (topout) {
        Game.state = 9 /* BlockOut */;
        $setText(Elements.msg, "TOP OUT!");
        menu(FAILED_MENU_ID);
        Game.types[Game.type].die();
        sound.playSFX("gameover");
        sound.playvox("lose");
      }
      if (!isEmpty) {
        Mutable.digLines.push(this.height - 1);
      }
      if (!piece.dead) {
        if (!piece.moveValid(0, 0, piece.tetro)) {
          piece.y -= 1;
          if (piece.y + pieces[piece.index].rect[3] <= this.hiddenHeight - 2) {
            Game.state = 9 /* BlockOut */;
            $setText(Elements.msg, "OOPS!");
            menu(FAILED_MENU_ID);
            Game.types[Game.type].die();
            sound.playSFX("gameover");
            sound.playvox("lose");
          }
        }
        piece.dirty = true;
      }
      this.dirty = true;
    }
    /**
     * Draws the stack.
     * TODO: remove this, switch to only webgl
     * @deprecated
     */
    draw() {
      clear(Elements.stackCtx);
      if (settings.Outline === 0 || settings.Outline === 1 || settings.Outline === 2 && (Game.state === 5 /* Loss */ || Game.state === 1 /* Win */)) {
        draw(
          this.grid,
          0,
          -this.hiddenHeight,
          Elements.stackCtx,
          void 0,
          0.3
        );
      }
      if (settings.Outline === 1 || settings.Outline === 3) {
        const b3 = Math.floor(Mutable.cellSize / 8);
        const c4 = Mutable.cellSize;
        const hhc = this.hiddenHeight * c4;
        const pi = Math.PI;
        const lineCanvas = document.createElement("canvas");
        lineCanvas.width = Elements.stackCanvas.width;
        lineCanvas.height = Elements.stackCanvas.height;
        const lineCtx = lineCanvas.getContext("2d");
        lineCtx.fillStyle = "rgba(255,255,255,.5)";
        lineCtx.beginPath();
        for (let x3 = 0, len = this.width; x3 < len; x3++) {
          for (let y4 = 0, wid = this.height; y4 < wid; y4++) {
            if (this.grid[x3][y4]) {
              if (x3 < this.width - 1 && !this.grid[x3 + 1][y4]) {
                lineCtx.fillRect(x3 * c4 + c4 - b3, y4 * c4 - hhc, b3, c4);
              }
              if (x3 > 0 && !this.grid[x3 - 1][y4]) {
                lineCtx.fillRect(x3 * c4, y4 * c4 - hhc, b3, c4);
              }
              if (y4 < this.height - 1 && !this.grid[x3][y4 + 1]) {
                lineCtx.fillRect(x3 * c4, y4 * c4 - hhc + c4 - b3, c4, b3);
              }
              if (!this.grid[x3][y4 - 1]) {
                lineCtx.fillRect(x3 * c4, y4 * c4 - hhc, c4, b3);
              }
              if (x3 < this.width - 1 && y4 < this.height - 1) {
                if (!this.grid[x3 + 1][y4] && !this.grid[x3][y4 + 1]) {
                  lineCtx.clearRect(
                    x3 * c4 + c4 - b3,
                    y4 * c4 - hhc + c4 - b3,
                    b3,
                    b3
                  );
                  lineCtx.fillRect(
                    x3 * c4 + c4 - b3,
                    y4 * c4 - hhc + c4 - b3,
                    b3,
                    b3
                  );
                } else if (!this.grid[x3 + 1][y4 + 1] && this.grid[x3 + 1][y4] && this.grid[x3][y4 + 1]) {
                  lineCtx.moveTo(x3 * c4 + c4, y4 * c4 - hhc + c4 - b3);
                  lineCtx.lineTo(x3 * c4 + c4, y4 * c4 - hhc + c4);
                  lineCtx.lineTo(x3 * c4 + c4 - b3, y4 * c4 - hhc + c4);
                  lineCtx.arc(
                    x3 * c4 + c4,
                    y4 * c4 - hhc + c4,
                    b3,
                    3 * pi / 2,
                    pi,
                    true
                  );
                }
              }
              if (x3 < this.width - 1 && y4 > -this.hiddenHeight) {
                if (!this.grid[x3 + 1][y4] && !this.grid[x3][y4 - 1]) {
                  lineCtx.clearRect(
                    x3 * c4 + c4 - b3,
                    y4 * c4 - hhc,
                    b3,
                    b3
                  );
                  lineCtx.fillRect(
                    x3 * c4 + c4 - b3,
                    y4 * c4 - hhc,
                    b3,
                    b3
                  );
                } else if (!this.grid[x3 + 1][y4 - 1] && this.grid[x3 + 1][y4] && this.grid[x3][y4 - 1]) {
                  lineCtx.moveTo(x3 * c4 + c4 - b3, y4 * c4 - hhc);
                  lineCtx.lineTo(x3 * c4 + c4, y4 * c4 - hhc);
                  lineCtx.lineTo(x3 * c4 + c4, y4 * c4 - hhc + b3);
                  lineCtx.arc(
                    x3 * c4 + c4,
                    y4 * c4 - hhc,
                    b3,
                    pi / 2,
                    pi,
                    false
                  );
                }
              }
              if (x3 > 0 && y4 < this.height - 1) {
                if (!this.grid[x3 - 1][y4] && !this.grid[x3][y4 + 1]) {
                  lineCtx.clearRect(
                    x3 * c4,
                    y4 * c4 - hhc + c4 - b3,
                    b3,
                    b3
                  );
                  lineCtx.fillRect(
                    x3 * c4,
                    y4 * c4 - hhc + c4 - b3,
                    b3,
                    b3
                  );
                } else if (!this.grid[x3 - 1][y4 + 1] && this.grid[x3 - 1][y4] && this.grid[x3][y4 + 1]) {
                  lineCtx.moveTo(x3 * c4, y4 * c4 - hhc + c4 - b3);
                  lineCtx.lineTo(x3 * c4, y4 * c4 - hhc + c4);
                  lineCtx.lineTo(x3 * c4 + b3, y4 * c4 - hhc + c4);
                  lineCtx.arc(
                    x3 * c4,
                    y4 * c4 - hhc + c4,
                    b3,
                    pi * 2,
                    3 * pi / 2,
                    true
                  );
                }
              }
              if (x3 > 0 && y4 > -this.hiddenHeight) {
                if (!this.grid[x3 - 1][y4] && !this.grid[x3][y4 - 1]) {
                  lineCtx.clearRect(x3 * c4, y4 * c4 - hhc, b3, b3);
                  lineCtx.fillRect(x3 * c4, y4 * c4 - hhc, b3, b3);
                } else if (!this.grid[x3 - 1][y4 - 1] && this.grid[x3 - 1][y4] && this.grid[x3][y4 - 1]) {
                  lineCtx.moveTo(x3 * c4 + b3, y4 * c4 - hhc);
                  lineCtx.lineTo(x3 * c4, y4 * c4 - hhc);
                  lineCtx.lineTo(x3 * c4, y4 * c4 - hhc + b3);
                  lineCtx.arc(
                    x3 * c4,
                    y4 * c4 - hhc,
                    b3,
                    pi / 2,
                    pi * 2,
                    true
                  );
                }
              }
            }
          }
        }
        lineCtx.fill();
        Elements.stackCtx.globalCompositeOperation = "source-over";
        Elements.stackCtx.drawImage(lineCanvas, 0, 0);
        Elements.stackCtx.fillStyle = "#ffffff";
      }
      statisticsStack();
      this.dirty = false;
    }
  };
  function testSpace(x3, y4) {
    if (stack.grid[x3] !== void 0 && y4 < 24) {
      return stack.grid[x3][y4] !== void 0;
    }
    return true;
  }
  function spinCheck() {
    Mutable.isSpin = false;
    Mutable.isMini = false;
    if (piece.index !== 0 && piece.index !== 3) {
      let spinCheckCount = 0;
      for (let i4 = 0; i4 < pieces[piece.index].spin.highX[0].length; i4++) {
        if (testSpace(
          piece.x + pieces[piece.index].spin.highX[piece.pos][i4],
          piece.y + pieces[piece.index].spin.highY[piece.pos][i4]
        )) {
          spinCheckCount++;
        }
      }
      if (spinCheckCount < 2) {
        Mutable.isMini = true;
      }
      for (let i4 = 0; i4 < pieces[piece.index].spin.lowX[0].length; i4++) {
        if (testSpace(
          piece.x + pieces[piece.index].spin.lowX[piece.pos][i4],
          piece.y + pieces[piece.index].spin.lowY[piece.pos][i4]
        )) {
          spinCheckCount++;
        }
      }
      if (spinCheckCount >= 3 && Mutable.spinX === piece.x && Mutable.spinY === piece.y && !Mutable.rotationFailed) {
        Mutable.isSpin = true;
      }
    } else if (piece.index === 0) {
      let spinCheckCount = 0;
      for (let i4 = 0; i4 < 2; i4++) {
        if (testSpace(
          piece.x + pieces[piece.index].spin.highX[piece.pos][i4],
          piece.y + pieces[piece.index].spin.highY[piece.pos][i4]
        ) || testSpace(
          piece.x + pieces[piece.index].spin.highX[piece.pos][i4 + 2],
          piece.y + pieces[piece.index].spin.highY[piece.pos][i4 + 2]
        )) {
          spinCheckCount++;
        }
      }
      if (spinCheckCount < 2) {
        Mutable.isMini = true;
      }
      for (let i4 = 0; i4 < 2; i4++) {
        if (testSpace(
          piece.x + pieces[piece.index].spin.lowX[piece.pos][i4],
          piece.y + pieces[piece.index].spin.lowY[piece.pos][i4]
        ) || testSpace(
          piece.x + pieces[piece.index].spin.lowX[piece.pos][i4 + 2],
          piece.y + pieces[piece.index].spin.lowY[piece.pos][i4 + 2]
        )) {
          spinCheckCount++;
        }
      }
      if (spinCheckCount >= 3 && Mutable.spinX === piece.x && Mutable.spinY === piece.y && !Mutable.rotationFailed) {
        Mutable.isSpin = true;
      }
    }
  }
  var stack = new Stack();

  // src/display/tetrion/piece.ts
  var Piece = class {
    constructor() {
      this.landed = false;
      this.x;
      this.y;
      this.pos = 0;
      this.tetro;
      this.index;
      this.gravity = gravityUnit;
      this.lockDelay = 0;
      this.lockDelayLimit = 30;
      this.are = 0;
      this.areLimit = 0;
      this.irsDir = 0;
      this.ihs = false;
      this.shiftDelay = 0;
      this.shiftDir = 0;
      this.shiftReleased = false;
      this.arrDelay = 0;
      this.held = false;
      this.finesse = 0;
      this.dirty = false;
      this.dead = true;
      this.rotateLimit = 0;
      this.moveLimit = 0;
      this.delayCounting = false;
    }
    /**
     * Removes last active piece, and gets the next active piece from the grab bag.
     */
    new(index) {
      $2("irs-indicator").classList.add("gone");
      $2("ihs-indicator").classList.add("gone");
      const rot = settings.RotSys.initinfo[index];
      this.pos = rot[2];
      this.x = Math.floor((stack.width - 4) / 2) + rot[0];
      if (Game.type === 8 /* Retro */ || Game.type === 9 /* Grades */) {
        this.y = stack.hiddenHeight - 1 + rot[1];
      } else {
        this.y = stack.hiddenHeight + rot[1];
      }
      this.rotateLimit = 0;
      this.moveLimit = 0;
      this.delayCounting = false;
      this.index = index;
      this.tetro = [];
      this.held = false;
      $2("a").classList.remove("greyed");
      this.ihs = false;
      this.finesse = 0;
      this.dirty = true;
      this.dead = false;
      this.lockDelay = 0;
      this.classicRuleDelayLast = 0;
      if (settings.NextSound) {
        sound.playSFX("piece" + preview.grabBag[0]);
      }
      const lineVector = $2("linevector");
      const ivector = $2("ivalue");
      if (index === 0 && Game.type === 8 /* Retro */) {
        Mutable.lineDrought = 0;
        Mutable.lineAmount++;
        ivector.style.color = "#ffffff";
        lineVector.classList.remove("drought-flash");
        lineVector.src = "./assets/linevector.svg";
        $setText(Elements.statsIpieces, Mutable.lineAmount);
      } else {
        Mutable.lineDrought++;
        if (Mutable.lineDrought >= 13) {
          if (Game.type === 8 /* Retro */) {
            sound.raisesidebgm();
          }
          ivector.style.color = "#ff0000";
          lineVector.classList.add("drought-flash");
          lineVector.src = "./assets/linevectorred.svg";
          if (Mutable.lineDrought < 25) {
          } else {
          }
          $setText(Elements.statsIpieces, Mutable.lineDrought);
        } else if (Game.type === 8 /* Retro */) {
          sound.lowersidebgm();
        }
      }
      if (this.irsDir !== 0) {
        sound.playSFX("initialrotate");
        const curPos = this.pos;
        const newPos = mod(this.pos + this.irsDir, 4);
        const _rot = settings.RotSys.offset[this.index];
        const offsetX = _rot[newPos][0] - _rot[curPos][0];
        const offsetY = _rot[newPos][1] - _rot[curPos][1];
        this.tetro = pieces[index].tetro[newPos];
        if (!this.moveValid(offsetX, offsetY, this.tetro)) {
          this.tetro = pieces[index].tetro[curPos];
        } else {
          this.x += offsetX;
          this.y += offsetY;
          this.pos = newPos;
        }
        this.irsDir = 0;
      } else {
        this.tetro = pieces[index].tetro[this.pos];
      }
      this.lockDelayLimit = settings.LockDelay;
      const currentGameType = Game.types[Game.type];
      if (Game.type === 6 /* Master */) {
        this.gravity = 20;
        if (Mutable.level < 20) {
          this.lockDelayLimit = [
            30,
            25,
            22,
            20,
            20,
            18,
            17,
            17,
            15,
            15,
            13,
            13,
            13,
            13,
            13,
            12,
            12,
            12,
            11,
            11
          ][Mutable.level];
        } else {
          this.lockDelayLimit = 11;
        }
      } else if (settings.Gravity !== 0) {
        this.gravity = Mutable.gravityArr[settings.Gravity - 1];
      } else if (currentGameType.params.gravityOverride) {
        this.gravity = currentGameType.params.gravityOverride;
      } else {
        const grav = currentGameType.gravityFunc();
        if (grav) {
          this.gravity = grav;
        }
      }
      if (settings.LockDelay !== 0) {
        this.lockDelayLimit = settings.LockDelay;
      } else if (currentGameType.params.lockDelayOverride) {
        this.lockDelayLimit = currentGameType.params.lockDelayOverride;
      } else {
        const lockDelay = currentGameType.lockDelayFunc();
        if (lockDelay) {
          this.lockDelayLimit = lockDelay;
        }
      }
      if (Game.type === 9 /* Grades */) {
        let speedI = 0;
        while (Mutable.leveltgm > speedTableTGM[speedI].level) {
          if (Mutable.leveltgm < speedTableTGM[speedI + 1].level) {
            piece.gravity = speedTableTGM[speedI].speed;
          }
          speedI++;
        }
        if (Mutable.leveltgm < 100) {
          settings.Ghost = 1;
        } else {
          settings.Ghost = 2;
        }
        let miscI = 0;
        while (Mutable.leveltgm > miscTableTGM[miscI].level) {
          if (Mutable.leveltgm < miscTableTGM[miscI + 1].level) {
            piece.areLimit = miscTableTGM[miscI].are;
            Mutable.lineARE = miscTableTGM[miscI].areline;
            Mutable.lineAREb = miscTableTGM[miscI].arelineb;
            settings.DAS = miscTableTGM[miscI].das;
            settings.LockDelay = miscTableTGM[miscI].lockdelay;
          }
          miscI++;
        }
      } else {
        this.gravity = gravityUnit;
      }
      let blockOut = false;
      if (!this.moveValid(0, 0, this.tetro)) {
        if (Game.type === 8) {
          blockOut = true;
        } else if (!this.moveValid(0, -1, this.tetro)) {
          if (!this.moveValid(0, -2, this.tetro)) {
            blockOut = true;
          } else {
            piece.y -= 2;
          }
        } else {
          piece.y -= 1;
        }
      }
      if (blockOut === true) {
        if (Game.type !== 8) {
          piece.y -= 2;
        }
        Game.state = 9 /* BlockOut */;
        $setText(Elements.msg, "BLOCK OUT!");
        currentGameType.die();
        menu(FAILED_MENU_ID);
        sound.playSFX("gameover");
        sound.playvox("lose");
        return;
      }
      if (this.gravity >= 20) {
        this.checkFall();
      }
      this.landed = !this.moveValid(0, 1, this.tetro);
      if (flags.moveDown & Mutable.keysDown) {
        const grav = Mutable.gravityArr[settings.SoftDrop + 1];
        if (grav >= 20)
          this.y += this.getDrop(grav);
      }
      if (this.landed && this.lockDelay >= this.lockDelayLimit) {
        this.checkLock();
      }
      this.delayCounting = false;
    }
    tryKickList(kickList, rotated, newPos, offsetX, offsetY) {
      let failedRotations = 0;
      Mutable.rotationFailed = false;
      for (let k3 = 0, len = kickList.length; k3 < len; k3++) {
        if (this.moveValid(
          offsetX + kickList[k3][0],
          offsetY + kickList[k3][1],
          rotated
        )) {
          this.x += offsetX + kickList[k3][0];
          this.y += offsetY + kickList[k3][1];
          this.tetro = rotated;
          this.pos = newPos;
          this.finesse++;
          break;
        } else {
          failedRotations++;
        }
      }
      if (failedRotations >= kickList.length) {
        Mutable.rotationFailed = true;
      }
    }
    rotate(direction) {
      if (this.delayCounting === true) {
        this.rotateLimit++;
      }
      sound.playSFX("rotate");
      const curPos = mod(this.pos, 4);
      const newPos = mod(this.pos + direction, 4);
      const rotated = pieces[this.index].tetro[newPos];
      const rotSys = settings.RotSys;
      const rot = rotSys.offset[this.index];
      const offsetX = rot[newPos][0] - rot[curPos][0];
      const offsetY = rot[newPos][1] - rot[curPos][1];
      let kickList = [];
      if (rotSys.id === 2 || rotSys.id === 14) {
        if (this.index === PieceData.I.index) {
          if (curPos === 1 || curPos === 3)
            kickList = [
              [0, 0],
              [1, 0],
              [-1, 0],
              [2, 0]
            ];
          else
            kickList = [
              [0, 0],
              [0, -1],
              [0, -2]
            ];
        } else if (newPos === 0 || (this.index === PieceData.S.index || this.index === PieceData.Z.index) && newPos === 2)
          kickList = [
            [0, 0],
            [1, 0],
            [-1, 0],
            [0, -1]
          ];
        else
          kickList = [
            [0, 0],
            [1, 0],
            [-1, 0]
          ];
        this.tryKickList(kickList, rotated, newPos, offsetX, offsetY);
      } else {
        const kickIndex = [1, -1, 2].indexOf(direction);
        if (rotSys.id === 0)
          kickList = WKTableSRS[this.index][kickIndex][curPos];
        else if (rotSys.id === 1)
          kickList = WKTableCultris;
        else if (rotSys.id === 15)
          kickList = WKTableDX[kickIndex][curPos];
        else
          kickList = WKTableDRS[kickIndex];
        this.tryKickList(kickList, rotated, newPos, offsetX, offsetY);
      }
      Mutable.spinX = Math.floor(piece.x);
      Mutable.spinY = Math.floor(piece.y);
      spinCheck();
      if (settings.Soundbank === 0 && Mutable.isSpin) {
        sound.playSFX("tspin0");
      }
      Mutable.isSpin = false;
      Mutable.isMini = false;
    }
    checkShift() {
      if (getFlag(Mutable.keysDown, flags.moveLeft) && !getFlag(Mutable.lastKeys, flags.moveLeft)) {
        this.shiftDelay = 0;
        this.arrDelay = 0;
        this.shiftReleased = true;
        this.shiftDir = -1;
        this.finesse++;
      } else if (getFlag(Mutable.keysDown, flags.moveRight) && !getFlag(Mutable.lastKeys, flags.moveRight)) {
        this.shiftDelay = 0;
        this.arrDelay = 0;
        this.shiftReleased = true;
        this.shiftDir = 1;
        this.finesse++;
      }
      if (this.shiftDir === 1 && !getFlag(Mutable.keysDown, flags.moveRight) && getFlag(Mutable.lastKeys, flags.moveRight) && getFlag(Mutable.keysDown, flags.moveLeft)) {
        this.shiftDelay = 0;
        this.arrDelay = 0;
        this.shiftReleased = true;
        this.shiftDir = -1;
      } else if (this.shiftDir === -1 && !getFlag(Mutable.keysDown, flags.moveLeft) && getFlag(Mutable.lastKeys, flags.moveLeft) && getFlag(Mutable.keysDown, flags.moveRight)) {
        this.shiftDelay = 0;
        this.arrDelay = 0;
        this.shiftReleased = true;
        this.shiftDir = 1;
      } else if (!getFlag(Mutable.keysDown, flags.moveRight) && getFlag(Mutable.lastKeys, flags.moveRight) && getFlag(Mutable.keysDown, flags.moveLeft)) {
        this.shiftDir = -1;
      } else if (!getFlag(Mutable.keysDown, flags.moveLeft) && getFlag(Mutable.lastKeys, flags.moveLeft) && getFlag(Mutable.keysDown, flags.moveRight)) {
        this.shiftDir = 1;
      } else if (!getFlag(Mutable.keysDown, flags.moveLeft) && getFlag(Mutable.lastKeys, flags.moveLeft) || !getFlag(Mutable.keysDown, flags.moveRight) && getFlag(Mutable.lastKeys, flags.moveRight)) {
        this.shiftDelay = 0;
        this.arrDelay = 0;
        this.shiftReleased = true;
        this.shiftDir = 0;
      }
      const dascut = settings.DASCut;
      const ARR = settings.ARR;
      const DAS = settings.DAS;
      if (this.shiftDir) {
        if (this.shiftReleased && DAS !== 0) {
          this.shift(this.shiftDir);
          this.shiftDelay++;
          this.shiftReleased = false;
        } else if (this.shiftDelay < DAS) {
          this.shiftDelay++;
        } else if (this.shiftDelay === DAS) {
          this.shift(this.shiftDir);
          if (ARR !== 0 || dascut)
            this.shiftDelay++;
        } else if (this.arrDelay < ARR) {
          this.arrDelay++;
          if (this.arrDelay === ARR && ARR !== 0) {
            this.shift(this.shiftDir);
          }
        }
      }
      if (flags.moveLeft3 & Mutable.keysDown && !getFlag(Mutable.lastKeys, flags.moveLeft3)) {
        this.multiShift(-1, 3);
        this.finesse++;
      } else if (flags.moveRight3 & Mutable.keysDown && !getFlag(Mutable.lastKeys, flags.moveRight3)) {
        this.multiShift(1, 3);
        this.finesse++;
      }
    }
    shift(direction) {
      this.arrDelay = 0;
      const ARR = settings.ARR;
      const DAS = settings.DAS;
      if (ARR === 0 && this.shiftDelay === DAS) {
        if (this.moveValid(direction, 0, this.tetro)) {
          if (direction === 1) {
            shiftMatrix(0 /* RIGHT */);
          } else {
            shiftMatrix(1 /* LEFT */);
          }
          this.x += direction;
          if (this.gravity >= 20) {
            this.checkFall();
          }
          if (flags.moveDown & Mutable.keysDown) {
            const grav = Mutable.gravityArr[settings.SoftDrop + 1];
            if (grav >= 20)
              this.y += this.getDrop(grav);
          }
        }
      } else if (this.moveValid(direction, 0, this.tetro)) {
        if (this.delayCounting === true) {
          this.moveLimit++;
        }
        this.x += direction;
        sound.playSFX("move");
      } else if (direction === 1) {
        shiftMatrix(0 /* RIGHT */);
      } else {
        shiftMatrix(1 /* LEFT */);
      }
      if (!this.moveValid(direction, 0, this.tetro) && Game.type === 8 /* Retro */) {
        this.arrDelay = ARR - 1;
        this.shiftDelay = DAS + 1;
      }
    }
    multiShift(direction, count) {
      for (let i4 = 0; i4 < count && this.moveValid(direction, 0, this.tetro); ++i4) {
        this.x += direction;
        if (this.gravity >= 20) {
          this.checkFall();
        }
        if (flags.moveDown & Mutable.keysDown) {
          const grav = Mutable.gravityArr[settings.SoftDrop + 1];
          if (grav >= 20)
            this.y += this.getDrop(grav);
        }
      }
    }
    shiftDown() {
      if (this.moveValid(0, 1, this.tetro)) {
        const grav = Mutable.gravityArr[settings.SoftDrop + 1];
        if (grav >= 1) {
          this.y += this.getDrop(grav);
        } else {
          this.y += grav;
        }
      }
    }
    hardDrop() {
      if (Game.types[Game.type].params.allowHardDrop) {
        if (Game.params.classicRule === true) {
          Mutable.usedHardDrop = false;
        } else {
          sound.playSFX("harddrop");
          Mutable.usedHardDrop = true;
        }
        const distance = this.getDrop(2147483647);
        this.y += distance;
        Mutable.score += BigInt(
          distance + this.lockDelayLimit - this.lockDelay
        );
        Mutable.newScore += BigInt(distance * 2);
        Mutable.scoreNes += distance * 2;
        scoreNesRefresh();
        if (Game.params.classicRule !== true) {
          this.lockDelay = this.lockDelayLimit;
        }
      }
    }
    getDrop(distance) {
      if (Game.type !== 8) {
        if (!this.moveValid(0, 0, this.tetro))
          return 0;
        let i4;
        for (i4 = 1; i4 <= distance; i4++) {
          if (!this.moveValid(0, i4, this.tetro))
            return i4 - 1;
        }
        return i4 - 1;
      } else {
        if (!this.moveValid(0, 0, this.tetro))
          return 0;
        let i4;
        for (i4 = 1; i4 <= distance; i4++) {
          if (!this.moveValid(0, i4, this.tetro))
            return i4 - 1;
        }
        return i4 - 1;
      }
    }
    hold() {
      if (Game.type !== 8) {
        const temp = hold.piece;
        if (!this.held) {
          if (hold.piece !== void 0) {
            hold.piece = this.index;
            this.new(temp);
          } else {
            hold.piece = this.index;
            this.new(preview.next());
          }
          this.held = true;
          $2("a").classList.add("greyed");
          hold.draw();
        }
      }
    }
    /**
     * Checks if position and orientation passed is valid.
     *  We call it for every action instead of only once a frame in case one
     *  of the actions is still valid, we don't want to block it.
     */
    moveValid(cx, cy, tetro) {
      cx = cx + this.x;
      cy = Math.floor(cy + this.y);
      for (let x3 = 0; x3 < tetro.length; x3++) {
        for (let y4 = 0; y4 < tetro[x3].length; y4++) {
          if (tetro[x3][y4] && (cx + x3 < 0 || cx + x3 >= stack.width || cy + y4 >= stack.height || cy + y4 >= 0 && stack.grid[cx + x3][cy + y4])) {
            return false;
          }
        }
      }
      if (Game.type === 9 /* Grades */ || Game.type === 6 /* Master */ && (Game.params.delayStrictness === 1 || Game.params.delayStrictness === 2)) {
        if (Game.params.classicRule !== true && Game.type === 9 /* Grades */ || Game.params.delayStrictness === 1) {
          if (this.landed) {
            this.delayCounting = true;
            if (this.moveLimit < 11 && this.rotateLimit < 8) {
              this.lockDelay = 0;
            }
          } else {
            this.lockDelay = 0;
          }
        } else if (Game.params.classicRule === true || Game.params.delayStrictness === 2) {
          if (this.classicRuleDelayLast < Math.floor(this.y)) {
            this.lockDelay = 0;
          }
          if (this.classicRuleDelayLast < Math.floor(this.y)) {
            this.classicRuleDelayLast = Math.floor(this.y);
          }
          if (!this.landed) {
          }
        }
      } else {
        this.lockDelay = 0;
      }
      return true;
    }
    checkFall() {
      const grav = this.gravity;
      if (grav > 1) {
        this.y += this.getDrop(grav);
      } else {
        this.y += grav;
      }
      if (Math.abs(this.y - Math.round(this.y)) < 1e-6)
        this.y = Math.round(this.y);
    }
    checkLock() {
      if (this.landed) {
        this.y = Math.floor(this.y);
        if (this.lockDelay >= this.lockDelayLimit) {
          this.dead = true;
          stack.addPiece(this.tetro);
          if (Mutable.usedHardDrop === false) {
            if (Game.type === 8 /* Retro */) {
              Mutable.scoreNes += Math.floor(Mutable.classicSoftDrop);
              scoreNesRefresh();
              Mutable.classicSoftDrop = 0;
              Mutable.lastYFrame = 0;
            }
            sound.playSFX("lock");
            if (Game.params.classicRule === true) {
              this.lockDelay = 0;
            }
          }
          Mutable.usedHardDrop = false;
          this.dirty = true;
          if (Game.state === 5 /* Loss */) {
            return;
          } else {
            this.held = false;
            Game.checkWin();
            if (Game.state === 0 /* Normal */ && piece.dead) {
              if (Game.type === 6 /* Master */) {
                if (Mutable.level < 20) {
                  this.areLimit = [
                    18,
                    18,
                    18,
                    15,
                    15,
                    12,
                    12,
                    12,
                    12,
                    12,
                    12,
                    12,
                    10,
                    10,
                    10,
                    8,
                    8,
                    8,
                    8,
                    8
                  ][Mutable.level];
                } else {
                  this.lockDelayLimit = 11;
                  this.areLimit = 6;
                }
                if (Mutable.lineClear !== 0) {
                  Mutable.lineARE = this.areLimit;
                  this.areLimit += Mutable.lineARE;
                } else {
                  Mutable.lineARE = 0;
                }
              } else if (Game.type === 8 /* Retro */) {
                if (piece.y >= 21) {
                  this.areLimit = 10;
                } else if (piece.y >= 17) {
                  this.areLimit = 12;
                } else if (piece.y >= 13) {
                  this.areLimit = 14;
                } else if (piece.y >= 9) {
                  this.areLimit = 16;
                } else {
                  this.areLimit = 18;
                }
                if (Mutable.lineClear !== 0) {
                  Mutable.lineARE = 17;
                  this.areLimit += Mutable.lineARE;
                } else {
                  Mutable.lineARE = 0;
                }
              } else if (Game.type === 9 /* Grades */) {
                if (Mutable.lineClear !== 0) {
                  this.areLimit += Mutable.lineARE;
                  this.areLimit += Mutable.lineAREb;
                }
              } else if (Game.type === 1 /* Marathon */) {
                if (Game.params.entryDelay === 1) {
                  Mutable.lineARE = 12;
                  this.areLimit = 6;
                  if (Mutable.lineClear !== 0) {
                    this.areLimit = 24;
                  }
                }
                if (Game.params.entryDelay === 2) {
                  Mutable.lineARE = 40;
                  this.areLimit = 25;
                  if (Mutable.lineClear !== 0) {
                    this.areLimit = 65;
                  }
                }
              } else {
                this.areLimit = 0;
              }
              if (this.areLimit === 0) {
                this.new(preview.next());
              } else {
                Game.state = 4 /* Paused */;
                this.are = 0;
              }
            }
          }
        }
      }
    }
    update() {
      this.landed = !this.moveValid(0, 1, this.tetro);
      if (!(this.moveLimit < 10 && this.rotateLimit < 8)) {
        this.lockDelay = this.lockDelayLimit;
      }
      if (Game.type === 8 /* Retro */) {
        if (flags.moveDown & Mutable.keysDown) {
          if (Mutable.lastYFrame !== 0) {
            Mutable.classicSoftDrop += piece.y - Mutable.lastYFrame;
          }
          Mutable.lastYFrame = piece.y;
        } else {
          Mutable.classicSoftDrop = 0;
        }
        if (this.landed) {
          if (flags.moveDown & Mutable.keysDown) {
            Mutable.classicGravTest += Mutable.gravityArr[settings.SoftDrop];
          }
          Mutable.classicGravTest += Mutable.classicStoredY;
          Mutable.classicGravTest += this.gravity;
          if (Mutable.classicGravTest >= 1) {
            this.lockDelay = 99;
            Mutable.classicGravTest = 0;
          }
        } else {
          this.y += this.gravity;
          piece.y += Mutable.classicGravTest;
          Mutable.classicStoredY = piece.y % 1;
          Mutable.classicGravTest = 0;
        }
      } else if (flags.moveDown & Mutable.keysDown) {
        if (Mutable.lastYFrame !== 0 && piece.y - Mutable.lastYFrame > 0) {
          Mutable.newScore += BigInt(
            Math.floor(piece.y - Mutable.lastYFrame)
          );
          $setText(
            Elements.statsScore,
            (~~Mutable.newScore).toLocaleString()
          );
        }
        Mutable.lastYFrame = piece.y;
      }
      if (this.moveValid(0, 1, this.tetro) && Game.type !== 8) {
        this.checkFall();
      }
      if (this.landed) {
        if (flags.moveDown & Mutable.keysDown && Game.type === 9 /* Grades */) {
          if (Game.params.classicRule === true) {
            this.lockDelay = this.lockDelayLimit;
          } else {
            this.lockDelay += 3;
          }
        }
        if (piece.gravity !== 0) {
          this.lockDelay++;
        }
        this.checkLock();
      }
    }
    draw() {
      clear(Elements.activeCtx);
      if (!this.dead) {
        this.drawGhost();
        if (settings.Ghost !== 3) {
          let a4;
          if (this.landed) {
            if (Mutable.stepSEPlayed !== true && Game.type !== 8) {
              sound.playSFX("step");
              Mutable.stepSEPlayed = true;
            }
            a4 = this.lockDelay / this.lockDelayLimit;
            if (this.lockDelayLimit === 0)
              a4 = 0;
            a4 = Math.pow(a4, 2) * 0.5;
          } else {
            Mutable.stepSEPlayed = false;
          }
          draw(
            this.tetro,
            this.x,
            Math.floor(this.y) - stack.hiddenHeight,
            Elements.activeCtx,
            settings.RotSys.color[this.index],
            a4
          );
        }
      }
    }
    drawGhost() {
      Elements.activeCtx.globalAlpha = 0.4;
      if (settings.Ghost === 0 /* Grey */ && !this.landed) {
        draw(
          this.tetro,
          this.x,
          Math.floor(this.y + this.getDrop(2147483647)) - stack.hiddenHeight,
          Elements.activeCtx,
          0
        );
      } else if (settings.Ghost === 1 /* Colored */ && !this.landed) {
        draw(
          this.tetro,
          this.x,
          Math.floor(this.y + this.getDrop(2147483647)) - stack.hiddenHeight,
          Elements.activeCtx,
          settings.RotSys.color[this.index]
        );
      }
      const customGhost = Game.types[Game.type].customGhostDisplay();
      if (customGhost) {
        const len = customGhost.length;
        const width = customGhost[0].length;
        for (let y4 = 0; y4 < width; y4++) {
          for (let x3 = 0; x3 < len; x3++) {
            if (customGhost[x3][y4]) {
              drawCell(
                y4,
                x3 + stack.height - stack.hiddenHeight - len,
                customGhost[x3][y4],
                Elements.activeCtx
              );
            }
          }
        }
      }
      Elements.activeCtx.globalAlpha = 1;
    }
  };
  var piece = new Piece();
  function resetPiece() {
    piece = new Piece();
  }

  // src/logic/hold.ts
  var Hold = class {
    constructor() {
      this.soundCancel = 0;
    }
    draw() {
      if (this.soundCancel === 0 && Game.paused === false) {
        sound.playSFX("hold");
      }
      this.soundCancel = 0;
      const holdEle = $2("hold");
      holdEle.classList.remove("glow-flash-animation");
      void holdEle.offsetWidth;
      holdEle.classList.add("glow-flash-animation");
      clear(Elements.holdCtx);
      let p3;
      if (piece.ihs === true) {
        p3 = preview.grabBag[0];
      } else {
        $2("ihs-indicator").classList.add("gone");
        p3 = this.piece;
      }
      const rot = settings.RotSys;
      const initInfo = rot.initinfo[p3];
      if (pieces[p3] !== void 0) {
        const rect = pieces[p3].rect;
        draw(
          pieces[p3].tetro[initInfo[2]],
          -rect[initInfo[2]][0] + (4 - rect[initInfo[2]][2] + rect[initInfo[2]][0]) / 2,
          -rect[initInfo[2]][1] + (3 - rect[initInfo[2]][3] + rect[initInfo[2]][1]) / 2,
          Elements.holdCtx,
          rot.color[p3]
        );
      }
    }
  };
  var hold = new Hold();

  // src/touch.ts
  var touchLayout = $2("touchLayout");
  var FollowingButton = class {
    constructor(button) {
      this.rectX0 = button.offsetLeft;
      this.rectY0 = button.offsetTop;
      this.rectX1 = button.offsetLeft + button.offsetWidth;
      this.rectY1 = button.offsetTop + button.offsetHeight;
      this.x = (this.rectX0 + this.rectX1) / 2;
      this.y = (this.rectY0 + this.rectY1) / 2;
      this.recentTouches = [];
      this.enabled = true;
    }
  };
  var FollowingButtonSet = class {
    static {
      this.RANGE = 96;
    }
    touchStart(pos) {
    }
    posToBinds(pos) {
      let mindist = Infinity;
      let minbtnid;
      for (let i4 = 0; i4 < touchButtons.length; i4++) {
        const btnflw = touchButtons[i4].follow;
        const dist = Math.hypot(pos.x - btnflw.x, pos.y - btnflw.y);
        if (dist < mindist) {
          mindist = dist;
          minbtnid = i4;
        }
      }
      return minbtnid;
    }
  };
  var touchLeft = $2("touchLeft");
  var touchRight = $2("touchRight");
  var touchDown = $2("touchDown");
  var touchDrop = $2("touchDrop");
  var touchHold = $2("touchHold");
  var touchRotLeft = $2("touchRotLeft");
  var touchRotRight = $2("touchRotRight");
  var touchRot180 = $2("touchRot180");
  var touchButtons = [
    touchLeft,
    touchRight,
    touchDown,
    touchDrop,
    touchHold,
    touchRotRight,
    touchRotLeft,
    touchRot180
  ];
  touchLeft.bindsMemberName = "moveLeft";
  touchRight.bindsMemberName = "moveRight";
  touchDown.bindsMemberName = "moveDown";
  touchDrop.bindsMemberName = "hardDrop";
  touchHold.bindsMemberName = "holdPiece";
  touchRotRight.bindsMemberName = "rotRight";
  touchRotLeft.bindsMemberName = "rotLeft";
  touchRot180.bindsMemberName = "rot180";
  for (let i4 = 0; i4 < touchButtons.length; i4++) {
    const btn = touchButtons[i4];
    btn.follow = new FollowingButton(btn);
  }
  function touchButtonsLayout() {
    const dpiX = 96;
    const dpiY = 96;
    const winW = window.innerWidth / dpiX;
    const winH = window.innerHeight / dpiY;
    const buttonH = 0.7;
    let buttonW = 1;
    const fontSize = 0.55;
    const margin = 0.1;
    const unit = "in";
    const setPos = (elem, posX, posY, sizeW, sizeH, alignX, alignY, offsetX, offsetY) => {
      elem.style.width = "" + sizeW + unit;
      elem.style.height = "" + sizeH + unit;
      elem.style.left = "" + (offsetX + alignX * 0.5 * (winW - sizeW) + posX * sizeW - (alignX - 1) * margin / 2) + unit;
      elem.style.top = "" + (offsetY + alignY * 0.5 * (winH - sizeH) + posY * sizeH - (alignY - 1) * margin / 2) + unit;
      elem.classList.remove("gone");
      elem.style.fontSize = "" + fontSize + unit;
    };
    const layouts = {
      //function array
      NONE: function() {
        for (let i4 = 0, len = touchButtons.length; i4 < len; i4++)
          touchButtons[i4].classList.add("gone");
      },
      KBD_R: function() {
        setPos(touchRotLeft, 0, -1, buttonW, buttonH, 0, 2, 0, 0);
        setPos(touchRot180, 0.5, -2, buttonW, buttonH, 0, 2, 0, 0);
        setPos(touchRotRight, 1, -1, buttonW, buttonH, 0, 2, 0, 0);
        setPos(touchHold, 1.5, 0, buttonW, buttonH, 0, 2, 0, 0);
        setPos(touchRight, 0, 0, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchLeft, -2, 0, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchDown, -1, 0, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchDrop, -1, -1, buttonW, buttonH, 2, 2, 0, 0);
      },
      KBD_L: function() {
        setPos(touchRotLeft, -1, -1, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchRot180, -0.4, -2, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchRotRight, 0, -1, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchHold, -1.5, 0, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchRight, 2, 0, buttonW, buttonH, 0, 2, 0, 0);
        setPos(touchLeft, 0, 0, buttonW, buttonH, 0, 2, 0, 0);
        setPos(touchDown, 1, 0, buttonW, buttonH, 0, 2, 0, 0);
        setPos(touchDrop, 1, -1, buttonW, buttonH, 0, 2, 0, 0);
      },
      JOY: function() {
        let oy;
        let ay;
        if (winH - winW > buttonH * 1.5) {
          oy = -1;
          ay = 2;
        } else {
          oy = 0;
          ay = 1;
        }
        buttonW = 0.8;
        if ((winW - 0.1) / 4 < buttonW) {
          buttonW = (winW - 0.1) / 4;
        }
        setPos(touchRotLeft, -0.5, 1 + oy, buttonW, buttonH, 2, ay, 0, 0);
        setPos(touchRot180, -0.5, -1 + oy, buttonW, buttonH, 2, ay, 0, 0);
        setPos(touchRotRight, 0, 0 + oy, buttonW, buttonH, 2, ay, 0, 0);
        setPos(touchHold, -1, 0 + oy, buttonW, buttonH, 2, ay, 0, 0);
        setPos(touchRight, 1, 0 + oy, buttonW, buttonH, 0, ay, 0, 0);
        setPos(touchLeft, 0, 0 + oy, buttonW, buttonH, 0, ay, 0, 0);
        setPos(touchDown, 0.5, 1 + oy, buttonW, buttonH, 0, ay, 0, 0);
        setPos(touchDrop, 0.5, -1 + oy, buttonW, buttonH, 0, ay, 0, 0);
      },
      JOY2: function() {
        let oy;
        let ay;
        if (winH - winW > buttonH * 1.5) {
          oy = -1;
          ay = 2;
        } else {
          oy = 0;
          ay = 1;
        }
        buttonW = 0.8;
        if ((winW - 0.1) / 4 < buttonW) {
          buttonW = (winW - 0.1) / 4;
        }
        setPos(touchRotLeft, -1, 1 + oy, buttonW, buttonH, 2, ay, 0, 0);
        setPos(touchRot180, -1, -1 + oy, buttonW, buttonH, 2, ay, 0, 0);
        setPos(touchRotRight, 0, 0 + oy, buttonW, buttonH, 2, ay, 0, 0);
        setPos(touchHold, -2, 0 + oy, buttonW, buttonH, 2, ay, 0, 0);
        setPos(touchRight, 2, 0 + oy, buttonW, buttonH, 0, ay, 0, 0);
        setPos(touchLeft, 0, 0 + oy, buttonW, buttonH, 0, ay, 0, 0);
        setPos(touchDown, 1, 1 + oy, buttonW, buttonH, 0, ay, 0, 0);
        setPos(touchDrop, 1, -1 + oy, buttonW, buttonH, 0, ay, 0, 0);
      },
      NARROW: function() {
        setPos(touchLeft, -2, 0, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchRight, 0, 0, buttonW, buttonH, 2, 2, 0, 0);
        if (winH - winW > buttonH * 1.5) {
          setPos(touchDown, -1, 0, buttonW, buttonH, 2, 2, 0, 0);
          setPos(touchDrop, -1, -1, buttonW, buttonH, 2, 2, 0, 0);
        } else {
          setPos(touchDown, 0, -1, buttonW, buttonH, 2, 2, 0, 0);
          setPos(touchDrop, -1, 0, buttonW, buttonH, 2, 2, 0, 0);
        }
        setPos(touchRotLeft, 0, -1.2, buttonW, buttonH, 0, 1, 0, 0);
        setPos(touchRotRight, 0, 0, buttonW, buttonH, 0, 1, 0, 0);
        setPos(touchHold, 0, 1.2, buttonW, buttonH, 0, 1, 0, 0);
        setPos(touchRot180, 0, -2.4, buttonW, buttonH, 0, 1, 0, 0);
      },
      NARROW_L: function() {
        setPos(touchRotLeft, -2, 0, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchRotRight, -1, 0, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchDrop, 0, 0, buttonW, buttonH, 2, 2, 0, 0);
        if (winH - winW > buttonH * 1.5) {
          setPos(touchRot180, -1, -1, buttonW, buttonH, 2, 2, 0, 0);
        } else {
          setPos(touchRot180, 0, -1, buttonW, buttonH, 2, 2, 0, 0);
        }
        setPos(touchLeft, 0, -1.2, buttonW, buttonH, 0, 1, 0, 0);
        setPos(touchDown, 0, 0, buttonW, buttonH, 0, 1, 0, 0);
        setPos(touchRight, 0, 1.2, buttonW, buttonH, 0, 1, 0, 0);
        setPos(touchHold, 0, -2.4, buttonW, buttonH, 0, 1, 0, 0);
      },
      NARROW_LM: function() {
        setPos(touchLeft, 0, 0, buttonW, buttonH, 0, 2, 0, 0);
        setPos(touchRight, 2, 0, buttonW, buttonH, 0, 2, 0, 0);
        if (winH - winW > buttonH * 1.5) {
          setPos(touchDown, 1, 0, buttonW, buttonH, 0, 2, 0, 0);
          setPos(touchDrop, 1, -1, buttonW, buttonH, 0, 2, 0, 0);
        } else {
          setPos(touchDown, 0, -1, buttonW, buttonH, 0, 2, 0, 0);
          setPos(touchDrop, 1, 0, buttonW, buttonH, 0, 2, 0, 0);
        }
        setPos(touchRotLeft, 0, -1.2, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchRotRight, 0, -2.4, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchHold, 0, 0, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchRot180, 0, -3.6, buttonW, buttonH, 2, 2, 0, 0);
      },
      DELUXE: function() {
        buttonW = 0.8;
        if ((winW - 0.1) / 4 < buttonW) {
          buttonW = (winW - 0.1) / 4;
        }
        setPos(touchLeft, 0, 0, buttonW, buttonH, 0, 2, 0, 0);
        setPos(touchRight, 1, 0, buttonW, buttonH, 0, 2, 0, 0);
        setPos(touchDown, 0, 0, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchDrop, 0, -1, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchRotLeft, -1, 0, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchRotRight, -1, -1, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchHold, 0.5, -1, buttonW, buttonH, 0, 2, 0, 0);
        touchRot180.classList.add("gone");
      }
    };
    setPos(touchLayout, 0, 0, buttonW, buttonH, 2, 0, 0, 0);
    if (currLayout === -2) {
      layouts.NONE();
    } else if (currLayout === -1) {
      if (winW < buttonW * 3) {
        layouts.NONE();
      } else if (winW - winH * 0.5 > buttonW * 4.5 || winH - winW > 4 * buttonH && winW > buttonW * 5.5) {
        layouts.KBD_R();
      } else if (winW - winH * 0.5 > buttonW * 3) {
        layouts.JOY();
      } else if (winH - winW > 0) {
        layouts.NARROW();
      } else if (winW >= buttonW * 4) {
        layouts.DELUXE();
      } else {
        layouts.NONE();
      }
    } else {
      layouts[[
        "KBD_R",
        "KBD_L",
        "JOY",
        "JOY2",
        "NARROW",
        "NARROW_L",
        "NARROW_LM",
        "DELUXE"
      ][currLayout]]();
    }
  }
  var nLayouts = 7;
  var currLayout = -2;
  function touch(e4) {
    if ((e4.type === "touchstart" || e4.type === "click") && e4.target === touchLayout) {
      currLayout++;
      if (currLayout === nLayouts) {
        currLayout = -2;
      }
      resize();
    }
    if (e4.type === "touchstart" || e4.type === "touchmove" || e4.type === "touchend") {
      for (const i4 in binds)
        keyUpDown({
          type: "keyup",
          keyCode: binds[i4],
          preventDefault: () => {
          }
        });
      for (let i4 = 0, l4 = e4.touches.length; i4 < l4; i4++) {
        const tX = e4.touches[i4].pageX;
        const tY = e4.touches[i4].pageY;
        for (let j3 = 0; j3 < touchButtons.length; j3++) {
          const oRef = touchButtons[j3];
          if (tX >= oRef.offsetLeft && tX < oRef.offsetLeft + oRef.offsetWidth && tY >= oRef.offsetTop && tY < oRef.offsetTop + oRef.offsetHeight) {
            keyUpDown({
              type: "keydown",
              keyCode: binds[oRef.bindsMemberName],
              preventDefault: () => {
              }
            });
            e4.preventDefault();
          }
        }
      }
    }
  }
  var preventDefault = (e4) => {
    e4.preventDefault();
  };
  document.addEventListener("touchstart", touch, false);
  document.addEventListener("touchmove", touch, false);
  document.addEventListener("touchend", touch, false);
  document.addEventListener("click", touch, false);
  document.addEventListener("gesturestart", preventDefault, false);
  document.addEventListener("gestureend", preventDefault, false);
  document.addEventListener("gesturechange", preventDefault, false);

  // src/display/size.ts
  function resize() {
    const {
      stats,
      stackCanvas,
      activeCanvas,
      bgStackCanvas,
      holdCanvas,
      previewCanvas,
      msg,
      h3,
      timeCanvas,
      timeCtx,
      bgStackCtx
    } = Elements;
    const a4 = $2("a");
    const b3 = $2("b");
    const c4 = $2("c");
    const d4 = $2("d");
    const content = $2("content");
    const padH = 12;
    let screenHeight = window.innerHeight - padH * 2;
    const screenWidth = Math.floor(screenHeight * 1);
    if (screenWidth > window.innerWidth)
      screenHeight = Math.floor(window.innerWidth / 1);
    Mutable.cellSize = Math.max(Math.floor(screenHeight / 20), 10);
    if (settings.Size === 1 && Mutable.cellSize >= 16)
      Mutable.cellSize = 16;
    else if (settings.Size === 2 && Mutable.cellSize >= 24)
      Mutable.cellSize = 24;
    else if (settings.Size === 3 && Mutable.cellSize >= 32)
      Mutable.cellSize = 32;
    else if (settings.Size === 4 && Mutable.cellSize >= 48)
      Mutable.cellSize = 48;
    const pad = window.innerHeight - (Mutable.cellSize * 20 + 2);
    const padFinal = Math.min(pad / 2, padH);
    content.style.padding = //"0 0";
    //(pad / 2) + 'px 0';
    padFinal + "px 0";
    stats.style.bottom = //(pad) + 'px';
    //(pad / 2) + 'px';
    pad - padFinal + "px";
    a4.style.padding = "0 0.5rem " + Math.floor(Mutable.cellSize / 2) + "px";
    stackCanvas.width = activeCanvas.width = bgStackCanvas.width = Mutable.cellSize * 10;
    stackCanvas.height = activeCanvas.height = bgStackCanvas.height = Mutable.cellSize * 20;
    b3.style.width = stackCanvas.width + "px";
    b3.style.height = stackCanvas.height + "px";
    holdCanvas.width = Mutable.cellSize * 4;
    holdCanvas.height = Mutable.cellSize * 3;
    a4.style.width = holdCanvas.width + "px";
    a4.style.height = holdCanvas.height + "px";
    previewCanvas.width = Mutable.cellSize * 4;
    previewCanvas.height = stackCanvas.height - Mutable.cellSize * 2;
    c4.style.width = previewCanvas.width + "px";
    c4.style.height = b3.style.height;
    $2("msgdiv").style.lineHeight = b3.style.height;
    msg.style.fontSize = Math.floor(stackCanvas.width / 6) + "px";
    msg.style.lineHeight = msg.style.fontSize;
    stats.style.fontSize = Math.floor(stackCanvas.width / 11) + "px";
    document.documentElement.style.fontSize = Math.floor(stackCanvas.width / 16) + "px";
    for (let i4 = 0, len = h3.length; i4 < len; i4++) {
      h3[i4].style.lineHeight = Mutable.cellSize * 2 + "px";
      h3[i4].style.fontSize = stats.style.fontSize;
    }
    stats.style.width = d4.clientWidth + "px";
    timeCanvas.width = d4.clientWidth;
    timeCanvas.height = timeCanvas.clientHeight || timeCanvas.offsetHeight || timeCanvas.getBoundingClientRect().height;
    timeCtx.font = '1em Roboto Mono, "Trebuchet MS"';
    timeCtx.textAlign = "center";
    timeCtx.textBaseline = "middle";
    touchButtonsLayout();
    makeSprite();
    if (settings.Grid)
      bg(bgStackCtx);
    try {
      piece.draw();
      stack.draw();
      preview.draw();
      if (hold.piece !== void 0) {
        hold.draw();
      }
      statistics();
      statisticsStack();
    } catch (e4) {
    }
  }

  // src/gametypes/base.ts
  var GameType2 = class {
    constructor() {
      this.params = {
        allowHardDrop: true
      };
      this.defaultParams = {};
    }
    checkDie() {
      return;
    }
    customGhostDisplay() {
      return;
    }
    lockDelayFunc() {
      return;
    }
    customWinMessage() {
      return;
    }
    gravityFunc() {
      return;
    }
    win() {
    }
    die() {
    }
    done() {
    }
    get pbKey() {
      return "";
    }
    checkPB() {
      const pb = getPB(this.pbKey);
      if ((!pb || Mutable.scoreTime < pb) && Mutable.watchingReplay === false) {
        setPB(this.pbKey, Mutable.scoreTime);
      }
    }
    onLineClear(lines, piece2, spin) {
    }
  };

  // src/gametypes/dig.ts
  var Dig = class extends GameType2 {
    checkWin() {
      return !this.zen && Mutable.digLines.length === 0;
    }
    update() {
      if (this.zen) {
        while (Mutable.lastPiecesSet < Mutable.piecesSet) {
          Mutable.digZenBuffer++;
          const piecePerRise = [
            8,
            6.5,
            4,
            3.5,
            10 / 3,
            3,
            2.8,
            2.6,
            2.4,
            2.2,
            2
          ][clamp(Mutable.level, 0, 10)];
          if (Mutable.digZenBuffer - piecePerRise > -1e-9) {
            Mutable.digZenBuffer -= piecePerRise;
            if (Math.abs(Mutable.digZenBuffer) < -1e-9) {
              Mutable.digZenBuffer = 0;
            }
            const arrRow = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
            arrRow[Math.floor(rng.next() * 10)] = 0;
            stack.rowRise(arrRow, piece);
            sound.playSFX("garbage");
          }
          Mutable.lastPiecesSet++;
        }
      }
    }
    init() {
      sound.loadbgm("sprint");
      Mutable.lastPiecesSet = 0;
      Mutable.digZenBuffer = 0;
      if (Game.settings.dig.checker.val === 1) {
        Game.params.digraceType = "checker";
      } else {
        Game.params.digraceType = "easy";
      }
      if (Game.params.digraceType === void 0 || Game.params.digraceType === "checker") {
        Mutable.digLines = range(stack.height - 10, stack.height);
        $setText(Elements.statsLines, 10);
        let last = stack.width;
        for (let y4 = stack.height - 1; y4 > stack.height - 10 - 1; y4--) {
          const r3 = randomIntExcept(0, stack.width - 1, last);
          for (let x3 = 0; x3 < stack.width; x3++) {
            stack.grid[x3][y4] = x3 === r3 ? 0 : 8;
          }
          last = r3;
        }
      } else if (Game.params.digraceType === "easy") {
        let begin = randomInt(0, stack.width);
        Mutable.digLines = range(stack.height - 10, stack.height);
        $setText(Elements.statsLines, 10);
        for (let y4 = stack.height - 1; y4 > stack.height - 10 - 1; y4--) {
          const m3 = mod(begin++, stack.width);
          for (let x3 = 0; x3 < stack.width; x3++) {
            stack.grid[x3][y4] = m3 === x3 ? 0 : 8;
          }
        }
      }
      this.zen = Game.settings.dig.zen.val === 1;
    }
    get pbKey() {
      return `dig10pb${Game.params.digraceType === "checker" ? "c" : ""}`;
    }
    isPBValid(dead) {
      return !dead;
    }
  };

  // src/gametypes/grades.ts
  var Grades = class extends GameType2 {
    isPBValid() {
      return false;
    }
    checkWin() {
      throw new Error("Method not implemented.");
    }
    update() {
    }
    init() {
      piece.areLimit = 25;
      Mutable.lineARE = 40;
      Mutable.lineAREb = 0;
      settings.Next = 3;
      settings.DAS = 14;
      settings.LockDelay = 30;
      if (Game.params.classicRule === true) {
        settings.set("RotSys", 2 /* Arika */);
        settings.Block = 3;
      } else {
        settings.set("RotSys", 0 /* Super */);
        settings.Block = 2;
      }
      Game.params.classicRule = Game.settings.grades.rule.val !== 1;
      sound.loadbgm("grade1");
      sound.loadbgm("grade2");
      sound.loadbgm("grade3");
      preview.randomizer = tgm3;
    }
  };

  // src/gametypes/marathon.ts
  var Marathon = class extends GameType2 {
    isPBValid() {
      return false;
    }
    checkWin() {
      return !!this.limit && Mutable.lines >= this.limit;
    }
    update() {
    }
    init() {
      switch (Game.settings.marathon.limit.val) {
        case 0:
          this.limit = 150;
          break;
        case 1:
          this.limit = 200;
          break;
        case 2:
          this.limit = void 0;
          break;
        case 3:
          this.limit = 300;
          break;
      }
      Game.params.entryDelay = Game.settings.marathon.delay.val;
      this.params.gravityOverride = Game.settings.marathon.nograv.val ? 0 : void 0;
      if (Game.settings.marathon.invisible.val === 1) {
        Game.params.invisibleMarathon = true;
      }
      if (Game.settings.marathon.cap.val === 1) {
        this.params.levelCap = 1;
      } else {
        this.params.levelCap = void 0;
      }
      sound.loadbgm("marathon");
      sound.loadbgm("marathon2");
      sound.loadbgm("marathon3");
      settings.Gravity = 0;
    }
    gravityFunc() {
      if (Mutable.level < 18) {
        const x3 = Mutable.level + 1;
        return 1 / ((0.8 - (x3 - 1) * 7e-3) ** (x3 - 1) * 60);
      } else if (Mutable.level < 19) {
        return 19.99;
      } else {
        return 20;
      }
    }
    lockDelayFunc() {
      if (Mutable.level < 19) {
        return Math.floor(
          30 * Math.pow(0.93, Math.pow(Mutable.level - 19, 0.8))
        );
      }
    }
  };

  // src/gametypes/master.ts
  var Master = class extends GameType2 {
    isPBValid() {
      return false;
    }
    checkWin() {
      return Mutable.lines >= 300;
    }
    update() {
    }
    init() {
      if (Game.params.delayStrictness === 2) {
        sound.loadbgm("masterstrict");
        sound.loadsidebgm("masterstrictdire");
      } else {
        sound.loadbgm("master");
      }
      Game.params.delayStrictness = Game.settings.master.lock.val;
    }
  };

  // src/gametypes/retro.ts
  var Retro = class extends GameType2 {
    constructor() {
      super(...arguments);
      this.params = {
        allowHardDrop: false
      };
    }
    isPBValid() {
      return false;
    }
    checkWin() {
      return Game.params.bType && Mutable.lines >= Mutable.lineLimit;
    }
    update() {
    }
    init() {
      if (!Game.params.proMode) {
        sound.loadbgm("retro");
      } else {
        sound.cutsidebgm();
        sound.loadbgm("retropro");
        sound.loadsidebgm("retroprodrought");
      }
      if (Game.settings.retro.type.val === 1) {
        Game.params.bType = true;
      }
      if (Game.settings.retro.level.val >= 16) {
        Game.params.proMode = true;
      }
      if (Game.settings.retro.drop.val === 1) {
        this.params.allowHardDrop = true;
      } else {
        this.params.allowHardDrop = false;
      }
      if (Game.settings.retro.skin.val === 1) {
        Game.params.retroSkin = true;
      }
      this.params.startingLevel = Game.settings.retro.level.val;
      settings.Next = 1;
      settings.set("RotSys", 8 /* Nintendo */);
      settings.LockDelay = 80;
      settings.DAS = 16;
      settings.ARR = 6;
      settings.SoftDrop = 5;
      settings.Ghost = 2;
      if (Game.params.retroSkin === true) {
        settings.Block = 8;
      }
      settings.Outline = 0;
      settings.Grid = false;
      settings.Gravity = 0;
      preview.randomizer = nes2;
    }
    gravityFunc() {
      if (Mutable.level <= 29) {
        return [
          1 / 48,
          1 / 43,
          1 / 38,
          1 / 33,
          1 / 28,
          1 / 23,
          1 / 18,
          1 / 13,
          1 / 8,
          1 / 6,
          1 / 5,
          1 / 5,
          1 / 5,
          1 / 4,
          1 / 4,
          1 / 4,
          1 / 3,
          1 / 3,
          1 / 3,
          1 / 2,
          1 / 2,
          1 / 2,
          1 / 2,
          1 / 2,
          1 / 2,
          1 / 2,
          1 / 2,
          1 / 2,
          1 / 2,
          1
        ][Mutable.level];
      } else {
        return 1;
      }
    }
  };

  // src/gametypes/scoreattack.ts
  var TWO_MINUTES = 1e3 * 60 * 60 * 2;
  var ScoreAttack = class extends GameType2 {
    checkWin() {
      return Mutable.scoreTime >= TWO_MINUTES;
    }
    update() {
    }
    isPBValid(dead) {
      return !dead;
    }
    init() {
      sound.loadbgm("sprint");
    }
  };

  // src/gametypes/sprint.ts
  var Sprint = class extends GameType2 {
    checkWin() {
      return Mutable.lines >= Mutable.lineLimit;
    }
    customWinMessage() {
      if (Game.params?.backFire) {
        return "GREAT!";
      } else {
        let rank;
        const time = (Date.now() - Mutable.scoreStartTime - Game.pauseTime) / 1e3;
        for (let i4 = 0; i4 < sprintRanks.length; i4++) {
          if (time > sprintRanks[i4].t) {
            rank = sprintRanks[i4];
            break;
          }
        }
        return rank?.b ?? "";
      }
    }
    update() {
    }
    init() {
      sound.loadbgm("sprint");
      Game.params.pieceSet = Game.settings.sprint.piece.val;
      preview.randomizer.reset();
      switch (Game.params.pieceSet) {
        case 0:
          preview.randomizer = guideline;
          break;
        case 1:
          preview.randomizer = noI;
          break;
        case 2:
          preview.randomizer = iOnly;
          break;
      }
      preview.reset();
      Game.params.backFire = Game.settings.sprint.backfire.val;
      switch (Game.settings.sprint.limit.val) {
        case 0:
          Mutable.lineLimit = 40;
          break;
        case 1:
          Mutable.lineLimit = 100;
          break;
        case 2:
          Mutable.lineLimit = 200;
          break;
      }
    }
    get pbKey() {
      return `sprint${Mutable.lineLimit}pb`;
    }
    isPBValid(dead) {
      return Game.params.pieceSet === 0 && Game.params.backFire === 0 && Mutable.lineLimit === 40 && !dead;
    }
    lockDelayFunc() {
      if (piece.lockDelayLimit < 8) {
        return 8;
      }
    }
  };

  // src/gametypes/survival.ts
  var frameLastRise;
  var Survival = class extends GameType2 {
    isPBValid() {
      return false;
    }
    checkWin() {
      return false;
    }
    init() {
      sound.cutsidebgm();
      sound.loadbgm("survival");
      sound.loadsidebgm("survivaldire");
      frameLastRise = 0;
      Mutable.frameLastRise = 0;
      if (Game.settings.survival.zen.val == 1) {
        Game.params.zen = true;
      }
      Game.params.digOffset = 500 * Game.settings.survival.slevel.val;
    }
    update() {
      const fromLastRise = Mutable.frame - frameLastRise;
      const fromLastHD = flags.hardDrop & Mutable.keysDown ? Mutable.frame - Mutable.frameLastRise : 0;
      const arrRow = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
      let curStage = 0;
      const objCurStage = arrStages[curStage];
      while (curStage < arrStages.length && arrStages[curStage].begin <= Mutable.lines + (Game.params.digOffset || 0)) {
        curStage++;
      }
      curStage--;
      if (fromLastRise >= objCurStage.delay || fromLastHD >= 20 && fromLastRise >= 15) {
        const arrRainbow = [
          2,
          -1,
          1,
          5,
          4,
          3,
          7,
          6,
          -1,
          8,
          8,
          8,
          8,
          6,
          6,
          2,
          1,
          5,
          8,
          -1,
          7,
          7,
          -1,
          8,
          8
        ];
        const flagAll = Math.floor(objCurStage.begin / 50) % 2;
        let idxRainbow = Math.floor(objCurStage.begin / 100);
        if (idxRainbow >= arrRainbow.length) {
          idxRainbow = arrRainbow.length - 1;
        }
        const colorUsed = arrRainbow[idxRainbow];
        for (let x3 = 0; x3 < stack.width; x3 += flagAll === 1 ? 1 : stack.width - 1) {
          if (colorUsed === -1) {
            arrRow[x3] = Math.floor(rng.next() * 8 + 1);
          } else {
            arrRow[x3] = colorUsed;
          }
        }
        objCurStage.gen(arrRow, stack);
        stack.rowRise(arrRow, piece);
        frameLastRise = Mutable.frame;
        sound.playSFX("garbage");
        let topOut = false;
        for (const test in stack.grid) {
          if (stack.grid[test][0] !== void 0) {
            topOut = true;
          }
        }
        if (topOut) {
          piece.dead = true;
          Game.state = 9 /* BlockOut */;
          $setText(Elements.msg, "TOP OUT!");
          menu(FAILED_MENU_ID);
          Game.types[Game.type].die();
          sound.playSFX("gameover");
          sound.playvox("lose");
          return;
        }
      }
    }
  };

  // src/game.ts
  var Game = class _Game {
    static {
      this.type = 0;
    }
    static {
      this.params = {};
    }
    static {
      this.state = 3 /* NotPlayed */;
    }
    static {
      this.paused = false;
    }
    /**
     * Resets all the settings and starts the game.
     */
    static init(gt, params) {
      if (gt !== "replay") {
        _Game.types[_Game.type].done();
      }
      try {
        sound.killbgm();
      } catch (e4) {
      }
      const linevectorEle = $2("linevector");
      const levelEle = $2("level");
      $2("ivalue").style.color = "#ffffff";
      linevectorEle.classList.remove("drought-flash");
      linevectorEle.src = "./assets/linevector.svg";
      levelEle.classList.remove("level-flash");
      Mutable.leveltgm = 0;
      Mutable.leveltgmvisible = 0;
      Mutable.scoreNes = 0;
      Mutable.newScore = 0n;
      Mutable.tetRateNes = 0;
      Mutable.tetNes = 0;
      Mutable.nontetNes = 0;
      scoreNesRefresh();
      tetRateNesRefresh();
      Mutable.lineDrought = 0;
      Mutable.lineAmount = 0;
      makeSprite();
      sound.init();
      Mutable.column = 0;
      Mutable.keysDown = 0;
      Mutable.lastKeys = 0;
      Mutable.released = 255;
      resetPiece();
      preview.reset();
      Mutable.frame = 0;
      Mutable.frameSkipped = 0;
      Mutable.lastPos = "reset";
      stack.new(10, 20, 4);
      Mutable.toGreyRow = stack.height - 1;
      hold.piece = void 0;
      if (settings.Gravity === 0 /* Auto */)
        Mutable.gravity = gravityUnit;
      Mutable.b2b = 0;
      Mutable.combo = 0;
      Mutable.allclear = 0;
      Mutable.statsFinesse = 0;
      Mutable.lines = 0;
      Mutable.score = 0n;
      Mutable.piecesSet = 0;
      Mutable.level = _Game.types[_Game.type].params?.startingLevel ?? 0;
      Mutable.digLines = [];
      clear(Elements.stackCtx);
      clear(Elements.activeCtx);
      clear(Elements.holdCtx);
      if (gt === "replay") {
        run(params);
      } else {
        Mutable.watchingReplay = false;
        _Game.type = gt;
        _Game.params = params || {};
        _Game.types[_Game.type].init();
        const seed2 = Math.floor(Math.random() * 2147483645) + 1;
        setRNGSeed(seed2);
        Mutable.replay = {};
        Mutable.replay.keys = {};
        Mutable.replay.seed = seed2;
        Mutable.replay.type = _Game.type;
        Mutable.replay.params = _Game.params;
        Mutable.replay.settings = settings;
      }
      if (_Game.type === 7) {
        sound.cutsidebgm();
        sound.loadbgm("survival");
        sound.loadsidebgm("survivaldire");
      }
      if (_Game.type === void 0) {
        _Game.type = 0;
        sound.loadbgm("sprint");
      }
      if (_Game.type !== 0 /* Sprint */ && _Game.type !== 5 /* ScoreAttack */ && _Game.type !== 8 /* Retro */) {
        if (_Game.params.bType) {
          Mutable.lineLimit = 25;
        } else {
          Mutable.lineLimit = 0;
        }
      }
      menu(-1);
      if (_Game.paused || _Game.state === 3 /* NotPlayed */) {
        _Game.inloop = true;
        window.requestAnimationFrame(() => _Game.gameLoop());
      }
      _Game.startTime = Date.now();
      _Game.startPauseTime = 0;
      _Game.pauseTime = 0;
      Mutable.scoreTime = 0;
      _Game.paused = false;
      statisticsStack();
      preview.draw();
      _Game.state = 2 /* Countdown */;
      resize();
    }
    static {
      this.types = {};
    }
    static addGameType(num, type) {
      _Game.types[num] = type;
    }
    static {
      this.inloop = false;
    }
    static pause() {
      if (_Game.state === 0 /* Normal */ || _Game.state === 4 /* Paused */) {
        _Game.paused = true;
        _Game.startPauseTime = Date.now();
        $setText(Elements.msg, "Paused");
        menu(PAUSE_MENU_ID);
      }
    }
    static unpause() {
      _Game.paused = false;
      _Game.pauseTime += Date.now() - _Game.startPauseTime;
      $setText(Elements.msg, "");
      menu(-1);
      _Game.inloop = true;
      window.requestAnimationFrame(() => _Game.gameLoop());
    }
    static {
      // TODO: remove this
      this.defaultGameSettings = {
        marathon: {
          limit: {
            val: 0,
            max: 3
          },
          delay: {
            val: 1,
            max: 2
          },
          nograv: {
            val: 0,
            max: 1
          },
          invisible: {
            val: 0,
            max: 1
          },
          cap: {
            val: 0,
            max: 1
          }
        },
        sprint: {
          limit: {
            val: 0,
            max: 2
          },
          piece: {
            val: 0,
            max: 2
          },
          backfire: {
            val: 0,
            max: 3
          }
        },
        dig: {
          checker: {
            val: 0,
            max: 1
          },
          zen: {
            val: 0,
            max: 1
          }
        },
        survival: {
          zen: {
            val: 0,
            max: 1
          },
          slevel: {
            val: 0,
            max: 4
          }
        },
        master: {
          lock: {
            val: 1,
            max: 2
          }
        },
        retro: {
          type: {
            val: 0,
            max: 1
          },
          skin: {
            val: 1,
            max: 1
          },
          drop: {
            val: 0,
            max: 1
          },
          level: {
            val: 0,
            max: 19
          },
          flash: {
            val: 1,
            max: 1
          }
        },
        grades: {
          rule: {
            val: 1,
            max: 1
          }
        }
      };
    }
    static {
      this.settings = _Game.defaultGameSettings;
    }
    static calculateFinesse() {
      if (flags.rotLeft & Mutable.keysDown && !getFlag(Mutable.lastKeys, flags.rotLeft)) {
        piece.rotate(-1);
        piece.finesse++;
      } else if (flags.rotRight & Mutable.keysDown && !getFlag(Mutable.lastKeys, flags.rotRight)) {
        piece.rotate(1);
        piece.finesse++;
      } else if (flags.rot180 & Mutable.keysDown && !getFlag(Mutable.lastKeys, flags.rot180)) {
        piece.rotate(2);
        piece.finesse++;
      }
    }
    /**
     * Runs every frame.
     */
    static update() {
      if (Mutable.lastKeys !== Mutable.keysDown && !Mutable.watchingReplay) {
        Mutable.replay.keys[Mutable.frame] = Mutable.keysDown;
      } else if (Mutable.frame in Mutable.replay.keys) {
        Mutable.keysDown = Mutable.replay.keys[Mutable.frame];
      }
      if (!getFlag(Mutable.lastKeys, flags.holdPiece) && flags.holdPiece & Mutable.keysDown) {
        piece.hold();
      }
      if (_Game.state !== 5 /* Loss */) {
        _Game.calculateFinesse();
        piece.checkShift();
        if (flags.moveDown & Mutable.keysDown) {
          piece.shiftDown();
        }
        if (!getFlag(Mutable.lastKeys, flags.hardDrop) && flags.hardDrop & Mutable.keysDown) {
          Mutable.frameLastHarddropDown = Mutable.frame;
          piece.hardDrop();
        }
        piece.update();
        _Game.types[_Game.type].update();
      }
      updateScoreTime();
      if (Mutable.lastKeys !== Mutable.keysDown) {
        Mutable.lastKeys = Mutable.keysDown;
      }
    }
    static gameLoop() {
      const fps = 60;
      updateMatrixPosition();
      _Game.handleLockflash();
      if (_Game.state !== 0 /* Normal */ && _Game.state !== 4 /* Paused */ && _Game.state !== 2 /* Countdown */ || Mutable.killAllbgm) {
        sound.killbgm();
        Mutable.alarm = false;
        sound.stopSFX("alarm");
        $2("bgStack").classList.remove("alarm");
      }
      _Game.handlePB();
      if (!_Game.paused && _Game.state !== 3 /* NotPlayed */) {
        window.requestAnimationFrame(_Game.gameLoop);
        const repeat = Math.floor(
          (Date.now() - _Game.startTime - _Game.pauseTime) / 1e3 * fps
        ) - Mutable.frame;
        if (repeat > 1) {
          Mutable.frameSkipped += repeat - 1;
        } else if (repeat <= 0) {
          Mutable.frameSkipped += repeat - 1;
        }
        for (let repf = 0; repf < repeat; repf++) {
          switch (_Game.state) {
            case 0 /* Normal */:
              _Game.update();
              break;
            case 4 /* Paused */:
            case 2 /* Countdown */:
              _Game.initalInputs(fps);
              break;
            case 5 /* Loss */:
            case 1 /* Win */:
              _Game.doneAnimation();
              break;
          }
          Mutable.frame++;
        }
        statistics();
        if (piece.x !== Mutable.lastX || Math.floor(piece.y) !== Mutable.lastY || piece.pos !== Mutable.lastPos || piece.lockDelay !== Mutable.lastLockDelay || piece.dirty) {
          piece.draw();
        }
        Mutable.lastX = piece.x;
        Mutable.lastY = Math.floor(piece.y);
        Mutable.lastPos = piece.pos;
        Mutable.lastLockDelay = piece.lockDelay;
        piece.dirty = false;
        if (stack.dirty) {
          stack.draw();
        }
        if (preview.dirty) {
          preview.draw();
        }
      } else {
        _Game.inloop = false;
      }
    }
    static initalInputs(fps) {
      if (Mutable.lastKeys !== Mutable.keysDown && !Mutable.watchingReplay) {
        Mutable.replay.keys[Mutable.frame] = Mutable.keysDown;
      } else if (Mutable.frame in Mutable.replay.keys) {
        Mutable.keysDown = Mutable.replay.keys[Mutable.frame];
      }
      if (getFlag(Mutable.keysDown, flags.moveLeft)) {
        piece.shiftDelay = settings.DAS;
        piece.shiftReleased = false;
        piece.shiftDir = -1;
      } else if (getFlag(Mutable.keysDown, flags.moveRight)) {
        piece.shiftDelay = settings.DAS;
        piece.shiftReleased = false;
        piece.shiftDir = 1;
      } else {
        piece.shiftDelay = 0;
        piece.shiftReleased = true;
        piece.shiftDir = 0;
      }
      if (settings.IRSMode !== 0) {
        if (getFlag(Mutable.keysDown, flags.rotLeft) && !getFlag(Mutable.lastKeys, flags.rotLeft)) {
          const amt = 3;
          if (settings.IRSMode === 3) {
            piece.irsDir = (piece.irsDir + 1 + amt) % 4 - 1;
          } else {
            piece.irsDir = -1;
          }
          if (settings.InitialVis) {
            sound.playSFX("rotate");
            preview.draw();
          }
        } else if (flags.rotRight & Mutable.keysDown && !getFlag(Mutable.lastKeys, flags.rotRight)) {
          const amt = 1;
          if (settings.IRSMode === 3) {
            piece.irsDir = (piece.irsDir + 1 + amt) % 4 - 1;
          } else {
            piece.irsDir = amt;
          }
          if (settings.InitialVis) {
            sound.playSFX("rotate");
            preview.draw();
          }
        } else if (flags.rot180 & Mutable.keysDown && !getFlag(Mutable.lastKeys, flags.rot180)) {
          const amt = 2;
          if (settings.IRSMode === 3) {
            piece.irsDir = (piece.irsDir + 1 + amt) % 4 - 1;
          } else {
            piece.irsDir = amt;
          }
          if (settings.InitialVis) {
            sound.playSFX("rotate");
            preview.draw();
          }
        } else if (piece.irsDir !== 0 && (flags.rotLeft & Mutable.keysDown) === 0 && (flags.rotRight & Mutable.keysDown) === 0 && (flags.rot180 & Mutable.keysDown) === 0 && settings.IRSMode === 2) {
          piece.irsDir = 0;
          if (settings.InitialVis) {
            sound.playSFX("rotate");
            preview.draw();
          }
        }
      }
      const irsIndicator = $2("irs-indicator");
      if (!getFlag(Mutable.lastKeys, flags.holdPiece) && flags.holdPiece & Mutable.keysDown && piece.ihs === false && settings.IHSMode !== 0) {
        if (_Game.type !== 8) {
          piece.ihs = true;
          irsIndicator.classList.add("gone");
          if (settings.InitialVis) {
            hold.draw();
            preview.draw();
          }
        }
      } else if (piece.ihs && (flags.holdPiece & Mutable.keysDown) !== 16 && settings.IHSMode === 2) {
        if (_Game.type !== 8) {
          piece.ihs = false;
          $2("ihs-indicator").classList.add("gone");
          if (settings.InitialVis) {
            hold.draw();
            preview.draw();
          }
        }
      }
      if (Mutable.lastKeys !== Mutable.keysDown) {
        Mutable.lastKeys = Mutable.keysDown;
      }
      const time1 = 5;
      const time2 = 10;
      if (_Game.state === 2 /* Countdown */) {
        _Game.countDown(irsIndicator, fps, time1, time2);
      } else {
        if (Mutable.lineClear === 4) {
          if (_Game.type === 8 /* Retro */ && _Game.settings.retro.flash.val === 1) {
            if (piece.are % 2 === 0) {
              document.body.style.backgroundColor = "white";
            } else {
              document.body.style.backgroundColor = "black";
            }
          }
        }
        if (piece.irsDir !== 0) {
          irsIndicator.classList.remove("gone");
        }
        if (piece.ihs === true) {
          $2("ihs-indicator").classList.remove("gone");
        }
        if (piece.are >= Mutable.lineARE) {
          stack.clearLines();
        }
        piece.are++;
        updateScoreTime();
      }
      if (_Game.state === 2 /* Countdown */ && Mutable.frame >= fps * time2 / 6 || _Game.state === 4 /* Paused */ && piece.are >= piece.areLimit) {
        document.body.style.backgroundColor = "black";
        _Game.state = 0 /* Normal */;
        if (piece.ihs && _Game.type !== 8) {
          hold.soundCancel = 1;
          piece.index = preview.next();
          sound.playSFX("initialhold");
          piece.hold();
        } else {
          piece.new(preview.next());
        }
        piece.draw();
        updateScoreTime();
      }
    }
    static doneAnimation() {
      $2("stack").classList.remove("invisible-replay");
      $2("stack").classList.remove("invisible");
      if (Mutable.toGreyRow >= stack.hiddenHeight) {
        if (Mutable.frame % 2) {
          for (let x3 = 0; x3 < stack.width; x3++) {
            if (stack.grid[x3][Mutable.toGreyRow])
              stack.grid[x3][Mutable.toGreyRow] = _Game.state === 5 /* Loss */ ? 8 : 0;
          }
          stack.draw();
          Mutable.toGreyRow--;
        }
      } else {
        _Game.state = 3 /* NotPlayed */;
      }
    }
    static countDown(irsIndicator, fps, time1, time2) {
      if (piece.irsDir !== 0) {
        irsIndicator.classList.remove("gone");
      }
      if (piece.ihs === true) {
        $2("ihs-indicator").classList.remove("gone");
      }
      const strictInd = $2("strict-ind");
      const myVideo = $2("myVideo");
      if (_Game.params.delayStrictness === 2) {
        myVideo.classList.remove("gone");
        strictInd.classList.remove("gone");
      } else {
        myVideo.classList.add("gone");
        strictInd.classList.add("gone");
      }
      if (Mutable.frame === 0) {
        statisticsStack();
        makeSprite();
        Mutable.playedLevelingbgmGrades = [false, false];
        Mutable.playedLevelingbgmMarathon = [false, false];
        Mutable.killAllbgm = true;
        $setText(Elements.msg, t3("ready"));
        clearTetrisMessage();
        $2("msgdiv").classList.remove("startanim");
        sound.playSFX("ready");
        Mutable.clearRows = [];
        sound.killbgm();
      } else if (Mutable.frame === Math.floor(fps * time1 / 6)) {
        Mutable.killAllbgm = false;
        $setText(Elements.msg, t3("start"));
        sound.playSFX("go");
        preview.draw();
        sound.killbgm();
      } else if (Mutable.frame === Math.floor(fps * time2 / 6)) {
        $2("msgdiv").classList.remove("startanim");
        $setText(Elements.msg, "");
        Mutable.scoreStartTime = Date.now();
        switch (_Game.type) {
          case 6 /* Master */:
            if (_Game.params.delayStrictness === 2) {
              sound.playbgm("masterstrict");
              sound.playsidebgm("masterstrictdire");
            } else {
              sound.playbgm("master");
            }
            break;
          case 1 /* Marathon */:
            sound.playbgm("marathon");
            break;
          case 0 /* Sprint */:
          case 4 /* Dig */:
          case 5 /* ScoreAttack */:
            sound.playbgm("sprint");
            break;
          case 3 /* Survival */:
          case 7 /* Unknown */:
            sound.cutsidebgm();
            sound.playbgm("survival");
            sound.playsidebgm("survivaldire");
            break;
          case 8 /* Retro */:
            if (!_Game.params.proMode) {
              sound.playbgm("retro");
            } else {
              sound.cutsidebgm();
              sound.playbgm("retropro");
              sound.playsidebgm("retroprodrought");
            }
            break;
          case 9 /* Grades */:
            sound.playbgm("grade1");
            break;
        }
        sound.lowersidebgm();
      }
      Mutable.scoreTime = 0;
    }
    static handlePB() {
      const timeEle = $2("time");
      const gameType = _Game.types[_Game.type];
      if (gameType.isPBValid(false)) {
        const pb = getPB(gameType.pbKey);
        if (Mutable.scoreTime >= pb + 100) {
          Elements.timeCtx.fillStyle = "#f00";
          timeEle.classList.add("drought-flash");
          if (settings.ResetPB) {
            _Game.init(_Game.type, _Game.params);
          }
        } else {
          Elements.timeCtx.fillStyle = "#fff";
          timeEle.classList.remove("drought-flash");
        }
      } else {
        Elements.timeCtx.fillStyle = "#fff";
        timeEle.classList.remove("drought-flash");
      }
    }
    static handleLockflash() {
      if (Mutable.lockflash > 0) {
        if (piece.tetro !== void 0) {
          for (const [i4, j3] of range2x2(4, 4)) {
            if (Mutable.lockflashTetro[i4][j3] > 0) {
              Elements.stackCtx.fillStyle = "#ffffff";
              Elements.stackCtx.fillRect(
                (Mutable.lockflashX + i4) * Mutable.cellSize,
                (Math.floor(Mutable.lockflashY + j3) - 4) * Mutable.cellSize,
                Mutable.cellSize,
                Mutable.cellSize
              );
            }
          }
        }
        Mutable.lockflash--;
      } else if (Mutable.lockflashOn) {
        stack.draw();
        Mutable.lockflash = 0;
        Mutable.lockflashOn = false;
      }
    }
    // called after piece lock, may be called multple times when die-in-one-frame
    static checkWin() {
      const gameType = _Game.types[_Game.type];
      if (gameType.checkWin()) {
        _Game.state = 1 /* Win */;
        const winMessage = gameType.customWinMessage();
        $setText(Elements.msg, winMessage ?? "GREAT!");
        piece.dead = true;
        menu(FAILED_MENU_ID);
        sound.playSFX("endingstart");
        sound.playvox("win");
        gameType.win();
        gameType.checkPB();
      }
      if (gameType.checkDie()) {
        _Game.state = 9 /* BlockOut */;
        const dieMessage = gameType.customWinMessage();
        $setText(Elements.msg, dieMessage ?? "BLOCK OUT!");
        piece.dead = true;
        menu(FAILED_MENU_ID);
        sound.playSFX("gameover");
        sound.playvox("lose");
        gameType.die();
        gameType.checkPB();
      }
    }
  };
  Game.addGameType(0 /* Sprint */, new Sprint());
  Game.addGameType(1 /* Marathon */, new Marathon());
  Game.addGameType(5 /* ScoreAttack */, new ScoreAttack());
  Game.addGameType(4 /* Dig */, new Dig());
  Game.addGameType(6 /* Master */, new Master());
  Game.addGameType(8 /* Retro */, new Retro());
  Game.addGameType(9 /* Grades */, new Grades());
  Game.addGameType(3 /* Survival */, new Survival());

  // src/display/menu.ts
  function resetGameSettings() {
    Game.settings = Game.defaultGameSettings;
    localStorage.setItem("Game.settings", JSON.stringify(Game.settings));
  }
  function changeGameSetting(game, key, val) {
    Game.settings[game][key].val = val;
    localStorage.setItem("Game.settings", JSON.stringify(Game.settings));
  }
  function parseVersion(v3) {
    return v3 ? v3.split(".").map(Number) : [0, 0, 0];
  }
  function differentVersion(v1, v22) {
    const v1p = parseVersion(v1);
    const v2p = parseVersion(v22);
    return v1p[0] !== v2p[0] || v1p[1] !== v2p[1];
  }
  function data() {
    if (differentVersion(localStorage.getItem("version"), version)) {
      localStorage.removeItem("settings");
      localStorage.removeItem("Game.settings");
      localStorage.removeItem("binds");
      localStorage.setItem("version", version);
      resetGameSettings();
      return;
    }
    const storedSettings = localStorage.getItem("settings");
    if (storedSettings) {
      const parsed = JSON.parse(storedSettings);
      for (const setting in parsed) {
        settings[setting] = parsed[setting];
      }
    }
    const bindData = localStorage.getItem("binds");
    if (bindData) {
      setBinds(JSON.parse(bindData));
    }
  }

  // src/components/center/menu/main/overlays/RankingsMenu.tsx
  function RankingsMenu() {
    return /* @__PURE__ */ e3("div", { id: "leader", class: "menu", children: [
      /* @__PURE__ */ e3("h2", { children: "Rankings" }),
      /* @__PURE__ */ e3("div", { id: "leaderboard" }),
      /* @__PURE__ */ e3("div", { style: "clear: both", children: /* @__PURE__ */ e3(BackBtn, {}) })
    ] });
  }

  // src/components/center/SectionMiddle.tsx
  function SectionMiddle() {
    return /* @__PURE__ */ e3("div", { id: "b", children: [
      /* @__PURE__ */ e3("canvas", { id: "bgStack" }),
      /* @__PURE__ */ e3("canvas", { id: "stack", children: "You need an up-to-date web browser to play this game." }),
      /* @__PURE__ */ e3("canvas", { id: "active" }),
      /* @__PURE__ */ e3("div", { id: "msgdiv", children: /* @__PURE__ */ e3("span", { id: "msg" }) }),
      /* @__PURE__ */ e3("div", { id: "cleardiv", children: /* @__PURE__ */ e3("span", { id: "clear" }) }),
      /* @__PURE__ */ e3("div", { id: "rendiv", children: /* @__PURE__ */ e3("span", { id: "renmsg" }) }),
      /* @__PURE__ */ e3("div", { id: "b2bdiv", children: /* @__PURE__ */ e3("span", { id: "b2bmsg" }) }),
      /* @__PURE__ */ e3(MainMenu, {}),
      /* @__PURE__ */ e3(ControlsMenu, {}),
      /* @__PURE__ */ e3(FailedMenu, {}),
      /* @__PURE__ */ e3(PauseMenu, {}),
      /* @__PURE__ */ e3(RankingsMenu, {}),
      /* @__PURE__ */ e3(ReplayMenu, {}),
      /* @__PURE__ */ e3(DigMenu, {}),
      /* @__PURE__ */ e3(RetroMenu, {}),
      /* @__PURE__ */ e3(SprintMenu, {}),
      /* @__PURE__ */ e3(MarathonMenu, {}),
      /* @__PURE__ */ e3(MasterMenu, {}),
      /* @__PURE__ */ e3(SettingsMenu, {}),
      /* @__PURE__ */ e3(TuningMenu, {}),
      /* @__PURE__ */ e3(AudioMenu, {}),
      /* @__PURE__ */ e3(GraphicsMenu, {}),
      /* @__PURE__ */ e3(SurvialMenu, {}),
      /* @__PURE__ */ e3(GradesMenu, {})
    ] });
  }

  // src/components/left/Stats.tsx
  function Stats({}) {
    return /* @__PURE__ */ e3("table", { id: "stats", children: [
      /* @__PURE__ */ e3("tr", { id: "nesratetr", class: "gone", children: [
        /* @__PURE__ */ e3("th", { class: "white-border-span", style: "font-size: 0.5em", children: [
          /* @__PURE__ */ e3("b", { children: "Tetris" }),
          " Rate"
        ] }),
        /* @__PURE__ */ e3("td", { id: "nesrate", children: "0" })
      ] }),
      /* @__PURE__ */ e3("tr", { children: [
        /* @__PURE__ */ e3("th", { id: "score-label", class: "white-border-span", children: "Score" }),
        /* @__PURE__ */ e3("td", { id: "score", children: "0" }),
        /* @__PURE__ */ e3("td", { id: "nesscore", children: "0" })
      ] }),
      /* @__PURE__ */ e3("tr", { children: [
        /* @__PURE__ */ e3("th", { id: "level", class: "white-border-span" }),
        /* @__PURE__ */ e3("th", { id: "strict-ind", children: "STRICT MODE" })
      ] }),
      /* @__PURE__ */ e3("tr", { children: [
        /* @__PURE__ */ e3("th", { class: "white-border-span", children: "Lines" }),
        /* @__PURE__ */ e3("td", { id: "levelline", children: [
          /* @__PURE__ */ e3("div", { id: "promode" }),
          /* @__PURE__ */ e3("div", { id: "line", children: "0" })
        ] })
      ] }),
      /* @__PURE__ */ e3("tr", { children: [
        /* @__PURE__ */ e3("th", { class: "white-border-span", children: "Pieces" }),
        /* @__PURE__ */ e3("td", { id: "piece", children: "0" })
      ] }),
      /* @__PURE__ */ e3("tr", { children: [
        /* @__PURE__ */ e3("th", { class: "white-border-span", children: "Finesse" }),
        /* @__PURE__ */ e3("td", { id: "finesse", children: "0" })
      ] }),
      /* @__PURE__ */ e3("tr", { children: /* @__PURE__ */ e3("th", { id: "time", children: /* @__PURE__ */ e3("canvas", {}) }) })
    ] });
  }

  // src/components/left/SectionLeft.tsx
  function SectionLeft() {
    return /* @__PURE__ */ e3("div", { id: "d", children: [
      /* @__PURE__ */ e3("h3", { id: "holdtext", children: /* @__PURE__ */ e3("span", { class: "white-border-span", children: "Hold" }) }),
      /* @__PURE__ */ e3("div", { id: "a", children: [
        /* @__PURE__ */ e3("canvas", { id: "hold", class: "glow-flash-animation" }),
        /* @__PURE__ */ e3("br", {}),
        /* @__PURE__ */ e3("div", { id: "divInp" })
      ] }),
      /* @__PURE__ */ e3("h3", { id: "ihs-indicator", class: "flashing", children: "INITIAL" }),
      /* @__PURE__ */ e3(Stats, {})
    ] });
  }

  // src/utils/random-id.ts
  function guid(len) {
    return Math.random().toString(36).substring(2, len);
  }

  // src/components/utils/ProgressBar.tsx
  function ProgressBar({
    id: id2,
    "label-id": labelId,
    value,
    max
  }) {
    const eleId = id2 || `progress-bar-${guid(5)}`;
    return /* @__PURE__ */ e3(d, { children: [
      labelId && /* @__PURE__ */ e3("label", { id: labelId, for: eleId, style: "display: block" }),
      /* @__PURE__ */ e3("progress", { id: eleId, value, max })
    ] });
  }

  // src/components/utils/LineShower.tsx
  function LineShower() {
    return /* @__PURE__ */ e3(
      "div",
      {
        id: "lineshower",
        style: "\n				font-size: 2.5em;\n				transform: translate(0, 9em);\n				display: none;\n			",
        children: [
          /* @__PURE__ */ e3("img", { id: "linevector", src: "./assets/linevector.svg" }),
          /* @__PURE__ */ e3(
            "p",
            {
              id: "ivalue",
              style: `
					margin: 0px;
					text-align: center;
					font-family: 'Roboto Mono';
					font-weight: 200;
				`,
              children: "0"
            }
          )
        ]
      }
    );
  }

  // src/components/right/SectionRight.tsx
  function SectionRight() {
    return /* @__PURE__ */ e3("div", { id: "c", children: [
      /* @__PURE__ */ e3("div", { id: "sounds-loading", children: /* @__PURE__ */ e3(
        ProgressBar,
        {
          id: "sound-loading-bar",
          "label-id": "sound-name",
          value: 0,
          max: 100
        }
      ) }),
      /* @__PURE__ */ e3("h3", { id: "irs-indicator", class: "flashing", children: "INITIAL" }),
      /* @__PURE__ */ e3("h3", { style: "font-weight: 300", children: /* @__PURE__ */ e3("span", { class: "white-border-span", children: "Next" }) }),
      /* @__PURE__ */ e3("canvas", { id: "preview" }),
      /* @__PURE__ */ e3(LineShower, {})
    ] });
  }

  // src/components/main.tsx
  function MainComponent() {
    y2(() => {
      menu(MAIN_MENU_ID, 1);
    }, []);
    return /* @__PURE__ */ e3(d, { children: [
      /* @__PURE__ */ e3(SectionLeft, {}),
      /* @__PURE__ */ e3(SectionMiddle, {}),
      /* @__PURE__ */ e3(SectionRight, {})
    ] });
  }

  // node_modules/preact/devtools/dist/devtools.module.js
  "undefined" != typeof window && window.__PREACT_DEVTOOLS__ && window.__PREACT_DEVTOOLS__.attachPreact("10.6.4", l, { Fragment: d, Component: _ });

  // node_modules/preact/debug/dist/debug.module.js
  var o4 = {};
  function a3(n2) {
    return n2.type === d ? "Fragment" : "function" == typeof n2.type ? n2.type.displayName || n2.type.name : "string" == typeof n2.type ? n2.type : "#text";
  }
  var i3 = [];
  var s3 = [];
  function c3() {
    return i3.length > 0 ? i3[i3.length - 1] : null;
  }
  var l3 = false;
  function u3(n2) {
    return "function" == typeof n2.type && n2.type != d;
  }
  function f3(n2) {
    for (var t4 = [n2], e4 = n2; null != e4.__o; )
      t4.push(e4.__o), e4 = e4.__o;
    return t4.reduce(function(n3, t5) {
      n3 += "  in " + a3(t5);
      var e5 = t5.__source;
      return e5 ? n3 += " (at " + e5.fileName + ":" + e5.lineNumber + ")" : l3 || (l3 = true, console.warn("Add @babel/plugin-transform-react-jsx-source to get a more detailed component stack. Note that you should not add it to production builds of your App for bundle size reasons.")), n3 + "\n";
    }, "");
  }
  var p2 = "function" == typeof WeakMap;
  var d3 = _.prototype.setState;
  _.prototype.setState = function(n2, t4) {
    return null == this.__v ? null == this.state && console.warn('Calling "this.setState" inside the constructor of a component is a no-op and might be a bug in your application. Instead, set "this.state = {}" directly.\n\n' + f3(c3())) : null == this.__P && console.warn(`Can't call "this.setState" on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.

` + f3(this.__v)), d3.call(this, n2, t4);
  };
  var h2 = _.prototype.forceUpdate;
  function y3(n2) {
    var t4 = n2.props, e4 = a3(n2), o5 = "";
    for (var r3 in t4)
      if (t4.hasOwnProperty(r3) && "children" !== r3) {
        var i4 = t4[r3];
        "function" == typeof i4 && (i4 = "function " + (i4.displayName || i4.name) + "() {}"), i4 = Object(i4) !== i4 || i4.toString ? i4 + "" : Object.prototype.toString.call(i4), o5 += " " + r3 + "=" + JSON.stringify(i4);
      }
    var s4 = t4.children;
    return "<" + e4 + o5 + (s4 && s4.length ? ">..</" + e4 + ">" : " />");
  }
  _.prototype.forceUpdate = function(n2) {
    return null == this.__v ? console.warn('Calling "this.forceUpdate" inside the constructor of a component is a no-op and might be a bug in your application.\n\n' + f3(c3())) : null == this.__P && console.warn(`Can't call "this.forceUpdate" on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.

` + f3(this.__v)), h2.call(this, n2);
  }, function() {
    !function() {
      var t5 = l.__b, e5 = l.diffed, o5 = l.__, r4 = l.vnode, a4 = l.__r;
      l.diffed = function(n2) {
        u3(n2) && s3.pop(), i3.pop(), e5 && e5(n2);
      }, l.__b = function(n2) {
        u3(n2) && i3.push(n2), t5 && t5(n2);
      }, l.__ = function(n2, t6) {
        s3 = [], o5 && o5(n2, t6);
      }, l.vnode = function(n2) {
        n2.__o = s3.length > 0 ? s3[s3.length - 1] : null, r4 && r4(n2);
      }, l.__r = function(n2) {
        u3(n2) && s3.push(n2), a4 && a4(n2);
      };
    }();
    var t4 = false, e4 = l.__b, r3 = l.diffed, c4 = l.vnode, l4 = l.__e, d4 = l.__, h3 = l.__h, m3 = p2 ? { useEffect: /* @__PURE__ */ new WeakMap(), useLayoutEffect: /* @__PURE__ */ new WeakMap(), lazyPropTypes: /* @__PURE__ */ new WeakMap() } : null, v3 = [];
    l.__e = function(n2, t5, e5) {
      if (t5 && t5.__c && "function" == typeof n2.then) {
        var o5 = n2;
        n2 = new Error("Missing Suspense. The throwing component was: " + a3(t5));
        for (var r4 = t5; r4; r4 = r4.__)
          if (r4.__c && r4.__c.__c) {
            n2 = o5;
            break;
          }
        if (n2 instanceof Error)
          throw n2;
      }
      try {
        l4(n2, t5, e5), "function" != typeof n2.then && setTimeout(function() {
          throw n2;
        });
      } catch (n3) {
        throw n3;
      }
    }, l.__ = function(n2, t5) {
      if (!t5)
        throw new Error("Undefined parent passed to render(), this is the second argument.\nCheck if the element is available in the DOM/has the correct id.");
      var e5;
      switch (t5.nodeType) {
        case 1:
        case 11:
        case 9:
          e5 = true;
          break;
        default:
          e5 = false;
      }
      if (!e5) {
        var o5 = a3(n2);
        throw new Error("Expected a valid HTML node as a second argument to render.	Received " + t5 + " instead: render(<" + o5 + " />, " + t5 + ");");
      }
      d4 && d4(n2, t5);
    }, l.__b = function(n2) {
      var r4 = n2.type, i4 = function n3(t5) {
        return t5 ? "function" == typeof t5.type ? n3(t5.__) : t5 : {};
      }(n2.__);
      if (t4 = true, void 0 === r4)
        throw new Error("Undefined component passed to createElement()\n\nYou likely forgot to export your component or might have mixed up default and named imports" + y3(n2) + "\n\n" + f3(n2));
      if (null != r4 && "object" == typeof r4) {
        if (void 0 !== r4.__k && void 0 !== r4.__e)
          throw new Error("Invalid type passed to createElement(): " + r4 + "\n\nDid you accidentally pass a JSX literal as JSX twice?\n\n  let My" + a3(n2) + " = " + y3(r4) + ";\n  let vnode = <My" + a3(n2) + " />;\n\nThis usually happens when you export a JSX literal and not the component.\n\n" + f3(n2));
        throw new Error("Invalid type passed to createElement(): " + (Array.isArray(r4) ? "array" : r4));
      }
      if ("thead" !== r4 && "tfoot" !== r4 && "tbody" !== r4 || "table" === i4.type ? "tr" === r4 && "thead" !== i4.type && "tfoot" !== i4.type && "tbody" !== i4.type && "table" !== i4.type ? console.error("Improper nesting of table. Your <tr> should have a <thead/tbody/tfoot/table> parent." + y3(n2) + "\n\n" + f3(n2)) : "td" === r4 && "tr" !== i4.type ? console.error("Improper nesting of table. Your <td> should have a <tr> parent." + y3(n2) + "\n\n" + f3(n2)) : "th" === r4 && "tr" !== i4.type && console.error("Improper nesting of table. Your <th> should have a <tr>." + y3(n2) + "\n\n" + f3(n2)) : console.error("Improper nesting of table. Your <thead/tbody/tfoot> should have a <table> parent." + y3(n2) + "\n\n" + f3(n2)), void 0 !== n2.ref && "function" != typeof n2.ref && "object" != typeof n2.ref && !("$$typeof" in n2))
        throw new Error(`Component's "ref" property should be a function, or an object created by createRef(), but got [` + typeof n2.ref + "] instead\n" + y3(n2) + "\n\n" + f3(n2));
      if ("string" == typeof n2.type) {
        for (var s4 in n2.props)
          if ("o" === s4[0] && "n" === s4[1] && "function" != typeof n2.props[s4] && null != n2.props[s4])
            throw new Error(`Component's "` + s4 + '" property should be a function, but got [' + typeof n2.props[s4] + "] instead\n" + y3(n2) + "\n\n" + f3(n2));
      }
      if ("function" == typeof n2.type && n2.type.propTypes) {
        if ("Lazy" === n2.type.displayName && m3 && !m3.lazyPropTypes.has(n2.type)) {
          var c5 = "PropTypes are not supported on lazy(). Use propTypes on the wrapped component itself. ";
          try {
            var l5 = n2.type();
            m3.lazyPropTypes.set(n2.type, true), console.warn(c5 + "Component wrapped in lazy() is " + a3(l5));
          } catch (n3) {
            console.warn(c5 + "We will log the wrapped component's name once it is loaded.");
          }
        }
        var u4 = n2.props;
        n2.type.__f && delete (u4 = function(n3, t5) {
          for (var e5 in t5)
            n3[e5] = t5[e5];
          return n3;
        }({}, u4)).ref, function(n3, t5, e5, r5, a4) {
          Object.keys(n3).forEach(function(e6) {
            var i5;
            try {
              i5 = n3[e6](t5, e6, r5, "prop", null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (n4) {
              i5 = n4;
            }
            !i5 || i5.message in o4 || (o4[i5.message] = true, console.error("Failed prop type: " + i5.message + (a4 && "\n" + a4() || "")));
          });
        }(n2.type.propTypes, u4, 0, a3(n2), function() {
          return f3(n2);
        });
      }
      e4 && e4(n2);
    }, l.__h = function(n2, e5, o5) {
      if (!n2 || !t4)
        throw new Error("Hook can only be invoked from render methods.");
      h3 && h3(n2, e5, o5);
    };
    var b3 = function(n2, t5) {
      return { get: function() {
        var e5 = "get" + n2 + t5;
        v3 && v3.indexOf(e5) < 0 && (v3.push(e5), console.warn("getting vnode." + n2 + " is deprecated, " + t5));
      }, set: function() {
        var e5 = "set" + n2 + t5;
        v3 && v3.indexOf(e5) < 0 && (v3.push(e5), console.warn("setting vnode." + n2 + " is not allowed, " + t5));
      } };
    }, w3 = { nodeName: b3("nodeName", "use vnode.type"), attributes: b3("attributes", "use vnode.props"), children: b3("children", "use vnode.props.children") }, g3 = Object.create({}, w3);
    l.vnode = function(n2) {
      var t5 = n2.props;
      if (null !== n2.type && null != t5 && ("__source" in t5 || "__self" in t5)) {
        var e5 = n2.props = {};
        for (var o5 in t5) {
          var r4 = t5[o5];
          "__source" === o5 ? n2.__source = r4 : "__self" === o5 ? n2.__self = r4 : e5[o5] = r4;
        }
      }
      n2.__proto__ = g3, c4 && c4(n2);
    }, l.diffed = function(n2) {
      if (n2.__k && n2.__k.forEach(function(t5) {
        if (t5 && void 0 === t5.type) {
          delete t5.__, delete t5.__b;
          var e6 = Object.keys(t5).join(",");
          throw new Error("Objects are not valid as a child. Encountered an object with the keys {" + e6 + "}.\n\n" + f3(n2));
        }
      }), t4 = false, r3 && r3(n2), null != n2.__k)
        for (var e5 = [], o5 = 0; o5 < n2.__k.length; o5++) {
          var a4 = n2.__k[o5];
          if (a4 && null != a4.key) {
            var i4 = a4.key;
            if (-1 !== e5.indexOf(i4)) {
              console.error('Following component has two or more children with the same key attribute: "' + i4 + '". This may cause glitches and misbehavior in rendering process. Component: \n\n' + y3(n2) + "\n\n" + f3(n2));
              break;
            }
            e5.push(i4);
          }
        }
    };
  }();

  // src/main.ts
  Promise.all([
    getLanguageData("en"),
    getLanguageData(navigator.language.substring(0, 2))
  ]).then((v3) => {
    data();
    S(v(MainComponent, {}), $2("content"));
    addEventListener("resize", resize, false);
    addEventListener("load", resize, false);
    addEventListener("keydown", keyUpDown, false);
    addEventListener("keyup", keyUpDown, false);
    sound.init();
    window.addEventListener("focus", () => {
      try {
        if (Mutable.alarm) {
          sound.playSFX("alarm");
        }
        sound.unmutebgm();
        Game.pause();
      } catch (error) {
      }
    });
    window.addEventListener("blur", () => {
      try {
        sound.stopSFX("alarm");
        sound.mutebgm();
        Game.unpause();
      } catch (error) {
      }
    });
  });
})();
/*! Bundled license information:

howler/dist/howler.js:
  (*!
   *  howler.js v2.2.3
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   *)
  (*!
   *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
   *  
   *  howler.js v2.2.3
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   *)
*/
//# sourceMappingURL=main.js.map
