import { CurrencyCode } from '../types';

const CURRENCY_META: Record<
  CurrencyCode,
  { symbol: string; locale: string; decimals: number; position: 'before' | 'after' }
> = {
  USD: { symbol: '$', locale: 'en-US', decimals: 0, position: 'before' },
  IDR: { symbol: 'Rp', locale: 'id-ID', decimals: 0, position: 'before' },
  SGD: { symbol: 'S$', locale: 'en-SG', decimals: 0, position: 'before' },
  MYR: { symbol: 'RM', locale: 'ms-MY', decimals: 0, position: 'before' },
  CNY: { symbol: '¥', locale: 'zh-CN', decimals: 0, position: 'before' },
  KRW: { symbol: '₩', locale: 'ko-KR', decimals: 0, position: 'before' },
};

const ORDER: CurrencyCode[] = ['IDR', 'SGD', 'MYR', 'CNY', 'KRW', 'USD'];

function formatAmount(code: CurrencyCode, amount: number): string {
  const meta = CURRENCY_META[code];
  const rounded =
    code === 'IDR' || code === 'KRW'
      ? Math.round(amount / 1000) * 1000
      : Math.round(amount);
  const formatted = new Intl.NumberFormat(meta.locale, {
    maximumFractionDigits: meta.decimals,
    minimumFractionDigits: meta.decimals,
  }).format(rounded);
  return meta.position === 'before' ? `${meta.symbol}${formatted}` : `${formatted} ${meta.symbol}`;
}

interface CurrencyPricingProps {
  pricing: Record<CurrencyCode, number>;
  compact?: boolean;
}

export default function CurrencyPricing({ pricing, compact = false }: CurrencyPricingProps) {
  return (
    <div
      className={`border border-[#0B0D10]/10 bg-white/60 ${
        compact ? 'divide-y divide-[#0B0D10]/8' : 'grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#0B0D10]/10'
      }`}
    >
      {ORDER.map((code) => (
        <div
          key={code}
          className={
            compact
              ? 'flex items-center justify-between px-4 py-2.5 bg-[#F5F1EA]/95'
              : 'flex flex-col items-center justify-center gap-0.5 bg-[#F5F1EA]/95 py-3 px-2 min-h-[3.25rem]'
          }
        >
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#0B0D10]/50 uppercase">
            {code}
          </span>
          <span
            className={`font-headline text-[#7A3A2E] ${
              compact ? 'text-sm' : 'text-base sm:text-lg'
            } font-light tabular-nums`}
          >
            {formatAmount(code, pricing[code])}
          </span>
        </div>
      ))}
    </div>
  );
}
