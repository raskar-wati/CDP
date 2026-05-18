import React from 'react';
import svgPaths from "./svg-xvihh3dwek";
import clsx from "clsx";
import Container1 from "./Container";
import MessengerContainer from "./Container-4033-259";
import SMSContainer from "./Container-4050-541";
import { SignalValueLine } from '../components/SignalValueLine';

interface SmartFilter {
  id: string;
  name: string;
  description: string;
  count: number;
  priority: number;
  icon: string;
  color: string;
  chatIds: string[];
}

/** Journey stage signals — the only ones that appear as pills on conversation items. */
const JOURNEY_STAGES = new Set([
  'New inquiry', 'Interested', 'Evaluating', 'Negotiating',
  'Ready to buy', 'Converted', 'Churned',
]);

interface ConversationProps {
  chat: {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    timestamp: string;
    status: string;
    channel: string;
    isOnline: boolean;
    unread: boolean;
    category: string;
    productInterest?: string[];
  };
  isSelected: boolean;
  onClick: () => void;
  selectedChannel?: string;
  bulkReplyMode?: boolean;
  isSelectedForBulk?: boolean;
  onToggleSelection?: () => void;
  smartFilters?: SmartFilter[];
  selectedFilter?: string;
  isSmartModeActive?: boolean;
  activeProductFilter?: string | null;
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0">
      <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start p-0 relative">
        {children}
      </div>
    </div>
  );
}

type WrapperProps = {
  additionalClassNames?: string[];
};

function Wrapper({
  children,
  additionalClassNames = [],
}: React.PropsWithChildren<WrapperProps>) {
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

function ConversationAvatar({ selectedChannel }: { selectedChannel?: string }) {
  // For Instagram conversations, use the Instagram avatar
  if (selectedChannel === 'Instagram') {
    return (
      <div className="relative shrink-0 size-8" data-name="Avatars">
        <Container1 />
      </div>
    );
  }

  // For Messenger conversations, use the Messenger avatar
  if (selectedChannel === 'Messenger') {
    return (
      <div className="relative shrink-0 size-8" data-name="Avatars">
        <MessengerContainer />
      </div>
    );
  }

  // For SMS and RCS conversations, use the SMS avatar
  if (selectedChannel === 'SMS' || selectedChannel === 'RCS') {
    return (
      <div className="relative shrink-0 size-8" data-name="Avatars">
        <SMSContainer />
      </div>
    );
  }

  // For all other conversations (WhatsApp, etc.), use the default WhatsApp avatar
  return (
    <div className="relative shrink-0 size-8" data-name="Avatars">
      <div className="absolute bottom-[-1.625%] left-0 right-[-1.625%] top-0">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 33 33"
        >
          <g id="Avatars">
            <path
              d={svgPaths.p4f1e480}
              fill="url(#paint0_linear_25_3495)"
              id="Vector"
            />
            <path
              d={svgPaths.p53137f0}
              fill="#23A455"
              id="Vector_2"
            />
            <path
              d={svgPaths.p3b02aa80}
              id="Vector_3"
              stroke="#23A455"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
            <g id="Whatsapp logo">
              <rect
                fill="white"
                height="11"
                rx="5.5"
                width="11"
                x="20.5"
                y="20.5"
              />
              <rect
                height="11"
                rx="5.5"
                stroke="white"
                width="11"
                x="20.5"
                y="20.5"
              />
              <path
                d={svgPaths.p371dbc00}
                fill="#2CB742"
                id="Vector_4"
                stroke="white"
              />
            </g>
          </g>
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint0_linear_25_3495"
              x1="16"
              x2="16"
              y1="0"
              y2="32"
            >
              <stop stopColor="#E0FFDE" />
              <stop offset="1" stopColor="#D0DFCF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function HeadsetIcon() {
  return (
    <Wrapper>
      <g id="Headset">
        <path d={svgPaths.p4357980} fill="#545454" id="Vector" />
      </g>
    </Wrapper>
  );
}

function AgentStatus({ agentName }: { agentName: string }) {
  return (
    <Wrapper1>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <HeadsetIcon />
        </div>
      </div>
      <div className="font-['Inter:Regular',_sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#888888] text-[12px] text-nowrap text-right">
        <p className="block leading-[20px] whitespace-pre">{agentName}</p>
      </div>
    </Wrapper1>
  );
}

function ChatItemName({ name, agentName }: { name: string; agentName: string }) {
  return (
    <div className="relative shrink-0" data-name="Chat Item Name">
      <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-0 relative">
        <div className="font-['Inter:Bold',_sans-serif] font-bold leading-[0] not-italic relative shrink-0 text-[#333333] text-[14px] text-left text-nowrap">
          <p className="block leading-[20px] whitespace-pre font-semibold">{name}</p>
        </div>
        <div className="flex h-[6px] items-center justify-center relative shrink-0 w-[0px]">
          <div className="flex-none rotate-[90deg]">
            <div className="h-0 relative w-1.5" data-name="Line">
              <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 6 1"
                >
                  <line
                    id="Line"
                    opacity="0.4"
                    stroke="#1B1D1C"
                    strokeLinecap="round"
                    x1="0.5"
                    x2="5.5"
                    y1="0.5"
                    y2="0.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <AgentStatus agentName={agentName} />
      </div>
    </div>
  );
}

function MessagePreview({ message, name }: { message: string; name: string }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="box-border content-stretch flex flex-col gap-0.5 items-start justify-start p-0 relative w-full">
        <div className="relative shrink-0 w-full">
          <div className="box-border content-stretch flex flex-row gap-[138px] items-center justify-start p-0 relative w-full">
            <ChatItemName name={name} agentName="John Melvis" />
          </div>
        </div>
        <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#333333] text-[14px] text-left text-nowrap w-full">
          <p className="block leading-[20px] text-[12px] truncate">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatusLabel({ status, stageName }: { status: string; stageName?: string }) {
  // If we have a stage name (CDP/Smart Label view), use muted colors based on the stage
  const getStageColor = (stage: string) => {
    switch (stage) {
      // Priority 1: Urgency/Severity Signals
      case 'Escalated':
        return 'bg-orange-50 text-orange-600';
      case 'Ready to buy':
        return 'bg-green-50 text-green-600';
      case 'Drop off risk':
        return 'bg-yellow-50 text-yellow-600';
      // Priority 2: Awaiting Reply
      case 'Awaiting Reply':
        return 'bg-indigo-50 text-indigo-600';
      // Priority 3: Buying Journey Stages
      case 'Negotiating':
        return 'bg-purple-50 text-purple-600';
      case 'Evaluating':
        return 'bg-blue-50 text-blue-600';
      case 'Interested':
        return 'bg-cyan-50 text-cyan-600';
      case 'Converted':
        return 'bg-teal-50 text-teal-600';
      // Priority 4: Uncategorised
      case 'Uncategorised':
        return 'bg-gray-50 text-gray-500';
      case 'Likely Spam':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-[#E2F5D4] text-green-700';
      case 'Solved':
        return 'bg-[#CFF0FD] text-[#284E5E]';
      case 'Broadcast':
        return 'bg-[#d3f5ed] text-[#087d62]';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const displayText = stageName || status;
  const colorClass = stageName ? getStageColor(stageName) : getStatusColor(status);

  return (
    <div className={`relative rounded shrink-0 ${colorClass}`}>
      <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-row gap-1 items-center justify-center px-2 py-0.5 relative">
          <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-left text-nowrap">
            <p className="block leading-[16px] whitespace-pre">{displayText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeAndStatus({ status, timestamp, stageName }: { status: string; timestamp: string; stageName?: string }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative w-full">
        <StatusLabel status={status} stageName={stageName} />
        <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#a1a1a1] text-[12px] text-nowrap text-right">
          <p className="block leading-[16px] whitespace-pre">{timestamp}</p>
        </div>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <Wrapper additionalClassNames={["shrink-0"]}>
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
    </Wrapper>
  );
}

function ChannelIndicator({ category }: { category: string }) {
  return (
    <Wrapper1>
      <WhatsAppIcon />
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#353735] text-[12px] text-left text-nowrap">
        <p className="block leading-[16px] whitespace-pre">{category}</p>
      </div>
    </Wrapper1>
  );
}

function BackArrowIcon() {
  return (
    <div className="relative shrink-0 size-3">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 12 12"
      >
        <g id="Frame">
          <path
            d="M4.5 7L2 4.5L4.5 2"
            stroke="#505451"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={svgPaths.pc63e000}
            stroke="#505451"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}

function ChannelFooter({ category, selectedChannel }: { category: string; selectedChannel?: string }) {
  // Hide for Instagram, Messenger, SMS, and RCS - only show for WhatsApp
  if (selectedChannel === 'Instagram' || selectedChannel === 'Messenger' || selectedChannel === 'SMS' || selectedChannel === 'RCS') {
    return null;
  }

  return (
    <div className="relative shrink-0 w-full">
      <div className="box-border content-stretch flex flex-row gap-1 items-center justify-end p-0 relative w-full">
        <ChannelIndicator category={category} />
        <BackArrowIcon />
      </div>
    </div>
  );
}

function ChatDetails({
  chat,
  selectedChannel,
  smartFilters,
  activeProductFilter,
}: {
  chat: ConversationProps['chat'];
  selectedChannel?: string;
  smartFilters?: SmartFilter[];
  activeProductFilter?: string | null;
}) {
  // Find the highest-priority journey stage signal for this chat
  const journeyStage = smartFilters
    ?.filter(f => f.chatIds.includes(chat.id) && JOURNEY_STAGES.has(f.name))
    .sort((a, b) => b.priority - a.priority)[0]?.name;

  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative w-full">
        <MessagePreview message={chat.lastMessage} name={chat.name} />

        {/* Pills row: journey stage + status badge on the same line */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {journeyStage && <StatusLabel status={chat.status} stageName={journeyStage} />}
          <StatusLabel status={chat.status} />
        </div>

        {/* Product interest line — below pills, hidden when a product filter is active */}
        {chat.productInterest && chat.productInterest.length > 0 && !activeProductFilter && (
          <SignalValueLine label="Interested in" values={chat.productInterest} />
        )}

        {/* Timestamp — right-aligned on its own line */}
        <div className="w-full flex justify-end">
          <span className="font-['Inter:Regular',_sans-serif] font-normal text-[#a1a1a1] text-[12px] leading-[16px]">
            {chat.timestamp}
          </span>
        </div>

        <ChannelFooter category={chat.category} selectedChannel={selectedChannel} />
      </div>
    </div>
  );
}

export default function ConversationListUnselected({
  chat,
  isSelected,
  onClick,
  selectedChannel,
  bulkReplyMode = false,
  isSelectedForBulk = false,
  onToggleSelection,
  smartFilters,
  selectedFilter,
  isSmartModeActive = false,
  activeProductFilter = null,
}: ConversationProps) {

  const handleClick = () => {
    if (bulkReplyMode && onToggleSelection) {
      onToggleSelection();
    } else {
      onClick();
    }
  };

  return (
    <div
      className={`relative cursor-pointer transition-colors hover:bg-gray-50 ${
        isSelected && !bulkReplyMode ? 'border-l-4' : ''
      } ${bulkReplyMode && isSelectedForBulk ? 'bg-purple-50 border-l-4 border-purple-500' : ''}`}
      style={isSelected && !bulkReplyMode ? {
        backgroundColor: '#F1FFFA',
        borderLeftColor: '#00E784',
      } : bulkReplyMode && isSelectedForBulk ? {
        backgroundColor: '#faf5ff',
        borderLeftColor: '#a855f7',
      } : {
        backgroundColor: '#ffffff',
      }}
      onClick={handleClick}
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-[12px] relative size-full">
          {/* Bulk selection checkbox */}
          {bulkReplyMode && (
            <div className="flex items-center justify-center mt-1">
              <input
                type="checkbox"
                checked={isSelectedForBulk}
                onChange={onToggleSelection}
                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <ConversationAvatar selectedChannel={selectedChannel} />
          <ChatDetails
            chat={chat}
            selectedChannel={selectedChannel}
            smartFilters={smartFilters}
            activeProductFilter={activeProductFilter}
          />
        </div>
      </div>
      {/* Bottom border divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ backgroundColor: '#F4F1ED' }}
      />
    </div>
  );
}