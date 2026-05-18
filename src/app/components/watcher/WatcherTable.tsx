import React, { useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { RowAction } from './RowAction';
import type {
  BadgeTone,
  BadgeValue,
  DeltaValue,
  TableColumn,
  TableRow,
  WatcherTableData,
} from './types';

// ── Tone palettes ──────────────────────────────────────────────────────────

const FILLED_TONES: Record<BadgeTone, string> = {
  green: 'bg-[#ebf7f0] text-[#1d8242]',
  amber: 'bg-[#fef6e1] text-[#a16207]',
  red: 'bg-[#fef2f0] text-[#c0392b]',
  gray: 'bg-gray-100 text-gray-500',
  blue: 'bg-[#e3edff] text-[#1b3da8]',
  purple: 'bg-[#ece5fa] text-[#5a3bbf]',
};

const DOT_TONES: Record<BadgeTone, string> = {
  green: 'bg-[#23a455]',
  amber: 'bg-amber-400',
  red: 'bg-red-500',
  gray: 'bg-gray-400',
  blue: 'bg-[#1b3da8]',
  purple: 'bg-[#5a3bbf]',
};

// ── Cell renderers ─────────────────────────────────────────────────────────

function renderText(row: TableRow, col: TableColumn) {
  const primary = row[col.key] as string | undefined;
  const secondary = col.secondaryKey
    ? (row[col.secondaryKey] as string | undefined)
    : undefined;
  return (
    <div className="flex items-baseline gap-2 min-w-0">
      <span className="text-sm text-gray-800 truncate">{primary ?? ''}</span>
      {secondary && (
        <span className="text-[11px] italic text-gray-400 truncate">
          {secondary}
        </span>
      )}
    </div>
  );
}

function renderBadge(row: TableRow, col: TableColumn) {
  const raw = row[col.key];
  if (!raw) return null;
  const badge: BadgeValue =
    typeof raw === 'string'
      ? { label: raw, tone: 'gray', style: 'filled' }
      : (raw as BadgeValue);
  const tone = badge.tone ?? 'gray';
  const style = badge.style ?? 'filled';
  if (style === 'leading-dot') {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-gray-700">
        <span className={`w-2 h-2 rounded-full ${DOT_TONES[tone]}`} />
        {badge.label}
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${FILLED_TONES[tone]}`}
    >
      {badge.label}
    </span>
  );
}

function renderSparkline(row: TableRow, col: TableColumn) {
  const data = (row[col.key] as number[]) ?? [];
  const width = col.sparklineWidth ?? 70;
  const series = data.map((value, i) => ({ i, value }));
  return (
    <div className="inline-block" style={{ width, height: 20 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={series} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <YAxis hide domain={['dataMin', 'dataMax']} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#9CA3AF"
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function renderDelta(row: TableRow, col: TableColumn) {
  const raw = row[col.key];
  if (!raw) return null;
  const delta = raw as DeltaValue;
  if (delta.kind === 'new') {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-[#fef6e1] text-[#a16207]">
        NEW
      </span>
    );
  }
  if (delta.kind === 'steady') {
    return (
      <span className="inline-flex items-center text-[11px] text-gray-400">
        steady
      </span>
    );
  }
  if (delta.kind === 'up') {
    return (
      <span className="inline-flex items-center gap-0.5 text-[11px] text-[#a16207]">
        <span aria-hidden>▲</span>
        {delta.value}%
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-0.5 text-[11px] text-[#1d8242]">
      <span aria-hidden>▼</span>
      {delta.value}%
    </span>
  );
}

function renderProgressBar(row: TableRow, col: TableColumn) {
  const pct = Math.min(100, Math.max(0, Number(row[col.key] ?? 0)));
  return (
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-gray-400 rounded-full"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function renderAction(row: TableRow, col: TableColumn) {
  // Row data provides a fully-rendered ReactNode under the column key —
  // this gives watchers full control over the action element (button,
  // dropdown trigger, double-button cluster). The shell wraps it.
  return (row[col.key] as React.ReactNode) ?? null;
}

function renderCell(row: TableRow, col: TableColumn): React.ReactNode {
  switch (col.type) {
    case 'text':
      return renderText(row, col);
    case 'badge':
      return renderBadge(row, col);
    case 'sparkline':
      return renderSparkline(row, col);
    case 'delta':
      return renderDelta(row, col);
    case 'progress-bar':
      return renderProgressBar(row, col);
    case 'action':
      return renderAction(row, col);
    case 'quote':
      // Quote is rendered separately as a secondary line below the row.
      return null;
    default:
      return null;
  }
}

// ── Group helper ───────────────────────────────────────────────────────────

interface RowGroup {
  key: string;
  value: unknown;
  rows: TableRow[];
}

function groupRows(
  rows: TableRow[],
  groupBy: string | undefined
): RowGroup[] {
  if (!groupBy) return [{ key: '__all__', value: null, rows }];
  const map = new Map<string, RowGroup>();
  for (const row of rows) {
    const value = row[groupBy];
    const key = String(value ?? '__none__');
    let group = map.get(key);
    if (!group) {
      group = { key, value, rows: [] };
      map.set(key, group);
    }
    group.rows.push(row);
  }
  return Array.from(map.values());
}

// ── The table ─────────────────────────────────────────────────────────────

interface WatcherTableProps {
  data: WatcherTableData;
}

export function WatcherTable({ data }: WatcherTableProps) {
  const { rows, columns, groupBy, groupLabel, showHeaders } = data;

  // Quote column is rendered below the row, not as a cell.
  const gridColumns = useMemo(
    () => columns.filter((c) => c.type !== 'quote'),
    [columns]
  );
  const quoteColumn = useMemo(
    () => columns.find((c) => c.type === 'quote'),
    [columns]
  );
  const gridTemplate = gridColumns.map((c) => c.width ?? '1fr').join(' ');

  const groups = useMemo(() => groupRows(rows, groupBy), [rows, groupBy]);
  const labelFor = (value: unknown, count: number) =>
    groupLabel ? groupLabel(value, count) : `${String(value)} (${count})`;

  return (
    <div>
      {showHeaders && (
        <div
          className="grid items-center gap-3 pb-2"
          style={{ gridTemplateColumns: gridTemplate }}
        >
          {gridColumns.map((col) => (
            <div
              key={col.key}
              className={`text-[10px] uppercase tracking-wider text-gray-400 font-medium ${
                col.align === 'right' ? 'text-right' : 'text-left'
              }`}
            >
              {col.label ?? ''}
            </div>
          ))}
        </div>
      )}
      {groups.map((group) => (
        <div key={group.key}>
          {groupBy && (
            <div className="text-[10px] uppercase tracking-wider text-gray-400 font-medium py-2 first:pt-0">
              {labelFor(group.value, group.rows.length)}
            </div>
          )}
          <ul>
            {group.rows.map((row) => {
              const quoteText = quoteColumn
                ? (row[quoteColumn.key] as string | undefined)
                : undefined;
              const hasQuote = !!quoteText;
              return (
                <li
                  key={row.id}
                  className={`py-3 border-b border-gray-100 last:border-b-0 ${
                    hasQuote ? 'min-h-[72px]' : 'min-h-[56px]'
                  } ${row.state === 'auto-resolved' ? 'opacity-50' : ''}`}
                >
                  <div
                    className="grid items-center gap-3"
                    style={{ gridTemplateColumns: gridTemplate }}
                  >
                    {gridColumns.map((col) => {
                      const content = renderCell(row, col);
                      return (
                        <div key={col.key} className="min-w-0">
                          {col.align === 'right' ? (
                            <RowAction>{content}</RowAction>
                          ) : (
                            content
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {hasQuote && (
                    <div
                      className="mt-2"
                      style={{ paddingLeft: quoteColumn?.indent ?? '0' }}
                    >
                      <p className="border-l-2 border-gray-200 pl-3 text-sm italic text-gray-500 leading-snug">
                        &ldquo;{quoteText}&rdquo;
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
