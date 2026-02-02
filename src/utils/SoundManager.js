class SoundManager {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
    }

    // Call this on first user interaction to unlock AudioContext
    init() {
        if (!this.ctx) {
            try {
                this.ctx = new (window.AudioContext || window.webkitAudioContext)();
                this.masterGain = this.ctx.createGain();
                this.masterGain.gain.value = 0.3; // Prevent ear damage
                this.masterGain.connect(this.ctx.destination);
            } catch (e) {
                console.warn("AudioContext processing failed:", e);
                return;
            }
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playHoverSwoosh() {
        if (!this.ctx) return;
        // White noise buffer for swoosh check
        const bufferSize = this.ctx.sampleRate * 0.5; // 0.5 sec
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        // Filter to make it "windy"
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 400;

        // Envelope
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.5, this.ctx.currentTime + 0.1);
        gain.gain.expoRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start();

        // Animate filter for "movement"
        filter.frequency.linearRampToValueAtTime(800, this.ctx.currentTime + 0.3);
    }

    playClickImpact() {
        if (!this.ctx) return;
        // Low Bass Kick
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.5);

        gain.gain.setValueAtTime(1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.5);
    }

    playPop() {
        if (!this.ctx) return;
        // High pitch delicate pop for UI
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.type = 'sine';

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }
}

export const soundManager = new SoundManager();
