import {createContext, ReactElement, useState} from "react";
import * as React from "react";

export const ImageLoadingStateContext = createContext<{
  showImageLoading: boolean;
  setShowImageLoading: (show: boolean) => void;
}>({ showImageLoading: true, setShowImageLoading: () => {} });
interface LoadingStateProviderProps {
  children: ReactElement;
}

export const ImageLoadingStateProvider = (props: LoadingStateProviderProps) => {
  const [showImageLoading, setShowImageLoading] = useState(true);
  return <ImageLoadingStateContext.Provider value={{ showImageLoading, setShowImageLoading }}>
    {props.children}
  </ImageLoadingStateContext.Provider>;
}

export const useImageLoadingState = () => React.useContext(ImageLoadingStateContext);
