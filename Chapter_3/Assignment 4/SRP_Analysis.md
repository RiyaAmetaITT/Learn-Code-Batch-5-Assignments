# Single Responsibility Principle (SRP) Analysis

## Question: Does this Book class follow SRP?

### Answer: **NO, the original Book class does NOT follow the Single Responsibility Principle.**

## Analysis of the Original Book Class

The original `Book` class violates SRP because it has **multiple responsibilities**:

### 1. **Book Metadata Management**
- `getTitle()` - Returns book title ("A Great Book")
- `getAuthor()` - Returns book author ("John Doe")
- **Responsibility**: Storing and retrieving book information

### 2. **Reading State Management**
- `turnPage()` - Advances to next page (pointer to next page)
- `getCurrentPage()` - Returns current page content
- **Responsibility**: Managing the reading state and page navigation

### 3. **Library Location Management**
- `getLocation()` - Returns library location (shelf number & room number)
- **Responsibility**: Managing physical location in library

### 4. **Persistence Management**
- `save()` - Generates filename and saves book to file system using `file_put_contents()`
- **Responsibility**: Handling file I/O, filename generation, and serialization

## Why This Violates SRP

According to the Single Responsibility Principle, a class should have **only one reason to change**. The original `Book` class has **four reasons to change**:

1. **Change in book metadata structure** (e.g., adding ISBN, publisher)
2. **Change in reading state logic** (e.g., bookmarking, annotations)
3. **Change in location system** (e.g., different location format)
4. **Change in persistence mechanism** (e.g., database instead of file system)

## Problems Caused by Violating SRP

1. **Tight Coupling**: Book class is tightly coupled to file system operations
2. **Difficult Testing**: Hard to test reading logic without file system dependencies
3. **Low Reusability**: Cannot reuse book metadata without persistence logic
4. **Maintenance Issues**: Changes in one area (e.g., file saving) affect the entire class
5. **Violation of Separation of Concerns**: Mixing domain logic with infrastructure concerns

## Analysis of Printer Classes

The `Printer` interface and its implementations (`PlainTextPrinter` and `HtmlPrinter`) **DO follow SRP**:

### Printer Interface
```php
interface Printer {
    function printPage($page);
}
```
- Single responsibility: Defines contract for printing operations

### PlainTextPrinter
```php
class PlainTextPrinter implements Printer {
    function printPage($page) {
        echo $page;
    }
}
```
- Single responsibility: Plain text output formatting and printing

### HtmlPrinter
```php
class HtmlPrinter implements Printer {
    function printPage($page) {
        echo '<div style="single-page">' . $page . '</div>';
    }
}
```
- Single responsibility: HTML output formatting and printing

**Note**: While these classes follow SRP, they could be further improved by separating formatting logic from output logic.

## Refactored Solution

The refactored code separates these concerns into distinct classes:

### 1. **BookMetadata** 
- Single responsibility: Book information storage
- Contains: title, author
- Methods: `getTitle()`, `getAuthor()`

### 2. **BookPageManager**
- Single responsibility: Reading state management
- Contains: current page number, page content
- Methods: `turnPage()`, `getCurrentPage()`

### 3. **BookLocation**
- Single responsibility: Library location information
- Contains: shelf number, room number
- Methods: `getLocation()`

### 4. **BookFileNameGenerator**
- Single responsibility: File name generation
- Method: `generateFileName()`

### 5. **BookFileSaver**
- Single responsibility: File persistence operations
- Handles: file operations, serialization
- Method: `save()`

### 6. **Book** (Refactored)
- Single responsibility: Composition and coordination
- Delegates to specialized classes instead of implementing everything
- Acts as a facade that coordinates the different components

### 7. **Formatter Classes** (for Printers)
- `PlainTextFormatter`: Formats content as plain text
- `HtmlFormatter`: Formats content as HTML
- Separated formatting logic from printing logic
