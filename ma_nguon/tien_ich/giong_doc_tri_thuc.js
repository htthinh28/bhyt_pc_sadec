/**
 * Đọc văn bản tiếng Việt (TTS) — Web: SpeechSynthesis; native: expo-speech.
 * Ưu tiên giọng Việt tự nhiên hơn (Google / Enhanced / Neural nếu có trên thiết bị).
 * Không gửi dữ liệu ra ngoài thiết bị.
 */
import * as Speech from 'expo-speech';
import { Platform } from 'react-native';

const stripMarkdownNhe = (s) =>
  String(s || '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/https?:\/\/\S+/gi, '')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\n{2,}/g, '\n')
    .replace(/\s+/g, ' ')
    .trim();

/** Điểm càng cao = ưu tiên (Web SpeechSynthesisVoice). */
function diemGiongWebViet(v) {
  const lang = String(v.lang || '').toLowerCase();
  const name = String(v.name || '').toLowerCase();
  let s = 0;
  if (lang === 'vi-vn') s += 150;
  else if (lang === 'vi') s += 120;
  else if (lang.startsWith('vi')) s += 90;
  if (/google|microsoft|apple|natural|neural|premium|enhanced|offline|wavenet|studio/.test(name)) s += 45;
  if (/vietnam|vietnamese|tiếng việt|tieng viet|vn\b/.test(name)) s += 20;
  return s;
}

/** Điểm càng cao = ưu tiên (expo Voice). */
function diemGiongNativeViet(v) {
  const lang = String(v.language || '').toLowerCase();
  const name = String(v.name || '').toLowerCase();
  let s = 0;
  if (lang === 'vi-vn' || lang === 'vi') s += 100;
  else if (lang.startsWith('vi')) s += 80;
  if (v.quality === 'Enhanced') s += 50;
  if (/google|siri|natural|neural|premium|enhanced|vicki|nam minh|hoài my|linh/.test(name)) s += 25;
  return s;
}

function chonGiongWebTotNhat() {
  if (typeof window === 'undefined' || !window.speechSynthesis?.getVoices) return null;
  const voices = window.speechSynthesis.getVoices() || [];
  if (voices.length === 0) return null;
  const vi = voices.filter((v) => /^vi/i.test(v.lang || '') || /vietnam|tiếng việt|tieng viet|vietnamese/i.test(v.name || ''));
  const pool = vi.length ? vi : voices;
  const sorted = [...pool].sort((a, b) => diemGiongWebViet(b) - diemGiongWebViet(a));
  return sorted[0] || null;
}

/** Cache identifier giọng Việt trên iOS/Android (null = không có / đã thử). */
let giongVietNativeId = undefined;

async function layIdentifierGiongVietNative() {
  if (giongVietNativeId !== undefined) return giongVietNativeId;
  try {
    const list = await Speech.getAvailableVoicesAsync();
    const vi = (list || []).filter((v) => /^vi/i.test(String(v.language || '')));
    if (vi.length === 0) {
      giongVietNativeId = null;
      return null;
    }
    vi.sort((a, b) => diemGiongNativeViet(b) - diemGiongNativeViet(a));
    giongVietNativeId = vi[0].identifier;
    return giongVietNativeId;
  } catch {
    giongVietNativeId = null;
    return null;
  }
}

/** Gọi sau khi người dùng đổi ngôn ngữ hệ thống — thử lại giọng Việt. */
export const lamMoiBangGiongDocNative = () => {
  giongVietNativeId = undefined;
};

export const dungDocDangChay = () => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.speechSynthesis) {
    return window.speechSynthesis.speaking || window.speechSynthesis.pending;
  }
  return false;
};

export const dungDoc = () => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    return;
  }
  try {
    Speech.stop();
  } catch {
    /* ignore */
  }
};

/**
 * @param {string} text
 * @param {{ rate?: number, pitch?: number, volume?: number }} [opts]
 *   — rate ~0.92–0.98 thường nghe tự nhiên hơn với tiếng Việt (mặc định 0.94).
 */
export const docVanBan = async (text, opts = {}) => {
  const plain = stripMarkdownNhe(text);
  if (!plain) return;

  const rate = typeof opts.rate === 'number' ? opts.rate : 0.94;
  const pitch = typeof opts.pitch === 'number' ? opts.pitch : 1.0;
  const volume = typeof opts.volume === 'number' ? opts.volume : 1.0;

  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.speechSynthesis && window.SpeechSynthesisUtterance) {
    dungDoc();

    const phat = () => {
      const voice = chonGiongWebTotNhat();
      const u = new window.SpeechSynthesisUtterance(plain);
      u.rate = Math.min(1.35, Math.max(0.5, rate));
      u.pitch = Math.min(2, Math.max(0.5, pitch));
      u.volume = Math.min(1, Math.max(0, volume));
      if (voice) {
        u.voice = voice;
        u.lang = voice.lang || 'vi-VN';
      } else {
        u.lang = 'vi-VN';
      }
      window.speechSynthesis.speak(u);
    };

    let voices = window.speechSynthesis.getVoices?.() || [];
    if (voices.length === 0) {
      const goi = () => {
        window.speechSynthesis?.removeEventListener?.('voiceschanged', goi);
        phat();
      };
      window.speechSynthesis.addEventListener('voiceschanged', goi);
      setTimeout(() => {
        window.speechSynthesis?.removeEventListener?.('voiceschanged', goi);
        phat();
      }, 600);
      return;
    }
    phat();
    return;
  }

  dungDoc();
  const voiceId = await layIdentifierGiongVietNative();
  const options = {
    language: 'vi-VN',
    rate: Math.min(1.35, Math.max(0.5, rate)),
    pitch: Math.min(2, Math.max(0.5, pitch)),
  };
  if (voiceId) {
    options.voice = voiceId;
  }
  Speech.speak(plain, options);
};
