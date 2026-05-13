import React from 'react';
import svgPaths from "./svg-5o8i9q23ce";
import Panel from './Panel';

interface TiTopNavProps {
  onToggleContactInfo?: () => void;
  isContactInfoVisible?: boolean;
}

function Wrapper3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0">
      <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative">
        {children}
      </div>
    </div>
  );
}

function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0">
      <div className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start p-0 relative">
        {children}
      </div>
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0">
      <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative">
        {children}
      </div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-5">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        {children}
      </svg>
    </div>
  );
}

function Headset() {
  return (
    <Wrapper>
      <g id="Headset">
        <path
          d={svgPaths.p2b2d7300}
          fill="var(--fill-0, #505451)"
          id="Vector"
        />
      </g>
    </Wrapper>
  );
}

function Agent() {
  return (
    <div
      className="bg-[#ffffff] relative rounded-[25px] shrink-0"
      data-name="_agent"
    >
      <div className="absolute border border-[#505451] border-solid inset-0 pointer-events-none rounded-[25px]" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-[8px] relative">
          <Headset />
        </div>
      </div>
    </div>
  );
}

function Frame1984077390() {
  return (
    <div className="relative shrink-0">
      <div className="box-border content-stretch flex flex-row gap-1 items-start justify-start p-0 relative">
        <div className="font-['Inter:Bold',_sans-serif] font-bold leading-[0] not-italic relative shrink-0 text-[#333333] text-[0px] text-left text-nowrap">
          <p className="leading-[20px] text-[14px] whitespace-pre">
            <span>{`John `}</span>
            <span className="font-['Inter:Bold',_sans-serif] font-bold not-italic">
              Melvis
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame1984077389() {
  return (
    <div className="relative shrink-0">
      <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative">
        <Frame1984077390 />
        <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#848a86] text-[12px] text-left text-nowrap">
          <p className="block leading-[16px] whitespace-pre">Available</p>
        </div>
      </div>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-4" data-name="chevron-down">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="chevron-down">
          <path
            d="M4 6L8 10L12 6"
            id="Vector"
            stroke="var(--stroke-0, #505451)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}

function AgentSelection() {
  return (
    <div
      className="bg-[#f6f7f6] relative rounded-lg shrink-0"
      data-name="_agent selection"
    >
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-[10px] relative">
          <ChevronDown />
        </div>
      </div>
    </div>
  );
}

function Frame2409() {
  return (
    <Wrapper1>
      <Agent />
      <Frame1984077389 />
      <AgentSelection />
    </Wrapper1>
  );
}

function UsersProfiles01() {
  return (
    <Wrapper>
      <g id="users-profiles-01">
        <path
          d={svgPaths.p3e092780}
          id="Icon"
          stroke="var(--stroke-0, #505451)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </Wrapper>
  );
}

function Frame2412() {
  return (
    <Wrapper2>
      <UsersProfiles01 />
    </Wrapper2>
  );
}

function Team() {
  return (
    <div
      className="bg-[#f6f7f6] relative rounded-lg shrink-0 size-9"
      data-name="_team"
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-center px-1 py-0 relative size-9">
          <Frame2412 />
        </div>
      </div>
    </div>
  );
}

function Frame1984077509() {
  return (
    <div className="relative shrink-0">
      <div className="box-border content-stretch flex flex-row gap-3 items-center justify-start p-0 relative">
        <Frame2409 />
        <Team />
      </div>
    </div>
  );
}

function Frame1984077521() {
  return (
    <Wrapper3>
      <Frame1984077509 />
    </Wrapper3>
  );
}

function Icons8Timer1() {
  return (
    <Wrapper>
      <g id="icons8-timer 1">
        <path
          d={svgPaths.p15944580}
          fill="var(--fill-0, #848A86)"
          id="Vector"
        />
      </g>
    </Wrapper>
  );
}

function Timer() {
  return (
    <div className="relative shrink-0" data-name="_timer">
      <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative">
        <Icons8Timer1 />
        <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#848a86] text-[14px] text-left text-nowrap">
          <p className="block leading-[20px] whitespace-pre">12:39</p>
        </div>
      </div>
    </div>
  );
}

function Frame9736() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative w-full">
        <div className="basis-0 font-['Inter:Semi_Bold',_sans-serif] font-semibold grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#353735] text-[14px] text-left">
          <p className="block leading-[20px]">Open</p>
        </div>
      </div>
    </div>
  );
}

function Chevron() {
  return (
    <Wrapper>
      <g id="Chevron">
        <path
          d="M5 7.5L10 12.5L15 7.5"
          id="Vector"
          stroke="var(--stroke-0, #1B1D1C)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </Wrapper>
  );
}

function PlaceholderText() {
  return (
    <div
      className="bg-[#ffffff] relative rounded shrink-0 w-full"
      data-name="Placeholder text"
    >
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between p-[8px] relative w-full">
          <Frame9736 />
          <Chevron />
        </div>
      </div>
      <div className="absolute border border-[#e7e9e8] border-solid inset-[-1px] pointer-events-none rounded-[5px]" />
    </div>
  );
}

function InputFiled() {
  return (
    <div className="relative shrink-0 w-full" data-name="Input filed">
      <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative w-full">
        <PlaceholderText />
      </div>
    </div>
  );
}

function Dropdown() {
  return (
    <div
      className="bg-[#f6f7f6] relative shrink-0 w-[120px]"
      data-name="Dropdown"
    >
      <div className="box-border content-stretch flex flex-col gap-0.5 items-start justify-start p-0 relative w-[120px]">
        <InputFiled />
      </div>
    </div>
  );
}

function CocoLineMore() {
  return (
    <div className="h-[20.599px] relative w-5" data-name="COCO/Line/More">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 21"
      >
        <g id="COCO/Line/More">
          <path
            d={svgPaths.p20ede270}
            fill="var(--fill-0, #505451)"
            id="Vector"
          />
          <path
            d={svgPaths.p3110f480}
            fill="var(--fill-0, #505451)"
            id="Vector_2"
          />
          <path
            d={svgPaths.p2802d700}
            fill="var(--fill-0, #505451)"
            id="Vector_3"
          />
        </g>
      </svg>
    </div>
  );
}

function Menu() {
  return (
    <Wrapper2>
      <div className="flex h-[20px] items-center justify-center relative shrink-0 w-[21px]">
        <div className="flex-none rotate-[270deg]">
          <CocoLineMore />
        </div>
      </div>
    </Wrapper2>
  );
}

function PanelToggleButton({ onToggleContactInfo, isContactInfoVisible }: { onToggleContactInfo?: () => void; isContactInfoVisible?: boolean }) {
  if (!onToggleContactInfo) return null;
  
  return (
    <Wrapper2>
      <div 
        className={`flex h-[24px] items-center justify-center relative shrink-0 w-[24px] cursor-pointer transition-all duration-200 rounded p-1 ${
          isContactInfoVisible 
            ? 'bg-gray-100' 
            : 'hover:bg-gray-50'
        }`}
        onClick={onToggleContactInfo}
        title={isContactInfoVisible ? "Hide contact panel" : "Show contact panel"}
      >
        <div className="w-4 h-4">
          <Panel />
        </div>
      </div>
    </Wrapper2>
  );
}

function Frame1984077524({ onToggleContactInfo, isContactInfoVisible }: { onToggleContactInfo?: () => void; isContactInfoVisible?: boolean }) {
  return (
    <Wrapper1>
      <Dropdown />
      <Menu />
      <PanelToggleButton onToggleContactInfo={onToggleContactInfo} isContactInfoVisible={isContactInfoVisible} />
    </Wrapper1>
  );
}

function Frame1984077518({ onToggleContactInfo, isContactInfoVisible }: { onToggleContactInfo?: () => void; isContactInfoVisible?: boolean }) {
  return (
    <Wrapper3>
      <Timer />
      <Frame1984077524 onToggleContactInfo={onToggleContactInfo} isContactInfoVisible={isContactInfoVisible} />
    </Wrapper3>
  );
}

export default function TiTopNav({ onToggleContactInfo, isContactInfoVisible }: TiTopNavProps = {}) {
  return (
    <div className="bg-[#ffffff] relative size-full" data-name="TI - Top Nav">
      <div className="absolute border-[#e7e9e8] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between px-4 py-6 relative size-full">
          <Frame1984077521 />
          <Frame1984077518 onToggleContactInfo={onToggleContactInfo} isContactInfoVisible={isContactInfoVisible} />
        </div>
      </div>
    </div>
  );
}