import svgPaths from "./svg-wznw351r27";
import ContactsIcon from "./ContactsIcon-4049-255";
import imgWatiLogo1 from "figma:asset/1041d72fad52f443aef4af3b773d5706e93e7f2f.png";

function TeamInboxIcon() {
  return (
    <div
      className="absolute bottom-[7.813%] left-[5.469%] right-[5.469%] top-[7.813%]"
      data-name="Team Inbox Icon"
    >
      <div className="absolute bottom-[-6.838%] left-[-6.025%] right-[-6.024%] top-[-6.838%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14 13"
        >
          <g id="Team Inbox Icon">
            <path
              d={svgPaths.p3bdeda80}
              id="Vector"
              stroke="var(--stroke-0, #23A455)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d={svgPaths.p7e29840}
              id="Vector_2"
              stroke="var(--stroke-0, #23A455)"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function AkarIconsInbox() {
  return (
    <div className="relative shrink-0 size-[13px]" data-name="akar-icons:inbox">
      <TeamInboxIcon />
    </div>
  );
}

function TeamInboxContainer() {
  return (
    <div className="relative shrink-0" data-name="Team Inbox Container">
      <div className="box-border content-stretch flex flex-row gap-[5px] items-center justify-start p-0 relative">
        <AkarIconsInbox />
        <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#23a455] text-[14px] text-left text-nowrap">
          <p className="block leading-[20px] whitespace-pre">Team Inbox</p>
        </div>
      </div>
    </div>
  );
}

function PhBroadcast() {
  return (
    <div className="relative shrink-0 size-[17px]" data-name="ph:broadcast">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 17 17"
      >
        <g id="ph:broadcast">
          <g id="Vector">
            <mask fill="white" id="path-1-inside-1_4046_190">
              <path d={svgPaths.p3103c870} />
            </mask>
            <path
              d={svgPaths.p3103c870}
              mask="url(#path-1-inside-1_4046_190)"
              stroke="var(--stroke-0, #505451)"
              strokeWidth="4"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function BroadcastContainer() {
  return (
    <div className="relative shrink-0" data-name="Broadcast Container">
      <div className="box-border content-stretch flex flex-row gap-[5px] items-center justify-start p-0 relative">
        <PhBroadcast />
        <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#505451] text-[14px] text-left text-nowrap">
          <p className="block leading-[20px] whitespace-pre">Broadcast</p>
        </div>
      </div>
    </div>
  );
}

function ContactsContainer() {
  return (
    <div className="relative shrink-0" data-name="Contacts Container">
      <div className="box-border content-stretch flex flex-row gap-[5px] items-center justify-start leading-[0] p-0 relative">
        <div className="relative shrink-0 size-4">
          <ContactsIcon />
        </div>
        <div className="font-['Inter:Medium',_sans-serif] font-medium not-italic relative shrink-0 text-[#505451] text-[14px] text-left text-nowrap">
          <p className="block leading-[20px] whitespace-pre">Contacts</p>
        </div>
      </div>
    </div>
  );
}

function AutomationsIcon() {
  return (
    <div className="absolute inset-[12.5%]" data-name="Automations Icon">
      <div className="absolute bottom-[-6.25%] left-[-6.25%] right-[-6.25%] top-[-6.25%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14 14"
        >
          <g id="Automations Icon">
            <path
              d={svgPaths.p3fd4b00}
              id="Vector"
              stroke="var(--stroke-0, #505451)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M5.66667 5V9L9 7L5.66667 5Z"
              id="Vector_2"
              stroke="var(--stroke-0, #505451)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function TablerSettingsAutomation() {
  return (
    <div
      className="overflow-clip relative shrink-0 size-4"
      data-name="tabler:settings-automation"
    >
      <AutomationsIcon />
    </div>
  );
}

function AutomationsContainer() {
  return (
    <div className="relative shrink-0" data-name="Automations Container">
      <div className="box-border content-stretch flex flex-row gap-[5px] items-center justify-start p-0 relative">
        <TablerSettingsAutomation />
        <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#505451] text-[14px] text-left text-nowrap">
          <p className="block leading-[20px] whitespace-pre">Automations</p>
        </div>
      </div>
    </div>
  );
}

function AnalyticsIcon() {
  return (
    <div className="relative shrink-0 size-3.5" data-name="Analytics Icon">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g id="Analytics Icon">
          <path
            d={svgPaths.p35f9e800}
            id="Vector"
            stroke="var(--stroke-0, #505451)"
            strokeWidth="1.5"
          />
          <path
            d={svgPaths.pd17a580}
            id="Vector_2"
            stroke="var(--stroke-0, #505451)"
            strokeWidth="1.5"
          />
          <path
            d={svgPaths.p22b77f1}
            id="Vector_3"
            stroke="var(--stroke-0, #505451)"
            strokeWidth="1.5"
          />
          <path
            d={svgPaths.p18d94f00}
            id="Vector_4"
            stroke="var(--stroke-0, #505451)"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  );
}

function AnalyticsContainer() {
  return (
    <div className="relative shrink-0" data-name="Analytics Container">
      <div className="box-border content-stretch flex flex-row gap-[5px] items-center justify-start p-0 relative">
        <AnalyticsIcon />
        <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#505451] text-[14px] text-left text-nowrap">
          <p className="block leading-[20px] whitespace-pre">Analytics</p>
        </div>
      </div>
    </div>
  );
}

function MoreTextContainer() {
  return (
    <div className="absolute left-[22px] top-0" data-name="More Text Container">
      <div className="box-border content-stretch flex flex-row gap-[5px] items-start justify-start p-0 relative">
        <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#505451] text-[14px] text-left text-nowrap">
          <p className="block leading-[20px] whitespace-pre">More</p>
        </div>
      </div>
    </div>
  );
}

function MoreContainer() {
  return (
    <div
      className="h-[18px] relative shrink-0 w-[57px]"
      data-name="More Container"
    >
      <MoreTextContainer />
      <div
        className="absolute h-[5px] left-0 top-[7px] w-[17px]"
        data-name="Union"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 17 5"
        >
          <path
            d={svgPaths.p5242400}
            fill="var(--fill-0, #505451)"
            id="Union"
          />
        </svg>
      </div>
    </div>
  );
}

function MenuContainer() {
  return (
    <div className="relative shrink-0" data-name="Menu Container">
      <div className="box-border content-stretch flex flex-row gap-[25px] items-center justify-start p-0 relative">
        <TeamInboxContainer />
        <div className="hidden md:block">
          <BroadcastContainer />
        </div>
        <div className="hidden lg:block">
          <ContactsContainer />
        </div>
        <div className="hidden lg:block">
          <AutomationsContainer />
        </div>
        <div className="hidden xl:block">
          <AnalyticsContainer />
        </div>
        <MoreContainer />
      </div>
    </div>
  );
}

function LogoAndMenuContainer() {
  return (
    <div className="relative shrink-0" data-name="Logo and Menu Container">
      <div className="box-border content-stretch flex flex-row gap-5 items-center justify-start p-0 relative">
        <div
          className="bg-center bg-cover bg-no-repeat h-[25px] shrink-0 w-[73.387px]"
          data-name="wati-logo 1"
          style={{ backgroundImage: `url('${imgWatiLogo1}')` }}
        />
        <div className="flex h-[20px] items-center justify-center relative shrink-0 w-[0px]">
          <div className="flex-none rotate-[90deg]">
            <div className="h-0 relative w-5" data-name="Line">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 20 1"
                >
                  <line
                    id="Line"
                    opacity="0.1"
                    stroke="var(--stroke-0, #505451)"
                    x2="20"
                    y1="0.5"
                    y2="0.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <MenuContainer />
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-9" data-name="SVG">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 36 36"
      >
        <g id="SVG">
          <path
            d={svgPaths.p1807de80}
            fill="var(--fill-0, #ECECEC)"
            id="Vector"
          />
          <path
            d={svgPaths.p1e9b4200}
            fill="var(--fill-0, #666666)"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div
      className="bg-[#ececec] relative rounded-[18px] shrink-0 size-9"
      data-name="Button"
    >
      <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative size-9">
        <Svg />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative">
        <Button />
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-9" data-name="SVG">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 36 36"
      >
        <g id="SVG">
          <path
            d={svgPaths.p1807de80}
            fill="var(--fill-0, #EBF7F0)"
            id="Vector"
          />
          <g id="fluentwalletregular">
            <path
              d={svgPaths.p2b129000}
              fill="var(--fill-0, #23A455)"
              id="Vector_2"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div
      className="bg-[#ececec] relative rounded-[18px] shrink-0 size-9"
      data-name="Button"
    >
      <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative size-9">
        <Svg1 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative">
        <Button1 />
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="h-[15px] relative shrink-0 w-[13px]" data-name="SVG">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 13 15"
      >
        <g id="SVG">
          <path
            d={svgPaths.p2f6627b0}
            fill="var(--fill-0, #666666)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div
      className="bg-[#ececec] relative rounded-[18px] shrink-0 size-9"
      data-name="Button"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-center px-[11.5px] py-[10.5px] relative size-9">
          <Svg2 />
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative">
        <Button2 />
      </div>
    </div>
  );
}

function Status() {
  return (
    <div className="relative shrink-0" data-name="Status">
      <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative">
        <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1b74e3] text-[12px] text-left text-nowrap">
          <p className="block leading-[16px] whitespace-pre">CONNECTED</p>
        </div>
      </div>
    </div>
  );
}

function Number() {
  return (
    <div className="relative shrink-0" data-name="Number">
      <div className="box-border content-stretch flex flex-col items-center justify-center p-0 relative">
        <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#23a455] text-left text-nowrap">
          <p className="block font-['Inter:Bold',_sans-serif] font-bold leading-[16px] text-[12px] whitespace-pre">
            +1234567890
          </p>
        </div>
      </div>
    </div>
  );
}

function Information() {
  return (
    <div className="h-7 relative shrink-0" data-name="Information">
      <div className="box-border content-stretch flex flex-col h-7 items-start justify-center p-0 relative">
        <Status />
        <Number />
      </div>
    </div>
  );
}

function Commercial() {
  return (
    <div className="relative shrink-0 size-4" data-name="Commercial">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g id="Commercial">
          <path
            d={svgPaths.paeada00}
            fill="var(--fill-0, #666666)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div
      className="bg-[#ececec] relative rounded-[18px] shrink-0 size-9"
      data-name="Button"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-center px-[11.5px] py-[10.5px] relative size-9">
          <Commercial />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative">
        <Button3 />
      </div>
    </div>
  );
}

function NotificationIcon3() {
  return (
    <div className="relative shrink-0 size-8" data-name="Notification Icon 3">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="Notification Icon 3">
          <rect fill="var(--fill-0, #ECECEC)" height="32" rx="16" width="32" />
          <path
            d={svgPaths.p234e1f00}
            fill="var(--fill-0, #666666)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function RightHeaderContainer() {
  return (
    <div
      className="relative shrink-0"
      data-name="Right Header Container"
    >
      <div className="box-border content-stretch flex flex-row gap-[15px] items-center justify-end p-0 relative">
        <div className="hidden lg:block">
          <Container />
        </div>
        <div className="hidden lg:block bg-[#e8eaf2] h-[15px] shrink-0 w-px" data-name="Separator" />
        <div className="hidden md:block">
          <Container1 />
        </div>
        <div className="hidden md:block bg-[#e8eaf2] h-[15px] shrink-0 w-px" data-name="Separator" />
        <div className="hidden sm:block">
          <Container2 />
        </div>
        <div className="hidden sm:block bg-[#e8eaf2] h-[15px] shrink-0 w-px" data-name="Separator" />
        <Information />
        <div
          className="bg-[#e8eaf2] h-[15px] shrink-0 w-px"
          data-name="Separator"
        />
        <div className="hidden md:block">
          <Container3 />
        </div>
        <div className="hidden md:block bg-[#e8eaf2] h-[15px] shrink-0 w-px" data-name="Separator" />
        <NotificationIcon3 />
      </div>
    </div>
  );
}

function HeaderContainer() {
  return (
    <div
      className="absolute left-[25px] right-[25px] top-2"
      data-name="Header Container"
    >
      <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative w-full">
        <LogoAndMenuContainer />
        <RightHeaderContainer />
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <div className="relative w-full h-full" data-name="Header">
      <div className="absolute border border-[#e7e9e8] border-solid inset-[-1px] pointer-events-none" />
      <div
        className="absolute bg-[#ffffff] h-full left-0 top-0 w-full"
        data-name="Hover Option Background"
      />
      <HeaderContainer />
    </div>
  );
}