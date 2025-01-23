# Project: CWP - News & Blog

## Description
CWP - News & Blog is an interactive web platform designed to deliver the latest news and user-generated blogs. It includes powerful features like category-based news filtering, a customizable calendar for planning, weather updates, and bookmarking. Built with user-friendliness in mind, this application seamlessly integrates external APIs for dynamic content and supports full responsiveness across devices.

---

## Features

### 1. News Section
- **Headline News**: Displays the most important and current headline.
- **Category Filtering**: Browse news articles by predefined categories such as World, Technology, Sports, Science, Health, and more.
- **Custom Categories**: Tailor news feeds to your personal interests.
- **Search Functionality**: Instantly find articles using keywords.
- **Bookmarking**: Save and organize your favorite news articles for easy access later.

### 2. Blog Management
- **Create Blogs**: Publish engaging blogs with titles, content, and optional images.
- **Edit Blogs**: Update blog posts to keep them relevant.
- **Delete Blogs**: Remove outdated or unwanted blog entries.
- **Validation**: Prevent errors with title and content length requirements.

### 3. Weather Updates
- **Current Weather**: Shows live weather conditions based on your location or a searched city.
- **Weather Icons**: Visual representation of weather conditions (e.g., sunny, rainy, stormy).

### 4. Calendar Integration
- **Customizable Calendar**: Use the integrated calendar to plan and organize blog posts, news reading, or personal schedules.

### 5. Modal Views
- **News Details Modal**: Expand and read full news articles in an interactive modal.
- **Bookmarks Modal**: View and manage your collection of bookmarked articles.
- **Blogs Modal**: Access detailed views of individual blogs.

### 6. Responsive Design
- Optimized for seamless usage on desktop, tablet, and mobile devices.

---

## Technologies Used

### Frontend
- **React.js**: Modular component architecture for a dynamic user experience.
- **CSS**: Clean and responsive styling.
- **FontAwesome**: Visually appealing and versatile icons.

### APIs
- **GNews API**: Fetches real-time news articles.
- **OpenWeather API**: Provides accurate weather updates.

### Tools
- **Axios**: Streamlined HTTP requests for fetching API data.
- **Local Storage**: Persistent storage for user bookmarks.
- **FileReader API**: Simplifies image uploads for blogs.

---

## File Structure

### Key Components
1. **News.jsx**
   - Core news interface, featuring article categories, searches, and bookmarks.
2. **NewsModal.jsx**
   - Displays selected news articles with comprehensive details.
3. **Weather.jsx**
   - Displays weather updates based on user-defined locations.
4. **Blogs.jsx**
   - Provides a user-friendly interface for creating and managing blog posts.
5. **Calendar.jsx**
   - Offers an intuitive calendar for organizational use.

### Assets
- **Images**: Includes placeholders and default user avatars.
- **CSS**: Encapsulates all custom and responsive styles.

---

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/codewithpanda28/News-Blog.git
   ```
2. Navigate to the project directory:
   ```bash
   cd cwp-news-blog
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Access the application at `http://localhost:3000`.

---

## API Configuration

1. **GNews API**
   - Replace the API key in `News.jsx` with your own:
   ```javascript
   const url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=YOUR_API_KEY`;
   ```

2. **OpenWeather API**
   - Replace the API key in `Weather.jsx`:
   ```javascript
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${location || 'dhanbad'}&units=Metric&appid=YOUR_API_KEY`;
   ```

---

## Contributions
We welcome contributions! Submit issues or pull requests to improve the application or add new features.

---

## License
This project is developed and owned by CodeWithPanda. All rights reserved. Redistribution or modification is not permitted without prior approval.

---

## Social Media and Personal Details
- **Creator**: CodeWithPanda
- **Email**: codewithpanda28@gmail.com
- **GitHub**: https://github.com/codewithpanda28
- **LinkedIn**: https://www.linkedin.com/in/codewithpanda28
- **WhatsApp**: +91 8252472186

---

## Acknowledgments
- **GNews API**: For providing dynamic news content.
- **OpenWeather API**: For accurate weather updates.
- **React.js Community**: For extensive support and resources.

