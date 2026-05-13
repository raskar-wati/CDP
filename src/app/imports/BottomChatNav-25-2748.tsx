import React from 'react';
import svgPaths from "./svg-mgoudhpi27";

// Simplified icon wrapper for consistent sizing
function IconWrapper({ children, size = "size-5" }: { children: React.ReactNode; size?: string }) {
  return (
    <div className={`relative shrink-0 ${size}`}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}

// Channel indicator with WhatsApp icon and Sales label
function ChannelIndicator() {
  return (
    <div className="relative shrink-0">
      <div className="flex flex-row gap-0.5 items-center">
        <div className="relative size-4">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <g id="WhatsApp">
              <path
                clipRule="evenodd"
                d={svgPaths.p2fd5d080}
                fill="white"
                fillRule="evenodd"
              />
              <path
                clipRule="evenodd"
                d={svgPaths.p33ae7500}
                fill="white"
                fillRule="evenodd"
              />
              <path
                clipRule="evenodd"
                d={svgPaths.pabcc840}
                fill="#CFD8DC"
                fillRule="evenodd"
              />
              <path
                clipRule="evenodd"
                d={svgPaths.pa265370}
                fill="#40C351"
                fillRule="evenodd"
              />
              <path
                clipRule="evenodd"
                d={svgPaths.p3ea1cf00}
                fill="white"
                fillRule="evenodd"
              />
            </g>
          </svg>
        </div>
        <div className="font-['Inter:Regular',_sans-serif] font-normal text-[#353735] text-[12px] leading-[16px]">
          Sales
        </div>
      </div>
    </div>
  );
}

// Back arrow icon
function BackArrow() {
  return (
    <div className="flex items-center justify-center relative shrink-0">
      <div className="flex-none rotate-[180deg]">
        <div className="relative size-4">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path
              d={svgPaths.p117ac380}
              stroke="#848A86"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={svgPaths.p1a36fd80}
              stroke="#848A86"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Top header with channel and phone number
function ChatHeader() {
  return (
    <div className="bg-white relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full">
      <div className="flex flex-row items-end relative size-full">
      </div>
    </div>
  );
}

// Input placeholder text with shortcut hint
function InputPlaceholder() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row gap-1 items-start px-0 py-2 relative w-full">
        <div className="font-['Inter:Regular',_sans-serif] font-normal text-[#b7b9b7] text-[14px] leading-[20px]">
          Type your message here or 
        </div>
        <div className="flex flex-row gap-1 items-center">
          <div className="font-['Inter:Regular',_sans-serif] font-normal text-[#b7b9b7] text-[14px] leading-[20px]">
            press 
          </div>
          <div className="bg-[#f6f7f6] h-5 relative rounded-sm shrink-0">
            <div className="absolute border-[#9ca19d] border-[0px_0px_1px] border-solid bottom-[-1px] left-0 pointer-events-none right-0 rounded-sm top-0" />
            <div className="flex flex-col items-center relative size-full">
              <div className="flex flex-col h-5 items-center justify-between px-2 py-0 relative">
                <div className="font-['Inter:Regular',_sans-serif] font-normal text-[#505451] text-[14px] leading-[20px]">
                  /
                </div>
              </div>
            </div>
          </div>
          <div className="font-['Inter:Regular',_sans-serif] font-normal text-[#b7b9b7] text-[14px] leading-[20px]">
            key for quick replies.
          </div>
        </div>
      </div>
    </div>
  );
}

// Individual action icons
function ChatbotIcon() {
  return (
    <IconWrapper>
      <g id="Chatbot">
        <g>
          <path
            d={svgPaths.p3098af80}
            stroke="#353735"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
          <path
            d={svgPaths.pa539d80}
            stroke="#353735"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
        </g>
        <g>
          <path
            d={svgPaths.p3c136f80}
            stroke="#353735"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="1.2"
          />
          <path
            d={svgPaths.pcad0880}
            stroke="#353735"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="1.2"
          />
        </g>
        <path d={svgPaths.p23acc2d0} fill="#353735" />
        <line stroke="#353735" strokeWidth="1.2" x1="10.2" x2="10.2" y1="2.4" y2="5.6" />
      </g>
    </IconWrapper>
  );
}

function QuickReplyIcon() {
  return (
    <IconWrapper>
      <path d={svgPaths.p1f302180} fill="#353735" />
    </IconWrapper>
  );
}

function TemplateIcon() {
  return (
    <IconWrapper>
      <g>
        <path
          d={svgPaths.p2c6b0400}
          stroke="#353735"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        />
        <path
          d={svgPaths.p8208d00}
          stroke="#353735"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        />
        <path
          d={svgPaths.p2eaa9f00}
          stroke="#353735"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        />
      </g>
    </IconWrapper>
  );
}

function AttachIcon() {
  return (
    <IconWrapper>
      <path d={svgPaths.p3ef67500} fill="#353735" />
    </IconWrapper>
  );
}

function EmojiIcon() {
  return (
    <div className="relative shrink-0 size-5">
      <div className="absolute inset-[11.458%]">
        <div className="absolute bottom-[-4.054%] left-[-4.054%] right-[-4.054%] top-[-4.054%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path
              d={svgPaths.p192eed80}
              stroke="#353735"
              strokeMiterlimit="10"
              strokeWidth="1.25"
            />
            <path
              d="M6.83333 6H5.16667"
              stroke="#353735"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="1.25"
            />
            <path
              d="M12.25 6H10.5833"
              stroke="#353735"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="1.25"
            />
            <path
              d={svgPaths.p1ec8f320}
              stroke="#353735"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="1.25"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function StickerIcon() {
  return (
    <div className="relative shrink-0 size-5">
      <div className="absolute bottom-[11.458%] left-[13.542%] right-[9.683%] top-[11.766%]">
        <div className="absolute bottom-[-4.07%] left-[-4.07%] right-[-4.07%] top-[-4.07%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
            <path
              d={svgPaths.p28b19300}
              stroke="#353735"
              strokeMiterlimit="10"
              strokeWidth="1.25"
            />
            <path
              d={svgPaths.p395db00}
              stroke="#353735"
              strokeMiterlimit="10"
              strokeWidth="1.25"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Send button with WhatsApp icon
function SendButton() {
  return (
    <div className="bg-[#23a455] relative rounded-[5px] shrink-0">
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="flex flex-row gap-1.5 items-center px-2.5 py-1.5 relative">
          <div className="relative size-4">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p3cc4a300} fill="white" />
            </svg>
          </div>
          <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-white text-[14px] leading-[20px]">
            Send
          </div>
        </div>
      </div>
    </div>
  );
}

// Action buttons row
function ActionButtons() {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <div className="flex flex-row gap-3 items-center">
        <ChatbotIcon />
        <QuickReplyIcon />
        <TemplateIcon />
        <AttachIcon />
        <EmojiIcon />
        <StickerIcon />
      </div>
      <SendButton />
    </div>
  );
}

// Main input container
function ChatInputContainer() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col gap-2 items-center w-full">
        <InputPlaceholder />
        <ActionButtons />
      </div>
    </div>
  );
}

// Bottom navigation section
function ChatNavigation() {
  return (
    <div className="bg-white relative rounded-bl-[8px] rounded-br-[8px] shrink-0 w-full">
      <div className="absolute border-[#e7e9e8] border-[1px_0px_0px] border-solid bottom-0 left-0 pointer-events-none right-0 rounded-bl-[8px] rounded-br-[8px] top-[-1px]" />
      <div className="relative size-full">
        <div className="flex flex-col gap-3 items-start px-3 py-2 relative w-full">
          <ChatInputContainer />
        </div>
      </div>
    </div>
  );
}

// Main component
export default function BottomChatNav() {
  return (
    <div className="w-full h-[132px]">
    </div>
  );
}