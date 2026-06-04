import React, { useState } from 'react';
import { Search, Upload, Download, Trash2, Edit2, Play, Plus, X, ChevronDown, Sparkles } from 'lucide-react';
import { Contact360Page } from './Contact360Page';

/** Source flags for an attribute. Independent — an attribute can be a
 *  signal (auto-extracted) AND a Shopify-synced field at the same time
 *  (e.g. cart_status that's both pulled from Shopify and surfaced as a
 *  derived signal). Manual = neither flag set. */
interface AttributeSources {
  isSignal?: boolean;
  isShopify?: boolean;
}

interface AttributePillData extends AttributeSources {
  label: string;
  dismissible: boolean;
}

interface FullAttribute extends AttributeSources {
  key: string;
  value: string;
}

interface Contact {
  id: string;
  profileKey: string;
  name: string;
  flag: string;
  phone: string;
  source: string | null;
  pills: AttributePillData[];
  attributes: FullAttribute[];
}

const MOCK_CONTACTS: Contact[] = [
  {
    id: 'amira',
    profileKey: 'amira',
    name: 'Amira Putri',
    flag: '🇮🇩',
    phone: '(+62)81234567890',
    source: 'WhatsApp',
    pills: [
      { label: 'price-sensitive', dismissible: true, isSignal: true },
      { label: 'interested-in:vitamin-c…', dismissible: true, isSignal: true },
    ],
    attributes: [
      { key: 'name', value: 'Amira Putri' },
      { key: 'email', value: 'amira@email.com' },
      { key: 'phone', value: '(+62)81234567890' },
      { key: 'lead_stage', value: 'New Lead', isSignal: true },
      { key: 'utm_campaign', value: 'vitamin_c_june' },
      { key: 'skin_type', value: 'sensitive', isSignal: true },
      { key: 'price_sensitive', value: 'true', isSignal: true },
      // Both signal + Shopify: top interest is auto-extracted from
      // conversation AND reinforced by Shopify browsed/cart data.
      { key: 'top_interest', value: 'Vitamin C Serum', isSignal: true, isShopify: true },
      { key: 'sentiment', value: 'Recovering', isSignal: true },
      { key: 'journey_stage', value: 'Evaluating', isSignal: true },
      { key: 'last_cart_total', value: 'Rp 285,000', isShopify: true },
      { key: 'order_count', value: '0', isShopify: true },
      { key: 'lifetime_value', value: 'Rp 0', isShopify: true },
      { key: 'browsed_products', value: 'Vitamin C Serum, SPF 50, Toner', isShopify: true },
      // Another both: cart_status is a Shopify field and also a derived signal.
      { key: 'cart_status', value: 'Abandoned', isSignal: true, isShopify: true },
      { key: 'allowsms', value: 'TRUE' },
      { key: 'contact_owner', value: 'John Melvis' },
      { key: 'createddate', value: 'Jun 1, 2026' },
    ],
  },
  {
    id: 'budi',
    profileKey: 'budi',
    name: 'Budi Santoso',
    flag: '🇮🇩',
    phone: '(+62)81987654321',
    source: 'WhatsApp',
    pills: [
      { label: 'repeat-buyer', dismissible: true, isSignal: true, isShopify: true },
      { label: 'loyal-customer', dismissible: true },
    ],
    attributes: [
      { key: 'name', value: 'Budi Santoso' },
      { key: 'phone', value: '(+62)81987654321' },
      { key: 'repeat_buyer', value: 'true', isSignal: true, isShopify: true },
      { key: 'loyal_customer', value: 'true' },
      { key: 'order_count', value: '3', isShopify: true },
      { key: 'lifetime_value', value: 'Rp 1,240,000', isShopify: true },
      { key: 'last_order_date', value: 'May 21, 2026', isShopify: true },
      { key: 'journey_stage', value: 'Converted', isSignal: true },
      { key: 'sentiment', value: 'Steady', isSignal: true },
      { key: 'contact_owner', value: 'Sarah Lee' },
    ],
  },
  {
    id: 'new',
    profileKey: 'new',
    name: 'Lia Wijaya',
    flag: '🇮🇩',
    phone: '(+62)81112223333',
    source: 'WhatsApp',
    pills: [],
    attributes: [
      { key: 'name', value: 'Lia Wijaya' },
      { key: 'phone', value: '(+62)81112223333' },
      { key: 'createddate', value: 'Today' },
    ],
  },
  {
    id: '1',
    profileKey: 'new',
    name: 'goku_real',
    flag: '🇨🇳',
    phone: '(+86)13714549359',
    source: 'WhatsApp',
    pills: [],
    attributes: [
      { key: 'name', value: 'goku_real' },
      { key: 'phone', value: '(+86)13714549359' },
    ],
  },
  {
    id: '2',
    profileKey: 'new',
    name: '8613929377188',
    flag: '🇨🇳',
    phone: '(+86)13929377188',
    source: null,
    pills: [
      { label: 'lead_stage: New Lead', dismissible: false, isSignal: true },
      { label: 'contact_owner:', dismissible: false },
    ],
    attributes: [
      { key: 'name', value: '8613929377188' },
      { key: 'phone', value: '(+86)13929377188' },
      { key: 'lead_stage', value: 'New Lead', isSignal: true },
      { key: 'contact_owner', value: '' },
    ],
  },
  {
    id: '3',
    profileKey: 'new',
    name: 'BSUID_TEST_MG05_A',
    flag: '🇨🇳',
    phone: '(+86)16278588201',
    source: 'WhatsApp',
    pills: [
      { label: 'whatsapp_19703157…', dismissible: true },
      { label: 'lead_stage: New Lead', dismissible: false, isSignal: true },
    ],
    attributes: [
      { key: 'name', value: 'BSUID_TEST_MG05_A' },
      { key: 'phone', value: '(+86)16278588201' },
      { key: 'whatsapp_id', value: '19703157842' },
      { key: 'lead_stage', value: 'New Lead', isSignal: true },
    ],
  },
  {
    id: '4',
    profileKey: 'new',
    name: 'DerenBsuidOnly',
    flag: '🇨🇳',
    phone: '(+86)15207155069',
    source: 'CTWA',
    pills: [
      { label: 'allowsms: TRUE', dismissible: true },
      { label: 'createddate: Aug-2…', dismissible: true },
    ],
    attributes: [
      { key: 'name', value: 'DerenBsuidOnly' },
      { key: 'phone', value: '(+86)15207155069' },
      { key: 'allowsms', value: 'TRUE' },
      { key: 'createddate', value: 'Aug-23, 2025' },
    ],
  },
  {
    id: '5',
    profileKey: 'new',
    name: 'Raven',
    flag: '🇻🇳',
    phone: '(+84)981787690',
    source: 'CTWA',
    pills: [
      { label: 'allowsms: FALSE', dismissible: true },
      { label: 'createddate: May-0…', dismissible: true },
    ],
    attributes: [
      { key: 'name', value: 'Raven' },
      { key: 'phone', value: '(+84)981787690' },
      { key: 'allowsms', value: 'FALSE' },
      { key: 'createddate', value: 'May-04, 2026' },
    ],
  },
  {
    id: '6',
    profileKey: 'new',
    name: 'Priya Sharma',
    flag: '🇮🇳',
    phone: '(+91)9876543210',
    source: 'WhatsApp',
    pills: [
      { label: 'ready-to-buy', dismissible: true, isSignal: true },
      { label: 'high-intent', dismissible: true, isSignal: true },
    ],
    attributes: [
      { key: 'name', value: 'Priya Sharma' },
      { key: 'email', value: 'priya.sharma@email.com' },
      { key: 'phone', value: '(+91)9876543210' },
      { key: 'lead_stage', value: 'Hot Lead', isSignal: true },
      { key: 'purchase_intent', value: '94', isSignal: true },
      { key: 'top_interest', value: 'Vitamin C Serum 50ml', isSignal: true, isShopify: true },
      { key: 'last_cart_total', value: '₹2,450', isShopify: true },
      { key: 'order_count', value: '0', isShopify: true },
      { key: 'browsed_products', value: 'Vitamin C Serum, Niacinamide', isShopify: true },
      { key: 'cart_status', value: 'Active', isSignal: true, isShopify: true },
      { key: 'contact_owner', value: 'Anil Kumar' },
      { key: 'utm_source', value: 'instagram_ads' },
    ],
  },
  {
    id: '7',
    profileKey: 'new',
    name: 'Omar Farooq',
    flag: '🇦🇪',
    phone: '(+971)501234567',
    source: 'WhatsApp',
    pills: [
      { label: 'drop-off-risk', dismissible: true, isSignal: true },
      { label: 'ghosting: 5 days', dismissible: true, isSignal: true },
    ],
    attributes: [
      { key: 'name', value: 'Omar Farooq' },
      { key: 'email', value: 'omar.f@email.ae' },
      { key: 'phone', value: '(+971)501234567' },
      { key: 'lead_stage', value: 'Cooling', isSignal: true },
      { key: 'last_active', value: '5 days ago', isSignal: true },
      { key: 'sentiment', value: 'Declining', isSignal: true },
      { key: 'top_interest', value: 'Bundle Pack', isSignal: true, isShopify: true },
      { key: 'last_cart_total', value: 'AED 320', isShopify: true },
      { key: 'cart_status', value: 'Abandoned', isSignal: true, isShopify: true },
      { key: 'order_count', value: '1', isShopify: true },
      { key: 'lifetime_value', value: 'AED 180', isShopify: true },
      { key: 'createddate', value: 'Apr 12, 2026' },
    ],
  },
  {
    id: '8',
    profileKey: 'new',
    name: 'Lena Fischer',
    flag: '🇩🇪',
    phone: '(+49)15123456789',
    source: 'CTWA',
    pills: [
      { label: 'converted', dismissible: true, isSignal: true, isShopify: true },
      { label: 'newsletter-subscriber', dismissible: true },
    ],
    attributes: [
      { key: 'name', value: 'Lena Fischer' },
      { key: 'email', value: 'lena.f@email.de' },
      { key: 'phone', value: '(+49)15123456789' },
      { key: 'journey_stage', value: 'Converted', isSignal: true },
      { key: 'order_count', value: '1', isShopify: true },
      { key: 'lifetime_value', value: '€89', isShopify: true },
      { key: 'last_order_date', value: 'Today', isShopify: true },
      { key: 'last_order_total', value: '€89', isShopify: true },
      { key: 'newsletter_subscriber', value: 'true' },
      { key: 'utm_campaign', value: 'germany_launch' },
      { key: 'contact_owner', value: 'Hannah Weber' },
    ],
  },
  {
    id: '9',
    profileKey: 'new',
    name: 'Carlos Mendoza',
    flag: '🇲🇽',
    phone: '(+52)5512345678',
    source: 'WhatsApp',
    pills: [
      { label: 'price-sensitive', dismissible: true, isSignal: true },
      { label: 'negotiating', dismissible: true, isSignal: true },
    ],
    attributes: [
      { key: 'name', value: 'Carlos Mendoza' },
      { key: 'phone', value: '(+52)5512345678' },
      { key: 'journey_stage', value: 'Negotiating', isSignal: true },
      { key: 'price_sensitivity', value: 'High', isSignal: true },
      { key: 'top_interest', value: 'Hydrating Toner', isSignal: true },
      { key: 'sentiment', value: 'Recovering', isSignal: true },
      { key: 'lead_stage', value: 'Warm Lead', isSignal: true },
      { key: 'contact_owner', value: 'Maria Lopez' },
      { key: 'createddate', value: 'Mar 28, 2026' },
    ],
  },
  {
    id: '10',
    profileKey: 'new',
    name: 'Sneha Reddy',
    flag: '🇮🇳',
    phone: '(+91)9123456789',
    source: 'WhatsApp',
    pills: [
      { label: 'repeat-buyer', dismissible: true, isSignal: true, isShopify: true },
      { label: 'vip', dismissible: true },
    ],
    attributes: [
      { key: 'name', value: 'Sneha Reddy' },
      { key: 'email', value: 'sneha.r@email.in' },
      { key: 'phone', value: '(+91)9123456789' },
      { key: 'repeat_buyer', value: 'true', isSignal: true, isShopify: true },
      { key: 'vip', value: 'true' },
      { key: 'order_count', value: '7', isShopify: true },
      { key: 'lifetime_value', value: '₹18,420', isShopify: true },
      { key: 'last_order_date', value: 'Jun 8, 2026', isShopify: true },
      { key: 'avg_order_value', value: '₹2,631', isShopify: true },
      { key: 'preferred_category', value: 'Skincare', isSignal: true, isShopify: true },
      { key: 'sentiment', value: 'Positive', isSignal: true },
      { key: 'contact_owner', value: 'Anil Kumar' },
    ],
  },
  {
    id: '11',
    profileKey: 'new',
    name: 'Diego Alvarez',
    flag: '🇪🇸',
    phone: '(+34)612345678',
    source: 'CTWA',
    pills: [
      { label: 'new-inquiry', dismissible: true, isSignal: true },
    ],
    attributes: [
      { key: 'name', value: 'Diego Alvarez' },
      { key: 'phone', value: '(+34)612345678' },
      { key: 'lead_stage', value: 'New', isSignal: true },
      { key: 'utm_campaign', value: 'spain_summer_2026' },
      { key: 'createddate', value: 'Today' },
    ],
  },
  {
    id: '12',
    profileKey: 'new',
    name: 'Thandiwe Nkosi',
    flag: '🇿🇦',
    phone: '(+27)821234567',
    source: 'WhatsApp',
    pills: [
      { label: 'evaluating', dismissible: true, isSignal: true },
      { label: 'product-questions: 4', dismissible: true, isSignal: true },
    ],
    attributes: [
      { key: 'name', value: 'Thandiwe Nkosi' },
      { key: 'email', value: 'thandi@email.co.za' },
      { key: 'phone', value: '(+27)821234567' },
      { key: 'journey_stage', value: 'Evaluating', isSignal: true },
      { key: 'questions_asked', value: '4', isSignal: true },
      { key: 'top_interest', value: 'SPF 50 Moisturizer', isSignal: true, isShopify: true },
      { key: 'browsed_products', value: 'SPF 50, Cleanser, Toner', isShopify: true },
      { key: 'lead_stage', value: 'Engaged', isSignal: true },
      { key: 'order_count', value: '0', isShopify: true },
      { key: 'utm_source', value: 'facebook_ads' },
    ],
  },
  {
    id: '13',
    profileKey: 'new',
    name: 'Yuki Tanaka',
    flag: '🇯🇵',
    phone: '(+81)9012345678',
    source: 'WhatsApp',
    pills: [
      { label: 'likely-spam', dismissible: true, isSignal: true },
    ],
    attributes: [
      { key: 'name', value: 'Yuki Tanaka' },
      { key: 'phone', value: '(+81)9012345678' },
      { key: 'spam_score', value: '7.2', isSignal: true },
      { key: 'createddate', value: 'May 30, 2026' },
    ],
  },
  {
    id: '14',
    profileKey: 'new',
    name: 'Aisha Bello',
    flag: '🇳🇬',
    phone: '(+234)8012345678',
    source: 'WhatsApp',
    pills: [
      { label: 'lead_stage: Hot', dismissible: false, isSignal: true },
      { label: 'utm_campaign: lagos', dismissible: true },
    ],
    attributes: [
      { key: 'name', value: 'Aisha Bello' },
      { key: 'email', value: 'aisha.b@email.ng' },
      { key: 'phone', value: '(+234)8012345678' },
      { key: 'lead_stage', value: 'Hot', isSignal: true },
      { key: 'top_interest', value: 'Vitamin C Serum', isSignal: true },
      { key: 'sentiment', value: 'Positive', isSignal: true },
      { key: 'utm_campaign', value: 'lagos_launch' },
      { key: 'contact_owner', value: 'Emeka Okafor' },
      { key: 'createddate', value: 'Jun 9, 2026' },
    ],
  },
];

// ── Source markers ──────────────────────────────────────────────────────────

/** Sparkle icon — marks an attribute auto-extracted from a signal
 *  (conversation analysis, AI inference) vs. entered manually. Rendered
 *  in a fixed left gutter so labels align across signal / manual rows. */
function SignalMark({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <span
      title="Extracted from signals"
      aria-label="Extracted from signals"
      className="inline-flex items-center justify-center flex-shrink-0 text-[#7c3aed]"
    >
      <Sparkles className={className} strokeWidth={2.25} />
    </span>
  );
}

/** Shopify bag mark — uses the brand-accurate SVG paths. Sits AFTER
 *  the label text so it never affects label alignment. */
function ShopifyMark({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <span
      title="From Shopify"
      aria-label="From Shopify"
      className="inline-flex items-center justify-center flex-shrink-0"
    >
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
        <path d="M12.4055 3.92732C12.3978 3.85698 12.3351 3.82565 12.2885 3.82565C12.2418 3.82565 11.2185 3.74765 11.2185 3.74765C11.2185 3.74765 10.5078 3.03698 10.4218 2.96665C10.3438 2.88865 10.1951 2.91198 10.1328 2.92765C10.1251 2.92765 9.97646 2.97465 9.73446 3.05265C9.49246 2.35732 9.07846 1.72465 8.33646 1.72465H8.26613C8.06246 1.45898 7.79713 1.33398 7.57846 1.33398C5.86013 1.33398 5.03213 3.48198 4.77446 4.57565C4.1028 4.78665 3.62613 4.92698 3.57146 4.95065C3.19646 5.06765 3.1888 5.07565 3.1418 5.42698C3.1028 5.69265 2.12646 13.2457 2.12646 13.2457L9.72646 14.6673L13.8508 13.777C13.8585 13.7613 12.4135 3.99765 12.4055 3.92732ZM9.31246 3.16165C9.12513 3.21632 8.89846 3.28665 8.67213 3.36465V3.22432C8.67213 2.80265 8.61747 2.45898 8.5158 2.18532C8.90613 2.23232 9.14846 2.66198 9.31246 3.16165ZM8.03913 2.27132C8.1408 2.53698 8.21113 2.91198 8.21113 3.42732V3.50532C7.78946 3.63798 7.34413 3.77098 6.88313 3.91932C7.1408 2.93532 7.63313 2.45098 8.03913 2.27132ZM7.53913 1.78698C7.61713 1.78698 7.69546 1.81832 7.7578 1.86498C7.20313 2.12265 6.61746 2.77098 6.37513 4.08332C6.00813 4.20032 5.65646 4.30198 5.3208 4.41132C5.60213 3.41165 6.30513 1.78698 7.53913 1.78698Z" fill="#7CB342"/>
        <path d="M12.2882 3.8103C12.2412 3.8103 11.2182 3.7323 11.2182 3.7323C11.2182 3.7323 10.5075 3.02163 10.4215 2.9513C10.3898 2.91996 10.3508 2.9043 10.3198 2.9043L9.74951 14.6676L13.8738 13.7773C13.8738 13.7773 12.4288 3.99796 12.4208 3.92763C12.3895 3.8573 12.3348 3.82596 12.2882 3.8103Z" fill="#558B2F"/>
        <path d="M8.2643 6.19776L7.77263 7.68076C7.77263 7.68076 7.32696 7.44243 6.79696 7.44243C6.00563 7.44243 5.9673 7.94176 5.9673 8.06476C5.9673 8.74076 7.7343 9.00209 7.7343 10.5924C7.7343 11.8448 6.94297 12.6514 5.87497 12.6514C4.5843 12.6514 3.93896 11.8524 3.93896 11.8524L4.28463 10.7154C4.28463 10.7154 4.96063 11.2994 5.5293 11.2994C5.90563 11.2994 6.0593 11.0074 6.0593 10.7924C6.0593 9.90876 4.61496 9.87043 4.61496 8.41076C4.61496 7.18909 5.49096 6.00609 7.26563 6.00609C7.92596 5.99809 8.2643 6.19776 8.2643 6.19776Z" fill="white"/>
      </svg>
    </span>
  );
}

/** Fixed-width gutter that holds the signal sparkle if applicable.
 *  Even when empty, it preserves alignment of labels across rows. */
function SignalGutter({ isSignal }: { isSignal?: boolean }) {
  return (
    <span className="w-3.5 h-3.5 inline-flex items-center justify-center flex-shrink-0">
      {isSignal && <SignalMark />}
    </span>
  );
}

// ── Pills ───────────────────────────────────────────────────────────────────

function AttributePill({ label, dismissible, isSignal, isShopify }: AttributePillData) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 text-gray-700 text-xs rounded border border-gray-200 whitespace-nowrap max-w-[220px]">
      {isSignal && <SignalMark className="w-3 h-3" />}
      <span className="truncate">{label}</span>
      {isShopify && <ShopifyMark className="w-3.5 h-3.5" />}
      {dismissible && (
        <X className="w-3 h-3 text-gray-400 cursor-pointer hover:text-gray-600 flex-shrink-0" />
      )}
    </span>
  );
}

function SourceBadge({ source }: { source: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 border border-gray-300 text-gray-700 text-xs rounded whitespace-nowrap">
      {source}
    </span>
  );
}

// ── All-attributes side panel ──────────────────────────────────────────────

type SourceFilter = 'all' | 'signal' | 'shopify' | 'manual';

function matchesFilter(a: FullAttribute, f: SourceFilter): boolean {
  if (f === 'all') return true;
  if (f === 'signal') return !!a.isSignal;
  if (f === 'shopify') return !!a.isShopify;
  // 'manual' = neither flag
  return !a.isSignal && !a.isShopify;
}

function AttributesPanel({
  contact,
  onClose,
}: {
  contact: Contact;
  onClose: () => void;
}) {
  const [filter, setFilter] = useState<SourceFilter>('all');
  const filtered = contact.attributes.filter((a) => matchesFilter(a, filter));

  const counts: Record<SourceFilter, number> = {
    all: contact.attributes.length,
    signal: contact.attributes.filter((a) => a.isSignal).length,
    shopify: contact.attributes.filter((a) => a.isShopify).length,
    manual: contact.attributes.filter((a) => !a.isSignal && !a.isShopify).length,
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="flex-1 bg-black/30 transition-opacity"
        aria-label="Close panel"
      />

      {/* Panel */}
      <aside className="w-full max-w-md bg-white shadow-xl flex flex-col border-l border-gray-200">
        {/* Header */}
        <header className="flex items-start justify-between gap-3 px-5 py-4 border-b border-gray-200">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium">
              All attributes
            </p>
            <h2 className="text-base font-semibold text-gray-900 mt-1 truncate">
              {contact.name}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {contact.attributes.length} fields
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* Source filter */}
        <div className="px-5 py-3 border-b border-gray-100 flex flex-wrap items-center gap-1.5">
          {(
            [
              { key: 'all', label: 'All', mark: null },
              { key: 'signal', label: 'Signals', mark: <SignalMark className="w-3 h-3" /> },
              { key: 'shopify', label: 'Shopify', mark: <ShopifyMark className="w-3.5 h-3.5" /> },
              { key: 'manual', label: 'Manual', mark: null },
            ] as const
          ).map((opt) => {
            const active = filter === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => setFilter(opt.key)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border transition-colors ${
                  active
                    ? 'bg-[#ebf7f0] text-[#1d8242] border-[#cde9d6]'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {opt.mark}
                {opt.label}
                <span className={active ? 'text-[#1d8242]' : 'text-gray-400'}>
                  {counts[opt.key]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Body — each row is:
            [signal-gutter (always reserved)] [label] [shopify-after-label] | [value]
            The fixed-width gutter is the trick that keeps every label
            starting at the same x regardless of whether the row is a
            signal, manual, or Shopify-sourced attribute. */}
        <div className="flex-1 overflow-y-auto px-5 py-3">
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-400 py-6 text-center">No attributes in this category.</p>
          ) : (
            <dl>
              {filtered.map((a) => (
                <div
                  key={a.key}
                  className="py-2.5 grid grid-cols-[42%_1fr] gap-3 items-center border-b border-gray-50 last:border-b-0"
                >
                  <dt className="text-xs text-gray-500 flex items-center gap-1.5 min-w-0">
                    <SignalGutter isSignal={a.isSignal} />
                    <span className="truncate">{a.key}</span>
                    {a.isShopify && <ShopifyMark className="w-3.5 h-3.5" />}
                  </dt>
                  <dd className="text-sm text-gray-800 text-right truncate">
                    {a.value || <span className="text-gray-300">—</span>}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* Footer with legend */}
        <footer className="px-5 py-3 border-t border-gray-200 flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-3 text-gray-500">
            <span className="inline-flex items-center gap-1">
              <SignalMark className="w-3 h-3" />
              Signal
            </span>
            <span className="inline-flex items-center gap-1">
              <ShopifyMark className="w-3.5 h-3.5" />
              Shopify
            </span>
          </span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            Close
          </button>
        </footer>
      </aside>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

interface ContactsPageProps {
  selectedProfileKey?: string | null;
  onSelectProfile?: (key: string | null) => void;
}

export function ContactsPage({ selectedProfileKey: externalKey, onSelectProfile }: ContactsPageProps = {}) {
  const [internalKey, setInternalKey] = useState<string | null>(null);
  const [panelContactId, setPanelContactId] = useState<string | null>(null);
  const selectedProfileKey = externalKey ?? internalKey;
  const setSelectedProfileKey = (k: string | null) => {
    if (onSelectProfile) onSelectProfile(k);
    else setInternalKey(k);
  };

  if (selectedProfileKey) {
    return (
      <Contact360Page
        profileKey={selectedProfileKey}
        onBack={() => setSelectedProfileKey(null)}
      />
    );
  }

  const panelContact = MOCK_CONTACTS.find((c) => c.id === panelContactId) ?? null;

  return (
    <div className="flex flex-col w-full h-full bg-white">
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5">

        {/* Page header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
          <div className="min-w-0">
            <h1 className="text-xl font-semibold text-gray-900">
              Contacts <span className="text-gray-500 font-normal">(121561)</span>
            </h1>
            <p className="text-xs text-gray-500 mt-0.5 max-w-md">
              Contact list stores the list of numbers that you've interacted with. You can even manually export or import contacts.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="hidden sm:flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors">
              <Play className="w-4 h-4 fill-blue-600" />
              Watch Tutorial
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#23a455] text-white text-sm font-medium rounded-md hover:bg-[#1d8f47] transition-colors">
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>
        </div>

        {/* Filter / sort bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          {/* Left: sort + search */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="hidden sm:flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer hover:text-gray-900">
              <span className="text-gray-500 text-xs">Sort by:</span>
              <span className="font-medium">Last Updated</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white">
              <div className="flex items-center px-2.5 py-1.5 gap-2">
                <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search contacts"
                  className="text-sm text-gray-700 placeholder:text-gray-400 outline-none w-36 sm:w-44 bg-transparent"
                  readOnly
                />
              </div>
              <button className="flex items-center justify-center w-8 h-8 bg-[#23a455] text-white hover:bg-[#1d8f47] transition-colors flex-shrink-0">
                <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
                  <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: export / import / delete */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors px-1">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors px-1">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Import</span>
            </button>
            <button className="flex items-center justify-center w-8 h-8 border border-red-300 text-red-500 rounded-md hover:bg-red-50 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table — horizontally scrollable on small screens.
            table-fixed + colgroup gives predictable column widths.
            Contact Attributes is the only flex column → it absorbs the
            leftover space, removing the previous dead zone. */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[760px] table-fixed">
              <colgroup>
                <col className="w-9" />
                <col className="w-44" />
                <col className="w-40" />
                <col className="w-24" />
                <col />
                <col className="w-20" />
              </colgroup>
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-3 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#23a455] cursor-pointer" readOnly />
                  </th>
                  <th className="px-3 py-4 text-left text-xs font-semibold text-gray-600">Basic info</th>
                  <th className="px-3 py-4 text-left text-xs font-semibold text-gray-600">Phone number</th>
                  <th className="px-3 py-4 text-left text-xs font-semibold text-gray-600 hidden sm:table-cell">Source</th>
                  <th className="px-3 py-4 text-left text-xs font-semibold text-gray-600 hidden md:table-cell">Contact Attributes</th>
                  <th className="px-3 py-4 text-left text-xs font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CONTACTS.map((contact) => (
                  <tr
                    key={contact.id}
                    onClick={() => setSelectedProfileKey(contact.profileKey)}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    {/* Checkbox */}
                    <td className="px-3 py-4 align-middle" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#23a455] cursor-pointer" readOnly />
                    </td>

                    {/* Basic info */}
                    <td className="px-3 py-4 align-middle">
                      <div className="flex items-center gap-2 min-w-0">
                        <a href="#" className="text-blue-600 hover:underline font-medium text-sm truncate">
                          {contact.name}
                        </a>
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#25d366] flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.434 3.488" />
                        </svg>
                      </div>
                    </td>

                    {/* Phone number */}
                    <td className="px-3 py-4 align-middle">
                      <span className="flex items-center gap-1.5 text-gray-700 text-sm">
                        <span>{contact.flag}</span>
                        <span className="truncate">{contact.phone}</span>
                      </span>
                    </td>

                    {/* Source — hidden on xs */}
                    <td className="px-3 py-4 align-middle hidden sm:table-cell">
                      {contact.source ? <SourceBadge source={contact.source} /> : null}
                    </td>

                    {/* Contact Attributes — hidden below md.
                        Whole <td> stops propagation so clicks anywhere
                        in this column don't trigger row navigation. */}
                    <td
                      className="px-3 py-4 align-middle hidden md:table-cell"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {contact.pills.map((attr, j) => (
                          <AttributePill key={j} {...attr} />
                        ))}
                        {contact.attributes.length > contact.pills.length && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPanelContactId(contact.id);
                            }}
                            className="text-xs text-blue-600 hover:underline whitespace-nowrap"
                          >
                            Show all attributes ({contact.attributes.length})
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-4 align-middle" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <button className="text-gray-400 hover:text-gray-700 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Side panel */}
      {panelContact && (
        <AttributesPanel
          contact={panelContact}
          onClose={() => setPanelContactId(null)}
        />
      )}
    </div>
  );
}
