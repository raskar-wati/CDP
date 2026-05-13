import svgPaths from "./svg-igbqms1wb4";
import clsx from "clsx";
import imgFlag from "figma:asset/cb2758ed1f7b6efb95b7f6bf90672aac0488acae.png";
type BackgroundImage251Props = {
  additionalClassNames?: string[];
};

function BackgroundImage251({
  children,
  additionalClassNames = [],
}: React.PropsWithChildren<BackgroundImage251Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      {children}
    </div>
  );
}

function BackgroundImage234({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      {children}
    </div>
  );
}
type BackgroundImage217Props = {
  additionalClassNames?: string[];
};

function BackgroundImage217({
  children,
  additionalClassNames = [],
}: React.PropsWithChildren<BackgroundImage217Props>) {
  return (
    <div className={clsx("relative shrink-0 w-full", additionalClassNames)}>
      {children}
    </div>
  );
}

function BackgroundImage198({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage251>
      <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative">
        {children}
      </div>
    </BackgroundImage251>
  );
}

function BackgroundImage180({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage217>
      <div className="box-border content-stretch flex flex-col gap-3 items-start justify-center p-0 relative w-full">
        {children}
      </div>
    </BackgroundImage217>
  );
}

function BackgroundImage162({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage217>
      <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative w-full">
        {children}
      </div>
    </BackgroundImage217>
  );
}
type BackgroundImage144Props = {
  additionalClassNames?: string[];
};

function BackgroundImage144({
  children,
  additionalClassNames = [],
}: React.PropsWithChildren<BackgroundImage144Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="box-border content-stretch flex flex-row gap-1 items-center justify-center p-0 relative">
        {children}
      </div>
    </div>
  );
}

function BackgroundImage126({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage234>
      <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative w-full">
        {children}
      </div>
    </BackgroundImage234>
  );
}

function BackgroundImage108({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage217>
      <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative w-full">
        {children}
      </div>
    </BackgroundImage217>
  );
}

function BackgroundImage91({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage217>
      <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative w-full">
        {children}
      </div>
    </BackgroundImage217>
  );
}

function BackgroundImage75({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage251 additionalClassNames={["size-6"]}>
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        {children}
      </svg>
    </BackgroundImage251>
  );
}

function BackgroundImage60({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage251 additionalClassNames={["w-[120px]"]}>
      <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative w-[120px]">
        {children}
      </div>
    </BackgroundImage251>
  );
}
type BackgroundImage45Props = {
  additionalClassNames?: string[];
};

function BackgroundImage45({
  children,
  additionalClassNames = [],
}: React.PropsWithChildren<BackgroundImage45Props>) {
  return (
    <div className={clsx("relative size-4", additionalClassNames)}>
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        {children}
      </svg>
    </div>
  );
}

function BackgroundImage30({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="relative size-full">{children}</div>
    </div>
  );
}

function BackgroundImage15({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage30>
      <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start px-3 py-0 relative w-full">
        {children}
      </div>
    </BackgroundImage30>
  );
}

function ContactDetailsPanelLineBackgroundImage() {
  return (
    <BackgroundImage217 additionalClassNames={["h-0"]}>
      <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 338 1"
        >
          <line
            id="Line"
            opacity="0.1"
            stroke="var(--stroke-0, #9CA19D)"
            x2="338"
            y1="0.5"
            y2="0.5"
          />
        </svg>
      </div>
    </BackgroundImage217>
  );
}

function BackgroundImage1() {
  return (
    <BackgroundImage45 additionalClassNames={["shrink-0"]}>
      <g id="Contact Details Tags Dropdown">
        <path
          d="M4 6L8 10L12 6"
          id="Vector"
          stroke="var(--stroke-0, #505451)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </BackgroundImage45>
  );
}
type BackgroundImageAndText3Props = {
  text: string;
  additionalClassNames?: string[];
};

function BackgroundImageAndText3({
  text,
  additionalClassNames = [],
}: BackgroundImageAndText3Props) {
  return (
    <div
      className={clsx(
        "box-border content-stretch flex flex-row items-center justify-center p-0 relative",
        additionalClassNames,
      )}
    >
      <div className="basis-0 font-['Inter:Medium',_sans-serif] font-medium grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#1b1d1c] text-[14px] text-left">
        <p className="block leading-[20px]">{text}</p>
      </div>
    </div>
  );
}
type BackgroundImageAndText2Props = {
  text: string;
  additionalClassNames?: string[];
};

function BackgroundImageAndText2({
  text,
  additionalClassNames = [],
}: BackgroundImageAndText2Props) {
  return (
    <div
      className={clsx(
        "box-border content-stretch flex flex-row gap-1 items-center p-0 relative",
        additionalClassNames,
      )}
    >
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#1b1d1c] text-[14px] text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">{text}</p>
      </div>
    </div>
  );
}
type ContactdetailsinfosectiontextBackgroundImageAndTextProps = {
  text: string;
};

function ContactdetailsinfosectiontextBackgroundImageAndText({
  text,
}: ContactdetailsinfosectiontextBackgroundImageAndTextProps) {
  return (
    <div className="relative shrink-0">
      <BackgroundImageAndText2
        text={text}
        additionalClassNames={["justify-center"]}
      />
    </div>
  );
}
type BackgroundImageAndText1Props = {
  text: string;
};

function BackgroundImageAndText1({ text }: BackgroundImageAndText1Props) {
  return (
    <BackgroundImage60>
      <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#666666] text-[14px] text-left">
        <p className="block leading-[20px]">{text}</p>
      </div>
    </BackgroundImage60>
  );
}

function BackgroundImage() {
  return (
    <BackgroundImage45>
      <g id="Contact Details Info Dropdown">
        <path
          d="M4 6L8 10L12 6"
          id="Vector"
          stroke="var(--stroke-0, #505451)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </BackgroundImage45>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
};

function BackgroundImageAndText({ text }: BackgroundImageAndTextProps) {
  return (
    <BackgroundImage251>
      <div className="box-border content-stretch flex flex-col items-end justify-start p-0 relative">
        <div className="font-['Inter:Bold',_sans-serif] font-bold leading-[0] not-italic relative shrink-0 text-[#353735] text-[14px] text-left w-full">
          <p className="block leading-[20px]">{text}</p>
        </div>
      </div>
    </BackgroundImage251>
  );
}

function Avatars() {
  return (
    <BackgroundImage251 additionalClassNames={["size-6"]}>
      <div className="absolute bottom-0 left-0 right-0 top-0">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 24 24"
        >
          <g id="Avatars">
            <path
              d={svgPaths.p311e3080}
              fill="url(#paint0_linear_25_2217)"
              id="Vector"
            />
            <path
              d={svgPaths.p3047ce80}
              fill="var(--fill-0, #07B723)"
              id="Vector_2"
            />
            <path
              d={svgPaths.p206e0f00}
              id="Vector_3"
              stroke="var(--stroke-0, #07B723)"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
          </g>
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint0_linear_25_2217"
              x1="12"
              x2="12"
              y1="0"
              y2="24"
            >
              <stop stopColor="#E0FFDE" />
              <stop offset="1" stopColor="#D0DFCF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </BackgroundImage251>
  );
}

function ContactDetailsName() {
  return (
    <BackgroundImage251 additionalClassNames={["w-[113px]"]}>
      <div className="box-border content-stretch flex flex-col items-start justify-end p-0 relative w-[113px]">
        <div className="font-['Inter:Bold',_sans-serif] font-bold leading-[0] not-italic relative shrink-0 text-[#353735] text-[14px] text-left text-nowrap">
          <p className="block leading-[20px] whitespace-pre">Addison Smith</p>
        </div>
      </div>
    </BackgroundImage251>
  );
}

function ContactDetailsIcon() {
  return (
    <BackgroundImage251>
      <div className="box-border content-stretch flex flex-row gap-[5px] items-center justify-start p-0" />
    </BackgroundImage251>
  );
}

function ContactDetailsHeaderText() {
  return (
    <BackgroundImage234>
      <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative w-full">
        <ContactDetailsName />
        <ContactDetailsIcon />
      </div>
    </BackgroundImage234>
  );
}

function ContactDetailsHeaderTextContainer() {
  return (
    <BackgroundImage234>
      <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative w-full">
        <ContactDetailsHeaderText />
      </div>
    </BackgroundImage234>
  );
}

function ContactDetailsHeaderContainer() {
  return (
    <BackgroundImage108>
      <Avatars />
      <ContactDetailsHeaderTextContainer />
    </BackgroundImage108>
  );
}

function ContactDetailsHeader() {
  return (
    <BackgroundImage30>
      <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-2 py-px relative w-full">
        <ContactDetailsHeaderContainer />
      </div>
    </BackgroundImage30>
  );
}

function Contact() {
  return (
    <BackgroundImage75>
      <g id="Contact">
        <path
          d={svgPaths.p25b19600}
          fill="var(--fill-0, #848A86)"
          id="Vector"
        />
      </g>
    </BackgroundImage75>
  );
}

function ContactDetailsInfoTextContainer() {
  return (
    <BackgroundImage126>
      <Contact />
      <BackgroundImageAndText text="Contact info" />
    </BackgroundImage126>
  );
}

function ContactDetailsInfoHeader() {
  return (
    <BackgroundImage91>
      <ContactDetailsInfoTextContainer />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <BackgroundImage />
        </div>
      </div>
    </BackgroundImage91>
  );
}

function Flag() {
  return (
    <div
      className="bg-[50%_50%] bg-cover bg-no-repeat overflow-clip relative rounded-[20px] shrink-0 size-3"
      data-name="flag"
      style={{ backgroundImage: `url('${imgFlag}')` }}
    >
      <div className="absolute font-['Poppins:Regular',_sans-serif] leading-[0] left-[-2px] not-italic text-[#bfbfbf] text-[16.5px] text-left top-8 w-[246px]">
        <p className="block leading-[20px]">(+1)</p>
      </div>
    </div>
  );
}

function Copy() {
  return (
    <BackgroundImage45 additionalClassNames={["shrink-0"]}>
      <g id="Copy">
        <path d={svgPaths.p15722080} fill="var(--fill-0, #848A86)" id="Shape" />
      </g>
    </BackgroundImage45>
  );
}

function Button() {
  return (
    <BackgroundImage144 additionalClassNames={["rounded-lg"]}>
      <Copy />
    </BackgroundImage144>
  );
}

function ContactDetailsInfoSectionText3() {
  return (
    <BackgroundImage144>
      <Flag />
      <div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#1b1d1c] text-[14px] text-left text-nowrap">
        <p className="block leading-[20px] whitespace-pre">+1876543210</p>
      </div>
      <Button />
    </BackgroundImage144>
  );
}

function Parameter() {
  return (
    <BackgroundImage108>
      <BackgroundImageAndText1 text="Phone Number" />
      <ContactDetailsInfoSectionText3 />
    </BackgroundImage108>
  );
}

function ContactDetailsInfoSectionTextContainer() {
  return (
    <BackgroundImage162>
      <Parameter />
    </BackgroundImage162>
  );
}

function ContactDetailsInfoSectionContainer() {
  return (
    <BackgroundImage162>
      <ContactDetailsInfoSectionTextContainer />
    </BackgroundImage162>
  );
}

function ContactDetailsInfoSection() {
  return (
    <BackgroundImage162>
      <ContactDetailsInfoSectionContainer />
    </BackgroundImage162>
  );
}

function Parameter1() {
  return (
    <BackgroundImage108>
      <BackgroundImageAndText1 text="Display name" />
      <ContactdetailsinfosectiontextBackgroundImageAndText text="Addison Smith" />
    </BackgroundImage108>
  );
}

function ContactDetailsInfoSectionTextContainer2() {
  return (
    <BackgroundImage162>
      <Parameter1 />
    </BackgroundImage162>
  );
}

function ContactDetailsInfoSectionContainer2() {
  return (
    <BackgroundImage162>
      <ContactDetailsInfoSectionTextContainer2 />
    </BackgroundImage162>
  );
}

function ContactDetailsInfoSection2() {
  return (
    <BackgroundImage162>
      <ContactDetailsInfoSectionContainer2 />
    </BackgroundImage162>
  );
}

function Parameter2() {
  return (
    <BackgroundImage108>
      <BackgroundImageAndText1 text="Username" />
      <ContactdetailsinfosectiontextBackgroundImageAndText text="addi_smith" />
    </BackgroundImage108>
  );
}

function ContactDetailsInfoSectionTextContainer3() {
  return (
    <BackgroundImage162>
      <Parameter2 />
    </BackgroundImage162>
  );
}

function ContactDetailsInfoSectionContainer3() {
  return (
    <BackgroundImage162>
      <ContactDetailsInfoSectionTextContainer3 />
    </BackgroundImage162>
  );
}

function ContactDetailsInfoSection3() {
  return (
    <BackgroundImage162>
      <ContactDetailsInfoSectionContainer3 />
    </BackgroundImage162>
  );
}

function ContactDetailsInfoSectionText16() {
  return (
    <BackgroundImage251 additionalClassNames={["w-[180px]"]}>
      <BackgroundImageAndText3
        text="customer_initiated_chat_ig"
        additionalClassNames={["gap-1", "w-[180px]"]}
      />
    </BackgroundImage251>
  );
}

function Parameter3() {
  return (
    <BackgroundImage108>
      <BackgroundImageAndText1 text="Source" />
      <ContactDetailsInfoSectionText16 />
    </BackgroundImage108>
  );
}

function ContactDetailsInfoSectionTextContainer4() {
  return (
    <BackgroundImage162>
      <Parameter3 />
    </BackgroundImage162>
  );
}

function ContactDetailsInfoSectionContainer4() {
  return (
    <BackgroundImage162>
      <ContactDetailsInfoSectionTextContainer4 />
    </BackgroundImage162>
  );
}

function ContactDetailsInfoSection4() {
  return (
    <BackgroundImage162>
      <ContactDetailsInfoSectionContainer4 />
    </BackgroundImage162>
  );
}

function ContactDetailsInfo() {
  return (
    <BackgroundImage180>
      <ContactDetailsInfoHeader />
      <ContactDetailsInfoSection />
      <ContactDetailsInfoSection2 />
      <ContactDetailsInfoSection3 />
      <ContactDetailsInfoSection4 />
    </BackgroundImage180>
  );
}

function ContactDetailsInfoContainer() {
  return (
    <BackgroundImage15>
      <ContactDetailsInfo />
    </BackgroundImage15>
  );
}

function AddressBook() {
  return (
    <BackgroundImage75>
      <g id="Address Book">
        <path
          d={svgPaths.p1a037180}
          fill="var(--fill-0, #848A86)"
          id="Vector"
        />
      </g>
    </BackgroundImage75>
  );
}

function ContactDetailsAttributesTextContainer() {
  return (
    <BackgroundImage126>
      <AddressBook />
      <BackgroundImageAndText text="Contact Attributes" />
    </BackgroundImage126>
  );
}

function ContactDetailsAttributesActions() {
  return (
    <BackgroundImage251>
      <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="flex-none rotate-[180deg]">
            <BackgroundImage />
          </div>
        </div>
      </div>
    </BackgroundImage251>
  );
}

function ContactDetailsAttributesHeader() {
  return (
    <BackgroundImage91>
      <ContactDetailsAttributesTextContainer />
      <ContactDetailsAttributesActions />
    </BackgroundImage91>
  );
}

function ContactDetailsAttributesItemTextContainer() {
  return (
    <BackgroundImage198>
      <BackgroundImageAndText1 text="tracking_url" />
    </BackgroundImage198>
  );
}

function ContactDetailsAttributesItemText3() {
  return (
    <BackgroundImage234>
      <BackgroundImageAndText3
        text="www.thisisit.com/tac..."
        additionalClassNames={["gap-2.5", "w-full"]}
      />
    </BackgroundImage234>
  );
}

function Parameter4() {
  return (
    <BackgroundImage108>
      <ContactDetailsAttributesItemTextContainer />
      <ContactDetailsAttributesItemText3 />
    </BackgroundImage108>
  );
}

function ContactDetailsAttributesItem() {
  return (
    <BackgroundImage162>
      <Parameter4 />
    </BackgroundImage162>
  );
}

function ContactDetailsAttributesItemText7() {
  return (
    <BackgroundImage60>
      <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#505451] text-[14px] text-left">
        <p className="block leading-[20px]">discount code</p>
      </div>
    </BackgroundImage60>
  );
}

function ContactDetailsAttributesItemText6() {
  return (
    <BackgroundImage198>
      <ContactDetailsAttributesItemText7 />
    </BackgroundImage198>
  );
}

function ContactDetailsAttributesItemText10() {
  return (
    <div
      className="relative shrink-0"
      data-name="Contact Details Attributes Item Text 10"
    >
      <BackgroundImageAndText2
        text="HOLIDAY"
        additionalClassNames={["justify-start"]}
      />
    </div>
  );
}

function ContactDetailsAttributesItemText9() {
  return (
    <BackgroundImage234>
      <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-0 relative w-full">
        <ContactDetailsAttributesItemText10 />
      </div>
    </BackgroundImage234>
  );
}

function Parameter5() {
  return (
    <BackgroundImage108>
      <ContactDetailsAttributesItemText6 />
      <ContactDetailsAttributesItemText9 />
    </BackgroundImage108>
  );
}

function ContactDetailsAttributesItemText5() {
  return (
    <BackgroundImage162>
      <Parameter5 />
    </BackgroundImage162>
  );
}

function ContactDetailsAttributesList() {
  return (
    <BackgroundImage162>
      <ContactDetailsAttributesItem />
      <ContactDetailsAttributesItemText5 />
    </BackgroundImage162>
  );
}

function ContactDetailsAttributes() {
  return (
    <BackgroundImage180>
      <ContactDetailsAttributesHeader />
      <ContactDetailsAttributesList />
    </BackgroundImage180>
  );
}

function ContactDetailsAttributesContainer() {
  return (
    <BackgroundImage15>
      <ContactDetailsAttributes />
    </BackgroundImage15>
  );
}

function PriceTag() {
  return (
    <BackgroundImage75>
      <g id="Price Tag">
        <path
          d={svgPaths.p23ea5a00}
          fill="var(--fill-0, #848A86)"
          id="Vector"
        />
      </g>
    </BackgroundImage75>
  );
}

function ContactDetailsTagsTextContainer() {
  return (
    <BackgroundImage126>
      <PriceTag />
      <BackgroundImageAndText text="Tags" />
    </BackgroundImage126>
  );
}

function ContactDetailsTagsHeader() {
  return (
    <BackgroundImage91>
      <ContactDetailsTagsTextContainer />
      <BackgroundImage1 />
    </BackgroundImage91>
  );
}

function ContactDetailsTags() {
  return (
    <BackgroundImage180>
      <ContactDetailsTagsHeader />
    </BackgroundImage180>
  );
}

function ContactDetailsTagsContainer() {
  return (
    <BackgroundImage15>
      <ContactDetailsTags />
    </BackgroundImage15>
  );
}

function Task() {
  return (
    <BackgroundImage75>
      <g id="Task">
        <path
          d={svgPaths.p29de3cc0}
          fill="var(--fill-0, #848A86)"
          id="Vector"
        />
      </g>
    </BackgroundImage75>
  );
}

function ContactDetailsNotesTextContainer() {
  return (
    <BackgroundImage126>
      <Task />
      <BackgroundImageAndText text="Notes" />
    </BackgroundImage126>
  );
}

function ContactDetailsNotesHeader() {
  return (
    <BackgroundImage217>
      <div className="[flex-flow:wrap] box-border content-center flex gap-4 items-center justify-between p-0 relative w-full">
        <ContactDetailsNotesTextContainer />
        <BackgroundImage1 />
      </div>
    </BackgroundImage217>
  );
}

function ContactDetailsNotes() {
  return (
    <BackgroundImage180>
      <ContactDetailsNotesHeader />
    </BackgroundImage180>
  );
}

function ContactDetailsNotesContainer() {
  return (
    <BackgroundImage15>
      <ContactDetailsNotes />
    </BackgroundImage15>
  );
}

export default function ContactDetailsPanel() {
  return (
    <div
      className="bg-[#ffffff] relative size-full"
      data-name="Contact Details Panel"
    >
      <div className="absolute border-[#e7e9e8] border-[0px_0px_0px_1px] border-solid bottom-0 left-[-1px] pointer-events-none right-0 top-0" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start px-0 py-3 relative size-full">
          <ContactDetailsHeader />
          <ContactDetailsPanelLineBackgroundImage />
          <ContactDetailsInfoContainer />
          <ContactDetailsPanelLineBackgroundImage />
          <ContactDetailsAttributesContainer />
          <ContactDetailsPanelLineBackgroundImage />
          <ContactDetailsTagsContainer />
          <ContactDetailsPanelLineBackgroundImage />
          <ContactDetailsNotesContainer />
        </div>
      </div>
    </div>
  );
}