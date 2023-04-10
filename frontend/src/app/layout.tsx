import React from "react";

import {Nav} from '@/components/Nav/Nav';
import {Header} from '@/components/Header/Header';
import {Footer} from '@/components/Footer/Footer';
import Providers from '@/_redux/provider';

export const metadata = {
  title: {
    default: 'Home » Patitas Felices',
    template: '%s » Patitas Felices'
  },
  description: 'Generated by create next app',
}

export default function HomeLayout({children}: {children: React.ReactNode}) {
  return (
      <html lang="en">
          <body>
              <Providers>
                  <Header/>
                  <Nav/>
                  {children}
                  <Footer/>
              </Providers>
          </body>
      </html>
  )
}
