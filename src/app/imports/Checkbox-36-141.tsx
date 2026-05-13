import svgPaths from "./svg-qm6d4sklnn";

function Check() {
  return (
    <div className="absolute left-0 size-4 top-0" data-name="check">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="check">
          <path
            d={svgPaths.p3aa04300}
            id="Icon"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#23a455] relative rounded shrink-0 size-4">
      <div className="overflow-clip relative size-4">
        <Check />
      </div>
      <div className="absolute border border-[#23a455] border-solid inset-0 pointer-events-none rounded" />
    </div>
  );
}

export default function Checkbox() {
  return (
    <div className="relative rounded-[99px] size-full" data-name="Checkbox">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center overflow-clip p-[4px] relative size-full">
          <Frame4 />
        </div>
      </div>
    </div>
  );
}