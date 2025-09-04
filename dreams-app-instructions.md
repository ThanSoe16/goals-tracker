# Dreams & Goals Tracker - Application Instructions

## Overview
Build a comprehensive Dreams & Goals Tracker application that allows users to create different dream categories (like "Trip to Japan") and manage todo lists for each dream with visual progress tracking.

## Core Features

### 1. Dream Management
- **Create Dreams**: Users can add new dream categories with:
  - Custom title (e.g., "Trip to Japan", "Learn Guitar")
  - Icon/Emoji selection (🇯🇵, 🎸, etc.)
  - Color theme selection from predefined palette
- **Delete Dreams**: Option to remove entire dream categories
- **Visual Cards**: Each dream displays as an attractive card with chosen colors

### 2. Task Management
- **Add Tasks**: Input field to add new tasks to any dream
- **Mark Complete**: Clickable checkboxes to toggle task completion
- **Delete Tasks**: Option to remove individual tasks
- **Visual States**: 
  - Completed tasks show strikethrough text and green checkmark
  - Incomplete tasks show empty checkbox

### 3. Progress Tracking
- **Progress Bar**: Visual progress bar showing completion percentage
- **Real-time Updates**: Progress updates immediately when tasks are completed/uncompleted
- **Percentage Display**: Show exact percentage (e.g., "60% complete")

### 4. User Interface Design

#### Layout Structure
```
Header
├── App Title: "Dreams & Goals Tracker"
├── Subtitle/Description
└── Add New Dream Button

Main Content Area
├── Dreams Grid (responsive: 1 col mobile, 2-3 cols desktop)
└── Each Dream Card Contains:
    ├── Header (Icon + Title + Delete Button)
    ├── Progress Bar with Percentage
    ├── Tasks List
    └── Add Task Input Field
```

#### Design Requirements
- **Color Palette**: Offer 8+ color options for dream cards
  - Pink, Blue, Green, Purple, Yellow, Red, Indigo, Orange themes
- **Responsive Design**: Works on mobile and desktop
- **Modern UI**: Clean, rounded corners, shadows, gradients
- **Interactive Elements**: Hover effects, smooth transitions
- **Icons**: Use Lucide React icons (Plus, Check, X, Trash2, etc.)

### 5. Data Structure

#### Dream Object
```javascript
{
  id: unique_id,
  title: "Dream Title",
  icon: "🎯",
  color: "bg-blue-100 border-blue-300",
  tasks: [task_objects]
}
```

#### Task Object
```javascript
{
  id: unique_id,
  text: "Task description",
  completed: boolean
}
```

### 6. Default Example Data
Include sample "Trip to Japan" dream with tasks:
- Save money for the trip ✓
- Apply for passport ✓
- Book flights
- Visit Tokyo Skytree
- Try authentic ramen
- Visit Fushimi Inari Shrine
- Experience cherry blossom season
- Stay in a traditional ryokan

### 7. Functional Requirements

#### Core Functions
- `addNewDream()`: Creates new dream category
- `deleteDream(dreamId)`: Removes dream and all tasks
- `addTask(dreamId, taskText)`: Adds task to specific dream
- `toggleTask(dreamId, taskId)`: Toggles task completion status
- `deleteTask(dreamId, taskId)`: Removes specific task
- `getProgress(tasks)`: Calculates completion percentage

#### Input Handling
- **Add Task**: Enter key or button click to add
- **Form Validation**: Don't allow empty tasks or dreams
- **Auto-clear**: Clear input fields after adding

### 8. Interactive Elements

#### New Dream Creation Flow
1. Click "Add New Dream" button
2. Show creation form with:
   - Title input field
   - Icon/emoji input field
   - Color selection grid
   - Create/Cancel buttons
3. Validate inputs and create dream
4. Hide form and show new dream card

#### Task Interaction
- Click checkbox circle to toggle completion
- Click X button to delete task
- Type in input field and press Enter or click + to add
- Visual feedback for all interactions

### 9. Visual States & Feedback

#### Empty State
When no dreams exist, show:
- Large star emoji (🌟)
- "No dreams yet!" message
- Instruction to add first dream

#### Loading States
- Smooth transitions for all state changes
- Hover effects on interactive elements
- Color changes for completed tasks

#### Progress Visualization
- Animated progress bar that grows with completion
- Gradient colors for progress bar (green to blue)
- Real-time percentage updates

### 10. Technical Requirements

#### Technology Stack
- React with hooks (useState)
- Tailwind CSS for styling
- Lucide React for icons
- Responsive grid layout

#### Browser Compatibility
- Modern browsers supporting ES6+
- Mobile responsive design
- Touch-friendly interface

#### Performance
- Efficient re-rendering with proper React patterns
- Smooth animations and transitions
- Fast interaction responses

### 11. Accessibility Features
- Clear color contrasts
- Proper button sizes for touch devices
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly labels

### 12. Future Enhancement Ideas
- Drag & drop task reordering
- Due dates for tasks
- Dream categories/tags
- Export functionality
- Achievement badges
- Progress history
- Sharing capabilities
- Cloud sync
- Reminder notifications

### 16. Implementation Notes

#### State Management
Use React useState to manage:
- Dreams array
- UI state (showing/hiding dialogs)
- Input field values
- Animation states

#### Styling Approach
- Use shadcn/ui components as base
- Customize with Tailwind utility classes
- Consistent spacing and typography from shadcn theme
- Mobile-first responsive design
- Smooth animations with CSS transitions

#### Component Structure
- Main App component with shadcn Card containers
- Individual Dream card components using shadcn Cards
- Task input component with shadcn Input and Button
- Progress bar component using shadcn Progress
- Color picker component with animated selection
- Dialog component for dream creation form

#### Animation Implementation
- Use CSS transitions for most animations
- Implement staggered animations for card loading
- Add micro-interactions for better UX
- Ensure animations are performant and accessible

This instruction set provides comprehensive guidance for building a fully functional Dreams & Goals Tracker application with all specified features and modern UI/UX design principles.