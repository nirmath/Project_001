
import React, { useEffect, useRef } from 'react';

// Assuming pannellum is loaded globally from a script tag in index.html
declare const pannellum: any;

interface PannellumViewerProps {
  imageUrl: string;
  title: string;
}

const PannellumViewer: React.FC<PannellumViewerProps> = ({ imageUrl, title }) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let viewer: any = null;
    if (viewerRef.current && typeof pannellum !== 'undefined') {
      viewer = pannellum.viewer(viewerRef.current, {
        type: 'equirectangular',
        panorama: imageUrl,
        autoLoad: true,
        title: title,
        showControls: true,
        compass: true,
        hotSpotDebug: false,
      });
    }

    return () => {
      if (viewer) {
        viewer.destroy();
      }
    };
  }, [imageUrl, title]);

  return <div ref={viewerRef} className="w-full h-full"></div>;
};

export default PannellumViewer;
