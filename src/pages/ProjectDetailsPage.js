import React from 'react';

// A simple reusable style for section headings
const sectionTitleStyle = {
  borderBottom: '2px solid #0A95FF',
  paddingBottom: '5px',
  marginBottom: '1rem',
  marginTop: '2rem'
};

const ProjectDetailsPage = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Project: Stack Underflow</h1>
      <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#525960' }}>
        A Full-Stack Stack Overflow Clone
      </p>
      
      <div style={{ textAlign: 'center', margin: '1rem 0' }}>
        {/* <strong>Live Backend API:</strong>{' '}
        <a href="https://stackoverflow-api.onrender.com/api/questions" target="_blank" rel="noopener noreferrer">
          https://stackoverflow-api.onrender.com/api/questions
        </a> */}
        {/* Add your frontend link here once it's deployed */}
        {/* <br/><strong>Live Frontend:</strong> <a href="#">Your Frontend Link</a> */}
      </div>

      <h2 style={sectionTitleStyle}>Project Overview</h2>
      <p>
        Stack Underflow is a full-stack web application designed as a simplified, modern clone of the popular developer Q&A platform, Stack Overflow. This project demonstrates a complete development lifecycle, from backend API design and implementation to a dynamic, responsive frontend user interface. It serves as a practical showcase of key skills in modern Java (Spring Boot) and JavaScript (React) development, including REST API design, security, database management, and frontend state management.
      </p>

      <h2 style={sectionTitleStyle}>Core Functionalities</h2>
      <ul>
        <li><strong>User Management & Security:</strong> Secure user registration, stateless JWT authentication, and protected routes.</li>
        <li><strong>Q&A System:</strong> Users can post, view, and answer questions.</li>
        <li><strong>Dynamic UI:</strong> A responsive single-page application that reacts to user authentication state.</li>
      </ul>

      <h2 style={sectionTitleStyle}>Technical Stack & Architecture</h2>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h4>Backend (Java / Spring Boot)</h4>
          <ul>
            <li><strong>Framework:</strong> Spring Boot 3</li>
            <li><strong>Security:</strong> Spring Security 6 with JWT</li>
            <li><strong>Database:</strong> PostgreSQL with Spring Data JPA</li>
            <li><strong>Architecture:</strong> Layered (Controller, Service, Repository)</li>
          </ul>
        </div>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h4>Frontend (JavaScript / React)</h4>
          <ul>
            <li><strong>Framework:</strong> React 18</li>
            <li><strong>State Management:</strong> React Context API</li>
            <li><strong>Routing:</strong> react-router-dom</li>
            <li><strong>API Communication:</strong> axios</li>
          </ul>
        </div>
      </div>

      <h2 style={sectionTitleStyle}>Deployment & Hosting</h2>
      <ul>
        <li><strong>Backend API:</strong> Runs on <strong>AWS Elastic Beanstalk</strong>, which manages the underlying infrastructure and allows for auto-scaling.</li>
        {/* <li><strong>Backend API:</strong> Containerized with <strong>Docker</strong> and deployed on <strong>Render</strong>.</li> */}
        {/* <li><strong>Database:</strong> Managed <strong>PostgreSQL</strong> instance on <strong>Render</strong>.</li> */}
        <li><strong>Database:</strong> A managed <strong>PostgreSQL</strong> instance on <strong>Amazon RDS</strong> ensures high availability, backups, and data security.</li>
        {/* <li><strong>Frontend:</strong> Deployed as a static site on <strong>Vercel / Netlify</strong> (once completed).</li> */}
         <li><strong>Deployment:</strong> Hosted on <strong>AWS Amplify</strong> for fast, global, and secure content delivery with integrated CI/CD.</li>
      </ul>

      <h2 style={sectionTitleStyle}>Future Updates & Enhancements</h2>
      <ul>
        <li><strong>Voting System:</strong> Implementing upvote/downvote functionality.</li>
        <li><strong>Commenting:</strong> Adding the ability to leave comments on posts.</li>
        <li><strong>Search & Tagging:</strong> Implementing search and a tagging system for questions.</li>
        <li><strong>User Profiles:</strong> Creating pages for users to view their activity.</li>
      </ul>
    </div>
  );
};

export default ProjectDetailsPage;