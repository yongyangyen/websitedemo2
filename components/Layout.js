import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, title = '贷款服务' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="提供快速、简便的贷款服务" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
} 