import { Alert, Linking, Platform } from 'react-native';

import { business } from '../constants/theme';

/**
 * Tries each URL in turn, falling back when one can't be handled.
 *
 * Deliberately avoids `canOpenURL`: on Android 11+ it returns false for
 * schemes the app hasn't declared in its manifest `queries`, even when the
 * target app is installed. Attempting the open and catching the failure is
 * accurate regardless.
 */
async function openFirst(urls: string[], label: string) {
  for (const url of urls) {
    try {
      await Linking.openURL(url);
      return;
    } catch {
      // Try the next candidate.
    }
  }
  Alert.alert('Unable to open', `Could not start ${label} on this device.`);
}

export function callUs() {
  return openFirst([`tel:${business.phone}`], 'the phone dialler');
}

export function emailUs() {
  return openFirst([`mailto:${business.email}`], 'your email app');
}

/** Opens WhatsApp with a pre-filled enquiry, optionally naming a stone. */
export function whatsAppUs(about?: string) {
  const message = about
    ? `${business.whatsappText} ${about}.`
    : `${business.whatsappText} your granite range.`;
  const phone = business.phone.replace('+', '');
  const text = encodeURIComponent(message);

  return openFirst(
    [
      // Opens the installed app directly.
      `whatsapp://send?phone=${phone}&text=${text}`,
      // Handled by WhatsApp when installed, otherwise opens in the browser.
      `https://wa.me/${phone}?text=${text}`,
    ],
    'WhatsApp'
  );
}

/** Opens the native maps app, falling back to Google Maps on the web. */
export function openMaps(query: string) {
  const encoded = encodeURIComponent(query);
  const native = Platform.select({
    ios: `maps://?q=${encoded}`,
    android: `geo:0,0?q=${encoded}`,
  });

  return openFirst(
    [
      ...(native ? [native] : []),
      `https://www.google.com/maps/search/?api=1&query=${encoded}`,
    ],
    'Maps'
  );
}
