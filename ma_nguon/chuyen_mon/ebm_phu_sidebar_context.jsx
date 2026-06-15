import { createContext, useContext } from 'react';

/**
 * Sidebar phụ EBM (dưới các thẻ phân hệ) — module con gán nội dung qua context.
 */
export const EbmPhuSidebarContext = createContext({
  datNoiDungPhu: () => {},
});

export const useEbmPhuSidebar = () => useContext(EbmPhuSidebarContext);
