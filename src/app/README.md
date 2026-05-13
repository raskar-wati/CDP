# Team Inbox Interface

A modern, responsive team inbox interface built with React, TypeScript, and Tailwind CSS v4. This application provides a comprehensive chat management system with multi-channel support, advanced filtering, and real-time messaging capabilities.

## 🚀 Features

### Core Functionality
- **Multi-Channel Support**: WhatsApp, Instagram, Messenger, SMS, and Broadcast channels
- **Advanced Filtering**: Filter conversations by status, assignee, channel, date range, and custom filters
- **Real-time Messaging**: Send and receive messages with timestamp tracking
- **Contact Management**: Detailed contact information panel with tracking and attributes
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Custom Filters**: Create and save custom filter combinations

### Channel-Specific Features
- **Channel-specific avatars**: Different avatar components for each channel type
- **Color-coded chat bubbles**: 
  - Instagram: `#DAD4FF`
  - Messenger: `#D9E9FF`
  - SMS: `#FDE4CF`
  - WhatsApp: Original green background
- **Channel-specific send buttons**: Unique styling and icons for each platform
- **Status indicators**: Visual status dots and chat counts per channel

### UI/UX Features
- **Text truncation**: Ellipsis for overflowing conversation messages
- **Status-based styling**: Custom colors for Solved (`#CFF0FD/#284E5E`) and Open (`#E2F5D4`) statuses
- **Collapsible sidebar**: Space-efficient navigation
- **Date range filtering**: Built-in date picker with preset ranges
- **Smooth animations**: Hover effects and transitions throughout

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Modern web browser with ES6+ support

## 🛠️ Installation

1. **Clone or download the project files**
   ```bash
   # If using git
   git clone <repository-url>
   cd team-inbox-interface
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## 🏗️ Project Structure

```
├── App.tsx                 # Main application component
├── components/             # React components
│   ├── ui/                # Reusable UI components (shadcn/ui)
│   ├── figma/             # Figma-specific components
│   ├── ChatInterface.tsx  # Main chat messaging interface
│   ├── ChatList.tsx       # Conversation list component
│   ├── ContactInfo.tsx    # Contact details panel
│   ├── Sidebar.tsx        # Navigation sidebar
│   └── ...
├── imports/               # Imported Figma components and SVGs
├── styles/
│   └── globals.css        # Global CSS with Tailwind v4 configuration
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: `#23A455` (Green)
- **Status Colors**:
  - Solved: `#CFF0FD` (background) / `#284E5E` (text)
  - Open: `#E2F5D4` (background)
- **Channel Colors**:
  - Instagram: `#DAD4FF`
  - Messenger: `#D9E9FF`
  - SMS: `#FDE4CF`
  - WhatsApp: Green (inherited)

### Typography
- **Base font size**: 14px
- **Font weights**: Normal (400), Medium (500)
- **Line height**: 1.5 for all text elements

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: ≥ 1024px

## 🔧 Configuration

### Tailwind CSS v4
The application uses Tailwind CSS v4 with custom CSS variables defined in `/styles/globals.css`. Key configurations:

- Custom color scheme with CSS variables
- Dark mode support
- Component-specific styling
- Typography system with automatic font sizing

### Component Library
- **UI Components**: Built with shadcn/ui
- **Icons**: Lucide React icons
- **Animations**: CSS transitions and hover effects

## 📱 Usage Guide

### Navigation
1. **Sidebar**: Access different filters and channel views
2. **Chat List**: Browse and select conversations
3. **Message Interface**: Send and receive messages
4. **Contact Panel**: View detailed contact information

### Filtering Conversations
- **Predefined Filters**: All Chats, Active Chats, Assigned to me, etc.
- **Channel Filters**: Filter by WhatsApp, Instagram, Messenger, SMS
- **Date Range**: Use the calendar picker for date-based filtering
- **Custom Filters**: Create complex filter combinations

### Channel-Specific Features
Each communication channel has unique styling:
- **WhatsApp**: Green theme with WhatsApp icons
- **Instagram**: Purple theme with Instagram-specific UI
- **Messenger**: Blue theme with Facebook Messenger styling
- **SMS**: Orange theme with SMS-specific components

### Responsive Behavior
- **Desktop**: Full three-panel layout (sidebar + chat list + contact info)
- **Tablet**: Collapsible sidebar, two-panel main view
- **Mobile**: Single-panel view with overlay navigation

## 🛡️ Mock Data

The application includes comprehensive mock data:
- **30+ sample conversations** across all channels
- **Realistic timestamps** and message content
- **Contact information** with attributes and tracking URLs
- **Status variety** (Open, Solved, Broadcast)

## 🧪 Development

### Key Components

#### `App.tsx`
- Main application logic
- State management for chats, filters, and UI
- Responsive layout handling
- Event handlers for user interactions

#### `ChatList.tsx`
- Conversation list with filtering
- Search functionality
- Date range selection
- Custom filter management

#### `ChatInterface.tsx`
- Message display and composition
- Channel-specific styling
- Real-time message updates

#### `ContactInfo.tsx`
- Contact details panel
- Attribute management
- Responsive design

### State Management
- React hooks for local state
- Custom hooks for responsive behavior
- Prop drilling for component communication
- Mock data with realistic timestamps

### Styling Approach
- Tailwind CSS for utility-first styling
- CSS variables for theme consistency
- Component-specific styles in globals.css
- Responsive design with breakpoint-specific behavior

## 🔍 Features in Detail

### Advanced Filtering
- **Date Range Filtering**: Select conversations from specific time periods
- **Multi-attribute Filters**: Combine status, assignee, channel, and custom criteria
- **Saved Filters**: Create and reuse custom filter combinations
- **Real-time Updates**: Filters apply instantly as you type or select options

### Channel Management
- **Unified Interface**: All channels in one cohesive interface
- **Channel Switching**: Easy navigation between different communication platforms
- **Platform-specific Features**: Each channel maintains its unique characteristics
- **Cross-channel Search**: Find conversations across all platforms

### Contact Management
- **Detailed Profiles**: Full contact information with tracking URLs
- **Attribute System**: Custom fields for contact categorization
- **Communication History**: Track all interactions with each contact
- **Integration Points**: Ready for CRM and external system integration

## 🚀 Performance

- **Optimized Rendering**: React.memo and useMemo for performance
- **Responsive Images**: Efficient loading of avatars and media
- **Smooth Animations**: Hardware-accelerated CSS transitions
- **Mobile Optimization**: Touch-friendly interface elements

## 🤝 Contributing

1. Follow the existing code structure and naming conventions
2. Use TypeScript for all new components
3. Maintain responsive design principles
4. Test across different screen sizes
5. Keep accessibility in mind for all UI elements

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues:
1. Check the component documentation in the code
2. Review the mock data structure in `App.tsx`
3. Examine the global CSS variables in `/styles/globals.css`
4. Test responsive behavior across different devices

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS v4**