import React, { useState } from 'react';
import svgPaths from "../imports/svg-igbqms1wb4";
import clsx from "clsx";
import imgFlag from "figma:asset/cb2758ed1f7b6efb95b7f6bf90672aac0488acae.png";

interface ContactInfoProps {
  contact: {
    name: string;
    phoneNumber: string;
    displayName: string;
    username: string;
    source: string;
    attributes: {
      [key: string]: any;
    };
  };
  onClose?: () => void;
  isMobile?: boolean;
  onOpenContact360?: () => void;
}

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
      <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative w-full">
        <div className="flex flex-row gap-1 items-center justify-start w-full">
          {children}
        </div>
        {/* Tags Input and Display Section */}
        <div className="w-full space-y-2 hidden">
          <input
            type="text"
            placeholder="Add a tag..."
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                const tagValue = e.currentTarget.value.trim();
                const existingTags = e.currentTarget.closest('.w-full')?.querySelector('.tags-container')?.children || [];
                const tagExists = Array.from(existingTags).some(tag => 
                  tag.textContent?.includes(tagValue)
                );
                
                if (!tagExists) {
                  const tagsContainer = e.currentTarget.closest('.w-full')?.querySelector('.tags-container');
                  if (tagsContainer) {
                    const newTag = document.createElement('div');
                    newTag.className = 'inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs';
                    newTag.innerHTML = `
                      <span>${tagValue}</span>
                      <button 
                        onclick="this.parentElement.remove()" 
                        class="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                        type="button"
                      >
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                        </svg>
                      </button>
                    `;
                    tagsContainer.appendChild(newTag);
                  }
                }
                e.currentTarget.value = '';
              }
            }}
          />
          {/* Tags Container */}
          <div className="tags-container flex flex-wrap gap-1">
            {/* Default AI-generated tags */}
            <div className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              <span>VIP</span>
              <button 
                onClick={(e) => e.currentTarget.parentElement?.remove()} 
                className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                type="button"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
            <div className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              <span>Hot lead</span>
              <button 
                onClick={(e) => e.currentTarget.parentElement?.remove()} 
                className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                type="button"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
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
    <BackgroundImage251 additionalClassNames={["min-w-[100px] max-w-[140px]"]}>
      <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative w-full">
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
      <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start px-0 py-0 relative w-full">
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

function DropdownIcon({ isExpanded }: { isExpanded: boolean }) {
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
          transform={isExpanded ? "rotate(180 8 8)" : ""}
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
      <div className="basis-0 grow leading-normal min-h-px min-w-px relative shrink-0 text-foreground break-words">
        <p>{text}</p>
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
      <div className="leading-[0] relative shrink-0 text-foreground break-words">
        <p>{text}</p>
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
    <div className="relative flex-1 min-w-0">
      <BackgroundImageAndText2
        text={text}
        additionalClassNames={["justify-start"]}
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
      <div className="basis-0 grow leading-[0] min-h-px min-w-px relative shrink-0 text-muted-foreground break-words">
        <label className="text-sm font-normal">{text}</label>
      </div>
    </BackgroundImage60>
  );
}

type BackgroundImageAndTextProps = {
  text: string;
};

function BackgroundImageAndText({ text }: BackgroundImageAndTextProps) {
  return (
    <BackgroundImage251>
      <div className="box-border content-stretch flex flex-col items-end justify-start p-0 relative">
        <div className="leading-[0] relative shrink-0 text-foreground w-full">
          <h4 className="text-sm">{text}</h4>
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

function ContactDetailsName({ name }: { name: string }) {
  return (
    <BackgroundImage251 additionalClassNames={["flex-1"]}>
      <div className="box-border content-stretch flex flex-col items-start justify-end p-0 relative w-full">
        <div className="leading-[0] relative shrink-0 text-foreground break-words">
          <h3>{name}</h3>
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

function ContactDetailsHeaderText({ name }: { name: string }) {
  return (
    <BackgroundImage234>
      <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative w-full">
        <ContactDetailsName name={name} />
        <ContactDetailsIcon />
      </div>
    </BackgroundImage234>
  );
}

function ContactDetailsHeaderTextContainer({ name }: { name: string }) {
  return (
    <BackgroundImage234>
      <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative w-full">
        <ContactDetailsHeaderText name={name} />
      </div>
    </BackgroundImage234>
  );
}

function ContactDetailsHeaderContainer({ name }: { name: string }) {
  return (
    <BackgroundImage108>
      <Avatars />
      <ContactDetailsHeaderTextContainer name={name} />
    </BackgroundImage108>
  );
}

function ContactDetailsHeader({ name }: { name: string }) {
  return (
    <BackgroundImage30>
      <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-0 py-px relative w-full">
        <ContactDetailsHeaderContainer name={name} />
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

function ContactDetailsInfoHeader({ 
  isExpanded, 
  onToggle 
}: { 
  isExpanded: boolean; 
  onToggle: () => void; 
}) {
  return (
    <BackgroundImage91>
      <ContactDetailsInfoTextContainer />
      <div className="flex items-center justify-center relative shrink-0 cursor-pointer" onClick={onToggle}>
        <DropdownIcon isExpanded={isExpanded} />
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
      <div className="absolute leading-[0] left-[-2px] text-[#bfbfbf] text-[16.5px] text-left top-8 w-[246px]">
        <p className="text-xs">(+1)</p>
      </div>
    </div>
  );
}

function Copy({ onCopy }: { onCopy: () => void }) {
  return (
    <BackgroundImage45 additionalClassNames={["shrink-0"]}>
      <g id="Copy" className="cursor-pointer" onClick={onCopy}>
        <path d={svgPaths.p15722080} fill="var(--fill-0, #848A86)" id="Shape" />
      </g>
    </BackgroundImage45>
  );
}

function Button({ onCopy }: { onCopy: () => void }) {
  return (
    <BackgroundImage144 additionalClassNames={["rounded-lg"]}>
      <Copy onCopy={onCopy} />
    </BackgroundImage144>
  );
}

function ContactDetailsInfoSectionText3({ phoneNumber }: { phoneNumber: string }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(phoneNumber);
  };

  return (
    <div className="flex items-center gap-1 flex-1 min-w-0">
      <Flag />
      <div className="leading-[0] relative flex-1 min-w-0 text-foreground break-words">
        <p>{phoneNumber}</p>
      </div>
      <Button onCopy={copyToClipboard} />
    </div>
  );
}

function Parameter({ phoneNumber }: { phoneNumber: string }) {
  return (
    <BackgroundImage108>
      <BackgroundImageAndText1 text="Phone Number" />
      <ContactDetailsInfoSectionText3 phoneNumber={phoneNumber} />
    </BackgroundImage108>
  );
}

function ContactDetailsInfoSectionTextContainer({ phoneNumber }: { phoneNumber: string }) {
  return (
    <BackgroundImage162>
      <Parameter phoneNumber={phoneNumber} />
    </BackgroundImage162>
  );
}

function ContactDetailsInfoSectionContainer({ phoneNumber }: { phoneNumber: string }) {
  return (
    <BackgroundImage162>
      <ContactDetailsInfoSectionTextContainer phoneNumber={phoneNumber} />
    </BackgroundImage162>
  );
}

function ContactDetailsInfoSection({ phoneNumber }: { phoneNumber: string }) {
  return (
    <BackgroundImage162>
      <ContactDetailsInfoSectionContainer phoneNumber={phoneNumber} />
    </BackgroundImage162>
  );
}

function Parameter1({ displayName }: { displayName: string }) {
  return (
    <BackgroundImage108>
      <BackgroundImageAndText1 text="Display name" />
      <ContactdetailsinfosectiontextBackgroundImageAndText text={displayName} />
    </BackgroundImage108>
  );
}

function ContactDetailsInfoSectionTextContainer2({ displayName }: { displayName: string }) {
  return (
    <BackgroundImage162>
      <Parameter1 displayName={displayName} />
    </BackgroundImage162>
  );
}

function ContactDetailsInfoSectionContainer2({ displayName }: { displayName: string }) {
  return (
    <BackgroundImage162>
      <ContactDetailsInfoSectionTextContainer2 displayName={displayName} />
    </BackgroundImage162>
  );
}

function ContactDetailsInfoSection2({ displayName }: { displayName: string }) {
  return (
    <BackgroundImage162>
      <ContactDetailsInfoSectionContainer2 displayName={displayName} />
    </BackgroundImage162>
  );
}

function Parameter2({ username }: { username: string }) {
  return (
    <BackgroundImage108>
      <BackgroundImageAndText1 text="Username" />
      <ContactdetailsinfosectiontextBackgroundImageAndText text={username} />
    </BackgroundImage108>
  );
}

function ContactDetailsInfoSectionTextContainer3({ username }: { username: string }) {
  return (
    <BackgroundImage162>
      <Parameter2 username={username} />
    </BackgroundImage162>
  );
}

function ContactDetailsInfoSectionContainer3({ username }: { username: string }) {
  return (
    <BackgroundImage162>
      <ContactDetailsInfoSectionTextContainer3 username={username} />
    </BackgroundImage162>
  );
}

function ContactDetailsInfoSection3({ username }: { username: string }) {
  return (
    <BackgroundImage162>
      <ContactDetailsInfoSectionContainer3 username={username} />
    </BackgroundImage162>
  );
}

function ContactDetailsInfoSectionText16({ source }: { source: string }) {
  return (
    <BackgroundImage251 additionalClassNames={["flex-1", "min-w-0"]}>
      <BackgroundImageAndText3
        text={source}
        additionalClassNames={["gap-1", "w-full"]}
      />
    </BackgroundImage251>
  );
}

function Parameter3({ source }: { source: string }) {
  return (
    <BackgroundImage108>
      <BackgroundImageAndText1 text="Source" />
      <ContactDetailsInfoSectionText16 source={source} />
    </BackgroundImage108>
  );
}

function ContactDetailsInfoSectionTextContainer4({ source }: { source: string }) {
  return (
    <BackgroundImage162>
      <Parameter3 source={source} />
    </BackgroundImage162>
  );
}

function ContactDetailsInfoSectionContainer4({ source }: { source: string }) {
  return (
    <BackgroundImage162>
      <ContactDetailsInfoSectionTextContainer4 source={source} />
    </BackgroundImage162>
  );
}

function ContactDetailsInfoSection4({ source }: { source: string }) {
  return (
    <BackgroundImage162>
      <ContactDetailsInfoSectionContainer4 source={source} />
    </BackgroundImage162>
  );
}

function ContactDetailsInfo({ 
  contact, 
  isExpanded, 
  onToggle 
}: { 
  contact: ContactInfoProps['contact']; 
  isExpanded: boolean; 
  onToggle: () => void; 
}) {
  return (
    <BackgroundImage180>
      <ContactDetailsInfoHeader isExpanded={isExpanded} onToggle={onToggle} />
      {isExpanded && (
        <>
          <ContactDetailsInfoSection phoneNumber={contact.phoneNumber} />
          <ContactDetailsInfoSection2 displayName={contact.displayName} />
          <ContactDetailsInfoSection3 username={contact.username} />
          <ContactDetailsInfoSection4 source={contact.source} />
        </>
      )}
    </BackgroundImage180>
  );
}

function ContactDetailsInfoContainer({ 
  contact, 
  isExpanded, 
  onToggle 
}: { 
  contact: ContactInfoProps['contact']; 
  isExpanded: boolean; 
  onToggle: () => void; 
}) {
  return (
    <BackgroundImage15>
      <ContactDetailsInfo contact={contact} isExpanded={isExpanded} onToggle={onToggle} />
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

function ContactDetailsAttributesActions({ 
  isExpanded, 
  onToggle 
}: { 
  isExpanded: boolean; 
  onToggle: () => void; 
}) {
  return (
    <BackgroundImage251>
      <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative cursor-pointer" onClick={onToggle}>
        <DropdownIcon isExpanded={isExpanded} />
      </div>
    </BackgroundImage251>
  );
}

function ContactDetailsAttributesHeader({ 
  isExpanded, 
  onToggle 
}: { 
  isExpanded: boolean; 
  onToggle: () => void; 
}) {
  return (
    <BackgroundImage91>
      <ContactDetailsAttributesTextContainer />
      <ContactDetailsAttributesActions isExpanded={isExpanded} onToggle={onToggle} />
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
      <div className="basis-0 grow leading-[0] min-h-px min-w-px relative shrink-0 text-muted-foreground break-words">
        <label className="text-sm">discount_code</label>
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
      className="relative flex-1 min-w-0"
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

function ContactDetailsAttributes({ 
  isExpanded, 
  onToggle 
}: { 
  isExpanded: boolean; 
  onToggle: () => void; 
}) {
  return (
    <BackgroundImage180>
      <ContactDetailsAttributesHeader isExpanded={isExpanded} onToggle={onToggle} />
      {isExpanded && <ContactDetailsAttributesList />}
    </BackgroundImage180>
  );
}

function ContactDetailsAttributesContainer({ 
  isExpanded, 
  onToggle 
}: { 
  isExpanded: boolean; 
  onToggle: () => void; 
}) {
  return (
    <BackgroundImage15>
      <ContactDetailsAttributes isExpanded={isExpanded} onToggle={onToggle} />
    </BackgroundImage15>
  );
}

// ── Contact Intelligence ────────────────────────────────────────────────────

function SparkleIcon() {
  // 4-point sparkle + small accent — same #848A86 grey and 24×24 viewBox
  // as the other section icons, so Contact Intelligence reads as
  // "AI-extracted insights" without breaking the row's icon rhythm.
  return (
    <BackgroundImage75>
      <g id="Sparkle">
        <path
          d="M11 3.5 12.3 10.4 19.5 11.7 12.3 13 11 19.9 9.7 13 2.5 11.7 9.7 10.4 11 3.5Z"
          fill="var(--fill-0, #848A86)"
        />
        <path
          d="M18.5 14.5 19 16.5 21 17 19 17.5 18.5 19.5 18 17.5 16 17 18 16.5 18.5 14.5Z"
          fill="var(--fill-0, #848A86)"
        />
      </g>
    </BackgroundImage75>
  );
}

/** Small Shopify-green shopping bag with an "S" — marks a signal that
 *  was sourced from a connected Shopify store rather than extracted
 *  from conversation content. Sits beside the value in compact rows. */
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

function IntelligenceRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <BackgroundImage162>
      <BackgroundImage108>
        <BackgroundImage60>
          <div className="basis-0 grow leading-[0] min-h-px min-w-px relative shrink-0 text-muted-foreground break-words">
            <label className="text-sm font-normal">{label}</label>
          </div>
        </BackgroundImage60>
        <div className="relative flex-1 min-w-0">
          <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative">
            <div className="leading-[0] relative shrink-0 text-foreground break-words">
              {children}
            </div>
          </div>
        </div>
      </BackgroundImage108>
    </BackgroundImage162>
  );
}

function StagePill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#e8f5ee] text-[#1d8242] text-xs rounded">
      <span className="w-1.5 h-1.5 rounded-full bg-[#23a455]" />
      {label}
    </span>
  );
}

function ContactDetailsIntelligenceTextContainer() {
  return (
    <BackgroundImage126>
      <SparkleIcon />
      <BackgroundImageAndText text="Contact Intelligence" />
    </BackgroundImage126>
  );
}

function OpenInNewIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 3h7v7M13 3L6.5 9.5M11 8.5V13H3V5h4.5"
        stroke="#505451"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactDetailsIntelligenceHeader({
  isExpanded,
  onToggle,
  onOpenContact360,
}: {
  isExpanded: boolean;
  onToggle: () => void;
  onOpenContact360?: () => void;
}) {
  return (
    <BackgroundImage91>
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <ContactDetailsIntelligenceTextContainer />
        {onOpenContact360 && (
          <button
            onClick={onOpenContact360}
            title="Open Contact 360"
            aria-label="Open Contact 360"
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
          >
            <OpenInNewIcon />
          </button>
        )}
      </div>
      <div className="cursor-pointer" onClick={onToggle}>
        <DropdownIcon isExpanded={isExpanded} />
      </div>
    </BackgroundImage91>
  );
}

function ContactDetailsIntelligenceList() {
  return (
    <BackgroundImage162>
      <IntelligenceRow label="Journey stage">
        <StagePill label="Evaluating" />
      </IntelligenceRow>
      <IntelligenceRow label="Sentiment">
        <span className="inline-flex items-center gap-1">
          <p>Recovering</p>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 19V5M5 12l7-7 7 7"
              stroke="#1d8242"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </IntelligenceRow>
      <IntelligenceRow label="Urgency">
        <p>Medium</p>
      </IntelligenceRow>
      <IntelligenceRow label="Top interest">
        <span className="inline-flex items-center gap-1.5">
          <p>Vitamin C Serum</p>
          <ShopifyMark />
        </span>
      </IntelligenceRow>
      <IntelligenceRow label="Active blockers">
        <p>Price, Decision maker</p>
      </IntelligenceRow>
      <IntelligenceRow label="Last active">
        <p>3 days ago</p>
      </IntelligenceRow>
    </BackgroundImage162>
  );
}

function ContactDetailsIntelligence({
  isExpanded,
  onToggle,
  onOpenContact360,
}: {
  isExpanded: boolean;
  onToggle: () => void;
  onOpenContact360?: () => void;
}) {
  return (
    <BackgroundImage180>
      <ContactDetailsIntelligenceHeader
        isExpanded={isExpanded}
        onToggle={onToggle}
        onOpenContact360={onOpenContact360}
      />
      {isExpanded && <ContactDetailsIntelligenceList />}
    </BackgroundImage180>
  );
}

function ContactDetailsIntelligenceContainer({
  isExpanded,
  onToggle,
  onOpenContact360,
}: {
  isExpanded: boolean;
  onToggle: () => void;
  onOpenContact360?: () => void;
}) {
  return (
    <BackgroundImage15>
      <ContactDetailsIntelligence
        isExpanded={isExpanded}
        onToggle={onToggle}
        onOpenContact360={onOpenContact360}
      />
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

function ContactDetailsTagsHeader({ 
  isExpanded, 
  onToggle 
}: { 
  isExpanded: boolean; 
  onToggle: () => void; 
}) {
  return (
    <BackgroundImage91>
      <ContactDetailsTagsTextContainer />
      <div className="cursor-pointer" onClick={onToggle}>
        <DropdownIcon isExpanded={isExpanded} />
      </div>
    </BackgroundImage91>
  );
}

function ContactDetailsTags({ 
  isExpanded, 
  onToggle 
}: { 
  isExpanded: boolean; 
  onToggle: () => void; 
}) {
  return (
    <BackgroundImage180>
      <ContactDetailsTagsHeader isExpanded={isExpanded} onToggle={onToggle} />
    </BackgroundImage180>
  );
}

function ContactDetailsTagsContainer({ 
  isExpanded, 
  onToggle 
}: { 
  isExpanded: boolean; 
  onToggle: () => void; 
}) {
  return (
    <BackgroundImage15>
      <ContactDetailsTags isExpanded={isExpanded} onToggle={onToggle} />
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

function ContactDetailsNotesHeader({ 
  isExpanded, 
  onToggle 
}: { 
  isExpanded: boolean; 
  onToggle: () => void; 
}) {
  return (
    <BackgroundImage217>
      <div className="[flex-flow:wrap] box-border content-center flex gap-4 items-center justify-between p-0 relative w-full">
        <ContactDetailsNotesTextContainer />
        <div className="cursor-pointer" onClick={onToggle}>
          <DropdownIcon isExpanded={isExpanded} />
        </div>
      </div>
    </BackgroundImage217>
  );
}

function ContactDetailsNotes({ 
  isExpanded, 
  onToggle 
}: { 
  isExpanded: boolean; 
  onToggle: () => void; 
}) {
  return (
    <BackgroundImage180>
      <ContactDetailsNotesHeader isExpanded={isExpanded} onToggle={onToggle} />
    </BackgroundImage180>
  );
}

function ContactDetailsNotesContainer({ 
  isExpanded, 
  onToggle 
}: { 
  isExpanded: boolean; 
  onToggle: () => void; 
}) {
  return (
    <BackgroundImage15>
      <ContactDetailsNotes isExpanded={isExpanded} onToggle={onToggle} />
    </BackgroundImage15>
  );
}

// ── Order Context (Shopify) ─────────────────────────────────────────────────
//
// The PRD describes the agent moment:
//   Customer asks "Where is my order?"
//   Agent should instantly see: order #, total, status, tracking link.
//
// This section surfaces that block in the right-hand contact panel, plus a
// quick customer-value summary and cart status (active or abandoned).
// Source: connected Shopify store — every value here carries the Shopify
// mark in the heading so it reads as integration-sourced, not extracted.

type OrderStatus = 'Shipped' | 'Fulfilled' | 'Paid' | 'Pending' | 'Cancelled' | 'Refunded';
type CartState = 'active' | 'abandoned';

interface OrderProductLine {
  title: string;
  qty: number;
  variant?: string;
}

interface LastOrder {
  number: string;
  date: string;
  total: string;
  status: OrderStatus;
  products: OrderProductLine[];
  discount?: { code: string; amount: string };
  shipping?: {
    carrier: string;
    trackingNumber: string;
    trackingUrl: string;
  };
}

interface CartSnapshot {
  state: CartState;
  total: string;
  items: OrderProductLine[];
  /** Pre-formatted relative timestamp: "2h ago", "Yesterday", "Today" */
  age: string;
}

interface OrderContext {
  totalOrders: number;
  lifetimeSpend: string;
  averageOrderValue: string;
  lastOrder?: LastOrder;
  cart?: CartSnapshot;
}

/** Mock orders keyed by contact phone number. A real implementation would
 *  hydrate from CXDP using the contact's Shopify customer_id. */
const ORDER_CONTEXTS: Record<string, OrderContext> = {
  // Amira: no orders yet, active cart (matches her Contact 360 profile)
  '+621234567890': {
    totalOrders: 0,
    lifetimeSpend: 'Rp 0',
    averageOrderValue: '—',
    cart: {
      state: 'abandoned',
      total: 'Rp 285,000',
      age: '2h ago',
      items: [
        { title: 'Vitamin C Serum', qty: 1, variant: '50ml' },
        { title: 'SPF 50 Moisturizer', qty: 1 },
      ],
    },
  },
  // Default "rich customer" shown when no specific mapping exists — gives the
  // demo a meaningful order block for the screenshot scenario from the PRD.
  default: {
    totalOrders: 3,
    lifetimeSpend: 'Rp 1,240,000',
    averageOrderValue: 'Rp 413,333',
    lastOrder: {
      number: 'NEHK16031',
      date: '8 Jun 2026',
      total: 'Rp 425,000',
      status: 'Shipped',
      products: [
        { title: 'Vitamin C Serum', qty: 1, variant: '50ml' },
        { title: 'Hydrating Toner', qty: 2 },
      ],
      discount: { code: 'NEWBIE10', amount: '−Rp 42,500' },
      shipping: {
        carrier: 'SF Express',
        trackingNumber: 'SF3267493117925',
        trackingUrl: '#',
      },
    },
  },
};

function getOrderContext(contact: ContactInfoProps['contact']): OrderContext | null {
  // Normalize the phone number to a lookup key — strip spaces/parens
  const key = contact.phoneNumber.replace(/[^\d+]/g, '');
  return ORDER_CONTEXTS[key] ?? ORDER_CONTEXTS.default ?? null;
}

function PackageGlyph() {
  // Box / parcel icon — provided 16×16 SVG, wrapped in the shared
  // BackgroundImage75 (24×24 viewBox) and uniformly scaled 1.5× so it
  // sits at the same visual weight, baseline, and #848A86 grey as the
  // other section icons (Sparkle, PriceTag, Task) in the panel.
  return (
    <BackgroundImage75>
      <g id="Package" transform="scale(1.5)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.92306 1.37867C7.61627 1.11206 8.38373 1.11206 9.07694 1.37867L14.0385 3.28696C14.6178 3.50976 15 4.06632 15 4.68697V11.3134C15 11.934 14.6178 12.4906 14.0385 12.7134L9.07694 14.6217C8.38373 14.8883 7.61627 14.8883 6.92306 14.6217L1.96153 12.7134C1.38224 12.4906 1 11.934 1 11.3134V4.68697C1 4.06632 1.38224 3.50976 1.96153 3.28696L6.92306 1.37867ZM8.71796 2.31202C8.25582 2.13427 7.74418 2.13427 7.28204 2.31202L5.89757 2.84451L11.4885 4.96107L13.4357 4.12655L8.71796 2.31202ZM14 4.9727L8.5 7.32984V13.7581C8.5736 13.7391 8.64637 13.7159 8.71796 13.6883L13.6795 11.78C13.8726 11.7058 14 11.5203 14 11.3134V4.9727ZM7.5 13.7581V7.32984L2 4.9727V11.3134C2 11.5203 2.12741 11.7058 2.32051 11.78L7.28204 13.6883C7.35363 13.7159 7.4264 13.7391 7.5 13.7581ZM2.56425 4.12655L8 6.45616L10.1638 5.52882L4.49652 3.38337L2.56425 4.12655Z"
          fill="var(--fill-0, #848A86)"
        />
      </g>
    </BackgroundImage75>
  );
}

function ContactDetailsOrderTextContainer() {
  return (
    <BackgroundImage126>
      <PackageGlyph />
      <BackgroundImageAndText text="Order Context" />
      <ShopifyMark className="w-3.5 h-3.5" />
    </BackgroundImage126>
  );
}

function ContactDetailsOrderHeader({
  isExpanded,
  onToggle,
}: {
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <BackgroundImage91>
      <ContactDetailsOrderTextContainer />
      <div className="cursor-pointer" onClick={onToggle}>
        <DropdownIcon isExpanded={isExpanded} />
      </div>
    </BackgroundImage91>
  );
}

function ContactDetailsOrderList({ ctx }: { ctx: OrderContext }) {
  const order = ctx.lastOrder;
  return (
    <BackgroundImage162>
      <IntelligenceRow label="Total orders">
        <p>{ctx.totalOrders}</p>
      </IntelligenceRow>
      <IntelligenceRow label="Lifetime spend">
        <p>{ctx.lifetimeSpend}</p>
      </IntelligenceRow>
      <IntelligenceRow label="Avg order value">
        <p>{ctx.averageOrderValue}</p>
      </IntelligenceRow>
      {order && (
        <>
          <IntelligenceRow label="Last order">
            <a href="#" className="text-[#1d8242] hover:underline">
              #{order.number}
            </a>
          </IntelligenceRow>
          <IntelligenceRow label="Status">
            <p>{order.status}</p>
          </IntelligenceRow>
          <IntelligenceRow label="Order date">
            <p>{order.date}</p>
          </IntelligenceRow>
          <IntelligenceRow label="Order total">
            <p>{order.total}</p>
          </IntelligenceRow>
          {order.shipping && (
            <IntelligenceRow label="Tracking">
              <a
                href={order.shipping.trackingUrl}
                className="text-[#1d8242] hover:underline"
              >
                {order.shipping.trackingNumber}
              </a>
            </IntelligenceRow>
          )}
        </>
      )}
      {ctx.cart && (
        <IntelligenceRow label="Cart status">
          <p>
            {ctx.cart.state === 'abandoned' ? 'Abandoned' : 'Active'} · {ctx.cart.total}
          </p>
        </IntelligenceRow>
      )}
    </BackgroundImage162>
  );
}

function ContactDetailsOrderContext({
  contact,
  isExpanded,
  onToggle,
}: {
  contact: ContactInfoProps['contact'];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const ctx = getOrderContext(contact);
  // If the contact has no Shopify connection at all, the section is hidden
  // entirely so we don't show empty Shopify scaffolding for non-Shopify
  // merchants. `null` from getOrderContext = no Shopify data.
  if (!ctx) return null;

  return (
    <BackgroundImage180>
      <ContactDetailsOrderHeader isExpanded={isExpanded} onToggle={onToggle} />
      {isExpanded && <ContactDetailsOrderList ctx={ctx} />}
    </BackgroundImage180>
  );
}

export function ContactInfo({ contact, onClose, isMobile = false, onOpenContact360 }: ContactInfoProps) {
  const [isContactInfoExpanded, setIsContactInfoExpanded] = useState(true);
  const [isAttributesExpanded, setIsAttributesExpanded] = useState(true);
  const [isIntelligenceExpanded, setIsIntelligenceExpanded] = useState(true);
  const [isOrderExpanded, setIsOrderExpanded] = useState(true);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);

  return (
    <div
      className="bg-[#ffffff] relative size-full"
      data-name="Contact Details Panel"
    >
      <div className="absolute border-[#e7e9e8] border-[0px_0px_0px_1px] border-solid bottom-0 left-[-1px] pointer-events-none right-0 top-0" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start px-4 py-3 relative size-full">
          <ContactDetailsHeader name={contact.name} />
          <ContactDetailsPanelLineBackgroundImage />
          <ContactDetailsInfoContainer 
            contact={contact} 
            isExpanded={isContactInfoExpanded} 
            onToggle={() => setIsContactInfoExpanded(!isContactInfoExpanded)} 
          />
          <ContactDetailsPanelLineBackgroundImage />
          <ContactDetailsAttributesContainer
            isExpanded={isAttributesExpanded}
            onToggle={() => setIsAttributesExpanded(!isAttributesExpanded)}
          />
          <ContactDetailsPanelLineBackgroundImage />
          <ContactDetailsIntelligenceContainer
            isExpanded={isIntelligenceExpanded}
            onToggle={() => setIsIntelligenceExpanded(!isIntelligenceExpanded)}
            onOpenContact360={onOpenContact360}
          />
          <ContactDetailsPanelLineBackgroundImage />
          <ContactDetailsOrderContext
            contact={contact}
            isExpanded={isOrderExpanded}
            onToggle={() => setIsOrderExpanded(!isOrderExpanded)}
          />
          <ContactDetailsPanelLineBackgroundImage />
          <ContactDetailsTagsContainer
            isExpanded={isTagsExpanded} 
            onToggle={() => setIsTagsExpanded(!isTagsExpanded)} 
          />
          <ContactDetailsPanelLineBackgroundImage />
          <ContactDetailsNotesContainer 
            isExpanded={isNotesExpanded} 
            onToggle={() => setIsNotesExpanded(!isNotesExpanded)} 
          />
        </div>
      </div>
    </div>
  );
}