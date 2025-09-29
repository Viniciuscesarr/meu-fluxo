export type SupportedCurrency = 'BRL' | 'USD' | 'EUR';

export function getCurrency(): SupportedCurrency {
  const c = localStorage.getItem('pref_currency');
  if (c === 'USD' || c === 'EUR' || c === 'BRL') return c;
  return 'BRL';
}

export function getDateLocale(): string {
  const d = localStorage.getItem('pref_datefmt');
  return d || 'pt-BR';
}

export function formatMoney(value: number): string {
  const currency = getCurrency();
  const locale = currency === 'BRL' ? 'pt-BR' : (currency === 'USD' ? 'en-US' : 'de-DE');
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}

export function formatDate(isoString: string): string {
  const locale = getDateLocale();
  const d = new Date(isoString);
  return d.toLocaleDateString(locale);
}


