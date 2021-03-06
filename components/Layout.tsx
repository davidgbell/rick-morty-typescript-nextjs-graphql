import Head from 'next/head';
import { ReactNode } from 'react';

type LayoutProps = {
  title?: string;
  children: ReactNode;
};

export const Layout = ({ children, title = 'Default title' }: LayoutProps) => {
  return (
    <div className='layout'>
      <Head>
        <title>{title}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {children}
    </div>
  );
};
