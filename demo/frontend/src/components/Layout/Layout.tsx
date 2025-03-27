// import React, { useState } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import { NavbarComponent, Sidebar } from './index.ts';
// import 'bootstrap/dist/css/bootstrap.min.css';

// interface LayoutProps {
//   children: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   const handleSidebarToggle = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//   };

//   return (
//     <div>
//       <NavbarComponent collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
//       {/* Main Layout */}
//       <Container fluid className="mt-5">
//         <Row>
//           <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
//           {/* Main Content page*/}
//           <Col xs={9} sm={9} md={10} className="p-4" style={{ marginLeft: sidebarCollapsed ? '80px' : '250px', transition: 'margin-left 0.3s' }}>
//             {children}
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Layout;