import { useState } from "react";
const Dev = () => {
   const apiLinks = [
           { name: 'Teach Ops', url: 'https://api.teachops.com/swagger/index.html' }
       ];
   
       // Assign a category and icon to each API for visual grouping
       const categoryMapping = {
           'Teach Ops': { category: 'Teach', icon: '🎓' },
           'Finance Pro': { category: 'Finance', icon: '💰' },
           'Mind Spark': { category: 'Education', icon: '🧠' },
           'Knowledge Stand': { category: 'Education', icon: '📚' },
           'Big Leads': { category: 'Marketing', icon: '📈' },
           'Students': { category: 'Education', icon: '🎓' },
           'SmallBiz Gurus': { category: 'Business', icon: '🏢' },
           'TimeClock Plus': { category: 'Productivity', icon: '⏰' },
           'Executive Edge': { category: 'Business', icon: '👔' },
           'Digital Fingers': { category: 'Technology', icon: '💻' },
           'Virtual Learn': { category: 'Education', icon: '🖥️' },
           'Global': { category: 'Global', icon: '🌐' },
       };
   
       const [searchTerm, setSearchTerm] = useState('');
       const [activeCategory, setActiveCategory] = useState('All');
       const [hoveredCard, setHoveredCard] = useState(null);
   
       // Extract unique categories for filter buttons
       const categories = ['All', ...new Set(Object.values(categoryMapping).map(item => item.category))];
   
       // Filter APIs based on search term and active category
       const filteredApis = apiLinks.filter(api => {
           const matchesSearch = api.name.toLowerCase().includes(searchTerm.toLowerCase());
           const matchesCategory = activeCategory === 'All' ||
               (categoryMapping[api.name] && categoryMapping[api.name].category === activeCategory);
   
           return matchesSearch && matchesCategory;
       });
   
       return (
           <div className="app-container">
               {/* Header */}
               <header className="app-header">
                   <div className="header-content">
                       <h1>Development API Dashboard</h1>
                       <p>Access and manage all your API endpoints in one place</p>
                   </div>
               </header>
   
               {/* Search and Filter */}
               <div className="content-wrapper">
                   <div className="controls-container">
                       <div className="search-container">
                           <input
                               type="text"
                               placeholder="Search APIs..."
                               value={searchTerm}
                               onChange={(e) => setSearchTerm(e.target.value)}
                               className="search-input"
                           />
                           <span className="search-icon">🔍</span>
                       </div>
   
                       <div className="category-filters">
                           {categories.map(category => (
                               <button
                                   key={category}
                                   onClick={() => setActiveCategory(category)}
                                   className={`category-button ${activeCategory === category ? 'active' : ''}`}
                               >
                                   {category}
                               </button>
                           ))}
                       </div>
                   </div>
   
                   {/* API Cards Grid */}
                   <div className="cards-grid">
                       {filteredApis.map((api, index) => {
                           const { category, icon } = categoryMapping[api.name] || { category: 'Other', icon: '🔗' };
                           const isHovered = hoveredCard === index;
   
                           return (
                               <a
                                   key={index}
                                   href={api.url}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className={`card ${isHovered ? 'hovered' : ''}`}
                                   onMouseEnter={() => setHoveredCard(index)}
                                   onMouseLeave={() => setHoveredCard(null)}
                               >
                                   <div className="card-progress-bar"></div>
                                   <div className="card-content">
                                       <div className="card-header">
                                           <div className="card-title-container">
                                               <span className="card-icon">{icon}</span>
                                               <div>
                                                   <h3 className="card-title">{api.name}</h3>
                                                   <span className="card-category">{category}</span>
                                               </div>
                                           </div>
                                           <div className="card-arrow">
                                               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                   <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                               </svg>
                                           </div>
                                       </div>
                                       <p className="card-description">
                                           Access the {api.name} API documentation and endpoints
                                       </p>
                                       <div className="card-footer">
                                           <span>TeachOps Environment</span>
                                           <div className="status-indicator">
                                               <span className="status-dot"></span>
                                               Active
                                           </div>
                                       </div>
                                   </div>
                               </a>
                           );
                       })}
                   </div>
   
                   {filteredApis.length === 0 && (
                       <div className="empty-state">
                           <div className="empty-icon">🔍</div>
                           <h3>No APIs found</h3>
                           <p>Try adjusting your search or filter criteria</p>
                       </div>
                   )}
               </div>
   
               {/* Footer */}
               <footer className="app-footer">
                   <div className="footer-content">
                       API Dashboard — Access all your TeachOps APIs in one place
                   </div>
               </footer>
           </div>
       );
   }
   
   export default Dev;