import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Spinner, Container } from 'react-bootstrap';

// 简单的身份验证组件包装器
const AdminAuth = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 检查用户是否已登录
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        setIsAuthenticated(isLoggedIn);
        setLoading(false);
        
        if (!isLoggedIn) {
          router.push('/admin/login');
        }
      }
    };
    
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return isAuthenticated ? children : null;
};

export default AdminAuth; 