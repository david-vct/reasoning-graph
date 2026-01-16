# Manual Test Plan - Story 1.5: Create Simple Nodes

## Test Environment
- Browser: Chrome/Firefox/Safari
- URL: http://localhost:3000/editor
- Prerequisites: Logged in user session

## Test Cases

### TC1: Right-Click Context Menu
**Steps:**
1. Navigate to /editor
2. Right-click anywhere on the canvas
3. Verify context menu appears at cursor position
4. Verify menu contains "Create Simple Node" option

**Expected Result:** ✓ Context menu displays at cursor with correct option

---

### TC2: Create Node at Click Position
**Steps:**
1. Right-click on canvas at specific position
2. Click "Create Simple Node" in context menu
3. Verify node is created at the exact click position
4. Verify node has rounded rectangle shape with border

**Expected Result:** ✓ Node created at clicked position with correct styling

---

### TC3: Node Visual Design
**Steps:**
1. Create a new node
2. Inspect node visual properties

**Expected Result:** 
- ✓ Rounded rectangle shape
- ✓ Border visible (gray when unselected)
- ✓ White background
- ✓ Shadow effect
- ✓ Minimum width ~200px
- ✓ Placeholder text: "Enter your statement..."

---

### TC4: Node Text Editing
**Steps:**
1. Create a new node
2. Double-click on the node
3. Verify text input field appears
4. Type "Test Statement"
5. Press Enter or click outside

**Expected Result:** 
- ✓ Input field appears on double-click
- ✓ Text is saved
- ✓ Node displays the entered text
- ✓ Character counter shows "15/50"

---

### TC5: Character Limit Enforcement
**Steps:**
1. Create a node and double-click to edit
2. Try to type more than 50 characters
3. Verify input is limited to 50 characters

**Expected Result:** 
- ✓ Cannot type beyond 50 characters
- ✓ Counter shows "50/50" when limit reached
- ✓ No error message, just prevention

---

### TC6: Node Selection (Click)
**Steps:**
1. Create a node
2. Click on the node
3. Verify node border changes to blue
4. Verify node has shadow effect increased
5. Click on canvas (outside node)
6. Verify selection is cleared

**Expected Result:** 
- ✓ Selected node has blue border
- ✓ Border width increases when selected
- ✓ Clicking outside deselects

---

### TC7: Node Drag & Drop
**Steps:**
1. Create a node
2. Click and hold on the node
3. Drag to a new position
4. Release mouse button
5. Verify node position updated

**Expected Result:** 
- ✓ Node follows cursor during drag
- ✓ Node position persists after drop
- ✓ Smooth drag interaction

---

### TC8: Delete with Delete Key
**Steps:**
1. Create a node
2. Click to select the node
3. Press "Delete" key
4. Verify node is removed

**Expected Result:** ✓ Selected node is deleted from canvas

---

### TC9: Delete with Backspace Key
**Steps:**
1. Create a node
2. Click to select the node
3. Press "Backspace" key
4. Verify node is removed

**Expected Result:** ✓ Selected node is deleted from canvas

---

### TC10: Multiple Nodes Creation
**Steps:**
1. Right-click at position A and create node
2. Right-click at position B and create node
3. Right-click at position C and create node
4. Verify all 3 nodes exist independently

**Expected Result:** 
- ✓ All nodes created successfully
- ✓ Each node has unique ID
- ✓ All nodes can be independently selected/edited/moved

---

### TC11: Text Persistence After Navigation
**Steps:**
1. Create a node
2. Edit text to "Persistent Text"
3. Navigate away from /editor
4. Navigate back to /editor
5. Check if text is still there

**Expected Result:** 
- ⚠️ Text persists in Zustand store (memory only for now)
- ⚠️ Text will be lost on page refresh (no backend persistence yet)

---

### TC12: Context Menu Close on Click Outside
**Steps:**
1. Right-click to open context menu
2. Click anywhere outside the menu
3. Verify menu closes

**Expected Result:** ✓ Menu closes when clicking outside

---

### TC13: Context Menu Close on Escape Key
**Steps:**
1. Right-click to open context menu
2. Press "Escape" key
3. Verify menu closes

**Expected Result:** ✓ Menu closes on Escape key

---

### TC14: Placeholder Text Display
**Steps:**
1. Create a new node (don't edit text)
2. Verify placeholder is visible
3. Edit node and enter text
4. Verify placeholder is replaced by actual text

**Expected Result:** 
- ✓ Placeholder shows when empty: "Enter your statement..."
- ✓ Placeholder is italic and gray
- ✓ Placeholder disappears when text is entered

---

### TC15: Node Selection Highlight
**Steps:**
1. Create two nodes
2. Select first node
3. Verify first node has blue border
4. Select second node
5. Verify first node border returns to gray
6. Verify second node has blue border

**Expected Result:** ✓ Only one node can be selected at a time with proper highlight

---

## Test Coverage Summary

| Acceptance Criteria | Test Case | Status |
|---------------------|-----------|--------|
| Right-click opens menu | TC1, TC12, TC13 | ✓ |
| Menu has "Create Simple Node" | TC1 | ✓ |
| Node created at click position | TC2 | ✓ |
| Rounded rectangle design | TC3 | ✓ |
| Editable text field | TC4 | ✓ |
| Node selection with border highlight | TC6, TC15 | ✓ |
| Node drag & drop | TC7 | ✓ |
| Delete with Delete/Backspace | TC8, TC9 | ✓ |
| Text saved in Zustand | TC4, TC11 | ✓ |
| 50 character limit | TC5 | ✓ |

---

## Notes for QA

- All visual styles use Tailwind CSS classes
- Node selection is managed in Zustand store
- Delete functionality requires node to be selected first
- Text editing activates on double-click, exits on Enter/Blur
- Character counter updates in real-time
- All interactions are client-side only (no backend persistence in this story)
