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

export function ContactInfo({ contact, onClose, isMobile = false }: ContactInfoProps) {
  const [isContactInfoExpanded, setIsContactInfoExpanded] = useState(true);
  const [isAttributesExpanded, setIsAttributesExpanded] = useState(true);
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