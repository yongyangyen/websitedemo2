import React, { useContext, useState } from 'react';
import { Container, Tab, Tabs, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import Layout from '../../components/Layout';
import AdminAuth from '../../components/AdminAuth';
import { SiteDataContext } from '../../components/SiteDataProvider';
import { useRouter } from 'next/router';

export default function AdminPanel() {
  const { siteData, updateSiteData, resetToDefault } = useContext(SiteDataContext);
  const [activeTab, setActiveTab] = useState('hero');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  // 编辑功能的状态变量
  const [heroSection, setHeroSection] = useState(siteData.heroSection);
  const [carouselSlides, setCarouselSlides] = useState(siteData.carouselSlides);
  const [features, setFeatures] = useState(siteData.features);
  const [testimonials, setTestimonials] = useState(siteData.testimonials);
  const [contactInfo, setContactInfo] = useState(siteData.contactInfo);

  // 保存所有更改
  const handleSaveChanges = () => {
    const newSiteData = {
      heroSection,
      carouselSlides,
      features,
      testimonials,
      contactInfo
    };
    
    updateSiteData(newSiteData);
    setSuccessMessage('内容已成功更新！');
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // 重置为默认设置
  const handleReset = () => {
    if (confirm('确定要重置所有内容到默认值吗？此操作无法撤销。')) {
      resetToDefault();
      // 刷新页面以获取新数据
      router.reload();
    }
  };

  // 登出功能
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminLoggedIn');
      router.push('/admin/login');
    }
  };
  
  return (
    <AdminAuth>
      <Layout title="管理员面板">
        <Container className="py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>网站内容管理</h1>
            <div>
              <Button variant="outline-secondary" onClick={() => router.push('/')} className="me-2">
                查看网站
              </Button>
              <Button variant="outline-danger" onClick={handleLogout}>
                登出
              </Button>
            </div>
          </div>
          
          {successMessage && (
            <Alert variant="success" className="mb-4">
              {successMessage}
            </Alert>
          )}
          
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4"
          >
            <Tab eventKey="hero" title="英雄区域">
              <div className="admin-form-section">
                <h3 className="mb-3">英雄区域设置</h3>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>标题</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={heroSection.title}
                      onChange={(e) => setHeroSection({...heroSection, title: e.target.value})}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>副标题</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={2}
                      value={heroSection.subtitle}
                      onChange={(e) => setHeroSection({...heroSection, subtitle: e.target.value})}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>按钮文字</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={heroSection.buttonText}
                      onChange={(e) => setHeroSection({...heroSection, buttonText: e.target.value})}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>按钮链接</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={heroSection.buttonLink}
                      onChange={(e) => setHeroSection({...heroSection, buttonLink: e.target.value})}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>背景图片URL</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={heroSection.backgroundImage}
                      onChange={(e) => setHeroSection({...heroSection, backgroundImage: e.target.value})}
                    />
                    <Form.Text className="text-muted">
                      输入图片的完整URL或以/images/开头的相对路径
                    </Form.Text>
                  </Form.Group>
                </Form>
              </div>
            </Tab>
            
            <Tab eventKey="carousel" title="轮播图">
              <div className="admin-form-section">
                <h3 className="mb-3">轮播图设置</h3>
                
                {carouselSlides.map((slide, index) => (
                  <div key={slide.id} className="mb-4 p-3 border rounded">
                    <h5>轮播图 #{index + 1}</h5>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>图片URL</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={slide.image}
                            onChange={(e) => {
                              const newSlides = [...carouselSlides];
                              newSlides[index].image = e.target.value;
                              setCarouselSlides(newSlides);
                            }}
                          />
                          <Form.Text className="text-muted">
                            建议尺寸: 1920x600px
                          </Form.Text>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>标题</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={slide.title}
                            onChange={(e) => {
                              const newSlides = [...carouselSlides];
                              newSlides[index].title = e.target.value;
                              setCarouselSlides(newSlides);
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>描述</Form.Label>
                          <Form.Control 
                            as="textarea" 
                            rows={3}
                            value={slide.description}
                            onChange={(e) => {
                              const newSlides = [...carouselSlides];
                              newSlides[index].description = e.target.value;
                              setCarouselSlides(newSlides);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>按钮文字</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={slide.buttonText || ''}
                            onChange={(e) => {
                              const newSlides = [...carouselSlides];
                              newSlides[index].buttonText = e.target.value;
                              setCarouselSlides(newSlides);
                            }}
                          />
                          <Form.Text className="text-muted">
                            可选，留空则不显示按钮
                          </Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>按钮链接</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={slide.buttonLink || '#'}
                            onChange={(e) => {
                              const newSlides = [...carouselSlides];
                              newSlides[index].buttonLink = e.target.value;
                              setCarouselSlides(newSlides);
                            }}
                          />
                          <Form.Text className="text-muted">
                            按钮链接的URL或锚点，如 #contact
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
            </Tab>
            
            <Tab eventKey="features" title="服务特点">
              <div className="admin-form-section">
                <h3 className="mb-3">服务特点设置</h3>
                
                {features.map((feature, index) => (
                  <div key={feature.id} className="mb-4 p-3 border rounded">
                    <h5>特点 #{index + 1}</h5>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>图标 (FontAwesome类)</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={feature.icon}
                            onChange={(e) => {
                              const newFeatures = [...features];
                              newFeatures[index].icon = e.target.value;
                              setFeatures(newFeatures);
                            }}
                          />
                          <Form.Text className="text-muted">
                            例如: fas fa-home, fas fa-car 等
                          </Form.Text>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>标题</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={feature.title}
                            onChange={(e) => {
                              const newFeatures = [...features];
                              newFeatures[index].title = e.target.value;
                              setFeatures(newFeatures);
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>描述</Form.Label>
                          <Form.Control 
                            as="textarea" 
                            rows={3}
                            value={feature.description}
                            onChange={(e) => {
                              const newFeatures = [...features];
                              newFeatures[index].description = e.target.value;
                              setFeatures(newFeatures);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
            </Tab>
            
            <Tab eventKey="testimonials" title="客户评价">
              <div className="admin-form-section">
                <h3 className="mb-3">客户评价设置</h3>
                
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="mb-4 p-3 border rounded">
                    <h5>评价 #{index + 1}</h5>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>姓名</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={testimonial.name}
                            onChange={(e) => {
                              const newTestimonials = [...testimonials];
                              newTestimonials[index].name = e.target.value;
                              setTestimonials(newTestimonials);
                            }}
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>职位</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={testimonial.position}
                            onChange={(e) => {
                              const newTestimonials = [...testimonials];
                              newTestimonials[index].position = e.target.value;
                              setTestimonials(newTestimonials);
                            }}
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>头像URL</Form.Label>
                          <Form.Control 
                            type="text" 
                            value={testimonial.avatar}
                            onChange={(e) => {
                              const newTestimonials = [...testimonials];
                              newTestimonials[index].avatar = e.target.value;
                              setTestimonials(newTestimonials);
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>评价内容</Form.Label>
                          <Form.Control 
                            as="textarea" 
                            rows={5}
                            value={testimonial.quote}
                            onChange={(e) => {
                              const newTestimonials = [...testimonials];
                              newTestimonials[index].quote = e.target.value;
                              setTestimonials(newTestimonials);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
            </Tab>
            
            <Tab eventKey="contact" title="联系信息">
              <div className="admin-form-section">
                <h3 className="mb-3">联系信息设置</h3>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>地址</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>电话号码</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>电子邮件</Form.Label>
                    <Form.Control 
                      type="email" 
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>营业时间</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={contactInfo.businessHours}
                      onChange={(e) => setContactInfo({...contactInfo, businessHours: e.target.value})}
                    />
                  </Form.Group>
                </Form>
              </div>
            </Tab>
          </Tabs>
          
          <div className="d-flex justify-content-between mt-4">
            <Button variant="danger" onClick={handleReset}>
              重置为默认内容
            </Button>
            <Button variant="success" onClick={handleSaveChanges}>
              保存所有更改
            </Button>
          </div>
        </Container>
      </Layout>
    </AdminAuth>
  );
} 