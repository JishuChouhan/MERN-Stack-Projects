import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-richblack-800 text-white p-14 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {/* Company Section */}
        <div className="col-span-2">
          <h2 className="text-2xl font-bold mb-4">StudyNotion</h2>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Company</h3>
            <ul className="space-y-1">
              <li><Link to="/about" className="hover:text-blue-400">About</Link></li>
              <li><Link to="/careers" className="hover:text-blue-400">Careers</Link></li>
              <li><Link to="/affiliates" className="hover:text-blue-400">Affiliates</Link></li>
            </ul>
          </div>
        </div>

        {/* Resources Section */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Resources</h3>
          <ul className="space-y-1">
            <li><Link to="/articles" className="hover:text-blue-400">Articles</Link></li>
            <li><Link to="/blog" className="hover:text-blue-400">Blog</Link></li>
            <li><Link to="/cheatsheets" className="hover:text-blue-400">Cheat Sheet</Link></li>
            <li><Link to="/challenges" className="hover:text-blue-400">Code challenges</Link></li>
            <li><Link to="/docs" className="hover:text-blue-400">Docs</Link></li>
            <li><Link to="/projects" className="hover:text-blue-400">Projects</Link></li>
            <li><Link to="/videos" className="hover:text-blue-400">Videos</Link></li>
            <li><Link to="/workspaces" className="hover:text-blue-400">Workspaces</Link></li>
          </ul>
        </div>

        {/* Plans Section */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Plans</h3>
          <ul className="space-y-1">
            <li><Link to="/membership" className="hover:text-blue-400">Paid memberships</Link></li>
            <li><Link to="/students" className="hover:text-blue-400">For students</Link></li>
            <li><Link to="/business" className="hover:text-blue-400">Business solutions</Link></li>
          </ul>
        </div>

        {/* Community Section */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Community</h3>
          <ul className="space-y-1">
            <li><Link to="/forums" className="hover:text-blue-400">Forums</Link></li>
            <li><Link to="/chapters" className="hover:text-blue-400">Chapters</Link></li>
            <li><Link to="/events" className="hover:text-blue-400">Events</Link></li>
          </ul>
        </div>

        {/* Subjects Section */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Subjects</h3>
          <ul className="space-y-1">
            <li><Link to="/ai" className="hover:text-blue-400">AI</Link></li>
            <li><Link to="/cloud" className="hover:text-blue-400">Cloud Computing</Link></li>
            <li><Link to="/foundations" className="hover:text-blue-400">Code Foundations</Link></li>
            <li><Link to="/cs" className="hover:text-blue-400">Computer Science</Link></li>
            <li><Link to="/cybersecurity" className="hover:text-blue-400">Cybersecurity</Link></li>
            <li><Link to="/analytics" className="hover:text-blue-400">Data Analytics</Link></li>
            <li><Link to="/datascience" className="hover:text-blue-400">Data Science</Link></li>
            <li><Link to="/visualization" className="hover:text-blue-400">Data Visualization</Link></li>
          </ul>
        </div>

        {/* Languages & Career Sections */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="font-semibold text-lg mb-2">Languages</h3>
          <ul className="space-y-1">
            <li><Link to="/bash" className="hover:text-blue-400">Bash</Link></li>
            <li><Link to="/cpp" className="hover:text-blue-400">C++</Link></li>
            <li><Link to="/csharp" className="hover:text-blue-400">C#</Link></li>
            <li><Link to="/go" className="hover:text-blue-400">Go</Link></li>
            <li><Link to="/html-css" className="hover:text-blue-400">HTML & CSS</Link></li>
            <li><Link to="/java" className="hover:text-blue-400">Java</Link></li>
            <li><Link to="/javascript" className="hover:text-blue-400">JavaScript</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Career building</h3>
          <ul className="space-y-1">
            <li><Link to="/career-paths" className="hover:text-blue-400">Career paths</Link></li>
            <li><Link to="/career-services" className="hover:text-blue-400">Career services</Link></li>
            <li><Link to="/interview-prep" className="hover:text-blue-400">Interview prep</Link></li>
            <li><Link to="/certification" className="hover:text-blue-400">Professional certification</Link></li>
            <li><Link to="/catalog" className="hover:text-blue-400">Full Catalog</Link></li>
            <li><Link to="/beta" className="hover:text-blue-400">Beta Content</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
        <p>© {new Date().getFullYear()} StudyNotion. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;