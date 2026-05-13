import svgPaths from "./svg-ybp1hodcey";

function ContactsIconInner() {
  return (
    <div
      className="absolute bottom-[19.444%] left-[16.667%] right-[23.75%] top-[8.333%]"
      data-name="Contacts Icon Inner"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 11 13"
      >
        <g id="Contacts Icon Inner">
          <path
            d={svgPaths.p1f09c600}
            id="Vector"
            stroke="var(--stroke-0, #505451)"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  );
}

function FluentBookContacts24Regular() {
  return (
    <div
      className="absolute left-[-1.387px] overflow-clip size-[18px] top-[-1px]"
      data-name="fluent:book-contacts-24-regular"
    >
      <ContactsIconInner />
    </div>
  );
}

function AkarIconsInbox() {
  return (
    <div
      className="absolute left-0 overflow-clip size-[15px] top-0"
      data-name="akar-icons:inbox"
    >
      <FluentBookContacts24Regular />
    </div>
  );
}

export default function ContactsIcon() {
  return (
    <div className="relative size-full" data-name="Contacts Icon">
      <AkarIconsInbox />
    </div>
  );
}