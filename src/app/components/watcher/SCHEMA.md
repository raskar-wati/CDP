# Watcher schema reference

This document describes the **current** state of the watcher component system
— what data shape a watcher has, which block types are available, which
action affordances exist, what each of the four shipping watchers actually
composes, and what's typed but not yet built.

If something in the codebase contradicts this document, the codebase wins —
this file is a snapshot.

---

## 1. The watcher data shape

A watcher is a plain JavaScript object. Everything visible on a watcher card
— the header, the body blocks, the footer actions — is described by this
object. The `WatcherCard` component does the rendering; it has no domain
knowledge of what a "Ready-to-buy" or "Spam" watcher is.

```ts
interface Watcher {
  // Unique slug for the watcher. Used to resolve the watcher in the
  // Workforce list, to drive the detail-page route, and as a key for
  // dismiss / snooze state.
  id: string;

  // Display name shown at the top of the card. By convention ends in
  // " watcher" — e.g. "Ready-to-buy watcher", "Spam watcher".
  name: string;

  // Drives the dot colour and label in the header chip ("fresh", "aging",
  // etc.) and signals to the operator how trustworthy the content is.
  freshness: 'fresh' | 'aging' | 'stale' | 'auto-resolved' | 'snoozed';

  // Pre-formatted relative timestamp. The verb is part of the string and
  // follows a convention:
  //   • "Updated …"   — live monitoring watchers that refresh continuously
  //   • "Generated …" — scheduled digests that fire at a fixed cadence
  updatedAt: string;

  // Ordered list of body blocks. Rendered top-to-bottom inside the card
  // with consistent vertical rhythm (24px between blocks).
  blocks: Block[];

  // Footer affordances. Order in the array doesn't matter for rendering —
  // the footer groups them by variant ("Always do this" / "Snooze" /
  // primary button / × dismiss) on its own.
  actions: WatcherAction[];
}

interface WatcherAction {
  label: string;
  variant: 'primary' | 'secondary' | 'tertiary' | 'dismiss';
  onClick?: () => void;
}
```

A minimal complete watcher:

```ts
const exampleWatcher: Watcher = {
  id: 'example',
  name: 'Example watcher',
  freshness: 'fresh',
  updatedAt: 'Updated just now',
  blocks: [
    { type: 'narrative', text: 'Here is what I noticed today.' },
  ],
  actions: [
    { label: 'Open',    variant: 'primary' },
    { label: 'Dismiss', variant: 'dismiss' },
  ],
};
```

---

## 2. The block vocabulary

Every block has a discriminating `type` field (kebab-case string). The
`WatcherCard` reads this and dispatches to the right component. New block
types live in `types.ts` (extend the `Block` union) and get a `case` in
`WatcherCard.renderBlock`.

All blocks render flush — the card's body container owns the 16px
horizontal padding and the 24px inter-block gap. A block should never add
its own outer margin or horizontal padding.

### `narrative`

First-person agent paragraph. Looser line height than body copy so it reads
like a paragraph the agent just spoke. Always the first block in a watcher
by convention.

```ts
{ type: 'narrative'; text: string }
```

Used by: every watcher (Ready-to-buy, Top Topics, Demand Spike, Spam).

### `metric-callout`

One big number with a context line beneath. Has a subtle 2px Wati-green
left accent, 28px semibold value, smaller muted context. Reads as a defined
block, not a paragraph.

```ts
{
  type: 'metric-callout';
  value: string;     // e.g. "₹47,000", "89", "~36 hours"
  context: string;   // one-line explanation beneath
}
```

Used by: Ready-to-buy, Demand Spike, Spam.

### `entity-list`

Configurable column-based list. Each row is a horizontal grid of cells
defined by the `columns` array. Per-row dividers, consistent right-edge
positioning for action cells, optional auto-resolved row state (fades the
row + shows a small "Resolved" tag).

```ts
{
  type: 'entity-list';
  entities: EntityRow[];      // each row has an id + state + arbitrary fields
  columns: EntityListColumn[];
  sortBy?: string;            // not enforced at render time; caller orders the array
}

interface EntityListColumn {
  key: string;
  label?: string;             // currently hidden
  width?: string;             // CSS grid track size, e.g. '1fr', '120px'
  align?: 'left' | 'right';   // 'right' auto-wraps content in <RowAction>
  render?: (entity) => ReactNode;
}
```

Used by: Ready-to-buy (6 leads), Demand Spike (6 high-intent contacts).

### `ranked-items`

Ranked list with rank · topic · count · delta badge · inline sparkline ·
"Actions ▾" dropdown per row. Below each row, an italic customer quote
aligned to the topic column.

```ts
{
  type: 'ranked-items';
  items: RankedItem[];
}

interface RankedItem {
  rank: number;
  topic: string;
  count: number;
  delta:
    | { type: 'up';     value: number }    // ▲ N% (soft amber)
    | { type: 'down';   value: number }    // ▼ N% (soft green)
    | { type: 'new'   }                    // NEW pill (amber)
    | { type: 'steady' };                  // muted "steady" text
  quote: string;
  sparklineData: number[];                 // oldest → newest
  sinceIndicator?: string;                 // stale-state only
  actions: RankedItemAction[];             // populates the dropdown
}
```

Used by: Top Topics (5 topics).

### `time-series`

Muted-grey sparkline. Two sizes:
- `'inline'` — ~70×20px, composed by other blocks (currently by
  RankedItemsBlock per row).
- `'hero'`   — full content-area width × ~100px, with an optional small
  uppercase label above the chart.

No axes, no gridlines, no tooltips.

```ts
{
  type: 'time-series';
  data: number[];
  label?: string;
  size?: 'inline' | 'hero';     // defaults to 'inline'
}
```

Used standalone by: Demand Spike (hero, 30-point hourly series).
Used inline by: every row of Top Topics's `ranked-items` block.

### `evidence-quote`

Customer's own words in italic muted text with a left rail. Reusable
standalone (block) or inline (composed by `ranked-items` rows).

```ts
{
  type: 'evidence-quote';
  text: string;
  source?: string;     // optional attribution, e.g. "Priya Sharma · 2 days ago"
}
```

Used standalone by: no watcher currently.
Composed by: every row of Top Topics's `ranked-items` block.

### `inline-action`

Small CTA — either a green text link or a small filled button — placed
between other blocks. Used to surface a one-tap follow-up in context
(e.g. "Refresh with current data →" when a digest is aging).

```ts
{
  type: 'inline-action';
  label: string;
  variant?: 'primary' | 'link';  // defaults to 'link'
  onClick?: () => void;
}
```

Used by: Top Topics, but only in its aging state.

### `grouped-summary`

Categorical breakdown. Each row is `[label] [proportional grey bar] [%]`.
Optional small `totalLabel` above. Same row rhythm as the other list
blocks.

```ts
{
  type: 'grouped-summary';
  items: GroupedSummaryItem[];
  totalLabel?: string;
}

interface GroupedSummaryItem {
  label: string;
  percentage: number;     // 0–100
  count?: number;         // shown after the percentage as "60% · 53"
}
```

Used by: Spam (3 categories: crypto, bot templates, suspicious links).

### `borderline-review`

Small list of items needing a yes/no decision per row. A prompt sits above
the list ("3 messages I wasn't sure about — your call:"); each row stacks
primary / secondary / evidence text on the left and two action buttons
("Spam" / "Not spam") on the right.

```ts
{
  type: 'borderline-review';
  prompt: string;
  items: BorderlineItem[];
  onSpam?:    (id: string) => void;
  onNotSpam?: (id: string) => void;
}

interface BorderlineItem {
  id: string;
  primary: string;        // the message snippet itself
  secondary?: string;     // e.g. "From +91-9876543210 · first message"
  evidence?: string;      // a muted italic explanation
}
```

Used by: Spam.

### `comparison`

X-vs-Y framing. Current state alongside a baseline, with an optional
prominent ratio in between. Same visual restraint as `metric-callout`.

```ts
{
  type: 'comparison';
  current:  { label: string; value: string };  // bolder, 24px
  baseline: { label: string; value: string };  // smaller, muted
  ratio?: string;                              // e.g. "4×", 28px muted-gray
}
```

Used by: Demand Spike.

---

## 3. The action vocabulary

The footer organises actions by variant. The order in the `actions` array
doesn't affect rendering — the footer groups them left-to-right as
`tertiary → secondary → primary → dismiss`, all right-aligned.

| Variant      | Renders as                                                           |
|--------------|----------------------------------------------------------------------|
| `tertiary`   | Smallest text link, muted grey. Used for "always do this" patterns.  |
| `secondary`  | Plain text link, slightly larger. Used for non-destructive defaults. |
| `primary`    | Solid Wati-green button. The expected next action.                   |
| `dismiss`    | × icon at the far right, no label visible. Closes the card.          |

### Per-row actions inside list blocks

A separate concept from footer actions. Lives inside the row of an
`entity-list` or `ranked-items` block. Always wrapped in the shared
`<RowAction>` shell so right-edge alignment is consistent.

- `entity-list` — content is whatever the column's `render` function returns;
  the column declares `align: 'right'` to get the shell. Currently used in
  Ready-to-buy as a green "Send reply" text link.
- `ranked-items` — wraps a `DropdownMenu` whose items come from the row's
  `actions` array. Used in Top Topics with five per-row actions.

### Full inventory of action labels currently in the system

Footer actions:

| Watcher       | Variant     | Label                                            |
|---------------|-------------|--------------------------------------------------|
| Ready-to-buy  | tertiary    | Always do this                                   |
| Ready-to-buy  | secondary   | Snooze 30 min                                    |
| Ready-to-buy  | primary     | Send all 6 drafted replies                       |
| Ready-to-buy  | dismiss     | (×)                                              |
| Top Topics    | tertiary    | Snooze until next Monday                         |
| Top Topics    | secondary   | Refresh with current data                        |
| Top Topics    | primary     | Open full digest                                 |
| Top Topics    | dismiss     | (×)                                              |
| Demand Spike  | tertiary    | Always draft a stock update on future 4× spikes  |
| Demand Spike  | secondary   | Send only to 3 high-intent                       |
| Demand Spike  | primary     | Send stock-status broadcast to 31 contacts       |
| Demand Spike  | dismiss     | (×)                                              |
| Spam          | tertiary    | Always do this for similar patterns              |
| Spam          | secondary   | Review filtered messages                         |
| Spam          | primary     | Block all crypto promos                          |
| Spam          | dismiss     | (×)                                              |

Per-row actions:

| Block source           | Label                                      |
|------------------------|--------------------------------------------|
| Ready-to-buy row       | Send reply                                 |
| Top Topics row (×5 per row) | Add an FAQ entry                      |
|                        | Watch this topic for spikes                |
|                        | Draft a broadcast about this topic         |
|                        | Update Agent knowledge                     |
|                        | Dismiss · not actionable for me            |
| Spam borderline row    | Spam · Not spam                            |

Snippet-variant footer (every watcher reuses these):

| Variant   | Label          |
|-----------|----------------|
| primary   | View details   |
| dismiss   | (×)            |

---

## 4. Watcher compositions

The four watchers currently shipping. Order in the Workforce tab is
**Ready-to-buy → Top Topics → Demand Spike → Spam** (Set insertion order).

```
Ready-to-buy watcher
  Header: "Ready-to-buy watcher" · fresh · Updated 12 minutes ago
  Body:
    1. NarrativeBlock      — "6 hot leads are waiting past the 2-hour threshold…"
    2. MetricCalloutBlock  — ₹47,000 · "Pipeline at risk · 6 active hot leads"
    3. EntityListBlock     — 6 leads, columns: name (+ optional indicator),
                             stage, waiting (red/amber dot badge),
                             asking about, action ("Send reply", right-aligned)
  Footer:
    - Tertiary:  Always do this
    - Secondary: Snooze 30 min
    - Primary:   Send all 6 drafted replies
    - Dismiss:   ×
```

```
Top topics watcher
  Header: "Top topics watcher" · fresh · Generated Monday 9:00 AM
                                  (aging) Generated Monday 9am · 2 days ago
  Body (fresh):
    1. NarrativeBlock      — "Last week your customers asked about 7 main things…"
    2. RankedItemsBlock    — 5 topics, each with delta badge, inline sparkline,
                             italic customer quote, and an "Actions ▾" dropdown
  Body (aging adds one block between 1 and 2):
    1. NarrativeBlock      — gap-acknowledging variant
    1a. InlineActionBlock  — "Refresh with current data →"
    2. RankedItemsBlock    — same 5 topics; rows 2 and 3 carry a "since
                             publication" indicator beneath the delta badge
  Footer (both states):
    - Tertiary:  Snooze until next Monday
    - Secondary: Refresh with current data
    - Primary:   Open full digest
    - Dismiss:   ×
```

```
Demand spike watcher
  Header: "Demand spike watcher" · fresh · Updated 2 hours ago
  Body:
    1. NarrativeBlock      — "Spike detected — 'Vitamin C Serum 30ml' is being
                              mentioned 4× your normal rate…"
    2. ComparisonBlock     — Last 24h: 31 mentions · 4× · Typical day: ~7 mentions
    3. TimeSeriesBlock     — size='hero', label "Mentions per hour · last 30h",
                             30-point series with the spike in the last ~10 hours
    4. MetricCalloutBlock  — ~36 hours · "Estimated time to sellout at current rate"
    5. EntityListBlock     — 6 contacts pre-sorted High → Mid → Low,
                             columns: name, intent badge (green/amber/grey),
                             asking about
  Footer:
    - Tertiary:  Always draft a stock update on future 4× spikes
    - Secondary: Send only to 3 high-intent
    - Primary:   Send stock-status broadcast to 31 contacts
    - Dismiss:   ×
```

```
Spam watcher
  Header: "Spam watcher" · fresh · Updated 4 hours ago
  Body:
    1. NarrativeBlock         — "This week I scanned 1,247 messages across 312
                                 conversations. I tagged 89 as spam…"
    2. MetricCalloutBlock     — 89 · "spam conversations filtered this week · 312
                                 total scanned"
    3. GroupedSummaryBlock    — 3 categories with proportional bars:
                                 • Crypto and trading promotions — 60% · 53
                                 • Bot templates — 25% · 22
                                 • Suspicious links — 15% · 14
    4. BorderlineReviewBlock  — prompt "3 messages I wasn't sure about — your call:"
                                 + 3 items, each with "Spam" / "Not spam" buttons
  Footer:
    - Tertiary:  Always do this for similar patterns
    - Secondary: Review filtered messages
    - Primary:   Block all crypto promos
    - Dismiss:   ×
```

---

## 5. Freshness states

All five values of `FreshnessState` are typed. The `FreshnessBadge` component
in `WatcherCard.tsx` knows how to render each, but only `fresh` and `aging`
are actually used by a shipping watcher today.

| State           | Dot colour        | Label text      | Paired timestamp verb |
|-----------------|-------------------|-----------------|-----------------------|
| `fresh`         | Wati green #23a455| "fresh"         | "Updated …" (live) or "Generated …" (digest) |
| `aging`         | Amber #f59e0b     | "aging"         | "Generated …" with a "X days ago" suffix     |
| `stale`         | Gray-400          | "stale"         | (no watcher uses this yet)                   |
| `auto-resolved` | Gray-300          | "auto-resolved" | (no watcher uses this yet)                   |
| `snoozed`       | Gray-300          | "snoozed"       | (no watcher uses this yet)                   |

Verb convention is documented in a comment inside `WatcherCard`'s header
rendering:
- "Updated …" for live monitoring watchers (Ready-to-buy, Demand Spike, Spam)
- "Generated …" for scheduled digest watchers (Top Topics)

---

## 6. How to add a new watcher

Adding a fifth watcher that uses only existing block types is a three-file
change:

1. **Create a factory** — `src/app/components/watcher/myWatcher.tsx`.
   Exports `buildMyWatcher(opts?)` that returns a `Watcher` object. Accept
   a `variant: 'full' | 'snippet' | 'preview'` opt so the same factory can
   drive the inbox snippet, the Workforce preview list, and the detail
   page. Wire any per-row or per-action callbacks through `opts`.

2. **Resolve the id** — `src/app/components/PulsePage.tsx`. Add a case in
   the `buildWatcher` resolver inside `WorkforceTab` that calls your
   factory when `id === 'my-watcher'`.

3. **Enable it by default** — same file. Add `'my-watcher'` to the
   `enabledWatcherIds` `Set` in the position you want it to appear in the
   Workforce list (Sets iterate in insertion order).

If the watcher needs a new block type, four more files come into play:

4. **Extend the type system** — add the new block-data interface to
   `types.ts`, then add it to the `Block` discriminated union at the
   bottom of the file.

5. **Create the block component** —
   `src/app/components/watcher/MyBlock.tsx`. Render flush (no horizontal
   padding, no outer margin). If it's a list block, follow the row rhythm
   rules: `py-3`, `min-h-[56px]` for single-line rows or `[72px]` for
   two-line, `border-b border-gray-100 last:border-b-0`, and wrap any
   per-row action in `<RowAction>`.

6. **Wire the renderer** — add a `case 'my-block':` to
   `WatcherCard.renderBlock` that constructs the component from the
   block data.

7. **Optional: per-row state** — if the block visualises auto-resolved /
   went-cold / new-since-alert rows, follow the precedent in
   `EntityListBlock` (`opacity-50` + a small uppercase "Resolved" tag).

No changes to `WatcherCard`'s header, footer, body container, gap rule,
left-edge alignment, or freshness logic should be required for a new
watcher. If they are, that's a signal the abstraction needs work before
the watcher ships.

---

## 7. Known gaps

### Typed but not yet rendered by any watcher

- **Freshness states** — `stale`, `auto-resolved`, `snoozed` have dot
  colours wired into `FreshnessBadge` but no current watcher emits these
  values. The card will render them correctly today; we just haven't
  produced narrative copy or footer behaviour for them yet.
- **Entity row states** — `'went-cold'` and `'new-since-alert'` are typed
  on `EntityRow.state` but `EntityListBlock` only visualises
  `'auto-resolved'`. The other two will render as default rows today.
- **`EntityListBlockData.sortBy`** — accepted by the type but ignored at
  render time. Callers are expected to pre-sort the `entities` array.

### Referenced in design plans but not yet typed or built

- **`DraftMessagePreview`** block — referenced as future watcher
  infrastructure. Not in `types.ts`, no component file.
- **`MarkdownFallback`** block — same status. Reserved as the catch-all
  for unstructured agent output.

### Watcher-level gaps

- The `template` concept (Workforce → Templates section, see
  `templates.tsx`) is empty. All four starter watchers are first-class,
  and the registry is currently `[]`. The `placeholderWatcher` helper is
  retained for future watcher *concepts* that don't yet have a real
  implementation.

### Friction known but not addressed

- `WatcherCard.renderBlock` is a switch statement that every new block
  type touches. Functional, but it means the renderer isn't truly closed
  for modification. A future move would be a `blockRegistry` keyed by
  `Block['type']` with each block component registering itself.
- `MetricCalloutBlock` and `ComparisonBlock` both display prominent
  numbers in the same family. A shared `<MetricValue>` primitive could
  collapse the duplication once a third number-display variant appears.
