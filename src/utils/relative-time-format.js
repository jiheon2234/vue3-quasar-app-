export function formatRelativeTime(targetTime = new Date('2024-04-10')) {
  const rtf = new Intl.RelativeTimeFormat('ko', {
    numeric: 'auto',
  });

  const currentTime = new Date();
  const timeDiff = -Math.floor((targetTime - currentTime) / 1000);
  const minitues = Math.floor(timeDiff / 60);
  const hours = Math.floor(minitues / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (years) {
    return rtf.format(-1 * years, 'year');
  } else if (days) {
    return rtf.format(-1 * days, 'day');
  } else if (hours) {
    return rtf.format(-1 * hours, 'hour');
  } else if (minitues) {
    return rtf.format(-1 * minitues, 'minute');
  } else {
    return rtf.format(-1 * timeDiff, 'second');
  }
}
