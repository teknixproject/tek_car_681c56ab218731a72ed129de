import dynamic from 'next/dynamic';

export const components = {
  Background: dynamic(() => import('./Background')),
  BannerVideo: dynamic(() => import('./BannerVideo')),
  Button: dynamic(() => import('./Button')),
  Description: dynamic(() => import('./Description')),
  Pagination: dynamic(() => import('./Pagination')),
  Icon: dynamic(() => import('./Icon')),
  Image: dynamic(() => import('./Image')),
  Link: dynamic(() => import('./Link')),
  Text: dynamic(() => import('./Text')),
  TitleHeaderGradient: dynamic(() => import('./TitleHeaderGradient')),
  InputText: dynamic(() => import('./InputText')),
  Navigation: dynamic(() => import('./Navigation')),
  Dropdown: dynamic(() => import('./Dropdown')),
  Collapse: dynamic(() => import('./Collapse')),
  Nav1: dynamic(() => import('./Nav1')),
  InputSearch: dynamic(() => import('./InputSearch')),
  AppleNavigation: dynamic(() => import('./AppleNavigation')),
  Tabs: dynamic(() => import('./Tabs')),
  LoginForm: dynamic(() => import("./LoginForm")),
};
