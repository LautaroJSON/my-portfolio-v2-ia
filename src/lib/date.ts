type Locale = 'en' | 'es';

interface IDurationLabels {
  year: string;
  years: string;
  month: string;
  months: string;
}

const DURATION_LABELS: Record<Locale, IDurationLabels> = {
  en: { year: 'yr', years: 'yrs', month: 'mo', months: 'mos' },
  es: { year: 'año', years: 'años', month: 'mes', months: 'meses' },
};

const MONTHS_IN_YEAR = 12;

const getMonthsBetween = (startDate: Date, endDate: Date): number => {
  const totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * MONTHS_IN_YEAR +
    (endDate.getMonth() - startDate.getMonth()) -
    (endDate.getDate() < startDate.getDate() ? 1 : 0);

  return Math.max(totalMonths, 0);
};

export const formatDuration = (
  startDate: string,
  endDate: string | null,
  locale: string
): string => {
  const labels = DURATION_LABELS[locale as Locale] ?? DURATION_LABELS.en;
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const totalMonths = getMonthsBetween(start, end);
  const years = Math.floor(totalMonths / MONTHS_IN_YEAR);
  const months = totalMonths % MONTHS_IN_YEAR;

  const yearsLabel = years === 1 ? labels.year : labels.years;
  const monthsLabel = months === 1 ? labels.month : labels.months;

  if (years > 0 && months > 0) {
    return `${years} ${yearsLabel} ${months} ${monthsLabel}`;
  }

  if (years > 0) {
    return `${years} ${yearsLabel}`;
  }

  return `${months} ${monthsLabel}`;
};

export const formatMonthYear = (dateIso: string, locale: string): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
  }).format(new Date(dateIso));
};
